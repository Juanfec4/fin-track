export const saveCookie = (name: string, value: string) => {
  const duration = 604800;
  document.cookie = `${name}=${value}; max-age=${duration}; Path=/; SameSite=Strict;`;
};

export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    return cookieValue !== undefined ? cookieValue : undefined;
  }
  return undefined;
};
