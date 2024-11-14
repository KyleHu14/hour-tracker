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
        <div className="rounded-md border border-accent bg-background-secondary p-2 text-white">
            {/* Row 1 : Name & Hours */}
            <div className="flex justify-between">
                <h2 className="w-44 overflow-hidden overflow-ellipsis text-nowrap sm:w-52 md:w-64 lg:w-96">
                    {data.name}
                </h2>
                <p>{data.hours} Hours</p>
            </div>
            {/* Row 2 : Time Frame */}
            <div>{`${data.startTime} - ${data.endTime}`}</div>
        </div>
    )
}

export default EntryContainer
