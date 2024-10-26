// [ Imports ]
// Components
import Navbar from "@/components/Navbar"

// Shadcn
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Use Session Context
import { useSession } from "@/context/SessionContext"

// Icons
import { CirclePlus } from "lucide-react"

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
        <>
            {/* Navbar */}
            <Navbar userName={session?.user.user_metadata.full_name} />

            <main className="h-screen w-screen bg-background px-4">
                {/* Top Bar with Your Entries and + Button */}
                <section className="flex items-center justify-between pt-4">
                    <h1 className="text-xl text-white">Your Entries</h1>

                    {/* Add New Entry Button */}
                    <CreateButton />
                </section>

                {/* List of entries of the user */}
                <section className="mt-5 flex flex-col gap-3">
                    {userEntries.map((entry, i) => (
                        <EntryContainer key={i} data={entry} />
                    ))}
                </section>
            </main>
        </>
    )
}

interface EntryContainerProps {
    data: {
        name: string
        startTime: string
        endTime: string
        date: string
        hours: number
    }
}

const EntryContainer = ({ data }: EntryContainerProps) => {
    return (
        <div className="bg-background-secondary rounded-md border border-accent p-2 text-white">
            {/* Row 1 : Name & Hours */}
            <div className="flex justify-between">
                <h2 className="w-44 overflow-hidden overflow-ellipsis text-nowrap">
                    {data.name}
                </h2>
                <p>{data.hours}</p>
            </div>
            {/* Row 2 : Time Frame */}
            <div>{`${data.startTime} - ${data.endTime}`}</div>
        </div>
    )
}

const CreateButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-transparent">
                    <CirclePlus className="text-accent" />
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-md border-accent sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white">
                        Add an Entry
                    </DialogTitle>
                    <DialogDescription>
                        Log your most recent work shift.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>

                <DialogFooter className="flex flex-row justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Create
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DashboardPage
