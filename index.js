import React from "react";
import { AppRegistry, View, NativeModules, VrButton } from "react-360";
import { registerKeyboard } from "react-360-keyboard";
import { Text } from "react-native";
import { wrap } from "./components/Wrapper/Wrapper.component";
import TooltipComponent from "./components/Tooltip/Tooltip.component";
import TransitionComponent from "./components/Transition/Transition.component";
import "./global.js";

export default class MainComponent extends React.Component {
  // state = {
  //   currentloc: null,
  //   apidata: null,
  // };
  onClick() {
    // 4.) show the keyboard
    NativeModules.Keyboard.startInput({
      placeholder: "Enter your name",
    }).then((input) => {
      console.log(input);
      // this.setState({ currentloc: input });
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?key=1037f542c28b424aad38a3488bbe2573&q=${input}&pretty=1`
      )
        .then((response) => response.json())
        .then((json) => {
          // this.setState({ apidata: json });
          console.log(json);
          global.lat = json["results"][0]["geometry"]["lat"];
          global.long = json["results"][0]["geometry"]["lng"];
          console.log(global.lat);
          console.log(global.long);
        })
        .catch((error) => console.error(error));
    });
  }

  render() {
    NativeModules.TooltipModule.setTooltips(this.props.name);
    NativeModules.TransitionModule.setTooltips(this.props.name);
    return (
      <VrButton onClick={this.onClick}>
        <Text>Show Keyboard</Text>
      </VrButton>
    );
  }
}
AppRegistry.registerComponent(...registerKeyboard);

AppRegistry.registerComponent("TransitionComponent", () =>
  wrap(TransitionComponent)
);
AppRegistry.registerComponent("MainComponent", () => wrap(MainComponent));
AppRegistry.registerComponent("TooltipComponent", () => wrap(TooltipComponent));
