
import pytest

from controller.app import flask_app
from entity.user import User
from entity import db
from controller.test.sample_generation import _create_precondition_data, _delete_precondition_data
from controller.test.controller_test.utils import getToken
import requests
import json


@pytest.mark.test_valid_create_account
def test_valid_create_account():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_account = [
        {"email" : "zzzz@uow.edu.au", "first_name" : "zzz", "last_name" : "zzz", "phone" : "1111", "password" : "zzzz12345", "profile" : "Buyer"}
    ]
    with flask_app.app_context():
        for data in valid_account:
            url = "http://localhost:5000/api/user/create_user_account"
            response = requests.put(url, json=data, headers=headers)
            successBool = json.loads(response.text)["success"]
            assert successBool == True
    
        # delete created user account
        User.query.filter_by(email="zzzz@uow.edu.au").delete()
        db.session.commit()

    _delete_precondition_data()

@pytest.mark.test_invalid_create_account
def test_invalid_create_account():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    invalid_account = [
        {"email" : "bob@uow.edu.au", "first_name" : "bob", "last_name" : "ross", "phone" : "1111", "password" : "bob12345", "profile" : "Buyer"},
        {"email" : "mama@uow.edu.au", "first_name" : "bob", "last_name" : "ross", "phone" : "654321", "password" : "bob12345", "profile" : "Buyer"},
        {"email" : "hello@uow.edu.au", "first_name" : "bob", "last_name" : "ross", "phone" : "2222", "password" : "bob12345", "profile" : "Hello"},
        {"email" : "admin2@uow.edu.au", "first_name" : "bob", "last_name" : "ross", "phone" : "3333", "password" : "bob12345", "profile" : "Admin"},
    ]
    with flask_app.app_context():
        for data in invalid_account:
            url = "http://localhost:5000/api/user/create_user_account"
            response = requests.put(url, json=data, headers=headers)
            unsuccessfulBool = json.loads(response.text)["success"]
            assert unsuccessfulBool == False

    _delete_precondition_data()

@pytest.mark.test_valid_view_account
def test_valid_view_account():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_account = ["bob@uow.edu.au"]

    with flask_app.app_context():
        for data in valid_account:
            url = "http://localhost:5000/api/user/view_user_account"
            response = requests.get(url, params={"email": data}, headers=headers)
            successfulBool = json.loads(response.text)["success"]
            assert successfulBool == True

    _delete_precondition_data()

@pytest.mark.test_invalid_view_account
def test_invalid_view_account():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_account = ["zzz@uow.edu.au"]
    
    with flask_app.app_context():
        for data in valid_account:
            url = "http://localhost:5000/api/user/view_user_account"
            response = requests.get(url, params={"email": data}, headers=headers)
            unsuccessfulBool = json.loads(response.text)["success"]
            assert unsuccessfulBool == False

    _delete_precondition_data()

@pytest.mark.test_valid_update_account
def test_valid_update_account():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_account = [{"email" : "bob@uow.edu.au", "password" : "bob12345", "phone" : "1111", "first_name" : "Ross", "last_name" : "bob", "profile" : "Buyer"}]

    with flask_app.app_context():
        for data in valid_account:
            url = "http://localhost:5000/api/user/update_user_account"
            response = requests.patch(url, json=data, headers=headers)
            successBool = json.loads(response.text)["success"]
            assert successBool == True

    _delete_precondition_data()

@pytest.mark.test_invalid_update_account
def test_invalid_update_account():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_account = [
        {"email" : "bob@uow.edu.au", "password" : "bob12345", "phone" : "654321", "first_name" : "Ross", "last_name" : "bob", "profile" : "Buyer"},
        {"email" : "zzz@uow.edu.au", "password" : "zzzpasswd", "phone" : "321123", "first_name" : "zzz", "last_name" : "zzz", "profile" : "Buyer"},
        {"email" : "bob@uow.edu.au", "password" : "bob12345", "phone" : "1111", "first_name" : "Ross", "last_name" : "bob", "profile" : "Hello"},
        {"email" : "bob@uow.edu.au", "password" : "bob12345", "phone" : "1111", "first_name" : "Ross", "last_name" : "bob", "profile" : "Admin"},
        {"email" : "admin@admin.com", "password" : "newadminpass", "phone" : "1111", "first_name" : "Ross", "last_name" : "bob", "profile" : "Buyer"}
    ]

    with flask_app.app_context():
        for data in valid_account:
            url = "http://localhost:5000/api/user/update_user_account"
            response = requests.patch(url, json=data, headers=headers)
            unsuccessfulBool = json.loads(response.text)["success"]
            assert unsuccessfulBool == False

    _delete_precondition_data()

@pytest.mark.test_search_user_account
def test_search_user_account():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    with flask_app.app_context():
        # Test searched data
        url = "http://localhost:5000/api/user/search_user_account"
        response = requests.get(url, headers=headers)
        accountList = json.loads(response.text)["accounts"]
        for account in accountList:
            assert type(account["email"]) == str
            assert type(account["phone"]) == str
            assert type(account["first_name"]) == str
            assert type(account["last_name"]) == str
            assert type(account["profile"]) == str
            assert type(account["suspended"]) == bool

    _delete_precondition_data()
