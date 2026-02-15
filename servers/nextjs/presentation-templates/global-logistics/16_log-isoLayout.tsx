import React from 'react'
import * as z from 'zod'


export const layoutId = "log-iso"
export const layoutName = "16. ISO Certification"
export const layoutDescription = "Badge display."

export const Schema = z.object({
    title: z.string().default("Certified Standards"),

    badges: z.array(z.string()).min(3).max(3).default([
        "ISO 14001: Environmental",
        "ISO 9001: Quality",
        "ISO 45001: Safety",
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
                href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Roboto+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white p-20 flex flex-col justify-center"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <h2 className="text-5xl font-black uppercase italic mb-20 text-center" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex justify-center gap-16">
                    {(data?.badges || []).map((badge, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-6">
                            <div className="w-48 h-48 rounded-full border-8 border-double border-white flex items-center justify-center bg-[#ea580c] shadow-[0_0_30px_rgba(234,88,12,0.5)]">
                                <div className="text-center font-black leading-tight p-4 uppercase">
                                    {badge.split(':')[0]}
                                </div>
                            </div>
                            <div className="font-bold text-[#38bdf8] uppercase tracking-widest">{badge.split(':')[1]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
