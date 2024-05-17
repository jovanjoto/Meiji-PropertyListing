# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt

# Local dependencies
from entity import Review
from controller.app.authentication import permissions_required

class ReviewAgentController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/review_agent", view_func=self.reviewAgent, methods=["POST"])
		
	@permissions_required("has_buying_permission", "has_selling_permission")
	@jwt_required()
	def reviewAgent(self) -> dict[str, bool]:
		reviewInfo = request.get_json()
		reviewer_email = get_jwt()["email"]
		agent_email = reviewInfo["agent_email"]
		review = reviewInfo["review"]
		successBool = Review.createReview(agent_email=agent_email, reviewer_email=reviewer_email, review=review)
		return {"success": successBool}