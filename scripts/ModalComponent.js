import Button from './ButtonComponent';
import pubSub from './pubSub';

export default function(modal, container) {
  function openModal() {
    modal.classList.add("show");
    container.classList.add("blur");
  }
  
  function closeModal() {
    modal.classList.remove("show");
    container.classList.remove("blur");
  }
  
  Button(document.getElementById("open-modal"), e => pubSub.emit('openModal'));
  Button(document.getElementById("close-modal"), e => pubSub.emit('closeModal'));
  
  pubSub.subscribe('openModal', openModal);
  pubSub.subscribe('closeModal', closeModal);
}