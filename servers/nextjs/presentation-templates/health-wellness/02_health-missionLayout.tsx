import React from 'react'
import * as z from 'zod'


export const layoutId = "health-mission"
export const layoutName = "02. Mission Statement"
export const layoutDescription = "Centered text with DNA background."

export const Schema = z.object({
    heading: z.string().default("Our Mission"),
    mission: z.string().default("To improve lives by delivering innovative medicines and compassionate care."),
    values: z.array(z.string()).min(3).max(3).default(["Patient Focus", "Innovation", "Integrity"]),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-teal-50 text-center p-20 flex flex-col justify-center items-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                {/* DNA Helix Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%230d9488\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                }}></div>

                <h2 className="text-teal-600 font-bold uppercase tracking-[0.2em] mb-8 relative z-10" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {data?.heading}
                </h2>

                <div className="text-5xl font-light text-gray-800 leading-tight max-w-4xl mx-auto mb-16 relative z-10">
                    "{data?.mission}"
                </div>

                <div className="flex gap-12 relative z-10">
                    {(data?.values || []).map((val, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 rounded-full border-2 border-teal-500 flex items-center justify-center bg-white shadow-sm">
                                <span className="text-teal-600 font-bold text-xl">0{idx + 1}</span>
                            </div>
                            <span className="font-bold text-gray-700 text-lg uppercase tracking-wide">{val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
