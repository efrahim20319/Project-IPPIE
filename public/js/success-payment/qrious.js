console.log("UUJD");
const url = window.location.href;
var qrcode = new QRious({
  element: document.getElementById("qrcode-2"),
  background: "#ffffff",
  backgroundAlpha: 1,
  foreground: "#000000",
  foregroundAlpha: 1,
  level: "H",
  padding: 0,
  size: 2048,
  value: url,
});