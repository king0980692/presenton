import React from 'react'
import * as z from 'zod'


export const layoutId = "minimal-team"
export const layoutName = "3. Leadership Team"
export const layoutDescription = "Grid layout for team members with photos."

export const Schema = z.object({
    section_title: z.string().min(5).max(50).default("Our Leadership Team").meta({
        description: "Section heading.",
    }),

    team_members: z.array(z.object({
        name: z.string().min(2).max(30).default("Name").meta({ description: "Member name" }),
        role: z.string().min(2).max(50).default("Role").meta({ description: "Member role" }),
        image: z.object({
            __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({ description: "Photo URL" }),
            __image_prompt__: z.string().min(5).max(50).default("professional headshot portrait").meta({ description: "Photo prompt" }),
        }).default({
            __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
            __image_prompt__: "professional headshot portrait"
        }).meta({ description: "Member photo" }),
    })).min(1).max(4).default([
        { name: "Jane Doe", role: "CEO", image: { __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", __image_prompt__: "woman professional headshot smiling" } },
        { name: "John Smith", role: "CTO", image: { __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", __image_prompt__: "man professional headshot glasses" } },
        { name: "Emily Chen", role: "COO", image: { __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", __image_prompt__: "woman professional headshot business attire" } },
        { name: "Michael Wong", role: "CFO", image: { __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", __image_prompt__: "man professional headshot suit" } },
    ]).meta({
        description: "List of team members",
    }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{
                    fontFamily: "var(--heading-font-family, Inter)",
                    backgroundColor: 'var(--card-background-color, #FFFFFF)',
                }}
            >
                <div className="p-10 pb-0">
                    <h2 className="text-3xl font-bold" style={{ color: 'var(--text-heading-color, #111827)' }}>
                        {data?.section_title || "Our Leadership Team"}
                    </h2>
                    <div className="w-20 h-1 bg-black mt-4"></div>
                </div>

                <div className="flex-1 p-10 flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-8 w-full">
                        {(data?.team_members || []).map((member, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-300">
                                    {member.image?.__image_url__ && (
                                        <img
                                            src={member.image.__image_url__}
                                            alt={member.image.__image_prompt__}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold" style={{ color: 'var(--text-heading-color, #111827)' }}>{member.name}</h3>
                                <p className="text-sm font-medium mt-1 uppercase tracking-wide" style={{ color: 'var(--text-body-color, #6B7280)' }}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
