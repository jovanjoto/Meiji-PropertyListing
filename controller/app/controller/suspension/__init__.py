from .get_suspension import GetSuspensionController
from .suspend_profile import SuspendUserProfileController
from .suspend_user import SuspendUserController

# Suspension Controllers
get_suspension_controller = GetSuspensionController(name="get_suspension", import_name=__name__)
suspend_profile_controller = SuspendUserProfileController(name="suspend_profile", import_name=__name__)
suspend_user_controller = SuspendUserController(name="suspend_user", import_name=__name__)

__all__ = [
	"get_suspension_controller", "suspend_profile_controller", "suspend_user_controller"
]