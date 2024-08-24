import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    alerts$ = new Subject<string>();

    alert(message: string) {
        this.alerts$.next(message);
    }
}
