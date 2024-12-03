import supabase from "@/supabase/client"

import type { Database } from "../types"

import { WorkLogFetch } from "@/types"

type WorkLogInsert = Database["public"]["Tables"]["work_logs"]["Insert"]
type DataType = Database["public"]["Tables"]["work_logs"]["Row"]

// Helper Functions
const convertDataToWorkLogFetch = (data: DataType[]) => {
    const convertedData: WorkLogFetch[] = []

    data.forEach((workLog) => {
        convertedData.push({
            id: workLog.id,
            name: workLog.name,
            startTime: workLog.start_time,
            endTime: workLog.end_time,
            hourlyRate: workLog.hourly_rate,
        })
    })

    return convertedData
}

// DB Functions
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

    const finalData: WorkLogFetch[] = convertDataToWorkLogFetch(data)

    return finalData
}

const deleteWorkLog = async (id: number) => {
    const { error } = await supabase.from("work_logs").delete().eq("id", id)
}

const fetchWorkLogById = async (id: number): Promise<WorkLogFetch[]> => {
    const { data, error } = await supabase
        .from("work_logs")
        .select()
        .eq("id", id)

    if (!data) {
        return []
    }

    return convertDataToWorkLogFetch(data)
}

const editWorkLog = async (updateData: DataType) => {
    const { data, error } = await supabase
        .from("work_logs")
        .update(updateData)
        .eq("id", updateData.id)
        .select()

    console.log(error)
    console.log(data)

    return data
}

export {
    insertWorkLog,
    fetchWorkLogs,
    deleteWorkLog,
    fetchWorkLogById,
    editWorkLog,
}
