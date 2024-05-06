from .count_views import CountViewsController

count_views_controller = CountViewsController(name="search_managed_pl", import_name=__name__)

__all__ = [
	"count_views_controller"
]