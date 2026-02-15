import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-map"
export const layoutName = "03. Destinations"
export const layoutDescription = "Photo grid locations."

export const Schema = z.object({
    title: z.string().default("Our Sanctuaries"),

    loc1: z.string().default("Bali, Indonesia"),
    loc2: z.string().default("Kyoto, Japan"),
    loc3: z.string().default("Tulum, Mexico"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fff7ed] p-20 flex flex-col items-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-5xl text-[#431407] mb-16 italic text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-8 w-full h-[400px]">
                    <div className="flex-1 relative group overflow-hidden rounded-t-[100px] hover:flex-[1.5] transition-all duration-700">
                        <img src="https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 text-center w-full p-8 bg-gradient-to-t from-black/60 to-transparent">
                            <div className="text-white font-serif text-2xl italic">{data?.loc1}</div>
                        </div>
                    </div>

                    <div className="flex-1 relative group overflow-hidden rounded-t-[100px] hover:flex-[1.5] transition-all duration-700">
                        <img src="https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 text-center w-full p-8 bg-gradient-to-t from-black/60 to-transparent">
                            <div className="text-white font-serif text-2xl italic">{data?.loc2}</div>
                        </div>
                    </div>

                    <div className="flex-1 relative group overflow-hidden rounded-t-[100px] hover:flex-[1.5] transition-all duration-700">
                        <img src="https://images.pexels.com/photos/2403209/pexels-photo-2403209.jpeg" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 text-center w-full p-8 bg-gradient-to-t from-black/60 to-transparent">
                            <div className="text-white font-serif text-2xl italic">{data?.loc3}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
