/*
// ! 是 typescript 非空断言符，解决 ts 类型空提示问题

// void promise 函数返回值类型 () => Promise<void>
*/

// @ts-nocheck  // 忽略整个文件
// @ts-ignore  // 忽略一行

// ts高级用法 Omit Pick
import { INameProps } from './Name';
type IDashboardNameProps = {
  className?: string;
  style: React.CSSProperties;
} & Pick<INameProps, 'id' | 'onSaved'>;

export interface Config {
  dr: 'cn' | 'us' | undefined;
  env: 'prod' | 'testing' | 'local';
  serviceName?: string;
  [property: string]: any;
}

export type * as xTypes from 'x-editor'
export type { default as xTypes } from 'x-editor'

export type ProFormListItemProps = {
  onAfterAdd?: (...params: any) => any;
}

// Arrow function returning an array of numbers
const getArr2 = (): (string | number)[] => {
  return [1, '2', 3];
};
// arrow function
const getObj2 = async (): Promise<{ name: string; age: number: [key: string]: any; }> => {
  return { name: 'Bobby Hadz', age: 30, xx: 'any' };
};
// Readonly
function getTuple(): Readonly<[number, number]> {
  return [10, 100];
  // return [10, 100] as const;
}

// 泛型
interface GenericInterface<T> {
  (arg: T): T
}
function foo<T> (arg: T): T {
  return arg
}
let output = foo('string') // type of output will be 'string'
let myFoo: GenericInterface<number> = foo
myFoo(123)

// 命名空间 types/ajax.d.ts
declare namespace Ajax {
  export interface AxiosResponse {
    data: AjaxResponse
  }
  export interface AjaxResponse {
    code: number,
    data: object | null | Array<any>,
    message: string
  }
}

axiosRequest({ key: 'idc' }).then((res: Ajax.AjaxResponse) => {
  console.log(res)
})
