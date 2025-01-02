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
import { CirclePlus } from "lucide-react"
import { TimePickerDemo } from "@/components/TimePicker/time-picker-demo"

// Hook for Form States
import useFormState from "@/hooks/useFormState"

// Submit Data Function
import { insertWorkLog } from "@/supabase/db/workLogs"

// Submit Data Types
import type { Database } from "@/supabase/types"

// Mutation for Refetching
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "@/context/SessionContext"

// React Hook Forms
import { SubmitHandler, useForm } from "react-hook-form"

type WorkLogInsert = Database["public"]["Tables"]["work_logs"]["Insert"]

type Inputs = {
    entryName: string
    shiftStart: Date
    shiftEnd: Date
    shiftDate: Date
    hourlyRate: number
}

const CreateButton = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    // console.log(watch("entryName")) // watch input value by passing the name of it

    const { formState, updateField } = useFormState()

    const { session } = useSession()

    const queryClient = useQueryClient()

    const submitData = async (formData: Inputs) => {
        console.log(formData)
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

        const insertData: WorkLogInsert = {
            hourly_rate: formState.hourlyRate,
            name: formState.entryName,
            end_time: endTime.toISOString(),
            start_time: startTime.toISOString(),
            user_id: session?.user.id,
        }

        const returnData = await insertWorkLog([insertData])

        queryClient.invalidateQueries({ queryKey: ["workLogs"] })

        return returnData
    }

    const submitMutation = useMutation({
        mutationFn: submitData,
    })

    const submitForm: SubmitHandler<Inputs> = (data) => {
        submitMutation.mutate(data)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="default"
                    className="px-2 hover:brightness-90"
                >
                    <CirclePlus className="mr-2 h-5 w-5" />
                    Add Entry
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-md border sm:max-w-md">
                <form
                    onSubmit={handleSubmit(submitForm)}
                    className="flex flex-col gap-7"
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

                    {/* Name of Entry */}
                    <LabelInputContainer>
                        <LabelTitle>Entry Name</LabelTitle>
                        <Input
                            className="text-white"
                            type="text"
                            placeholder="Entry Name"
                            // value={formState.entryName}
                            // onChange={(e) =>
                            //     updateField("entryName", e.target.value)
                            // }
                            {...register("entryName")}
                        />
                    </LabelInputContainer>

                    {/* Hourly Rate */}
                    <LabelInputContainer>
                        <LabelTitle>Hourly Rate</LabelTitle>
                        <Input
                            type="number"
                            placeholder="35"
                            // value={formState.hourlyRate}
                            // onChange={(e) =>
                            //     updateField("hourlyRate", e.target.value)
                            // }
                            {...register("hourlyRate")}
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

                    <DialogFooter className="flex flex-row justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="destructive">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit">Create</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
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

export default CreateButton
