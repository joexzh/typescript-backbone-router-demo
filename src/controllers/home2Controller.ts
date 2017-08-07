import { BaseController } from 'controllers/baseController'

export default class Home2Controller extends BaseController {
    actionMap() {
        return {
            'index2': this.index2
        }
    }

    private index2(params: string) {
        const a = document.createElement('a');
        a.innerText = 'go to home ' + params;
        a.href = '#';
        document.body.appendChild(a);

        const br = document.createElement('br');
        document.body.appendChild(br);
    }
}