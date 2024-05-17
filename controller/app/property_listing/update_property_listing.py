# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from datetime import datetime, date
from werkzeug.utils import secure_filename
import os

# Local dependencies
from entity.propertylisting import PropertyListing
from app.authentication import permissions_required
from flask import current_app

class UpdatePropertyListingController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/update_property_listing", view_func=self.updatePL, methods=["PATCH"])

	def allowed_file(self, filename:str):
		ALLOWED_EXTENSIONS = {'heic', 'png', 'jpg', 'jpeg', 'gif'}
		return '.' in filename and \
			filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
		
	@permissions_required("has_listing_permission")
	@jwt_required()
	def updatePL(self) -> dict[str,bool]:	
		propertyListingJson:dict[str, str|int|float|None] = {
			"id": request.form.get("id"),
			"name": request.form.get("name"),
			"type": request.form.get("type"),
			"address": request.form.get("address"),
			"district": request.form.get("district"),
			"description": request.form.get("description"),
		}

		if request.form.get("price"):
			propertyListingJson["price"] = float(request.form.get("price")) # type: ignore
		if request.form.get("area"):
			propertyListingJson["area"] = float(request.form.get("area")) # type: ignore
		if request.form.get("num_of_bedrooms"):
			propertyListingJson["num_of_bedrooms"] = int(request.form.get("num_of_bedrooms")) # type: ignore
		if request.form.get("num_of_bathrooms"):
			propertyListingJson["num_of_bathrooms"] = int(request.form.get("num_of_bathrooms")) # type: ignore
		
		if "file" in request.files:
			file = request.files["file"]
			if file.filename == "" or file.filename == None:
				return {"success": False}
			if not (file and self.allowed_file(file.filename)):
				return {"success": False}

			filename = secure_filename(file.filename)
			image_url = os.path.join("..", current_app.config['UPLOAD_FOLDER'], filename)
			file.save(image_url)

			propertyListingJson["image_url"] = image_url
		
		successBool = PropertyListing.updatePL(propertyListingJson)
		return {"success": successBool}
