import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

type PropsType = {
  minPrice: string;
  handleChangeMinPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearMinPrice: () => void;
};

function MinPriceFilter({
  minPrice,
  handleChangeMinPrice,
  clearMinPrice,
}: PropsType) {
  return (
    <div className="flex items-center">
      <div className="flex items-center w-full">
        <span className="bg-gray-400 p-2 h-full rounded-l">RM</span>
        <Input
          value={minPrice}
          onChange={handleChangeMinPrice}
          placeholder="Min price"
          type="number"
          className="rounded-l-none py-2 h-full"
        />
      </div>
      <Button
        variant="ghost"
        className={minPrice ? "block" : "hidden"}
        onClick={clearMinPrice}
      >
        <X />
      </Button>
    </div>
  );
}

export default MinPriceFilter;
