// [ Imports ]
// Components
import Navbar from "@/components/Navbar"

// Use Session Context
import { useSession } from "@/context/SessionContext"

const DashboardPage = () => {
    const { session } = useSession()

    return (
        <main className="h-screen w-screen bg-background">
            <Navbar userName={session?.user.user_metadata.full_name} />
        </main>
    )
}

export default DashboardPage
