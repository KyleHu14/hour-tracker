import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useSession } from "@/context/SessionContext"
import { getHoursWorked } from "@/supabase/db/workLogs"

import { useQuery } from "@tanstack/react-query"

const Insights = () => {
    const { session } = useSession()

    const { data } = useQuery({
        queryKey: ["totalHours"],
        queryFn: async () => {
            const supabaseData = await getHoursWorked(session?.user.id || "")
            return supabaseData
        },
    })

    return (
        <section>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Total Hours</CardTitle>
                </CardHeader>
                <CardContent>{data} Hours</CardContent>
            </Card>
        </section>
    )
}

export default Insights
