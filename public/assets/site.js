// Menu móvel (troca de ícone por CSS) e setas do carrossel.
(() => {
  const botao = document.querySelector('.menu-botao');
  const menu = document.getElementById('menu-principal');
  if (botao && menu) {
    const alternar = (abrir) => {
      botao.setAttribute('aria-expanded', String(abrir));
      botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
      menu.classList.toggle('aberto', abrir);
      document.body.classList.toggle('menu-aberto', abrir);
    };
    botao.addEventListener('click', () => alternar(botao.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && alternar(false));
    menu.addEventListener('click', (e) => e.target.closest('a') && alternar(false));
  }

  // Rodapé: grupos abertos no computador, sanfona fechada no celular
  const celular = matchMedia('(max-width: 760px)');
  const grupos = document.querySelectorAll('.rodape-grupo');
  const ajustarRodape = () => grupos.forEach((d) => { d.open = !celular.matches; });
  ajustarRodape();
  celular.addEventListener('change', ajustarRodape);

  // Esconde o botão flutuante enquanto a abertura está visível
  const hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    const obsHero = new IntersectionObserver(([e]) => document.body.classList.toggle('hero-visivel', e.isIntersecting), { threshold: 0.25 });
    obsHero.observe(hero);
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
