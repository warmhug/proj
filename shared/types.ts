/**
 */
export interface Config {
  dr: 'cn' | 'us' | undefined;
  env: 'prod' | 'testing' | 'local';
  serviceName?: string;
  [property: string]: any;
}
