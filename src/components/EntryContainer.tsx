import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { WorkLogFetch } from "@/types"

import EntryActions from "./EntryActions"

interface Props {
    data: WorkLogFetch
}

const EntryContainer = ({ data }: Props) => {
    // const { startTime, endTime, name, hourlyRate, id } = data
    const { startTime, endTime, name, hourlyRate } = data

    const startDate = new Date(startTime)
    const endDate = new Date(endTime)

    const hours = endDate.getHours() - startDate.getHours()

    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{`Date : ${startDate.toLocaleString().split(",")[0]}`}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{`Hours Worked : ${hours}`}</p>
                <p>{`Shift : ${startDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                })} - ${endDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}`}</p>
                <p>{`Money Made : ${hours * hourlyRate}$`}</p>
            </CardContent>
            <CardFooter>
                <EntryActions data={data} />
            </CardFooter>
        </Card>
    )
}

export default EntryContainer
