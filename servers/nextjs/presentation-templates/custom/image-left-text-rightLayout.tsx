import React from 'react'
import * as z from 'zod'


export const layoutId = "image-left-text-right"
export const layoutName = "Image Left with Title and Text"
export const layoutDescription = "Left half is a full-height image, right half has title, subtitle, and body text. Great for feature introduction or storytelling slides."

export const Schema = z.object({
  image: z.object({
    __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({
      description: "Image URL",
    }),
    __image_prompt__: z.string().min(10).max(100).default("Modern office workspace with natural lighting").meta({
      description: "Image generation prompt",
    }),
  }).default({}).meta({
    description: "Image with URL and prompt",
  }),

  title: z.string().min(5).max(56).default("Why Choose Us").meta({
    description: "Main heading text. Max 8 words",
  }),

  subtitle: z.string().min(10).max(105).default("We deliver results that matter to your business growth.").meta({
    description: "Descriptive text. Max 15 words",
  }),

  body: z.string().min(10).max(560).default("Our team of experts brings years of industry experience to every project. We focus on understanding your unique challenges and crafting tailored solutions that drive measurable outcomes. From strategy to execution, we partner with you at every step to ensure lasting success.").meta({
    description: "Descriptive text. Max 80 words",
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
        <div className="relative w-full h-full">
          <div style={{ position: 'absolute', left: '0%', top: '0%', width: '48%', height: '100%', zIndex: 0 }}>
            <div className="w-full h-full overflow-hidden" style={{ backgroundColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
              {data?.image?.__image_url__ && (
                <img
                  src={data.image.__image_url__}
                  alt={data.image?.__image_prompt__ || "Image"}
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          </div>

          <div style={{ position: 'absolute', left: '54%', top: '18%', width: '40%', height: '12%', zIndex: 1 }}>
            <h1 className="text-5xl font-bold" style={{ color: 'var(--text-heading-color, #111827)', textAlign: 'left' }}>
              {data?.title || "Why Choose Us"}
            </h1>
          </div>

          <div style={{ position: 'absolute', left: '54%', top: '32%', width: '40%', height: '8%', zIndex: 1 }}>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-body-color, #6B7280)' }}>
              {data?.subtitle || "We deliver results that matter to your business growth."}
            </p>
          </div>

          <div style={{ position: 'absolute', left: '54%', top: '44%', width: '40%', height: '36%', zIndex: 1 }}>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-body-color, #6B7280)', fontSize: 'clamp(12px, 2vw, 18px)' }}>
              {data?.body || "Our team of experts brings years of industry experience to every project. We focus on understanding your unique challenges and crafting tailored solutions that drive measurable outcomes. From strategy to execution, we partner with you at every step to ensure lasting success."}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DynamicSlideLayout
