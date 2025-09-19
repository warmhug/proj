/*
typings.d.ts
css-modules.d.ts
scss.d.ts
declare.d.ts
dStyleDTO.ts
*/

declare module 'classnames';
declare module 'uuid';

interface Window {
  DarkReader: any;
}

declare module '*.html' {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.less';
declare module '*.module.less' {
  const content: { [className: string]: string };
  export default content;
}

declare namespace modalManageType {
  interface ModalConfigObj {
    isModalManager?: boolean;
    promise: ModalPromiseObj;
    onCancel?(): void;
  }

  interface OpenConfigProps {
    componentProps: ComponentProps;
    component: any;
  }

  interface ModalPromiseObj {
    resolve(data?: any): void;
    reject(error?: any): void;
  }

  interface ComponentProps {
    [key: string]: any;
  }
}

// declare module '*.module.scss' {
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss';
declare module '*.less';

declare namespace DApi {
  namespace dStyle {
    interface Req {
      id?: number;
    }
    type Res = typeof import('./dStyleDTO').dStyleDTO.Res;
    type Fn = TFN<Req, Res>;
  }
}

import { IsBoolean, IsOptional } from 'class-validator';
export namespace dStyleDTO {
  export const Res = Boolean();
  export class Response {
    @IsBoolean()
    @IsOptional()
    res?: typeof Res;
  }
}
export const dStyle: DApi.dStyle.Fn = (params, options) => {
};
