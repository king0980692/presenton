import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-community"
export const layoutName = "10. Coding for Kids"
export const layoutDescription = "Photo with code overlay."

export const Schema = z.object({
    title: z.string().default("Future Encoders"),

    impact: z.string().default("Mentoring the next generation of developers."),
    img: z.string().url().default("https://images.pexels.com/photos/8613071/pexels-photo-8613071.jpeg"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600&family=Fira+Code:wght@400&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="flex h-full">
                    <div className="w-[60%] relative">
                        <img src={data?.img} className="w-full h-full object-cover grayscale mix-blend-overlay opacity-50" />
                        <div className="absolute inset-0 bg-[#0f172a] opacity-30"></div>

                        {/* Code Overlay */}
                        <div className="absolute top-10 left-10 text-[#4ade80] font-mono text-sm opacity-60 typing-effect">
                            function empowerYouth() &#123;<br />
                            &nbsp;&nbsp;provideMentorship();<br />
                            &nbsp;&nbsp;grantAccess();<br />
                            &nbsp;&nbsp;return futureLeaders;<br />
                            &#125;
                        </div>
                    </div>

                    <div className="w-[40%] bg-[#1e293b] p-12 flex flex-col justify-center border-l-4 border-[#4ade80]">
                        <h2 className="text-5xl font-bold mb-8 font-mono" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {data?.title}
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed font-light">
                            {data?.impact}
                        </p>

                        <div className="mt-12">
                            <div className="text-4xl font-bold text-[#4ade80]">1,000+</div>
                            <div className="text-sm uppercase tracking-widest text-gray-500">Students Taught</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
