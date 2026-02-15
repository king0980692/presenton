import React from 'react'
import * as z from 'zod'


export const layoutId = "health-cover"
export const layoutName = "01. Healthcare Cover"
export const layoutDescription = "Clean, teal-themed cover."

export const Schema = z.object({
    year: z.string().default("2024"),
    title: z.string().default("Annual Impact Report"),
    subtitle: z.string().default("Advancing Health for Everyone, Everywhere."),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("doctor holding hands with patient").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg", __image_prompt__: "doctor holding hands with patient" }),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="flex h-full">
                    {/* Left Image Side with Curve */}
                    <div className="w-[65%] relative h-full">
                        {data?.bg_image?.__image_url__ && (
                            <img
                                src={data.bg_image.__image_url__}
                                className="w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute inset-0 bg-teal-900/20 mix-blend-multiply"></div>

                        {/* Curve SVG Overlay (White) */}
                        <svg className="absolute top-0 right-0 h-full w-32 text-white fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M100 0 C 20 40 80 100 0 100 L 100 100 Z" />
                        </svg>
                    </div>

                    {/* Right Content Side */}
                    <div className="w-[35%] bg-white flex flex-col justify-center pr-16 pl-4 z-10">
                        <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-8 shadow-lg">
                            +
                        </div>

                        <div className="text-teal-600 font-bold tracking-widest uppercase mb-4 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            {data?.year} Report
                        </div>

                        <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            {data?.title}
                        </h1>

                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            {data?.subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
