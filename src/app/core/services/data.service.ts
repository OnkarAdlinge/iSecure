import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class DataService {
  private baseUrl = environment.apiUrl;
  private toastr!: ToastrService;

  constructor(private http: HttpClient, private injector: Injector) {}

  private getToastr(): ToastrService {
    if (!this.toastr) {
      this.toastr = this.injector.get(ToastrService);
    }
    return this.toastr;
  }

  getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }

  postData<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data);
  }

  putData<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data);
  }

  deleteData<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }

  postFormData<T>(endpoint: string, formData: FormData): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, formData);
  }

  putFormData<T>(endpoint: string, formData: FormData): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, formData);
  }

  showSuccess(message: string) {
    this.getToastr().success(message);
  }

  showError(message: string) {
    this.getToastr().error(message);
  }
}
