import { useState } from "react"

// Define the structure of the form data
interface FormState {
    entryName: string
    shiftStart: Date
    shiftEnd: Date
    shiftDate: Date
    hourlyRate: number
}

const useFormState = () => {
    // Pre Declaring the initial form state
    const initialFormState: FormState = {
        entryName: "",
        shiftStart: new Date(),
        shiftEnd: new Date(),
        shiftDate: new Date(),
        hourlyRate: 0,
    }

    // useStates
    const [formState, setFormState] = useState<FormState>(initialFormState)

    // Update individual fields
    const updateField = (
        field: keyof FormState,
        value: Date | string | undefined,
    ) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: value,
        }))
    }

    // Reset form to initial state
    const resetForm = () => setFormState(initialFormState)

    return {
        formState,
        updateField,
        resetForm,
    }
}

export default useFormState
