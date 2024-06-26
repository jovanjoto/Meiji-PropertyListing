# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore

# Local dependencies
from .sqlalchemy import db

# User Schema
class User(db.Model):
	__tablename__ = "User"
	# attributes
	email = db.Column(db.String(250), nullable=False, primary_key=True)
	phone = db.Column(db.String(250), nullable=False, unique=True)
	password = db.Column(db.String(250), nullable=False)
	first_name = db.Column(db.String(250), nullable=False)
	last_name = db.Column(db.String(250), nullable=False)

	# profile foreign key: UserProfile.name
	profile = db.Column(db.String(250), db.ForeignKey('UserProfile.name'), nullable=False)
	userToProfileRel = db.relationship("UserProfile", back_populates="profileToUserRel", cascade='all, delete, save-update',
								  foreign_keys="User.profile")

	# referenced by Suspension
	userToSuspensionRel = db.relationship("Suspension", back_populates="suspensionToUserRel", cascade='all, delete, save-update')
	# referenced by PropertyListing (agent)
	agentToPropertyListingRel = db.relationship("PropertyListing", back_populates="propertyListingToAgentRel", cascade='all, delete, save-update', 
											 foreign_keys="PropertyListing.agent_email")
	# referenced by PropertyListing (seller)
	sellerToPropertyListingRel = db.relationship("PropertyListing", back_populates="propertyListingToSellerRel", cascade='all, delete, save-update', 
											  foreign_keys="PropertyListing.seller_email")
	# referenced by Shortlist
	buyerToShortlistRel = db.relationship("Shortlist", back_populates="shortlistToBuyerRel", cascade='all, delete, save-update')
	# referenced by Review (agent)
	agentToReviewRel = db.relationship("Review", back_populates="reviewToAgentRel", cascade='all, delete, save-update',
									foreign_keys="Review.agentEmail")
	# referenced by Review (reviewer)
	reviewerToReviewRel = db.relationship("Review", back_populates="reviewToReviewerRel", cascade='all, delete, save-update',
									foreign_keys="Review.reviewerEmail")
	# referenced by Rating (agent)
	agentToRatingRel = db.relationship("Rating", back_populates="ratingToAgentRel", cascade='all, delete, save-update',
									foreign_keys="Rating.agentEmail")
	# referenced by Rating (rater)
	raterToRatingRel = db.relationship("Rating", back_populates="ratingToRaterRel", cascade='all, delete, save-update',
									foreign_keys="Rating.raterEmail")
	

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
		try:
			phone = cls.query.filter_by(phone=details["phone"]).one_or_none()
			# Phone exist
			if phone:
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
		except:
			return False
	
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
		try:
			with current_app.app_context():
				user = cls.queryUserAccount(details["email"])
				if details.get("phone"):
					phone = cls.query.filter_by(phone=details["phone"]).one_or_none()
					# Phone exist
					if phone:
						return False
				# User does not exist
				if not user:
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
		except:
			return False
	
	@classmethod
	def updatePassword(cls, newPassword:str|bytes, email:str) -> bool:
		"""
		Updates an existing User by passing arguments:
			- email:str,
			- newPassword:str|bytes, 
		returns bool.
		"""
		with current_app.app_context():
			user = cls.queryUserAccount(email)
			# User does not exist
			if not user:
				return False
			# Update password
			user.password = newPassword
			db.session.commit()
		return True
	
	@classmethod
	def queryAllUserByProfile(cls, profile:str) -> list[Self]:
		"""
		Queries all users in a profile:
		returns an list of User instance (that are of the profile).
		"""
		return cls.query.filter_by(profile=profile).all()