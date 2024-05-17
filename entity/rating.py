# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore
from sqlalchemy.sql import func

# Local dependencies
from .sqlalchemy import db

# Review Schema
class Rating(db.Model):
	__tablename__ = "rating"
	# attributes
	rating = db.Column(db.Float(), nullable=False)
	# Composite key 
	agentEmail = db.Column(db.String(250), db.ForeignKey("User.email"), nullable=False, primary_key=True)
	raterEmail = db.Column(db.String(250), db.ForeignKey("User.email"), nullable=False, primary_key=True)
	ratingToAgentRel = db.relationship("User", back_populates="agentToRatingRel", cascade="all, delete, save-update",
									foreign_keys="Rating.agentEmail")
	ratingToRaterRel = db.relationship("User", back_populates="raterToRatingRel", cascade="all, delete, save-update",
									foreign_keys="Rating.raterEmail")

	@classmethod
	def queryAllREARating(cls, email:str) -> list[Self]:
		"""
		Queries all Ratings for a specified agent, takes in arguments:
			- email:str, 
		returns an list of Rating instance.
		"""
		return cls.query.filter_by(agentEmail=email).all()

	@classmethod
	def createRating(cls, agent_email:str, rater_email:str, rating:float) -> bool:
		"""
		Creates a new Rating by passing arguments:
		- agent_email:str,
		- phone:str, 
		- rater_email:str, 
		- rating:float
		returns bool.
		"""
		try:
			# Check if already rated
			if cls.query.filter_by(agentEmail=agent_email, raterEmail=rater_email).one_or_none():
				return False
			
			# Initialize new rating
			newRating = cls(agentEmail=agent_email, raterEmail=rater_email, rating=rating) # type: ignore
			# Commit to DB
			with current_app.app_context():
				db.session.add(newRating)
				db.session.commit()
			return True
		except:
			return False

	@classmethod
	def getAvgRating(cls, agentEmail:str) -> float:
		"""
		Gets average rating for a specified agent, takes in arguments:
			- agentEmail:str, 
		returns a float.
		"""
		averageRating = cls.query.filter_by(agentEmail=agentEmail).with_entities(func.avg(cls.rating)).scalar()
		if averageRating is None:
			return 0.0
		return round(averageRating, 2)