import pytest

from app import flask_app
from app.controller.UserController import UserController
from app.entity import User
from .sample_generation import _create_precondition_data, _delete_precondition_data
from app.entity import db

@pytest.mark.valid_create_account
def test_create_account():
    """
    Valid user creation creation
    Assume the following user account already in the database
    email = bob@uow.edu.au
    password = bob12345
    """
    valid_account = [
        {"email" : "zzzz@uow.edu.au", "password" : "zzzz12345", "profile" : "Buyer"}
    ]
    _create_precondition_data()
    with flask_app.app_context():

        user_controller = UserController()
        for data in valid_account:
            res = user_controller.createAccount(data)
            assert res == True
            User.query.filter_by(email=data["email"]).delete()
            db.session.commit()

    _delete_precondition_data()

@pytest.mark.invalid_create_account
def test_create_account():
    """
    Invalid user creation creation
    Assume the following user account already in the database
    email = bob@uow.edu.au
    password = bob12345
    """
    invalid_account = [
        {"email" : "bob@uow.edu.au", "password" : "bob12345", "profile" : "Buyer"},
        {"email" : "bob@uow.edu.au", "password" : "bob12345", "profile" : "Hello"},
        {"email" : "bob@uow.edu.au", "password" : "bob12345", "profile" : "Admin"},
    ]
    _create_precondition_data()
    with flask_app.app_context():

        user_controller = UserController()
        for data in invalid_account:
            res = user_controller.createAccount(data)
            assert res == False
            User.query.filter_by(email=data["email"]).delete()
            db.session.commit()

    _delete_precondition_data()