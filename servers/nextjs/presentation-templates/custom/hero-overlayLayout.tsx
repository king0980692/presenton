import React from 'react'
import * as z from 'zod'


export const layoutId = "hero-overlay"
export const layoutName = "Hero Image Overlay"
export const layoutDescription = "Full-screen hero image with overlaid title and subtitle text. Great for intro or section divider slides."

export const Schema = z.object({
  bg: z.object({
    __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({
      description: "Image URL",
    }),
    __image_prompt__: z.string().min(10).max(100).default("Professional business team collaboration").meta({
      description: "Image generation prompt",
    }),
  }).default({}).meta({
    description: "Image with URL and prompt",
  }),

  title: z.string().min(5).max(56).default("Transform Your Business").meta({
    description: "Main heading text. Max 8 words",
  }),

  subtitle: z.string().min(10).max(140).default("Discover innovative strategies to drive growth and stay ahead.").meta({
    description: "Descriptive text. Max 20 words",
  }),

  logo: z.object({
    __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({
      description: "Image URL",
    }),
    __image_prompt__: z.string().min(10).max(100).default("Company logo").meta({
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
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
        style={{
          fontFamily: "var(--heading-font-family, Playfair Display)",
          backgroundColor: 'var(--card-background-color, #000000)',
        }}
      >
        <div className="relative w-full h-full">
          <div style={{ position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%', zIndex: 0 }}>
            <div className="w-full h-full overflow-hidden" style={{ backgroundColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
              {data?.bg?.__image_url__ && (
                <img
                  src={data.bg.__image_url__}
                  alt={data.bg?.__image_prompt__ || "Image"}
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          </div>

          <div style={{ position: 'absolute', left: '8%', top: '55%', width: '60%', height: '15%', zIndex: 10 }}>
            <h1 className="text-5xl font-bold" style={{ color: 'var(--text-heading-color, #111827)', textAlign: 'left' }}>
              {data?.title || "Transform Your Business"}
            </h1>
          </div>

          <div style={{ position: 'absolute', left: '8%', top: '72%', width: '50%', height: '10%', zIndex: 10 }}>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-body-color, #6B7280)', fontSize: 'clamp(12px, 2vw, 18px)' }}>
              {data?.subtitle || "Discover innovative strategies to drive growth and stay ahead."}
            </p>
          </div>

          <div style={{ position: 'absolute', left: '85%', top: '5%', width: '10%', height: '8%', zIndex: 15 }}>
            <div className="w-full h-full overflow-hidden" style={{ backgroundColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
              {data?.logo?.__image_url__ && (
                <img
                  src={data.logo.__image_url__}
                  alt={data.logo?.__image_prompt__ || "Image"}
                  className="w-full h-full"
                  style={{ objectFit: 'contain' }}
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
