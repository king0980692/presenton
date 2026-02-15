import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-volunteer"
export const layoutName = "17. Giving Back"
export const layoutDescription = "Photo with heart icon."

export const Schema = z.object({
    title: z.string().default("Community Service"),

    hours: z.string().default("5,000+"),
    label: z.string().default("Volunteer Hours"),

    img: z.string().url().default("https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg"), // Beach clean up / volunteering
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="absolute inset-0">
                    <img src={data?.img} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0c4a6e] mix-blend-multiply opacity-40"></div>
                </div>

                <div className="relative z-10 p-20 flex flex-col justify-between h-full text-white">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#0c4a6e] text-3xl">
                        ❤️
                    </div>

                    <div>
                        <h2 className="text-6xl font-serif italic mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {data?.title}
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-bold">{data?.hours}</span>
                            <span className="uppercase tracking-widest text-sm opacity-80">{data?.label}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
