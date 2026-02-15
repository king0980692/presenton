import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-transport"
export const layoutName = "14. Green Logistics"
export const layoutDescription = "Truck illustration."

export const Schema = z.object({
    title: z.string().default("Farm to Fork"),

    km: z.string().default("1M km"),
    label: z.string().default("Saved via localized processing"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#f0f9ff] p-20 flex flex-col items-center justify-center"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <h2 className="text-5xl font-bold mb-12 text-[#0c4a6e]" style={{ fontFamily: "'Merriweather', serif" }}>
                    {data?.title}
                </h2>

                <div className="w-full bg-[#e0f2fe] h-4 rounded-full relative mb-12 max-w-4xl">
                    <div className="absolute top-1/2 left-0 w-1/3 h-4 bg-[#0ea5e9] rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-[#0284c7] rounded-full transform -translate-y-1/2 border-4 border-white shadow-lg"></div>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="text-7xl font-black text-[#0284c7]">{data?.km}</div>
                    <div className="text-gray-500 uppercase font-bold max-w-xs">{data?.label}</div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
