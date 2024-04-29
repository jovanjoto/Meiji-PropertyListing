from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from app.entity import PropertyListing

class ViewPropertyListingController(Blueprint):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.add_url_rule("/view_property_listing", view_func=self.viewPropertyListing, methods=["GET"])
  
  @jwt_required()
  def viewPropertyListing(self) -> dict[str, dict[str,str] | bool | str]:
    id = request.args["id"]
    pl = PropertyListing.queryPL(id)
    
    if not pl : 
      return {"success": False, "message": "Property Listing not found."}
  
    results = {
      "id" : pl.id,
      "price" : pl.price,
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
      "seller_email" : pl.seller_email,
      "transaction_date" : pl.transaction_date,
      "transaction_price" : pl.transaction_price,
      "agent_email" : pl.agent_email,
      "seller_email" : pl.seller_email
    }
    
    return {"success": True, "data": results}