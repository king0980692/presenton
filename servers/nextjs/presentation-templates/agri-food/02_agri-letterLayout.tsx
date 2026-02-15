import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-letter"
export const layoutName = "02. CEO Letter"
export const layoutDescription = "Text with leaf graphic."

export const Schema = z.object({
    title: z.string().default("Roots of Change"),

    p1: z.string().default("Agriculture is at the crossroads of the climate crisis. We have the unique ability to not just reduce emissions, but to pull carbon back into the soil."),
    p2: z.string().default("This year, we transitioned 50,000 acres to regenerative practices."),

    name: z.string().default("Dr. Maria Soil"),
    role: z.string().default("Chief Sustainability Officer"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fafaf9] p-20 flex gap-12"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="w-2/3 pr-12 border-r border-[#e7e5e4]">
                    <h2 className="text-6xl text-[#14532d] mb-12 font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="text-xl text-[#57534e] space-y-8 leading-relaxed">
                        <p>{data?.p1}</p>
                        <div className="bg-[#ecfccb] p-6 rounded-tl-3xl rounded-br-3xl text-[#365314] font-serif italic">
                            "{data?.p2}"
                        </div>
                    </div>

                    <div className="mt-12 flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#ca8a04] rounded-full flex items-center justify-center text-white text-2xl font-serif">MS</div>
                        <div>
                            <div className="font-bold text-[#1c1917]">{data?.name}</div>
                            <div className="text-sm text-[#78716c] uppercase">{data?.role}</div>
                        </div>
                    </div>
                </div>

                <div className="w-1/3 flex flex-col justify-center items-center opacity-20">
                    {/* Leaf Icon Placeholder using text */}
                    <div className="text-[300px] leading-none text-[#65a30d]">🍃</div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
