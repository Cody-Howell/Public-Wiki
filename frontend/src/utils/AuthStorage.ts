import type { Auth } from "../api/fetchHelpers";


const accountKey = "account-auth-name";
const keyKey = "account-auth-key";

/**
 * This function saves the incoming Auth object to local key parameters in LocalStorage.
 * @param auth Auth object to be stored
 */
export function saveAuth(auth: Auth) {
    window.localStorage.setItem(accountKey, auth.username);
    window.localStorage.setItem(keyKey, auth.key);
}

/**
 * This function returns an Auth object. If keys are not already saved, 
 * it returns an empty string. 
 * @returns Auth object
 */
export function getAuth(): Auth {
    const username = window.localStorage.getItem(accountKey) ?? "";
    const key = window.localStorage.getItem(keyKey) ?? "";
    return { username, key };
}
