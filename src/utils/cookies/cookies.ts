export const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}`;
};

export const getCookie = (name: string) => {
    const myCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith(`${name}=`));

    if (myCookie) {
        const cookieValue = myCookie.split("=")[1];
        return cookieValue;
    }
};

export const eraseCookie = (name: string) => {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
