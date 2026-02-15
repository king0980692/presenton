import React from 'react'
import * as z from 'zod'


export const layoutId = "health-equity"
export const layoutName = "15. Health Equity Heatmap"
export const layoutDescription = "Map showing underserved areas."

export const Schema = z.object({
    title: z.string().default("Bridging the Gap"),
    subtitle: z.string().default("Targeting underserved regions to ensure equitable access."),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white px-20 py-16 flex justify-between items-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="w-1/3">
                    <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-xl text-gray-500 leading-relaxed mb-8">
                        {data?.subtitle}
                    </p>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-4 h-4 rounded-full bg-red-500"></div>
                            <span className="font-bold text-gray-700">High Need Areas</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                            <span className="font-bold text-gray-700">Moderate Need</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                            <span className="font-bold text-gray-700">Access Achieved</span>
                        </div>
                    </div>
                </div>

                <div className="w-2/3 h-[500px] bg-gray-100 rounded-3xl relative overflow-hidden flex items-center justify-center">
                    <div className="text-gray-300 font-bold text-4xl">Interactive Heatmap</div>
                    {/* Abstract Heatmap Blobs */}
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/30 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-orange-400/30 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-teal-500/30 rounded-full blur-2xl"></div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
