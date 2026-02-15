import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-stack"
export const layoutName = "03. Tech Stack"
export const layoutDescription = "Grid of technologies."

export const Schema = z.object({
    title: z.string().default("Our Tech Stack"),

    items: z.array(z.string()).min(4).max(4).default([
        "AI / Machine Learning",
        "Cloud Infrastructure",
        "Blockchain Security",
        "IoT Edge Computing",
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white p-20 flex flex-col justify-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold mb-16 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
                    {(data?.items || []).map((item, idx) => (
                        <div key={idx} className="bg-[#1e293b] p-8 rounded-xl border border-gray-700 hover:border-[#38bdf8] transition-colors group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-4xl font-bold">{idx + 1}</div>
                            <div className="text-3xl mb-4 group-hover:text-[#38bdf8] transition-colors">
                                {idx === 0 && "🤖"}
                                {idx === 1 && "☁️"}
                                {idx === 2 && "🔗"}
                                {idx === 3 && "📡"}
                            </div>
                            <h3 className="text-xl font-bold font-mono">{item}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
