import React from 'react'
import * as z from 'zod'


export const layoutId = "health-trials"
export const layoutName = "05. Clinical Trials Stats"
export const layoutDescription = "Grid of trial metrics."

export const Schema = z.object({
    title: z.string().default("Clinical Excellence"),

    stats: z.array(z.object({
        val: z.string().default("0"),
        label: z.string().default("Metric"),
        color: z.string().default("teal"),
    })).min(4).max(4).default([
        { val: "45", label: "Active Trials", color: "teal" },
        { val: "12k", label: "Participants", color: "blue" },
        { val: "92%", label: "Retention Rate", color: "indigo" },
        { val: "15", label: "Countries", color: "cyan" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16 flex flex-col justify-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-16" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="grid grid-cols-4 gap-8">
                    {(data?.stats || []).map((stat, idx) => {
                        let textCol = 'text-teal-600';
                        if (stat.color === 'blue') textCol = 'text-blue-600';
                        if (stat.color === 'indigo') textCol = 'text-indigo-600';
                        if (stat.color === 'cyan') textCol = 'text-cyan-600';

                        return (
                            <div key={idx} className="flex flex-col items-center">
                                <div className={`w-40 h-40 rounded-full border-4 flex items-center justify-center bg-white shadow-xl mb-6 border-current ${textCol}`}>
                                    <span className="text-5xl font-bold">{stat.val}</span>
                                </div>
                                <div className="font-bold text-gray-700 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
