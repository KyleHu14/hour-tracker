import { WorkLogFetch } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<WorkLogFetch>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },

    // The amount of money the user made for this shift
    {
        id: "profit",
        header: "Profit",
        cell: ({ row }) => {
            const { hourlyRate, startTime, endTime } = row.original

            const startDate = new Date(startTime)
            const endDate = new Date(endTime)
            const profit =
                ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)) *
                hourlyRate

            return <div>{`${profit.toFixed(2)}$`}</div>
        },
    },
    {
        id: "hours",
        header: "Shift Duration",
        cell: ({ row }) => {
            const { startTime, endTime } = row.original

            const startDate = new Date(startTime)
            const endDate = new Date(endTime)
            const duration =
                (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)

            return <div>{`${duration.toFixed(2)} hrs`}</div>
        },
    },
    {
        accessorKey: "date",
        header: "Date",
    },
]
