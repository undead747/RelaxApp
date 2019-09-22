const sideBar = document.querySelector(".sidebar");
const toggleBtn = document.querySelector(".toggle-btn");

class toggle {
    toggleActive() {
        toggleBtn.addEventListener('click', event => {
            sideBar.classList.toggle('active');
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new toggle();
    ui.toggleActive();
})