from app import flask_app

from app.entity.userprofile import UserProfile
from app.entity.user import User
from app.entity import db
from flask_bcrypt import Bcrypt

import json

# Initialize Bcrypt
bcrypt = Bcrypt()

def hashPassword(password:str) -> bytes:
    return bcrypt.generate_password_hash(password)

def _create_precondition_data():
    with flask_app.app_context():
        # Loads a list of user profile jsons
        userProfiles = []
        with open('./test/PRECONDITION_PROFILE.json') as f:
            userProfiles = json.load(f)
        # Creating user profiles
        for profile in userProfiles:
            UserProfile.createNewUserProfile(profile)

        # Loads a list of user account jsons
        userAccounts = []
        with open('./test/PRECONDITION_USER.json') as f:
            userAccounts = json.load(f)
        # Creating user accounts
        for account in userAccounts:
            account["password"] = hashPassword(account["password"])
            User.createNewUserAccount(account)
        
        db.session.commit()

def _delete_precondition_data():
    with flask_app.app_context():
        # Loads a list of user account jsons
        userAccounts = []
        with open('./test/PRECONDITION_USER.json') as f:
            userAccounts = json.load(f)
        # Deleting user accounts
        for account in userAccounts:
            User.query.filter_by(email=account["email"]).delete()
        
        # Loads a list of user profile jsons
        userProfiles = []
        with open('./test/PRECONDITION_PROFILE.json') as f:
            userProfiles = json.load(f)
        # Deleting user accounts
        for profile in userProfiles:
            UserProfile.query.filter_by(name=profile["name"]).delete()

        db.session.commit()