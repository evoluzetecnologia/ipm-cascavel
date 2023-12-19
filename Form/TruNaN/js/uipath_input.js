function inArrayJson(value, campos) {
    var jsonData = value;
    var data = JSON.parse(jsonData);
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var el = document.getElementById(key);
            if (el == null) {
                var elements = document.querySelectorAll('[name="' + key + '"]');
                el = elements[0];
            }
            if (el) {
                if (el.type === 'radio' || el.type === 'checkbox') {
                    el.checked = data[key];
                    if (key === 'FiltrarClientesPendentes') {
                        //label.textContent = data[key] ? 'Clientes Pendentes' : 'Todos os Clientes';
                    } else {
                        try {
                            label.textContent = data[key] ? 'Sim' : 'Não';
                        } catch (error) {}
                    }
                } else {
                    el.value = data[key];
                    if (key === 'ID_CLIENTE') {
                        document.getElementById('SalvarCliente').disabled = false;
                        if (data[key] === 0 || data[key] === '' || data[key] === null || data[key] === undefined) {
                            document.getElementById('ExcluirCliente').disabled = true;
                        } else {
                            document.getElementById('ExcluirCliente').disabled = false;
                        }
                    }
                }
            }
        }
    }
    if (campos !== null) {
        for (var item in campos) {
            var id = campos[item];
            if (data.hasOwnProperty(id)) {
                var el = document.getElementById(id);
                if (el) {
                    console.log(id);
                    if (data[id] === '' || data[id] === null || data[id] === undefined) {
                        el.disabled = true;
                    } else {
                        el.disabled = false;
                    }
                }
            }
        }
    }
}

// função do perfil
function inPerfil(value) {
    var jsonData = value;
    var data = JSON.parse(jsonData);
    var perfilSelect = document.getElementById('Perfil');

    while (perfilSelect.options.length > 0) {
        perfilSelect.remove(0);
    }
    perfilSelect.innerHTML = '';

    var tabela = document.getElementById('myTablePerfil');

    while (tabela.rows.length > 0) {
        tabela.deleteRow(0);
    }

    var tableBody = $("#myTablePerfil");

    data.forEach(function (item) {

        if (item.SITUACAO) {
            var option = document.createElement('option');
            option.value = item.ID_PERFIL;
            option.text = item.PERFIL;
            perfilSelect.appendChild(option);
        }

        var row = $('<tr>');
        var codigoInput = $('<input>').attr('type', 'text').prop('class', 'form-control form-control-extra-sm').prop('id', 'ID_PERFIL_' + item.ID_PERFIL).prop('name', 'ID_PERFIL_' + item.ID_PERFIL).prop("value", item.ID_PERFIL).prop('readonly', true);
        var codigoCell = $("<td>").prop('class', 'col-2 fw-normal').append(codigoInput);
        row.append(codigoCell);

        var perfilInput = $('<input>').attr('type', 'text').prop('class', 'form-control form-control-extra-sm').prop('id', 'PERFIL_' + item.ID_PERFIL).prop('name', 'PERFIL_' + item.ID_PERFIL).prop("value", item.PERFIL);
        var perfilCell = $("<td>").prop('class', 'col-7').append(perfilInput);
        row.append(perfilCell);

        // Ativou ou Inativo (Substituição do Checkbox pelo Select)
		var td = $('<td>').prop('class', 'col-3 fw-normal');
		var div = $('<div>').prop('class', 'd-flex justify-content-center align-items-center');
		var select = $('<select>').prop('class', 'form-select select-control-extra-sm').attr('id', 'SITUACAO_' + item.ID_PERFIL).attr('name', 'SITUACAO_' + item.ID_PERFIL).attr('style','width: 85px;' );

		var optionAtivo = $('<option>').prop('value', 'true').text('Ativo');
		var optionInativo = $('<option>').prop('value', 'false').text('Inativo');
		if (item.SITUACAO) {
			optionAtivo.prop('selected', true);
			optionInativo.prop('selected', false);
		} else {
			optionAtivo.prop('selected', false);
			optionInativo.prop('selected', true);
		}

		select.append(optionAtivo, optionInativo);
		div.append(select);
		td.append(div);
		row.append(td);
		tableBody.append(row);
		
        $('.btn-excluir-perfil').click(function () {
            var id = $(this).attr('id');
            excluirPerfil(id);
        });

    });

    var ckPerfilSituacao = document.querySelectorAll('input[id^="SITUACAO_"]');
    ckPerfilSituacao.forEach(function (checkbox) {
        var labelPerfil = document.querySelector('label[for="' + checkbox.id + '"]');

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                labelPerfil.textContent = 'Sim';
            } else {
                labelPerfil.textContent = 'Não';
            }
        });
    });

}


function inRowCliente(value) {
    var jsonData = value;
    var data = JSON.parse(jsonData);
    $('table tr').each(function () {
        var row = $(this);
        var ID_CLIENTE = row.find("#ID_EXECUTAR").val();
        console.log(ID_CLIENTE);
        if (ID_CLIENTE === data['ID_CLIENTE']) {
            row.find('.observacao').text(data['OBSERVACAO']);
            return false;
        }
    });
}
