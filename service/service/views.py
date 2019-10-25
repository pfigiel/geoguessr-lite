"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template, jsonify, request
from service import app

@app.route('/')
@app.route('/home')
def home():
    """GET return webpage example"""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route("/postTest", methods=["POST"])
def postTest():
    """POST example"""
    print(request.data)
    return jsonify({"requestData": "test" }), 200

@app.route("/getTest")
def getTest():
    """GET example"""
    return jsonify({"test": "test"}), 200
