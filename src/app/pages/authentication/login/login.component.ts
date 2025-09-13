import { Component, inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { Constant } from '../../../shared/Constant';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private spinner = inject(NgxSpinnerService);
  private router = inject(Router);
  private toastr!: ToastrService;
  private injector = inject(Injector);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.pattern(Constant.emailRegEx)]],
      userPassword: ['', Validators.required]
    });
  }

  private getToastr(): ToastrService {
    if (!this.toastr) {
      this.toastr = this.injector.get(ToastrService);
    }
    return this.toastr;
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    const data = {
      userEmail: this.loginForm.value.userEmail.trim(),
      userPassword: this.loginForm.value.userPassword.trim()
    };

    // we can uncomment and use below code for making actual api call
    // this.spinner.show();
    // this.authService.loginWithCredentials(data).subscribe({
    //   next: (res: any) => {
    //     if (res && !res.Message) {
    //       sessionStorage.setItem('user', JSON.stringify(res));
    //       sessionStorage.setItem(Constant.roleId, res.roleId);
    //       this.router.navigate(['/dashboard']);
    //     } else {
    //       this.getToastr().error(res?.Message || 'Technical error. Try again later.', '', {
    //         positionClass: 'toast-top-center'
    //       });
    //     }
    //     this.spinner.hide();
    //   },
    //   error: (err: any) => {
    //     this.getToastr().error(err, '', { positionClass: 'toast-top-center' });
    //     this.spinner.hide();
    //   }
    // });

    let res = {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      "id": 1,
      "roleId": "1",
      "roleName": "sales representative",
      "userEmail": "Shubham@example.com",
      "userName": "Shubham Sachdeva"
    }
    sessionStorage.setItem('user', JSON.stringify(res));
    sessionStorage.setItem(Constant.roleId, res.roleId);
    this.router.navigate(['/main']);
  }
}
