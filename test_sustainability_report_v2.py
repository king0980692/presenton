#!/usr/bin/env python3
"""
永續報告書 (ESG Report) V2 - 30 頁簡報
使用更複雜的 layouts: 圖表、表格、團隊介紹
"""

import requests
import json

API_BASE = "http://localhost:8000/api/v1/ppt"
NEXTJS_BASE = "http://localhost:3000"


def create_sustainability_report_v2():
    """建立 30 頁永續報告書 - 使用更複雜的 layouts"""

    import_data = {
        "title": "2024 永續發展報告書 V2",
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
                        "__image_prompt__": "sustainable green forest"
                    }
                },
                "speaker_note": "歡迎閱讀 2024 年永續發展報告"
            },
            # 2. 目錄
            {
                "layout_id": "general:table-of-contents-slide",
                "content": {
                    "title": "報告目錄",
                    "sections": [
                        {"title": "公司概況與治理", "page": "3-8"},
                        {"title": "環境永續", "page": "9-16"},
                        {"title": "社會責任", "page": "17-24"},
                        {"title": "績效數據與展望", "page": "25-30"}
                    ]
                },
                "speaker_note": "報告架構概覽"
            },
            # 3. 董事長的話
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "董事長的話",
                    "quote": "永續發展是我們的核心競爭力。我們承諾在 2030 年前達成碳中和，2050 年實現淨零排放，為地球與社會創造長期價值。",
                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
                        "__image_prompt__": "business leader"
                    }
                },
                "speaker_note": "董事長對永續的承諾"
            },
            # 4. 公司概況 - 關鍵數據
            {
                "layout_id": "general:metrics-slide",
                "content": {
                    "title": "公司概況",
                    "description": "亞太區領先的科技製造企業",
                    "metrics": [
                        {"value": "25,438", "label": "全球員工"},
                        {"value": "$8.5B", "label": "年度營收"},
                        {"value": "15", "label": "營運國家"}
                    ]
                },
                "speaker_note": "公司規模與營運數據"
            },
            # 5. 永續治理架構 (使用圖表)
            {
                "layout_id": "general:chart-with-bullets-slide",
                "content": {
                    "title": "永續治理架構",
                    "description": "董事會層級的永續發展監督機制",
                    "chartData": {
                        "type": "pie",
                        "data": [
                            {"name": "環境議題", "value": 35},
                            {"name": "社會議題", "value": 35},
                            {"name": "治理議題", "value": 30}
                        ]
                    },
                    "color": "#22c55e",
                    "showLegend": True,
                    "showTooltip": True,
                    "bulletPoints": [
                        {"title": "永續發展委員會", "description": "每季召開會議，審議重大 ESG 議題", "icon": {"__icon_query__": "users"}},
                        {"title": "跨部門工作小組", "description": "推動各項永續專案與目標", "icon": {"__icon_query__": "briefcase"}},
                        {"title": "外部顧問諮詢", "description": "聘請專家提供策略建議", "icon": {"__icon_query__": "lightbulb"}}
                    ]
                },
                "speaker_note": "永續治理三層架構"
            },
            # 6. 永續發展委員會 (團隊介紹)
            {
                "layout_id": "general:team-slide",
                "content": {
                    "title": "永續發展委員會",
                    "companyDescription": "由董事會成員與高階主管組成，負責制定永續策略與監督執行成效",
                    "teamMembers": [
                        {
                            "name": "王永續",
                            "position": "委員會主席 / 董事長",
                            "description": "30 年產業經驗，推動公司永續轉型",
                            "image": {"__image_url__": "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg", "__image_prompt__": "business executive male"}
                        },
                        {
                            "name": "李環境",
                            "position": "環境長 (Chief Environment Officer)",
                            "description": "環境工程博士，主導碳中和策略",
                            "image": {"__image_url__": "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg", "__image_prompt__": "professional woman executive"}
                        },
                        {
                            "name": "張社會",
                            "position": "人資長 (CHRO)",
                            "description": "負責員工發展與社會參與計畫",
                            "image": {"__image_url__": "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg", "__image_prompt__": "HR executive professional"}
                        },
                        {
                            "name": "陳治理",
                            "position": "法務長 (CLO)",
                            "description": "確保公司治理與法規遵循",
                            "image": {"__image_url__": "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg", "__image_prompt__": "legal executive professional"}
                        }
                    ]
                },
                "speaker_note": "介紹永續委員會核心成員"
            },
            # 7. 重大性議題矩陣 (表格)
            {
                "layout_id": "general:table-info-slide",
                "content": {
                    "title": "重大性議題分析",
                    "tableData": {
                        "headers": ["議題類別", "重大議題", "影響程度", "管理方針"],
                        "rows": [
                            ["環境", "氣候變遷", "極高", "SBTi 減碳目標"],
                            ["環境", "能源管理", "高", "RE100 承諾"],
                            ["社會", "人才發展", "極高", "人才培育計畫"],
                            ["社會", "職業安全", "高", "零災害目標"],
                            ["治理", "商業倫理", "極高", "誠信經營守則"]
                        ]
                    },
                    "description": "透過利害關係人議合與內部評估，識別出 15 項重大永續議題"
                },
                "speaker_note": "說明重大性議題鑑別結果"
            },
            # 8. SDGs 對應
            {
                "layout_id": "general:bullet-icons-only-slide",
                "content": {
                    "title": "聯合國永續發展目標 (SDGs)",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/7656742/pexels-photo-7656742.jpeg",
                        "__image_prompt__": "sustainable development goals"
                    },
                    "bullets": [
                        {"title": "SDG 7 可負擔能源", "description": "2030 年 100% 使用再生能源", "icon": {"__icon_query__": "sun"}},
                        {"title": "SDG 8 就業與經濟", "description": "創造 5,000 個綠色工作機會", "icon": {"__icon_query__": "briefcase"}},
                        {"title": "SDG 12 責任消費", "description": "產品 90% 可回收材料", "icon": {"__icon_query__": "recycle"}},
                        {"title": "SDG 13 氣候行動", "description": "2030 年碳中和、2050 年淨零", "icon": {"__icon_query__": "globe"}}
                    ]
                },
                "speaker_note": "與 SDGs 的連結"
            },

            # ==================== 環境永續 ====================
            # 9. 環境章節封面
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "環境永續",
                    "quote": "守護地球，是我們對未來世代的承諾",
                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
                        "__image_prompt__": "green environment"
                    }
                },
                "speaker_note": "進入環境章節"
            },
            # 10. 環境績效總覽
            {
                "layout_id": "general:metrics-slide",
                "content": {
                    "title": "環境績效總覽",
                    "description": "2024 年環境保護關鍵成果",
                    "metrics": [
                        {"value": "-32%", "label": "碳排放減少"},
                        {"value": "45%", "label": "再生能源比例"},
                        {"value": "92%", "label": "廢棄物回收率"}
                    ]
                },
                "speaker_note": "環境績效 KPI"
            },
            # 11. 碳排放趨勢 (圖表)
            {
                "layout_id": "general:chart-with-bullets-slide",
                "content": {
                    "title": "碳排放趨勢",
                    "description": "近五年溫室氣體排放量持續下降 (萬噸 CO2e)",
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
                    "color": "#3b82f6",
                    "showLegend": False,
                    "showTooltip": True,
                    "bulletPoints": [
                        {"title": "範疇一減量", "description": "製程改善減少直接排放 28%", "icon": {"__icon_query__": "factory"}},
                        {"title": "範疇二減量", "description": "綠電採購降低間接排放 45%", "icon": {"__icon_query__": "zap"}},
                        {"title": "範疇三管理", "description": "供應鏈碳盤查涵蓋率 80%", "icon": {"__icon_query__": "truck"}}
                    ]
                },
                "speaker_note": "碳排放逐年下降趨勢"
            },
            # 12. 能源使用結構 (圖表)
            {
                "layout_id": "general:chart-with-bullets-slide",
                "content": {
                    "title": "能源使用結構",
                    "description": "再生能源佔比持續提升",
                    "chartData": {
                        "type": "pie",
                        "data": [
                            {"name": "太陽能", "value": 25},
                            {"name": "風電採購", "value": 15},
                            {"name": "綠電憑證", "value": 5},
                            {"name": "傳統電力", "value": 55}
                        ]
                    },
                    "color": "#f59e0b",
                    "showLegend": True,
                    "showTooltip": True,
                    "bulletPoints": [
                        {"title": "50MW 太陽能", "description": "廠區屋頂全面設置太陽能板", "icon": {"__icon_query__": "sun"}},
                        {"title": "PPA 簽訂", "description": "與風電業者簽訂 10 年購電協議", "icon": {"__icon_query__": "wind"}},
                        {"title": "2030 目標", "description": "達成 RE100，100% 再生能源", "icon": {"__icon_query__": "target"}}
                    ]
                },
                "speaker_note": "能源轉型進度"
            },
            # 13. 水資源管理 (表格)
            {
                "layout_id": "general:table-info-slide",
                "content": {
                    "title": "水資源管理績效",
                    "tableData": {
                        "headers": ["指標", "2022", "2023", "2024", "目標"],
                        "rows": [
                            ["總取水量 (萬噸)", "250", "235", "218", "200"],
                            ["回收水量 (萬噸)", "150", "165", "185", "200"],
                            ["回收率 (%)", "60%", "70%", "85%", "90%"],
                            ["單位產品耗水", "2.5L", "2.2L", "1.8L", "1.5L"]
                        ]
                    },
                    "description": "透過製程改善與水回收系統，持續降低水資源消耗"
                },
                "speaker_note": "水資源績效數據"
            },
            # 14. 廢棄物管理
            {
                "layout_id": "general:bullet-with-icons-slide",
                "content": {
                    "title": "循環經濟與廢棄物管理",
                    "description": "朝向零廢棄目標邁進",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg",
                        "__image_prompt__": "recycling"
                    },
                    "bullets": [
                        {"title": "源頭減量", "description": "包材減量 25%，導入可重複使用容器", "icon": {"__icon_query__": "package"}},
                        {"title": "資源循環", "description": "92% 廢棄物資源化，創造循環價值", "icon": {"__icon_query__": "recycle"}},
                        {"title": "零掩埋", "description": "2025 年達成零廢棄掩埋目標", "icon": {"__icon_query__": "check"}}
                    ]
                },
                "speaker_note": "廢棄物管理策略"
            },
            # 15. 產品碳足跡
            {
                "layout_id": "general:metrics-with-image-slide",
                "content": {
                    "title": "產品碳足跡",
                    "description": "透過生命週期評估，降低產品環境衝擊",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg",
                        "__image_prompt__": "product lifecycle"
                    },
                    "metrics": [
                        {"value": "-25%", "label": "產品碳足跡降低"},
                        {"value": "85%", "label": "可回收材料比例"},
                        {"value": "12", "label": "綠色產品認證數"}
                    ]
                },
                "speaker_note": "產品環境績效"
            },
            # 16. 環境投資
            {
                "layout_id": "general:numbered-bullets-slide",
                "content": {
                    "title": "環境投資計畫",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg",
                        "__image_prompt__": "green investment"
                    },
                    "bullets": [
                        {"title": "綠色廠房", "description": "投資 $50M 建置零碳示範工廠"},
                        {"title": "節能設備", "description": "汰換高耗能設備，年省電 15%"},
                        {"title": "電動車隊", "description": "公務車全面電動化，設置充電站"},
                        {"title": "碳捕捉", "description": "試行碳捕捉技術，評估大規模應用"}
                    ]
                },
                "speaker_note": "未來環境投資規劃"
            },

            # ==================== 社會責任 ====================
            # 17. 社會章節封面
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
                "speaker_note": "進入社會章節"
            },
            # 18. 員工結構 (圖表)
            {
                "layout_id": "general:chart-with-bullets-slide",
                "content": {
                    "title": "員工結構分析",
                    "description": "打造多元共融的工作環境",
                    "chartData": {
                        "type": "pie",
                        "data": [
                            {"name": "研發人員", "value": 35},
                            {"name": "製造人員", "value": 40},
                            {"name": "業務行銷", "value": 15},
                            {"name": "管理行政", "value": 10}
                        ]
                    },
                    "color": "#8b5cf6",
                    "showLegend": True,
                    "showTooltip": True,
                    "bulletPoints": [
                        {"title": "42% 女性員工", "description": "持續提升女性佔比與晉升機會", "icon": {"__icon_query__": "users"}},
                        {"title": "35% 女性主管", "description": "培育女性領導人才", "icon": {"__icon_query__": "star"}},
                        {"title": "4.2 滿意度", "description": "員工滿意度調查 (滿分 5)", "icon": {"__icon_query__": "heart"}}
                    ]
                },
                "speaker_note": "員工結構與多元性"
            },
            # 19. 人才發展 (表格)
            {
                "layout_id": "general:table-info-slide",
                "content": {
                    "title": "人才發展投資",
                    "tableData": {
                        "headers": ["培訓類別", "時數", "人次", "投資金額"],
                        "rows": [
                            ["專業技能", "180,000", "8,500", "$5M"],
                            ["領導力發展", "45,000", "1,200", "$3M"],
                            ["數位轉型", "65,000", "4,500", "$4M"],
                            ["永續素養", "32,000", "12,000", "$2M"],
                            ["新人訓練", "28,000", "2,300", "$1M"]
                        ]
                    },
                    "description": "年度總投資 $15M，人均訓練時數 48 小時"
                },
                "speaker_note": "人才培訓投資詳情"
            },
            # 20. 職業安全
            {
                "layout_id": "general:metrics-slide",
                "content": {
                    "title": "職業安全衛生",
                    "description": "零災害、零職災是我們的目標",
                    "metrics": [
                        {"value": "0", "label": "重大職災事件"},
                        {"value": "0.12", "label": "總傷害率 (TRIR)"},
                        {"value": "500+", "label": "無災害工作日"}
                    ]
                },
                "speaker_note": "安全績效指標"
            },
            # 21. 員工福利
            {
                "layout_id": "general:bullet-icons-only-slide",
                "content": {
                    "title": "員工福利制度",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
                        "__image_prompt__": "happy employees"
                    },
                    "bullets": [
                        {"title": "彈性工作", "description": "混合辦公、彈性工時、遠距工作", "icon": {"__icon_query__": "home"}},
                        {"title": "健康照護", "description": "免費健檢、心理諮商、健身補助", "icon": {"__icon_query__": "heart"}},
                        {"title": "家庭支持", "description": "優於法令育嬰假、托嬰補助", "icon": {"__icon_query__": "users"}},
                        {"title": "財務規劃", "description": "員工持股、退休金提撥 8%", "icon": {"__icon_query__": "dollar"}}
                    ]
                },
                "speaker_note": "完善的員工福利"
            },
            # 22. 社會公益投入 (圖表)
            {
                "layout_id": "general:chart-with-bullets-slide",
                "content": {
                    "title": "社會公益投入",
                    "description": "2024 年公益投入超過 $20M",
                    "chartData": {
                        "type": "bar",
                        "data": [
                            {"name": "教育扶植", "value": 8},
                            {"name": "環境保護", "value": 5},
                            {"name": "弱勢關懷", "value": 4},
                            {"name": "社區營造", "value": 2},
                            {"name": "災害救助", "value": 1}
                        ]
                    },
                    "color": "#ec4899",
                    "showLegend": False,
                    "showTooltip": True,
                    "bulletPoints": [
                        {"title": "10萬+受惠人次", "description": "公益活動觸及超過十萬人", "icon": {"__icon_query__": "users"}},
                        {"title": "5,000志工時數", "description": "員工志工參與熱情高漲", "icon": {"__icon_query__": "hand"}},
                        {"title": "100+合作夥伴", "description": "與 NGO 及政府單位協力", "icon": {"__icon_query__": "handshake"}}
                    ]
                },
                "speaker_note": "公益投入分布"
            },
            # 23. 供應鏈管理
            {
                "layout_id": "general:numbered-bullets-slide",
                "content": {
                    "title": "永續供應鏈管理",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg",
                        "__image_prompt__": "supply chain"
                    },
                    "bullets": [
                        {"title": "供應商行為準則", "description": "100% 供應商簽署永續承諾"},
                        {"title": "ESG 風險評估", "description": "年度評鑑涵蓋 500+ 供應商"},
                        {"title": "現場稽核", "description": "高風險供應商 100% 實地稽核"},
                        {"title": "能力建構", "description": "舉辦永續供應鏈論壇與培訓"}
                    ]
                },
                "speaker_note": "供應鏈永續管理"
            },
            # 24. 人權保障
            {
                "layout_id": "general:basic-info-slide",
                "content": {
                    "title": "人權政策與保障",
                    "description": "遵循聯合國《工商企業與人權指導原則》，制定人權政策，進行人權盡職調查，確保營運與供應鏈中無強迫勞動、童工等人權侵害。",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg",
                        "__image_prompt__": "human rights"
                    }
                },
                "speaker_note": "人權政策說明"
            },

            # ==================== 績效與展望 ====================
            # 25. 治理績效
            {
                "layout_id": "general:metrics-slide",
                "content": {
                    "title": "公司治理績效",
                    "description": "透明、誠信的治理機制",
                    "metrics": [
                        {"value": "44%", "label": "獨立董事比例"},
                        {"value": "33%", "label": "女性董事比例"},
                        {"value": "100%", "label": "董事會出席率"}
                    ]
                },
                "speaker_note": "治理指標"
            },
            # 26. ESG 評等 (表格)
            {
                "layout_id": "general:table-info-slide",
                "content": {
                    "title": "ESG 外部評等",
                    "tableData": {
                        "headers": ["評等機構", "2022", "2023", "2024"],
                        "rows": [
                            ["CDP 氣候變遷", "B", "A-", "A"],
                            ["CDP 水安全", "B", "B", "A"],
                            ["MSCI ESG", "A", "A", "AA"],
                            ["DJSI", "入選", "入選", "入選"],
                            ["公司治理評鑑", "前20%", "前10%", "前5%"]
                        ]
                    },
                    "description": "持續提升 ESG 表現，獲得國際評等機構肯定"
                },
                "speaker_note": "外部評等進步"
            },
            # 27. 年度亮點
            {
                "layout_id": "general:bullet-icons-only-slide",
                "content": {
                    "title": "2024 年度亮點",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg",
                        "__image_prompt__": "achievement"
                    },
                    "bullets": [
                        {"title": "CDP 雙 A 評等", "description": "氣候變遷與水安全皆獲 A 級", "icon": {"__icon_query__": "award"}},
                        {"title": "DJSI 成分股", "description": "連續五年入選道瓊永續指數", "icon": {"__icon_query__": "trending-up"}},
                        {"title": "亞洲最佳雇主", "description": "獲選亞洲最佳雇主前 50 強", "icon": {"__icon_query__": "star"}},
                        {"title": "綠色工廠認證", "description": "三座廠區獲國家級認證", "icon": {"__icon_query__": "check-circle"}}
                    ]
                },
                "speaker_note": "重要獲獎肯定"
            },
            # 28. 永續目標進度 (圖表)
            {
                "layout_id": "general:chart-with-bullets-slide",
                "content": {
                    "title": "永續目標達成進度",
                    "description": "各項 2030 目標執行進度",
                    "chartData": {
                        "type": "bar",
                        "data": [
                            {"name": "碳中和", "value": 65},
                            {"name": "RE100", "value": 45},
                            {"name": "零廢棄", "value": 80},
                            {"name": "女性主管", "value": 70}
                        ]
                    },
                    "color": "#10b981",
                    "showLegend": False,
                    "showTooltip": True,
                    "bulletPoints": [
                        {"title": "2030 碳中和", "description": "進度 65%，預計提前達成", "icon": {"__icon_query__": "leaf"}},
                        {"title": "RE100 承諾", "description": "進度 45%，加速綠電採購", "icon": {"__icon_query__": "zap"}},
                        {"title": "零廢棄掩埋", "description": "進度 80%，2025 可達成", "icon": {"__icon_query__": "trash"}}
                    ]
                },
                "speaker_note": "目標達成進度"
            },
            # 29. 未來策略
            {
                "layout_id": "general:numbered-bullets-slide",
                "content": {
                    "title": "2025-2030 永續策略",
                    "image": {
                        "__image_url__": "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
                        "__image_prompt__": "future strategy"
                    },
                    "bullets": [
                        {"title": "淨零轉型", "description": "2030 碳中和、2050 淨零排放"},
                        {"title": "循環經濟", "description": "產品 100% 可回收設計"},
                        {"title": "多元共融", "description": "女性主管比例達 50%"},
                        {"title": "價值共創", "description": "供應鏈 ESG 全面升級"}
                    ]
                },
                "speaker_note": "未來五年策略方向"
            },
            # 30. 結語
            {
                "layout_id": "general:quote-slide",
                "content": {
                    "heading": "攜手共創永續未來",
                    "quote": "感謝您閱讀本報告。永續是一段持續的旅程，我們誠摯邀請所有利害關係人與我們一同前行，為地球與社會創造更美好的明天。",
                    "background_image": {
                        "__image_url__": "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg",
                        "__image_prompt__": "sunset future hope"
                    }
                },
                "speaker_note": "感謝閱讀"
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

    print(f"\n複雜 layouts 使用:")
    complex_layouts = ['chart-with-bullets-slide', 'table-info-slide', 'team-slide']
    for cl in complex_layouts:
        full_id = f"general:{cl}"
        if full_id in layout_count:
            print(f"  ✓ {cl}: {layout_count[full_id]} 頁")

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
    print("永續報告書 V2 - 使用複雜 Layouts")
    print("(圖表、表格、團隊介紹)")
    print("=" * 60)
    create_sustainability_report_v2()


if __name__ == "__main__":
    main()
