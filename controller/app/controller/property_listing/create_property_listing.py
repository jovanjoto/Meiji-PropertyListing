# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from datetime import datetime, date

# Local dependencies
from app.entity.propertylisting import PropertyListing
from app.controller.authentication import permissions_required

class CreatePropertyListingController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.add_url_rule("/create_property_listing", view_func=self.createPL, methods=["PUT"])
        
    @permissions_required("has_listing_permission")
    @jwt_required()
    def createPL(self) -> dict[str,bool]:
        details = request.get_json()
        if not details.get("listing_date"):
            details["listing_date"] = date.today()
        else:
            details["listing_date"] = datetime.strptime(details["listing_date"], "%Y-%m-%d").date()
        successBool = PropertyListing.createNewPL(details)
        return {"success": successBool}