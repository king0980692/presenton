import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-social"
export const layoutName = "19. Social Impact"
export const layoutDescription = "Community investment overview."

export const Schema = z.object({
    title: z.string().default("Community Investment"),

    total_investment: z.string().default("$2.5 Million"),
    volunteer_hours: z.string().default("5,000+ Hours"),

    projects: z.array(z.object({
        name: z.string().default("Project Name"),
        desc: z.string().default("Description"),
        image: z.string().url().default("https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg"),
    })).min(3).max(3).default([
        { name: "STEM Education", desc: "Supporting 50 schools with coding kits.", image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg" },
        { name: "Local Reforestation", desc: "Planted 10,000 trees in urban areas.", image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg" },
        { name: "Food Bank Support", desc: "Provided 100k meals to families.", image: "https://images.pexels.com/photos/6994963/pexels-photo-6994963.jpeg" },
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
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="h-[40%] bg-[#0052CC] text-white p-20 flex justify-between items-center">
                    <div>
                        <h2 className="text-5xl font-bold mb-2">{data?.title}</h2>
                        <p className="opacity-80 text-xl">Creating shared value for our communities.</p>
                    </div>
                    <div className="text-right">
                        <div className="text-6xl font-bold">{data?.total_investment}</div>
                        <div className="text-sm font-bold uppercase tracking-wider mb-4 opacity-70">Invested in 2023</div>
                        <div className="text-3xl font-bold text-[#FFAB00]">{data?.volunteer_hours}</div>
                    </div>
                </div>

                <div className="h-[60%] p-16 flex gap-10 -mt-20">
                    {(data?.projects || []).map((proj, idx) => (
                        <div key={idx} className="flex-1 bg-white shadow-xl rounded overflow-hidden flex flex-col group">
                            <div className="h-48 overflow-hidden bg-gray-200">
                                <img src={proj.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-[#172B4D] mb-2">{proj.name}</h3>
                                <p className="text-[#5E6C84]">{proj.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
