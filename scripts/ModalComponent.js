import Button from './ButtonComponent';

export default function(modal, container) {
  function openModal() {
    modal.classList.add("show");
    container.classList.add("blur");
  }
  
  function closeModal() {
    modal.classList.remove("show");
    container.classList.remove("blur");
  }
  
  Button(document.getElementById("open-modal"), openModal);
  
  Button(document.getElementById("close-modal"), closeModal);
}