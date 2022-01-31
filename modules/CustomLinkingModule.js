import { Module } from "react-360-web";

export default class CustomLinkingModule extends Module {
  constructor() {
    super("CustomLinkingModule");
  }

  openInNewTab(url) {
    window.open(url, "_blank");
  }
}
