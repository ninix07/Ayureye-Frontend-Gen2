import axios from '../api/axios';
const LOGIN_URL = "api/login/";
//Login and logout function
export const signin = async (userEmail, userPassword, auth, setCookie) => {
    // login using axios
    try {
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({
                username: userEmail,
                password: userPassword,
            }), {
            headers: { 'Content-Type': 'application/json' }
            // withCredentials: true
        }
        );
        let data = await response.data;
        // first set the cookie
        setCookie('JWT-Refresh', data.refresh, {
            path: '/'
        });

        setCookie('JWT-Access', data.access, {
            path: '/'
        });

        setCookie('User-type', data.user_type, {
            path: '/'
        });

        setCookie('User', data.user, {
            path: '/'
        });

        setCookie('User-id', data.id, {
            path: '/'
        });

        auth.setAuth({ 'access': data.access, 'refresh': data.refresh });
        return data;
    } catch (err) {
        console.log(err);
    }
    return null;

}