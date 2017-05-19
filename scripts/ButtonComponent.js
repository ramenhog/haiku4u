export default function(elm, fn) {  
  // bind events
  elm.addEventListener('click', (e) => {
    e.preventDefault();
    fn();
  });
}