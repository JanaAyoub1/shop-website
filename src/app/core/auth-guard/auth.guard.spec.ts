// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { AuthGuard } from './auth.guard';

// describe('AuthGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class MockAuthService {
  isLoggedIn() {
    return true; // or false, depending on your test case
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate'); // Spy on router.navigate method
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if the user is logged in', () => {
    // Mock the isLoggedIn method to return true
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const result = guard.canActivate();
    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not allow activation if the user is not logged in', () => {
    // Mock the isLoggedIn method to return false
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
