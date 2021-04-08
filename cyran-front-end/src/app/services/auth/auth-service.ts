import { Injectable } from '@angular/core'


@Injectable()
export class AuthService {

    private loggedInStatus = false; //JSON.parse(localStorage.getItem('loggedIn') || 'false');
    private isAssistant = false;
    private isAdmin = false;

    setLoggedIn(value: boolean, name: string): void {
        this.loggedInStatus = value;


        localStorage.setItem("loggedIn", name);
    }

    get isLoggedIn(): boolean {

        return localStorage.getItem('loggedIn') != null;
    }

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

    setRole(value: boolean, role:string): void {
        this.applyRoleHierarchy(role);


        localStorage.setItem("role", role);
    }

    getIsAdmin(): boolean {
        var role = localStorage.getItem('role');
        if(role != null){
            this.applyRoleHierarchy(role);
            return this.isAdmin;
        }
        return false;
    }

    getIsAssistant(): boolean {
        var role = localStorage.getItem('role');

        if(role != null){
            
            this.applyRoleHierarchy(role);
            return this.isAssistant;
        }
        return false;
    }

    getUserDetails(username: string, password: string): void {

    }
}
