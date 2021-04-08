import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core'


@Injectable()
export class StorageService {

    private storageSub = new Subject<String>();
    public numberOfProducts = 0;;
    watchStorage(): Observable<any> {
        return this.storageSub.asObservable();
    }

    setItem(key: string, data: any) {
        localStorage.setItem(key, data);
        this.storageSub.next('changed');
    }

    getItem(key: string) {
        return localStorage.getItem(key);
    }

    removeItem(key) {
        localStorage.removeItem(key);
        this.storageSub.next('changed');
    }
}