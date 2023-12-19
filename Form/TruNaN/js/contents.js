document.addEventListener('DOMContentLoaded', function () {

    var data = ['header', 'menu', 'modal_repetir_automacao', 'modal_parametros', 'modal_dominio', 'modal_perfil', 'footer', 'modal_cliente'];

    data.forEach(function (item) {
        const modal = document.getElementById(item);
        fetch('html/' + item + '.html')
        .then(response => response.text())
        .then(html => {
            modal.innerHTML = html;
            if (item === 'header' || item === 'menu') {
                modal.addEventListener('change', function (event) {
                    const target = event.target;
                    if (target.id === 'Perfil' || target.id === 'DownloadSaida' || target.id === 'DownloadEntrada' || target.id === 'ProtocolarSaida' || target.id === 'ProtocolarEntrada' || target.id === 'SimplesNacional' || target.id === 'SolicitacaoCancelamento') {
                        perfilChanged();
                        console.log('Input ' + target.id + ' mudou para:', target.value);
                    }
                });
            }
            if (item === 'header' || item === 'modal_cliente') {

                modal.addEventListener('keydown', function (event) {
                    const target = event.target;
                    if (target.id === 'Periodo') {
                        if (isNaN(event.key) && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) {
                            event.preventDefault();
                            return;
                        }
                        // Se a tecla pressionada é um número, substitui o primeiro número à direita da posição do cursor
                        if (!isNaN(event.key)) {
                            const cursorPosition = target.selectionStart; // Obtém a posição do cursor
                            let inputValue = target.value;
                            console.log(inputValue);
                            let newValue = inputValue.split('');
                            // Substitui o primeiro número à direita da posição do cursor pelo dígito digitado
                            let found = false;
                            let nextNumPos = cursorPosition;
                            for (let i = cursorPosition; i < newValue.length; i++) {
                                if (!isNaN(newValue[i])) {
                                    newValue[i] = event.key;
                                    found = true;
                                    nextNumPos = i;
                                    break;
                                }
                            }
                            // Atualiza o valor no campo de texto
                            target.value = newValue.join('');
                            // Move o cursor para a posição à frente do próximo número
                            if (found) {
                                target.setSelectionRange(nextNumPos + 1, nextNumPos + 1);
                            }
                            // Previne a ação padrão do evento
                            event.preventDefault();
                        }
                    }
                });

                modal.addEventListener('input', function (event) {
                    const target = event.target;
                    if (target.id === 'CNPJ') {
                        var valor = target.value.replace(/\D/g, '');
                        if (valor.length === 11) {
                            // CPF
                            if (validarCpf(valor)) {
                                target.value = aplicarMascaraCpf(valor);
                            }
                        } else if (valor.length > 13) {
                            // CNPJ
                            if (validarCnpj(valor)) {
                                target.value = aplicarMascaraCnpj(valor);
                            } else {
                                target.value = 'CNPJ Inválido';
                            }
                        }
                        console.log('Input ' + target.id + ' digitou :', target.value);
                    }
                });
                modal.addEventListener('focusout', function (event) {
                    const target = event.target;

                    if (target.id === 'Periodo') {
                        perfilChanged();
                    } else if (target.id === 'CODIGO') {
                        capturarInformacoes(target.value, null)
                    } else if (target.id === 'CNPJ') {
                        capturarInformacoes(null, target.value)
                    }
                });
            }
        })
        .catch(error => console.log('Erro content ' + item + ':', error));

    });
});

function limparFormCliente(data) {
    if (data !== null) {
        var data = JSON.parse(data);

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var el = document.getElementById(key);
                if (el) {
                    if (el.tagName === 'INPUT' && el.type === 'radio') {
                        el.checked = data[key];
                    } else {
                        el.value = '';
                        el.disabled = data[key];
                    }
                }
            }
        }
    }
    document.getElementById("ID_CLIENTE").value = '0';
    document.getElementById("CODIGO").value = '';
    document.getElementById("CNPJ").value = '';
    //document.getElementById("SITUACAO").checked = true;
    //document.querySelector('label[for="SITUACAO"]').textContent = "Ativo";
    document.getElementById("NOME").value = '';
    document.getElementById("EMPRESA").value = '';
    document.getElementById("REGIME_TRIBUTARIO").value = '';

    document.getElementById("ExcluirCliente").disabled = true;
    document.getElementById("SalvarCliente").disabled = true;

    document.getElementById("divClienteCadastro").style.display = "block";
    document.getElementById("divClienteImportar").style.display = "none";
}

function capturarInformacoes(codigo, cnpj) {
    if (codigo !== '' && codigo !== null && codigo !== undefined) {
        buscarCliente(codigo);
    } else if (cnpj !== '' && cnpj !== null && cnpj !== undefined) {
        inputValue = cnpj.replace(/\D/g, '');
        if (inputValue.length === 11) {
            if (validarCpf(inputValue)) {
                //console.log(cnpj);
                document.getElementById("SalvarCliente").disabled = false;
                buscarCliente(cnpj);
            } else {
                document.getElementById("SalvarCliente").disabled = true;
            }
        } else if (inputValue.length === 14) {
            if (validarCnpj(inputValue)) {
                //console.log(cnpj);
                document.getElementById("SalvarCliente").disabled = false;
                buscarCliente(cnpj);
            } else {
                document.getElementById("SalvarCliente").disabled = true;
            }
        }
    } else {
        document.getElementById("SalvarCliente").disabled = true;
    }

    return;
}

function perfilChanged() {
    changedPerfil(document.getElementById('Perfil').value);
}
