import supabase from "@/supabase/client"

import type { Database } from "../types"

type WorkLogInsert = Database["public"]["Tables"]["work_logs"]["Insert"]

const insertWorkLog = async (
    insertData: WorkLogInsert[],
): Promise<WorkLogInsert[]> => {
    const { data, error } = await supabase
        .from("work_logs")
        .insert(insertData)
        .select()

    if (error) {
        console.error("Error inserting work log:", error.message)
        throw error
    }

    return data
}

const fetchWorkLogs = async (): Promise<WorkLogInsert[]> => {
    const { data, error } = await supabase.from("work_logs").select()

    if (error) {
        console.error("Error inserting work log:", error.message)
        throw error
    }

    return data
}

export { insertWorkLog, fetchWorkLogs }
