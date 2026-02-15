import React from 'react'
import * as z from 'zod'


export const layoutId = "corp-stats"
export const layoutName = "06. Corporate Highlights"
export const layoutDescription = "Key performance indicators with icons."

export const Schema = z.object({
    title: z.string().default("Annual Highlights"),

    stats: z.array(z.object({
        val: z.string().default("$1.2B"),
        label: z.string().default("Revenue"),
        change: z.string().default("+12% YoY"),
    })).min(3).max(3).default([
        { val: "$4.5B", label: "Total Asset Value", change: "+8% YoY" },
        { val: "125", label: "Global Offices", change: "+5 New Interest" },
        { val: "45K+", label: "Employees", change: "Across 30 Countries" },
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
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#FFFFFF]"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="h-[40%] bg-[#0A192F] w-full absolute top-0 z-0"></div>

                <div className="relative z-10 w-full h-full flex flex-col justify-center px-20">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {data?.title}
                        </h2>
                        <p className="text-[#94A3B8]">Key metrics demonstrating our continued leadership.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-10">
                        {(data?.stats || []).map((stat, idx) => (
                            <div key={idx} className="bg-white p-10 shadow-2xl text-center border-t-4 border-[#C5A059] flex flex-col justify-center h-64">
                                <div className="text-5xl font-bold text-[#0A192F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {stat.val}
                                </div>
                                <div className="text-xl font-bold text-[#475569] mb-2 uppercase tracking-wide">
                                    {stat.label}
                                </div>
                                <div className="inline-block px-3 py-1 bg-[#F1F5F9] text-[#64748B] text-sm font-semibold rounded-full mx-auto">
                                    {stat.change}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
