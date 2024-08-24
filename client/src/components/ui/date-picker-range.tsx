import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
    date: DateRange | undefined
    onDateChange: (newDate: DateRange | undefined) => void
    placeholder?: string
    numberOfMonths?: number
}

export function DatePickerWithRange({
    className,
    date,
    onDateChange,
    placeholder = "Pick your travel dates",
    numberOfMonths = 2,
    ...props
}: DatePickerWithRangeProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className={cn("grid gap-2", className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
            <Button
                id="date"
                variant={"outline"}
                className={cn(
                "w-fit justify-start text-left font-normal",
                !date && "text-muted-foreground"
                )}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                    <>
                        {format(date.from, "LLL dd, y")}
                        {date.to ? (
                            <> - {format(date.to, "LLL dd, y")}</>
                        ) : (
                            <> - Enter end date</>
                        )}
                    </>
                ) : (
                    <span>{open ? "Enter start date" : placeholder}</span>
                )}
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(newDate) => {
                    onDateChange(newDate)
                    if (newDate?.from && !newDate.to) {
                        setOpen(true)  // Keep the calendar open if only start date is selected
                    } else {
                        setOpen(false)
                    }
                }}
                numberOfMonths={numberOfMonths}
            />
            </PopoverContent>
        </Popover>
        </div>
    )
}