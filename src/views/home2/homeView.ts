import * as Backbone from "backbone"
import * as $ from "jquery"

export default class Home2View extends Backbone.View<Backbone.Model> {
    private readonly params: string;

    constructor(params: string, options?: Backbone.ViewOptions<Backbone.Model>) {
        super(options);
        this.params = params;
    }

    render() {
        const a = document.createElement('a');
        a.innerText = 'go to home ' + this.params;
        a.href = '#';
        this.$el.append($(a));
        $("body").append(this.$el);

        return this;
    }
}