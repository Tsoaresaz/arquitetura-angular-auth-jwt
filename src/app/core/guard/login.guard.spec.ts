import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { loginGuard } from './login.guard';
import { TestBed } from '@angular/core/testing';

describe(loginGuard.name, () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  const executeGuard = () =>
    TestBed.runInInjectionContext(() => loginGuard(mockRoute, mockState));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'isAuthenticated',
    ]);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('deve redirecionar para /home se usuário estiver autenticado', () => {
    const urlTree = {} as UrlTree;

    authServiceSpy.isAuthenticated.and.returnValue(true);
    routerSpy.createUrlTree.and.returnValue(urlTree);

    const result = executeGuard();

    expect(authServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/home']);
    expect(result).toBe(urlTree);
  });

  it('deve permitir acesso ao login se usuário NÃO estiver autenticado', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = executeGuard();

    expect(routerSpy.createUrlTree).not.toHaveBeenCalled();
    expect(result).toBeTrue();
  });
});
