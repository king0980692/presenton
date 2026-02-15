import React from 'react'
import * as z from 'zod'


export const layoutId = "organic-team"
export const layoutName = "04. Organic Team"
export const layoutDescription = "Team introduction with circular frames."

export const Schema = z.object({
    page_title: z.string().min(5).max(50).default("Our Green Team").meta({
        description: "Page heading.",
    }),

    members: z.array(z.object({
        name: z.string().default("Name"),
        role: z.string().default("Role"),
        bio: z.string().default("Short bio about dedication to sustainability."),
        image: z.object({
            __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({ description: "URL" }),
            __image_prompt__: z.string().default("portrait").meta({ description: "Prompt" }),
        }).default({ __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", __image_prompt__: "portrait" }).meta({ description: "Photo" }),
    })).min(1).max(3).default([
        { name: "Alex Rivers", role: "Head of Environment", bio: "15 years experience in ecological restoration and policy.", image: { __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", __image_prompt__: "man portrait outdoors" } },
        { name: "Jamie Woods", role: "Community Lead", bio: "Passionate about connecting local communities with green initiatives.", image: { __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", __image_prompt__: "woman portrait outdoors" } },
        { name: "Morgan Field", role: "Tech Innovation", bio: "Developing smart solutions for energy efficiency.", image: { __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", __image_prompt__: "person portrait outdoors" } },
    ]).meta({
        description: "List of team members.",
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
                href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#FFFFFF]"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                {/* Background blobs */}
                <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[40%] bg-[#E8F5E9] rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] bg-[#FFF3E0] rounded-full blur-3xl opacity-50"></div>

                <div className="relative z-10 p-12 flex flex-col items-center h-full">
                    <h2 className="text-4xl font-bold mb-16 text-[#1B5E20]" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.page_title || "Our Green Team"}
                    </h2>

                    <div className="grid grid-cols-3 gap-12 w-full max-w-6xl">
                        {(data?.members || []).map((member, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center bg-white/80 p-6 rounded-2xl shadow-sm border border-[#F1F8E9]">
                                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-[#C8E6C9] p-1">
                                    <div className="w-full h-full rounded-full overflow-hidden">
                                        {member.image?.__image_url__ && (
                                            <img
                                                src={member.image.__image_url__}
                                                alt={member.image.__image_prompt__}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-[#2E7D32] mb-1" style={{ fontFamily: "'Merriweather', serif" }}>{member.name}</h3>
                                <p className="text-sm font-semibold text-[#FF9800] uppercase tracking-wider mb-3">{member.role}</p>
                                <p className="text-[#546E7A] leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
