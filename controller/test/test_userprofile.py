import pytest

from app import flask_app
from app.controller.ProfileController import UserProfileController

@pytest.mark.test_valid_create_profile
def test_valid_create_profile():
    valid_create = [
        {
            "name": "AllPermissions",
            "description": "Profile with listing, buying, selling permission",
            "has_listing_permission": True,
            "has_buying_permission": True,
            "has_selling_permission": True
        },
        {
            "name": "LeastPermissions",
            "description": "Profile with no permissions",
            "has_listing_permission": False,
            "has_buying_permission": False,
            "has_selling_permission": False
        }
    ]
    with flask_app.app_context():
        controller = UserProfileController()
        # Test valid data
        for data in valid_create:
            successBool = controller.createProfile(data)
            assert successBool == True


@pytest.mark.test_invalid_create_profile
def test_invalid_create_profile():
    invalid_create = [
        {
            "name": "AllPermissions",
            "description": "Profile with duplicate name",
            "has_listing_permission": True,
            "has_buying_permission": True,
            "has_selling_permission": True
        },
        {
            "name": "AdminUser",
            "description": "Profile with admin permission",
            "has_listing_permission": True,
            "has_buying_permission": True,
            "has_selling_permission": True,
            "has_admin_permission": True
        },
    ]
    with flask_app.app_context():
        controller = UserProfileController()
        # # Test invalid data
        for data in invalid_create:
            unsuccessfulBool = controller.createProfile(data)
            assert unsuccessfulBool == False

@pytest.mark.test_valid_view_profile
def test_valid_view_profile():
    valid_profile_names = ["AllPermissions", "LeastPermissions"]
    with flask_app.app_context():
        controller = UserProfileController()
        # # Test valid data
        for data in valid_profile_names:
            userProfile = controller.viewUP(data)
            assert type(userProfile.get("name")) == str
            assert type(userProfile.get("description")) == str
            assert type(userProfile.get("has_listing_permission")) == bool
            assert type(userProfile.get("has_buying_permission")) == bool
            assert type(userProfile.get("has_selling_permission")) == bool

@pytest.mark.test_invalid_view_profile
def test_invalid_view_profile():
    invalid_profile_names = ["RandomProfile", "AnotherRandom"]
    with flask_app.app_context():
        controller = UserProfileController()
        # # Test invalid data
        for data in invalid_profile_names:
            userProfile = controller.viewUP(data)
            assert userProfile == None

@pytest.mark.test_valid_update_controller
def test_valid_update_controller():
    valid_update = [
        {
            "name": "AllPermissions",
            "description": "Updated description",
            "has_listing_permission": True,
            "has_buying_permission": True,
            "has_selling_permission": True
        },
        {
            "name": "LeastPermissions",
            "description": "Updating with one additional permission",
            "has_listing_permission": True
        }
    ]
    with flask_app.app_context():
        controller = UserProfileController()
        # # Test invalid data
        for data in valid_update:
            successfulBool = controller.updateProfileCnt(data)
            assert successfulBool == True

@pytest.mark.test_invalid_update_controller
def test_invalid_update_controller():
    invalid_update = [
        {
            "name": "RandomProfile",
            "description": "Profile not in database",
            "has_listing_permission": True,
            "has_buying_permission": True,
            "has_selling_permission": True
        },
        {
            "name": "AnotherRandom",
            "description": "One change on profile not in database"
        }
    ]
    with flask_app.app_context():
        controller = UserProfileController()
        # # Test invalid data
        for data in invalid_update:
            unsuccessfulBool = controller.updateProfileCnt(data)
            assert unsuccessfulBool == False