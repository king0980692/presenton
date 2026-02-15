import React from 'react'
import * as z from 'zod'


export const layoutId = "organic-initiatives"
export const layoutName = "09. Organic Initiatives"
export const layoutDescription = "Grid of action items with icons."

export const Schema = z.object({
    section_title: z.string().default("Key Actions"),

    items: z.array(z.object({
        title: z.string().default("Action"),
        text: z.string().default("Description of the action taken."),
    })).min(4).max(6).default([
        { title: "Reforestation", text: "Planted 50,000 native trees in degraded areas to restore biodiversity." },
        { title: "Water Harvesting", text: "Installed rainwater harvesting systems in all 15 manufacturing plants." },
        { title: "Organic Farming", text: "Partnered with 200 local farmers to transition to organic agricultural practices." },
        { title: "Plastic Free", text: "Eliminated single-use plastics from our entire supply chain globally." },
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
                href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F1F8E9]"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="p-16 h-full flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-12 text-[#1B5E20] border-l-8 border-[#AED581] pl-6" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.section_title || "Key Actions"}
                    </h2>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                        {(data?.items || []).map((item, idx) => (
                            <div key={idx} className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-[#FFFFFF] flex items-center justify-center text-[#558B2F] font-bold text-xl shadow-sm flex-shrink-0">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#33691E] mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-[#546E7A] leading-relaxed">
                                        {item.text}
                                    </p>
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
