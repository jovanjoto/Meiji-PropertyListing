import { Card, Label } from "flowbite-react";
import { BsFillPersonFill } from "react-icons/bs";
import StarRatings from "react-star-ratings";

function AgentCard({name, email, rating, firstName, lastName, phone}) {
  return (
    <Card
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
