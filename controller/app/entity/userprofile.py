# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore

# Local dependencies
from .sqlalchemy import db

# UserProfile Schema
class UserProfile(db.Model):
	__tablename__ = "UserProfile"
	# attributes
	name = db.Column(db.String(250), nullable=False, primary_key=True)
	description = db.Column(db.String(250), nullable=False)
	has_listing_permission = db.Column(db.Boolean(), default=False)
	has_buying_permission = db.Column(db.Boolean(), default=False)
	has_selling_permission = db.Column(db.Boolean(), default=False)
	has_admin_permission = db.Column(db.Boolean(), default=False)

	# referenced by User
	profileToUserRel = db.relationship("User", back_populates="userToProfileRel", cascade='all, delete, save-update')

	@classmethod
	def queryUP(cls, UPName:str) -> Self | None:
		"""
		Queries a UserProfile by passing arguments:
			- UPName:str, 
		returns UserProfile instance or None.
		"""
		return cls.query.filter_by(name=UPName).one_or_none()
	
	@classmethod
	def queryAllProfile(cls) -> list[Self]:
		"""
		Queries all UserProfiles:
		returns an list of UserProfile instance.
		"""
		return cls.query.all()
	
	@classmethod
	def createNewUserProfile(cls, details:dict[str,str|bool]) -> bool:
		"""
		Creates a new User by passing arguments:
			- details: dict[str,str|bool], which contains pairs:
				- name:str,
				- description:str, 
				- has_listing_permission:bool, 
				- has_buying_permission:bool, 
				- has_selling_permission:bool 
		returns bool.
		"""
		# Profile already exist
		if cls.queryUP(details["name"]): # type: ignore
			return False
		
		# Block creating admin user
		if details.get("has_admin_permission"):
			return False

		# Initialize new profile
		new_profile = cls(**details)
		# Commit to DB
		with current_app.app_context():
			db.session.add(new_profile)
			db.session.commit()
		return True
	
	@classmethod
	def updateProfile(cls, new_details:dict[str,str|bool]) -> bool:
		"""
		Updates an existing UserProfile by passing arguments:
			- new_details: dict[str,str|bool], which contains pairs:
				- name:str,
				- description:str, 
				- has_listing_permission:bool, 
				- has_buying_permission:bool, 
				- has_selling_permission:bool 
		returns bool.
		"""
		with current_app.app_context():
			profile = cls.queryUP(new_details["name"]) # type: ignore
			# Profile does not exist
			if not profile:
				return False
			# Update information
			if new_details.get("description", None):
				profile.description = new_details.get("description")
			if new_details.get("has_listing_permission", None) is not None:
				profile.has_listing_permission = new_details.get("has_listing_permission")
			if new_details.get("has_buying_permission", None) is not None:
				profile.has_buying_permission = new_details.get("has_buying_permission")
			if new_details.get("has_selling_permission", None) is not None:
				profile.has_selling_permission = new_details.get("has_selling_permission")			
			db.session.commit()
		return True