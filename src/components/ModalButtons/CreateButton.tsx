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
import { DatePicker } from "../DatePicker"

// Icons
import { CirclePlus } from "lucide-react"
import { TimePickerDemo } from "@/components/TimePicker/time-picker-demo"

// Submit Data Function
import { insertWorkLog } from "@/supabase/db/workLogs"

// Submit Data Types
import type { Database } from "@/supabase/types"

// Mutation for Refetching
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "@/context/SessionContext"

// React Hook Forms
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import ErrorText from "./ErrorText"
import { useState } from "react"

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
        control,
        reset,
        setError,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            entryName: "",
            hourlyRate: 0,
            shiftDate: new Date(),
            shiftStart: new Date(),
            shiftEnd: new Date(),
        },
    })

    const { session } = useSession()

    const queryClient = useQueryClient()

    const [open, setOpen] = useState(false)

    const submitData = async (formData: Inputs) => {
        let hasError: boolean = false
        if (formData.shiftStart > formData.shiftEnd) {
            setError("shiftStart", {
                type: "manual",
                message: "Starting shift cannot be later than ending shift.",
            })
            hasError = true
        }

        if (formData.shiftStart.getTime() === formData.shiftEnd.getTime()) {
            setError("shiftStart", {
                type: "manual",
                message: "Enter a valid shift.",
            })
            hasError = true
        }

        if (formData.shiftDate > new Date()) {
            setError("shiftDate", {
                type: "manual",
                message: "Select a valid date.",
            })
            hasError = true
        }

        if (hasError) {
            return []
        }

        // prettier-ignore
        const {entryName, hourlyRate, shiftStart, shiftEnd, shiftDate} = formData

        // Build the data that will be inserted
        const startTime = new Date(shiftDate as Date)
        const endTime = new Date(shiftDate as Date)

        startTime.setHours(
            shiftStart.getHours(),
            shiftStart.getMinutes(),
            shiftStart.getSeconds(),
        )

        endTime.setHours(
            shiftEnd.getHours(),
            shiftEnd.getMinutes(),
            shiftEnd.getSeconds(),
        )

        const insertData: WorkLogInsert = {
            hourly_rate: hourlyRate,
            name: entryName,
            end_time: endTime.toISOString(),
            start_time: startTime.toISOString(),
            user_id: session?.user.id,
        }

        const returnData = await insertWorkLog([insertData])

        queryClient.invalidateQueries({ queryKey: ["workLogs"] })
        queryClient.invalidateQueries({ queryKey: ["totalHours"] })
        reset()
        setOpen(false)
        return returnData
    }

    const submitMutation = useMutation({
        mutationFn: submitData,
    })

    const submitForm: SubmitHandler<Inputs> = (data) => {
        submitMutation.mutate(data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                            {...register("entryName", {
                                required: {
                                    value: true,
                                    message: "Please provide a name for entry.",
                                },
                            })}
                        />
                        {errors.entryName && (
                            <ErrorText>{errors.entryName.message}</ErrorText>
                        )}
                    </LabelInputContainer>

                    {/* Hourly Rate */}
                    <LabelInputContainer>
                        <LabelTitle>Hourly Rate</LabelTitle>
                        <Input
                            type="number"
                            placeholder="35"
                            {...register("hourlyRate")}
                        />
                    </LabelInputContainer>

                    {/* Shift Start */}
                    <LabelInputContainer>
                        <LabelTitle>Shift Start</LabelTitle>
                        <Controller
                            control={control}
                            name="shiftStart"
                            render={({ field: { onChange, value } }) => (
                                <TimePickerDemo
                                    setDate={onChange}
                                    date={value}
                                />
                            )}
                        />
                        {errors.shiftStart && (
                            <ErrorText>{errors.shiftStart.message}</ErrorText>
                        )}
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <LabelTitle>Shift End</LabelTitle>
                        <Controller
                            control={control}
                            name="shiftEnd"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Please provide end of shift.",
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TimePickerDemo
                                    setDate={onChange}
                                    date={value}
                                />
                            )}
                        />
                        {errors.shiftEnd && (
                            <ErrorText>{errors.shiftEnd.message}</ErrorText>
                        )}
                    </LabelInputContainer>

                    {/* Date Picker */}
                    <LabelInputContainer>
                        <LabelTitle>Date of Shift</LabelTitle>
                        <Controller
                            control={control}
                            name="shiftDate"
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    setFormDate={onChange}
                                    formDate={value}
                                />
                            )}
                        />
                        {errors.shiftDate && (
                            <ErrorText>{errors.shiftDate.message}</ErrorText>
                        )}
                    </LabelInputContainer>

                    <DialogFooter className="flex flex-row justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="destructive">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit">Create</Button>
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
