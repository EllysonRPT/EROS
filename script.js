/* ══════════════════════════════════════════
   EROSCORP — script.js
   Funções dos modais de perfume
   Funciona nas páginas: index.html (PT) e english.html (EN)
══════════════════════════════════════════ */


/* ──────────────────────────────────────────
   FUNÇÃO: abrirModal(id)
   
   Recebe o "id" do perfume (ex: 'mystery', 'sultan')
   e localiza no HTML o elemento com id="modal-mystery".
   
   Adiciona a classe CSS "ativo" no overlay, o que faz
   o modal aparecer (o CSS usa display:flex quando .ativo existe).
   
   Também adiciona "modal-aberto" no <body> para travar
   a rolagem da página enquanto o modal estiver aberto
   (o CSS faz overflow:hidden no body com essa classe).
────────────────────────────────────────── */
function abrirModal(id) {
  var overlay = document.getElementById('modal-' + id);
  if (!overlay) return; /* Segurança: sai se o modal não existir */
  overlay.classList.add('ativo');
  document.body.classList.add('modal-aberto');
}


/* ──────────────────────────────────────────
   FUNÇÃO: fecharModal(id)
   
   Faz o inverso de abrirModal: remove a classe "ativo"
   do overlay, o que faz o modal sumir via CSS.
   
   Remove também "modal-aberto" do body para liberar
   a rolagem da página novamente.
────────────────────────────────────────── */
function fecharModal(id) {
  var overlay = document.getElementById('modal-' + id);
  if (!overlay) return;
  overlay.classList.remove('ativo');
  document.body.classList.remove('modal-aberto');
}


/* ──────────────────────────────────────────
   FUNÇÃO: fecharModalFora(event, id)
   
   Usada nos botões de fechar quando se clica fora da caixa.
   Compara o elemento clicado (event.target) com o elemento
   que disparou o evento (event.currentTarget).
   
   Se forem iguais, significa que o clique foi no fundo escuro
   e NÃO dentro da caixa branca do modal — aí fecha.
   
   Se o clique foi dentro da caixa, os dois elementos são
   diferentes e a função não faz nada.
────────────────────────────────────────── */
function fecharModalFora(event, id) {
  if (event.target === event.currentTarget) {
    fecharModal(id);
  }
}


/* ──────────────────────────────────────────
   EVENTO: Tecla Escape
   
   Ouve qualquer tecla pressionada no documento inteiro.
   Quando a tecla for "Escape", percorre todos os modais
   que estiverem abertos (com a classe "ativo") e fecha
   todos de uma vez, liberando a rolagem do body.
────────────────────────────────────────── */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.perf-modal-overlay.ativo').forEach(function (el) {
      el.classList.remove('ativo');
    });
    document.body.classList.remove('modal-aberto');
  }
});


/* ──────────────────────────────────────────
   EVENTO: DOMContentLoaded
   
   Espera o HTML carregar completamente antes de rodar
   o código dentro (se rodar antes, os elementos ainda
   não existem e querySelector retorna null).
   
   Dentro, percorre todos os overlays de modal e adiciona
   um listener de clique em cada um. Quando o clique
   acontece direto no overlay (fundo escuro) e não dentro
   da caixa do modal, fecha automaticamente.
   
   Isso é uma alternativa ao onclick="fecharModalFora(...)"
   inline no HTML — funciona da mesma forma, mas é mais
   limpo e não precisa repetir código no HTML.
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  /* Fecha modal ao clicar no fundo escuro */
  document.querySelectorAll('.perf-modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.classList.remove('ativo');
        document.body.classList.remove('modal-aberto');
      }
    });
  });

  /* ──────────────────────────────────────────
     NEWSLETTER — Formulários PT e EN
     
     Localiza todos os formulários de newsletter na página
     (pode existir um na versão PT e outro na EN).
     
     Intercepta o "submit" (envio do formulário) com
     preventDefault() para impedir que a página recarregue,
     que é o comportamento padrão de um <form>.
     
     Valida se o campo de e-mail foi preenchido.
     Se sim, exibe a mensagem de confirmação no lugar do
     formulário usando innerHTML.
     
     A mensagem some automaticamente após 5 segundos,
     restaurando o formulário original para o usuário
     poder assinar novamente se quiser.
  ────────────────────────────────────────── */
  document.querySelectorAll('.newsletter-form').forEach(function (form) {

    form.addEventListener('submit', function (e) {
      /* Impede o comportamento padrão (recarregar a página) */
      e.preventDefault();

      /* Pega o valor digitado no campo de e-mail */
      var emailInput = form.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value.trim() : '';

      /* Se o campo estiver vazio, não faz nada */
      if (!email) return;

      /* Guarda o HTML original do formulário para restaurar depois */
      var htmlOriginal = form.innerHTML;

      /* Detecta o idioma da página pelo atributo lang do <html> */
      var idioma = document.documentElement.lang || 'pt';

      /* Define a mensagem de acordo com o idioma */
      var mensagem = idioma.startsWith('en')
        ? '✦ You will receive news soon!'   /* Mensagem em inglês */
        : '✦ Você receberá novidades em breve!'; /* Mensagem em português */

      /* Substitui o conteúdo do formulário pela mensagem de confirmação */
      form.innerHTML =
        '<p style="'
        + 'color:#c5a059;'          /* Cor dourada da marca */
        + 'font-family:Cinzel,serif;'
        + 'font-size:0.85rem;'
        + 'letter-spacing:1px;'
        + 'margin:0;'
        + 'padding:6px 0;'
        + 'animation:fadeIn 0.4s ease;' /* Animação suave de entrada */
        + '">' + mensagem + '</p>';

      /* Após 5 segundos, restaura o formulário original */
      setTimeout(function () {
        form.innerHTML = htmlOriginal;
      }, 5000);
    });

  });

});