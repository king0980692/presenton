import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-letter"
export const layoutName = "02. CEO Letter"
export const layoutDescription = "Text block with avatar."

export const Schema = z.object({
    title: z.string().default("Vision.update()"),

    p1: z.string().default("In a year defined by accelerated digital transformation, we remained steadfast in our commitment to responsible innovation. Our code isn't just running servers; it's empowering communities."),
    p2: z.string().default("We've achieved carbon neutrality across our data centers and are now aiming for net-zero by 2030."),

    name: z.string().default("Sarah Chen"),
    role: z.string().default("Chief Executive Officer"),
    avatar: z.string().url().default("https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#020617] text-white p-20 flex gap-16 items-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="w-1/3 relative">
                    <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#38bdf8] shadow-[0_0_50px_rgba(56,189,248,0.3)] relative z-10">
                        <img src={data?.avatar} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                    {/* Background Circle */}
                    <div className="absolute top-10 left-10 w-64 h-64 rounded-full border border-gray-700 z-0"></div>

                    <div className="mt-8 text-center w-64">
                        <div className="text-2xl font-bold font-mono">{data?.name}</div>
                        <div className="text-[#38bdf8] text-sm uppercase tracking-widest">{data?.role}</div>
                    </div>
                </div>

                <div className="w-2/3">
                    <h2 className="text-5xl font-bold mb-10 font-mono text-[#a855f7]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="space-y-8 text-xl font-light text-gray-300 leading-relaxed">
                        <p>{data?.p1}</p>
                        <div className="border-l-2 border-[#38bdf8] pl-6 italic text-white">
                            "{data?.p2}"
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
