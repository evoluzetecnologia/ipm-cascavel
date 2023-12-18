document.addEventListener('DOMContentLoaded', function () {
    const modalRepetir = document.getElementById('modal_repetir_automacao');
    fetch('html/modal_repetir.html')
    .then(response => response.text())
    .then(html => {
        modalRepetir.innerHTML = html;
    })
    .catch(error => console.log('Erro Modal Repetir Automacao:', error));

    const modalDominio = document.getElementById('modal_dominio');
    fetch('html/modal_dominio.html')
    .then(response => response.text())
    .then(html => {
        modalDominio.innerHTML = html;
    })
    .catch(error => console.log('Erro Modal Dominio:', error));
});