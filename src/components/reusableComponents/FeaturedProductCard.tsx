import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ICar } from "../../types";

interface ICardDataProps {
  data: ICar;
}

const FeaturedProductCard = ({ data }: ICardDataProps) => {
  const { name, brand, category, image, price, stock, status, _id } = data;
  // console.log(stock);
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className="p-4 bg-opacity-10 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardHeader className="p-0"></CardHeader>
      <CardContent className="relative overflow-hidden">
        {/* Fixed height for the image container */}
        <div className="h-44 md:h-48 overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-slate-950">
          <div className="relative w-full h-full">
            <img
              className={`transition-transform duration-500 ${
                hovered ? "scale-110" : "scale-100"
              } object-cover w-full h-full`}
              src={image}
              alt={name}
            />
            <span className="absolute top-2 left-2 text-white text-sm font-semibold bg-black bg-opacity-50 p-1 rounded">
              {brand}
            </span>
          </div>

          {status === "unavailable" && (
            <p className="absolute top-2 right-3 text-sm text-white p-1 px-2 rounded-md bg-red-800">
              Sold Out
            </p>
          )}
        </div>
        {hovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white bg-black/30">
            <p className="bg-primary/80 text-white rounded-full px-4 py-2">
              Stock: {stock || "Unavailable"}
            </p>
          </div>
        )}
      </CardContent>

      {/* Consistent spacing for text content */}
      <div className="space-y-2 mt-3">
        <div className="flex justify-between items-center">
          <p className="text-primary text-xs uppercase">{category}</p>
          <p className="text-primary text-lg font-semibold">BDT {price}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-black dark:text-white text-sm md:text-md font-medium">
            {name.slice(0, 30)} {name.length > 30 && <span>...</span>}
          </h3>
          <div>
            <Link
              to={`/cars/${_id}`}
              onClick={(e) => status === "unavailable" && e.preventDefault()}
              className={` ${
                status === "unavailable" ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <Button
                disabled={status === "unavailable"}
                className="px-3 py-1 text-sm"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedProductCard;
