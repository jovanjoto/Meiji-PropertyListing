# Libraries
from flask import current_app

# Local dependencies
from .sqlalchemy import db


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
	def queryUserAccount(clf, email:str) -> object | None:
		"""
		Queries a User by passing arguments:
			- email:str, 
		returns User instance or None.
		"""
		return clf.query.filter_by(email=email).one_or_none()
    
	@classmethod
	def queryAllAccount(clf) -> list[object]:
		"""
		Queries all Users:
		returns an list of User instance.
		"""
		return clf.query.all()

	@classmethod
	def createNewUserAccount(clf, details:dict[str,str]) -> bool:
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
		# User already exist
		if clf.queryUserAccount(details.get("email")):
			return False
		
		# Initialize new user
		new_user = clf(**details)
		# Commit to DB
		with current_app.app_context():
			db.session.add(new_user)
			db.session.commit()
		return True
	
	@classmethod
	def updateAccount(clf, details:dict[str,str|None]) -> bool:
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
		with current_app.app_context():
			user = clf.queryUserAccount(details.get("email"))
			# User does not exist
			if not user:
				return False
			# Update information
			if details.get("phone", None):
				user.phone = details.get("phone")
			if details.get("password", None):
				user.password = details.get("password")
			if details.get("first_name", None):
				user.first_name = details.get("first_name")
			if details.get("last_name", None):
				user.last_name = details.get("last_name")			
			if details.get("profile", None):
				user.profile = details.get("profile")			
			db.session.commit()
		return True