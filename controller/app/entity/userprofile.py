# Libraries
from flask import current_app

# Local dependencies
from .sqlalchemy import db


# UserProfile Schema
class UserProfile(db.Model):
	__tablename__ = "user"
	# attributes
	name = db.Column(db.String(250), nullable=False, primary_key=True)
	description = db.Column(db.String(250), nullable=False)
	has_listing_permission = db.Column(db.Boolean(), default=False)
	has_buying_permission = db.Column(db.Boolean(), default=False)
	has_selling_permission = db.Column(db.Boolean(), default=False)

	# referenced by User
	profileToUserRel = db.relationship("User", back_populates="userToProfileRel", cascade='all, delete, save-update')

	@classmethod
	def queryUP(clf, UPName:str) -> object | None:
		"""
		Queries a UserProfile by passing arguments:
			- UPName:str, 
		returns UserProfile instance or None.
		"""
		return clf.query.filter_by(name=UPName).one_or_none()
	
	@classmethod
	def queryAllProfile(clf) -> list[object]:
		"""
		Queries all UserProfiles:
		returns an list of UserProfile instance.
		"""
		return clf.query.all()
	
	@classmethod
	def createNewUserProfile(clf, details:dict[str,str|bool]) -> bool:
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
		if UserProfile.queryUP(details.get("name")):
			return False
		
		# Initialize new profile
		new_profile = clf(**details)
		# Commit to DB
		with current_app.app_context():
			db.session.add(new_profile)
			db.session.commit()
		return True
	
	@classmethod
	def updateProfile(clf, new_details:dict[str,str|None]) -> bool:
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
			profile = clf.queryUP(new_details.get("name"))
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