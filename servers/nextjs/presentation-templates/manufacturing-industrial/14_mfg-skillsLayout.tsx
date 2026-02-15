import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-skills"
export const layoutName = "14. Skills Matrix"
export const layoutDescription = "Employee skill levels."

export const Schema = z.object({
    title: z.string().default("Workforce Capability"),

    skills: z.array(z.object({
        role: z.string().default("Role"),
        level: z.number().default(3), // 1-5 dots
    })).min(5).max(5).default([
        { role: "Advanced Robotics Operation", level: 4 },
        { role: "Lean Six Sigma Methodology", level: 3 },
        { role: "Data Analytics & AI", level: 2 },
        { role: "Safety Leadership", level: 5 },
        { role: "Cross-Functional Management", level: 4 },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white text-[#1A1A1A] p-16"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold uppercase mb-16" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="max-w-3xl mx-auto border-t border-gray-300">
                    {(data?.skills || []).map((skill, idx) => (
                        <div key={idx} className="flex justify-between items-center py-6 border-b border-gray-300">
                            <div className="text-2xl font-bold uppercase">{skill.role}</div>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((dot) => (
                                    <div
                                        key={dot}
                                        className={`w-6 h-6 rounded-full border-2 border-[#1A1A1A] ${dot <= skill.level ? 'bg-[#FFD700]' : 'bg-transparent'}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
