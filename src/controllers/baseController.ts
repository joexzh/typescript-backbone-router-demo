import * as _ from 'underscore'

export interface IMap {
    [key: string]: Function
}

export abstract class BaseController {
    private readonly internalActionMap: IMap = {};
    private static currentView: Backbone.View<Backbone.Model>;

    /**
     * Every member will be convert to lowerCase key and stored internal.
     */
    protected actionMap(): IMap {
        return {
            'index': this.index
        }
    }

    constructor() {
        this.setInternalActionMap(this.actionMap());
    }

    public getAction(lowerCaseActionName: string) {
        const func = this.internalActionMap[lowerCaseActionName];
        if (!_.isFunction(func)) throw 'action "' + lowerCaseActionName + '" not exist';

        return this.internalActionMap[lowerCaseActionName];
    }

    public async defaultAction() {
        await this.index();
    }

    protected RenderView(view: Backbone.View<Backbone.Model>) {
        if (BaseController.currentView) BaseController.currentView.remove();
        
        BaseController.currentView = view.render();
        return BaseController.currentView;
    }

    private setInternalActionMap(map: IMap) {
        if (!map['index']) this.internalActionMap['index'] = this.index;

        for (let prop in map) {
            const func = map[prop];
            prop = prop.toLowerCase();
            this.internalActionMap[prop] = func;
        }
    }

    protected async index() { }
}