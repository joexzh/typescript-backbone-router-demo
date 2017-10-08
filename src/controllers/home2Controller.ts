import { BaseController } from 'controllers/baseController'

export default class Home2Controller extends BaseController {
    actionMap() {
        return {
            'index2': this.index2
        }
    }

    private async index2(params: string) {
        const Home2View = (await import("views/home2/homeView")).default;
        const view = new Home2View(params);
        super.RenderView(view);
    }
}