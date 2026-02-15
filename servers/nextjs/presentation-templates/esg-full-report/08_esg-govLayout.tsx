import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-gov"
export const layoutName = "08. Governance Structure"
export const layoutDescription = "Hierarchical organizational chart."

export const Schema = z.object({
    title: z.string().default("Sustainability Governance Structure"),

    board_level: z.string().default("Board of Directors"),
    committee: z.string().default("ESG Committee"),
    working_group: z.string().default("Sustainability Office"),

    teams: z.array(z.string()).min(4).max(4).default([
        "Environmental Task Force",
        "Social Responsibility Team",
        "Corporate Governance Team",
        "Supply Chain Management",
    ]),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16 flex flex-col items-center"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-[#172B4D] mb-16 text-center">{data?.title}</h2>

                {/* Chart Tree */}
                <div className="w-full max-w-4xl flex flex-col items-center relative">

                    {/* Level 1: Board */}
                    <div className="bg-[#172B4D] text-white px-10 py-4 rounded font-bold text-xl shadow-lg z-10 w-64 text-center">
                        {data?.board_level}
                    </div>

                    {/* Connector */}
                    <div className="h-10 w-px bg-[#DFE1E6]"></div>

                    {/* Level 2: Committee */}
                    <div className="bg-[#0052CC] text-white px-10 py-4 rounded font-bold text-xl shadow-lg z-10 w-64 text-center">
                        {data?.committee}
                    </div>

                    {/* Connector */}
                    <div className="h-10 w-px bg-[#DFE1E6]"></div>

                    {/* Level 3: Working Group */}
                    <div className="bg-white border-2 border-[#0052CC] text-[#0052CC] px-10 py-3 rounded font-bold text-lg shadow-sm z-10 w-64 text-center">
                        {data?.working_group}
                    </div>

                    {/* Branching Lines */}
                    <div className="h-8 w-px bg-[#DFE1E6]"></div>
                    <div className="w-[80%] h-px bg-[#DFE1E6] relative">
                        <div className="absolute left-0 top-0 w-px h-6 bg-[#DFE1E6]"></div>
                        <div className="absolute left-1/3 top-0 w-px h-6 bg-[#DFE1E6]"></div>
                        <div className="absolute right-1/3 top-0 w-px h-6 bg-[#DFE1E6]"></div>
                        <div className="absolute right-0 top-0 w-px h-6 bg-[#DFE1E6]"></div>
                    </div>

                    {/* Level 4: Teams Grid */}
                    <div className="grid grid-cols-4 gap-6 mt-6 w-full">
                        {(data?.teams || []).map((team, idx) => (
                            <div key={idx} className="bg-[#F4F5F7] border border-[#DFE1E6] p-4 text-center rounded text-sm text-[#42526E] font-semibold h-20 flex items-center justify-center shadow-sm">
                                {team}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
