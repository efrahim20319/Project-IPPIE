const ancora = document.querySelector('a#qr-link')
const printBtn = document.querySelector('.print-btn')
ancora.setAttribute('href', window.location.href)

printBtn.addEventListener('click', () => {
    window.print()
})