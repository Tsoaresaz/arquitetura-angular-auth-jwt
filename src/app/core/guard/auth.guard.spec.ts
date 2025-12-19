import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';
import { TestBed } from '@angular/core/testing';

describe(authGuard.name, () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  const executeGuard = () =>
    TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getToken',
      'isTokenExpired',
      'logout',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('deve permitir acesso quando o token for válido', () => {
    authServiceSpy.getToken.and.returnValue('token-valido');
    authServiceSpy.isTokenExpired.and.returnValue(false);

    const result = executeGuard();

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('deve redirecionar para login quando tiver token', () => {
    authServiceSpy.getToken.and.returnValue(null);

    const result = executeGuard();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/login']);
  });

  it('deve fazer logout e redirecionar quando o token estiver expirado', () => {
    authServiceSpy.getToken.and.returnValue('token-expirado');
    authServiceSpy.isTokenExpired.and.returnValue(true);

    const result = executeGuard();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/login']);
  });
});
