#!/usr/bin/env python3
"""
永續報告書 V3 - 含 GRI 索引對照表
"""

import requests


API_BASE = "http://localhost:8003/api/v1/ppt"
NEXTJS_BASE = "http://localhost:3001"


def create_sustainability_report_v3():
    """建立永續報告書 - 含 GRI 準則索引"""


    import_data = {

        "title": "2024 永續發展報告書 (含GRI索引)",
        "template": "general",
        "language": "Traditional Chinese",

        "slides": [
            # 1. 封面

            {
                "layout_id": "general:general-intro-slide",
                "content": {
                    "title": "2024 永續發展報告書",
                    "description": "依據 GRI 準則編製",
                    "presenter": "永續發展委員會",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg",
                        "__image_prompt__": "sustainable forest"
                    }
                },
                "speaker_note": "封面"
            },
            # 2. 目錄

            {
                "layout_id": "general:table-of-contents-slide",
                "content": {
                    "title": "報告目錄",
                    "sections": [

                        {"title": "關於本報告", "page": "3"},
                        {"title": "公司治理", "page": "4-7"},
                        {"title": "環境永續", "page": "8-13"},

                        {"title": "社會責任", "page": "14-19"},
                        {"title": "附錄：GRI 索引", "page": "20-22"}
                    ]
                },
                "speaker_note": "目錄"
            },

            # 3. 關於本報告
            {
                "layout_id": "general:basic-info-slide",
                "content": {

                    "title": "關於本報告",
                    "description": "本報告依據 GRI 通用準則 2021 編製，報告期間為 2024 年 1 月 1 日至 12 月 31 日，涵蓋範圍為本公司及子公司。",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
                        "__image_prompt__": "report document"
                    }
                },
                "speaker_note": "報告說明"
            },
            # 4-7. 公司治理
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "公司治理",
                    "quote": "誠信經營是企業永續發展的基石",
                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg",
                        "__image_prompt__": "corporate governance"
                    }

                },
                "speaker_note": "治理章節"
            },
            {

                "layout_id": "general:metrics-slide",
                "content": {
                    "title": "治理績效",
                    "description": "董事會組成與運作",
                    "metrics": [
                        {"value": "9", "label": "董事會成員"},
                        {"value": "44%", "label": "獨立董事"},
                        {"value": "33%", "label": "女性董事"}
                    ]
                },
                "speaker_note": "GRI 2-9, 2-10"
            },

            {
                "layout_id": "general:bullet-with-icons-slide",
                "content": {
                    "title": "誠信經營",
                    "description": "建立完善的誠信經營機制",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3760093/pexels-photo-3760093.jpeg",
                        "__image_prompt__": "business ethics"
                    },
                    "bullets": [
                        {"title": "行為準則", "description": "全員簽署誠信承諾書", "icon": {"__icon_query__": "document"}},
                        {"title": "反貪腐", "description": "零容忍政策，年度訓練", "icon": {"__icon_query__": "shield"}},
                        {"title": "申訴管道", "description": "設立匿名檢舉機制", "icon": {"__icon_query__": "phone"}}
                    ]
                },

                "speaker_note": "GRI 2-23, 2-26, 205-2"
            },
            {
                "layout_id": "general:team-slide",
                "content": {
                    "title": "永續發展委員會",
                    "companyDescription": "由董事會成員與高階主管組成，負責永續策略與監督",
                    "teamMembers": [
                        {"name": "王永續", "position": "委員會主席", "description": "統籌永續發展策略", "image": {"__image_url__": "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg", "__image_prompt__": "executive"}},
                        {"name": "李環境", "position": "環境長", "description": "主導淨零轉型", "image": {"__image_url__": "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg", "__image_prompt__": "professional woman"}},
                        {"name": "張社會", "position": "人資長", "description": "負責員工發展", "image": {"__image_url__": "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg", "__image_prompt__": "HR professional"}},

                        {"name": "陳治理", "position": "法務長", "description": "確保法規遵循", "image": {"__image_url__": "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg", "__image_prompt__": "legal professional"}}
                    ]
                },
                "speaker_note": "GRI 2-9, 2-12"
            },
            # 8-13. 環境永續
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "環境永續",
                    "quote": "2030 碳中和、2050 淨零排放",
                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
                        "__image_prompt__": "green environment"
                    }
                },
                "speaker_note": "環境章節"
            },
            {
                "layout_id": "general:chart-with-bullets-slide",
                "content": {
                    "title": "溫室氣體排放",
                    "description": "近五年碳排放趨勢 (萬噸 CO2e)",
                    "chartData": {

                        "type": "bar",
                        "data": [
                            {"name": "2020", "value": 85},
                            {"name": "2021", "value": 78},
                            {"name": "2022", "value": 68},
                            {"name": "2023", "value": 55},
                            {"name": "2024", "value": 42}
                        ]
                    },
                    "color": "#22c55e",
                    "showLegend": False,
                    "showTooltip": True,
                    "bulletPoints": [
                        {"title": "範疇一", "description": "直接排放 12.5 萬噸", "icon": {"__icon_query__": "factory"}},
                        {"title": "範疇二", "description": "間接排放 8.9 萬噸", "icon": {"__icon_query__": "zap"}},
                        {"title": "範疇三", "description": "價值鏈排放 120 萬噸", "icon": {"__icon_query__": "truck"}}
                    ]
                },
                "speaker_note": "GRI 305-1, 305-2, 305-3"
            },
            {
                "layout_id": "general:chart-with-bullets-slide",

                "content": {
                    "title": "能源管理",
                    "description": "能源使用結構",
                    "chartData": {
                        "type": "pie",
                        "data": [
                            {"name": "再生能源", "value": 45},
                            {"name": "天然氣", "value": 30},
                            {"name": "外購電力", "value": 25}
                        ]
                    },
                    "color": "#f59e0b",
                    "showLegend": True,
                    "showTooltip": True,
                    "bulletPoints": [
                        {"title": "總能耗", "description": "1,250,000 GJ", "icon": {"__icon_query__": "battery"}},
                        {"title": "能源密集度", "description": "較去年降低 8%", "icon": {"__icon_query__": "trending-down"}},
                        {"title": "RE100", "description": "2030 年 100% 再生能源", "icon": {"__icon_query__": "sun"}}

                    ]
                },
                "speaker_note": "GRI 302-1, 302-3, 302-4"
            },
            {
                "layout_id": "general:table-info-slide",
                "content": {
                    "title": "水資源管理",

                    "tableData": {
                        "headers": ["項目", "2023", "2024", "單位"],

                        "rows": [
                            ["總取水量", "235", "218", "萬噸"],
                            ["回收水量", "165", "185", "萬噸"],
                            ["排放水量", "70", "58", "萬噸"],
                            ["水回收率", "70%", "85%", "-"]
                        ]
                    },
                    "description": "持續提升水資源使用效率，降低對環境衝擊"
                },
                "speaker_note": "GRI 303-3, 303-4, 303-5"
            },

            {
                "layout_id": "general:metrics-slide",
                "content": {
                    "title": "廢棄物管理",

                    "description": "循環經濟成果",
                    "metrics": [
                        {"value": "92%", "label": "資源回收率"},
                        {"value": "8%", "label": "焚化處理"},
                        {"value": "0%", "label": "掩埋處置"}
                    ]
                },
                "speaker_note": "GRI 306-3, 306-4, 306-5"
            },
            {
                "layout_id": "general:numbered-bullets-slide",
                "content": {
                    "title": "生物多樣性保護",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
                        "__image_prompt__": "biodiversity nature"
                    },
                    "bullets": [
                        {"title": "棲地保護", "description": "廠區周邊 50 公頃生態保育"},
                        {"title": "植樹造林", "description": "年度種植 10,000 棵樹木"},
                        {"title": "生態調查", "description": "定期監測物種多樣性"},
                        {"title": "環境教育", "description": "舉辦生態導覽活動"}
                    ]
                },

                "speaker_note": "GRI 304-1, 304-3"
            },
            # 14-19. 社會責任
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "社會責任",
                    "quote": "以人為本，共創美好社會",
                    "background_image": {

                        "__image_url__": "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
                        "__image_prompt__": "diverse team"
                    }
                },
                "speaker_note": "社會章節"
            },
            {
                "layout_id": "general:chart-with-bullets-slide",
                "content": {
                    "title": "員工概況",
                    "description": "打造多元共融職場",
                    "chartData": {
                        "type": "pie",
                        "data": [
                            {"name": "男性", "value": 58},
                            {"name": "女性", "value": 42}
                        ]
                    },
                    "color": "#8b5cf6",
                    "showLegend": True,
                    "showTooltip": True,
                    "bulletPoints": [
                        {"title": "員工總數", "description": "25,438 人", "icon": {"__icon_query__": "users"}},
                        {"title": "平均年資", "description": "8.5 年", "icon": {"__icon_query__": "clock"}},
                        {"title": "離職率", "description": "5.2%", "icon": {"__icon_query__": "log-out"}}
                    ]
                },
                "speaker_note": "GRI 2-7, 401-1"

            },
            {
                "layout_id": "general:table-info-slide",
                "content": {

                    "title": "職業安全衛生",
                    "tableData": {

                        "headers": ["指標", "2023", "2024", "目標"],
                        "rows": [
                            ["工傷率 (IR)", "0.15", "0.12", "0.10"],
                            ["職業病率 (ODR)", "0", "0", "0"],
                            ["損失工時率 (LDR)", "2.5", "1.8", "1.5"],

                            ["死亡人數", "0", "0", "0"]
                        ]
                    },
                    "description": "持續強化安全管理，邁向零災害目標"
                },
                "speaker_note": "GRI 403-9, 403-10"
            },

            {
                "layout_id": "general:metrics-with-image-slide",
                "content": {
                    "title": "人才發展",
                    "description": "投資員工成長",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
                        "__image_prompt__": "training development"
                    },

                    "metrics": [
                        {"value": "48hr", "label": "人均訓練時數"},
                        {"value": "$15M", "label": "培訓投資"},
                        {"value": "89%", "label": "內部晉升率"}
                    ]
                },
                "speaker_note": "GRI 404-1, 404-2"
            },
            {
                "layout_id": "general:bullet-icons-only-slide",

                "content": {
                    "title": "社區參與",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg",

                        "__image_prompt__": "community engagement"
                    },
                    "bullets": [
                        {"title": "公益投入", "description": "年度投入 $20M", "icon": {"__icon_query__": "heart"}},
                        {"title": "志工服務", "description": "5,000+ 志工時數", "icon": {"__icon_query__": "hand"}},
                        {"title": "教育支持", "description": "獎學金 500 名學生", "icon": {"__icon_query__": "book"}},
                        {"title": "在地採購", "description": "60% 本地供應商", "icon": {"__icon_query__": "shopping-bag"}}
                    ]
                },
                "speaker_note": "GRI 413-1"
            },
            {
                "layout_id": "general:basic-info-slide",
                "content": {
                    "title": "人權保障",

                    "description": "遵循聯合國《工商企業與人權指導原則》，進行人權盡職調查，確保營運與供應鏈中無強迫勞動、童工等人權侵害，並建立申訴管道。",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg",
                        "__image_prompt__": "human rights"
                    }
                },
                "speaker_note": "GRI 408-1, 409-1, 411-1"
            },
            # 20-22. GRI 索引
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "GRI 準則索引",
                    "quote": "本報告依據 GRI 通用準則 2021 編製",

                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
                        "__image_prompt__": "index document"
                    }
                },
                "speaker_note": "GRI 索引章節"
            },
            {
                "layout_id": "general:table-info-slide",
                "content": {
                    "title": "GRI 索引 - 通用準則",
                    "tableData": {
                        "headers": ["GRI 準則", "揭露項目", "頁碼"],
                        "rows": [
                            ["GRI 2-1", "組織詳細資訊", "3, 5"],
                            ["GRI 2-7", "員工", "15"],
                            ["GRI 2-9", "治理結構與組成", "5, 7"],
                            ["GRI 2-12", "監督管理衝擊的角色", "7"],
                            ["GRI 2-22", "永續發展策略聲明", "4"],
                            ["GRI 2-23", "政策承諾", "6"]

                        ]
                    },
                    "description": "GRI 2: 一般揭露 2021"
                },
                "speaker_note": "通用準則對照"
            },
            {
                "layout_id": "general:table-info-slide",
                "content": {
                    "title": "GRI 索引 - 環境主題",
                    "tableData": {
                        "headers": ["GRI 準則", "揭露項目", "頁碼"],
                        "rows": [
                            ["GRI 302-1", "組織內部能源消耗", "10"],
                            ["GRI 303-3", "取水量", "11"],
                            ["GRI 304-1", "營運據點的生物多樣性", "13"],
                            ["GRI 305-1", "直接溫室氣體排放 (範疇一)", "9"],
                            ["GRI 305-2", "間接溫室氣體排放 (範疇二)", "9"],
                            ["GRI 306-3", "產生的廢棄物", "12"]
                        ]
                    },

                    "description": "GRI 300: 環境主題準則"

                },
                "speaker_note": "環境準則對照"
            },
            {
                "layout_id": "general:table-info-slide",
                "content": {
                    "title": "GRI 索引 - 社會主題",
                    "tableData": {
                        "headers": ["GRI 準則", "揭露項目", "頁碼"],
                        "rows": [
                            ["GRI 401-1", "新進員工和離職員工", "15"],
                            ["GRI 403-9", "職業傷害", "16"],

                            ["GRI 404-1", "每名員工平均受訓時數", "17"],
                            ["GRI 405-1", "治理單位與員工的多元化", "5, 15"],

                            ["GRI 408-1", "童工風險營運據點", "19"],

                            ["GRI 413-1", "當地社區參與", "18"]
                        ]
                    },
                    "description": "GRI 400: 社會主題準則"
                },
                "speaker_note": "社會準則對照"
            }
        ],

        "export_as": "pptx"
    }


    print(f"\n簡報標題: {import_data['title']}")
    print(f"Slides 數量: {len(import_data['slides'])}")

    layout_count = {}

    for slide in import_data['slides']:
        layout_id = slide['layout_id']
        layout_count[layout_id] = layout_count.get(layout_id, 0) + 1


    print("\n使用的 layouts:")
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


if __name__ == "__main__":
    print("=" * 60)
    print("永續報告書 V3 - 含 GRI 索引對照表")
    print("=" * 60)
    create_sustainability_report_v3()
