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
				if (el.type === 'radio' || el.type === 'checkbox'){
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
					if (key === 'ID_CLIENTE'){
						document.getElementById('SalvarCliente').disabled = false;
						if (data[key] === 0 || data[key] === '' || data[key] === null || data[key] === undefined ){
							document.getElementById('ExcluirCliente').disabled = true;
						} else {
							document.getElementById('ExcluirCliente').disabled = false;
						}
					}
				}
            }
        }
    }
	if(campos !== null){
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
