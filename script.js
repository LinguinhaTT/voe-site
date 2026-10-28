/* =========================================================
   CONFIGURAÇÃO — edite aqui
   ========================================================= */

// Número do WhatsApp da VOE (só números, com DDI 55 + DDD). Ex.: "5511999999999"
// Enquanto estiver vazio, os botões abrem o WhatsApp para escolher o contato.
const WHATSAPP = "";

// Sites do portfólio (captura 1280x800 em assets/portfolio, dentro da moldura de navegador)
const PORTFOLIO = [
  { nome: "Construtora Reus", tipo: "Construtora", url: "https://construtora-reus.netlify.app", img: "construtora-reus.jpg" },
  { nome: "Mariana Rodrigues", tipo: "Arquitetura", url: "https://mariana-rodrigues-arquitetura.netlify.app", img: "mariana-rodrigues-arquitetura.jpg" },
  { nome: "Lucas Chueri", tipo: "Fotografia", url: "https://lucas-chueri-fotografia.netlify.app", img: "lucas-chueri-fotografia.jpg" },
  { nome: "Dra. Dayane Fermino", tipo: "Estética e harmonização", url: "https://dra-dayane-fermino.netlify.app", img: "dra-dayane-fermino.jpg" },
  { nome: "Rota Sushi", tipo: "Restaurante", url: "https://rota-sushi.netlify.app", img: "rota-sushi.jpg" },
  { nome: "Chueri Seguros", tipo: "Corretora de seguros", url: "https://chueri-seguros.netlify.app", img: "chueri-seguros.jpg" },
];

// Planos de manutenção mensal
const PLANOS = [
  {
    nome: "Essencial",
    desc: "Para quem muda pouca coisa e quer o site sempre certo.",
    preco: 79,
    itens: [
      "Até 3 alterações por mês",
      "Entrega em até 3 dias úteis",
      "Hospedagem e SSL inclusos",
      "Suporte pelo WhatsApp",
    ],
  },
  {
    nome: "Pro",
    desc: "Para negócios que mudam preço, foto e serviço com frequência.",
    preco: 149,
    destaque: "Mais escolhido",
    itens: [
      "Até 8 alterações por mês",
      "Entrega em até 2 dias úteis",
      "1 seção ou página nova por trimestre",
      "Relatório mensal de visitas",
      "Hospedagem e SSL inclusos",
    ],
  },
  {
    nome: "Premium",
    desc: "Para quem quer o site como vitrine viva, sempre atualizada.",
    preco: 249,
    itens: [
      "Alterações simples sem limite",
      "Prioridade: entrega em até 24h úteis",
      "1 página nova por mês",
      "Ajustes de SEO e Google Meu Negócio",
      "Hospedagem e SSL inclusos",
    ],
  },
];

/* ========================================================= */

const linkWhats = (msg) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

function ligarWhats(raiz = document) {
  raiz.querySelectorAll(".js-whats").forEach((a) => {
    a.href = linkWhats(a.dataset.msg || "Olá, VOE!");
    a.target = "_blank";
    a.rel = "noopener";
  });
}

/* ---------- portfólio ---------- */
function montarPortfolio() {
  const lista = document.getElementById("lista-portfolio");
  lista.innerHTML = PORTFOLIO.map((s) => {
    const dominio = s.url.replace(/^https?:\/\//, "");
    return `
      <a class="trabalho revelar" href="${s.url}" target="_blank" rel="noopener">
        <div class="navegador">
          <div class="navegador__barra"><i></i><i></i><i></i><span class="navegador__url">${dominio}</span></div>
          <div class="navegador__tela"><img src="assets/portfolio/${s.img}" alt="Página inicial do site ${s.nome}" width="1280" height="800" loading="lazy"></div>
        </div>
        <div class="trabalho__info">
          <div><h3>${s.nome}</h3><span>${s.tipo}</span></div>
          <span class="trabalho__ver">Ver site ↗</span>
        </div>
      </a>`;
  }).join("");
}

/* ---------- planos ---------- */
function montarPlanos() {
  const lista = document.getElementById("lista-planos");
  lista.innerHTML = PLANOS.map((p) => `
    <article class="plano revelar${p.destaque ? " plano--destaque" : ""}">
      ${p.destaque ? `<span class="plano__tag">${p.destaque}</span>` : ""}
      <h3 class="plano__nome">VOE ${p.nome}</h3>
      <p class="plano__desc">${p.desc}</p>
      <div class="plano__preco"><small>R$</small><strong>${p.preco}</strong><span>/mês</span></div>
      <ul>${p.itens.map((i) => `<li>${i}</li>`).join("")}</ul>
      <a href="#" class="btn ${p.destaque ? "" : "btn--contorno"} js-whats"
         data-msg="Olá, VOE! Tenho interesse no plano ${p.nome} (R$ ${p.preco}/mês).">Quero o ${p.nome}</a>
    </article>`).join("");
}

/* ---------- topo e menu ---------- */
function topo() {
  const header = document.getElementById("topo");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  const aoRolar = () => header.classList.toggle("rolou", window.scrollY > 40);
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });

  const fechar = () => {
    menu.classList.remove("aberto");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  burger.addEventListener("click", () => {
    const abre = !menu.classList.contains("aberto");
    menu.classList.toggle("aberto", abre);
    burger.setAttribute("aria-expanded", String(abre));
    document.body.style.overflow = abre ? "hidden" : "";
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", fechar));
}

/* ---------- aparecer ao rolar ---------- */
function revelar() {
  document.querySelectorAll(".passo, .criacao, .duas > div, .faq, .cabeca, .final__in")
    .forEach((el) => el.classList.add("revelar"));
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visivel");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".revelar").forEach((el) => io.observe(el));
}

/* ---------- aviãozinho seguindo a rota do hero ---------- */
function aviao() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const hero = document.querySelector(".hero");
  const rota = document.getElementById("rota");
  const el = document.querySelector(".aviao");
  const total = rota.getTotalLength();
  const DURACAO = 9000;
  let inicio = null;

  function quadro(t) {
    if (inicio === null) inicio = t;
    const prog = ((t - inicio) % DURACAO) / DURACAO;
    const sx = hero.clientWidth / 1200;
    const sy = hero.clientHeight / 600;
    const p = rota.getPointAtLength(prog * total);
    const q = rota.getPointAtLength(Math.min(prog * total + 2, total));
    const ang = Math.atan2((q.y - p.y) * sy, (q.x - p.x) * sx) * 180 / Math.PI;
    // o ícone aponta para cima-direita (-42°); compensamos para seguir a curva
    el.style.transform = `translate(${p.x * sx - 17}px, ${p.y * sy - 17}px) rotate(${ang + 42}deg)`;
    el.style.opacity = prog < 0.04 ? prog / 0.04 : prog > 0.94 ? (1 - prog) / 0.06 : 1;
    requestAnimationFrame(quadro);
  }
  requestAnimationFrame(quadro);
}

/* ---------- início ---------- */
montarPortfolio();
montarPlanos();
ligarWhats();
topo();
revelar();
aviao();
document.getElementById("ano").textContent = new Date().getFullYear();
