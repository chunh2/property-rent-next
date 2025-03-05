import formatDateTime from "@/app/_utils/formatDateTime";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PropsType = {
  createdAt: string;
};

function CreatedDateTimeTooltip({ createdAt }: PropsType) {
  const formattedCreatedAt = formatDateTime(createdAt);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p className="cursor-pointer text-blue-600">Added At</p>
          </TooltipTrigger>

          <TooltipContent>
            <p>{formattedCreatedAt}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

export default CreatedDateTimeTooltip;
