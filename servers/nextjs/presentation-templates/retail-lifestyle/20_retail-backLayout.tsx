import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-back"
export const layoutName = "20. Back Cover"
export const layoutDescription = "Social handles and QR."

export const Schema = z.object({
    brand: z.string().default("URBAN thread."),
    cta: z.string().default("Join the Movement"),
    handle: z.string().default("@urbanthread"),

    web: z.string().default("urbanthread.com"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#c2410c] text-[#fef3c7] flex flex-col items-center justify-center p-20"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="text-2xl font-bold tracking-widest uppercase mb-12">
                    {data?.brand}
                </div>

                <h2 className="text-7xl font-serif italic mb-12 text-center leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    {data?.cta}
                </h2>

                <div className="w-48 h-48 bg-white rounded-3xl p-4 mb-12 shadow-2xl transform rotate-3 flex items-center justify-center">
                    <div className="w-full h-full border-4 border-[#c2410c] border-dashed rounded-xl flex items-center justify-center">
                        <span className="text-[#c2410c] font-bold text-xl">SCAN ME</span>
                    </div>
                </div>

                <div className="flex gap-12 font-bold text-2xl">
                    <div className="opacity-80 hover:opacity-100 cursor-pointer">{data?.handle}</div>
                    <div className="opacity-80 hover:opacity-100 cursor-pointer">{data?.web}</div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
