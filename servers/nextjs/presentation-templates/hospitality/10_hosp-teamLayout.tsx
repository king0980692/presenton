import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-team"
export const layoutName = "10. Our People"
export const layoutDescription = "Team photo grid."

export const Schema = z.object({
    title: z.string().default("Exceptional Service"),
    subtitle: z.string().default("Our diverse team is the heart of our hospitality."),

    img1: z.string().url().default("https://images.pexels.com/photos/5940841/pexels-photo-5940841.jpeg"), // Chef
    img2: z.string().url().default("https://images.pexels.com/photos/3386016/pexels-photo-3386016.jpeg"), // Concierge
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fafaf9] p-20 flex"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="w-1/3 pr-12 flex flex-col justify-center">
                    <h2 className="text-5xl text-[#1c1917] mb-8 font-serif italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>
                    <div className="w-12 h-1 bg-[#d6d3d1] mb-8"></div>
                    <p className="text-xl text-[#57534e] font-light">
                        {data?.subtitle}
                    </p>
                </div>

                <div className="w-2/3 grid grid-cols-2 gap-8">
                    <div className="rounded-t-full overflow-hidden h-full shadow-lg">
                        <img src={data?.img1} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="rounded-b-full overflow-hidden h-full shadow-lg mt-12 pb-12">
                        <img src={data?.img2} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
