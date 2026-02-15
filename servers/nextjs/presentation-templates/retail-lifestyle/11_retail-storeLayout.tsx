import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-store"
export const layoutName = "11. Store Concept"
export const layoutDescription = "Photo grid for retail interior."

export const Schema = z.object({
    title: z.string().default("The New Store Experience"),
    description: z.string().default("Designed with recycled materials, community spaces, and zero-waste refill stations."),

    img1: z.string().url().default("https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg"),
    img2: z.string().url().default("https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Mulish:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-12 pr-0 flex"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="w-[40%] flex flex-col justify-center pr-12">
                    <h2 className="text-5xl font-serif text-[#1c1917] mb-6 leading-tight italic" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-xl text-[#57534e] font-light leading-relaxed">
                        {data?.description}
                    </p>

                    <div className="mt-12 flex gap-4">
                        <div className="bg-[#e7e5e4] px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold">Zero Waste</div>
                        <div className="bg-[#e7e5e4] px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold">Community Hub</div>
                    </div>
                </div>

                <div className="w-[60%] flex gap-4 relative">
                    <div className="w-1/2 h-full rounded-l-3xl overflow-hidden mt-12">
                        <img src={data?.img1} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/2 h-full rounded-l-3xl overflow-hidden mb-12">
                        <img src={data?.img2} className="w-full h-full object-cover" />
                    </div>

                    {/* Sticker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fcd34d] text-[#78350f] w-32 h-32 rounded-full flex items-center justify-center font-black text-center text-sm rotate-12 shadow-xl border-4 border-white">
                        Flagship<br />Opened<br />NYC
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
