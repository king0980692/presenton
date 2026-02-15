import React from 'react'
import * as z from 'zod'


export const layoutId = "health-board"
export const layoutName = "18. Medical Advisory Board"
export const layoutDescription = "Photos of doctors/directors."

export const Schema = z.object({
    title: z.string().default("Medical Advisory Board"),

    members: z.array(z.object({
        name: z.string().default("Dr. Name"),
        title: z.string().default("Title"),
        image: z.string().url().default("https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg"),
    })).min(3).max(3).default([
        { name: "Dr. Alicia Vance", title: "Chief Medical Officer", image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg" },
        { name: "Dr. James Wilson", title: "Head of Oncology", image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg" },
        { name: "Dr. Sato Tanaka", title: "VP of Research", image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-12 justify-center">
                    {(data?.members || []).map((mem, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div className="w-56 h-56 rounded-full overflow-hidden mb-6 border-4 border-teal-50 shadow-lg group">
                                <img src={mem.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="text-2xl font-bold text-gray-800 mb-1">{mem.name}</div>
                            <div className="text-teal-600 font-medium uppercase tracking-wide text-sm">{mem.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
