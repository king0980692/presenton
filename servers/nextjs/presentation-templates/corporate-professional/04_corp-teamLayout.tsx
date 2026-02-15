import React from 'react'
import * as z from 'zod'


export const layoutId = "corp-team"
export const layoutName = "04. Corporate Management"
export const layoutDescription = "Official management team grid."

export const Schema = z.object({
    title: z.string().default("Board of Directors"),

    team: z.array(z.object({
        name: z.string().default("Name"),
        role: z.string().default("Role"),
        image: z.object({
            __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({ description: "URL" }),
        }).default({ __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" }),
    })).min(4).max(4).default([
        { name: "Eleanor Rigby", role: "CEO" },
        { name: "Thomas Anderson", role: "CFO" },
        { name: "Sarah Connor", role: "COO" },
        { name: "John Wick", role: "Legal Counsel" },
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
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0A192F]"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="p-16 h-full flex flex-col items-center">
                    <h2 className="text-4xl font-bold text-white mb-16 relative pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#C5A059]"></div>
                    </h2>

                    <div className="grid grid-cols-4 gap-8 w-full max-w-6xl">
                        {(data?.team || []).map((member, idx) => (
                            <div key={idx} className="bg-white p-1 rounded shadow-lg group hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-full aspect-[3/4] overflow-hidden mb-4 bg-gray-200">
                                    {member.image?.__image_url__ && (
                                        <img
                                            src={member.image.__image_url__}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    )}
                                </div>
                                <div className="text-center pb-4 px-2">
                                    <h3 className="text-xl font-bold text-[#0A192F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {member.name}
                                    </h3>
                                    <p className="text-[#C5A059] text-sm font-bold uppercase tracking-wider mt-1">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
