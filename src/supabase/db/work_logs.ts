import supabase from "@/supabase/client"

import type { Database } from "../types"

type WorkLogInsert = Database["public"]["Tables"]["work_logs"]["Insert"]

export default async function insertWorkLog(insertData: WorkLogInsert[]) {
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
