const urlParams = new URLSearchParams(window.location.search)
const email = urlParams.get("user_email")
const inputEmail = document.querySelector("input#yourUsername")
inputEmail.value = email