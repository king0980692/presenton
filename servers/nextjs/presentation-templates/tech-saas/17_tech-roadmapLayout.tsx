import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-roadmap"
export const layoutName = "17. Net Zero Roadmap"
export const layoutDescription = "Timeline steps."

export const Schema = z.object({
    title: z.string().default("Roadmap to Net Zero"),

    steps: z.array(z.string()).min(3).max(3).default([
        "2025: 100% Renewable Data Centers",
        "2028: Carbon Neutral Supply Chain",
        "2030: Net Zero Emissions",
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
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white p-20"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold font-mono mb-20" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="space-y-12 border-l-2 border-gray-700 ml-10 pl-10 relative">
                    {(data?.steps || []).map((step, idx) => (
                        <div key={idx} className="relative">
                            <div className="absolute -left-[54px] top-1 w-6 h-6 bg-[#0f172a] border-4 border-[#22c55e] rounded-full z-10"></div>

                            <div className="text-3xl font-light text-gray-300">
                                {step.split(':')[0]}: <span className="text-[#22c55e] font-bold">{step.split(':')[1]}</span>
                            </div>
                        </div>
                    ))}

                    {/* Future path */}
                    <div className="absolute left-[-2px] bottom-[-50px] w-1 h-32 bg-gradient-to-b from-gray-700 to-transparent"></div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
