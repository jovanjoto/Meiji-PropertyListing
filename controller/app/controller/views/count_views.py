# Libraries
from flask import Blueprint, request
from flask.views import View
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import Views
from app.controller.authentication import permissions_required

class CountViewsController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/find_property_views", view_func=self.findPropertyViews, methods=["GET"])
		
	@permissions_required("has_seller_permission")
	@jwt_required()
	def findPropertyViews(self) -> dict[str,list[dict[str,int]]]:
		propertyId = request.args["propertyId"]
		viewData = list()
		for monthly_view in Views.findPropertyViews(propertyId=propertyId):
			viewData.append({
				"month": monthly_view.month,
				"year": monthly_view.year,
				"views": monthly_view.views
			})
		return {"view": viewData}