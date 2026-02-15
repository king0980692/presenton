import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-opensource"
export const layoutName = "19. Open Source"
export const layoutDescription = "GitHub style contribution graph."

export const Schema = z.object({
    title: z.string().default("Giving Back to Open Source"),

    contributions: z.string().default("15,000+ Commits"),
    projects: z.string().default("20+ Projects Maintained"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0d1117] text-white p-16 flex flex-col items-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold font-mono mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-16 mb-12">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#22c55e] mb-2">{data?.contributions}</div>
                        <div className="text-gray-400 text-sm">To Public Repos</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#a855f7] mb-2">{data?.projects}</div>
                        <div className="text-gray-400 text-sm">By Our Team</div>
                    </div>
                </div>

                {/* Mock Contribution Graph */}
                <div className="flex flex-wrap gap-1 px-20 justify-center opacity-80">
                    {Array.from({ length: 154 }).map((_, i) => {
                        const opacity = Math.random();
                        const color = opacity > 0.7 ? '#238636' : opacity > 0.4 ? '#0e4429' : '#161b22';
                        return (
                            <div
                                key={i}
                                className="w-4 h-4 rounded-sm"
                                style={{ backgroundColor: color }}
                            ></div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
