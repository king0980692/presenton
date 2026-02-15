import React from 'react'
import * as z from 'zod'


export const layoutId = "re-community"
export const layoutName = "10. Community Spaces"
export const layoutDescription = "Grid of community amenities."

export const Schema = z.object({
    title: z.string().default("Designing for People"),

    img1: z.string().url().default("https://images.pexels.com/photos/1131109/pexels-photo-1131109.jpeg"), // Park
    img2: z.string().url().default("https://images.pexels.com/photos/2952871/pexels-photo-2952871.jpeg"), // Playground
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16 flex flex-col"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="flex justify-between items-end mb-12 border-b-2 border-gray-100 pb-8">
                    <h2 className="text-5xl font-bold uppercase text-[#1f2937]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <div className="text-right text-gray-500">
                        <div>Public Realm Investment</div>
                        <div className="text-2xl font-bold text-[#10b981]">$50 Million</div>
                    </div>
                </div>

                <div className="flex-1 flex gap-8">
                    <div className="flex-1 relative group overflow-hidden">
                        <img src={data?.img1} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                            <div className="text-white text-2xl font-bold uppercase tracking-widest">Urban Parks</div>
                        </div>
                    </div>

                    <div className="flex-1 relative group overflow-hidden">
                        <img src={data?.img2} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                            <div className="text-white text-2xl font-bold uppercase tracking-widest">Play Spaces</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
