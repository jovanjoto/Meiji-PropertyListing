# Libraries
from flask import current_app
from datetime import date # type: ignore

# Local dependencies
from .sqlalchemy import db
from .user import User
from .userprofile import UserProfile

# Suspension Schema
class Suspension(db.Model):
	__tablename__ = "user"
	# attributes
	start = db.Column(db.Date(), nullable=False, primary_key=True)
	end = db.Column(db.Date())
	description = db.Column(db.String(250), nullable=False)

	# Part of composite key (qualifier)
	user = db.Column(db.String(250), db.ForeignKey('User.email'), nullable=False, primary_key=True)
	suspensionToUserRel = db.relationship("User", back_populates="userToSuspensionRel", cascade='all, delete, save-update',
								  foreign_keys="Suspension.user")
	
	@classmethod
	def createSuspension(clf, email:str, reason:str, start:date=None, end:date=None) -> bool:
		"""
		Creates a new Suspension by passing arguments:
			- email:str, 
			- reason:str, 
			- start:date=None, 
			- end:date=None
		returns bool.
		"""
		# User does not exist
		if not User.queryUserAccount(email=email):
			return False
		# Default value management
		if not start:
			start = date.today()
		# Invalid Dates
		if end and end < start:
			return False
		
		# Initialize new suspension
		new_suspension = clf(user=email, start=start, end=end, reason=reason)

		# Commit to DB
		with current_app.app_context():
			db.session.add(new_suspension)
			db.session.commit()
		return True
	
	@classmethod
	def createBulkSuspension(clf, profile:str, reason:str, start:date=None, end:date=None) -> bool:
		"""
		Creates suspensions for all users with a specified profile by passing arguments:
			- profile:str, 
			- reason:str, 
			- start:date=None, 
			- end:date=None
		returns bool.
		"""
		# UserProfile does not exist
		if not UserProfile.queryUP(profile):
			return False
		# Get all users within the profile
		users = User.query.filter_by(profile=profile).all()
		for u in users:
			clf.createSuspension(u.email, reason, start, end)
		return True
	
	@classmethod
	def getOngoingSuspension(clf, user:User) -> object|None:
		"""
		Get an ongoing suspension of a user by passing arguments:
			- user:User 
		returns bool.
		"""
		all_ongoing_suspensions = clf.query.filter(clf.user == user.email, clf.start <= date.today(), clf.end is None or clf.end >= date.today()).all()
		if len(all_ongoing_suspensions) == 0:
			return None

		last_suspension = all_ongoing_suspensions[0]
		if last_suspension.end is None:
			return last_suspension
		for suspension in all_ongoing_suspensions[1:]:
			if suspension.end is None:
				return suspension
			if suspension.end > last_suspension.end:
				last_suspension = suspension
		return last_suspension