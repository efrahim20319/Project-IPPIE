const form = document.querySelector(".form-mensagem")

form.addEventListener("submit", function(event){
    event.preventDefault()
    showSwal('success-message')
})