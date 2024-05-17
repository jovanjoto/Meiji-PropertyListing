# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt

# Local dependencies
from entity import Shortlist
from controller.app.authentication import permissions_required

class RemoveShortlistController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/remove_shortlist_property", view_func=self.removeShortlist, methods=["DELETE"])
		
	@permissions_required("has_buying_permission")
	@jwt_required()
	def removeShortlist(self) -> dict[str,bool]:
		buyer_email = get_jwt()["email"]
		json = request.get_json()
		propertyId = json.get("propertyId")
		successBool = Shortlist.removeShortlist(propertyId=propertyId, buyerEmail=buyer_email)
		return {"success": successBool}