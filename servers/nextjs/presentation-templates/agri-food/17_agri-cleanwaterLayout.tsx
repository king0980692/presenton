import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-cleanwater"
export const layoutName = "17. Clean Water"
export const layoutDescription = "Photo card."

export const Schema = z.object({
    title: z.string().default("Clean Water Access"),

    people: z.string().default("10,000 People"),
    label: z.string().default("Provided with new wells"),

    img: z.string().url().default("https://images.pexels.com/photos/13565011/pexels-photo-13565011.jpeg"), // Water well
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0e7490]"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <img src={data?.img} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mb-8 backdrop-blur">
                        💧
                    </div>

                    <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>

                    <p className="text-2xl font-light max-w-2xl mb-12">
                        Clean water is the foundation of healthy farming communities.
                    </p>

                    <div className="bg-white text-[#0e7490] px-12 py-6 rounded-full shadow-lg">
                        <span className="font-black text-3xl mr-4">{data?.people}</span>
                        <span className="uppercase font-bold text-sm tracking-wide">{data?.label}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
