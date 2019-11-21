import { storageItems } from "../utils/storageItems";

export class IdentityService {
    async tryAuthorize() {
        const token = localStorage.getItem(storageItems.TOKEN);
        if (token) {
            const response = await fetch("http://127.0.0.1:5000/authorize", {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            });
            if(response.status === 200) {
                const responseBody = await response.json();
                localStorage.setItem(storageItems.EMAIL_ADDRESS, responseBody.email);
                localStorage.setItem(storageItems.USERNAME, responseBody.username);
                return true;
            }
        }

        return false;
    }

    async login(email, password) {
        const response = await fetch("http://127.0.0.1:5000/authenticate", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (response.status === 200) {
            const responseBody = await response.json();
            localStorage.setItem(storageItems.EMAIL_ADDRESS, responseBody.email);
            localStorage.setItem(storageItems.USERNAME, responseBody.username);
            localStorage.setItem(storageItems.TOKEN, responseBody.token);
            return true;
        }
    }

    async logout() {
        localStorage.removeItem(storageItems.TOKEN);
    }

    async register(email, username, password) {
        const response = await fetch("http://127.0.0.1:5000/register", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, username, password })
        });
        return response.status === 200;
    }
}