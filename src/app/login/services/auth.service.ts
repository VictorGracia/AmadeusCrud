import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private apiUrl = 'http://localhost:5007/api';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'text/plain'
    });

    return this.http.post<any>(`${this.apiUrl}/Auth/login`, { username, password }, { headers })
      .pipe(
        map(response => {
          // Almacena los detalles del usuario y el token JWT en el almacenamiento local
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          return response;
        }),
        catchError(error => {
          // Captura solo el error 401 y lanza un error específico
          if (error.status === 401) {
            return throwError('Usuario o contraseña incorrectos');
          }
          return throwError('Error al iniciar sesión'); // Para otros errores
        })
      );
  }

  logout() {
    // Elimina al usuario del almacenamiento local al cerrar sesión
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
