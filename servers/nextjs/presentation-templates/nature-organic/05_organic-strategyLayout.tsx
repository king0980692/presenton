import React from 'react'
import * as z from 'zod'


export const layoutId = "organic-strategy"
export const layoutName = "05. Organic Strategy Pillars"
export const layoutDescription = "Strategy displayed as growing plants/cards."

export const Schema = z.object({
    main_title: z.string().default("Sustainability Roadmap"),

    pillars: z.array(z.object({
        title: z.string().default("Pillar"),
        description: z.string().default("Strategic goal description."),
        icon: z.object({
            __icon_query__: z.string().default("leaf"),
        }).default({ __icon_query__: "leaf" }).meta({ description: "Icon name" }),
    })).min(3).max(3).default([
        { title: "Preserve Nature", description: "Protecting biodiversity and restoring natural habitats.", icon: { __icon_query__: "tree" } },
        { title: "Empower People", description: "Supporting local farmers and fair trade practices.", icon: { __icon_query__: "users" } },
        { title: "Circular Economy", description: "Designing waste out of our production cycle.", icon: { __icon_query__: "recycle" } },
    ]).meta({ description: "3 Strategic pillars" }),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#FDFBF7]"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="p-12 h-full flex flex-col">
                    <h2 className="text-4xl font-bold mb-10 text-center text-[#1B5E20]" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.main_title || "Sustainability Roadmap"}
                    </h2>

                    <div className="flex-1 grid grid-cols-3 gap-8 items-end pb-8">
                        {(data?.pillars || []).map((pillar, idx) => (
                            <div key={idx} className="h-full flex flex-col justify-end group">
                                <div
                                    className="bg-white p-8 rounded-t-[40px] rounded-b-[10px] shadow-md border-b-8 border-[#81C784] h-[80%] hover:h-[90%] transition-all duration-500 flex flex-col items-center text-center relative"
                                >
                                    <div className="w-16 h-16 bg-[#F1F8E9] rounded-full flex items-center justify-center text-3xl mb-6 text-[#2E7D32] shadow-inner">
                                        {/* Simple icon placeholder logic - in real app would use icon component */}
                                        <span>✦</span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 text-[#33691E]" style={{ fontFamily: "'Merriweather', serif" }}>
                                        {pillar.title}
                                    </h3>

                                    <p className="text-[#546E7A] leading-relaxed">
                                        {pillar.description}
                                    </p>

                                    {/* Decorative leaf effect */}
                                    <div className="absolute top-0 transform -translate-y-1/2 w-4 h-4 rounded-full bg-[#81C784]"></div>
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
