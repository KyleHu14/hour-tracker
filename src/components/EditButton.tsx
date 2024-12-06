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
import { DatePicker } from "./DatePicker"

// Icons
import { TimePickerDemo } from "@/components/TimePicker/time-picker-demo"

// Hook for Form States
import useFormState from "@/hooks/useFormState"

// Tanstack
import { useMutation, useQueryClient } from "@tanstack/react-query"

// DB Functions
import { editWorkLog } from "@/supabase/db/workLogs"
import { Database } from "@/supabase/types"
import { WorkLogFetch } from "@/types"

// React
import { useEffect } from "react"
import { useSession } from "@/context/SessionContext"

type DataType = Database["public"]["Tables"]["work_logs"]["Row"]

interface Props {
    data: WorkLogFetch
}

export default function EditButton({ data }: Props) {
    const { session } = useSession()
    const { formState, updateField } = useFormState()

    const queryClient = useQueryClient()

    const submitEdit = async () => {
        // Build the data that will be inserted
        const startTime = new Date(formState.shiftDate as Date)
        const endTime = new Date(formState.shiftDate as Date)

        startTime.setHours(
            formState.shiftStart.getHours(),
            formState.shiftStart.getMinutes(),
            formState.shiftStart.getSeconds(),
        )

        endTime.setHours(
            formState.shiftEnd.getHours(),
            formState.shiftEnd.getMinutes(),
            formState.shiftEnd.getSeconds(),
        )

        const updateData: DataType = {
            id: data.id,
            hourly_rate: formState.hourlyRate,
            name: formState.entryName,
            end_time: endTime.toISOString(),
            start_time: startTime.toISOString(),
            user_id: session?.user.id || "",
        }

        await editWorkLog(updateData)

        queryClient.invalidateQueries({ queryKey: ["workLogs"] })
    }

    const submitMutation = useMutation({
        mutationFn: submitEdit,
    })

    useEffect(() => {
        updateField("entryName", data.name)
        updateField("hourlyRate", data.hourlyRate)
        updateField("shiftDate", new Date(data.startTime))
        updateField("shiftStart", new Date(data.startTime))
        updateField("shiftEnd", new Date(data.endTime))
    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <p className="w-full">Edit</p>
            </DialogTrigger>

            <DialogContent
                className="rounded-md border sm:max-w-md"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
            >
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

                    {/* Hourly Rate */}
                    <LabelInputContainer>
                        <LabelTitle>Hourly Rate</LabelTitle>
                        <Input
                            type="number"
                            placeholder="35"
                            value={formState.hourlyRate}
                            onChange={(e) =>
                                updateField("hourlyRate", e.target.value)
                            }
                        />
                    </LabelInputContainer>

                    {/* Shift Start */}
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
                        <DatePicker
                            formDate={formState.shiftDate}
                            setFormDate={(date) =>
                                updateField("shiftDate", date)
                            }
                        />
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
                            onClick={() => submitMutation.mutate()}
                        >
                            Confirm
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
