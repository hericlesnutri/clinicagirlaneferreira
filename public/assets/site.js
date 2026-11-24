// Menu móvel (troca de ícone por CSS) e setas do carrossel.
(() => {
  const botao = document.querySelector('.menu-botao');
  const menu = document.getElementById('menu-principal');
  if (botao && menu) {
    const alternar = (abrir) => {
      botao.setAttribute('aria-expanded', String(abrir));
      botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
      menu.classList.toggle('aberto', abrir);
    };
    botao.addEventListener('click', () => alternar(botao.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && alternar(false));
    menu.addEventListener('click', (e) => e.target.closest('a') && alternar(false));
  }

  const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-carrossel]').forEach((seta) => {
    const lista = document.getElementById(seta.dataset.carrossel);
    if (!lista) return;
    const atualizar = () => {
      const max = lista.scrollWidth - lista.clientWidth - 2;
      document.querySelectorAll(`[data-carrossel="${lista.id}"]`).forEach((b) => {
        b.disabled = b.dataset.direcao === '-1' ? lista.scrollLeft <= 2 : lista.scrollLeft >= max;
      });
    };
    seta.addEventListener('click', () => {
      const passo = (lista.firstElementChild?.getBoundingClientRect().width || 300) + 20;
      lista.scrollBy({ left: passo * Number(seta.dataset.direcao), behavior: reduzir ? 'auto' : 'smooth' });
    });
    lista.addEventListener('scroll', atualizar, { passive: true });
    addEventListener('resize', atualizar);
    atualizar();
  });

  // Comparador de antes e depois
  document.querySelectorAll('.ad-palco').forEach((palco) => {
    const ctrl = palco.querySelector('.ad-controle');
    const aplicar = () => palco.style.setProperty('--pos', ctrl.value + '%');
    ctrl.addEventListener('input', aplicar);
    aplicar();
  });
})();
