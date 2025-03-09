import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

type PropsType = {
  maxPrice: string;
  handleChangeMaxPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearMaxPrice: () => void;
};

function MaxPriceFilter({
  maxPrice,
  handleChangeMaxPrice,
  clearMaxPrice,
}: PropsType) {
  return (
    <div className="flex items-center">
      <div className="flex items-center w-full">
        <span className="bg-gray-400 p-2 h-full rounded-l">RM</span>
        <Input
          value={maxPrice}
          onChange={handleChangeMaxPrice}
          placeholder="Max price"
          type="number"
          className="rounded-l-none py-2 h-full"
        />
      </div>
      <Button
        variant="ghost"
        className={maxPrice ? "block" : "hidden"}
        onClick={clearMaxPrice}
      >
        <X />
      </Button>
    </div>
  );
}

export default MaxPriceFilter;
