import * as React from "react";
import { View } from "react-native";
export default function Spacer(props) {
    return (<View style={{
            height: (!props.row && props.space) || 10,
            width: (props.row && props.space) || 10,
            flex: (props.flex && props.flex) || 0,
        }}/>);
}
//# sourceMappingURL=Spacer.js.map