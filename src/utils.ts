export const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
    return null;
  };
  
  export const isSessionExpired = (token: string): boolean => {
    const expiryDate = new Date(parseInt(token.split('.')[1], 10));
    return new Date() > expiryDate;
  };
  
  export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  };
  