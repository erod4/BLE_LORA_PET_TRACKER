import { View, Text, StyleSheet } from "react-native";
import React from "react";

import Svg, {
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

Ellipse;
const TrainerMarker = ({ rotation }) => {
  const rotationInRadians = (rotation * Math.PI) / 180;
  const rotationTransform = {
    transform: [{ rotate: `${rotation}deg` }],
  };
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="210mm"
      height="297mm"
      viewBox="0 0 210 297"
      style={rotationTransform}
    >
      <Defs>
        <RadialGradient
          xlinkHref="#a"
          id="b"
          cx={109.708}
          cy={107.305}
          r={31.612}
          fx={109.708}
          fy={107.305}
          gradientTransform="matrix(1.2268 0 0 .92546 -23.167 31.455)"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset={0}
            style={{
              stopColor: "#0063ea",
              stopOpacity: 0.56603771,
            }}
          />
          <Stop
            offset={1}
            style={{
              stopColor: "#0000e9",
              stopOpacity: 0,
            }}
          />
        </RadialGradient>
        <LinearGradient id="a">
          <Stop
            offset={0}
            style={{
              stopColor: "#0063ea",
              stopOpacity: 0.56603771,
            }}
          />
          <Stop
            offset={1}
            style={{
              stopColor: "#0000e9",
              stopOpacity: 0,
            }}
          />
        </LinearGradient>
      </Defs>
      <Path
        d="M112.13 160.017 72.64 102.203l77.563-.697Z"
        style={{
          fill: "url(#b)",
          fillRule: "nonzero",
          stroke: "none",
          strokeWidth: 2.0991,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <Ellipse
        cx={111.501}
        cy={142.722}
        rx={13.376}
        ry={12.76}
        style={{
          fill: "#1011b3",
          fillOpacity: 1,
          fillRule: "nonzero",
          stroke: "#e3e3e3",
          strokeWidth: 2.38557,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
    </Svg>
  );
};

export default TrainerMarker;
