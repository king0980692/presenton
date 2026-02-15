import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-board"
export const layoutName = "18. Tech Advisory Board"
export const layoutDescription = "Hexagon photos."

export const Schema = z.object({
    title: z.string().default("Visionary Leadership"),

    members: z.array(z.string()).min(3).max(3).default([
        "Dr. Alan T. - AI Research",
        "Maria G. - Cybersecurity",
        "James L. - Sustainability",
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
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#020617] text-white p-20 text-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold font-mono mb-20" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex justify-center gap-12">
                    {(data?.members || []).map((mem, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div className="w-48 h-56 bg-[#1e293b] clip-path-hexagon flex items-center justify-center mb-6 hover:bg-[#38bdf8] transition-colors relative group">
                                <div className="text-6xl group-hover:scale-110 transition-transform">👤</div>
                            </div>

                            <div className="text-xl font-bold">{mem.split(' - ')[0]}</div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest">{mem.split(' - ')[1]}</div>
                        </div>
                    ))}
                </div>

                {/* Hexagon Clip Path (Hidden but used via class, here simulating with CSS for preview) */}
                <style dangerouslySetInnerHTML={{
                    __html: `
            .clip-path-hexagon {
                clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            }
        `}} />
            </div>
        </>
    )
}

export default DynamicSlideLayout
