import { CookieProps } from "types/util";

function setCookie(name: string, value: string | null, props: CookieProps): void {
  props = props || {};
  
  if (props.expires && typeof props.expires == 'number') {
    const d = new Date();
    d.setTime(d.getTime() + props.expires * 1000);
    props.expires = d;
  }

  if (props.expires && props.expires instanceof Date) {
    props.expires = props.expires.toUTCString();
  }
  
  value = value ? encodeURIComponent(value) : 'null';

  let updatedCookie = name + '=' + value;
  
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  
  document.cookie = updatedCookie;
};

function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};


function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

export { setCookie, getCookie, deleteCookie };