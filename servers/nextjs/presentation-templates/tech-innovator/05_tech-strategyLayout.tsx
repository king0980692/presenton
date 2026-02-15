import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-strategy"
export const layoutName = "05. Tech Strategy Nodes"
export const layoutDescription = "Connected nodes visualization strategy."

export const Schema = z.object({
    title: z.string().default("Strategic_Protocol"),

    nodes: z.array(z.object({
        id: z.string().default("01"),
        title: z.string().default("Phase 1"),
        desc: z.string().default("Description"),
    })).min(3).max(3).default([
        { id: "01", title: "Data Collection", desc: "Deploy IoT sensors for real-time monitoring." },
        { id: "02", title: "AI Analysis", desc: "Process big data to identify inefficiency patterns." },
        { id: "03", title: "Auto-Optimization", desc: "Execute automated adjustments to reduce waste." },
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
                href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#050510] text-white flex flex-col items-center justify-center"
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                <h2 className="text-4xl font-bold mb-20 text-[#00E5FF] tracking-widest border px-6 py-2 border-[#00E5FF]">
                    {data?.title}
                </h2>

                <div className="flex items-center w-full max-w-5xl justify-between relative px-20">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 w-[60%] h-1 bg-gradient-to-r from-[#00E5FF] to-transparent -z-10 transform -translate-y-1/2"></div>

                    {(data?.nodes || []).map((node, idx) => (
                        <div key={idx} className="flex flex-col items-center relative group w-64">
                            <div className="w-6 h-6 rounded-full bg-[#0B0F19] border-4 border-[#00E5FF] mb-8 z-10 shadow-[0_0_15px_rgba(0,229,255,0.8)]"></div>

                            <div className="text-center bg-[#1E293B] p-6 border border-gray-700 w-full h-40 flex flex-col justify-center hover:border-[#00E5FF] transition-all">
                                <div className="text-xs text-gray-500 mb-2">Step_{node.id}</div>
                                <h3 className="text-xl font-bold mb-2 text-white">{node.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {node.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
