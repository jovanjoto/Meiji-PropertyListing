import pytest

from app import flask_app
from app.controller.SuspensionController import SuspensionController
from .sample_generation import _create_precondition_data, _delete_precondition_data

@pytest.mark.test_valid_suspend_account
def test_valid_suspend_account():
    _create_precondition_data()

    valid_suspension = [
        {
            "email" : "bob@uow.edu.au",
            "reason": "Bob tried to DDOS the system.",
            "duration": "10"
        }
    ]

    with flask_app.app_context():
        controller = SuspensionController()
        for data in valid_suspension:
            successBool = controller.suspendAccCnt(data["email"], data["reason"], int(data["duration"]))
            assert successBool == True

    _delete_precondition_data()

@pytest.mark.test_invalid_suspend_account
def test_invalid_suspend_account():
    _create_precondition_data()

    invalid_suspension = [
        {
            "email" : "nonexistent@uow.edu.au",
            "reason": "Suspend user that doesn't exist.",
            "duration": "10"
        },
        {
            "email" : "bob@uow.edu.au",
            "reason": "Suspend user that is already suspended.",
            "duration": "10"
        }
    ]

    with flask_app.app_context():
        controller = SuspensionController()
        for data in invalid_suspension:
            unsuccessfulBool = controller.suspendAccCnt(data["email"], data["reason"], int(data["duration"]))
            assert unsuccessfulBool == False

    _delete_precondition_data()

@pytest.mark.test_valid_suspend_profile
def test_valid_suspend_profile():
    _create_precondition_data()

    valid_suspension = [
        {
            "profile" : "Buyer",
            "reason": "Buyers are all banned for a week.",
            "duration": "7"
        }
    ]

    with flask_app.app_context():
        controller = SuspensionController()
        for data in valid_suspension:
            successBool = controller.suspendProfileCnt(data["profile"], data["reason"], int(data["duration"]))
            assert successBool == True

    _delete_precondition_data()

@pytest.mark.test_invalid_suspend_profile
def test_invalid_suspend_profile():
    _create_precondition_data()

    invalid_suspension = [
        {
            "profile" : "RandomProfile",
            "reason": "Banning this random profile for a week.",
            "duration": "7"
        }
    ]

    with flask_app.app_context():
        controller = SuspensionController()
        for data in invalid_suspension:
            unsuccessfulBool = controller.suspendProfileCnt(data["profile"], data["reason"], int(data["duration"]))
            assert unsuccessfulBool == False

    _delete_precondition_data()