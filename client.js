import { ReactInstance } from "react-360-web";
import KeyboardModule from "react-360-keyboard/KeyboardModule";
import { TooltipModule } from "./modules/Tooltip.module";
import { TransitionModule } from "./modules/Transition.module";
import DataModule from "./modules/DataModule";
import CustomLinkingModule from "./modules/CustomLinkingModule";

export let r360;

function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    nativeModules: [
      new TooltipModule(),
      new TransitionModule(),
      new CustomLinkingModule(),
      KeyboardModule.addModule,
      (ctx) => new DataModule(ctx),
    ],
    ...options,
  });
  r360.renderToSurface(
    r360.createRoot("MainComponent"),
    r360.getDefaultSurface()
  );
  r360.compositor.setBackground(r360.getAssetURL("img/360/city_center.jpg"));
  KeyboardModule.setInstance(r360);
}

window.React360 = { init };
