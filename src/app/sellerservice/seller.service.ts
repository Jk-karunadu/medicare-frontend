import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { login, Product, SignUp } from '../datatype';
import { Router } from '@angular/router';
import { environment } from '../../../environment.prod';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';  // Add this import statement


console.log(`${environment.backendUrl}`)

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  issellerLoginError = new EventEmitter<boolean>(false);
  isuserLoginError = new EventEmitter<boolean>(false);

  private cartLengthSubject = new BehaviorSubject<number>(0);
  cartLength$ = this.cartLengthSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  updateCartLength(length: number): void {
    this.cartLengthSubject.next(length);
  }

  sellerSignUp(data: SignUp): void {
    this.http.post(`${environment.backendUrl}/seller`, data, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('Sign up failed', error);
          alert('An error occurred during seller signup. Please try again later.');
          return []; // Return an observable with null on error
        })
      )
      .subscribe((res) => {
        if (res && res.body) {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('seller', JSON.stringify(res.body));
          }
          this.router.navigate(['seller-home']); // Redirect to the seller's home page or any desired route
        }
      });
  }
  
  getDoctorSessions(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/doctors`);
  }


  userSignUp(data: SignUp): void {
    this.http.post(`${environment.backendUrl}/user`, data, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('Sign up failed', error);
          alert('An error occurred during signup. Please try again later.');
          return [];
        })
      )
      .subscribe((res) => {
        if (res && res.body) {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('user', JSON.stringify(res.body));
          }
          this.router.navigate(['']);
        }
      });
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/products`, data, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('Failed to add product', error);
          alert('An error occurred while adding the product.');
          return [];
        })
      );
  }

  addDoctor(data: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/doctors`, data, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('Failed to add product', error);
          alert('An error occurred while adding the product.');
          return [];
        })
      );
  }

  addAmbulance(data: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/ambulances`, data, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('Failed to add product', error);
          alert('An error occurred while adding the product.');
          return [];
        })
      );
  }

  addHealthcareTaker(data: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/healthcareTakers`, data, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('Failed to add healthcare taker', error);
          alert('An error occurred while adding the healthcare taker.');
          return [];
        })
      );
  }


  addPatient(data: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/patients`, data, { observe: 'response' }).pipe(
      catchError((error) => {
        console.error('Failed to add patient', error);
        alert('An error occurred while adding the patient.');
        return [];
      })
    );
  }
  
  

  sellerLogin(data: login): void {
    this.http.get(`${environment.backendUrl}/seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('Login failed', error);
          alert('An error occurred during login. Please try again later.');
          return [];
        })
      )
      .subscribe((res: any) => {
        if (res && res.body && res.body.length) {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('seller', JSON.stringify(res.body));
          }
          this.router.navigate(['seller-home']);
        } else {
          alert('Login failed, incorrect email or password.');
          this.issellerLoginError.emit(true);
        }
      });
  }

  userLogin(data: login): void {
    this.http.get(`${environment.backendUrl}/user?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('Login failed', error);
          alert('An error occurred during login. Please try again later.');
          return [];
        })
      )
      .subscribe((res: any) => {
        if (res && res.body && res.body.length) {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('user', JSON.stringify(res.body));
          }
          this.router.navigate(['']);
        } else {
          alert('Login failed, incorrect email or password.');
          this.isuserLoginError.emit(true);
        }
      });
  }


  getproducts(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/products`);
  }

  getbuy(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/buy`);
  }

  searchprod(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.backendUrl}/products?q=${query}`);
  }

  getcart(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/cart`);
  }

  getproductshome(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/products`);
  }

  getorders(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/order`);
  }

  getslider(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/carousel?_limit=4`);
  }

  delproduct(data: any): Observable<any> {
    return this.http.delete(`${environment.backendUrl}/products/${data}`);
  }

  delcart(data: any): Observable<any> {
    return this.http.delete(`${environment.backendUrl}/cart/${data}`);
  }

  delorders(data: any): Observable<any> {
    return this.http.delete(`${environment.backendUrl}/order/${data}`);
  }

  delbuy(data: any): Observable<any> {
    return this.http.delete(`${environment.backendUrl}/buy/${data}`);
  }

  getupdate(id: any): Observable<any> {
    return this.http.get(`${environment.backendUrl}/products?id=${id}`);
  }

  addtocart(product: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/cart`, product);
  }

  addtobuy(product: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/buy`, product);
  }

  orderdetails(product: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/order`, product);
  }

  updateproduct(data: any, id: any): Observable<any> {
    return this.http.put(`${environment.backendUrl}/products/${id}`, data);
  }

  addReminder(reminder: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/reminders`, reminder);
  }

  deleteReminder(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/reminders/${id}`);
  }

  // Method to fetch doctor/product details by ID
  getdoctordet(id:any): Observable<Product> {
    return this.http.get<Product>(`${environment.backendUrl}/doctors/${id}`);
  }

  getReminders(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/reminders`);
  }

  getAmbulances(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/ambulances`);
  }

  getDonations(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/donations`);
  }

  getFireExtinguishers(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/fire-extinguishers`);
  }

  getHealthcareTakers(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/healthcare-takers`);
  }
  getNearbyMedicalShops(latitude: number, longitude: number, maxDistance: number): Observable<any> {
    const url = `${environment.backendUrl}/medical-shops/nearby?longitude=${longitude}&latitude=${latitude}&maxDistance=${maxDistance}`;
    return this.http.get<any>(url);
  }

  getNearbyhealthcare(latitude: number, longitude: number, maxDistance: number): Observable<any> {
    const url = `${environment.backendUrl}/healthcare-takers/nearby?longitude=${longitude}&latitude=${latitude}&maxDistance=${maxDistance}`;
    return this.http.get<any>(url);
  }
  getNearbyambulance(latitude: number, longitude: number, maxDistance: number): Observable<any> {
    const url = `${environment.backendUrl}/ambulances/nearby?longitude=${longitude}&latitude=${latitude}&maxDistance=${maxDistance}`;
    return this.http.get<any>(url);
  }

  getPoliceServices(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/police-services`);
  }

  reloadSeller(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    } else {
      this.router.navigate(['seller']);
    }
  }
  
  reloaduser(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['']);
    } else {
      this.router.navigate(['user-login']);
    }
  }
  
}
