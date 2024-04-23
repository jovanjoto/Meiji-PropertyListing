import pytest

from app import flask_app
from app.controller.UserController import UserController
from app.entity import User
from .sample_generation import _create_precondition_data, _delete_precondition_data
from app.entity import db

@pytest.mark.valid_create_account
def test_valid_create_account():
    """
    Valid user creation creation
    """
    valid_account = [
        {"email" : "zzzz@uow.edu.au", "first_name" : "zzz", "last_name" : "zzz", "phone" : "1111", "password" : "zzzz12345", "profile" : "Buyer"}
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
def test_invalid_create_account():
    """
    Invalid user creation creation
    """
    invalid_account = [
        {"email" : "bob@uow.edu.au", "first_name" : "bob", "last_name" : "ross", "phone" : "1111", "password" : "bob12345", "profile" : "Buyer"},
        {"email" : "mama@uow.edu.au", "first_name" : "bob", "last_name" : "ross", "phone" : "654321", "password" : "bob12345", "profile" : "Buyer"},
        {"email" : "hello@uow.edu.au", "first_name" : "bob", "last_name" : "ross", "phone" : "2222", "password" : "bob12345", "profile" : "Hello"},
        {"email" : "admin2@uow.edu.au", "first_name" : "bob", "last_name" : "ross", "phone" : "3333", "password" : "bob12345", "profile" : "Admin"},
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

@pytest.mark.valid_view_account
def test_valid_view_account():
    """
    Valid view user account
    """
    valid_account = [
        {"email" : "bob@uow.edu.au"}
    ]
    _create_precondition_data()
    with flask_app.app_context():

        user_controller = UserController()
        for data in valid_account:
            res = user_controller.viewUserAccount(data["email"])
            assert res != None
    _delete_precondition_data()

@pytest.mark.invalid_view_account
def test_invalid_view_account():
    """
    InValid view user account
    """
    valid_account = [
        {"email" : "zzz@uow.edu.au"}
    ]
    _create_precondition_data()
    with flask_app.app_context():

        user_controller = UserController()
        for data in valid_account:
            res = user_controller.viewUserAccount(data["email"])
            assert res == None
    _delete_precondition_data()

@pytest.mark.valid_update_account
def test_valid_update_account():
    # Valid update user account
    valid_account = [
        {"email" : "bob@uow.edu.au", "password" : "bob12345", "phone" : "1111", "first_name" : "Ross", "last_name" : "bob", "profile" : "Buyer"}
    ]
    _create_precondition_data()
    with flask_app.app_context():

        user_controller = UserController()
        for data in valid_account:
            res = user_controller.updateAccDetails(data)
            assert res == True
    _delete_precondition_data()

@pytest.mark.invalid_update_account
def test_invalid_update_account():
    # InValid update user account
    invalid_account = [
        {"email" : "bob@uow.edu.au", "password" : "bob12345", "phone" : "654321", "first_name" : "Ross", "last_name" : "bob", "profile" : "Buyer"},
        {"email" : "zzz@uow.edu.au", "password" : "zzzpasswd", "phone" : "321123", "first_name" : "zzz", "last_name" : "zzz", "profile" : "Buyer"},
        {"email" : "bob@uow.edu.au", "password" : "bob12345", "phone" : "1111", "first_name" : "Ross", "last_name" : "bob", "profile" : "Hello"},
        {"email" : "bob@uow.edu.au", "password" : "bob12345", "phone" : "1111", "first_name" : "Ross", "last_name" : "bob", "profile" : "Admin"},
        {"email" : "admin@admin.com", "password" : "newadminpass", "phone" : "1111", "first_name" : "Ross", "last_name" : "bob", "profile" : "Buyer"}
    ]
    _create_precondition_data()
    with flask_app.app_context():

        user_controller = UserController()
        for data in invalid_account:
            res = user_controller.updateAccDetails(data)
            assert res == False
    _delete_precondition_data()

@pytest.mark.search_user_account
def test_search_user_account():
    _create_precondition_data()
    with flask_app.app_context():
        user_controller = UserController()
        all_user = user_controller.searchAllAccount()
        assert len(all_user["accounts"]) > 0
        assert all_user["accounts"] == [
            {"email": "bob@uow.edu.au", "phone": "123456", "first_name": "Bob", "last_name": "ross", "profile": "Buyer", "suspended": False},
            {"email": "john@uow.edu.au", "phone": "654321", "first_name": "John", "last_name": "mama", "profile": "Buyer", "suspended": False}
        ]
    _delete_precondition_data()