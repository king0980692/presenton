import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-letter"
export const layoutName = "02. Welcome Message"
export const layoutDescription = "Text with signature."

export const Schema = z.object({
    title: z.string().default("A Warm Welcome"),

    p1: z.string().default("Travel has the power to transform—not just the traveler, but the communities they visit. We believe in a hospitality that heals."),
    p2: z.string().default("This year, we eliminated single-use plastics across 90% of our properties."),

    name: z.string().default("Elena V."),
    role: z.string().default("Founder & CEO"),
    avatar: z.string().url().default("https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&family=Great+Vibes&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fffbeb] flex"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="w-[40%] relative p-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#e7e5e4] m-12 rounded-t-[100px] overflow-hidden">
                        <img src={data?.avatar} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="w-[60%] p-20 flex flex-col justify-center">
                    <h2 className="text-6xl text-[#451a03] mb-12 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="text-xl text-[#78350f] leading-relaxed space-y-8 font-light">
                        <p>{data?.p1}</p>
                        <p className="font-normal italic border-l-2 border-[#d97706] pl-6 text-[#92400e]">
                            "{data?.p2}"
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="text-4xl text-[#ca8a04]" style={{ fontFamily: "'Great Vibes', cursive" }}>{data?.name}</div>
                        <div className="text-xs uppercase tracking-widest text-[#a16207] mt-2">{data?.role}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
