import React from 'react'
import * as z from 'zod'


export const layoutId = "re-housing"
export const layoutName = "08. Social Housing"
export const layoutDescription = "Photo with stats overlay."

export const Schema = z.object({
    title: z.string().default("Affordable Living"),

    units: z.string().default("500+"),
    label: z.string().default("Affordable Units Delivered"),

    img: z.string().url().default("https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg"), // Apartment block
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
                <div className="absolute inset-0 w-3/4 h-full bg-gray-200 clip-path-slant">
                    <img src={data?.img} className="w-full h-full object-cover grayscale opacity-80" />
                    <div className="absolute inset-0 bg-[#374151] opacity-20"></div>
                </div>

                <div className="absolute right-0 top-0 w-1/3 h-full bg-white flex flex-col justify-center p-12 shadow-[-20px_0_50px_rgba(0,0,0,0.1)]">
                    <h2 className="text-5xl font-bold uppercase mb-12 leading-tight text-[#1f2937]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="mb-8">
                        <div className="text-7xl font-bold text-[#10b981] mb-2">{data?.units}</div>
                        <div className="text-xs uppercase tracking-widest font-bold text-gray-500">{data?.label}</div>
                    </div>

                    <p className="text-gray-500 leading-relaxed font-light">
                        We believe in inclusive cities. Our mixed-income developments ensure vibrant, diverse communities.
                    </p>
                </div>

                {/* CSS Clip path simulation */}
                <style dangerouslySetInnerHTML={{
                    __html: `
            .clip-path-slant {
                clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
            }
        `}} />
            </div>
        </>
    )
}

export default DynamicSlideLayout
