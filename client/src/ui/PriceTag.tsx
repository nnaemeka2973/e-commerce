import { twMerge } from "tailwind-merge";
import FormattedPrice from "./FormattedPrice";

interface Props {
  regularPrice?: number;
  discountedPrice?: number;
  className?: string;
}

const PriceTag = ({ regularPrice, discountedPrice, className }: Props) => {
  return (
    <div
      className={twMerge(
        "flex flex-wrap items-center gap-2 min-w-0",
        className
      )}
    >
      <p className="line-through text-gray-500 font-medium truncate min-w-0">
        <FormattedPrice amount={regularPrice} />
      </p>
      <p className="font-bold text-sky-600 truncate min-w-0 wrap-break-word">
        <FormattedPrice amount={discountedPrice} />
      </p>
    </div>
  );
};

export default PriceTag;
