import React from 'react'
import * as z from 'zod'


export const layoutId = "health-story"
export const layoutName = "06. Patient Success Story"
export const layoutDescription = "Photo and quote for patient story."

export const Schema = z.object({
    quote: z.string().default("Thanks to this new therapy, I have my life back. I can play with my grandchildren again."),
    name: z.string().default("Maria Gonzales"),
    condition: z.string().default("Recovered from Heart Failure"),

    image: z.string().url().default("https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@400;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-teal-800 flex"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                {/* Left Image */}
                <div className="w-1/2 relative h-full">
                    <img src={data?.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-teal-800"></div>
                </div>

                {/* Right Quote */}
                <div className="w-1/2 p-20 flex flex-col justify-center text-white">
                    <div className="text-8xl text-teal-400 opacity-50 font-serif leading-none mb-4">“</div>
                    <p className="text-3xl font-light italic leading-relaxed mb-10">
                        {data?.quote}
                    </p>
                    <div>
                        <div className="text-xl font-bold font-montserrat">{data?.name}</div>
                        <div className="text-teal-300 font-medium uppercase tracking-wide text-sm">{data?.condition}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
