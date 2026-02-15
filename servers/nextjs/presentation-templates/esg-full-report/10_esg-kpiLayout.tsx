import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-kpi"
export const layoutName = "10. Key Performance Indicators"
export const layoutDescription = "Grid of big number cards."

export const Schema = z.object({
    title: z.string().default("2023 Performance Highlights"),

    kpis: z.array(z.object({
        label: z.string().default("Metric"),
        value: z.string().default("0"),
        unit: z.string().default("-"),
        change: z.string().default("+0%"),
        color: z.string().default("blue"),
    })).min(6).max(6).default([
        { label: "GHG Emissions", value: "3,500", unit: "tCO2e", change: "-12%", color: "green" },
        { label: "Renewable Energy", value: "45", unit: "%", change: "+5%", color: "green" },
        { label: "Employee Turnover", value: "8.5", unit: "%", change: "-1.2%", color: "blue" },
        { label: "Training Hours", value: "42", unit: "hrs/emp", change: "+10%", color: "blue" },
        { label: "Board Diversity", value: "40", unit: "% Female", change: "+5%", color: "orange" },
        { label: "Suppliers Audited", value: "100", unit: "%", change: "0%", color: "orange" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F4F5F7] p-16"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-[#172B4D] mb-12">{data?.title}</h2>

                <div className="grid grid-cols-3 gap-8">
                    {(data?.kpis || []).map((kpi, idx) => {
                        let accent = '#0052CC';
                        if (kpi.color === 'green') accent = '#36B37E';
                        if (kpi.color === 'orange') accent = '#FF991F';

                        return (
                            <div key={idx} className="bg-white p-8 rounded shadow-sm border-t-4 flex flex-col justify-between h-40" style={{ borderColor: accent }}>
                                <div className="text-[#5E6C84] text-sm font-bold uppercase tracking-wide">
                                    {kpi.label}
                                </div>

                                <div className="flex items-baseline gap-2">
                                    <div className="text-5xl font-bold text-[#172B4D]">{kpi.value}</div>
                                    <div className="text-lg text-[#6B778C] font-medium">{kpi.unit}</div>
                                </div>

                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-sm px-2 py-0.5 rounded bg-gray-100 font-bold" style={{ color: accent }}>
                                        {kpi.change}
                                    </span>
                                    <span className="text-xs text-[#6B778C]">vs. previous year</span>
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
