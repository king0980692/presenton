import React from 'react'
import * as z from 'zod'


export const layoutId = "re-vision"
export const layoutName = "19. 2030 Vision"
export const layoutDescription = "Futuristic render."

export const Schema = z.object({
    title: z.string().default("Vision 2030"),
    subtitle: z.string().default("Net Zero Carbon. Zero Waste. 100% Renewable."),

    img: z.string().url().default("https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg"), // Future city
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-black text-white"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <img src={data?.img} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center">
                    <div className="border border-white/30 px-12 py-16 backdrop-blur-sm bg-black/20">
                        <h2 className="text-8xl font-bold uppercase mb-8 tracking-tighter" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            {data?.title}
                        </h2>
                        <div className="w-32 h-2 bg-[#10b981] mx-auto mb-8"></div>
                        <p className="text-3xl font-light tracking-wide uppercase">
                            {data?.subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
