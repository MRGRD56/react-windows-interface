import IWindow from "./IWindow";

export default interface File {
    name: string;
    iconSrc?: string;
    getWindow: () => IWindow;
}
