import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class FakePhotoService {

    constructor(private http: HttpClient) {
    }

    getPhotoPlaceHolder(): Observable<HTMLElement> {
        return this.http.get<HTMLElement>('https://via.placeholder.com/300', );
    }
}
