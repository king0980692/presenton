import React from 'react'
import * as z from 'zod'


export const layoutId = "vibrant-gallery"
export const layoutName = "08. Vibrant Community Gallery"
export const layoutDescription = "Photo collage of community events."

export const Schema = z.object({
    title: z.string().default("COMMUNITY LOVE"),

    images: z.array(z.object({
        url: z.string().url().default("https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg"),
    })).min(4).max(4).default([
        { url: "https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg" },
        { url: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg" },
        { url: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg" },
        { url: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg" },
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
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&family=Permanent+Marker&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#74B9FF]"
                style={{
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="p-12 h-full flex flex-col">
                    <h2 className="text-6xl font-black text-white text-center mb-10" style={{ WebkitTextStroke: '2px black' }}>
                        {data?.title}
                    </h2>

                    <div className="flex-1 grid grid-cols-2 gap-8 relative">
                        {/* Decorative Sticker */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-[#FD79A8] text-white p-4 rounded-full w-32 h-32 flex items-center justify-center font-bold text-center border-4 border-white shadow-lg rotate-12 font-handwriting" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                            Best<br />Vibes<br />Ever!
                        </div>

                        {(data?.images || []).map((img, idx) => {
                            const rotate = idx % 2 === 0 ? '-rotate-2' : 'rotate-2';
                            return (
                                <div key={idx} className={`relative h-60 border-4 border-black bg-white p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:scale-105 transition-transform z-10 ${rotate}`}>
                                    <div className="w-full h-full overflow-hidden">
                                        <img src={img.url} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
