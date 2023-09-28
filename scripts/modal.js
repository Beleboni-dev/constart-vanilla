// Seleciona o modal e o backdrop
const modal = document.getElementById("modal");
const backdrop = document.getElementById("backdrop");

// Seleciona todos os botões com a classe .button-modal
const modalButtons = document.querySelectorAll(".button-modal");

// Função para abrir o modal
const openModal = () => {
  modal.style.display = "block";
  backdrop.style.display = "block";
};

// Função para fechar o modal
const closeModal = () => {
  modal.style.display = "none";
  backdrop.style.display = "none";
};

// Adiciona o evento de clique aos botões para abrir o modal
modalButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

// Fecha o modal ao clicar no backdrop
backdrop.addEventListener("click", closeModal);

// Fecha o modal ao pressionar a tecla "Esc"
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
