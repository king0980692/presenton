import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-fairtrade"
export const layoutName = "09. Fair Trade"
export const layoutDescription = "Hands graphic."

export const Schema = z.object({
    title: z.string().default("Fair & Equitable"),

    premium: z.string().default("$2M USD"),
    label: z.string().default("Fair Trade Premiums Paid"),

    img: z.string().url().default("https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg"), // Farmer hands
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white flex"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="w-1/2 h-full">
                    <img src={data?.img} className="w-full h-full object-cover" />
                </div>

                <div className="w-1/2 p-20 flex flex-col justify-center bg-[#57534e] text-white">
                    <div className="w-20 h-2 bg-[#d6d3d1] mb-8"></div>

                    <h2 className="text-5xl font-bold mb-12" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="mb-8">
                        <div className="text-6xl font-bold text-[#fcd34d] mb-2">{data?.premium}</div>
                        <div className="text-lg opacity-80">{data?.label}</div>
                    </div>

                    <p className="text-sm opacity-60 leading-relaxed max-w-sm">
                        Premiums are invested directly into community projects chosen by farmer cooperatives, including schools and clinics.
                    </p>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
