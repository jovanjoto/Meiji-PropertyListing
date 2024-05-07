import StarRatings from "react-star-ratings";
import { Card, Button } from "flowbite-react";
import { BsFillPersonFill } from "react-icons/bs";
import { PiNotepadBold } from "react-icons/pi";

function CustomerRatingCard({ firstName, lastName, email, phone_num, rate }) {
  return (
    <>
      <Card
        id="rating-card"
        variant="outline"
        direction={{ base: "column", sm: "row" }}
        className="w-full max-h-96"
      >
        <div className="flex flex-wrap justify-center md:justify-between align-middle items-center gap-y-5 h-full">
          <div className="flex flex-row items-center gap-6 align-middle h-full">
            <div className="flex flex-col justify-center items-center align-middle gap-1 w-32 flex-shrink-0">
              {<BsFillPersonFill size={70} />}
              {firstName.concat(" ", lastName)}
            </div>
            <div className="flex flex-col justify-center flex-grow">
              <section className="flex flex-row gap-5 pb-5">
                {/* logo and review */}
                  <StarRatings
                    rating={rate}
                    starRatedColor="gold"
                    numberOfStars={5}
                    name="rating"
                    starDimension="30px"
                  />
              </section>
              <div className="flex flex-col gap-1">
                <span className="text-sm">{email}</span>
                <span className="text-sm">{phone_num}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default CustomerRatingCard;
