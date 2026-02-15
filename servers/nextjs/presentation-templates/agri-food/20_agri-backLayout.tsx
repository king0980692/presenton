import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-back"
export const layoutName = "20. Back Cover"
export const layoutDescription = "End contact."

export const Schema = z.object({
    company: z.string().default("TERRA HARVEST"),
    web: z.string().default("terra-harvest.co"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#14532d] p-20 flex flex-col items-center justify-center text-[#f0fdf4]"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="w-24 h-24 bg-[#166534] rounded-full mb-12 flex items-center justify-center text-4xl shadow-xl">
                    🌱
                </div>

                <h2 className="text-4xl font-bold tracking-widest uppercase mb-4 opacity-80" style={{ fontFamily: "'Merriweather', serif" }}>
                    {data?.company}
                </h2>

                <div className="w-32 h-1 bg-[#4ade80] mb-8"></div>

                <div className="text-2xl font-light hover:text-[#4ade80] transition-colors cursor-pointer">
                    {data?.web}
                </div>

                <div className="absolute bottom-10 text-xs opacity-40">
                    Printed on 100% Post-Consumer Waste Recycled Paper.
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
