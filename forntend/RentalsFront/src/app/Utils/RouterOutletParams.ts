export class RouterOutletParams{
    path: string;
    routerTitle: string;

    constructor(_path: string, _routerTitle: string) {
        this.path = _path;
        this.routerTitle = _routerTitle;
    }
}