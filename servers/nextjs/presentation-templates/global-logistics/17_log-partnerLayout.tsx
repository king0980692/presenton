import React from 'react'
import * as z from 'zod'


export const layoutId = "log-partner"
export const layoutName = "17. Strategic Partners"
export const layoutDescription = "Logo grid."

export const Schema = z.object({
    title: z.string().default("Partners in Sustainability"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20 flex flex-col justify-center"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <h2 className="text-5xl font-black uppercase italic mb-20 text-center text-[#0f172a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="grid grid-cols-4 gap-8 opacity-70">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="aspect-video bg-gray-100 flex items-center justify-center rounded border border-gray-200">
                            <div className="font-black text-gray-300 text-2xl uppercase">LOGO {i + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
