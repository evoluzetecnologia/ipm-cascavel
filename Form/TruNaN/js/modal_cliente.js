document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal_cliente');
	
    fetch('html/modal_cliente.html')
    .then(response => response.text())
    .then(html => {
        modal.innerHTML = html;
    })
    .catch(error => console.log('Erro Modal Cliente:', error));

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

        // Verifica se o evento foi acionado por um input com o ID "CNPJ"
        if (target.id === 'CODIGO') {
            capturarInformacoes(target.value, null)
        } else if (target.id === 'CODIGO' || target.id === 'CNPJ') {
            capturarInformacoes(null, target.value)
        }
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

function repetirAutomacao(repetir) {
    if (document.getElementById('easterEgg').innerText === 'Parcial') {
        var modal = document.getElementById('repetirRotinaModal');
        if (repetir === null && document.getElementById('RepetirAutomacao').innerText === 'False') {
            modal.style.display = 'block';
        } else if (repetir === true) {
            modal.style.display = 'none';
            document.getElementById('RepetirAutomacao').innerText = 'True';
            document.getElementById('easterEgg').innerText = 'Entregue o seu caminho ao Senhor; Confie nele e ele agirá';
            changedPerfil(document.getElementById('Perfil').value);
        } else if (repetir === false) {
            modal.style.display = 'none';
            document.getElementById('RepetirAutomacao').innerText = 'False';
            document.getElementById('easterEgg').innerText = 'Entregue o seu caminho ao Senhor; Confie nele e ele agirá';
            changedPerfil(document.getElementById('Perfil').value);
        }
    }
}


function capturarInformacoes(codigo, cnpj) {
	if (codigo !== '' && codigo !== null && codigo !== undefined){
		 buscarCliente(codigo);
	} else if (cnpj !== '' && cnpj !== null && cnpj !== undefined){
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

/*
document.getElementById('SITUACAO').addEventListener('change', function() {
if (this.checked) {
document.querySelector('label[for="SITUACAO"]').textContent = 'Ativo';
} else {
document.querySelector('label[for="SITUACAO"]').textContent = 'Inativo';
}
});
*/
