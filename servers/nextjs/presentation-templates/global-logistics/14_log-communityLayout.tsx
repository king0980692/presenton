import React from 'react'
import * as z from 'zod'


export const layoutId = "log-community"
export const layoutName = "14. Disaster Relief"
export const layoutDescription = "Photo card."

export const Schema = z.object({
    title: z.string().default("Delivering Hope"),

    stat: z.string().default("500 Tons"),
    label: z.string().default("Aid Delivered"),

    img: z.string().url().default("https://images.pexels.com/photos/6348124/pexels-photo-6348124.jpeg"), // Boxes/people
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20 flex gap-12"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <div className="w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 className="text-6xl font-black uppercase italic mb-8 text-[#ea580c]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                            {data?.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            When disaster strikes, our logistics network becomes a lifeline. We partner with NGOs to deliver critical supplies fast.
                        </p>
                    </div>

                    <div className="border-t-4 border-gray-100 pt-8">
                        <div className="text-7xl font-bold text-[#0f172a]">{data?.stat}</div>
                        <div className="text-sm font-bold uppercase text-gray-400">{data?.label}</div>
                    </div>
                </div>

                <div className="w-1/2 relative transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                    <img src={data?.img} className="w-full h-full object-cover border-8 border-white" />
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
