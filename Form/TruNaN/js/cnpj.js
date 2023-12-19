$(document).ready(function(){
  $("#myInput").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
  });
  });

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
  $(document).ready(function () {
      Inputmask("99999-999").mask("#Periodo");
  });
  

var cnpjCpfInput = document.getElementById('CNPJ');

cnpjCpfInput.addEventListener('input', function () {
    var valor = this.value.replace(/\D/g, '');

    if (valor.length === 11) {
        // CPF
        if (validarCpf(valor)) {
            this.value = aplicarMascaraCpf(valor);
        }
    } else if (valor.length === 14) {
        // CNPJ
        if (validarCnpj(valor)) {
            this.value = aplicarMascaraCnpj(valor);
        } else {
            this.value = 'CNPJ Inválido';
        }
    }
});


function validarCpf(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
        return false;
    }

    var sum = 0;
    var mod;

    for (var i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    mod = (sum * 10) % 11;

    if (mod === 10 || mod === 11) {
        mod = 0;
    }

    if (mod !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    sum = 0;

    for (var j = 1; j <= 10; j++) {
        sum += parseInt(cpf.substring(j - 1, j)) * (12 - j);
    }

    mod = (sum * 10) % 11;

    if (mod === 10 || mod === 11) {
        mod = 0;
    }

    if (mod !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

function aplicarMascaraCpf(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

function validarCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cnpj.length !== 14) {
        return false;
    }

    // Verifica se todos os dígitos são iguais (caso de CNPJs inválidos)
    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    // Validação do primeiro dígito verificador
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;

    for (var i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0), 10)) {
        return false;
    }

    // Validação do segundo dígito verificador
    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0), 10)) {
        return false;
    }

    return true;
}

function aplicarMascaraCnpj(cnpj) {
    cnpj = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}
