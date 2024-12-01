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

const EntryContainer = ({
    id,
    name,
    startTime,
    endTime,
    hourlyRate,
}: WorkLogFetch) => {
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
                <EntryActions id={id} />
            </CardFooter>
        </Card>
        // <div className="rounded-md border border-accent bg-background-secondary p-2 text-white">
        //     {/* Row 1 : Name & Hours */}
        //     <div className="flex justify-between">
        //         <h2 className="w-44 overflow-hidden overflow-ellipsis text-nowrap sm:w-52 md:w-64 lg:w-96">
        //             {data.name}
        //         </h2>
        //         <p>{data.hours} Hours</p>
        //     </div>
        //     {/* Row 2 : Time Frame */}
        //     <div>{`${data.startTime} - ${data.endTime}`}</div>
        // </div>
    )
}

export default EntryContainer
