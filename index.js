import React from "react";
import { AppRegistry, View, NativeModules, VrButton } from "react-360";
import { registerKeyboard } from "react-360-keyboard";
import { Text } from "react-native";
import { wrap } from "./components/Wrapper/Wrapper.component";
import TooltipComponent from "./components/Tooltip/Tooltip.component";
import TransitionComponent from "./components/Transition/Transition.component";
import "./global.js";
import { StyleSheet } from "react-360";

const { Data } = NativeModules;

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    links: [],
  };
  componentDidMount = () => {
    Data.get()
      .then((data) => {
        this.setState(() => ({
          links: data.links,
        }));
      })
      .catch(() => {
        console.error("That's an error...");
      });
  };
  onClick() {
    NativeModules.Keyboard.startInput({
      placeholder: "Enter a location",
    }).then((input) => {
      console.log(input);
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?key=1037f542c28b424aad38a3488bbe2573&q=${input}&pretty=1`
      )
        .then((response) => response.json())
        .then((json) => {
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
      <View>
        {/* <View style={styles.container}> */}
        {/* <View>
          {this.state.links.map((link, i) => (
            <Panel link={link} key={i} />
          ))}
        </View> */}
        <VrButton onClick={this.onClick}>
          <Text style={styles.panelText}>Show Keyboard</Text>
        </VrButton>
        {this.state.links.map((link, i) => (
          <Panel link={link} key={i} />
        ))}
      </View>
    );
  }
}
class Panel extends View {
  constructor(props) {
    super(props);

    this.link = props.link;
  }
  state = {
    styles: {
      topLeft: {
        opacity: 0,
        position: "absolute",
        width: 20,
        height: 20,
        borderLeftWidth: 3,
        borderTopWidth: 3,
        borderColor: "black",
      },
      topRight: {
        opacity: 0,
        position: "absolute",
        right: 0,
        width: 20,
        height: 20,
        borderRightWidth: 3,
        borderTopWidth: 3,
        borderColor: "black",
      },
      bottomLeft: {
        opacity: 0,
        position: "absolute",
        bottom: 0,
        width: 20,
        height: 20,
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        borderColor: "black",
      },
      bottomRight: {
        opacity: 0,
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 20,
        height: 20,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        borderColor: "black",
      },
      panelContainer: {
        width: 200,
        height: 100,
        padding: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: null,
      },
    },
  };
  onEnter = () => {
    this.setState(() => ({
      styles: {
        ...this.state.styles,
        topLeft: {
          ...this.state.styles.topLeft,
          opacity: 1,
        },
        topRight: {
          ...this.state.styles.topRight,
          opacity: 1,
        },
        bottomLeft: {
          ...this.state.styles.bottomLeft,
          opacity: 1,
        },
        bottomRight: {
          ...this.state.styles.bottomRight,
          opacity: 1,
        },
      },
    }));
  };
  onExit = () => {
    this.setState(() => ({
      styles: {
        ...this.state.styles,
        topLeft: {
          ...this.state.styles.topLeft,
          opacity: 0,
        },
        topRight: {
          ...this.state.styles.topRight,
          opacity: 0,
        },
        bottomLeft: {
          ...this.state.styles.bottomLeft,
          opacity: 0,
        },
        bottomRight: {
          ...this.state.styles.bottomRight,
          opacity: 0,
        },
      },
    }));
  };
  render() {
    return (
      <View
        style={this.state.styles.panelContainer}
        onEnter={this.onEnter}
        onExit={this.onExit}
      >
        <View style={this.state.styles.topLeft} />
        <View style={this.state.styles.topRight} />
        <View style={this.state.styles.bottomLeft} />
        <View style={this.state.styles.bottomRight} />
        <View style={styles.panel}>
          <Link name={this.link.name} url={this.link.url} />
        </View>
      </View>
    );
  }
}

class Link extends View {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.url = props.url;
  }
  name = null;
  url = null;
  redirect = () => {
    NativeModules.CustomLinkingModule.openInNewTab(this.url);
  };
  render() {
    return (
      <VrButton onClick={this.redirect} style={styles.button}>
        <Text style={styles.panelText}>{this.name}</Text>
      </VrButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: 4680,
    alignItems: "center",
  },
  panel: {
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  button: {},
  panelText: {
    fontSize: 30,
    textAlign: "center",
    color: "black",
  },
});
AppRegistry.registerComponent(...registerKeyboard);

AppRegistry.registerComponent("TransitionComponent", () =>
  wrap(TransitionComponent)
);
AppRegistry.registerComponent("MainComponent", () => wrap(MainComponent));
AppRegistry.registerComponent("TooltipComponent", () => wrap(TooltipComponent));
