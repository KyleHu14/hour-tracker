interface Props {
    children: React.ReactNode
}

const ErrorText = ({ children }: Props) => {
    return <p className="text-red-500">{children}</p>
}

export default ErrorText
