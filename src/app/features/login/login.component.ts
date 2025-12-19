import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../core/services/login/login.service';
import { ILoginResponse } from '../../core/interface/login.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  inforError!: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();
  }

  login(): void {
    if (this.loginForm.valid) {
      const data = this.loginForm.getRawValue();
      this.loginService.login(data).subscribe({
        next: (resp: ILoginResponse) => {
          console.log(resp);
          localStorage.setItem('auth_token', resp.token);
          localStorage.setItem('user', JSON.stringify(resp.user));

          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          this.inforError = error.error.message;
          console.log('error login => ', error);
          console.log('error login this.inforError => ', this.inforError);
        },
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control: AbstractControl | null = this.loginForm.get(controlName);

    if (control?.hasError('required'))
      return `${controlName === 'email' ? 'E-mail' : 'Senha'} é obrigatório`;

    if (control?.hasError('email')) return 'Formato inválido';

    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `Senha deve ter pelo menos ${requiredLength} caracteres`;
    }

    return '';
  }

  private initFormBuilder(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
