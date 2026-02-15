import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-food"
export const layoutName = "05. Farm to Table"
export const layoutDescription = "Food photography."

export const Schema = z.object({
    title: z.string().default("Farm to Table"),

    stat: z.string().default("80%"),
    label: z.string().default("Ingredients Sourced Locally"),

    img: z.string().url().default("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"), // Healthy food
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white text-[#292524]"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="absolute right-0 top-0 w-[60%] h-full">
                    <img src={data?.img} className="w-full h-full object-cover" />
                </div>

                <div className="absolute left-0 top-0 w-[50%] h-full bg-[#f5f5f4] flex flex-col justify-center p-20 shadow-[20px_0_50px_rgba(0,0,0,0.1)]">
                    <h2 className="text-6xl mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>

                    <p className="text-xl font-light italic mb-12 text-gray-600">
                        We partner with local farmers to bring the freshest, seasonal flavors to your plate while supporting the local economy.
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="text-7xl font-light text-[#a8a29e]">{data?.stat}</div>
                        <div className="text-sm tracking-widest uppercase font-bold text-[#57534e] max-w-[120px]">{data?.label}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
