const btnMobile = document.getElementById('btn-menu-mobile');

function toggleMenu(event){
    const menu = document.querySelector('ul.cabecalho_list');
    menu.classList.toggle('active');
    btnMobile.classList.toggle('action')
}
btnMobile.addEventListener('click', toggleMenu);