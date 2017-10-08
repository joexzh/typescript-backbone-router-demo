import * as Backbone from "backbone"
import * as $ from "jquery"

export default class HomeView extends Backbone.View<Backbone.Model> {
    render() {
        const a = document.createElement('a');
        a.innerText = 'go to #home2/index2';
        a.href = '#home2/index2?abc';

        this.$el.append($(a));
        $("body").append(this.$el);
        return this;
    }
}