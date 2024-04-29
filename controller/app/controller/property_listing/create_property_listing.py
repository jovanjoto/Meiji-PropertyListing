# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from datetime import datetime, date
from werkzeug.utils import secure_filename
import os

# Local dependencies
from app.entity.propertylisting import PropertyListing
from app.controller.authentication import permissions_required
from flask import current_app

class CreatePropertyListingController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.add_url_rule("/create_property_listing", view_func=self.createPL, methods=["PUT"])

        
    def allowed_file(self, filename:str):
        ALLOWED_EXTENSIONS = {'heic', 'png', 'jpg', 'jpeg', 'gif'}
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
        
    @permissions_required("has_listing_permission")
    @jwt_required()
    def createPL(self) -> dict[str,bool]:
        listing_date = request.form.get("listing_date")
        if not listing_date:
            listing_date = date.today()
        else:
            listing_date = datetime.strptime(listing_date, "%Y-%m-%d").date()
        
        if "file" not in request.files:
            return {"success": False}
        file = request.files["file"]
        if file.filename == "" or file.filename == None:
            return {"success": False}
        
        if file and self.allowed_file(file.filename):
            filename = secure_filename(file.filename)
            image_url = os.path.join("..", current_app.config['UPLOAD_FOLDER'], filename)
            file.save(image_url)
            
            propertyListingJson = {
                "id": request.form.get("id"),
                "price": request.form.get("price"),
                "name": request.form.get("name"),
                "type": request.form.get("type"),
                "address": request.form.get("address"),
                "district": request.form.get("district"),
                "description": request.form.get("description"),
                "num_of_bedrooms": request.form.get("num_of_bedrooms"),
                "num_of_bathrooms": request.form.get("num_of_bathrooms"),
                "area": request.form.get("area"),
                "image_url": image_url,
                "listing_date": listing_date,
                "agent_email": request.form.get("agent_email"),
                "seller_email": request.form.get("seller_email")
            }

            successBool = PropertyListing.createNewPL(propertyListingJson)
            return {"success": successBool}
        else:
            return {"success": False}