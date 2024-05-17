from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt
from PIL import Image
import io
from base64 import encodebytes # type: ignore
from entity import PropertyListing
from controller.app.authentication import permissions_required

class ViewStatsVizOfSoldPLController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/search_managed_sold", view_func=self.searchManagedSold, methods=["GET"])

	@permissions_required("has_listing_permission")
	@jwt_required()
	def searchManagedSold(self) -> dict[str, list[dict[str, str | bool | None]]]:
		list_of_pls = list()
		REAEmail = get_jwt()["email"]
		for pl in PropertyListing.queryManagedSoldPL(REAEmail):
			list_of_pls.append({
				"id" : pl.id,
				"price" : pl.transaction_price if pl.is_sold else pl.price,
				"name" : pl.name, 
				"type" : pl.type,
				"address" : pl.address,
				"district" : pl.district,
				"description" : pl.description,
				"num_of_bedrooms" : pl.num_of_bedrooms,
				"num_of_bathrooms" : pl.num_of_bathrooms,
				"area" : pl.area,
				"is_sold" : pl.is_sold,
				"listing_date" : pl.listing_date,
				"seller_email" : pl.seller_email,
				"transaction_date" : pl.transaction_date.strftime("%Y-%m-%d") if pl.is_sold else None,
				"agent_email" : pl.agent_email,
				"seller_email" : pl.seller_email
			})
			
		return {"properties" : list_of_pls}     

