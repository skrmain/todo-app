import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) {}
    baseURL = environment.apiUrl;

    sendData(path: string, data: any) {
        return this.http.post(this.baseURL + path, data).pipe(catchError(this.handleError));
    }

    getData(path: string): Observable<any> {
        return this.http.get(this.baseURL + path).pipe(catchError(this.handleError));
    }

    updateOne(path: string, data: any) {
        return this.http.patch(this.baseURL + path, data).pipe(catchError(this.handleError));
    }

    deleteOne(path: string) {
        return this.http.delete(this.baseURL + path).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code ${error.status}, body was: `, error.error);
            // alert(error.error?.message || 'Server Error');
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error(error.error?.message || 'Something bad happened; please try again later.'));
    }
}
