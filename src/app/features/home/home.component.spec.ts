import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe(HomeComponent.name, () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    localStorage.clear();
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('deve testar o logout', () => {
      component.logout();

      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('deve limpar o localStorage e redirecionar para o login', () => {
      localStorage.setItem('auth_token', 'fake-token');
      localStorage.setItem('user', '{"user": "Teste 01"}');

      component.logout();

      expect(localStorage.length).toBe(0);
    });

    it('deve chamar o localStorage.clear e navegar para o login', () => {
      const clearSpy = spyOn(localStorage, 'clear').and.callThrough();

      component.logout();

      expect(clearSpy).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
