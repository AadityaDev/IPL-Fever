const inBrowser = typeof window !== 'undefined';

export default (cookieName, cookieValue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = exdays ? `expires=${d.toUTCString()}` : '';
  if (inBrowser) document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};
