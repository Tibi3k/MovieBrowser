import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  /**
   * attatches the api key to every request
   * @param request the current requst
   * @param next the next middleware
   * @returns the modified request
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const newRequest = request.clone({
          setParams: {'api_key': environment.API_KEY}
      })
    return next.handle(newRequest);
  }
}