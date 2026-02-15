import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-toc"
export const layoutName = "02. Tech Dashboard TOC"
export const layoutDescription = "Table of contents styled like a dashboard menu."

export const Schema = z.object({
    menu_title: z.string().default("NAVIGATION_MENU"),

    items: z.array(z.object({
        id: z.string().default("01"),
        label: z.string().default("Section Name"),
        status: z.string().default("READY"),
    })).min(4).max(6).default([
        { id: "01", label: "Executive Summary", status: "LOADED" },
        { id: "02", label: "Core Technology", status: "ACTIVE" },
        { id: "03", label: "ESG Performance", status: "SYNCED" },
        { id: "04", label: "Future Roadmap", status: "PENDING" },
        { id: "05", label: "Appendix_Data", status: "LOCKED" },
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
                href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0F172A] text-white"
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                {/* Sidebar Decoration */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#00E5FF]"></div>

                <div className="grid grid-cols-2 h-full">
                    {/* Menu List */}
                    <div className="p-20 flex flex-col justify-center border-r border-gray-800">
                        <h2 className="text-4xl font-bold mb-12 text-[#F8FAFC]">
                    // {data?.menu_title || "NAVIGATION_MENU"}
                        </h2>

                        <div className="space-y-6">
                            {(data?.items || []).map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 border border-gray-700 hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all cursor-pointer group rounded-sm">
                                    <div className="flex items-center gap-6">
                                        <span className="text-[#64748B] group-hover:text-[#00E5FF]">{item.id}</span>
                                        <span className="text-xl font-bold text-gray-200">{item.label}</span>
                                    </div>
                                    <div className="text-xs px-2 py-1 bg-gray-800 rounded text-[#00E5FF]">
                                        {item.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Data Visualization Placeholder */}
                    <div className="relative overflow-hidden bg-black/40 flex items-center justify-center p-20">
                        <div className="w-full h-full border border-dashed border-gray-700 rounded-xl relative flex items-center justify-center">
                            <div className="absolute top-4 left-4 text-xs text-gray-500">SYSTEM_PREVIEW</div>

                            {/* Abstract Hexagon Grid */}
                            <div className="grid grid-cols-3 gap-4 rotate-12 opacity-30">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-20 h-20 border border-[#00E5FF] flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#00E5FF] rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
