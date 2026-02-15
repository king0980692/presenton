import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-team"
export const layoutName = "04. Tech R&D Team"
export const layoutDescription = "Grid of team cards with tech styling."

export const Schema = z.object({
    heading: z.string().default("Core_Unit_Personnel"),

    team: z.array(z.object({
        name: z.string().default("Unit Name"),
        role: z.string().default("Function"),
        level: z.string().default("LVL 5"),
        image: z.object({
            __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({ description: "URL" }),
        }).default({ __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" }),
    })).min(4).max(4).default([
        { name: "Unit Alpha", role: "AI Architecture", level: "LVL 9" },
        { name: "Unit Beta", role: "Hardware Ops", level: "LVL 8" },
        { name: "Unit Gamma", role: "Network Sec", level: "LVL 7" },
        { name: "Unit Delta", role: "Data Science", level: "LVL 9" },
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
                href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0F172A] text-white p-12"
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                <div className="flex justify-between items-end mb-12 border-b border-[#00E5FF] pb-4">
                    <h1 className="text-4xl font-bold">{data?.heading}</h1>
                    <span className="text-xs text-[#00E5FF] animate-pulse">Scanning personnel database...</span>
                </div>

                <div className="grid grid-cols-4 gap-8">
                    {(data?.team || []).map((member, idx) => (
                        <div key={idx} className="bg-[#1E293B] border border-gray-700 p-2 flex flex-col group hover:border-[#F59E0B] transition-colors">
                            <div className="w-full bg-[#0B0F19] aspect-square mb-4 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                {member.image?.__image_url__ && (
                                    <img
                                        src={member.image.__image_url__}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                )}
                                {/* Overlay scanline */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-2 w-full top-0 animate-[scan_2s_infinite_linear]"></div>
                            </div>

                            <div className="p-2 border-t border-dashed border-gray-600">
                                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>{member.role}</span>
                                    <span className="text-[#F59E0B]">{member.level}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
