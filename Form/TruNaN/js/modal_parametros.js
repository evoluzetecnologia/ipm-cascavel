document.addEventListener('DOMContentLoaded', function () {

    const modal = document.getElementById('modal_parametros');
    fetch('html/modal_parametros.html')
    .then(response => response.text())
    .then(html => {
        modal.innerHTML = html;
    })
    .catch(error => console.log('Erro Modal Parametros:', error));

});