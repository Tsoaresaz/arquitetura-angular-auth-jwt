import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ILoginForm, ILoginResponse } from '../../interface/login.interface';
import { API } from '../../../provider/provider';

describe(LoginService.name, () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o LoginService', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('deve fazer o login com sucesso', () => {
      const body: ILoginForm = {
        email: 'teste01@mail.com',
        password: '123456',
      };

      const mockResponse: ILoginResponse = {
        message: 'Login realizado com sucesso',
        token: 'token-fake',
        user: {
          id: 1,
          email: 'teste01@mail.com',
          name: 'Teste 01',
        },
      };

      service.login(body).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(API.LOGIN);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(body);

      req.flush(mockResponse);
    });

    it('deve retornar 401 quando as credencias forem inválidas', () => {
      const body: ILoginForm = {
        email: 'teste01@mail.com',
        password: 'errado',
      };

      service.login(body).subscribe({
        next: () => fail('não deve cair no next'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(401);
          expect(error.statusText).toBe('Unauthorized');
          expect(error.error.message).toBe('Credenciais inválidas');
        },
      });

      const req = httpMock.expectOne(API.LOGIN);

      req.flush(
        { message: 'Credenciais inválidas' },
        { status: 401, statusText: 'Unauthorized' }
      );
    });
  });
});
