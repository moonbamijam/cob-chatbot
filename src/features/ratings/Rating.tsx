import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa6";

// contexts
import { UserContext } from "@contexts/UserContext";

type RatingProps = Partial<
  Readonly<{
    className: string;
  }>
>;

const Rating = ({ className }: RatingProps) => {
  const user = useContext(UserContext);
  const { rating, setRating } = user.rating;
  const [hover, setHover] = useState<number>();

  return (
    <div className={`flex items-center mb-8 ${className}`}>
      {[...Array(5)].map((_star, i: number) => {
        const currentRating = i + 1;
        return (
          <label key={i} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => {
                setRating(currentRating);
              }}
              className="hidden"
            />
            <FaStar
              className={`text-4xl text-black/20 dark:text-white/20  `}
              color={currentRating <= (hover || rating) ? "#eab308" : ""}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
