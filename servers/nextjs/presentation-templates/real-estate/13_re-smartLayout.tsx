import React from 'react'
import * as z from 'zod'


export const layoutId = "re-smart"
export const layoutName = "13. Smart Living"
export const layoutDescription = "App mockup."

export const Schema = z.object({
    title: z.string().default("Connected Homes"),

    features: z.array(z.string()).min(3).max(3).default([
        "Energy Monitoring",
        "Remote Access",
        "Community Events",
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
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;500;700&family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-gray-900 text-white p-20 flex items-center"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="w-1/2 pr-12">
                    <h2 className="text-5xl font-bold uppercase mb-12" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <ul className="space-y-6">
                        {(data?.features || []).map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-6 p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-[#10b981] transition-colors cursor-pointer group">
                                <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center text-black font-bold group-hover:bg-white transition-colors">
                                    {idx + 1}
                                </div>
                                <span className="text-xl font-bold uppercase">{feat}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-1/2 flex justify-center relative">
                    <div className="w-[300px] h-[600px] border-8 border-gray-800 rounded-[40px] bg-black relative shadow-2xl overflow-hidden">
                        {/* Screen */}
                        <div className="w-full h-full bg-white text-black p-6">
                            <div className="text-center font-bold text-gray-400 mb-8 uppercase text-xs tracking-widest">My Home</div>
                            <div className="bg-[#10b981] text-white p-6 rounded-2xl mb-4 shadow-lg">
                                <div className="text-sm opacity-80">Energy Usage</div>
                                <div className="text-3xl font-bold">12.5 kWh</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-100 p-4 rounded-xl aspect-square flex flex-col justify-center items-center">
                                    <div className="text-2xl mb-2">💡</div>
                                    <div className="font-bold">Lights</div>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-xl aspect-square flex flex-col justify-center items-center">
                                    <div className="text-2xl mb-2">🌡️</div>
                                    <div className="font-bold">Climate</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Glow behind phone */}
                    <div className="absolute top-1/2 left-1/2 w-[350px] h-[600px] bg-[#10b981] opacity-20 filter blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
