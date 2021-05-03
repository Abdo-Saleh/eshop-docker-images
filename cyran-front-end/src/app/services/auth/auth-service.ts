import { Injectable } from '@angular/core'


/**
 * #### Description
 * Service which provides authentification in security eshop
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Injectable()
export class AuthService {

    private loggedInStatus = false; //JSON.parse(localStorage.getItem('loggedIn') || 'false');
    private isAssistant = false;
    private isAdmin = false;

    /**
     * #### Description
     * Sets logged in state for user
     * 
     * #### Version
     * since: V1.0.0
     * 
     * @param value logged in boolean value
     * @param name name of user
     */
    setLoggedIn(value: boolean, name: string): void {
        this.loggedInStatus = value;
        localStorage.setItem("loggedIn", name);
    }

    /**
     * #### Description
     * Check if user is logged in
     * 
     * #### Version
     * since: V1.0.0
     * 
     */
    get isLoggedIn(): boolean {
        return localStorage.getItem('loggedIn') != null;
    }

    /**
     * #### Description
     * Apply role hierarchy for given request
     * Admin > Assistant > Logged user > Not logged user
     * 
     * #### Version
     * since: V1.0.0
     * 
     * @param role role in security eshop (role hierarchy)
     */
    private applyRoleHierarchy(role:string){
        if(role == "admin"){
            this.isAdmin = true;
            this.isAssistant = true;
        } else if(role == "assistant"){
            this.isAdmin = false;
            this.isAssistant = true;
        } else {
            this.isAdmin = false;
            this.isAssistant = false;
        }
    }

    /**
     * #### Description
     * Sets role and role permissions is obtained for this role
     * 
     * #### Version
     * since: V1.0.0
     * 
     * @param role role in security eshop (role hierarchy)
     */
    setRole(role:string): void {
        this.applyRoleHierarchy(role);
        localStorage.setItem("role", role);
    }

    /**
     * #### Description
     * Gets information if user is admin
     * 
     * #### Version
     * since: V1.0.0
     * 
     * @returns true if is admin 
     */
    getIsAdmin(): boolean {
        var role = localStorage.getItem('role');
        if(role != null){
            this.applyRoleHierarchy(role);
            return this.isAdmin;
        }
        return false;
    }

    /**
     * #### Description
     * Gets information if user is assistant
     * 
     * #### Version
     * since: V1.0.0
     * 
     * @returns true if is assistant 
     */
    getIsAssistant(): boolean {
        var role = localStorage.getItem('role');

        if(role != null){
            
            this.applyRoleHierarchy(role);
            return this.isAssistant;
        }
        return false;
    }

    /**
     * #### Description
     * Get details about user
     * 
     * #### Version
     * since: V1.0.0
     * 
     * @param username login name of user
     * @param password password of user
     */
    getUserDetails(username: string, password: string): void {
    }
}
