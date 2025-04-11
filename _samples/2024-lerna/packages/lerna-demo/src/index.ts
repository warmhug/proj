import { IsBoolean, IsOptional } from 'class-validator';


export namespace offStyleDTO {
  export const Res = Boolean();
  export class Response {
    @IsBoolean()
    @IsOptional()
    res?: typeof Res;
  }
}

export const offStyle: SApi.offStyle.Fn = (params, options) => {

};
