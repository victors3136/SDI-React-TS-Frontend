import IColorSchemeProvider from "./IColorSchemeProvider";
import ITask from "../../state/public/ITask";

const RED = 0;
const GREEN = 1;
const BLUE = 2;

const hexToRgb: (hex: string) => number[] = (hex) => {
    hex = hex.replace('#', '');

    const bigint = parseInt(hex, 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;

    return [red, green, blue];
}

export const priorityColorProvider = (task: ITask, colorSchemeProvider: IColorSchemeProvider) => {

    const minColor: number[] = hexToRgb(colorSchemeProvider.minPriorityColor());
    const maxColor: number[] = hexToRgb(colorSchemeProvider.maxPriorityColor());

    const normalizedPriority: number = (task.priority - 1) / 9;
    const red: number = Math.floor(minColor[RED] + normalizedPriority * (maxColor[RED] - minColor[RED]));
    const green: number = Math.floor(minColor[BLUE] + normalizedPriority * (maxColor[BLUE] - minColor[BLUE]));
    const blue: number = Math.floor(minColor[GREEN] + normalizedPriority * (maxColor[GREEN] - minColor[GREEN]));

    return `rgb(${red}, ${green}, ${blue})`;
}