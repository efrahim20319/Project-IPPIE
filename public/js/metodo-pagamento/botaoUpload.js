const botao = document.querySelector("button#upload-express");
const email = window.localStorage.getItem("ippie_user_email");
botao.addEventListener("click", () => {
  window.location = `/comprovativoUpload?email=${email}`;
});
