import React from 'react'
import * as z from 'zod'


export const layoutId = "log-lastmile"
export const layoutName = "06. Last Mile"
export const layoutDescription = "City map route."

export const Schema = z.object({
    title: z.string().default("Last Mile Efficiency"),

    drop_rate: z.string().default("+15%"),
    stat_desc: z.string().default("Deliveries per Hour"),

    img: z.string().url().default("https://images.pexels.com/photos/4604663/pexels-photo-4604663.jpeg"), // Courier bike/van
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
                <div className="w-[45%] bg-[#ea580c] p-20 flex flex-col justify-center text-white relative overflow-hidden">
                    {/* Abstract Map overlay */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                        <path d="M10,10 L30,30 L30,60 L80,20" stroke="white" strokeWidth="1" fill="none" />
                        <circle cx="10" cy="10" r="2" fill="white" />
                        <circle cx="80" cy="20" r="2" fill="white" />
                    </svg>

                    <h2 className="text-6xl font-black uppercase italic mb-12 relative z-10" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="relative z-10">
                        <div className="text-8xl font-black mb-2">{data?.drop_rate}</div>
                        <div className="uppercase tracking-widest text-sm opacity-80">{data?.stat_desc}</div>
                    </div>
                </div>

                <div className="w-[55%] relative">
                    <img src={data?.img} className="w-full h-full object-cover" />
                    <div className="absolute top-10 right-10 bg-white/90 p-4 border-l-4 border-[#ea580c] shadow-lg">
                        <div className="text-xs text-gray-500 uppercase">Vehicle Type</div>
                        <div className="font-bold text-[#0f172a] text-xl">Electric Cargo Bike</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
