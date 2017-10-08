import { IMap, BaseController } from "controllers/baseController"

export default class HomeController extends BaseController {
    actionMap() {
        return {};
    }

    async index() {
        const HomeView = (await import("views/home/homeView")).default;
        const view = new HomeView();
        super.RenderView(view);
    }
}