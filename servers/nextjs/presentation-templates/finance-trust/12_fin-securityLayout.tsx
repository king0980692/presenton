import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-security"
export const layoutName = "12. Data Privacy & Security"
export const layoutDescription = "Shield icon with key points."

export const Schema = z.object({
    title: z.string().default("Cybersecurity & Privacy"),

    points: z.array(z.string()).min(4).max(4).default([
        "Biometric Authentication",
        "End-to-End Encryption",
        "24/7 Threat Monitoring",
        "Zero Trust Architecture",
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
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white flex"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="w-1/2 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-blue-900/20 blur-3xl rounded-full transform scale-75"></div>
                    <div className="text-[250px] text-[#d4af37] opacity-90 relative z-10 drop-shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                        🛡️
                    </div>
                </div>

                <div className="w-1/2 p-20 flex flex-col justify-center">
                    <h2 className="text-4xl font-serif text-white mb-12 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>

                    <ul className="space-y-8">
                        {(data?.points || []).map((pt, idx) => (
                            <li key={idx} className="flex items-center gap-6 text-xl font-light border-b border-gray-700 pb-4">
                                <div className="w-2 h-2 bg-[#d4af37] transform rotate-45"></div>
                                {pt}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
