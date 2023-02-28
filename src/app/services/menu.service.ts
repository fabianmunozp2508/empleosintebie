import { MENU } from './../views/layout/sidebar/menu';
import { Injectable } from '@angular/core';
import { MenuItem } from '../views/layout/sidebar/menu.model';
import { RolesService } from './roles.service';
import { UserService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private userService: UserService, private rolesService: RolesService) {}

  async getMenu(): Promise<MenuItem[]> {
    const currentUser = await this.userService.getCurrentUser();
    const role = await this.rolesService.getRoleByUserId(currentUser.uid);

    switch (role) {
      case 'admin':
        return MENU;
      case 'Aspirante':
        return MENU.filter(item => {
          return item.label === 'Main' || item.label === 'Inicio' || item.label === 'Usuario' || item.label === 'Mis Aplicaciones' || item.label === 'Mi perfil' || item.label === 'Calendar';
        });
      case 'Empresa':
        return MENU.filter(item => {
          return item.label === 'Main' || item.label === 'Inicio' || item.label === 'Usuario' || item.label === 'Mis Aplicaciones' || item.label === 'Mi perfil' || item.label === 'Calendar' || item.label === 'Empresas' || item.label === 'Perfil Empresa' || item.label === 'crear vacante' || item.label === 'Ver Vacantes' || item.label === 'Ver candidatos';
        });
      default:
        return [];
    }
  }



}
