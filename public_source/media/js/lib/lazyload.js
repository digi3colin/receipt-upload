function lazyLoad(){
  document.querySelectorAll('.lazy').forEach(el =>{
    if(el.getBoundingClientRect().top < (window.innerHeight * 2)){
      el.classList.remove('lazy', 'lazy-bg');
    }
  })
}
window.addEventListener('scroll', () => lazyLoad());