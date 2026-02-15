import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-fertilizer"
export const layoutName = "08. Natural Fertilizer"
export const layoutDescription = "Comparison bar."

export const Schema = z.object({
    title: z.string().default("Organic Inputs"),

    stat: z.string().default("90%"),
    label: z.string().default("Replacement of Synthetic N-Fertilizers"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#e7e5e4] p-20 flex items-center justify-center"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="bg-white p-20 rounded-[40px] shadow-xl w-full max-w-4xl flex items-center gap-16">
                    <div className="w-1/2">
                        <h2 className="text-5xl font-bold mb-8 text-[#44403c] leading-tight" style={{ fontFamily: "'Merriweather', serif" }}>
                            {data?.title}
                        </h2>
                        <p className="text-gray-500">
                            Shifting to compost and manure to build soil organic matter and reduce runoff.
                        </p>
                    </div>

                    <div className="w-1/2 bg-[#f5f5f4] p-12 rounded-3xl text-center">
                        <div className="text-7xl font-black text-[#65a30d] mb-4">{data?.stat}</div>
                        <div className="text-sm font-bold uppercase text-gray-500 leading-relaxed border-t border-gray-300 pt-4">
                            {data?.label}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
