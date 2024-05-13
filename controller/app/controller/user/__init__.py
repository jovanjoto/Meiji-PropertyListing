from .create_user import CreateAccountController
from .search_user import SearchUserController
from .update_user import UpdateAccountController
from .view_user import ViewAccountController
from .view_rea import ViewREAController

create_user_controller = CreateAccountController(name="create_user", import_name=__name__)
search_user_controller = SearchUserController(name="search_user", import_name=__name__)
update_user_controller = UpdateAccountController(name="update_user", import_name=__name__)
view_user_controller = ViewAccountController(name="view_user", import_name=__name__)
view_rea_controller = ViewREAController(name="view_rea", import_name=__name__)

__all__ = [
	"create_user_controller", "search_user_controller", "update_user_controller", "view_user_controller", "view_rea_controller"
]