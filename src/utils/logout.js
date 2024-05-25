export const logout = (auth, removeCookie) => {
    auth.setAuth(null);
    removeCookie('JWT-Access', { path: '/' });
    removeCookie('JWT-Refresh', { path: '/' });
    removeCookie('User-type', { path: '/' });
    removeCookie('User-id', { path: '/' });
    removeCookie('User', { path: '/' });
}