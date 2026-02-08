import React from 'react'
import * as z from 'zod'


export const layoutId = "my-layout"
export const layoutName = "My Custom Layout"
export const layoutDescription = "Description for LLM"

export const Schema = z.object({
  title: z.string().min(5).max(56).default("Heading Text").meta({
    description: "Main heading text. Max 8 words",
  }),

  points: z.array(z.object({
    title: z.string().min(3).max(30).default("Point").meta({ description: "Bullet title" }),
    description: z.string().min(10).max(150).default("Description text").meta({ description: "Bullet description" }),
    icon: z.object({
      __icon_url__: z.string().default("").meta({ description: "Icon URL" }),
      __icon_query__: z.string().min(2).max(20).default("star").meta({ description: "Icon search query" }),
    }).optional(),
  })).min(1).max(5).default([{"title":"Point One","description":"Description for the first point"},{"title":"Point Two","description":"Description for the second point"},{"title":"Point Three","description":"Description for the third point"}]).meta({
    description: "List of bullet points with icons",
  }),

  image: z.object({
    __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({
      description: "Image URL",
    }),
    __image_prompt__: z.string().min(10).max(100).default("Professional business image").meta({
      description: "Image generation prompt",
    }),
  }).default({}).meta({
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
        <div className="grid h-full" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {/* Left Column */}
          <div className="flex flex-col p-8 " style={{ backgroundColor: 'transparent' }}>
            <h1 className="text-xl font-bold mb-4" style={{ color: 'var(--text-heading-color, #111827)' }}>
              {data?.title || "Heading"}
            </h1>

            <div className="space-y-4">
              {(data?.points || []).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--primary-accent-color, #9333ea)' }}>
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: 'var(--text-heading-color, #111827)' }}>{item.title}</h4>
                    <p className="text-sm" style={{ color: 'var(--text-body-color, #6B7280)' }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col p-8 " style={{ backgroundColor: 'transparent' }}>
            <div className="w-full h-full rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
              {data?.image?.__image_url__ && (
                <img
                  src={data.image.__image_url__}
                  alt={data.image?.__image_prompt__ || "Image"}
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
