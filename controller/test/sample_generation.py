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

def _delete_precondition_data():
     with flask_app.app_context():
        User.query.filter_by(email="bob@uow.edu.au").delete()
        User.query.filter_by(email="john@uow.edu.au").delete()
        UserProfile.query.filter_by(name="Buyer").delete()
        db.session.commit()