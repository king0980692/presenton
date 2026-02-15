import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-bio"
export const layoutName = "07. Biodiversity"
export const layoutDescription = "Bee icon."

export const Schema = z.object({
    title: z.string().default("Pollinator Refuge"),

    acres: z.string().default("2,000 Acres"),
    label: z.string().default("Wildflower Corridors"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fef08a] flex"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="w-[40%] bg-[#ca8a04] p-20 flex flex-col justify-center text-[#fefce8]">
                    <div className="text-8xl mb-8">🐝</div>
                    <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>
                </div>

                <div className="w-[60%] p-20 flex flex-col justify-center bg-[#fef08a]">
                    <p className="text-2xl text-[#854d0e] mb-12 italic max-w-md leading-relaxed">
                        We are creating highways for bees and butterflies by planting native wildflowers along our crop borders.
                    </p>

                    <div className="border-l-8 border-[#a16207] pl-8">
                        <div className="text-6xl font-black text-[#a16207]">{data?.acres}</div>
                        <div className="text-xl font-bold text-[#854d0e] uppercase mt-2">{data?.label}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
