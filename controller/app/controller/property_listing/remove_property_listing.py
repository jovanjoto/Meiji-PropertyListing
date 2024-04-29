# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity.propertylisting import PropertyListing
from app.controller.authentication import permissions_required

class RemovePropertyListingController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.add_url_rule("/remove_property_listing", view_func=self.removePropertyListing, methods=["DELETE"])
        
    @permissions_required("has_listing_permission")
    @jwt_required()
    def removePropertyListing(self) -> dict[str,bool]:
        listing_id:str = request.get_json().get("listing_id")
        successBool = PropertyListing.removePropertyListing(listing_id)
        return {"success": successBool}