# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from entity import Shortlist
from controller.app.authentication import permissions_required

class CountShortlistController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/count_shortlist", view_func=self.countPropertyShortlists, methods=["GET"])
		
	@permissions_required("has_selling_permission")
	@jwt_required()
	def countPropertyShortlists(self) -> dict[str,int]:
		propertyId = request.args["propertyId"]
		shortlistCount = Shortlist.countPropertyShortlists(propertyId=propertyId)
		return {"shortlistCount": shortlistCount}