import React from 'react'
import * as z from 'zod'


export const layoutId = "log-ev"
export const layoutName = "04. EV Fleet"
export const layoutDescription = "Truck photo with stats."

export const Schema = z.object({
    title: z.string().default("Fleet Electrification"),

    ev_percent: z.string().default("25%"),
    target: z.string().default("Target: 100% by 2035"),

    img: z.string().url().default("https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg"), // Truck
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <div className="absolute inset-0 w-3/4 bg-gray-200 skew-x-[-12deg] -ml-20 overflow-hidden border-r-8 border-[#22c55e]">
                    <img src={data?.img} className="w-full h-full object-cover grayscale opacity-90 skew-x-[12deg] scale-125" />
                    <div className="absolute inset-0 bg-[#22c55e] mix-blend-multiply opacity-30 skew-x-[12deg]"></div>
                </div>

                <div className="absolute right-0 top-0 w-1/3 h-full flex flex-col justify-center p-12 pl-0">
                    <div className="bg-[#22c55e] text-white w-16 h-16 flex items-center justify-center rounded-full text-3xl font-bold mb-8 shadow-lg">⚡</div>

                    <h2 className="text-6xl font-black uppercase italic mb-8 text-[#1e293b] leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="border-t-4 border-gray-200 pt-8">
                        <div className="text-8xl font-black text-[#22c55e] mb-2">{data?.ev_percent}</div>
                        <div className="text-gray-500 font-bold uppercase">{data?.target}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
