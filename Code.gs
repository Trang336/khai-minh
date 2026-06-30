/**
 * Google Apps Script - lưu đăng ký (Lead) vào Google Sheets
 *
 * Cách dùng (khuyến nghị):
 * 1) Tạo Google Sheet → Extensions → Apps Script
 * 2) Dán toàn bộ file này vào Code.gs
 * 3) Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4) Copy URL /exec và dán vào `assets/script.js` (SHEETS_ENDPOINT)
 */

// (Tuỳ chọn) Nếu bạn deploy dạng Standalone script, hãy dán Spreadsheet ID vào đây.
// Nếu script được tạo "trong Google Sheet" (bound script) thì để rỗng là được.
var SPREADSHEET_ID = ""; // ví dụ: "1AbC...xyz"
var SHEET_NAME = "Leads";

function _getSheet_() {
  var ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  // Tạo header nếu sheet còn trống
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Timestamp", "Name", "Phone", "Email", "Service", "Message", "Source"]);
  }
  return sh;
}

function _safe_(v) {
  return (v === undefined || v === null) ? "" : String(v);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var sh = _getSheet_();

    sh.appendRow([
      new Date(),
      _safe_(p.name),
      _safe_(p.phone),
      _safe_(p.email),
      _safe_(p.service),
      _safe_(p.message),
      _safe_(p.source)
    ]);

    // Trả "ok" để dễ debug khi test bằng Postman/cURL.
    return ContentService
      .createTextOutput("ok")
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService
      .createTextOutput("error: " + err)
      .setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}

// (Tuỳ chọn) doGet để kiểm tra Web App đang hoạt động
function doGet() {
  return ContentService
    .createTextOutput("Khai Minh Web App is running")
    .setMimeType(ContentService.MimeType.TEXT);
}

