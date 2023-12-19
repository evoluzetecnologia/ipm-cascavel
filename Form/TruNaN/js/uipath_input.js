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
        var select = $('<select>').prop('class', 'form-select select-control-extra-sm').attr('id', 'SITUACAO_' + item.ID_PERFIL).attr('name', 'SITUACAO_' + item.ID_PERFIL).attr('style', 'width: 85px;');

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

function inDataClientes(value) {

    var altura = window.innerHeight;
    var nPag = 22;
    var fontSize = 9;
    if (window.innerHeight > 1080) {
        nPag = 40;
        fontSize = 11;
    } else if (window.innerHeight > 900) {
        nPag = 35;
        fontSize = 10;
    } else if (window.innerHeight > 720) {
        nPag = 25;
    }
    var myTableHead = document.getElementById('myTableHead');
    myTableHead.style.fontSize = '' + fontSize + 'px';

    var tabela = document.getElementById('myTable');
    while (tabela.rows.length > 0) {
        tabela.deleteRow(0);
    }
    var jsonData = value;
    var data = JSON.parse(jsonData);
    var tableBody = $("#myTable");
    var nItem = 0;

    data.forEach(function (item) {
        var row = $('<tr>').prop('class', 'align-items-center').prop('style', 'font-size: ' + fontSize + 'px;');
        nItem++;
        if (nItem > nPag) {
            row.css('display', 'none');
        }
        // TD 1
        var td = $('<td>').prop('class', 'col-6 fw-normal');
        var div = $('<div>').prop('class', 'd-flex justify-content-start align-items-center');
        var col = $('<div>').prop('class', 'col-1 executar').prop('id', 'ID_EXECUTAR').prop('value', item.ID_CLIENTE).text(item.CODIGO);
        var ico = $('<i>').prop('class', 'bi bi-pencil-square');
        var btn = $('<button>').attr('type', 'button').prop('class', 'btn btn-warning custom-btn-extra-small me-2').attr('data-bs-theme', 'dark').attr('data-bs-toggle', 'modal').attr('data-bs-target', '#clienteModal').attr('onclick', 'buscarCliente(' + item.CODIGO + ')').prop('name', item.ID_CLIENTE).prop("value", item.ID_CLIENTE).append(ico);
        div.append(btn)
        div.append(col);
        col = $('<div>').prop('class', 'col-2 d-flex justify-content-center  me-2').text(item.CNPJ);
        div.append(col);
        col = $('<div>').prop('class', 'col-9').text(item.EMPRESA);
        div.append(col);

        td.append(div);
        row.append(td);

        // TD 2
        var td = $('<td>').prop('class', 'col-6 fw-normal');
        var div = $('<div>').prop('class', 'd-flex justify-content-start align-items-center');
        var col = $('<div>').prop('class', 'col-11');
        var obs = $('<div>').prop('class', 'observacao').prop('id', 'ID_OBSERVACAO_' + item.ID_CLIENTE).text(item.OBSERVACAO).attr('style', 'display: block;');
        col.append(obs);
        div.append(col);

        col = $('<div>').prop('class', 'col-1');
        var divF = $('<div>').prop('class', 'd-flex justify-content-end align-items-center');
        /*
        var ico = $('<i>').prop('class', 'bi bi-pencil-square');
        var btn = $('<button>').attr('type', 'button').prop('class', 'btn btn-warning custom-btn-extra-small me-2').attr('data-bs-theme', 'dark' ).attr('data-bs-toggle', 'modal' ).attr('data-bs-target', '#clienteModal').attr('onclick', 'buscarCliente('+item.CODIGO+')').prop('name', item.ID_CLIENTE).prop("value",item.ID_CLIENTE).append(ico);
        divF.append(btn)
         */

        var checkbox = $('<input>').attr('type', 'checkbox').prop('class', 'ProcessCheckbox PendenciaInput form-check-input').prop('id', 'EXECUTAR').prop('name', item.ID_CLIENTE + item.PENDENCIA).attr('onclick', 'repetirCliente(' + item.ID_CLIENTE + ', null)');

        if (item.PENDENCIA == 'Todos') {
            checkbox.prop('checked', true);
        } else if (item.PENDENCIA == 'Nenhum') {
            checkbox.prop('checked', false);
        } else {
            checkbox.prop('indeterminate', true);
        }
        /*
        if (item.EXECUTAR === 'True') {
        checkbox.prop('checked', true);
        } else {
        //checkbox.prop("disabled", true)
        }
         */
        divF.append(checkbox);

        col.append(divF);
        div.append(col);
        td.append(div);
        row.append(td);

        row.on('dblclick', function () {
            const checkbox = $(this).find('input[type="checkbox"]');
            if (checkbox.prop('indeterminate')) {
                checkbox.prop('indeterminate', false);
                checkbox.prop('checked', false);
            } else if (checkbox) {
                checkbox.prop('checked', !checkbox.prop('checked'));
            }
            repetirCliente(item.ID_CLIENTE, null);
        });

        tableBody.append(row);
    });

    initializePagination(data, nPag, 'myTable', 'pagination');

    var processCheckboxAll = document.querySelector('.ProcessCheckboxAll');
    var processCheckboxes = document.querySelectorAll('.ProcessCheckbox');
    var observacaoCheckboxes = document.querySelectorAll('.observacao');
    var executarCheckboxes = document.querySelectorAll('.executar');
    processCheckboxAll.addEventListener('change', function () {
        if (processCheckboxAll.checked) {
            repetirAutomacao(null);
            // Marca todos os checkboxes "ProcessCheckbox"
            processCheckboxes.forEach(function (processCheckbox, index) {
                if (!processCheckbox.disabled) {
                    processCheckbox.indeterminate = false;
                    processCheckbox.checked = true;
                    observacaoCheckboxes[index].style.display = 'block';
                    if (observacaoCheckboxes[index].textContent === '' || observacaoCheckboxes[index].textContent === null || observacaoCheckboxes[index].textContent === undefined) {
                        //repetirCliente(executarCheckboxes[index].value, null);
                    }

                }
            });
        } else {
            // Desmarca todos os checkboxes "ProcessCheckbox"
            processCheckboxes.forEach(function (processCheckbox, index) {
                processCheckbox.indeterminate = false;
                processCheckbox.checked = false;
                observacaoCheckboxes[index].style.display = 'none';
                processCheckbox.name = executarCheckboxes[index].value + 'Nenhum';
            });
        }
    });
}

function inClientesDominio(value) {
    var tabela = document.getElementById('myTableImportacao');
    while (tabela.rows.length > 0) {
        tabela.deleteRow(0);
    }
    var jsonData = value;
    var data = JSON.parse(jsonData);
    var tableBody = $("#myTableImportacao");
    var nItem = 0;
    var altura = window.innerHeight;
    var nPag = 15;
    data.forEach(function (item) {
        var row = $('<tr>');
        nItem++;
        if (nItem > nPag) {
            row.css('display', 'none');
        }
        var td = $('<td>').prop('class', 'col-1').prop('id', 'IMP_CODIGO').prop('value', item.CODIGO).text(item.CODIGO);
        row.append(td);

        td = $('<td>').prop('class', 'col-2 me-2');
        var div = $('<div>').prop('class', 'd-flex justify-content-center').text(item.CNPJ);
        td.append(div);
        row.append(td);

        td = $('<td>').prop('class', 'col-8').text(item.EMPRESA);
        row.append(td);

        td = $('<td>').prop('class', 'col-1');
        var btn = $('<button>').attr('type', 'button').prop('class', 'btn btn-warning custom-btn-extra-small').attr('onclick', 'adicionarCliente(' + item.CODIGO + ')').prop('name', item.CODIGO).prop("value", item.CODIGO).text('Importar');
        div = $('<div>').prop('class', 'd-flex justify-content-end');
        div.append(btn);
        td.append(div);
        row.append(td);

        tableBody.append(row);
    });
    initializePagination(data, nPag, 'myTableImportacao', 'paginationImportacao');
	
	// cria o filtro de pesquisa
	$(document).ready(function () {
      $("#myInputImportacao").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          if (value === '') {
              importarClientes();
          } else {
              $("#myTableImportacao tr").filter(function () {
                  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
              });
          }
      });
  });

}
