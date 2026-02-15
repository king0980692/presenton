import React from 'react'
import * as z from 'zod'


export const layoutId = "re-nps"
export const layoutName = "18. Resident Satisfaction"
export const layoutDescription = "Quote card."

export const Schema = z.object({
    score: z.string().default("4.8/5"),
    quote: z.string().default("Living at Azure Tower has changed my perception of city life. The green spaces and community events make it feel like a real neighborhood."),
    author: z.string().default("Sarah J., Resident since 2023"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;500;700&family=Roboto:wght@300;400;700&family=Caveat&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#f3f4f6] p-20 flex items-center justify-center"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 text-[400px] text-gray-200 opacity-50 font-serif leading-none">”</div>

                <div className="bg-white p-20 shadow-2xl max-w-4xl relative">
                    <div className="absolute -top-10 -left-10 bg-[#10b981] w-32 h-32 flex flex-col items-center justify-center text-white shadow-lg">
                        <div className="text-4xl font-bold">{data?.score}</div>
                        <div className="text-xs uppercase">Rating</div>
                    </div>

                    <p className="text-4xl font-light text-gray-600 italic leading-snug mb-12">
                        "{data?.quote}"
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-1 bg-[#374151]"></div>
                        <div className="font-bold uppercase tracking-widest text-[#374151]">{data?.author}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
