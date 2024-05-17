from .create_shortlist import ShortlistPropertyController
from .remove_shortlist import RemoveShortlistController
from .count_shortlist import CountShortlistController

shortlist_property_controller = ShortlistPropertyController(name="create_shortlist", import_name=__name__)
remove_shortlist_controller = RemoveShortlistController(name="remove_shortlist", import_name=__name__)
count_shortlist_controller = CountShortlistController(name="count_shortlist", import_name=__name__)

__all__  = [
	"shortlist_property_controller", "remove_shortlist_controller", "count_shortlist_controller"
]