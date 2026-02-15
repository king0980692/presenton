import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-train"
export const layoutName = "10. Farmer Training"
export const layoutDescription = "Classroom photo."

export const Schema = z.object({
    title: z.string().default("Knowledge Sharing"),

    farmers: z.string().default("15,000"),
    label: z.string().default("Farmers Trained in AgTech"),

    img: z.string().url().default("https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg"), // Field training
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fafaf9]"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="absolute top-10 right-10 w-2/3 h-[80%] rounded-l-full overflow-hidden shadow-2xl">
                    <img src={data?.img} className="w-full h-full object-cover" />
                </div>

                <div className="absolute bottom-10 left-10 bg-white p-12 rounded-tr-[50px] shadow-xl max-w-lg border-l-8 border-[#65a30d]">
                    <h2 className="text-4xl font-bold mb-6 text-[#1c1917]" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="flex items-center gap-6">
                        <div className="text-5xl font-black text-[#65a30d]">{data?.farmers}</div>
                        <div className="text-sm font-bold uppercase text-gray-500 max-w-[150px]">{data?.label}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
