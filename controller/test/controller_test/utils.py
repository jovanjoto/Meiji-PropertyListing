import jwt
import requests
import json

from controller.app import flask_app

def getToken():
    login_details = {"email" : "admin@admin.com", "password" : "admin"}
    with flask_app.app_context():
        # Testing valid login
        url = 'http://localhost:5000/api/authentication/login'
        response = requests.post(url, json=login_details)
        token = json.loads(response.text)["access_token"]
        return token