// Modal Elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalDescription = document.getElementById("modal-description");

// Open Modal Function
function openModal(title, price, description) {
    modal.style.display = "flex";
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalDescription.textContent = description;
}

// Close Modal Function
function closeModal() {
    modal.style.display = "none";
}

// Close Modal on Outside Click
window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};
