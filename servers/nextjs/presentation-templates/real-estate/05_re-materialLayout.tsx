import React from 'react'
import * as z from 'zod'


export const layoutId = "re-material"
export const layoutName = "05. Sustainable Materials"
export const layoutDescription = "Material swatch grid."

export const Schema = z.object({
    title: z.string().default("Material Palette"),

    description: z.string().default("Prioritizing low-carbon concrete, recycled steel, and FSC-certified timber."),

    img1: z.string().url().default("https://images.pexels.com/photos/166666/pexels-photo-166666.jpeg"), // Concrete/Wood texture
    img2: z.string().url().default("https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg"), // Wood/Glass
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#e5e7eb] flex"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="w-1/3 bg-[#374151] text-white p-12 flex flex-col justify-center">
                    <h2 className="text-5xl font-bold mb-8 uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <div className="w-12 h-1 bg-[#10b981] mb-8"></div>
                    <p className="text-xl text-gray-300 font-light leading-relaxed">
                        {data?.description}
                    </p>
                </div>

                <div className="w-2/3 grid grid-cols-2">
                    <div className="relative group">
                        <img src={data?.img1} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute bottom-0 left-0 bg-white/90 p-4 font-bold text-[#374151] uppercase tracking-widest text-sm">
                            Recycled Concrete
                        </div>
                    </div>

                    <div className="relative group">
                        <img src={data?.img2} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute bottom-0 left-0 bg-white/90 p-4 font-bold text-[#374151] uppercase tracking-widest text-sm">
                            FSC Timber
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
