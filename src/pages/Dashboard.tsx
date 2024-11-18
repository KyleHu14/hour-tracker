// [ Imports ]
// Components
import Navbar from "@/components/Navbar"
import EntryContainer from "@/components/EntryContainer"
import CreateButton from "@/components/CreateButton"

// Use Session Context
import { useSession } from "@/context/SessionContext"

const DashboardPage = () => {
    const { session } = useSession()

    // Dummy Data, not to be used in the final app
    const userEntries = [
        {
            name: "Select Physical Therapy",
            startTime: "1PM",
            endTime: "5PM",
            date: "10/21/2024",
            hours: 4,
        },
        {
            name: "New Sport Physical Therapy",
            startTime: "2PM",
            endTime: "6PM",
            date: "10/22/2024",
            hours: 4,
        },
        {
            name: "Select Physical Therapy",
            startTime: "1PM",
            endTime: "8PM",
            date: "10/23/2024",
            hours: 7,
        },
    ]

    return (
        <div className="h-screen w-full">
            {/* Navbar */}
            <header>
                <Navbar userName={session?.user.user_metadata.full_name} />
            </header>

            <main className="h-full bg-background px-4 sm:px-20 md:px-[20%] xl:px-[30%]">
                {/* Header Bar */}
                <section className="flex flex-col gap-2 pt-4">
                    <h1 className="text-3xl font-bold text-white">
                        Your Entries
                    </h1>
                    <p className="text-xl text-secondary-foreground">
                        View and organize your logged hours.
                    </p>
                    <div>
                        <CreateButton />
                    </div>
                </section>

                {/* List of entries of the user */}
                <section className="mt-5 flex flex-col gap-3">
                    {userEntries.map((entry, i) => (
                        <EntryContainer key={i} data={entry} />
                    ))}
                </section>
            </main>
        </div>
    )
}

export default DashboardPage
