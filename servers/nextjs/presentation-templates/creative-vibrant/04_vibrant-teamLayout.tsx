import React from 'react'
import * as z from 'zod'


export const layoutId = "vibrant-team"
export const layoutName = "04. Vibrant Crew"
export const layoutDescription = "Polaroid style team page."

export const Schema = z.object({
    title: z.string().default("Meet the Misfits"),

    team: z.array(z.object({
        name: z.string().default("Name"),
        role: z.string().default("Superpower"),
        image: z.object({
            __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({ description: "URL" }),
        }).default({ __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" }),
    })).min(3).max(3).default([
        { name: "Leo", role: "Design Wizard" },
        { name: "Zoe", role: "Code Ninja" },
        { name: "Max", role: "Hype Beast" },
    ]),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&family=Permanent+Marker&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#00B894]" // Mint Green
                style={{
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="p-16 h-full flex flex-col items-center">
                    <h2 className="text-6xl font-black text-white mb-16 text-shadow-black stroke-black" style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0px black' }}>
                        {data?.title}
                    </h2>

                    <div className="flex justify-center gap-12 w-full">
                        {(data?.team || []).map((member, idx) => {
                            const rotation = (idx % 2 === 0) ? 'rotate-[-3deg]' : 'rotate-[3deg]';

                            return (
                                <div key={idx} className={`bg-white p-4 pb-8 shadow-[10px_10px_20px_rgba(0,0,0,0.3)] transform ${rotation} hover:scale-105 transition-transform duration-300 hover:rotate-0 w-80`}>
                                    {/* Tape Effect */}
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white/50 rotate-1 shadow-sm border border-white/20"></div>

                                    <div className="w-full aspect-square bg-gray-200 mb-4 overflow-hidden filter sepia-[0.3]">
                                        {member.image?.__image_url__ && (
                                            <img
                                                src={member.image.__image_url__}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>

                                    <div className="text-center font-handwriting">
                                        <h3 className="text-2xl font-bold text-black" style={{ fontFamily: "'Permanent Marker', cursive" }}>{member.name}</h3>
                                        <p className="text-gray-500 font-bold text-sm uppercase mt-1">{member.role}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
