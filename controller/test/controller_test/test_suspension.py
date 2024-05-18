import pytest

from controller.app import flask_app
from entity.suspension import Suspension
from entity import db
from controller.test.sample_generation import _create_precondition_data, _delete_precondition_data
from controller.test.controller_test.utils import getToken
import requests
import json

@pytest.mark.test_valid_suspend_account
def test_valid_suspend_account():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_suspension = [
        {
            "email" : "bob@uow.edu.au",
            "reason": "Bob tried to DDOS the system.",
            "duration": "10"
        }
    ]
    with flask_app.app_context():
        for data in valid_suspension:
            url = "http://localhost:5000/api/suspension/suspend_user_account"
            response = requests.put(url, json=data, headers=headers)
            successBool = json.loads(response.text)["success"]
            assert successBool == True
    
        # delete created suspension
        Suspension.query.delete()
        db.session.commit()

    _delete_precondition_data()

@pytest.mark.test_invalid_suspend_account
def test_invalid_suspend_account():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_suspension = [
        {
            "email" : "nonexistent@uow.edu.au",
            "reason": "Suspend user that doesn't exist.",
            "duration": "10"
        },
        {
            "email" : "john@uow.edu.au",
            "reason": "Suspend user that is already suspended.",
            "duration": "10"
        }
    ]
    with flask_app.app_context():
        for data in valid_suspension:
            url = "http://localhost:5000/api/suspension/suspend_user_account"
            response = requests.put(url, json=data, headers=headers)
            unsuccessfulBool = json.loads(response.text)["success"]
            assert unsuccessfulBool == False

    _delete_precondition_data()


@pytest.mark.test_valid_suspend_profile
def test_valid_suspend_profile():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_suspension = [
        {
            "profile" : "Buyer",
            "reason": "Buyers are all banned for a week.",
            "duration": "7"
        }
    ]
    with flask_app.app_context():
        for data in valid_suspension:
            url = "http://localhost:5000/api/suspension/suspend_user_profile"
            response = requests.put(url, json=data, headers=headers)
            successBool = json.loads(response.text)["success"]
            assert successBool == True
    
        # delete created suspension
        Suspension.query.delete()
        db.session.commit()

    _delete_precondition_data()

@pytest.mark.test_invalid_suspend_profile
def test_invalid_suspend_profile():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_suspension = [
        {
            "profile" : "RandomProfile",
            "reason": "Banning this random profile for a week.",
            "duration": "7"
        }
    ]
    with flask_app.app_context():
        for data in valid_suspension:
            url = "http://localhost:5000/api/suspension/suspend_user_profile"
            response = requests.put(url, json=data, headers=headers)
            unsuccessfulBool = json.loads(response.text)["success"]
            assert unsuccessfulBool == False
    
    _delete_precondition_data()
