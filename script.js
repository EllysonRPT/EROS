/* ══════════════════════════════════════════
   EROSCORP — script.js
   Funções dos modais de perfume
   Funciona nas páginas: index.html (PT) e english.html (EN)
══════════════════════════════════════════ */

/* Abre o modal pelo ID */
function abrirModal(id) {
  var overlay = document.getElementById('modal-' + id);
  if (!overlay) return;
  overlay.classList.add('ativo');
  document.body.classList.add('modal-aberto');
}

/* Fecha o modal pelo ID */
function fecharModal(id) {
  var overlay = document.getElementById('modal-' + id);
  if (!overlay) return;
  overlay.classList.remove('ativo');
  document.body.classList.remove('modal-aberto');
}

/* Fecha ao clicar fora da caixa (no fundo escuro) */
function fecharModalFora(event, id) {
  if (event.target === event.currentTarget) {
    fecharModal(id);
  }
}

/* Fecha com a tecla Escape */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.perf-modal-overlay.ativo').forEach(function (el) {
      el.classList.remove('ativo');
    });
    document.body.classList.remove('modal-aberto');
  }
});

/* Fecha ao clicar no fundo escuro (alternativa ao onclick inline) */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.perf-modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.classList.remove('ativo');
        document.body.classList.remove('modal-aberto');
      }
    });
  });
});