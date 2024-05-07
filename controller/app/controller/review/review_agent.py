# Libraries
from flask import Blueprint, request
from flask.views import View
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import Review, User
from app.controller.authentication import permissions_required

class ReviewAgentController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/review_agent", view_func=self.reviewAgent, methods=["PUT"])
		
	@permissions_required("has_listing_permission", "has_selling_permission")
	@jwt_required()
	def reviewAgent(self) -> dict[str, bool]:
		reviewInfo = request.get_json()
		agent_email = reviewInfo.agent_email
		reviewer_email = reviewInfo.reviewer_email
		review = reviewInfo.review
		successBool = Review.createReview(agent_email=agent_email, reviewer_email=reviewer_email, review=review)
		return {"success": successBool}