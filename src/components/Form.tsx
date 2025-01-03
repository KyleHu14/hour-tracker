import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    example: string
    exampleRequired: string
}

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    // console.log(watch("example")) // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col bg-slate-600 p-5 text-black"
        >
            {/* register your input into the hook by invoking the "register" function */}
            <input defaultValue="test" {...register("example")} />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("exampleRequired", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <button type="submit">Hi</button>
        </form>
    )
}

export default Form
