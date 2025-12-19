import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe(AuthService.name, () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve criar o service', () => {
    expect(service).toBeTruthy();
  });

  describe('getToken', () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it('deve testar com token válido', () => {
      localStorage.setItem('auth_token', 'token-valido');
      expect(service.getToken()).toBe('token-valido');
    });

    it('deve retornar null quando não existir token', () => {
      expect(service.getToken()).toBeNull();
    });

    it('deve string vazia quando token for vazio', () => {
      localStorage.setItem('auth_token', '');
      expect(service.getToken()).toBe('');
    });
  });

  describe('isTokenExpired', () => {
    it('deve retornar false para token válido (não expirado)', () => {
      const futureExp = Math.floor(Date.now() / 1000) + 60;
      const token = createFakeJwt(futureExp);

      console.log('token => ', token);

      expect(service.isTokenExpired(token)).toBeFalse();
    });

    it('deve retornar true para o token expirado', () => {
      const pastExp = Math.floor(Date.now() / 1000) - 60;
      const token = createFakeJwt(pastExp);

      expect(service.isTokenExpired(token)).toBeTrue();
    });

    it('deve retornar true para token inválido', () => {
      const invalidToken = 'token-invalido';

      expect(service.isTokenExpired(invalidToken)).toBeTrue();
    });
  });

  describe('isAuthenticated', () => {
    it('deve retornar false sem token', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });

    it('deve retornar true com token e false para token (não expirado)', () => {
      const futureExp = Math.floor(Date.now() / 1000) + 60;
      const token = createFakeJwt(futureExp);

      localStorage.setItem('auth_token', JSON.stringify(token));

      expect(service.isAuthenticated()).toBeTrue();
    });
  });

  describe('logout', () => {
    it('deve remover o token do localStorage quando fizer logout', () => {
      localStorage.setItem('auth_token', 'token-valido');
      service.logout();

      expect(localStorage.getItem('auth_token')).toBeNull();
    });
  });
});

function createFakeJwt(exp: number): string {
  const header = btoa(JSON.stringify({ alg: 'H256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ exp }));
  const signature = 'fake-signature';

  return `${header}.${payload}.${signature}`;
}
