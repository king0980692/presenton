import React from 'react'
import * as z from 'zod'


export const layoutId = "health-ethics"
export const layoutName = "17. Bioethics & Compliance"
export const layoutDescription = "Text blocks for ethical standards."

export const Schema = z.object({
    title: z.string().default("Ethics & Compliance"),

    points: z.array(z.object({
        title: z.string().default("Standard"),
        desc: z.string().default("Description"),
    })).min(3).max(3).default([
        { title: "Patient Privacy (HIPAA/GDPR)", desc: "Rigorous data protection protocols for all patient records." },
        { title: "Clinical Integrity", desc: "Transparent reporting of all trial results, regardless of outcome." },
        { title: "Anti-Bribery", desc: "Zero tolerance policy for corruption in global procurement." },
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
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@400;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-slate-50 p-16"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-slate-800 mb-16 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="max-w-4xl mx-auto space-y-8">
                    {(data?.points || []).map((pt, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border-l-8 border-slate-700 flex gap-6 items-start">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex-shrink-0 flex items-center justify-center text-slate-700 font-bold text-xl">
                                {idx + 1}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">{pt.title}</h3>
                                <p className="text-lg text-slate-500">{pt.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
