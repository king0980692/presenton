#!/usr/bin/env python3
"""
Test Absolute Positioning Template - Tests hero-overlay and image-left-text-right layouts
with optional theme support.
"""

import requests

API_BASE = "http://localhost:11003/api/v1/ppt/presentation/import"
NEXTJS_BASE = "http://localhost:11001"

IMG_OFFICE = "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
IMG_CITY = "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg"
IMG_LOGO = "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg"


def create_absolute_presentation():
    return {
        "title": "Absolute Layout + Theme Demo",
        "template": "custom",
        "language": "English",
        "theme": {
            "themeId": "corporate",
            "themeName": "Corporate",
            "colors": {
                "primary": "#2563EB",
                "secondary": "#EFF6FF",
                "tertiary": "#BFDBFE",
                "background": "#FFFFFF",
                "headingText": "#1E3A5F",
                "bodyText": "#64748B",
            },
            "fonts": {
                "heading": {"family": "Inter", "weight": 600},
                "body": {"family": "Inter", "weight": 400},
                "sizes": {"h1": 48, "h2": 36, "h3": 24, "body": 16, "caption": 12},
            },
            "spacing": {
                "preset": "normal",
                "baseUnit": 8,
                "lineHeight": 1.6,
                "paragraphGap": 20,
            },
        },
        "slides": [
            # Slide 1: Hero Overlay (absolute)
            {
                "layout_id": "custom:hero-overlay",
                "content": {
                    "bg": {
                        "__image_url__": IMG_CITY,
                        "__image_prompt__": "Aerial view of modern city skyline at sunset",
                    },
                    "title": "The Future of Business",
                    "subtitle": "Empowering teams with next-generation tools and insights.",
                    "logo": {
                        "__image_url__": IMG_LOGO,
                        "__image_prompt__": "Minimalist company logo",
                    },
                },
            },
            # Slide 2: Image Left + Text Right (absolute)
            {
                "layout_id": "custom:image-left-text-right",
                "content": {
                    "image": {
                        "__image_url__": IMG_OFFICE,
                        "__image_prompt__": "Creative team brainstorming in bright office",
                    },
                    "title": "Why Choose Us",
                    "subtitle": "We deliver results that matter to your business growth.",
                    "body": (
                        "Our team of experts brings years of industry experience to "
                        "every project. We focus on understanding your unique challenges "
                        "and crafting tailored solutions that drive measurable outcomes. "
                        "From strategy to execution, we partner with you at every step "
                        "to ensure lasting success and sustainable competitive advantage."
                    ),
                },
            },
            # Slide 3: Reuse existing flow layout (backward compat)
            {
                "layout_id": "custom:title-bullets-image",
                "content": {
                    "title": "Key Features",
                    "subtitle": "Discover the powerful capabilities that set our solution apart.",
                    "features": [
                        {"title": "Lightning Fast", "description": "Sub-millisecond response times for all operations"},
                        {"title": "Enterprise Security", "description": "Bank-grade encryption and compliance certifications"},
                        {"title": "Auto Scaling", "description": "Automatically handles traffic spikes without intervention"},
                    ],
                    "image": {
                        "__image_url__": IMG_OFFICE,
                        "__image_prompt__": "Modern technology dashboard",
                    },
                },
            },
        ],
    }


def main():
    print("=" * 60)
    print("Testing Absolute Positioning + Theme System")
    print("=" * 60)

    payload = create_absolute_presentation()
    print(f"\nTemplate: {payload['template']}")
    print(f"Theme:    {payload['theme']['themeId']}")
    print(f"Slides:   {len(payload['slides'])}")

    for i, slide in enumerate(payload["slides"], 1):
        print(f"  {i}. {slide['layout_id']}")

    print("\nSending request...")
    response = requests.post(API_BASE, json=payload)
    print(f"Status Code: {response.status_code}")

    if response.status_code == 200:
        data = response.json()
        edit_url = data.get("edit_url", "")
        ppt_id = data.get("presentation_id", "unknown")

        print(f"\n✅ Success!")
        print(f"Presentation ID: {ppt_id}")
        print(f"\nEdit URL: {NEXTJS_BASE}{edit_url}")
    else:
        print(f"\n❌ Error: {response.text}")


if __name__ == "__main__":
    main()
