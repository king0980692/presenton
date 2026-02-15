import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-culture"
export const layoutName = "11. Local Culture"
export const layoutDescription = "Photo with text overlay."

export const Schema = z.object({
    title: z.string().default("Preserving Heritage"),

    description: z.string().default("We collaborate with local artisans to showcase traditional crafts in our design."),
    img: z.string().url().default("https://images.pexels.com/photos/5998132/pexels-photo-5998132.jpeg"), // Artisan
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#78350f] text-white"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="absolute left-0 top-0 w-[60%] h-full">
                    <img src={data?.img} className="w-full h-full object-cover sepia-[.3]" />
                </div>

                <div className="absolute right-0 top-0 w-[40%] h-full bg-[#78350f] flex flex-col justify-center p-20 shadow-[-20px_0_50px_rgba(0,0,0,0.3)]">
                    <div className="border-t-2 border-[#d97706] pt-8 mb-8 w-16"></div>

                    <h2 className="text-5xl mb-12 italic leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>

                    <p className="text-xl font-light text-[#feb2b2] leading-relaxed">
                        {data?.description}
                    </p>

                    <div className="mt-12 opacity-50 text-sm tracking-widest uppercase">
                        Community Impact
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
