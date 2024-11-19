// Shadcn
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// Components
import { DatePickerDemo } from "./DatePicker"

// Icons
import { TimePickerDemo } from "@/components/TimePicker/time-picker-demo"

// Hook for Form States
import useFormState from "@/hooks/useFormState"

export default function EditButton() {
    const { formState, updateField, handleSubmit } = useFormState()

    const onSubmit = (data: typeof formState) => {
        console.log("Form submitted with data:", data)
        // Perform further actions, like sending the data to an API
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <p className="w-full">Edit</p>
            </DialogTrigger>

            <DialogContent className="rounded-md border sm:max-w-md">
                {/* Form Header */}
                <DialogHeader>
                    <DialogTitle className="text-white">
                        Log your Hours
                    </DialogTitle>
                    <DialogDescription>
                        Log your most recent work shift.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-7 space-x-2">
                    {/* Name of Entry */}
                    <LabelInputContainer>
                        <LabelTitle>Entry Name</LabelTitle>
                        <Input
                            className="text-white"
                            type="text"
                            placeholder="Entry Name"
                            value={formState.entryName}
                            onChange={(e) =>
                                updateField("entryName", e.target.value)
                            }
                        />
                    </LabelInputContainer>

                    {/* Shift Start & End */}
                    <LabelInputContainer>
                        <LabelTitle>Shift Start</LabelTitle>
                        <TimePickerDemo
                            setDate={(date) => updateField("shiftStart", date)}
                            date={formState.shiftStart}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <LabelTitle>Shift End</LabelTitle>
                        <TimePickerDemo
                            setDate={(date) => updateField("shiftEnd", date)}
                            date={formState.shiftEnd}
                        />
                    </LabelInputContainer>

                    {/* Date Picker */}
                    <LabelInputContainer>
                        <LabelTitle>Date of Shift</LabelTitle>
                        <DatePickerDemo />
                    </LabelInputContainer>
                </div>

                <DialogFooter className="flex flex-row justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="destructive">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            onClick={() => handleSubmit(onSubmit)}
                        >
                            Create
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

interface LabelInputContainerProps {
    children: React.ReactNode
}
const LabelInputContainer = ({ children }: LabelInputContainerProps) => {
    return <div className="flex w-full flex-col gap-3">{children}</div>
}

interface LabelTitleProps {
    children: React.ReactNode
}

const LabelTitle = ({ children }: LabelTitleProps) => {
    return <Label className="text-white">{children}</Label>
}
