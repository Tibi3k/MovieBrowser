import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //   var newParams = request.params
    //   console.log('params')
    //   newParams.append('api_key', environment.API_KEY)
      const newRequest = request.clone({
          setParams: {'api_key': environment.API_KEY}
      })
    return next.handle(newRequest);
  }
}