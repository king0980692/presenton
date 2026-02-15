import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-hse"
export const layoutName = "04. HSE Safety Stats"
export const layoutDescription = "Health, Safety, Environment dashboard."

export const Schema = z.object({
    title: z.string().default("Safety First Culture"),

    stats: z.array(z.object({
        val: z.string().default("0"),
        label: z.string().default("Metric"),
        desc: z.string().default("Description"),
        status: z.enum(["Good", "Warning", "Critical"]).default("Good"),
    })).min(4).max(4).default([
        { val: "0", label: "Fatalities", desc: "Zero harm goal achieved.", status: "Good" },
        { val: "0.45", label: "TRIR Rate", desc: "Total Recordable Incident Rate.", status: "Good" },
        { val: "100%", label: "Safety Training", desc: "Employees certified.", status: "Good" },
        { val: "24", label: "Safety Audits", desc: "Completed this quarter.", status: "Warning" }, // Warning as example
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
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#2D2D2D] text-white p-12"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <div className="flex justify-between items-end mb-12 border-b-2 border-gray-600 pb-6">
                    <h2 className="text-5xl font-bold uppercase text-[#FFD700]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-white">1,240 DAYS</div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest">Since last lost time injury</div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-8">
                    {(data?.stats || []).map((stat, idx) => {
                        let color = '#4ADE80'; // Green
                        if (stat.status === 'Warning') color = '#FACC15'; // Yellow
                        if (stat.status === 'Critical') color = '#EF4444'; // Red

                        return (
                            <div key={idx} className="bg-[#1A1A1A] border border-gray-700 p-8 flex flex-col justify-between h-80 relative overflow-hidden group hover:border-[#FFD700]">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full"></div>

                                <div>
                                    <h3 className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-4">{stat.label}</h3>
                                    <div className="text-7xl font-bold mb-4" style={{ color: color, fontFamily: "'Oswald', sans-serif" }}>
                                        {stat.val}
                                    </div>
                                </div>

                                <div>
                                    <div className="w-full h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: '80%', backgroundColor: color }}></div>
                                    </div>
                                    <p className="text-sm text-gray-300 font-light">{stat.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
