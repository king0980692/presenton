import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-human"
export const layoutName = "17. Human Capital Development"
export const layoutDescription = "Employee training and turnover stats."

export const Schema = z.object({
    title: z.string().default("Talent Attraction & Retention"),

    turnover_rate: z.string().default("8.5%"),
    training_hours: z.string().default("42.5"),

    programs: z.array(z.string()).min(3).max(3).default([
        "Global Leadership Program",
        "Digital Upskilling Initiative",
        "Mental Health & Wellbeing Support",
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F4F5F7] p-16 flex gap-12"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="w-1/2 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-[#172B4D] mb-12 leading-tight">
                        {data?.title}
                    </h2>

                    <div className="bg-white p-8 rounded shadow-sm border-l-8 border-[#6554C0] mb-6">
                        <div className="text-sm uppercase text-[#5E6C84] font-bold mb-2">Average Training Hours</div>
                        <div className="text-6xl font-bold text-[#6554C0]">{data?.training_hours} <span className="text-2xl text-[#172B4D]">hrs / employee</span></div>
                    </div>

                    <div className="bg-white p-8 rounded shadow-sm border-l-8 border-[#FF5630]">
                        <div className="text-sm uppercase text-[#5E6C84] font-bold mb-2">Voluntary Turnover Rate</div>
                        <div className="text-6xl font-bold text-[#FF5630]">{data?.turnover_rate}</div>
                    </div>
                </div>

                <div className="w-1/2 bg-white p-10 rounded shadow-lg flex flex-col">
                    <h3 className="text-2xl font-bold text-[#172B4D] mb-8">Key Development Programs</h3>

                    <div className="space-y-6">
                        {(data?.programs || []).map((prog, idx) => (
                            <div key={idx} className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-[#EAE6FF] text-[#6554C0] flex items-center justify-center font-bold text-xl group-hover:bg-[#6554C0] group-hover:text-white transition-colors">
                                    {idx + 1}
                                </div>
                                <div className="text-xl font-bold text-[#172B4D]">{prog}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto bg-[#DEEBFF] p-6 rounded text-[#0052CC] font-medium">
                        "Our people are our greatest asset. We are committed to fostering a culture of continuous learning."
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
