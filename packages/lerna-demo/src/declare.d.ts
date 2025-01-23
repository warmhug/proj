declare namespace SApi {
  namespace offStyle {
    interface Req {
      id?: number;
    }

    type Res = typeof import('./index').offStyleDTO.Res;
    type Fn = TFN<Req, Res>;
  }
}
