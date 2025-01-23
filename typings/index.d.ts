import { Config } from '@shared/types';

declare global {
  interface Window {
    __NEXT_DATA__: any;
    __REDUX_SERVER_STATE__: any;
    $runtimeConfig: Config;
  }
}

declare module '@yyy/zz';
