# Bộ website Khai Minh

Đây là bản hoàn chỉnh để up thẳng lên GitHub Pages hoặc Netlify.

## Cấu trúc file

- `index.html`
- `styles.css`
- `script.js`
- `logo-km.png`
- `GPKD-Khai-Minh.pdf`
- `Code.gs`

## Up lên GitHub Pages

1. Upload toàn bộ các file này lên **thư mục gốc** của repo
2. Vào **Settings → Pages**
3. Chọn:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
4. Save và chờ GitHub Pages build

## Chạy local

Mở terminal tại thư mục này rồi chạy:

```bash
python3 -m http.server 5173
```

Sau đó mở:

```bash
http://localhost:5173
```

## Google Sheets

Nếu muốn lưu form đăng ký vào Google Sheets:

1. Dùng file `Code.gs` trong Google Apps Script
2. Deploy thành Web App
3. Lấy URL `/exec`
4. Mở `script.js` và sửa:

```js
const SHEETS_ENDPOINT = "PASTE_URL_HERE";
```

