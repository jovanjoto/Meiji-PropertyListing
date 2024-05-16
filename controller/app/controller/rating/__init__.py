from .view_ratings import ViewRatingController
from .rate_agent import RateAgentController

view_rating_controller = ViewRatingController(name="view_ratings", import_name=__name__)
rate_agent_controller = RateAgentController(name="rate_agent", import_name=__name__)

__all__ = [
	"view_rating_controller", "rate_agent_controller"
]