import { useSession } from "@/context/SessionContext"

const NotFoundPage = () => {
    const { session } = useSession()
    console.log(session)
    return <>Not Found</>
}

export default NotFoundPage
