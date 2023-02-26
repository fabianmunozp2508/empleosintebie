import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RolesService } from '../services/roles.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate, CanLoad {
  constructor(private roleService: RolesService, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const role = await this.roleService.getRole().toPromise();
    if (role && role.role === 'admin') {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
