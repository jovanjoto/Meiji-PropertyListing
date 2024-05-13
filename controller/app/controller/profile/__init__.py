from .create_profile import CreateUserProfileController
from .search_profile import SearchUserProfileController
from .update_profile import UpdateProfileController
from .view_profile import ViewUserProfileController

create_profile_controller = CreateUserProfileController(name="create_profile", import_name=__name__)
search_profile_controller = SearchUserProfileController(name="search_profile", import_name=__name__)
update_profile_controller = UpdateProfileController(name="update_profile", import_name=__name__)
view_profile_controller = ViewUserProfileController(name="view_profile", import_name=__name__)

__all__ = [
	"create_profile_controller", "search_profile_controller", "update_profile_controller", "view_profile_controller"
]