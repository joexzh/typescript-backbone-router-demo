import { IMap, BaseController } from "./baseController"

export default class HomeController extends BaseController {
    actionMap() {
        return {};
    }

    async index() {
        const a = document.createElement('a');
        a.innerText = 'go to #home2/index2';
        a.href = '#home2/index2?abc';
        document.body.appendChild(a);
        
        const br = document.createElement('br');
        document.body.appendChild(br);
    }
}