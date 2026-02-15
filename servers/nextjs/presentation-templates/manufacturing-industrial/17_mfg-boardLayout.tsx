import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-board"
export const layoutName = "17. Board Structure"
export const layoutDescription = "Grid of board members with experience tags."

export const Schema = z.object({
    title: z.string().default("Board of Directors"),

    members: z.array(z.object({
        name: z.string().default("Name"),
        role: z.string().default("Role"),
        tag: z.string().default("Expertise"),
    })).min(4).max(6).default([
        { name: "John T. Steel", role: "Chairman", tag: "Industry Veteran" },
        { name: "Dr. Elena Wu", role: "Director", tag: "Sustainability" },
        { name: "Marcus Webb", role: "Indep. Director", tag: "Finance" },
        { name: "Sarah Connor", role: "Director", tag: "Technology" },
        { name: "David Chen", role: "Indep. Director", tag: "Legal" },
        { name: "Robert Key", role: "Director", tag: "Operations" },
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
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#2D2D2D] text-white p-16"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold uppercase mb-16 text-[#FFD700]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="grid grid-cols-3 gap-8">
                    {(data?.members || []).map((mem, idx) => (
                        <div key={idx} className="bg-[#1A1A1A] p-6 border border-gray-600 hover:border-[#FFD700] transition-colors">
                            <div className="w-12 h-1 bg-[#FFD700] mb-4"></div>
                            <h3 className="text-2xl font-bold uppercase mb-1">{mem.name}</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">{mem.role}</p>
                            <span className="bg-gray-800 text-xs px-2 py-1 rounded text-white">{mem.tag}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
