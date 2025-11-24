import { initFederation } from '@angular-architects/native-federation';

initFederation('./api/discovery/mfe')
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
