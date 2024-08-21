// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { LoginGuard } from './login.guard';

// describe('loginGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => LoginGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

class MockAuthService {
  isLoggedIn() {
    return false; // or true, depending on your test case
  }
}

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        LoginGuard,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    guard = TestBed.inject(LoginGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate'); // Spy on router.navigate method
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if the user is not logged in', () => {
    // Mock the isLoggedIn method to return false
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    const result = guard.canActivate();
    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not allow activation and redirect to dashboard if the user is logged in', () => {
    // Mock the isLoggedIn method to return true
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
