#!/usr/bin/env python3
"""
Test Custom Template - Tests the JSON-generated custom layouts
"""

import requests

API_BASE = "http://localhost:11003/api/v1/ppt/presentation/import"
NEXTJS_BASE = "http://localhost:11001"

IMG = "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"


def create_custom_presentation():
    return {
        "title": "Custom Template Demo",
        "template": "custom",
        "language": "English",
        "slides": [
            # Slide 1: Title + Bullets + Image
            {
                "layout_id": "custom:title-bullets-image",
                "content": {
                    "title": "Key Features",
                    "subtitle": "Discover the powerful capabilities that set our solution apart from competitors.",
                    "features": [
                        {"title": "Lightning Fast", "description": "Sub-millisecond response times for all operations"},
                        {"title": "Enterprise Security", "description": "Bank-grade encryption and compliance certifications"},
                        {"title": "Auto Scaling", "description": "Automatically handles traffic spikes without intervention"},
                        {"title": "24/7 Support", "description": "Round-the-clock expert assistance when you need it"}
                    ],
                    "image": {
                        "__image_url__": IMG,
                        "__image_prompt__": "Modern technology dashboard"
                    }
                }
            },
            # Slide 2: Metrics + Chart
            {
                "layout_id": "custom:metrics-with-chart",
                "content": {
                    "title": "Growth Metrics",
                    "description": "Our key performance indicators demonstrate consistent growth and strong market position.",
                    "metrics": [
                        {"value": "99.9%", "label": "Uptime", "description": "System reliability"},
                        {"value": "2.5M", "label": "Users", "description": "Active monthly"},
                        {"value": "150%", "label": "Growth", "description": "Year over year"}
                    ],
                    "chart": {
                        "type": "bar",
                        "data": [
                            {"label": "Jan", "value": 45},
                            {"label": "Feb", "value": 52},
                            {"label": "Mar", "value": 61},
                            {"label": "Apr", "value": 70},
                            {"label": "May", "value": 85},
                            {"label": "Jun", "value": 95}
                        ]
                    }
                }
            },
            # Slide 3: Data Table
            {
                "layout_id": "custom:data-table",
                "content": {
                    "title": "Feature Comparison",
                    "description": "See how our solution compares to leading alternatives in the market.",
                    "data": {
                        "headers": ["Feature", "Our Product", "Competitor A", "Competitor B"],
                        "rows": [
                            ["Response Time", "< 10ms", "50ms", "100ms"],
                            ["Uptime SLA", "99.99%", "99.9%", "99.5%"],
                            ["Price/month", "$49", "$79", "$59"],
                            ["API Calls", "Unlimited", "100K", "500K"],
                            ["Support", "24/7 Live", "Business Hours", "Email Only"]
                        ]
                    }
                }
            }
        ]
    }


def main():
    print("=" * 60)
    print("Testing Custom Template (JSON-Generated Layouts)")
    print("=" * 60)

    payload = create_custom_presentation()
    print(f"\nTemplate: {payload['template']}")
    print(f"Slides: {len(payload['slides'])}")

    for i, slide in enumerate(payload['slides'], 1):
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
