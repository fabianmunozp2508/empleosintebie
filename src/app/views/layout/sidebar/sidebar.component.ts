import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import MetisMenu from 'metismenujs';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { Router, NavigationEnd } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  showRegisterButton = true;
  @ViewChild('sidebarToggler') sidebarToggler: ElementRef;

  menuItems: MenuItem[] = [];
  @ViewChild('sidebarMenu') sidebarMenu: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private userService: UserService,
    private rolesService: RolesService,
    private renderer: Renderer2,
    router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        /**
         * Activating the current active item dropdown
         */
        this._activateMenuDropdown();

        /**
         * closing the sidebar
         */
        if (window.matchMedia('(max-width: 991px)').matches) {
          this.document.body.classList.remove('sidebar-open');
        }
      }
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      const currentUser = await this.userService.getCurrentUser();
      if (currentUser) {
        const userRole = await this.rolesService.getRoleByUserId(currentUser.uid);
        if (userRole) {
          switch (userRole.role) {
            case 'Admin':
              this.menuItems = MENU;
              break;
            case 'Aspirante':
              this.menuItems = MENU.filter((item) => {
                return (
                  item.label === 'Main' ||
                  item.label === 'Inicio' ||
                  item.label === 'Usuario' ||
                  item.label === 'Mis Aplicaciones' ||
                  item.label === 'Mi perfil' ||
                  item.label === 'Calendar'
                );
              });
              break;
            case 'Empresa':
              this.menuItems = MENU.filter((item) => {
                return (
                  item.label === 'Main' ||
                  item.label === 'Inicio' ||
                  item.label === 'Usuario' ||
                  item.label === 'Mis Aplicaciones' ||
                  item.label === 'Mi perfil' ||
                  item.label === 'Calendar' ||
                  item.label === 'Empresas' ||
                  item.label === 'Perfil Empresa' ||
                  item.label === 'crear vacante' ||
                  item.label === 'Ver Vacantes' ||
                  item.label === 'Ver candidatos'
                );

              });
              this.showRegisterButton = false;
              break;
            default:
              this.menuItems = [];
              break;
          }
        }

        /**
         * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
         */
        const desktopMedium = window.matchMedia(
          '(min-width:992px) and (max-width: 1199px)'
        );
        desktopMedium.addEventListener('change', () => {
          this.iconSidebar;
        });
        this.iconSidebar(desktopMedium);
      }
    } catch (error) {
      console.error(error);
    }
  }



  ngAfterViewInit() {
    // activate menu item
    new MetisMenu(this.sidebarMenu.nativeElement);

    this._activateMenuDropdown();
  }
  async Optenermenu() {
    const currentUser = await this.userService.getCurrentUser();
    const userRole = await this.rolesService.getRoleByUserId(currentUser.uid);
    if (userRole) {
      switch (userRole.role) {
        case 'admin':
          this.menuItems = MENU;
          break;
        case 'Aspirante':
          this.menuItems = MENU.filter((item) => {
            return (
              item.label === 'Main' ||
              item.label === 'Inicio' ||
              item.label === 'Usuario' ||
              item.label === 'Mis Aplicaciones' ||
              item.label === 'Mi perfil' ||
              item.label === 'Calendar'
            );
          });
          break;
        case 'Empresa':
          this.menuItems = MENU.filter((item) => {
            return (
              item.label === 'Main' ||
              item.label === 'Inicio' ||
              item.label === 'Usuario' ||
              item.label === 'Mis Aplicaciones' ||
              item.label === 'Mi perfil' ||
              item.label === 'Calendar' ||
              item.label === 'Empresas' ||
              item.label === 'Perfil Empresa' ||
              item.label === 'crear vacante' ||
              item.label === 'Ver Vacantes' ||
              item.label === 'Ver candidatos'
            );
          });
          break;
        default:
          this.menuItems = [];
          break;
      }
    }
  }

  /**
   * Toggle sidebar on hamburger button click
   */
  toggleSidebar(e: Event) {
    this.sidebarToggler.nativeElement.classList.toggle('active');
    this.sidebarToggler.nativeElement.classList.toggle('not-active');
    if (window.matchMedia('(min-width: 992px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-folded');
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-open');
    }
  }

  /**
   * Toggle settings-sidebar
   */
  toggleSettingsSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('settings-open');
  }

  /**
   * Open sidebar when hover (in folded folded state)
   */
  operSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.add('open-sidebar-folded');
    }
  }

  /**
   * Fold sidebar after mouse leave (in folded state)
   */
  closeSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.remove('open-sidebar-folded');
    }
  }

  /**
   * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
   */
  iconSidebar(mq: MediaQueryList) {
    if (mq.matches) {
      this.document.body.classList.add('sidebar-folded');
    } else {
      this.document.body.classList.remove('sidebar-folded');
    }
  }

  /**
   * Switching sidebar light/dark
   */
  onSidebarThemeChange(event: Event) {
    this.document.body.classList.remove('sidebar-light', 'sidebar-dark');
    this.document.body.classList.add((<HTMLInputElement>event.target).value);
    this.document.body.classList.remove('settings-open');
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * Reset the menus then hilight current active menu item
   */
  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }

  /**
   * Resets the menus
   */
  resetMenuItems() {
    const links = document.getElementsByClassName('nav-link-ref');

    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.remove('mm-active');
        const parent2El = parentEl.parentElement;

        if (parent2El) {
          parent2El.classList.remove('mm-show');
        }

        const parent3El = parent2El?.parentElement;
        if (parent3El) {
          parent3El.classList.remove('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.remove('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.remove('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.remove('mm-active');
            }
          }
        }
      }
    }
  }

  /**
   * Toggles the menu items
   */
  activateMenuItems() {
    const links: any = document.getElementsByClassName('nav-link-ref');

    let menuItemEl = null;

    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (window.location.pathname === links[i]['pathname']) {
        menuItemEl = links[i];

        break;
      }
    }

    if (menuItemEl) {
      menuItemEl.classList.add('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.add('mm-active');

        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add('mm-show');
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.add('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.add('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.add('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.add('mm-active');
            }
          }
        }
      }
    }
  }
}
