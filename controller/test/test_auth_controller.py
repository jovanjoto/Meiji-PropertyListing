import pytest
import jwt

from app import flask_app
from config import Config
from app.controller.authentication import AuthController
from .sample_generation import _create_precondition_data, _delete_precondition_data

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
        # Testing valid login
        auth = AuthController()
        for data in valid_login:
            token = auth.login(data["email"], password=data["password"])
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
        auth = AuthController()
        for data in invalid_login:
                token = auth.login(data["email"], password=data["password"])
                assert token == None

        # Deleting test user and profile
    _delete_precondition_data()