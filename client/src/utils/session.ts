export const saveToSession = (name: string, value: string) => {
  window.sessionStorage.setItem(name, value);
};

export const getFromSession = (name: string) => {
  return window.sessionStorage.getItem(name);
};
