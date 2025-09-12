import { Component, inject, Injector } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constant } from '../../../shared/Constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private spinner = inject(NgxSpinnerService);
  private router = inject(Router);
   private toastr!: ToastrService;


  loginForm: FormGroup;

  constructor(private injector: Injector
  ) {
    
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.pattern(Constant.emailRegEx)]],
      userPassword: ['', [Validators.required]]
    });
  }

  private getToastr(): ToastrService {
    if (!this.toastr) {
      this.toastr = this.injector.get(ToastrService);
    }
    return this.toastr;
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      let data = {
        userEmail: this.loginForm.value.userEmail.trim(),
        userPassword: this.loginForm.value.userPassword.trim()
      }
      this.spinner.show();
      this.authService.loginWithCredentials(data).subscribe({
        next: (res: any) => {
          if (res) {
            if (!res.Message) {
              sessionStorage.setItem('user', JSON.stringify(res));
              sessionStorage.setItem(Constant.roleId, res.roleId);
              this.router.navigate(['/dashboard']);
            } else if (res.Message) {
              this.toastr.error(res.Message, undefined, {
                positionClass: 'toast-top-center'
              });
            } else {
              this.toastr.error('A technical error has occurred. Please try again later.', undefined, {
                positionClass: 'toast-top-center'
              });
            }
          }
          this.spinner.hide();
        },
        error: (err: any) => {
          this.toastr.error(err, undefined, {
            positionClass: 'toast-top-center'
          });
          this.spinner.hide();
        }
      });

    }
  }
}
