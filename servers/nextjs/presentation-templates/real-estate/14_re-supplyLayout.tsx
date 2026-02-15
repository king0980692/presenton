import React from 'react'
import * as z from 'zod'


export const layoutId = "re-supply"
export const layoutName = "14. Supply Chain"
export const layoutDescription = "Process flowchart."

export const Schema = z.object({
    title: z.string().default("Responsible Sourcing"),

    steps: z.array(z.string()).min(4).max(4).default([
        "Supplier Code of Conduct",
        "Material Traceability",
        "Carbon Footprint Check",
        "On-Site Audits",
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
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;500;700&family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#f3f4f6] p-20 flex flex-col justify-center"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold uppercase mb-20 text-center text-[#374151]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex justify-between relative px-10">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-300 -z-10 transform -translate-y-1/2"></div>

                    {(data?.steps || []).map((step, idx) => (
                        <div key={idx} className="w-48 bg-white p-6 shadow-lg border-t-8 border-[#10b981] flex flex-col items-center text-center hover:-translate-y-2 transition-transform">
                            <div className="text-4xl mb-4 text-gray-400 font-black">0{idx + 1}</div>
                            <div className="font-bold uppercase text-sm leading-tight text-[#374151]">{step}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
