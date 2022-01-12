import React from "react";
import { asset, Image, View, StyleSheet, NativeModules, Text } from "react-360";
import { getDistance, getPreciseDistance } from "geolib";
import "../../global.js";

const tooltipModule = NativeModules.TooltipModule;

export default class TooltipComponent extends React.Component {
  state = {
    source: this.props.iconImg,
    width: this.props.width ? this.props.width : 100,
    height: this.props.height ? this.props.height : 100,
    isMouseOver: false,
  };

  onMouseOn() {
    tooltipModule.resizeTooltip(this.props.index, 300, 300);
    this.setState({
      source: `img/attractions/${this.props.infoImg}`,
      width: 300,
      height: 200,
      isMouseOver: true,
    });
  }

  onMouseOut() {
    tooltipModule.resizeTooltip(
      this.props.index,
      this.props.width,
      this.props.height
    );
    this.setState({
      source: this.props.iconImg,
      width: this.props.width,
      height: this.props.height,
      isMouseOver: false,
    });
  }

  render() {
    const styleSheet = StyleSheet.create({
      viewPanel: {
        width: this.state.width,
        height: this.state.height,
        borderRadius: 10,
      },
      textBlock: {
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#FFFFFF",
        width: 300,
        maxHeight: 1000,
      },
      text: {
        fontSize: 24,
        color: "#000000",
      },
    });

    return (
      <View
        hitSlop={160}
        style={styleSheet.viewPanel}
        onEnter={() => this.onMouseOn()}
        onExit={() => this.onMouseOut()}
      >
        <Image
          source={asset(`${this.state.source}`)}
          style={styleSheet.viewPanel}
        />

        {this.state.isMouseOver ? (
          <View style={styleSheet.textBlock}>
            <Text style={styleSheet.text}>{this.props.text}</Text>
            <Text style={styleSheet.text}>
              Distance from entered location:{" "}
              {String(
                getPreciseDistance(
                  { latitude: this.props.lat, longitude: this.props.long },
                  { latitude: global.lat, longitude: global.lat }
                )
              )}{" "}
              meters
            </Text>

            {/* <Text style={styleSheet.text}>
              {String(
                getPreciseDistance(
                  { latitude: this.props.lat, longitude: this.props.long },
                  { latitude: 51.528308, longitude: -0.3817765 }
                )
              )}
            </Text> */}
          </View>
        ) : null}
      </View>
    );
  }
}
