from app import flask_app

from app.entity.userprofile import UserProfile
from app.entity.user import User
from app.entity import db

import json

def _create_precondition_data():
    with flask_app.app_context():
        # Creating user profiles
        UserProfile.createNewUserProfile(
            {
                "name" : "Buyer",
                "description" : "Buyer profile",
                "has_buying_permission" : True
            }
        )
        UserProfile.createNewUserProfile(
            {
                "name" : "Seller",
                "description" : "Seller profile",
                "has_selling_permission" : True
            }
        )
        UserProfile.createNewUserProfile(
            {
                "name" : "Real Estate Agent",
                "description" : "Real Estate Agent profile",
                "has_listing_permission" : True
            }
        )

        # Loads a list of user jsons
        userAccounts = []
        with open('./test/PRECONDITION_USER.json') as f:
            userAccounts = json.load(f)
        # Creating user accounts
        for account in userAccounts:
            User.createNewUserAccount(account)
        
        db.session.commit()

def _delete_precondition_data():
    with flask_app.app_context():
        # Loads a list of user jsons
        userAccounts = []
        with open('./test/PRECONDITION_USER.json') as f:
            userAccounts = json.load(f)
        # Deleting user accounts
        for account in userAccounts:
            User.query.filter_by(email=account["email"]).delete()

        # Deleting user profiles
        UserProfile.query.filter_by(name="Buyer").delete()
        UserProfile.query.filter_by(name="Seller").delete()
        UserProfile.query.filter_by(name="Real Estate Agent").delete()

        db.session.commit()


def _create_precondition_data_user_profile():
    with flask_app.app_context():
        UserProfile.createNewUserProfile(
            {
                "name": "AllPermissions",
                "description": "Profile with listing, buying, selling permission",
                "has_listing_permission": True,
                "has_buying_permission": True,
                "has_selling_permission": True
            }
        )
        UserProfile.createNewUserProfile(
            {
                "name": "LeastPermissions",
                "description": "Profile with no permissions",
                "has_listing_permission": False,
                "has_buying_permission": False,
                "has_selling_permission": False
            }
        )

def _delete_precondition_data_user_profile():
    with flask_app.app_context():
        UserProfile.query.filter_by(name="AllPermissions").delete()
        UserProfile.query.filter_by(name="LeastPermissions").delete()
        db.session.commit()