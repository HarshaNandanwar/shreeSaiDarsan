import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllApiServiceService } from 'src/app/admin-dashboard/service/all-api-service.service';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    var localservice = this.injector.get(LocalStorageService);
    var tokenizedReq = req;
    var jwtToken = localservice.getToken();

    if (jwtToken != null) {
      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
    }
    return next.handle(tokenizedReq);
  }
}
