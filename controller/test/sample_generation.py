from app import flask_app

from app.entity.userprofile import UserProfile
from app.entity.user import User
from app.controller.UserProfileController import UserProfileController
from app.controller.UserController import UserController
from app.entity import db

def _create_precondition_data():
    with flask_app.app_context():
        # Creating a user
        profile_controller = UserProfileController()
        user_controller = UserController()
        profile_controller.createProfile(
            {
                "name" : "Buyer",
                "description" : "Buyer profile",
                "has_buying_permission" : True
            }
        )
        user_controller.createAccount(
            {
                "email" : "bob@uow.edu.au",
                "phone" : "123456",
                "password" : "bob12345",
                "first_name" : "Bob",
                "last_name" : "ross",
                "profile" : "Buyer"
            }
        )
        user_controller.createAccount(
            {
                "email" : "john@uow.edu.au",
                "phone" : "654321",
                "password" : "bob12345",
                "first_name" : "John",
                "last_name" : "mama",
                "profile" : "Buyer"
            }
        )

def _create_precondition_data2():
    with flask_app.app_context():
        profile_controller = UserProfileController()
        profile_controller.createProfile(
            {
                "name": "AllPermissions",
                "description": "Profile with listing, buying, selling permission",
                "has_listing_permission": True,
                "has_buying_permission": True,
                "has_selling_permission": True
            }
        )
        profile_controller.createProfile(
            {
                "name": "LeastPermissions",
                "description": "Profile with no permissions",
                "has_listing_permission": False,
                "has_buying_permission": False,
                "has_selling_permission": False
            }
        )

def _delete_precondition_data():
     with flask_app.app_context():
        User.query.filter_by(email="bob@uow.edu.au").delete()
        User.query.filter_by(email="john@uow.edu.au").delete()
        UserProfile.query.filter_by(name="Buyer").delete()
        db.session.commit()

def _delete_precondition_data2():
    with flask_app.app_context():
        UserProfile.query.filter_by(name="AllPermissions").delete()
        UserProfile.query.filter_by(name="LeastPermissions").delete()
        db.session.commit()