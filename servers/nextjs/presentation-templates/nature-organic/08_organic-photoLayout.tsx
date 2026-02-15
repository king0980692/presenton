import React from 'react'
import * as z from 'zod'


export const layoutId = "organic-photo"
export const layoutName = "08. Organic Full Photo"
export const layoutDescription = "Full photo layout with quote overlay."

export const Schema = z.object({
    image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("forest").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg", __image_prompt__: "forest" }),

    quote: z.string().default("Nature does not hurry, yet everything is accomplished."),
    author: z.string().default("Lao Tzu"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-black"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="absolute inset-0 opacity-80">
                    {data?.image?.__image_url__ && (
                        <img
                            src={data.image.__image_url__}
                            alt={data.image.__image_prompt__}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Overlay Block */}
                <div className="absolute bottom-16 right-16 bg-white/90 p-12 max-w-2xl rounded-tl-[60px] rounded-br-[10px] shadow-lg backdrop-blur-sm">
                    <h2 className="text-3xl font-bold leading-normal text-[#1B5E20] italic mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                        "{data?.quote || "Nature does not hurry, yet everything is accomplished."}"
                    </h2>
                    <p className="text-[#546E7A] font-semibold text-right border-t border-[#81C784] pt-4 inline-block float-right w-full">
                        — {data?.author || "Lao Tzu"}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
