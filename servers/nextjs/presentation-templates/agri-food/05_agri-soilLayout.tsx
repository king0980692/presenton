import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-soil"
export const layoutName = "05. Soil Health"
export const layoutDescription = "Cross section of soil."

export const Schema = z.object({
    title: z.string().default("Beneath the Surface"),

    carbon: z.string().default("10k Tons"),
    label: z.string().default("Carbon Sequestered in 2024"),

    img: z.string().url().default("https://images.pexels.com/photos/103135/pexels-photo-103135.jpeg"), // Soil/sprout
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#3f2c22] text-[#fff7ed]"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="absolute inset-0 w-full h-full">
                    <img src={data?.img} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3f2c22] to-transparent"></div>
                </div>

                <div className="relative z-10 p-20 flex flex-col justify-end h-full">
                    <div className="bg-[#5d4037]/80 backdrop-blur p-12 rounded-t-3xl border-t-4 border-[#a3e635] w-fit">
                        <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
                            {data?.title}
                        </h2>

                        <div className="flex items-end gap-6 mt-8">
                            <div className="text-7xl font-bold text-[#a3e635]">{data?.carbon}</div>
                            <div className="text-xl pb-4 font-light">{data?.label}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
