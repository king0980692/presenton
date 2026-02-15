import React from 'react'
import * as z from 'zod'


export const layoutId = "organic-letter"
export const layoutName = "03. Organic Leader Letter"
export const layoutDescription = "Executive letter with natural framing."

export const Schema = z.object({
    title: z.string().min(5).max(70).default("Message from Leadership").meta({
        description: "Main heading.",
    }),

    content: z.string().min(10).max(1500).default("We stand at a pivotal moment in our company's history. Recognizing the fragile state of our planet, we have committed to...",).meta({
        description: "Main body text.",
    }),

    leader_name: z.string().default("Sarah Green").meta({ description: "Name" }),
    leader_title: z.string().default("Chief Sustainability Officer").meta({ description: "Job title" }),

    leader_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({ description: "Leader photo URL" }),
        __image_prompt__: z.string().min(5).max(50).default("professional woman outdoors nature background").meta({ description: "Leader photo prompt" }),
    }).default({
        __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
        __image_prompt__: "professional woman outdoors nature background"
    }).meta({ description: "Leader portrait" }),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F3F4F1] flex"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                {/* Image Column */}
                <div className="w-[35%] relative">
                    <div className="absolute inset-4 rounded-[30px] overflow-hidden shadow-lg">
                        {data?.leader_image?.__image_url__ && (
                            <img
                                src={data.leader_image.__image_url__}
                                alt={data.leader_image.__image_prompt__}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>

                {/* Text Column */}
                <div className="w-[65%] p-16 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-8 text-[#1B5E20]" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title || "Message from Leadership"}
                    </h2>

                    <div className="bg-white p-8 rounded-tr-[40px] rounded-bl-[40px] shadow-sm mb-6">
                        <p className="text-lg leading-relaxed text-[#546E7A] italic">
                            "{data?.content || "We stand at a pivotal moment..."}"
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-1 bg-[#81C784]"></div>
                        <div>
                            <h3 className="text-xl font-bold text-[#263238]">{data?.leader_name || "Sarah Green"}</h3>
                            <p className="text-sm text-[#78909C] uppercase tracking-wide">{data?.leader_title || "Chief Sustainability Officer"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
