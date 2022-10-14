document.documentElement.style.setProperty('--svh', window.innerHeight + "px");
const vh = () => document.documentElement.style.setProperty('--vh', window.innerHeight + "px");
vh();
window.addEventListener('resize', vh);