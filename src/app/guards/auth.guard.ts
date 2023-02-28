import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RolesService } from 'src/app/services/roles.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private rolesService: RolesService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.rolesService.getRole().subscribe(role => {
        if (!role) {
          this.router.navigate(['/dashboard']);
          resolve(false);
        } else {
          switch (role.role) {
            case 'admin':
              resolve(true);
              break;
            case 'Aspirante':
              if (next.data.allowedRoles.includes('Aspirante')) {
                resolve(true);
              } else {
                this.router.navigate(['/dashboard']);
                resolve(false);
              }
              break;
            case 'Empresa':
              if (next.data.allowedRoles.includes('Empresa')) {
                resolve(true);
              } else {
                this.router.navigate(['/dashboard']);
                resolve(false);
              }
              break;
            default:
              this.router.navigate(['/dashboard']);
              resolve(false);
              break;
          }
        }
      });
    });
  }
}
