import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import EditButton from "./ModalButtons/EditButton"

import { Ellipsis } from "lucide-react"

// Mutation for Refetching
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteWorkLog } from "@/supabase/db/workLogs"
import { WorkLogFetch } from "@/types"

interface Props {
    data: WorkLogFetch
}

export default function EntryActions({ data }: Props) {
    const queryClient = useQueryClient()

    const deleteData = async () => {
        await deleteWorkLog(data.id)

        queryClient.invalidateQueries({ queryKey: ["workLogs"] })
        queryClient.invalidateQueries({ queryKey: ["totalHours"] })
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
                    <EditButton data={data} />
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => deleteMutation.mutate()}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
