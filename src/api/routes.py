"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, abort
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    email = "myuser4@4geeks.mx"
    password = "secret"
    error = False
    body = {}

    try:
        user = User(email=email, password=password)
        db.session.add(user)
        db.session.commit()
        body = user.serialize()
        print('commited')
    except:
        error = True
        db.session.rollback()
    finally:
        db.session.close()
    if error:
        abort(500)
    else:
        print('returning')
        return jsonify(body)

    # return jsonify(user), 200

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token) 