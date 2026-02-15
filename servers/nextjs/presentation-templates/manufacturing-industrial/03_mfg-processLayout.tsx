import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-process"
export const layoutName = "03. Production Process"
export const layoutDescription = "Step-by-step process flow."

export const Schema = z.object({
    title: z.string().default("Lean Manufacturing Process"),

    steps: z.array(z.object({
        num: z.string().default("01"),
        label: z.string().default("Stage Name"),
        desc: z.string().default("Description of this phase."),
    })).min(5).max(5).default([
        { num: "01", label: "Sourcing", desc: "Responsibly sourced raw materials." },
        { num: "02", label: "Processing", desc: "High-efficiency smelting and refining." },
        { num: "03", label: "Assembly", desc: "Automated precision assembly lines." },
        { num: "04", label: "QC Check", desc: "Rigorous ISO-standard testing." },
        { num: "05", label: "Logistics", desc: "Carbon-neutral global shipping." },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white text-[#1A1A1A] p-16"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold uppercase mb-16 border-l-8 border-[#FFD700] pl-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex items-center justify-between relative mt-20">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 w-[80%] h-2 bg-gradient-to-r from-[#1A1A1A] to-[#FFD700] -z-10 transform -translate-y-1/2"></div>

                    {(data?.steps || []).map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center w-48 relative group">
                            <div className="w-16 h-16 bg-[#1A1A1A] text-[#FFD700] rounded-none transform rotate-45 flex items-center justify-center border-4 border-white shadow-xl mb-8 group-hover:scale-110 transition-transform cursor-pointer">
                                <span className="transform -rotate-45 font-bold text-xl">{step.num}</span>
                            </div>

                            <div className="text-center bg-[#F4F4F4] p-4 border-t-4 border-[#FFD700] w-full min-h-[8rem] shadow-sm">
                                <h3 className="text-lg font-bold uppercase mb-2">{step.label}</h3>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Arrow for active steps */}
                            {idx < (data?.steps?.length || 0) - 1 && (
                                <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 text-2xl text-gray-400 font-bold">
                                    &gt;
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
