import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-back"
export const layoutName = "10. Tech End Transmission"
export const layoutDescription = "Terminal style closing page."

export const Schema = z.object({
    end_msg: z.string().default("END_OF_REPORT"),
    contact: z.string().default("secure@tech-corp.io"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-black text-[#00E5FF] flex items-center justify-center"
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                <div className="text-center">
                    <div className="animate-pulse mb-8 text-6xl">■</div>

                    <h1 className="text-5xl font-bold mb-6 tracking-widest border-b-2 border-[#00E5FF] pb-2 inline-block">
                        {data?.end_msg}
                    </h1>

                    <div className="text-xl text-gray-400 mt-8">
                        CONTACT: <span className="text-white hover:underline cursor-pointer">{data?.contact}</span>
                    </div>

                    <div className="mt-20 text-xs text-gray-600">
                        SESSION TERMINATED<br />
                        TIMESTAMP: {new Date().toISOString()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
