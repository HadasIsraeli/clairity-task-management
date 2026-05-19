import { Pill } from "./Pill";
import { C } from "../constants/theme";

export default {
    title: 'Components/Pill',
    component: Pill,
};

export const Default = {
    args: {
        label: 'Pill',
        color: C.indigo
    },
};

export const Primary = {
    args: {
        label: 'In Progress',
        color: C.teal,
        dim: C.tealDim
    },
};

export const Small = {
    args: {
        label: 'High',
        color: C.red,
        small: true
    },
};