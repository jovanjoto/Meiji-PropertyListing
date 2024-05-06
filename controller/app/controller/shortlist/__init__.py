from .create_shortlist import ShortlistPropertyController
from .remove_shortlist import RemoveShortlistController

shortlist_property_controller = ShortlistPropertyController(name="shortlist_property", import_name=__name__)
remove_shortlist_controller = RemoveShortlistController(name="remove_property", import_name=__name__)

__all__  = [
	"shortlist_property_controller", "remove_shortlist_controller"
]