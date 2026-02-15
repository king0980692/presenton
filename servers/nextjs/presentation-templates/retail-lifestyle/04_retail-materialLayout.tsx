import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-material"
export const layoutName = "04. Material Innovation"
export const layoutDescription = "Collage for fabric tech."

export const Schema = z.object({
    title: z.string().default("Material Matters"),

    description: z.string().default("We're phasing out virgin polyester. Meet our new sustainable heroes."),

    tech1: z.string().default("Mushroom Leather (Mylo)"),
    tech2: z.string().default("Recycled Ocean Plastic"),
    tech3: z.string().default("Organic Cotton"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Mulish:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#ecfccb] p-16 flex items-center"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="w-1/2 pr-12">
                    <h2 className="text-6xl font-serif text-[#3f6212] mb-6 leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-xl text-[#365314] font-medium mb-12">
                        {data?.description}
                    </p>

                    <ul className="space-y-6">
                        <li className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-[#84cc16] text-white rounded-full font-bold">1</span>
                            <span className="text-lg font-bold text-[#3f6212]">{data?.tech1}</span>
                        </li>
                        <li className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-[#84cc16] text-white rounded-full font-bold">2</span>
                            <span className="text-lg font-bold text-[#3f6212]">{data?.tech2}</span>
                        </li>
                        <li className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-[#84cc16] text-white rounded-full font-bold">3</span>
                            <span className="text-lg font-bold text-[#3f6212]">{data?.tech3}</span>
                        </li>
                    </ul>
                </div>

                <div className="w-1/2 relative h-[500px]">
                    {/* Collage */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white p-2 shadow-lg transform rotate-6 z-10 rounded-xl">
                        <img src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg" className="w-full h-full object-cover rounded-lg" />
                        <div className="text-center text-xs mt-1 font-bold text-gray-400">Texture detail</div>
                    </div>

                    <div className="absolute bottom-10 left-10 w-64 h-80 bg-white p-2 shadow-lg transform -rotate-3 z-20 rounded-xl">
                        <img src="https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg" className="w-full h-full object-cover rounded-lg" />
                        <div className="text-center text-xs mt-1 font-bold text-gray-400">Raw fibers</div>
                    </div>

                    {/* Sticker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#bef264] rounded-full flex items-center justify-center text-[#3f6212] font-black text-xs uppercase text-center border-4 border-white shadow-xl z-30">
                        100%<br />Eco<br />Friendly
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
