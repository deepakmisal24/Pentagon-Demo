import { TestBed } from '@angular/core/testing';
import {
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { Router } from '@angular/router';

import { errorInterceptor } from './error-interceptor';
import { AuthService } from '../services/auth';
import { NotificationService } from '../services/notification';

describe('errorInterceptor', () => {

  let httpMock: HttpTestingController;
  let httpClient: any;

  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockNotificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {

    mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockNotificationService = jasmine.createSpyObj(
      'NotificationService',
      ['showError']
    );

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([errorInterceptor])
        ),
        provideHttpClientTesting(),

        {
          provide: AuthService,
          useValue: mockAuthService
        },
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject<any>(Object);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(errorInterceptor).toBeTruthy();
  });

  it('should handle 401 unauthorized error', () => {

    httpClient.get('/api/test').subscribe({
      next: () => fail('Expected 401 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(401);
      }
    });

    const req = httpMock.expectOne('/api/test');

    req.flush(
      { message: 'Unauthorized' },
      {
        status: 401,
        statusText: 'Unauthorized'
      }
    );

    expect(mockAuthService.logout).toHaveBeenCalled();

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/auth/login'
    ]);

    expect(
      mockNotificationService.showError
    ).toHaveBeenCalled();
  });

  it('should handle 403 forbidden error', () => {

    httpClient.get('/api/test').subscribe({
      next: () => fail('Expected 403 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(403);
      }
    });

    const req = httpMock.expectOne('/api/test');

    req.flush(
      { message: 'Forbidden' },
      {
        status: 403,
        statusText: 'Forbidden'
      }
    );

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/forbidden'
    ]);

    expect(
      mockNotificationService.showError
    ).toHaveBeenCalled();
  });

});