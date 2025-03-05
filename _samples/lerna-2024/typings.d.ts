
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
