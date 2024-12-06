import { WorkLogFetch } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

// Components
import EntryActions from "../EntryActions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type monthAbbreviationsType = { [key: number]: string }

const monthAbbreviations: monthAbbreviationsType = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
}

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
        id: "date",
        header: "Date",
        cell: ({ row }) => {
            const { startTime } = row.original

            const startDate = new Date(startTime)

            return (
                <div>{`${monthAbbreviations[startDate.getMonth()]}, ${startDate.getDay() + 1}, ${startDate.getFullYear()}`}</div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return <EntryActions data={row.original} />
        },
    },
]
