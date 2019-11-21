"""
The flask application package.
"""

import hashlib, binascii, os, pymongo, jwt, time, datetime, json, random
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
gameData = db["gameData"]
highscores = db["highscores"]

if users.find_one() == None:
    print("No users in database, creating admin account...")
    users.insert({
        "email": "admin@a.a",
        "username": "admin",
        "passwordHash": hash_password("admin")
    })
    print("Done")

if gameData.find_one() == None:
    print("No game data in database, populating...")
    coordinates = ["50.288641 18.677335", "50.264850 18.721861", "50.296232 18.670017", "50.300551 18.669556", "50.313086 18.689425"]
    imageUrls = [
        "https://bi.im-g.pl/im/f6/bc/fe/z16694518V,Centrum-Nowych-Technologii-Politechniki-Slaskiej.jpg",
        "https://pic.conadrogach.pl/zdjecia/obiekt/2366/restauracja-mcdonalds9.450.jpg",
        "https://gliwice.eu/sites/default/files/styles/gliwice_880x495/public/news/images/2_1.jpg?itok=VIZ2TZSf",
        "https://sunnycompany.com/media/zoo/images/palmiarnia-gliwice1_0d04967702e20dbf0c7469dfaf1aeaf8.jpg",
        "https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201307/radiostacja_gliwice.jpg?itok=AzuJWu_y"
    ]
    for i in range(0, 5):
        gameData.insert({
            "coordinates": coordinates[i],
            "imageUrl": imageUrls[i]
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

@app.route("/register", methods=["POST"])
@cross_origin()
def register():
    data = json.loads(request.data)
    try:
        users.insert({
            "email": data["email"],
            "username": data["username"],
            "passwordHash": hash_password(data["password"])
        })
        return "", 200
    except:
        return "", 404

@app.route("/saveScore", methods=["POST"])
@cross_origin()
def saveScore():
    data = json.loads(request.data)
    highscores.insert({
        "username": data["username"],
        "score": int(data["score"])
    })
    return "", 200

@app.route("/getGameData", methods=["GET"])
@cross_origin()
def getGameData():
    indexes = random.sample(range(0, gameData.count()), 5)
    indexes.sort()
    print(indexes)
    data = []
    index = 0
    for dataPiece in gameData.find():
        if index == indexes[0]:
            data.append({
                "coordinates": dataPiece["coordinates"],
                "imageUrl": dataPiece["imageUrl"]
            })
            indexes.pop(0)
            index += 1
    random.shuffle(data)
    return jsonify(data), 200

@app.route("/getGlobalHighscores", methods=["GET"])
@cross_origin()
def getGlobalHighscores():
    data = []
    for highscore in highscores.find():
        data.append({
            "username": highscore["username"],
            "score": highscore["score"]
        })
    
    data.sort(key = lambda x: x["score"], reverse=True)

    return jsonify(data[0:10]), 200

@app.route("/getUserHighscores", methods=["GET"])
@cross_origin()
def getUserHighscores():
    data = []
    print(request.args.get("username"))
    for highscore in highscores.find({ "username": request.args.get("username") }):
        data.append(int(highscore["score"]))
    
    data.sort(reverse=True)

    return jsonify(data[0:10]), 200

@app.route("/getLeaderboardPosition", methods=["GET"])
@cross_origin()
def getLeaderboardPosition():
    print(request.args.get("score"))
    betterScores = highscores.find({ "score": {"$gt": int(request.args.get("score"))} }).count()
    return jsonify(betterScores + 1), 200
