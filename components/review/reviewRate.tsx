import { Star } from "lucide-react";
import React from "react";
import type { ControllerRenderProps } from "react-hook-form";

type Props = {
  rating: number;
  setRating?: (value: number) => void;
  field?: ControllerRenderProps<any, any>;
  readOnly?: boolean;
  size?: number; // optional size override
};

const ReviewRate = ({
  rating,
  setRating,
  field,
  readOnly = false,
  size = 20, // default 20px
}: Props) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((num) => (
        <Star
          key={num}
          className={`cursor-pointer ${num <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          style={{ width: size, height: size }}
          onClick={
            readOnly
              ? undefined
              : () => {
                  setRating?.(num);
                  field?.onChange(num);
                }
          }
        />
      ))}
    </div>
  );
};

export default ReviewRate;