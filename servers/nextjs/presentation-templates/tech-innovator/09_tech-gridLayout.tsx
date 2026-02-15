import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-grid"
export const layoutName = "09. Tech Solutions Grid"
export const layoutDescription = "Grid of technical solutions."

export const Schema = z.object({
    main_title: z.string().default("Protocol_Modules"),

    modules: z.array(z.object({
        code: z.string().default("MOD_01"),
        title: z.string().default("Module Name"),
        status: z.string().default("Active"),
    })).min(6).max(6).default([
        { code: "E-01", title: "Energy Grid", status: "Online" },
        { code: "W-02", title: "Waste Mgmt", status: "Online" },
        { code: "C-03", title: "Carbon Capture", status: "Beta" },
        { code: "S-04", title: "Supply Chain", status: "Syncing" },
        { code: "A-05", title: "AI Monitor", status: "Active" },
        { code: "R-06", title: "Reporting", status: "Ready" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0F172A] text-white p-16"
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                <h2 className="text-4xl font-bold mb-12 text-[#93C5FD]">
                    {data?.main_title}
                    <span className="text-sm ml-4 text-gray-500 font-normal">/// INDEXING...</span>
                </h2>

                <div className="grid grid-cols-3 gap-6">
                    {(data?.modules || []).map((mod, idx) => (
                        <div key={idx} className="bg-[#1E293B] border border-gray-700 p-6 relative hover:bg-[#00E5FF]/5 transition-colors group cursor-crosshair">
                            <div className="absolute top-2 right-2 text-[10px] text-gray-500">{mod.code}</div>

                            <div className="w-8 h-8 rounded bg-gray-800 mb-4 flex items-center justify-center text-[#00E5FF] group-hover:animate-spin">
                                ⚙
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-[#00E5FF]">{mod.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span className={`w-2 h-2 rounded-full ${mod.status === 'Beta' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                                {mod.status}
                            </div>

                            {/* Corner marks */}
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-500 opacity-0 group-hover:opacity-100"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-500 opacity-0 group-hover:opacity-100"></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
