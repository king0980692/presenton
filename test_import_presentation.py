#!/usr/bin/env python3
"""
測試 /api/v1/ppt/presentation/import endpoint
這個 endpoint 不經過 LLM，直接匯入內容到資料庫，並可用網頁編輯
"""

import requests
import json

API_BASE = "http://localhost:8000/api/v1/ppt"
NEXTJS_BASE = "http://localhost:3000"


def get_available_layouts(template_name="general"):
    """取得 template 的所有可用 layout"""
    response = requests.get(f"{NEXTJS_BASE}/api/template?group={template_name}")
    if response.status_code == 200:
        data = response.json()
        print(f"Template: {data['name']}")
        print(f"可用的 layouts ({len(data['slides'])} 個):")
        for slide in data['slides']:
            print(f"  - {slide['id']}: {slide['name']}")
        return data
    else:
        print(f"取得 template 失敗: {response.text}")
        return None


def import_presentation():
    """匯入一個使用多種 layout 的簡報"""

    import_data = {
        "title": "人工智慧完整介紹",
        "template": "general",
        "language": "Traditional Chinese",
        "slides": [
            # Slide 1: 開場頁 (Intro Slide)
            {
                "layout_id": "general:general-intro-slide",
                "content": {
                    "title": "人工智慧入門",
                    "description": "從基礎概念到實際應用，帶你了解 AI 的世界",
                    "presenter": "AI 研究團隊",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
                        "__image_prompt__": "artificial intelligence futuristic"
                    }
                },
                "speaker_note": "歡迎大家，今天我們來聊聊人工智慧"
            },
            # Slide 2: 基本資訊 (Basic Info)
            {
                "layout_id": "general:basic-info-slide",
                "content": {
                    "title": "什麼是人工智慧？",
                    "description": "人工智慧是讓電腦模擬人類智慧的技術，包括學習、推理、解決問題等能力。",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
                        "__image_prompt__": "AI brain concept"
                    }
                },
                "speaker_note": "先從定義開始說明"
            },
            # Slide 3: 帶圖標的項目 (Bullet with Icons)
            {
                "layout_id": "general:bullet-with-icons-slide",
                "content": {
                    "title": "AI 的核心技術",
                    "description": "人工智慧包含多種關鍵技術領域",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg",
                        "__image_prompt__": "technology innovation"
                    },
                    "bullets": [
                        {
                            "title": "機器學習",
                            "description": "從數據中自動學習模式",
                            "icon": {"__icon_query__": "brain"}
                        },
                        {
                            "title": "深度學習",
                            "description": "使用神經網路處理複雜問題",
                            "icon": {"__icon_query__": "network"}
                        },
                        {
                            "title": "自然語言處理",
                            "description": "理解和生成人類語言",
                            "icon": {"__icon_query__": "chat"}
                        }
                    ]
                },
                "speaker_note": "這三個是 AI 最重要的技術領域"
            },
            # Slide 4: 數據指標 (Metrics)
            {
                "layout_id": "general:metrics-slide",
                "content": {
                    "title": "AI 市場規模",
                    "description": "全球人工智慧市場持續高速成長",
                    "metrics": [
                        {
                            "value": "$150B",
                            "label": "2025 市場規模"
                        },
                        {
                            "value": "37%",
                            "label": "年複合成長率"
                        },
                        {
                            "value": "500M",
                            "label": "AI 應用用戶數"
                        }
                    ]
                },
                "speaker_note": "用數據說明 AI 的重要性"
            },
            # Slide 5: 編號列表 (Numbered Bullets)
            {
                "layout_id": "general:numbered-bullets-slide",
                "content": {
                    "title": "AI 學習路線圖",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
                        "__image_prompt__": "learning path education"
                    },
                    "bullets": [
                        {
                            "title": "數學基礎",
                            "description": "線性代數、機率統計、微積分"
                        },
                        {
                            "title": "程式語言",
                            "description": "Python 是首選，熟悉 NumPy、Pandas"
                        },
                        {
                            "title": "機器學習框架",
                            "description": "TensorFlow、PyTorch 擇一深入"
                        },
                        {
                            "title": "實戰專案",
                            "description": "從小專案開始，逐步挑戰複雜問題"
                        }
                    ]
                },
                "speaker_note": "給想入門的人一個學習方向"
            },
            # Slide 6: 引言 (Quote)
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "未來展望",
                    "quote": "人工智慧是我們這個時代最重要的技術革命，它將徹底改變我們工作和生活的方式。",
                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
                        "__image_prompt__": "futuristic technology"
                    }
                },
                "speaker_note": "用引言總結 AI 的重要性"
            },
            # Slide 7: 基本資訊作為結尾
            {
                "layout_id": "general:basic-info-slide",
                "content": {
                    "title": "感謝聆聽",
                    "description": "歡迎提問與討論！一起探索 AI 的無限可能。",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg",
                        "__image_prompt__": "thank you presentation ending"
                    }
                },
                "speaker_note": "Q&A 時間"
            }
        ],
        "export_as": "pptx"
    }

    print("\n發送 import 請求...")
    print(f"簡報標題: {import_data['title']}")
    print(f"Slides 數量: {len(import_data['slides'])}")
    print("使用的 layouts:")
    for i, slide in enumerate(import_data['slides']):
        print(f"  {i+1}. {slide['layout_id']}")

    response = requests.post(
        f"{API_BASE}/presentation/import",
        json=import_data,
        headers={"Content-Type": "application/json"}
    )

    print(f"\n狀態碼: {response.status_code}")

    if response.status_code == 200:
        result = response.json()
        print("\n成功！")
        print(f"Presentation ID: {result['presentation_id']}")
        print(f"編輯網址: {NEXTJS_BASE}{result['edit_url']}")
        if result.get('export_path'):
            print(f"匯出檔案: {result['export_path']}")
        return result
    else:
        print(f"錯誤: {response.text}")
        return None


def main():
    print("=" * 60)
    print("測試 Presenton Import API (多種 Layout)")
    print("=" * 60)

    # 匯入簡報
    result = import_presentation()

    if result:
        print("\n" + "=" * 60)
        print("測試完成！")
        print(f"請在瀏覽器開啟: {NEXTJS_BASE}{result['edit_url']}")
        print("=" * 60)


if __name__ == "__main__":
    main()
