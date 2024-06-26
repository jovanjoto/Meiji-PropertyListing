# Libraries
from flask import current_app
from datetime import date # type: ignore
from typing_extensions import Self # type: ignore

# Local dependencies
from .sqlalchemy import db
from .user import User

# Suspension Schema
class Suspension(db.Model):
	__tablename__ = "suspension"
	# attributes
	start = db.Column(db.Date(), nullable=False, primary_key=True)
	end = db.Column(db.Date())
	description = db.Column(db.String(250), nullable=False)

	# Part of composite key (qualifier)
	user = db.Column(db.String(250), db.ForeignKey('User.email'), nullable=False, primary_key=True)
	suspensionToUserRel = db.relationship("User", back_populates="userToSuspensionRel", cascade='all, delete, save-update',
								  foreign_keys="Suspension.user")
	
	@classmethod
	def createSuspension(cls, email:str, reason:str, start:date|None=None, end:date|None=None) -> bool:
		"""
		Creates a new Suspension by passing arguments:
			- email:str, 
			- reason:str, 
			- start:date=None, 
			- end:date=None
		returns bool.
		"""
		try:
			# Default value management
			if not start:
				start = date.today()
			# Invalid Dates
			if end and end < start:
				return False
			
			# Check if suspension already exist
			if cls.query.filter_by(user=email, start=start).one_or_none():
				return False
			# Initialize new suspension
			new_suspension = cls(user=email, start=start, end=end, description=reason) # type: ignore

			# Commit to DB
			with current_app.app_context():
				db.session.add(new_suspension)
				db.session.commit()
			return True
		except:
			return False
	
	@classmethod
	def getOngoingSuspension(cls, user:User) -> Self|None:
		"""
		Get an ongoing suspension of a user by passing arguments:
			- user:User 
		returns bool.
		"""
		all_ongoing_suspensions = cls.query.filter(cls.user == user.email, cls.start <= date.today(), cls.end is None or cls.end >= date.today()).all() # type: ignore
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