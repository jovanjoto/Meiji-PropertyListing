import { Card, Label } from "flowbite-react";
import { useContext } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import StarRatings from "react-star-ratings";
import { AuthContext } from "../Authentication/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function AgentCard({name, email, rating, firstName, lastName, phone}) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const user = jwtDecode(token);
  const url = user.has_buying_permission ? `/buyer/viewREA/${email}` : `/seller/viewREA/${email}`
  return (
    <Card
    onClick={()=> {navigate(url)}}
      variant="outline"
      direction={{ base: "column", sm: "row" }}
      className="w-full"
    >
      <div className="flex flex-wrap justify-center md:justify-between align-middle items-center gap-y-5">
        <div className="flex flex-row items-center gap-6 align-middle">
            <div className="flex flex-col items-center">
                <BsFillPersonFill size={70} />
                <Label className="text-xl">{firstName} {lastName}</Label>
            </div>
          <div className="flex flex-col justify-center gap-2">
            <StarRatings starRatedColor="rgb(245, 188, 66)" starDimension="2.5rem" rating={rating} />
            <span className="text-lg">
              {email}
            </span>
            <span className="text-lg">
              {phone}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AgentCard;
