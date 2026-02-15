import React from 'react'
import * as z from 'zod'


export const layoutId = "corp-letter"
export const layoutName = "03. Corporate Chairman Letter"
export const layoutDescription = "Text heavy layout with author profile."

export const Schema = z.object({
    title: z.string().default("Letter from the Chairman"),

    body: z.string().max(1000).default("The past year has been one of resilience and transformation. Despite global economic headwinds, we have delivered solid results while advancing our strategic priorities..."),

    author: z.string().default("James Sterling"),
    role: z.string().default("Chairman of the Board"),

    photo: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("senior business executive portrait").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", __image_prompt__: "senior business executive portrait" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="flex h-full">
                    {/* Text Column */}
                    <div className="w-[60%] p-20 flex flex-col justify-center bg-[#F8F9FA]">
                        <h2 className="text-4xl font-bold text-[#0A192F] mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {data?.title}
                        </h2>

                        <div className="prose max-w-none text-[#4A5568] leading-8 text-[17px] text-justify bg-white p-10 shadow-sm border-l-4 border-[#0A192F]">
                            <p>
                                <span className="text-5xl float-left mr-3 text-[#C5A059] font-serif leading-[0.8]">"</span>
                                {data?.body}
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-[#0A192F]" style={{ fontFamily: "'Playfair Display', serif" }}>{data?.author}</span>
                                <span className="text-sm text-[#C5A059] uppercase tracking-wide font-bold">{data?.role}</span>
                            </div>
                            <div className="h-px bg-[#CBD5E1] flex-1"></div>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="w-[40%] relative">
                        <div className="absolute inset-0 bg-[#0A192F]">
                            {data?.photo?.__image_url__ && (
                                <img
                                    src={data.photo.__image_url__}
                                    alt={data.photo.__image_prompt__}
                                    className="w-full h-full object-cover opacity-90"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
