import pytest
import jwt
import requests
import json

from app import flask_app
from config import Config
from test.sample_generation import _create_precondition_data, _delete_precondition_data

@pytest.mark.valid_login_test
def test_valid_login():
    """
    Login should be valid here
    """
    valid_login = [
        {"email" : "bob@uow.edu.au", "password" : "bob12345"}
    ]

    _create_precondition_data()
    with flask_app.app_context():
        for data in valid_login:
            # Testing valid login
            url = 'http://localhost:5000/api/authentication/login'
            response = requests.post(url, json=data)
            token = json.loads(response.text)["access_token"]

            try:
                jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            except:
                assert False

    _delete_precondition_data()

@pytest.mark.invalid_login_test
def test_invalid_login():
    """
    Login should be invalid here
    """
    invalid_login = [
        {"email" : "bob@uow.edu.au", "password" : "000"},
        {"email" : "memes@uow.edu.au", "password" : "memes123"}
    ]

    _create_precondition_data()
    with flask_app.app_context():
        for data in invalid_login:
            # Testing valid login
            url = 'http://localhost:5000/api/authentication/login'
            response = requests.post(url, json=data)
            token = json.loads(response.text)["access_token"]

            assert token == None

    _delete_precondition_data()