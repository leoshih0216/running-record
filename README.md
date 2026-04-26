# 🏃 慢跑紀錄 (Running Record)

個人用慢跑紀錄工具，純前端 PWA、零後端、零成本。

## 功能

- **手機記錄**：日期、時間、距離、時長、心情、路線、備註
- **自動計算**：配速 (min/km)、平均速度 (km/h)
- **歷史查看**：依月份篩選、可編輯/刪除
- **統計圖表**：近 30 天每日距離、近 6 個月里程、最佳成績、連續天數
- **JSON 匯出/匯入**：跨裝置備份還原
- **PWA**：可加入手機主畫面、離線可用
- **深色模式**：跟隨系統

## 檔案

| 檔案 | 用途 |
|------|------|
| `index.html` | 主程式（HTML + CSS + JS 全在一檔）|
| `manifest.webmanifest` | PWA 設定（圖示、主題色、可安裝）|
| `sw.js` | Service Worker（離線快取）|

## 使用方式

### 本機開啟（最簡單）
直接雙擊 `index.html` 用瀏覽器開啟即可使用。
> 注意：以 `file://` 協定打開時 Service Worker 不會啟用，但 localStorage 仍可正常記錄。

### 本機伺服器（建議，可啟用 PWA）
```bash
cd "C:/Users/Leo Shih/.claude/workspace/running record"
python -m http.server 8080
# 用瀏覽器開 http://localhost:8080
```

### 手機使用（推薦）
1. 把這三個檔案上傳到任意靜態主機（GitHub Pages、Netlify、Cloudflare Pages、Vercel 都免費）
2. 用手機瀏覽器開啟網址
3. **iOS Safari**：分享 → 加入主畫面
4. **Android Chrome**：選單 → 安裝應用程式 / 加到主畫面
5. 開啟後就像 App 一樣使用，資料儲存於該手機

### GitHub Pages 部署（最快）
```bash
cd "C:/Users/Leo Shih/.claude/workspace/running record"
git init
git add .
git commit -m "init running record PWA"
gh repo create running-record --public --source=. --push
gh api -X POST repos/{owner}/running-record/pages -f source[branch]=main -f source[path]=/
```

## 資料儲存

- 全部存在瀏覽器 `localStorage`（key: `jog_records_v1`）
- 換手機 / 清瀏覽器資料前 → **務必到「設定 → 匯出 JSON」備份**
- 跨裝置使用 → 在新裝置點「匯入 JSON」即可

## 資料結構

```json
{
  "id": "uniq",
  "date": "2026-04-26",
  "time": "07:30",
  "distance": 5.2,
  "duration": 1710,
  "mood": "🙂 不錯",
  "route": "河濱公園",
  "note": "晨跑天氣好",
  "createdAt": 1745627123456
}
```

`duration` 單位是秒。

## 隱私

- 全部資料只在你的瀏覽器，不會上傳任何伺服器
- 沒有追蹤、沒有分析、沒有第三方
