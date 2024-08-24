import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div className="relative w-full">
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-[4px] w-full grow overflow-hidden rounded-full bg-accent">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-1 bg-primary border-[#03B55C] cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>

    <div className="absolute inset-0 flex justify-between px-2">
        <div className="relative flex flex-col items-center gap-6 z-[-1]">
            <div className="h-[8px] w-[1px] bg-accent"></div>
            <span className="text-xs">Low</span>
        </div>
        <div className="relative flex flex-col items-center gap-6 z-[-1]">
            <div className="h-[8px] w-[1px] bg-accent"></div>
            <span className="text-xs">Medium</span>
        </div>
        <div className="relative h-8 flex flex-col items-center gap-6 z-[-1]">
            <div className="h-[8px] w-[1px] bg-accent"></div>
            <span className="text-xs">High</span>
        </div>
    </div>
  </div>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };