import React from 'react'
import * as z from 'zod'


export const layoutId = "minimal-content"
export const layoutName = "3. Executive Letter"
export const layoutDescription = "Content heavy layout with signature style."

export const Schema = z.object({
  msg_title: z.string().min(5).max(70).default("A Letter from Our CEO").meta({
    description: "Main heading text. Max 10 words",
  }),

  msg_body: z.string().min(10).max(2100).default("Sustainability is not just a buzzword for us. It is the cornerstone of our business strategy...").meta({
    description: "Descriptive text. Max 300 words",
  }),

  signature: z.string().min(10).max(350).default("– John Doe, CEO").meta({
    description: "Descriptive text. Max 50 words",
  }),

  portrait: z.object({
    __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({
      description: "Image URL",
    }),
    __image_prompt__: z.string().min(10).max(100).default("professional CEO portrait grey background minimalist").meta({
      description: "Image generation prompt",
    }),
  }).default({
    __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    __image_prompt__: "professional CEO portrait grey background minimalist"
  }).meta({
    description: "Image with URL and prompt",
  }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
        style={{
          fontFamily: "var(--heading-font-family, Inter)",
          backgroundColor: 'var(--card-background-color, #FFFFFF)',
        }}
      >
        <div className="grid h-full" style={{ gridTemplateColumns: '60% 40%', gap: '0px' }}>
          {/* Left Column */}
          <div className="flex flex-col p-8 justify-start" style={{ backgroundColor: 'transparent' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-heading-color, #111827)' }}>
              {data?.msg_title || "A Letter from Our CEO"}
            </h2>

            <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-body-color, #6B7280)' }}>
              {data?.msg_body || "Sustainability is not just a buzzword for us. It is the cornerstone of our business strategy..."}
            </p>

            <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-body-color, #6B7280)' }}>
              {data?.signature || "– John Doe, CEO"}
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col p-8 justify-center" style={{ backgroundColor: 'transparent' }}>
            <div className="w-full h-full rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
              {data?.portrait?.__image_url__ && (
                <img
                  src={data.portrait.__image_url__}
                  alt={data.portrait?.__image_prompt__ || "Image"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DynamicSlideLayout
