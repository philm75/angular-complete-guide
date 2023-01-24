import { HttpEventType, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class LoggingInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Outgoing Request...');
    console.log(req.url);

    return next.handle(req);
  }
}
