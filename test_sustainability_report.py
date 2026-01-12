#!/usr/bin/env python3
"""
永續報告書 (ESG Report) - 30 頁簡報範例
使用 /api/v1/ppt/presentation/import endpoint
"""

import requests
import json

API_BASE = "http://localhost:8000/api/v1/ppt"
NEXTJS_BASE = "http://localhost:3000"


def create_sustainability_report():
    """建立 30 頁永續報告書"""

    import_data = {
        "title": "2024 永續發展報告書",
        "template": "general",
        "language": "Traditional Chinese",
        "slides": [
            # ==================== 開場 ====================
            # 1. 封面
            {
                "layout_id": "general:general-intro-slide",
                "content": {
                    "title": "2024 永續發展報告書",
                    "description": "環境、社會、治理 (ESG) 年度報告",
                    "presenter": "永續發展委員會",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg",
                        "__image_prompt__": "sustainable green forest nature"
                    }
                },
                "speaker_note": "歡迎閱讀我們的 2024 年永續發展報告"
            },
            # 2. 目錄
            {
                "layout_id": "general:table-of-contents-slide",
                "content": {
                    "title": "報告目錄",
                    "sections": [
                        {"title": "關於本報告", "page": "3"},
                        {"title": "董事長的話", "page": "4"},
                        {"title": "公司概況", "page": "5-7"},
                        {"title": "環境永續", "page": "8-14"},
                        {"title": "社會責任", "page": "15-22"},
                        {"title": "公司治理", "page": "23-27"},
                        {"title": "未來展望", "page": "28-30"}
                    ]
                },
                "speaker_note": "報告涵蓋環境、社會、治理三大面向"
            },
            # 3. 關於本報告
            {
                "layout_id": "general:basic-info-slide",
                "content": {
                    "title": "關於本報告",
                    "description": "本報告依據 GRI 準則編製，涵蓋 2024 年 1 月至 12 月之永續績效，經第三方機構查證確保資訊可靠性。",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
                        "__image_prompt__": "business report document"
                    }
                },
                "speaker_note": "說明報告編製準則與範疇"
            },
            # 4. 董事長的話
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "董事長的話",
                    "quote": "永續發展不僅是企業責任，更是我們的核心競爭力。我們承諾在 2030 年前達成碳中和目標，為下一代創造更美好的未來。",
                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
                        "__image_prompt__": "business leader executive"
                    }
                },
                "speaker_note": "董事長對永續發展的承諾"
            },
            # 5. 公司概況
            {
                "layout_id": "general:basic-info-slide",
                "content": {
                    "title": "公司概況",
                    "description": "成立於 1990 年，我們是亞太區領先的科技製造企業，在全球 15 個國家設有營運據點，員工超過 25,000 人。",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
                        "__image_prompt__": "corporate headquarters building"
                    }
                },
                "speaker_note": "介紹公司基本資訊"
            },
            # 6. 關鍵數據
            {
                "layout_id": "general:metrics-slide",
                "content": {
                    "title": "2024 年度關鍵數據",
                    "description": "我們在永續發展方面取得顯著成果",
                    "metrics": [
                        {"value": "25,000+", "label": "全球員工人數"},
                        {"value": "15", "label": "營運國家數"},
                        {"value": "$8.5B", "label": "年度營收"}
                    ]
                },
                "speaker_note": "展示公司規模與營運數據"
            },
            # 7. 願景與使命
            {
                "layout_id": "general:bullet-with-icons-slide",
                "content": {
                    "title": "願景與使命",
                    "description": "以創新科技引領永續未來",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
                        "__image_prompt__": "team vision mission"
                    },
                    "bullets": [
                        {"title": "願景", "description": "成為全球最具永續影響力的科技企業", "icon": {"__icon_query__": "target"}},
                        {"title": "使命", "description": "透過創新為社會創造長期價值", "icon": {"__icon_query__": "rocket"}},
                        {"title": "價值觀", "description": "誠信、創新、永續、共好", "icon": {"__icon_query__": "heart"}}
                    ]
                },
                "speaker_note": "公司的核心願景與使命"
            },

            # ==================== 環境永續 ====================
            # 8. 環境章節封面
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "環境永續",
                    "quote": "守護地球，是我們對未來世代的承諾",
                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
                        "__image_prompt__": "green environment nature"
                    }
                },
                "speaker_note": "進入環境永續章節"
            },
            # 9. 環境績效總覽
            {
                "layout_id": "general:metrics-slide",
                "content": {
                    "title": "環境績效總覽",
                    "description": "2024 年環境保護成果",
                    "metrics": [
                        {"value": "-32%", "label": "碳排放減少"},
                        {"value": "45%", "label": "再生能源使用率"},
                        {"value": "92%", "label": "廢棄物回收率"}
                    ]
                },
                "speaker_note": "環境績效的關鍵指標"
            },
            # 10. 氣候變遷策略
            {
                "layout_id": "general:bullet-with-icons-slide",
                "content": {
                    "title": "氣候變遷策略",
                    "description": "積極因應氣候變遷挑戰",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
                        "__image_prompt__": "climate change environment"
                    },
                    "bullets": [
                        {"title": "碳中和目標", "description": "2030 年達成營運碳中和", "icon": {"__icon_query__": "leaf"}},
                        {"title": "科學基礎減碳", "description": "通過 SBTi 目標驗證", "icon": {"__icon_query__": "chart"}},
                        {"title": "TCFD 揭露", "description": "完整揭露氣候相關財務資訊", "icon": {"__icon_query__": "document"}}
                    ]
                },
                "speaker_note": "說明氣候變遷因應策略"
            },
            # 11. 碳排放管理
            {
                "layout_id": "general:metrics-with-image-slide",
                "content": {
                    "title": "碳排放管理",
                    "description": "範疇一至三碳排放持續下降",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg",
                        "__image_prompt__": "carbon footprint reduction"
                    },
                    "metrics": [
                        {"value": "125K", "label": "範疇一 (噸CO2e)"},
                        {"value": "89K", "label": "範疇二 (噸CO2e)"},
                        {"value": "1.2M", "label": "範疇三 (噸CO2e)"}
                    ]
                },
                "speaker_note": "詳細說明各範疇碳排放數據"
            },
            # 12. 能源管理
            {
                "layout_id": "general:numbered-bullets-slide",
                "content": {
                    "title": "能源管理措施",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg",
                        "__image_prompt__": "solar energy renewable"
                    },
                    "bullets": [
                        {"title": "太陽能發電", "description": "廠區設置 50MW 太陽能板"},
                        {"title": "LED 照明", "description": "全面更換為節能 LED 燈具"},
                        {"title": "智慧能源系統", "description": "導入 AI 能源管理平台"},
                        {"title": "綠電採購", "description": "簽訂長期再生能源購電協議"}
                    ]
                },
                "speaker_note": "能源管理的具體措施"
            },
            # 13. 水資源管理
            {
                "layout_id": "general:basic-info-slide",
                "content": {
                    "title": "水資源管理",
                    "description": "實施水資源循環利用計畫，製程用水回收率達 85%，較去年提升 10%。設立雨水收集系統，年節水量達 50 萬噸。",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/1446504/pexels-photo-1446504.jpeg",
                        "__image_prompt__": "water conservation management"
                    }
                },
                "speaker_note": "水資源管理成果"
            },
            # 14. 廢棄物管理
            {
                "layout_id": "general:bullet-icons-only-slide",
                "content": {
                    "title": "廢棄物管理",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg",
                        "__image_prompt__": "recycling waste management"
                    },
                    "bullets": [
                        {"title": "源頭減量", "description": "減少包材使用 25%", "icon": {"__icon_query__": "minus-circle"}},
                        {"title": "分類回收", "description": "廢棄物分類達 15 類", "icon": {"__icon_query__": "recycle"}},
                        {"title": "循環經濟", "description": "92% 廢棄物資源化處理", "icon": {"__icon_query__": "refresh"}},
                        {"title": "零掩埋目標", "description": "2025 年達成零廢棄掩埋", "icon": {"__icon_query__": "check-circle"}}
                    ]
                },
                "speaker_note": "廢棄物管理策略與成果"
            },

            # ==================== 社會責任 ====================
            # 15. 社會章節封面
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "社會責任",
                    "quote": "以人為本，共創美好社會",
                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
                        "__image_prompt__": "diverse team collaboration"
                    }
                },
                "speaker_note": "進入社會責任章節"
            },
            # 16. 員工概況
            {
                "layout_id": "general:metrics-slide",
                "content": {
                    "title": "員工概況",
                    "description": "打造幸福職場，吸引頂尖人才",
                    "metrics": [
                        {"value": "25,438", "label": "全球員工總數"},
                        {"value": "42%", "label": "女性員工比例"},
                        {"value": "4.2/5", "label": "員工滿意度"}
                    ]
                },
                "speaker_note": "員工基本數據"
            },
            # 17. 多元共融
            {
                "layout_id": "general:bullet-with-icons-slide",
                "content": {
                    "title": "多元共融",
                    "description": "建立包容且多元的工作環境",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg",
                        "__image_prompt__": "diversity inclusion workplace"
                    },
                    "bullets": [
                        {"title": "性別平等", "description": "女性主管比例達 35%", "icon": {"__icon_query__": "users"}},
                        {"title": "身障雇用", "description": "超越法定僱用比例", "icon": {"__icon_query__": "accessibility"}},
                        {"title": "年齡多元", "description": "跨世代協作專案推動", "icon": {"__icon_query__": "people"}}
                    ]
                },
                "speaker_note": "多元共融政策與成果"
            },
            # 18. 人才發展
            {
                "layout_id": "general:metrics-with-image-slide",
                "content": {
                    "title": "人才發展",
                    "description": "投資員工成長，創造職涯價值",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
                        "__image_prompt__": "training development learning"
                    },
                    "metrics": [
                        {"value": "48hr", "label": "人均訓練時數"},
                        {"value": "$15M", "label": "年度培訓投資"},
                        {"value": "89%", "label": "內部晉升比例"}
                    ]
                },
                "speaker_note": "人才發展投資與成果"
            },
            # 19. 職業安全衛生
            {
                "layout_id": "general:numbered-bullets-slide",
                "content": {
                    "title": "職業安全衛生",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg",
                        "__image_prompt__": "workplace safety health"
                    },
                    "bullets": [
                        {"title": "零災害目標", "description": "連續 500 天無重大工安事故"},
                        {"title": "安全訓練", "description": "每位員工年均 16 小時安全訓練"},
                        {"title": "健康促進", "description": "提供免費健康檢查與心理諮商"},
                        {"title": "ISO 45001", "description": "全廠區通過職安衛管理認證"}
                    ]
                },
                "speaker_note": "職業安全衛生管理"
            },
            # 20. 員工福利
            {
                "layout_id": "general:bullet-icons-only-slide",
                "content": {
                    "title": "員工福利",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
                        "__image_prompt__": "employee benefits happy"
                    },
                    "bullets": [
                        {"title": "彈性工作", "description": "混合辦公、彈性工時", "icon": {"__icon_query__": "clock"}},
                        {"title": "優渥薪酬", "description": "具競爭力的薪資福利", "icon": {"__icon_query__": "dollar"}},
                        {"title": "家庭照顧", "description": "育兒補助、托嬰服務", "icon": {"__icon_query__": "home"}},
                        {"title": "員工持股", "description": "員工認股計畫", "icon": {"__icon_query__": "trending-up"}}
                    ]
                },
                "speaker_note": "完善的員工福利制度"
            },
            # 21. 社會公益
            {
                "layout_id": "general:basic-info-slide",
                "content": {
                    "title": "社會公益投入",
                    "description": "2024 年投入社會公益超過 2 億元，涵蓋教育扶植、環境保護、弱勢關懷等領域，受惠人數超過 10 萬人。",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg",
                        "__image_prompt__": "community charity volunteer"
                    }
                },
                "speaker_note": "社會公益投入"
            },
            # 22. 供應鏈管理
            {
                "layout_id": "general:bullet-with-icons-slide",
                "content": {
                    "title": "永續供應鏈",
                    "description": "與供應商共同推動永續發展",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg",
                        "__image_prompt__": "supply chain management"
                    },
                    "bullets": [
                        {"title": "供應商評鑑", "description": "100% 關鍵供應商完成 ESG 評鑑", "icon": {"__icon_query__": "clipboard-check"}},
                        {"title": "稽核輔導", "description": "年度現場稽核超過 200 家", "icon": {"__icon_query__": "search"}},
                        {"title": "能力建構", "description": "舉辦永續供應鏈論壇", "icon": {"__icon_query__": "users"}}
                    ]
                },
                "speaker_note": "供應鏈永續管理"
            },

            # ==================== 公司治理 ====================
            # 23. 治理章節封面
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "公司治理",
                    "quote": "誠信經營，永續治理",
                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg",
                        "__image_prompt__": "corporate governance boardroom"
                    }
                },
                "speaker_note": "進入公司治理章節"
            },
            # 24. 董事會組成
            {
                "layout_id": "general:metrics-slide",
                "content": {
                    "title": "董事會組成",
                    "description": "多元且獨立的董事會結構",
                    "metrics": [
                        {"value": "9", "label": "董事會成員"},
                        {"value": "44%", "label": "獨立董事比例"},
                        {"value": "33%", "label": "女性董事比例"}
                    ]
                },
                "speaker_note": "董事會組成概況"
            },
            # 25. 誠信經營
            {
                "layout_id": "general:numbered-bullets-slide",
                "content": {
                    "title": "誠信經營",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3760093/pexels-photo-3760093.jpeg",
                        "__image_prompt__": "business ethics integrity"
                    },
                    "bullets": [
                        {"title": "行為準則", "description": "全員簽署誠信經營承諾書"},
                        {"title": "反貪腐", "description": "零容忍貪腐，違規即解僱"},
                        {"title": "吹哨者機制", "description": "建立匿名檢舉管道"},
                        {"title": "教育訓練", "description": "年度誠信經營訓練 100% 完成"}
                    ]
                },
                "speaker_note": "誠信經營政策與機制"
            },
            # 26. 風險管理
            {
                "layout_id": "general:bullet-with-icons-slide",
                "content": {
                    "title": "風險管理",
                    "description": "建立全面性風險管理機制",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg",
                        "__image_prompt__": "risk management security"
                    },
                    "bullets": [
                        {"title": "風險委員會", "description": "董事會層級風險監督", "icon": {"__icon_query__": "shield"}},
                        {"title": "資安防護", "description": "ISO 27001 認證，零資安事件", "icon": {"__icon_query__": "lock"}},
                        {"title": "營運持續", "description": "完善 BCP 計畫，定期演練", "icon": {"__icon_query__": "refresh"}}
                    ]
                },
                "speaker_note": "風險管理架構"
            },
            # 27. 利害關係人溝通
            {
                "layout_id": "general:basic-info-slide",
                "content": {
                    "title": "利害關係人溝通",
                    "description": "建立多元溝通管道，定期舉辦法人說明會、股東會、員工座談會，並透過永續報告書、官網即時揭露 ESG 資訊。",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
                        "__image_prompt__": "stakeholder communication meeting"
                    }
                },
                "speaker_note": "利害關係人溝通機制"
            },

            # ==================== 未來展望 ====================
            # 28. 2024 年度亮點
            {
                "layout_id": "general:bullet-icons-only-slide",
                "content": {
                    "title": "2024 年度亮點",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg",
                        "__image_prompt__": "achievement celebration success"
                    },
                    "bullets": [
                        {"title": "CDP 評等 A", "description": "氣候變遷與水安全雙 A 評等", "icon": {"__icon_query__": "award"}},
                        {"title": "DJSI 成分股", "description": "連續五年入選道瓊永續指數", "icon": {"__icon_query__": "trending-up"}},
                        {"title": "亞洲最佳雇主", "description": "獲選亞洲最佳雇主前 50 強", "icon": {"__icon_query__": "star"}},
                        {"title": "公司治理評鑑", "description": "連續三年前 5% 績優企業", "icon": {"__icon_query__": "badge"}}
                    ]
                },
                "speaker_note": "年度重要獲獎與肯定"
            },
            # 29. 永續目標
            {
                "layout_id": "general:numbered-bullets-slide",
                "content": {
                    "title": "2025-2030 永續目標",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
                        "__image_prompt__": "future goals planning"
                    },
                    "bullets": [
                        {"title": "2030 碳中和", "description": "營運範疇達成淨零排放"},
                        {"title": "100% 綠電", "description": "全球據點使用 100% 再生能源"},
                        {"title": "零廢棄", "description": "製程廢棄物 100% 資源化"},
                        {"title": "50% 女性主管", "description": "提升女性領導力與多元性"}
                    ]
                },
                "speaker_note": "未來五年永續目標"
            },
            # 30. 結語
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "攜手共創永續未來",
                    "quote": "感謝您閱讀本報告。永續發展是一段持續的旅程，我們誠摯邀請所有利害關係人與我們一同前行，為地球與社會創造更美好的明天。",
                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg",
                        "__image_prompt__": "sunset hope future sustainable"
                    }
                },
                "speaker_note": "感謝閱讀，期待合作"
            }
        ],
        "export_as": "pptx"
    }

    print(f"\n簡報標題: {import_data['title']}")
    print(f"Slides 數量: {len(import_data['slides'])}")
    print("\n使用的 layouts 統計:")

    layout_count = {}
    for slide in import_data['slides']:
        layout_id = slide['layout_id']
        layout_count[layout_id] = layout_count.get(layout_id, 0) + 1

    for layout, count in sorted(layout_count.items()):
        print(f"  - {layout}: {count} 頁")

    print("\n發送 import 請求...")
    response = requests.post(
        f"{API_BASE}/presentation/import",
        json=import_data,
        headers={"Content-Type": "application/json"}
    )

    print(f"狀態碼: {response.status_code}")

    if response.status_code == 200:
        result = response.json()
        print("\n" + "=" * 60)
        print("成功！")
        print(f"Presentation ID: {result['presentation_id']}")
        print(f"編輯網址: {NEXTJS_BASE}{result['edit_url']}")
        if result.get('export_path'):
            print(f"匯出檔案: {result['export_path']}")
        print("=" * 60)
        return result
    else:
        print(f"錯誤: {response.text}")
        return None


def main():
    print("=" * 60)
    print("永續報告書 (ESG Report) - 30 頁簡報")
    print("=" * 60)
    create_sustainability_report()


if __name__ == "__main__":
    main()
