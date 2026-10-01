# 帳務冒險｜會計事務所實戰

台灣會計事務所初學者的互動學習網站。63道情境題、分錄配對、五種公司型態章程核對及12部官方法規全文。中文介面，支援手機及電腦。

## 範圍

會計科目、會計憑證、勞保／就保／職災保險／健保、勞退、人資、公司法及基本稅務。核心課程不是全台所有法令、函釋、子法、地方自治規範與產業許可的完整集合。獨資合夥商業、有限合夥、外國公司、公開發行與外資設立另須擴充。

法條全文於2026-10-01直接自全國法規資料庫取得。公布／修正日期不等於施行日期，應查沿革及施行條文。情境分錄科目是教學名稱，不是統一法定軟體代碼。首版不內建未經驗證的稅率、投保級距或保費金額表。

## 開發

只需 Node 22以上與Python 3，不需npm套件。`node scripts/build.mjs`；`node --check worker/app.js`；`node scripts/verify.mjs`。預設題庫位於`content/seed.json`，修改題目後須核對所有引用條文與baselineText。網站程式由`worker/`及`scripts/build.mjs`產生Workers相容ESM。

## 持久更新與服務存取

站台保持擁有者私人權限。平台檢查登入或服務憑證後才把請求轉交Worker。R2邏輯binding CONTENT保存`content-v1.json`。沒有binding時只有預設內容，更新應明確失敗。不得將本站改成公開網站而保留無額外授權的寫入端點；如公開須先增加服務寫入權限驗證。

- `GET /api/content`讀取目前持久題庫與法規。
- `GET /api/status`確認持久儲存、更新時間、題數、失敗來源。
- `POST /api/refresh`重新抓取12部法規，寫入R2，不重建網站。必須帶`X-Requested-With: accounting-quest`。
- `PUT /api/content`依schema驗證後儲存核對完成內容，必須帶同上標頭。baselineText與已核對題目的現行條文不符時拒絕。

## 自動更新作業

雲端作業重新讀取同一個Site的get_site以取得owner-private狀態與當次服務存取憑證。僅送至該站台的`OAI-Sites-Authorization: Bearer <token>`，不可写入原始碼、檔案、排程或日誌。先GET /api/status，POST /api/refresh，再GET /api/content核對更新時間與來源狀態。只從法律官方URL讀取資料，不需要使用者第三方登入。來源失敗保留最後全文且該來源題目停止計分，下一次作業再試。

更新法條時以全文比對，變動相關題目標記needs-review，不會自動猜新答案。抓取失败、核對超過30日及變更題目不可計分。人工或具有法規核對能力的後續編輯必須確認適用日期與例外，方可更新題目baselineText及reviewedAt、恢復reviewed。

本輪分數及錯題僅為當次遊戲狀態，不做跨裝置帳號紀錄。

## GitHub與部署

GitHub位於既有儲存庫的`accounting-quest`獨立分支及`accounting-quest/`資料夾，不修改原儲值網站。Sites部署使用自己的受控Git來源。GitHub保存交付原始碼；執行期法規最新資料保存在站台持久儲存，不會由排程反寫GitHub，以免掩蓋未審核答案。
