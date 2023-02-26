import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Inicio',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Usuario',
    isTitle: true
  },
  // {
  //   label: 'Mensajes',
  //   icon: 'mail',
  //   subItems: [
  //     {
  //       label: 'Inbox',
  //       link: '/apps/email/inbox',
  //     },
  //     // {
  //     //   label: 'Read',
  //     //   link: '/apps/email/read'
  //     // },
  //     // {
  //     //   label: 'Compose',
  //     //   link: '/apps/email/compose'
  //     // },
  //   ]
  // },
  {
    label: 'Mis Aplicaciones',
    icon: 'message-square',
    link: '/apps/chat',
  },
  {
    label: 'Mi perfil',
    icon: 'file-text',
    link: '/general/profile',
  },
  {
    label: 'Calendar',
    icon: 'calendar',
    link: '/apps/calendar',
    badge: {
      variant: 'primary',
      text: 'Event',
    }
  },
  {
    label: 'Empresas',
    isTitle: true
  },
  //{
  //   label: 'UI Kit',
  //   icon: 'feather',
  //   subItems: [
  //     {
  //       label: 'Accordion',
  //       link: '/ui-components/accordion',
  //     },
  //     {
  //       label: 'Alerts',
  //       link: '/ui-components/alerts',
  //     },
  //     {
  //       label: 'Badges',
  //       link: '/ui-components/badges',
  //     },
  //     {
  //       label: 'Breadcrumbs',
  //       link: '/ui-components/breadcrumbs',
  //     },
  //     {
  //       label: 'Buttons',
  //       link: '/ui-components/buttons',
  //     },
  //     {
  //       label: 'Button group',
  //       link: '/ui-components/button-group',
  //     },
  //     {
  //       label: 'Cards',
  //       link: '/ui-components/cards',
  //     },
  //     {
  //       label: 'Carousel',
  //       link: '/ui-components/carousel',
  //     },
  //     {
  //       label: 'Collapse',
  //       link: '/ui-components/collapse',
  //     },
  //     {
  //       label: 'Datepicker',
  //       link: '/ui-components/datepicker',
  //     },
  //     {
  //       label: 'Dropdowns',
  //       link: '/ui-components/dropdowns',
  //     },
  //     {
  //       label: 'List group',
  //       link: '/ui-components/list-group',
  //     },
  //     {
  //       label: 'Media object',
  //       link: '/ui-components/media-object',
  //     },
  //     {
  //       label: 'Modal',
  //       link: '/ui-components/modal',
  //     },
  //     {
  //       label: 'Navs',
  //       link: '/ui-components/navs',
  //     },
  //     {
  //       label: 'Navbar',
  //       link: '/ui-components/navbar',
  //     },
  //     {
  //       label: 'Pagination',
  //       link: '/ui-components/pagination',
  //     },
  //     {
  //       label: 'Popovers',
  //       link: '/ui-components/popovers',
  //     },
  //     {
  //       label: 'Progress',
  //       link: '/ui-components/progress',
  //     },
  //     {
  //       label: 'Rating',
  //       link: '/ui-components/rating',
  //     },
  //     {
  //       label: 'Scrollbar',
  //       link: '/ui-components/scrollbar',
  //     },
  //     {
  //       label: 'Spinners',
  //       link: '/ui-components/spinners',
  //     },
  //     {
  //       label: 'Timepicker',
  //       link: '/ui-components/timepicker',
  //     },
  //     {
  //       label: 'Tooltips',
  //       link: '/ui-components/tooltips',
  //     },
  //     {
  //       label: 'Typeadhed',
  //       link: '/ui-components/typeahead',
  //     },
  //   ]
  // },
  {
    label: 'Perfil Empresa',
    icon: 'anchor',
    link: '/form-elements/basic-elements'
    // subItems: [
    //   {
    //     label: 'Cropper',
    //     link: '/advanced-ui/cropper',
    //   },
    //   {
    //     label: 'Owl carousel',
    //     link: '/advanced-ui/owl-carousel',
    //   },
    //   {
    //     label: 'SortableJs',
    //     link: '/advanced-ui/sortablejs',
    //   },
    //   {
    //     label: 'Sweet alert',
    //     link: '/advanced-ui/sweet-alert',
    //   },
    // ]
  },

  {
    label: 'crear vacante',
    icon: 'file-text',
    link: '/advanced-form-elements/form-validation'
    // subItems: [
    //   {
    //     label: 'Basic elements',
    //     link: '/form-elements/basic-elements'
    //   },
    //   {
    //     label: 'Advanced elements',
    //     subItems: [
    //       {
    //         label: 'Form validation',
    //         link: '/advanced-form-elements/form-validation'
    //       },
    //       {
    //         label: 'Input mask',
    //         link: '/advanced-form-elements/input-mask'
    //       },
    //       {
    //         label: 'Ng-select',
    //         link: '/advanced-form-elements/ng-select'
    //       },
    //       {
    //         label: 'Ngx-chips',
    //         link: '/advanced-form-elements/ngx-chips'
    //       },
    //       {
    //         label: 'Ngx-color-picker',
    //         link: '/advanced-form-elements/ngx-color-picker'
    //       },
    //       {
    //         label: 'Ngx-dropzone',
    //         link: '/advanced-form-elements/ngx-dropzone-wrapper'
    //       },
    //     ]
    //   },
    //   {
    //     label: 'Editors',
    //     link: '/form-elements/editors'
    //   },
    //   {
    //     label: 'Wizard',
    //     link: '/form-elements/wizard'
    //   },
    // ]
  },
  {
    label: 'Ver Vacantes',
    icon: 'pie-chart',
    link: '/charts-graphs/apexcharts',
    // subItems: [
    //   {
    //     label: 'ApexCharts',
    //     link: '/charts-graphs/apexcharts',
    //   },
    //   {
    //     label: 'ChartJs',
    //     link: '/charts-graphs/chartjs',
    //   },
    // ]
  },
  {
    label: 'Ver candidatos',
    icon: 'layout',
    link: '/tables/basic-table',
    // subItems: [
    //   {
    //     label: 'Basic tables',
    //     link: '/tables/basic-table',
    //   },
    //   {
    //     label: 'Data table',
    //     link: '/tables/data-table',
    //   },
    //   {
    //     label: 'Ngx-datatable',
    //     link: '/tables/ngx-datatable'
    //   }
    // ]
  },
  // {
  //   label: 'Icons',
  //   icon: 'smile',
  //   subItems: [
  //     {
  //       label: 'Feather icons',
  //       link: '/icons/feather-icons',
  //     },
  //     {
  //       label: 'Mdi icons',
  //       link: '/icons/mdi-icons',
  //     }
  //   ]
  // },
  {
    label: 'Adminitracion',
    isTitle: true
  },
  {
    label: 'Admin',
    icon: 'book',
    subItems: [
      {
        label: 'Listado de Usuarios',
        link: '/general/blank-page',
      },
      {
        label: 'listados de empresas',
        link: '/general/faq',
      },
      {
        label: 'Vacantes Activas',
        link: '/general/invoice',
      },
      {
        label: 'Vacantes completadas ',
        link: '/general/profile',
      },

      {
        label: 'Usuarios baneados',
        link: '/general/pricing',
      },
      {
        label: 'Empresas sin verificar',
        link: '/general/timeline',
      }
    ]
  },
  // {
  //   label: 'Authentication',
  //   icon: 'unlock',
  //   subItems: [
  //     {
  //       label: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       label: 'Register',
  //       link: '/auth/register',
  //     },
  //   ]
  // },
  // {
  //   label: 'Error',
  //   icon: 'cloud-off',
  //   subItems: [
  //     {
  //       label: '404',
  //       link: '/error/404',
  //     },
  //     {
  //       label: '500',
  //       link: '/error/500',
  //     },
  //   ]
  // },
];
