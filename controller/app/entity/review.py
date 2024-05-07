# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore

# Local dependencies
from .sqlalchemy import db
from .user import User
from .userprofile import UserProfile

# Review Schema
class Review(db.Model):
	__tablename__ = "review"
	# attributes
	review = db.Column(db.String(10000), nullable=False)
	# Composite key 
	agentEmail = db.Column(db.String(250), db.ForeignKey("User.email"), nullable=False, primary_key=True)
	reviewerEmail = db.Column(db.String(250), db.ForeignKey("User.email"), nullable=False, primary_key=True)
	reviewToAgentRel = db.relationship("User", back_populates="agentToReviewRel", cascade="all, delete, save-update",
									foreign_keys="Review.agentEmail")
	reviewToReviewerRel = db.relationship("User", back_populates="reviewerToReviewRel", cascade="all, delete, save-update",
									foreign_keys="Review.reviewerEmail")

	@classmethod
	def queryAllReview(cls, email:str) -> list[Self]:
		"""
		Queries all Reviews for a specified agent, takes in arguments:
			- email:str, 
		returns an list of Review instance.
		"""
		return cls.query.filter_by(agentEmail=email).all()

	@classmethod
	def createReview(cls, agent_email:str, reviewer_email:str, review:str) -> bool:
		"""
		Creates a new Review by passing arguments:
		- agent_email:str,
		- phone:str, 
		- reviewer_email:str, 
		- review:str
		returns bool.
		"""
		# Agent doesn't exist 
		agent = User.queryUserAccount(email=agent_email)
		if not agent:
			return False
		# Email entered for agent isn't actually an agent
		profile = UserProfile.queryUP(agent.profile)
		if not profile or not profile.has_listing_permission:
			return False
		# Rater doesn't exist
		reviewer = User.queryUserAccount(email=reviewer_email)
		if not reviewer:
			return False
		# Email entered for rater isn't buyer or seller
		reviewer_profile = UserProfile.queryUP(reviewer.profile)
		if not reviewer_profile or not (reviewer_profile.has_buying_permission or reviewer_profile.has_selling_permission):
			return False
		# Check if already rated
		if cls.query.filter_by(agentEmail=agent_email, reviewerEmail=reviewer_email).one_or_none():
			return False
		# Initialize new review
		newReview = cls(agentEmail=agent_email, reviewerEmail=reviewer_email, review=review) # type: ignore
		# Commit to DB
		with current_app.app_context():
			db.session.add(newReview)
			db.session.commit()
		return True