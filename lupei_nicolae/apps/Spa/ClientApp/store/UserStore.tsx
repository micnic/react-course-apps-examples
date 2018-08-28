import { User } from "oidc-client";

export default class UserStore {
    /**
     * Get current User
     */
    public static getUser(): User {
        const user = JSON.parse(localStorage.getItem("user")) as User;
        return user;
    }
}