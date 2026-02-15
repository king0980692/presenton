import React from 'react'
import * as z from 'zod'


export const layoutId = "log-diversity"
export const layoutName = "12. Women in Logistics"
export const layoutDescription = "Photo with stat overlay."

export const Schema = z.object({
    title: z.string().default("Breaking Barriers"),

    percent: z.string().default("30%"),
    label: z.string().default("Women in Management"),

    img: z.string().url().default("https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg"), // Female logistics worker
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white flex"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <div className="w-1/2 relative bg-gray-900">
                    <img src={data?.img} className="w-full h-full object-cover grayscale opacity-70" />
                    <div className="absolute top-0 right-0 w-4 h-full bg-[#ea580c]"></div>
                </div>

                <div className="w-1/2 p-20 flex flex-col justify-center">
                    <h2 className="text-6xl font-black uppercase italic mb-8 text-[#0f172a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <p className="text-gray-500 mb-12 max-w-sm">
                        We are committed to increasing diversity in a traditionally male-dominated industry.
                    </p>

                    <div className="flex items-end gap-4">
                        <div className="text-9xl font-black text-[#ea580c] leading-none">{data?.percent}</div>
                        <div className="text-sm font-bold uppercase pb-4 max-w-[100px]">{data?.label}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
