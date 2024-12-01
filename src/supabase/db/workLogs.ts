import supabase from "@/supabase/client"

import type { Database } from "../types"

import { WorkLogFetch } from "@/types"

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

const fetchWorkLogs = async (): Promise<WorkLogFetch[]> => {
    const { data, error } = await supabase.from("work_logs").select()

    if (error) {
        console.error("Error inserting work log:", error.message)
        throw error
    }

    const finalData: WorkLogFetch[] = []

    data.forEach((workLog) => {
        finalData.push({
            id: workLog.id,
            name: workLog.name,
            startTime: workLog.start_time,
            endTime: workLog.end_time,
            hourlyRate: workLog.hourly_rate,
        })
    })

    return finalData
}

const deleteWorkLog = async (id: number) => {
    const { error } = await supabase.from("work_logs").delete().eq("id", id)
}

export { insertWorkLog, fetchWorkLogs, deleteWorkLog }
