import { useState } from "react"

// Define the structure of the form data
interface FormState {
    entryName: string
    shiftStart: Date | undefined
    shiftEnd: Date | undefined
    shiftDate: Date | undefined
}

const useFormState = () => {
    const initialFormState: FormState = {
        entryName: "",
        shiftStart: new Date(),
        shiftEnd: new Date(),
        shiftDate: new Date(),
    }

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

    // Optional: Handle form submission (this can be customized as needed)
    const handleSubmit = (callback: (data: FormState) => void) => {
        callback(formState)
    }

    return {
        formState,
        updateField,
        resetForm,
        handleSubmit,
    }
}

export default useFormState
