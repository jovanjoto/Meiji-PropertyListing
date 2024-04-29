from .search_property_listing import SearchPropertyListingController
from .view_property_listing import ViewPropertyListingController

search_property_listing_controller = SearchPropertyListingController(name="search_property_listing", import_name=__name__)
view_property_listing_controller = ViewPropertyListingController(name="view_property_listing", import_name=__name__)

__all__ = [
  "search_property_listing_controller", "view_property_listing_controller"
]