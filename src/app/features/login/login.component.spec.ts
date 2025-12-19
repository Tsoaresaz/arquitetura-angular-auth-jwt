import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe(LoginComponent.name, () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('deve testar o carregamento do formuário', () => {
      expect(component.loginForm).toBeTruthy();
    });

    it('deve testar o login correto', () => {
      component.loginForm.setValue({
        email: 'teste01@mail.com',
        password: '123456',
      });

      component.login();

      const req = httpMock.expectOne(
        (req) =>
          req.method === 'POST' &&
          req.url.endsWith('/login') &&
          req.body.email === 'teste01@mail.com' &&
          req.body.password === '123456'
      );

      expect(req.request.method).toBe('POST');

      const mockResponse = {
        token: 'fake-token',
        user: {
          id: 1,
          name: 'Teste 01',
        },
      };

      req.flush(mockResponse, { status: 200, statusText: 'Success' });

      expect(localStorage.getItem('auth_token')).toBe('fake-token');
      expect(localStorage.getItem('user')).toBe(
        JSON.stringify(mockResponse.user)
      );

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('deve testar o login incorreto e a mensagem de retorno com o status 401', () => {
      component.loginForm.setValue({
        email: 'teste1000@gmail.com',
        password: '1234567',
      });

      component.login();

      const req = httpMock.expectOne(
        (req) => req.method === 'POST' && req.url.endsWith('/login')
      );

      expect(req.request.body).toEqual({
        email: 'teste1000@gmail.com',
        password: '1234567',
      });

      req.flush(
        { message: 'Credenciais inválidas' },
        { status: 401, statusText: 'Unauthorized' }
      );
    });
  });

  describe('getErrorMessage', () => {
    it('deve retornar erro de formato inválido para o e-mail sem @', () => {
      const emailControl = component.loginForm.get('email');

      emailControl?.setValue('teste1000mail.com');
      emailControl?.markAsTouched();
      emailControl?.updateValueAndValidity();

      expect(component.getErrorMessage('email')).toBe('Formato inválido');
    });

    it('deve retornar erro e-mail é obrigatório quando foi o valor null', () => {
      const emailControl = component.loginForm.get('email');

      emailControl?.setValue(null);
      emailControl?.markAsTouched();
      emailControl?.updateValueAndValidity();

      expect(component.getErrorMessage('email')).toBe('E-mail é obrigatório');
    });

    it('deve retorna erro Senha é obrigatório quando o valor for null', () => {
      const passwordControl = component.loginForm.get('password');

      passwordControl?.setValue(null);
      passwordControl?.markAsTouched();
      passwordControl?.updateValueAndValidity();

      expect(component.getErrorMessage('password')).toBe('Senha é obrigatório');
    });

    it('deve validar os caracteres minímo para senha e retornar erro', () => {
      const passwordControl = component.loginForm.get('password');

      passwordControl?.setValue('123');
      passwordControl?.markAsTouched();
      passwordControl?.updateValueAndValidity();

      expect(component.getErrorMessage('password')).toBe(
        'Senha deve ter pelo menos 6 caracteres'
      );
    });

    it('deve validar cenário de sucesso para e-mail e senha', () => {
      const emailControl = component.loginForm.get('email');
      const passwordControl = component.loginForm.get('password');

      emailControl?.setValue('teste01@mail.com');
      emailControl?.markAsTouched();
      emailControl?.updateValueAndValidity();

      passwordControl?.setValue('123456');
      passwordControl?.markAsTouched();
      passwordControl?.updateValueAndValidity();

      expect(component.getErrorMessage('email')).toBe('');
      expect(component.getErrorMessage('password')).toBe('');
    });
  });

  describe('display', () => {
    it('deve verificar se a mensagem "Formato inválido" no e-mail foi renderizada na tela', () => {
      const emailControl = component.loginForm.get('email');

      emailControl?.setValue('teste1000mail.com');
      emailControl?.markAsTouched();
      emailControl?.updateValueAndValidity();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.info-error')?.textContent).toContain(
        'Formato inválido'
      );
    });

    it('deve verificar se a mensagem "E-mail é obrigatório" foi renderizada', () => {
      const emailControl = component.loginForm.get('email');

      emailControl?.markAsTouched();
      emailControl?.updateValueAndValidity();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.info-error')?.textContent).toContain(
        'E-mail é obrigatório'
      );
    });

    it('deve verificar se a mensageam "Senha é obrigatório" foi renderizada na tela', () => {
      const passwordControl = component.loginForm.get('password');

      passwordControl?.markAsTouched();
      passwordControl?.updateValueAndValidity();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.info-error')?.textContent).toContain(
        'Senha é obrigatório'
      );
    });

    it('deve verificar se a mensagem "Senha deve ter pelo menos 6 caracteres" foi renderizada na tela', () => {
      const passwordControl = component.loginForm.get('password');

      passwordControl?.markAsTouched();
      passwordControl?.setValue('123');
      passwordControl?.updateValueAndValidity();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.info-error')?.textContent).toContain(
        'Senha deve ter pelo menos 6 caracteres'
      );
    });
  });
});
