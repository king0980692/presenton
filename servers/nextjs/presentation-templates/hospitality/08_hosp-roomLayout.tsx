import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-room"
export const layoutName = "08. Smart Room"
export const layoutDescription = "Bedroom photo with icons."

export const Schema = z.object({
    title: z.string().default("Intelligent Comfort"),

    features: z.array(z.string()).min(3).max(3).default([
        "Auto-Dimming",
        "Smart Thermostat",
        "Motion Sensors",
    ]),
    img: z.string().url().default("https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"), // Bedroom
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-black text-white"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <img src={data?.img} className="w-full h-full object-cover opacity-60" />

                <div className="absolute top-20 left-20 bg-black/60 backdrop-blur-md p-12 max-w-md border-l-2 border-[#d6d3d1]">
                    <h2 className="text-4xl mb-8 font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>

                    <ul className="space-y-4">
                        {(data?.features || []).map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-4 text-lg font-light">
                                <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span>
                                {feat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
