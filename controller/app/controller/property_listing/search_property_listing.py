from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt
from PIL import Image
import io
from base64 import encodebytes
from app.entity import PropertyListing
from app.controller.authentication import permissions_required

class SearchPropertyListingController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/search_available_property_listings", view_func=self.searchAllAvailablePropertyListing, methods=["GET"])
		self.add_url_rule("/search_sold_property_listings", view_func=self.searchAllSoldPropertyListing, methods=["GET"])
		self.add_url_rule('/search_managed_property_listings', view_func=self.searchAllManagedPropertyListing, methods=["GET"])

	@jwt_required()
	def searchAllAvailablePropertyListing(self) -> dict[str, list[dict[str, str | bool | None]]]:
		list_of_pls = list()
		for pl in PropertyListing.queryAllAvailablePL():
			# converts img_url to bytes
			img = Image.open(pl.image_url, mode="r")
			img = img.resize(size=(500,400))
			bytes_arr = io.BytesIO()
			img.save(bytes_arr, format="PNG")
			encoded_img = encodebytes(bytes_arr.getvalue()).decode('ascii')

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
				"image_url" : 'data:image/png;base64,' + encoded_img,
				"listing_date" : pl.listing_date,
				"seller_email" : pl.seller_email,
				"transaction_date" : pl.transaction_date.strftime("%Y-%m-%d") if pl.is_sold else None,
				"agent_email" : pl.agent_email,
				"seller_email" : pl.seller_email
			})
			
		return {"properties" : list_of_pls}     


	@permissions_required("has_buying_permission")
	@jwt_required()
	def searchAllSoldPropertyListing(self) -> dict[str, list[dict[str, str | bool | None]]]:
		list_of_sold_pls = list()
		for pl in PropertyListing.queryAllSoldPL():
			# converts img_url to bytes
			img = Image.open(pl.image_url, mode="r")
			img = img.resize(size=(500,400))
			bytes_arr = io.BytesIO()
			img.save(bytes_arr, format="PNG")
			encoded_img = encodebytes(bytes_arr.getvalue()).decode('ascii')

			list_of_sold_pls.append({
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
				"image_url" :'data:image/png;base64,' + encoded_img,
				"listing_date" : pl.listing_date,
				"is_sold" : pl.is_sold,
				"seller_email" : pl.seller_email,
				"transaction_date" : pl.transaction_date.strftime("%Y-%m-%d") if pl.is_sold else None,
				"agent_email" : pl.agent_email,
				"seller_email" : pl.seller_email
			})
		return {"properties" : list_of_sold_pls}
		
	@permissions_required("has_listing_permission")
	@jwt_required()
	def searchAllManagedPropertyListing(self) -> dict[str, list[dict[str, str | bool | None]]]:
		claims = get_jwt()
		agent_email = claims["email"]
		list_of_managed_pls = list()
		for pl in PropertyListing.queryAllManagedPL(agent_email=agent_email):
			list_of_managed_pls.append({
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
				"image_url" : pl.image_url,
				"listing_date" : pl.listing_date,
				"is_sold" : pl.is_sold,
				"seller_email" : pl.seller_email,
				"transaction_date" : pl.transaction_date.strftime("%Y-%m-%d") if pl.is_sold else None,
				"agent_email" : pl.agent_email,
				"seller_email" : pl.seller_email
			})
		
		return {"properties" : list_of_managed_pls}
  
