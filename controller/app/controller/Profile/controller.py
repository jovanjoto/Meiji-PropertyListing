# Libraries

# Local dependencies
from app.entity import UserProfile

class UserProfileController():
    def __init__(self) -> None:
        pass

    def createProfile(self, details:dict[str, str | bool]) -> bool:
        successBool = UserProfile.createNewUserProfile(details)
        return successBool
    
    def viewUP(self, UPName:str) -> dict[str, str | bool] | None:
        userProfileObject = UserProfile.queryUP(UPName)
        if not userProfileObject:
            return None
        
        userProfileJson = {
            "name": userProfileObject.name,
            "description": userProfileObject.description,
            "has_listing_permission": userProfileObject.has_listing_permission,
            "has_buying_permission": userProfileObject.has_buying_permission,
            "has_selling_permission": userProfileObject.has_selling_permission
        }
        return userProfileJson
    
    def updateProfileCnt(self, newDetails:dict[str, str | bool]) -> bool:
        successBool = UserProfile.updateProfile(newDetails)
        return successBool
    
    def searchAllProfile(self) -> dict[str, list[dict[str, str | bool]]] | None:
        profileList = UserProfile.queryAllProfile()
        if not profileList:
            return None
        
        profileListJson = []
        for profile in profileList:
            userProfileJson = {
                "name": profile.name,
                "description": profile.description,
                "has_listing_permission": profile.has_listing_permission,
                "has_buying_permission": profile.has_buying_permission,
                "has_selling_permission": profile.has_selling_permission
            }
            profileListJson.append(userProfileJson)

        return {"data": profileListJson}
    
