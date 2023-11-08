declare global {
    interface XMLHttpRequest {
        "__SIMULATE_SERVICE_OBJECT__": any;
        "serviceOpen": Function;
        "serviceSend": Function;
    }
}
declare function fixed(n: string | number, f?: (string | number)): string;
declare function int(n: string | number): number;
declare function img(width?: number, height?: number, color?: string): string;
interface ServiceConfig {
    wait?: number;
}
interface PathConfig {
    type?: string;
    response: (params: any) => any;
}
interface ServeParams {
    [prop: string]: PathConfig;
}
declare function serve(obj: ServeParams): void;
declare namespace serve {
    var getConfig: () => {
        wait?: number | undefined;
    };
    var setConfig: (obj: ServiceConfig) => void;
}

interface ServePropOption {
    getConfig: typeof serve.getConfig;
    setConfig: typeof serve.setConfig;
    fixed: typeof fixed;
    int: typeof int;
    img: typeof img;
}
type ServeFunction = typeof serve;
type ServeOption = ServeFunction & ServePropOption;
declare const _default: ServeOption;

export { _default as default };
