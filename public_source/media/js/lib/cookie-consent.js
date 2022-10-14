//cookie consent place at the end of the page.
function setCookie(name,value,days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    eraseCookie(name);
  }
}

//if cookie consent, startGA
function consent(){
  setCookie('allow-cookie', 'all', 60);
//  startGA();
}

const btnCookieConsentAll = document.querySelector('#cookie-accept-all');
if(btnCookieConsentAll){
  btnCookieConsentAll.addEventListener('click', (e)=>{
    e.stopPropagation();
    e.preventDefault();
    document.body.classList.remove('allow-cookie-empty');
    document.body.classList.add('allow-cookie-all');
    consent(e);
  });
}

const allowCookie = getCookie('allow-cookie');
const className = 'allow-cookie-' + (allowCookie ? allowCookie : 'empty');
document.body.classList.add(className);