
import requests
import json

API_BASE = "http://localhost:11003/api/v1/ppt"
NEXTJS_BASE = "http://localhost:3001"

def test_custom_layouts():
    """測試兩個新的自訂模板：TSMC風格與保險業風格"""

    payload = {
        "title": "2024 自訂模板測試報告",
        "template": "custom",
        "export_as": "pptx",
        "slides": [
            # 1. TSMC 風格：強調數據與科技感
            {
                "layout_id": "custom:tsmc-metrics-chart",
                "content": {
                    "title": "台積電風格 - 綠色製造績效",
                    "subtitle": "透過智慧化管理系統，優化水資源回收與能源使用效率，達成年度永續目標。",
                    
                    "kpi_metrics": [
                        {"value": "98%", "label": "製程水回收", "description": "領先全球半導體業"},
                        {"value": "12.5%", "label": "能源節約率", "description": "導入 AI 節能模組"},
                        {"value": "0", "label": "重大環安事故", "description": "全年無災害工時"}
                    ],

                    "performance_chart": {
                        "type": "bar",
                        "data": [
                            {"name": "2021", "value": 75},
                            {"name": "2022", "value": 82},
                            {"name": "2023", "value": 88},
                            {"name": "2024", "value": 98}
                        ]
                    },

                    "sidebar_bg": {
                        "__image_prompt__": "futuristic technology circuit board dark blue background",
                        "__image_url__": "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg"
                    }
                }
            },

            # 2. 保險業風格：強調社會關懷與人文
            {
                "layout_id": "custom:insurance-care-layout",
                "content": {
                    "main_title": "三商壽風格 - 社會公益關懷",
                    
                    "hero_image": {
                        "__image_prompt__": "happy family park diverse community warm sunlight",
                        "__image_url__": "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg"
                    },

                    "csr_highlights": [
                        {
                            "title": "微型保險推廣", 
                            "description": "提供弱勢家庭基本保障，累計承保 10 萬人次。", 
                            "icon": {"__icon_query__": "shield"}
                        },
                        {
                            "title": "校園體育支持", 
                            "description": "連續十年贊助高中籃球聯賽 (HBL)，培育體育人才。", 
                            "icon": {"__icon_query__": "trophy"}
                        },
                        {
                            "title": "偏鄉醫療服務", 
                            "description": "行動醫療車巡迴服務，縮短城鄉醫療差距。", 
                            "icon": {"__icon_query__": "heart"}
                        }
                    ],

                    "bg_pattern": {
                        "__image_prompt__": "soft orange gradient abstract background",
                        "__image_url__": "https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg"
                    }
                }
            }
        ]
    }

    print(f"正在發送請求生成簡報：{payload['title']}...")
    
    try:
        response = requests.post(f"{API_BASE}/presentation/import", json=payload)
        
        if response.status_code == 200:
            data = response.json()
            print("\n" + "="*50)
            print("✅ 成功生成！")
            print(f"Presentation ID: {data['presentation_id']}")
            print(f"編輯網址: {NEXTJS_BASE}{data['edit_url']}")
            print("="*50)
        else:
            print(f"\n❌ 生成失敗: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"\n❌ 連線錯誤: {str(e)}")
        print("請確認 Next.js (port 3001) 與 FastAPI (port 8003) 伺服器是否已啟動。")

if __name__ == "__main__":
    test_custom_layouts()
