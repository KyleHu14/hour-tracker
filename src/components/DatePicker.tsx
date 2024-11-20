import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
    formDate: Date | undefined
    setFormDate: (date: Date | undefined) => void
}

export function DatePicker({ formDate, setFormDate }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !formDate && "text-muted-foreground",
                    )}
                >
                    <CalendarIcon className="text-white" />
                    <div className="text-white">
                        {formDate ? (
                            format(formDate, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={formDate}
                    onSelect={setFormDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
