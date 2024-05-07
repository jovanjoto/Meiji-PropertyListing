# Libraries
from flask import Blueprint, request
from flask.views import View
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import Review, User
from app.controller.authentication import permissions_required

class ViewReviewController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/view_reviews", view_func=self.viewAllReview, methods=["GET"])
		
	@permissions_required("has_listing_permission")
	@jwt_required()
	def viewAllReview(self) -> dict[str,list[dict[str,float]]]:
		email = request.args["email"]
		reviewData = []
		for review in Review.queryAllReview(email):
			reviewerEmail = review.reviewerEmail
			user = User.queryUserAccount(reviewerEmail)
			reviewData.append({
				"review": review.review,
				"userFirstName": user.first_name,
				"userLastName": user.last_name,
				"userEmail": user.email,
				"userPhone": user.phone
			})
		return {"reviews": reviewData}