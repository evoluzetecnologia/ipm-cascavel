document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');

    fetch('html/menu.html')
	.then(response => response.text())
	.then(html => {
		menu.innerHTML = html;

		// Anexar evento de mudança após atribuir o HTML ao elemento menu
		menu.addEventListener('change', function (event) {
			const target = event.target;

			if (target.id === 'DownloadSaida' || target.id === 'DownloadEntrada' || target.id === 'ProtocolarSaida' || target.id === 'ProtocolarEntrada' || target.id === 'SimplesNacional' || target.id === 'SolicitacaoCancelamento') {
				perfilChanged();
				console.log('Input ' + target.id + ' mudou para:', target.value);
			}
		});
	})
	.catch(error => console.log('Erro ao carregar o menu de automação:', error));
});

