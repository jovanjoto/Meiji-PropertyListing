from .count_views import CountViewsController

count_views_controller = CountViewsController(name="count_views", import_name=__name__)

__all__ = [
	"count_views_controller"
]