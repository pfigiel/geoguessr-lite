import { storageItems } from "../utils/storageItems";

export class IdentityService {
    async login(email, password) {
        let storageEmail = localStorage.getItem(storageItems.EMAIL_ADDRESS);
        let username = localStorage.getItem(storageItems.USERNAME);
        let token = localStorage.getItem(storageItems.TOKEN);

        /*
        // In this case we completely ignore method's arguments - we try to authenticate using existing token
        if (storageEmail && username && token) {
            // TODO: API should check the token - if it is valid, return status code 200, if not - 401
            const response = await fetch("authorize_endpoint_url", {
                method: "POST",
                body: JSON.stringify({ token })
            });
            if (response.status === 200) {
                return { storageEmail, username };
            }
        }

        // TODO: API should return status code 200 and respons object { email, username, token } if authentication successful or status code 401 if not
        const response = await fetch("authenticate_endpoint_url", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });
        if (response.status === 200) {
            const responseBody = await response.json().
            localStorage.setItem(storageItems.EMAIL_ADDRESS, responseBody.email);
            localStorage.setItem(storageItems.USERNAME, responseBody.username);
            localStorage.setItem(storageItems.TOKEN, responseBody.token);
            return { email: responseBody.email, username: responseBody.username };
        }
        */

        // Debug code
        localStorage.setItem(storageItems.EMAIL_ADDRESS, "test@test.test");
        localStorage.setItem(storageItems.USERNAME, "Test");
        return email == "" ? { email, username } : undefined;
    }

    async logout() {
        localStorage.removeItem(storageItems.TOKEN);
    }
}