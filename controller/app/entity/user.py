# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore

# Local dependencies
from .sqlalchemy import db
from .userprofile import UserProfile

# User Schema
class User(db.Model):
	__tablename__ = "user"
	# attributes
	email = db.Column(db.String(250), nullable=False, primary_key=True)
	phone = db.Column(db.String(250), nullable=False, unique=True)
	password = db.Column(db.String(250), nullable=False)
	first_name = db.Column(db.String(250), nullable=False)
	last_name = db.Column(db.String(250), nullable=False)

	# profile foreign key: UserProfile.name
	profile = db.Column(db.String(250), db.ForeignKey('userprofile.name'), nullable=False)
	userToProfileRel = db.relationship("userprofile", back_populates="profileToUserRel", cascade='all, delete, save-update',
								  foreign_keys="user.profile")

	# referenced by Suspension
	userToSuspensionRel = db.relationship("suspension", back_populates="suspensionToUserRel", cascade='all, delete, save-update')
	
	@classmethod
	def queryUserAccount(cls, email:str) -> Self | None:
		"""
		Queries a User by passing arguments:
			- email:str, 
		returns User instance or None.
		"""
		return cls.query.filter_by(email=email).one_or_none()
    
	@classmethod
	def queryAllAccount(cls) -> list[Self]:
		"""
		Queries all Users:
		returns an list of User instance.
		"""
		return cls.query.all()

	@classmethod
	def createNewUserAccount(cls, details:dict[str,str]) -> bool:
		"""
		Creates a new User by passing arguments:
			- details: dict[str,str], which contains pairs:
				- email:str,
				- phone:str, 
				- password:str, 
				- first_name:str, 
				- last_name:str, 
				- profile:str
		returns bool.
		"""
		# Profile does not exist
		profile = UserProfile.queryUP(details["profile"])
		if not profile:
			return False
		# Unauthorized request to make a user with admin permissions
		if profile.has_admin_permission:
			return False
		# User already exist
		if cls.queryUserAccount(details["email"]):
			return False
		
		# Initialize new user
		new_user = cls(**details)
		# Commit to DB
		with current_app.app_context():
			db.session.add(new_user)
			db.session.commit()
		return True
	
	@classmethod
	def updateAccount(cls, details:dict[str,str]) -> bool:
		"""
		Updates an existing User by passing arguments:
			- details: dict[str,str], which contains pairs:
				- email:str,
				- phone:str, 
				- password:str, 
				- first_name:str, 
				- last_name:str, 
				- profile:str
		returns bool.
		"""
		# Profile does not exist
		if details.get("profile"):
			new_profile = UserProfile.queryUP(details["profile"])
			if not new_profile:
				return False
			# Unauthorized request to uodate a user's profile into admin.
			if new_profile.has_admin_permission:
				return False
			
		with current_app.app_context():
			user = cls.queryUserAccount(details["email"])
			# User does not exist
			if not user:
				return False
			# Trying to update an admin's information
			profile = UserProfile.queryUP(user.profile)
			if profile.has_admin_permission:
				return False
			
			# Update information
			if details.get("phone"):
				user.phone = details.get("phone")
			if details.get("password"):
				user.password = details.get("password")
			if details.get("first_name"):
				user.first_name = details.get("first_name")
			if details.get("last_name"):
				user.last_name = details.get("last_name")			
			if details.get("profile"):
				user.profile = details.get("profile")			
			db.session.commit()
		return True