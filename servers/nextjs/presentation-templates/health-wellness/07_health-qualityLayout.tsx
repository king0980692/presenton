import React from 'react'
import * as z from 'zod'


export const layoutId = "health-quality"
export const layoutName = "07. Quality Metrics"
export const layoutDescription = "Checklist style quality stats."

export const Schema = z.object({
    title: z.string().default("Uncompromising Quality"),

    metrics: z.array(z.object({
        label: z.string().default("Metric"),
        val: z.string().default("99%"),
    })).min(4).max(4).default([
        { label: "Patient Satisfaction", val: "98%" },
        { label: "Successful Surgeries", val: "99.5%" },
        { label: "ISO 13485 Certified", val: "Yes" },
        { label: "FDA Inspections Passed", val: "100%" },
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
                <div className="flex justify-between items-center mb-16 border-b pb-6">
                    <h2 className="text-4xl font-bold text-gray-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <div className="bg-teal-50 text-teal-800 px-6 py-2 rounded-full font-bold text-sm uppercase">Global Standards</div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    {(data?.metrics || []).map((metric, idx) => (
                        <div key={idx} className="flex items-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold mr-6">
                                ✓
                            </div>
                            <div className="flex-1">
                                <div className="text-gray-500 font-bold uppercase text-xs mb-1">{metric.label}</div>
                                <div className="text-3xl font-bold text-gray-800">{metric.val}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
