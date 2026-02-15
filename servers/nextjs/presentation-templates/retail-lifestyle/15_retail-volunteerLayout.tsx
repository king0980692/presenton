import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-volunteer"
export const layoutName = "15. Volunteering"
export const layoutDescription = "Scribble effect with photos."

export const Schema = z.object({
    title: z.string().default("Giving Back Days"),

    hours: z.string().default("5,000+"),
    label: z.string().default("Employee Volunteer Hours"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#ffedd5] p-16"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="flex h-full items-center">
                    <div className="w-1/2 relative">
                        <div className="w-80 h-80 bg-white p-4 shadow-xl transform -rotate-6 z-10 relative">
                            <img src="https://images.pexels.com/photos/6348105/pexels-photo-6348105.jpeg" className="w-full h-full object-cover grayscale" />
                            {/* Tape */}
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#fb923c]/50 rotate-2"></div>
                        </div>
                        <div className="absolute top-10 left-40 w-80 h-80 bg-white p-4 shadow-xl transform rotate-12 z-0">
                            <img src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg" className="w-full h-full object-cover grayscale" />
                            {/* Tape */}
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#fb923c]/50 -rotate-2"></div>
                        </div>
                    </div>

                    <div className="w-1/2 pl-12 text-[#9a3412]">
                        <h2 className="text-5xl font-serif mb-8" style={{ fontFamily: "'DM Serif Display', serif" }}>
                            {data?.title}
                        </h2>

                        <div className="text-8xl font-black mb-4 scribble-underline decoration-[#fb923c]">
                            {data?.hours}
                        </div>
                        <div className="text-2xl font-bold">{data?.label}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
