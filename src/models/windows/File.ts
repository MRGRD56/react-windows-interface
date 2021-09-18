import IWindow from "./IWindow";
import Program from "./Program";

export default interface File {
    name: string;
    iconSrc?: string;
    getWindow: () => IWindow;
    program?: Program;
}
