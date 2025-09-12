import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = sessionStorage.getItem('AccessToken') || '';

  let headersConfig: Record<string, string> = {
    'Cache-control': 'no-cache, no-store',
    'Expires': '0',
    'Pragma': 'no-cache',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "frame-ancestors 'self'",
    'X-Frame-Options': 'deny',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  };

  if (authToken) {
    headersConfig['Authorization'] = `Bearer ${authToken}`;
  }

  if (req.body) {
    headersConfig['Content-Type'] = 'application/json';
  }

  const authReq = req.clone({ setHeaders: headersConfig });
  return next(authReq);
};
