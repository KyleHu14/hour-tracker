// [ Imports ]
// Components
import Navbar from "@/components/Navbar"
import CreateButton from "@/components/ModalButtons/CreateButton"
import Insights from "@/components/Insights"

// Use Session Context
import { useSession } from "@/context/SessionContext"

// React Query
import { useQuery } from "@tanstack/react-query"

import { fetchWorkLogsById } from "@/supabase/db/workLogs"
import { DataTable } from "@/components/EntryTable/data-table"

// Data Table
import { columns } from "@/components/EntryTable/columns"

const DashboardPage = () => {
    const { session } = useSession()

    // const { isPending, isError, data, error } = useQuery({
    const { data } = useQuery({
        queryKey: ["workLogs"],
        queryFn: async () => {
            const supabaseData = await fetchWorkLogsById(session?.user.id || "")
            return supabaseData
        },
        initialData: [],
    })

    return (
        <div className="h-screen w-full">
            {/* Navbar */}
            <header>
                <Navbar userName={session?.user.user_metadata.full_name} />
            </header>

            <main className="flex h-full flex-col gap-5 bg-background px-4 sm:px-20 lg:px-[15%]">
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

                <Insights />

                <DataTable data={data} columns={columns} />
            </main>
        </div>
    )
}

export default DashboardPage
