import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-ai"
export const layoutName = "06. AI Ethics"
export const layoutDescription = "Brain circuit diagram."

export const Schema = z.object({
    title: z.string().default("Responsible AI"),

    principles: z.array(z.string()).min(3).max(3).default([
        "Bias Detection & Mitigation",
        "Explainable Algorithms (XAI)",
        "Human-in-the-Loop Oversight",
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
                <div className="flex items-center justify-between h-full">
                    <div className="w-1/2">
                        <div className="text-[#a855f7] font-mono mb-4 text-sm tracking-widest">ETHICAL_FRAMEWORK</div>
                        <h2 className="text-6xl font-bold mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {data?.title}
                        </h2>

                        <ul className="space-y-8">
                            {(data?.principles || []).map((p, idx) => (
                                <li key={idx} className="flex items-center gap-4 text-2xl font-light text-gray-300">
                                    <span className="text-[#a855f7] font-bold">0{idx + 1}.</span> {p}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-1/2 relative bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/21/Circuit_Board.svg')] bg-cover opacity-20 h-full rounded-2xl border border-gray-700">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl text-[#a855f7] drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                            🧠
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
