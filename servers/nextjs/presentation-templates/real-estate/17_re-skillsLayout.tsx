import React from 'react'
import * as z from 'zod'


export const layoutId = "re-skills"
export const layoutName = "17. Skills Training"
export const layoutDescription = "Photo with overlay text."

export const Schema = z.object({
    title: z.string().default("Investing in People"),

    hours: z.string().default("20,000+"),
    desc: z.string().default("Hours of specialized safety and technical training delivered."),

    img: z.string().url().default("https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg"), // Construction workers
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;500;700&family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="absolute inset-0 w-full h-full">
                    <img src={data?.img} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#1f2937]/80"></div>
                </div>

                <div className="relative z-10 p-20 flex flex-col justify-center h-full max-w-2xl">
                    <div className="bg-[#fbbf24] text-[#1f2937] px-4 py-2 font-bold uppercase tracking-widest inline-block w-max mb-6">
                        Employee Development
                    </div>

                    <h2 className="text-6xl font-bold uppercase text-white mb-8" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="flex  items-center gap-6">
                        <div className="text-6xl font-black text-white">{data?.hours}</div>
                        <div className="text-gray-300 max-w-xs">{data?.desc}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
