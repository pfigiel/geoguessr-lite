export class IdentityService {
    async login(email, password) {
        // Fetch user
        return email == "" ? { email: "test@test.test", username: "Test" } : undefined;
    }

    async logout() {
        // Delete token from storage
    }
}