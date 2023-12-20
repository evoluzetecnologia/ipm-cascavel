function iniciarAutomacao() {

    var jsonClientes = []; // Array para armazenar os objetos JSON de cada linha
    $('table tr').each(function () {
        var row = $(this);
        var ID_CLIENTE = row.find("#ID_EXECUTAR").val();
        if (ID_CLIENTE) {
            var rowValues = {
                'ID_CLIENTE': ID_CLIENTE,
                'PENDENCIA': row.find(".PendenciaInput").attr('name'),
                'EXECUTAR': row.find(".ProcessCheckbox").is(":checked")
            };
            jsonClientes.push(rowValues);
        }
    });

    var jsonAutomacao = jsonParametros();

    var jsonData = {
        "Automacao": jsonAutomacao,
        "Clientes": jsonClientes
    };

    var jsonString = JSON.stringify(jsonData);

    uiPathApi.sendMessage("start", jsonString);
}

function addNovoPerfilClicked() {
    var perfilNome = document.getElementById("novoPerfil").value;

    if (perfilNome !== null && perfilNome !== '') {
        var jsonData = {
            "Perfil": perfilNome
        }
        var jsonString = JSON.stringify(jsonData);
        uiPathApi.sendMessage("addPerfil", jsonString);
    }
    perfilNome.value = '';
}

function atualizaPerfil(value) {
    var jsonData = [];
    var tbody = document.getElementById('myTablePerfil');
    var rows = tbody.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var ID_PERFIL = row.querySelector('input[id^="ID_PERFIL_"]').value;
        var PERFIL = row.querySelector('input[id^="PERFIL_"]').value;
        var SITUACAO = row.querySelector('input[id^="SITUACAO_"]').checked;

        var rowValues = {
            'ID_PERFIL': ID_PERFIL,
            'PERFIL': PERFIL,
            'SITUACAO': SITUACAO
        };
        if (ID_PERFIL) {
            jsonData.push(rowValues);
        }
    }
    var jsonResult = JSON.stringify(jsonData);
    uiPathApi.sendMessage("atualizarPerfil", jsonResult);
}

function fecharAutomacao() {
    uiPathApi.sendMessage("close");
}

function changedPerfil(perfil) {
    showLoading();
    var jsonDataObj = jsonParametros();
    jsonDataObj['Perfil'] = perfil;
    var jsonString = JSON.stringify(jsonDataObj);
    uiPathApi.sendMessage("perfil", jsonString);
}

function salvarParametros() {
    var jsonString = JSON.stringify(jsonParametros());
    uiPathApi.sendMessage("save", jsonString);
}

function salvarDominio() {
    var jsonDominio = {
        "Perfil": document.getElementById("Perfil").value,
        "DominioLogin": document.getElementById("DominioLogin").value,
        "DominioPassword": document.getElementById("DominioPassword").value
    };
    uiPathApi.sendMessage("dominio", jsonDominio);
}
function buscarCliente(valor) {

    if (valor !== null && valor !== '') {
        var codigoInput = document.getElementById('CODIGO').value;
        var cnpjInput = document.getElementById('CNPJ').value;

        var jsonData = {
            "var": valor,
            "CODIGO": codigoInput,
            "CNPJ": cnpjInput
        }
        var jsonString = JSON.stringify(jsonData);
        //alert(jsonString);
        uiPathApi.sendMessage("buscarCliente", jsonString);

    }
}

function excluirCliente() {
    showLoading();
	var jsonString = jsonCliente();
    limparModalCliente();
    uiPathApi.sendMessage("excluirCliente", jsonString);
}

function salvarCliente() {
    uiPathApi.sendMessage("salvarCliente", jsonCliente());
    limparModalCliente();
}

function importarClientes() {
    showLoading();
	limparModalCliente();
    document.getElementById("divClienteCadastro").style.display = "none";
    document.getElementById("divClienteImportar").style.display = "block";
    uiPathApi.sendMessage("importarClientes");
}

function adicionarCliente(valor) {
    showLoading();
	var jsonData = {
        "CODIGO": valor
    }
    var jsonString = JSON.stringify(jsonData);
    //alert(jsonString);
    uiPathApi.sendMessage("adicionarCliente", jsonString);
}

function repetirCliente(id, tipo) {
    var tipos = ['Parcial', 'Todos', 'Nenhum'];
    if (tipo === null) {
        for (var i = 0; i < tipos.length; i++) {
            var checkboxes = document.getElementsByName(id + tipos[i]);
            var observacao = document.getElementById('ID_OBSERVACAO_' + id);
            if (checkboxes.length > 0) {
                var checkbox = checkboxes[0];
                checkbox.indeterminate = false;
                if (checkbox.checked) {
                    tipo = 'Todos';
                    checkbox.name = id + 'Todos';
                    observacao.style.display = 'block';
                } else {
                    tipo = 'Nenhum';
                    checkbox.name = id + 'Nenhum';
                    observacao.style.display = 'none';
                }
                break;
            }
        }
    }

    var jsonData = {
        "ID_CLIENTE": id,
        "PENDENCIA": tipo
    }
    var jsonString = JSON.stringify(jsonData);
    //alert(jsonString);
    uiPathApi.sendMessage("repetirCliente", jsonString);
}
