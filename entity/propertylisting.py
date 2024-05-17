# Libraries
import datetime
from flask import current_app
from datetime import date # type: ignore
from typing_extensions import Self # type: ignore
from enum import Enum # type: ignore

# Local dependencies
from .sqlalchemy import db

# Enum for PropertyListing.type
class PropertyType(str, Enum):
	CONDO = 'CONDO'
	LANDED = 'LANDED'
	HDB = 'HDB'

# PropertyListing Schema
class PropertyListing(db.Model):
	__tablename__ = "PropertyListing"
	# attributes
	id = db.Column(db.String(250), nullable=False, primary_key=True)
	price = db.Column(db.Float(), nullable=False)
	name = db.Column(db.String(250), nullable=False)
	type = db.Column(db.Enum(PropertyType), nullable=False)
	address = db.Column(db.String(250), nullable=False)
	district = db.Column(db.String(250), nullable=False)
	description = db.Column(db.String(250), nullable=False)
	num_of_bedrooms = db.Column(db.Integer(), nullable=False)
	num_of_bathrooms = db.Column(db.Integer(), nullable=False)
	area = db.Column(db.Float(), nullable=False)
	image_url = db.Column(db.String(250), nullable=False)
	listing_date = db.Column(db.Date(), nullable=False)
	is_sold = db.Column(db.Boolean(), default=False)
	transaction_date = db.Column(db.Date())
	transaction_price = db.Column(db.Float())

	# Real estate Agent
	agent_email = db.Column(db.String(250), db.ForeignKey('User.email'), nullable=False)
	propertyListingToAgentRel = db.relationship("User", back_populates="agentToPropertyListingRel", cascade='all, delete, save-update',
								  foreign_keys="PropertyListing.agent_email")
	# Seller
	seller_email = db.Column(db.String(250), db.ForeignKey('User.email'), nullable=False)
	propertyListingToSellerRel = db.relationship("User", back_populates="sellerToPropertyListingRel", cascade='all, delete, save-update',
								  foreign_keys="PropertyListing.seller_email")
	
	# referenced by Views
	propertyListingToViewsRel = db.relationship("Views", back_populates="viewsToPropertyListingRel", cascade='all, delete, save-update')

	# referenced by Shortlist
	propertyListingToShortlistRel = db.relationship("Shortlist", back_populates="shortlistToPropertyListingRel", cascade='all, delete, save-update')

	

	@classmethod
	def queryPL(cls, id:str) -> Self | None:
		"""
		Queries a PropertyListing by passing arguments:
			- id:str, 
		returns PropertyListing instance or None.
		"""
		return cls.query.filter_by(id=id).one_or_none()
	
	@classmethod
	def queryAllManagedPL(cls, agent_email:str) -> list[Self]:
		"""
		Queries all PropertyListing listed by a specified agent, takes in arguments:
			- agent_email:str, 
		returns an list of PropertyListing instance.
		"""
		return cls.query.filter_by(agent_email=agent_email).all()
	
	@classmethod
	def queryManagedSoldPL(cls, REAEmail:str) -> list[Self]:
		"""
		Queries all sold PropertyListing listed by a specified agent, takes in arguments:
			- REAEmail:str, 
		returns an list of PropertyListing instance.
		"""
		return cls.query.filter_by(agent_email=REAEmail, is_sold=True).all()
	
	@classmethod
	def queryAllAvailablePL(cls) -> list[Self]:
		"""
		Queries all available PropertyListing.
		returns an list of PropertyListing instance.
		"""
		return cls.query.filter_by(is_sold=False).all()
	
	@classmethod
	def queryAllSoldPL(cls) -> list[Self]:
		"""
		Queries all sold PropertyListing.
		returns an list of PropertyListing instance.
		"""
		return cls.query.filter_by(is_sold=True).all()
	
	@classmethod
	def queryAllOwnedPL(cls, sellerEmail:str) -> list[Self]:
		"""
		Queries all owned PropertyListing, takes in arguments:
			- sellerEmail:str, 
		returns an list of PropertyListing instance.
		"""
		return cls.query.filter_by(seller_email=sellerEmail).all()
	
	@classmethod
	def createNewPL(cls, details:dict[str,str|float|PropertyType|int|date]) -> bool:
		"""
		Creates a new PropertyListing by passing arguments:
			- details: dict[str,str|float|PropertyType|int|date], which contains pairs:
				- id:str,
				- price:float,
				- name:str,
				- type:PropertyType,
				- address:str,
				- district:str,
				- description:str,
				- num_of_bedrooms:int,
				- num_of_bathrooms:int,
				- area:float,
				- image_url:str,
				- listing_date:date,
				- agent_email:str,
				- seller_email:str
		returns bool.
		"""
		try:
			# Initialize new PropertyListing
			new_pl = cls(**details)
			# Commit to DB
			with current_app.app_context():
				db.session.add(new_pl)
				db.session.commit()
			return True
		except:
			return False
	
	@classmethod
	def removePropertyListing(cls, listing_id:str) -> bool:
		"""
		Removes a PropertyListing by passing arguments:
			- listing_id:str, 
		returns bool.
		"""
		property_listing = cls.queryPL(listing_id)
		if not property_listing:
			return False
		with current_app.app_context():
			cls.query.filter_by(id=listing_id).delete()
			db.session.commit()
		return True
	
	@classmethod
	def updatePL(cls, details:dict[str,str|float|PropertyType|int|None]) -> bool:
		"""
		Updates an existing PropertyListing by passing arguments:
			- details: dict[str,str|float|PropertyType|int|date], which contains pairs:
				- id:str,
				- price:float,
				- name:str,
				- type:PropertyType,
				- address:str,
				- district:str,
				- description:str,
				- num_of_bedrooms:int,
				- num_of_bathrooms:int,
				- area:float,
				- image_url:str,
				- listing_date:date,
				- seller_email:str,
		returns bool.
		"""
		try:
			with current_app.app_context():
				property_listing = cls.queryPL(str(details["id"]))
				# property listing does not exist
				if not property_listing:
					return False

				# Update information
				if details.get("price"):
					print(details.get("price"), type(details.get("price")))
					property_listing.price = details.get("price")
				if details.get("name"):
					property_listing.name = details.get("name")
				if details.get("type"):
					property_listing.type = details.get("type")
				if details.get("address"):
					property_listing.address = details.get("address")			
				if details.get("district"):
					property_listing.district = details.get("district")		
				if details.get("description"):
					property_listing.description = details.get("description")		
				if details.get("num_of_bedrooms"):
					property_listing.num_of_bedrooms = details.get("num_of_bedrooms")		
				if details.get("num_of_bathrooms"):
					property_listing.num_of_bathrooms = details.get("num_of_bathrooms")		
				if details.get("area"):
					property_listing.area = details.get("area")		
				if details.get("image_url"):
					property_listing.image_url = details.get("image_url")			
				if details.get("listing_date"):
					property_listing.listing_date = details.get("listing_date")			
				if details.get("seller_email"):
					property_listing.seller_email = details.get("seller_email")		
				db.session.commit()
			return True
		except:
			return False
	
	@classmethod
	def markPLAsSold(cls, details:dict[str,str|float|date]) -> bool:
		"""
		Marks an existing PropertyListing as sold by passing arguments:
			- details: dict[str,str|float|date], which contains pairs:
				- id:str,
				- transaction_date:date
				- transaction_price:float
		returns bool.
		"""
		with current_app.app_context():
			property_listing = cls.queryPL(str(details["id"]))
			# property listing does not exist or is already sold
			if not (property_listing and not property_listing.is_sold):
				return False

			# If empty date
			if not details.get("transaction_date"):
				details["transaction_date"] = date.today()
			# If empty price
			if not details.get("transaction_price"):
				details["transaction_price"] = property_listing.price

			# If transaction before listed
			if property_listing.listing_date > details["transaction_date"]:
				return False

			# Update information
			property_listing.is_sold = True
			property_listing.transaction_date = details["transaction_date"]
			property_listing.transaction_price = details["transaction_price"]
			db.session.commit()
		return True