var selectPerfil = document.getElementById('Perfil');
function perfilChanged() {
    var selectedValue = selectPerfil.value;
    changedPerfil(selectedValue);
}
selectPerfil.addEventListener('change', perfilChanged);
document.getElementById('Periodo').addEventListener('blur', perfilChanged);
