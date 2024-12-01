import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import EditButton from "./EditButton"

import { Ellipsis } from "lucide-react"

// Mutation for Refetching
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteWorkLog } from "@/supabase/db/workLogs"

interface Props {
    id: number
}

export default function EntryActions({ id }: Props) {
    const queryClient = useQueryClient()

    const deleteData = async () => {
        await deleteWorkLog(id)

        queryClient.invalidateQueries({ queryKey: ["workLogs"] })
    }

    const deleteMutation = useMutation({
        mutationFn: deleteData,
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <EditButton />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteMutation.mutate()}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
