import React from 'react'
import * as z from 'zod'


export const layoutId = "health-pipeline"
export const layoutName = "04. Drug/Tech Pipeline"
export const layoutDescription = "Gantt style funnel for R&D phases."

export const Schema = z.object({
    title: z.string().default("Innovation Pipeline"),

    stages: z.array(z.string()).default(["Discovery", "Pre-Clinical", "Phase I", "Phase II", "Phase III", "Approval"]),

    drugs: z.array(z.object({
        name: z.string().default("Drug Name"),
        area: z.string().default("Therapeutic Area"),
        stage_idx: z.number().default(2), // 0-5 index
    })).min(4).max(4).default([
        { name: "Cardio-X", area: "Cardiology", stage_idx: 4 },
        { name: "Neuro-Z", area: "Neurology", stage_idx: 2 },
        { name: "Immuno-A", area: "Oncology", stage_idx: 3 },
        { name: "Vax-B", area: "Vaccines", stage_idx: 1 },
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
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@400;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-gray-800 mb-12" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {data?.title}
                </h2>

                {/* Stage Header */}
                <div className="grid grid-cols-6 gap-2 mb-6">
                    {(data?.stages || []).map((stage, idx) => (
                        <div key={idx} className="text-xs font-bold text-gray-400 uppercase tracking-wide text-center">
                            {stage}
                        </div>
                    ))}
                </div>

                {/* Pipeline Body */}
                <div className="space-y-6">
                    {(data?.drugs || []).map((drug, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4 relative overflow-hidden group">
                            {/* Background Progress Bar */}
                            <div
                                className="absolute top-0 left-0 h-full bg-teal-100 transition-all duration-1000 -z-0 rounded-r-lg group-hover:bg-teal-200"
                                style={{ width: `${((drug.stage_idx + 1) / 6) * 100}%` }}
                            ></div>

                            <div className="relative z-10 flex justify-between items-center pl-4 pr-10">
                                <div>
                                    <div className="font-bold text-xl text-teal-800">{drug.name}</div>
                                    <div className="text-sm text-gray-500 font-medium">{drug.area}</div>
                                </div>

                                {/* Dot indicator at the end */}
                                <div className="absolute h-3 w-3 rounded-full bg-teal-500 shadow-md" style={{ left: `calc(${((drug.stage_idx + 0.5) / 6) * 100}% - 6px)` }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-sm text-gray-400 italic text-center">
                    *Pipeline status as of December 31, {new Date().getFullYear()}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
