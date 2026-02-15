import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-inclusion"
export const layoutName = "09. Financial Inclusion"
export const layoutDescription = "Photo with stats overlay."

export const Schema = z.object({
    title: z.string().default("Empowering Communities"),

    loans: z.string().default("$500M"),
    sme_support: z.string().default("50,000+"),

    bg_image: z.string().url().default("https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-black text-white"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <img src={data?.bg_image} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

                <div className="relative z-10 w-1/2 h-full flex flex-col justify-center px-20">
                    <h2 className="text-5xl font-serif italic mb-12 text-[#d4af37]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="mb-10">
                        <div className="text-7xl font-bold mb-2">{data?.loans}</div>
                        <div className="text-lg uppercase tracking-widest font-light">In Micro-loans Distributed</div>
                    </div>

                    <div>
                        <div className="text-7xl font-bold mb-2">{data?.sme_support}</div>
                        <div className="text-lg uppercase tracking-widest font-light">Small Businesses Supported</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
