// Sua função para carregar a animação
var animation = bodymovin.loadAnimation({
  container: document.getElementById('lottie-animation'),
  renderer: 'svg',
  loop: true,
  autoplay: false, // Alterado para não iniciar automaticamente
  path: 'truNaN.json'
});

function showLoading() {
  document.getElementById('overlay').style.display = 'flex';
  animation.play(); // Inicia a animação
}

function hideLoading() {
  document.getElementById('overlay').style.display = 'none';
  animation.stop(); // Para a animação
}