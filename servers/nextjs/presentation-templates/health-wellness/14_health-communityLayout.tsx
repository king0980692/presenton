import React from 'react'
import * as z from 'zod'


export const layoutId = "health-community"
export const layoutName = "14. Community Health"
export const layoutDescription = "Grid of community initiatives."

export const Schema = z.object({
    title: z.string().default("Community Engagement"),

    programs: z.array(z.object({
        title: z.string().default("Program"),
        impact: z.string().default("Impact"),
        icon: z.string().default("❤️"),
    })).min(3).max(3).default([
        { title: "Mobile Cancer Screening", impact: "5,000 Screenings", icon: "🚌" },
        { title: "Healthy Kids Nutrition", impact: "10,000 Meals", icon: "🍎" },
        { title: "Mental Health Hotline", impact: "24/7 Support", icon: "📞" },
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
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@400;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-8">
                    {(data?.programs || []).map((prog, idx) => (
                        <div key={idx} className="flex-1 bg-teal-50 rounded-2xl p-10 text-center hover:bg-teal-100 transition-colors shadow-sm group">
                            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform inline-block">{prog.icon}</div>
                            <h3 className="text-2xl font-bold text-teal-900 mb-4">{prog.title}</h3>
                            <div className="inline-block bg-white text-teal-600 px-6 py-2 rounded-full font-bold shadow-sm">
                                {prog.impact}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
