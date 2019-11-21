"""
The flask application package.
"""

import hashlib, binascii, os, pymongo, jwt, time, datetime, json
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin

jwtSecret = "secretMuch"
jwtExpTime = 3600

def hash_password(password):
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), 
                                salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')
 
def verify_password(stored_password, provided_password):
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512', provided_password.encode('utf-8'), salt.encode('ascii'), 100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password

app = Flask(__name__)
cors = CORS(app)
dbClient = pymongo.MongoClient("mongodb://localhost:27017/geoguessr-lite-db")
db = dbClient["geoguessr-lite-db"]
users = db["users"]

if users.find_one() == None:
    print("No users in database, creating admin account...")
    users.insert({
        "email": "admin@a.a",
        "username": "admin",
        "passwordHash": hash_password("admin")
    })
    print("Done")

@app.route("/authenticate", methods=["POST"])
@cross_origin()
def authenticate():
    data = json.loads(request.data)
    email = data["email"]
    password = data["password"]
    user = users.find_one({"email": email})
    if user != None and verify_password(user["passwordHash"], password):
        encoded_jwt = jwt.encode({ "email": email, "exp": str(int(time.time()) + jwtExpTime) }, jwtSecret, algorithm="HS256").decode("ascii")
        return jsonify({
            "email": email,
            "username": user["username"],
            "token": encoded_jwt
        }), 200
    else:
        return "Incorrect credentials", 401

@app.route("/authorize", methods=["POST"])
@cross_origin()
def authorize():
    token = json.loads(request.data)["token"]
    try:
        decoded_token = jwt.decode(token, jwtSecret, algorithms=["HS256"])
        if decoded_token != None and int(decoded_token["exp"]) > int(time.time()):
            user = users.find_one({ "email": decoded_token["email"] })
            return jsonify({
                "email": decoded_token["email"],
                "username": user["username"]
            }), 200
    except:
        pass
    return "Invalid token", 401
