import React from 'react'
import * as z from 'zod'


export const layoutId = "log-drone"
export const layoutName = "18. Future Tech"
export const layoutDescription = "Drone delivery concept."

export const Schema = z.object({
    title: z.string().default("Autonomous Fleets"),

    description: z.string().default("Testing drone deliveries for medical supplies in remote areas to reduce carbon emissions."),

    img: z.string().url().default("https://images.pexels.com/photos/10348398/pexels-photo-10348398.jpeg"), // Drone
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <img src={data?.img} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0f172a] via-transparent to-transparent"></div>

                <div className="absolute right-0 top-0 w-1/3 h-full flex flex-col justify-center p-12 bg-[#0f172a]/90 backdrop-blur border-l border-gray-700">
                    <div className="text-[#38bdf8] font-bold uppercase mb-4 tracking-widest text-xs">Innovation Lab</div>
                    <h2 className="text-5xl font-black uppercase italic mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-gray-300 leading-relaxed font-light">
                        {data?.description}
                    </p>

                    <button className="mt-8 bg-[#ea580c] text-white py-3 px-8 font-bold uppercase hover:bg-orange-700 transition-colors w-fit">
                 View Pilot >
                    </button>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
