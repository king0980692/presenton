import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-product"
export const layoutName = "11. Healthy Products"
export const layoutDescription = "Product showcase."

export const Schema = z.object({
    title: z.string().default("Nourishment"),

    sugar: z.string().default("-15%"),
    label: z.string().default("Sugar Reduction Across Portfolio"),

    img: z.string().url().default("https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"), // Healthy bowl
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fefce8] p-20 flex gap-12"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="w-[45%] flex flex-col justify-center">
                    <h2 className="text-5xl font-bold mb-8 text-[#a16207]" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-xl text-[#713f12] mb-12">
                        We are reformulating our most popular products to be healthier for people and the planet.
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#fde047]">
                        <div className="text-6xl font-black text-[#65a30d] mb-2">{data?.sugar}</div>
                        <div className="uppercase tracking-wide font-bold text-gray-400">{data?.label}</div>
                    </div>
                </div>

                <div className="w-[55%] relative">
                    <div className="absolute inset-0 bg-[#fde047] rounded-[60px] transform rotate-3 z-0"></div>
                    <img src={data?.img} className="relative z-10 w-full h-full object-cover rounded-[50px] shadow-2xl transform -rotate-2" />
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
