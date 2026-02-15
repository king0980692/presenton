import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-digital"
export const layoutName = "07. Digital Banking"
export const layoutDescription = "Split screen with phone mockup."

export const Schema = z.object({
    title: z.string().default("Digital First Experience"),
    stat_1: z.string().default("4.8M"),
    stat_1_label: z.string().default("Active Mobile Users"),
    stat_2: z.string().default("92%"),
    stat_2_label: z.string().default("Transactions Digital"),

    bg_image: z.string().url().default("https://images.pexels.com/photos/5061346/pexels-photo-5061346.jpeg"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white flex"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                {/* Left Stats */}
                <div className="w-1/2 p-20 flex flex-col justify-center bg-[#064e3b] text-white">
                    <h2 className="text-4xl font-serif italic mb-16 text-[#d4af37]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="space-y-12">
                        <div>
                            <div className="text-7xl font-bold font-serif mb-2">{data?.stat_1}</div>
                            <div className="text-sm uppercase tracking-widest text-[#d4af37] font-bold">{data?.stat_1_label}</div>
                        </div>
                        <div className="w-full h-[1px] bg-white/20"></div>
                        <div>
                            <div className="text-7xl font-bold font-serif mb-2">{data?.stat_2}</div>
                            <div className="text-sm uppercase tracking-widest text-[#d4af37] font-bold">{data?.stat_2_label}</div>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="w-1/2 relative">
                    <img src={data?.bg_image} className="w-full h-full object-cover grayscale mix-blend-multiply opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-transparent -z-10"></div>

                    {/* Phone Mockup (CSS only) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[400px] bg-black rounded-[30px] border-4 border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-white flex flex-col pt-10 px-4">
                            <div className="w-full h-24 bg-[#064e3b] rounded-lg mb-4"></div>
                            <div className="w-full h-8 bg-gray-100 rounded mb-2"></div>
                            <div className="w-2/3 h-8 bg-gray-100 rounded mb-8"></div>
                            <div className="w-full h-20 bg-[#d4af37] rounded-lg opacity-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
