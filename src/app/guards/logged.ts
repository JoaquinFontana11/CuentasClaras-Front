import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class logged implements CanActivate {

    constructor(private cookieService: CookieService, private router: Router) { }

    canActivate(): boolean {
        if (this.cookieService.get("userId")) {
            return true;
        } else {
            this.router.navigate(['/login'])
            return false
        }
    }
}