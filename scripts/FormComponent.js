export default function(elm, fn) {  
  // bind events
  elm.addEventListener('submit', (e) => {
    e.preventDefault();
    fn();
  });
}