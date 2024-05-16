from .view_reviews import ViewReviewController
from .review_agent import ReviewAgentController

view_review_controller = ViewReviewController(name="view_reviews", import_name=__name__)
review_agent_controller = ReviewAgentController(name="review_agent", import_name=__name__)

__all__ = [
	"view_review_controller", "review_agent_controller"
]