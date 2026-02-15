import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-inclusion"
export const layoutName = "14. Inclusive Workplace"
export const layoutDescription = "Photo grid of diverse team."

export const Schema = z.object({
    title: z.string().default("Everyone is Welcome"),

    stat: z.string().default("50%"),
    label: z.string().default("BIPOC Representation in HQ"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#a855f7] text-white"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="absolute inset-0 grid grid-cols-4 opacity-30">
                    <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" className="w-full h-full object-cover grayscale" />
                    <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg" className="w-full h-full object-cover grayscale" />
                    <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" className="w-full h-full object-cover grayscale" />
                    <img src="https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg" className="w-full h-full object-cover grayscale" />
                </div>

                <div className="absolute inset-0 bg-[#581c87]/60"></div>

                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center p-20">
                    <h2 className="text-6xl font-serif italic mb-12" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="w-[500px] h-[300px] bg-white text-[#581c87] rounded-[50px] flex flex-col justify-center items-center shadow-2xl rotate-3">
                        <div className="text-9xl font-black mb-2">{data?.stat}</div>
                        <div className="text-xl font-bold uppercase tracking-widest">{data?.label}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
