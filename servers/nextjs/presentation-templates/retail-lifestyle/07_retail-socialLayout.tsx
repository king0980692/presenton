import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-social"
export const layoutName = "07. Social Media Reach"
export const layoutDescription = "iPhone mockups with stats."

export const Schema = z.object({
    title: z.string().default("Community & Culture"),

    followers: z.string().default("2.5M"),
    platform: z.string().default("Instagram & TikTok"),

    hashtag: z.string().default("#UrbanThriftFlip"),
    posts: z.string().default("150k+ User Posts"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Mulish:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#e0f2fe] p-16 flex items-center justify-between"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="w-[45%] pl-8">
                    <h2 className="text-5xl font-serif italic text-[#0369a1] mb-12 leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="space-y-12">
                        <div>
                            <div className="text-6xl font-black text-[#0284c7]">{data?.followers}</div>
                            <div className="bg-white inline-block px-4 py-1 rounded-full text-sm font-bold text-gray-500 shadow-sm mt-2">{data?.platform}</div>
                        </div>

                        <div>
                            <div className="text-4xl font-bold text-[#0c4a6e]">{data?.hashtag}</div>
                            <div className="text-lg font-medium text-gray-500 mt-2">{data?.posts}</div>
                        </div>
                    </div>
                </div>

                <div className="w-[50%] flex gap-8 h-full items-center justify-center">
                    {/* Mockup 1 */}
                    <div className="w-[200px] h-[380px] bg-white rounded-[30px] border-8 border-white shadow-2xl overflow-hidden relative transform -rotate-6 mt-10">
                        <img src="https://images.pexels.com/photos/5705490/pexels-photo-5705490.jpeg" className="w-full h-full object-cover" />
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">@user123</div>
                    </div>

                    {/* Mockup 2 */}
                    <div className="w-[200px] h-[380px] bg-white rounded-[30px] border-8 border-white shadow-2xl overflow-hidden relative transform rotate-6 mb-10">
                        <img src="https://images.pexels.com/photos/5705477/pexels-photo-5705477.jpeg" className="w-full h-full object-cover" />
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">@style_icon</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
