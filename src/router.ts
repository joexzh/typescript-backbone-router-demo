import * as Backbone from "backbone"
import { BaseController } from "controllers/baseController"

/**
 * You should invoke start() after initialized router.
 */
export default class AppRouter extends Backbone.Router {
    private defaultControllerName: string;
    private cachedControllers: { [controllerName: string]: BaseController } = {};
    private Controller: { [key: string]: string } = {};

    constructor(defaultControllerName: string, options?: Backbone.RouterOptions) {
        super(options);

        this.routes = <any>{
            '': 'dispatchController',
            ':controller': 'dispatchController',
            ':controller/:action': 'dispatchController',
            ':controller/:action/*path': 'dispatchController'
        };
        (<any>this)._bindRoutes();
        this.defaultControllerName = defaultControllerName;
    }

    /**
     * the key must be lowerCase
     */
    public setControllerMap() {
        this.Controller
    }

    public start(options?: Backbone.HistoryOptions) {
        Backbone.history.start(options);
        return this;
    }

    dispatchController(controllerName?: string, actionName?: string, params?: string) {
        if (!controllerName) {
            this.executeController(this.defaultControllerName);
        } else {
            this.executeController(controllerName, actionName, params)
        }
    }

    private async executeController(controllerName: string, actionName?: string, params?: string) {
        if (!this.cachedControllers[controllerName]) {
            const Controller = await import('controllers/' + controllerName + 'Controller');
            if (!Controller.default) throw 'controller "' + controllerName + '" not exist';

            this.cachedControllers[controllerName] = new Controller.default();
        }

        const controller = this.cachedControllers[controllerName];
        if (!actionName) {
            await controller.defaultAction();
        } else {
            actionName = actionName.toLowerCase();
            const func = controller.getAction(actionName);
            await func.apply(controller, params);
        }
    }
}