import React from 'react'
import * as z from 'zod'


export const layoutId = "health-training"
export const layoutName = "12. Medical Training"
export const layoutDescription = "Stats for staff development."

export const Schema = z.object({
    title: z.string().default("Investing in Expertise"),

    hours: z.string().default("40 Hours"),
    staff: z.string().default("2,500+ Staff"),

    programs: z.array(z.string()).min(3).max(3).default([
        "Clinical Leadership",
        "Advanced Trauma Life Support",
        "Digital Health Certification",
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-teal-50 flex"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="w-1/2 p-20 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-teal-900 mb-12" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="flex gap-12 mb-12">
                        <div>
                            <div className="text-6xl font-bold text-teal-600 mb-2">{data?.hours}</div>
                            <div className="text-sm font-bold uppercase text-teal-800">Training per Employee</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-6xl font-bold text-teal-600 mb-2">{data?.staff}</div>
                        <div className="text-sm font-bold uppercase text-teal-800">Upskilled Annually</div>
                    </div>
                </div>

                <div className="w-1/2 bg-white p-20 flex flex-col justify-center shadow-[-20px_0_40px_rgba(0,0,0,0.05)]">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8 uppercase tracking-wide border-b-2 border-teal-500 pb-2 inline-block">Core Programs</h3>
                    <ul className="space-y-6">
                        {(data?.programs || []).map((prog, idx) => (
                            <li key={idx} className="flex items-center gap-4 text-xl text-gray-600 font-light">
                                <div className="h-2 w-2 bg-teal-500 rounded-full"></div>
                                {prog}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
