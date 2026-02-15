import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-security"
export const layoutName = "07. Software Security"
export const layoutDescription = "Flowchart pipeline."

export const Schema = z.object({
    title: z.string().default("DevSecOps Pipeline"),

    stages: z.array(z.string()).min(4).max(4).default([
        "Code Scan",
        "Build",
        "Test",
        "Deploy",
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#020617] text-white p-20 flex flex-col justify-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold mb-20 text-center font-mono" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex justify-between items-center relative px-20">
                    {/* Converting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10"></div>

                    {(data?.stages || []).map((stage, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-6 z-10">
                            <div className="w-32 h-32 rounded-lg bg-[#1e293b] border-2 border-[#38bdf8] flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                                <div className="text-4xl">
                                    {idx === 0 && "🔍"}
                                    {idx === 1 && "📦"}
                                    {idx === 2 && "✅"}
                                    {idx === 3 && "🚀"}
                                </div>
                            </div>
                            <div className="font-mono text-[#38bdf8] uppercase tracking-widest">{stage}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
