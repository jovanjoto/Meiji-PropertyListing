import pytest

from app import flask_app
from app.entity.userprofile import UserProfile
from app.entity import db
from test.sample_generation import _create_precondition_data, _delete_precondition_data
from test.controller_test.utils import getToken
import requests
import json

@pytest.mark.test_valid_create_profile
def test_valid_create_profile():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_create = [
        {
            "name": "AllPermissions",
            "description": "Profile with listing, buying, selling permission",
            "has_listing_permission": 1,
            "has_buying_permission": 1,
            "has_selling_permission": 1
        }
    ]
    with flask_app.app_context():
        # Test valid data
        for data in valid_create:
            url = "http://localhost:5000/api/profile/create_user_profile"
            response = requests.put(url, json=data, headers=headers)
            successBool = json.loads(response.text)["success"]
            assert successBool == True
    
        # delete created user profile
        UserProfile.query.filter_by(name="AllPermissions").delete()
        db.session.commit()

    _delete_precondition_data()


@pytest.mark.test_invalid_create_profile
def test_invalid_create_profile():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    invalid_create = [
        {
            "name": "Buyer",
            "description": "Profile with duplicate name",
            "has_listing_permission": True,
            "has_buying_permission": True,
            "has_selling_permission": True
        },
        {
            "name": "AnotherAdminProfile",
            "description": "Profile with admin permission",
            "has_listing_permission": True,
            "has_buying_permission": True,
            "has_selling_permission": True,
            "has_admin_permission": True
        },
    ]

    with flask_app.app_context():
        # Test invalid data
        for data in invalid_create:
            url = "http://localhost:5000/api/profile/create_user_profile"
            response = requests.put(url, json=data, headers=headers)
            unsuccessfulBool = json.loads(response.text)["success"]
            assert unsuccessfulBool == False
    
    _delete_precondition_data()


@pytest.mark.test_valid_view_profile
def test_valid_view_profile():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_view = ["Buyer"]

    with flask_app.app_context():
        # Test valid data
        for data in valid_view:
            url = "http://localhost:5000/api/profile/view_user_profile"
            response = requests.get(url, params={"profileName": data}, headers=headers)
            userProfile = json.loads(response.text)["success"]
            assert userProfile["name"] == "Buyer"
            assert userProfile["description"] == "Buyer profile"
            assert userProfile["has_listing_permission"] == False
            assert userProfile["has_buying_permission"] == True
            assert userProfile["has_selling_permission"] == False
    
    _delete_precondition_data()

@pytest.mark.test_invalid_view_profile
def test_invalid_view_profile():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    invalid_view = ["RandomProfile"]

    with flask_app.app_context():
        # Test invalid data
        for data in invalid_view:
            url = "http://localhost:5000/api/profile/view_user_profile"
            response = requests.get(url, params={"profileName": data}, headers=headers)
            userProfile = json.loads(response.text)["success"]
            assert userProfile == None
    
    _delete_precondition_data()

@pytest.mark.test_valid_update_profile
def test_valid_update_profile():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_update = [{
        "name": "Buyer",
        "description": "Buyer can now sell too",
        "has_listing_permission": 0,
        "has_buying_permission": 1,
        "has_selling_permission": 1
    }]

    with flask_app.app_context():
        # Test valid data
        for data in valid_update:
            url = "http://localhost:5000/api/profile/update_user_profile"
            response = requests.patch(url, json=data, headers=headers)
            successBool = json.loads(response.text)["success"]
            assert successBool == True
    
    _delete_precondition_data()


@pytest.mark.test_invalid_update_profile
def test_invalid_update_profile():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_update = [{
            "name": "RandomProfile",
            "description": "Profile not in database",
            "has_listing_permission": 1,
            "has_buying_permission": 1,
            "has_selling_permission": 1
        }]

    with flask_app.app_context():
        # Test invalid data
        for data in valid_update:
            url = "http://localhost:5000/api/profile/update_user_profile"
            response = requests.patch(url, json=data, headers=headers)
            unsuccessfulBool = json.loads(response.text)["success"]
            assert unsuccessfulBool == False
    
    _delete_precondition_data()

@pytest.mark.test_search_user_profile
def test_search_user_profile():
    _create_precondition_data()

    token = getToken()

    headers = {
        "Authorization": f"Bearer {token}"
    }

    with flask_app.app_context():
        # Test searched data
        url = "http://localhost:5000/api/profile/search_user_profile"
        response = requests.get(url, headers=headers)
        profileList = json.loads(response.text)["profiles"]
        for profile in profileList:
            assert type(profile["name"]) == str
            assert type(profile["description"]) == str
            assert type(profile["has_buying_permission"]) == bool
            assert type(profile["has_listing_permission"]) == bool
            assert type(profile["has_selling_permission"]) == bool
    
    _delete_precondition_data()