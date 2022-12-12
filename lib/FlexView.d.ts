import { StyleProp, ViewStyle } from "react-native";
export default function FlexView(props: {
    start: boolean;
    end: boolean;
    stretch: boolean;
    evenly: boolean;
    between: boolean;
    row: boolean;
    margin: number;
    padding: number;
    style: StyleProp<ViewStyle>;
    children?: JSX.Element[];
}): JSX.Element;
