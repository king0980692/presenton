import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-compliance"
export const layoutName = "16. Compliance & Certs"
export const layoutDescription = "Grid of badges."

export const Schema = z.object({
    title: z.string().default("Enterprise Grade Security"),

    certs: z.array(z.string()).min(4).max(4).default([
        "SOC 2 Type II",
        "ISO 27001",
        "GDPR Compliant",
        "HIPAA Ready",
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
                <h2 className="text-4xl font-bold font-mono mb-20 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex justify-between gap-8">
                    {(data?.certs || []).map((cert, idx) => (
                        <div key={idx} className="flex-1 aspect-square bg-[#1e293b] rounded-2xl flex flex-col items-center justify-center border border-gray-700 hover:border-[#38bdf8] hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all">
                            <div className="text-5xl mb-4 text-[#38bdf8]">
                                🏆
                            </div>
                            <div className="font-bold text-center px-4 font-mono">{cert}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
