import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useSession } from "@/context/SessionContext"
import { getHoursWorked } from "@/supabase/db/workLogs"

import { useQuery } from "@tanstack/react-query"
import { Hourglass } from "lucide-react"

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
                <CardHeader className="flex flex-row justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Hours Worked
                    </CardTitle>
                    <Hourglass className="h-4 w-4" />
                </CardHeader>
                <CardContent className="text-2xl font-bold">
                    {Math.ceil(data || 0)} hrs
                </CardContent>
            </Card>
        </section>
    )
}

export default Insights
