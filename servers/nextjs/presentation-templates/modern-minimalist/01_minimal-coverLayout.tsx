import React from 'react'
import * as z from 'zod'


export const layoutId = "minimal-cover"
export const layoutName = "1. Minimalist Cover"
export const layoutDescription = "Clean, bold typography cover for modern reports."

export const Schema = z.object({
  year: z.string().min(5).max(70).default("2024").meta({
    description: "Main heading text. Max 10 words",
  }),

  title: z.string().min(5).max(70).default("ANNUAL ENVIRONMENTAL IMPACT").meta({
    description: "Main heading text. Max 10 words",
  }),

  subtitle: z.string().min(10).max(350).default("Transparency & Action - Sustainable Development").meta({
    description: "Descriptive text. Max 50 words",
  }),

  accent_image: z.object({
    __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({
      description: "Image URL",
    }),
    __image_prompt__: z.string().min(10).max(100).default("minimalist abstract white architecture blue sky").meta({
      description: "Image generation prompt",
    }),
  }).default({
    __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    __image_prompt__: "minimalist abstract white architecture blue sky"
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
        <div className="relative w-full h-full">
          <div style={{ position: 'absolute', left: '6%', top: '10%', width: '20%', height: '10%', zIndex: 10 }}>
            <h1 className="text-5xl font-bold" style={{ color: 'var(--text-heading-color, #111827)', textAlign: 'left' }}>
              {data?.year || "2024"}
            </h1>
          </div>

          <div style={{ position: 'absolute', left: '6%', top: '25%', width: '50%', height: '40%', zIndex: 10 }}>
            <h1 className="text-5xl font-bold" style={{ color: 'var(--text-heading-color, #111827)', textAlign: 'left' }}>
              {data?.title || "ANNUAL ENVIRONMENTAL IMPACT"}
            </h1>
          </div>

          <div style={{ position: 'absolute', left: '6%', top: '70%', width: '40%', height: '15%', zIndex: 10 }}>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-body-color, #6B7280)' }}>
              {data?.subtitle || "Transparency & Action - Sustainable Development"}
            </p>
          </div>

          <div style={{ position: 'absolute', left: '60%', top: '10%', width: '30%', height: '80%', zIndex: 5 }}>
            <div className="w-full h-full overflow-hidden" style={{ backgroundColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
              {data?.accent_image?.__image_url__ && (
                <img
                  src={data.accent_image.__image_url__}
                  alt={data.accent_image?.__image_prompt__ || "Image"}
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
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
