import { Module } from "react-360-web";
export default class DataModule extends Module {
  constructor(ctx) {
    super("Data");

    this._rnctx = ctx;
  }
  $get(resolve, reject) {
    window.Data.get().then((data) => {
      console.log("$get", data);

      this._rnctx.invokeCallback(resolve, [data]);
    });
  }
}
