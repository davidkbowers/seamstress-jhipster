import { Route } from '@angular/router';

import { BearsComponent } from './bears.component';

export const BEARS_ROUTE: Route = {
  path: 'bears',
  component: BearsComponent,
  data: {
    authorities: [],
    pageTitle: 'My Sweet Memory Bears',
  },
};
