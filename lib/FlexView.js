import * as React from "react";
import { View } from "react-native";
export default function FlexView(props) {
    const viewStyle = {
        display: "flex",
        flex: 1,
        padding: props.padding || 5,
        marginHorizontal: props.margin,
        flexDirection: (props.row && "row") || "column",
        justifyContent: (props.end && "flex-end") ||
            (props.start && "flex-start") ||
            (props.evenly && "space-evenly") ||
            (props.between && "space-between") ||
            "center",
        alignItems: (props.stretch && "stretch") || "center",
    };
    return <View style={[props.style, viewStyle]}>{props.children}</View>;
}
//# sourceMappingURL=FlexView.js.map