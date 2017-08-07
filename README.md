# A SPA demo using typescript and backbone router.

This demo shows how easy to build a SPA using typescript + backbone router.
It would not show the fancy views, but the easiest way for routing to them.

## File directory

```
┌── src                                 our source code
│   ├── controllers                     the `C` of MVC
│   │   ├── baseController.ts           the baseController
│   │   ├── yourController.ts           your controller extends baseController  
│   │   └── yourOtherController.ts      your other controller extends baseController
│   ├── index.html                      entry html
│   ├── index.ts                        entry ts
│   └── router.ts                       the router that extends Backbone.Router
├── dist                                bundle output
├── package.json                        npm config file
├── node_modules                        npm modules
└── webpack.config.js                   webpack config file
```

## Router

By extending Backbone.Router, the router excepts 4 url models, all base on backbone rule: 

```javascript
''                              
// match the default controller and default action, eg. http://domain.com/

':controller'                   
// match the specific controller and default action, eg. http://domain.com/home

':controller/:action'           
// match the specific controller and specific action, eg. http://domain.com/home/index

':controller/:action/*path'     
// match the specific controller, specific action and the rest after action, eg. http://domain.com/home/index?x=y or http://domain.com/home/index/1
```

To initialize a router, you must indicate the defulat controller and then start the router:

```javascript
const router = new Router("home")   // set homeController as default
router.start()                      // accept options just like Back.history.start();
```


## Create your own controller

Every controller you creat must inherit from baseController.
The baseController has built in a default action called `index` with void implement, you can override it.

If you create the actions other than index, you must rewrite the actionMap() letting the router to know your action rule for url and your own function

All the controllers are dynamically imported, so the app loading spead is optimized.

> **Note: The controller must be placed in 'controllers/' and named end up with 'Controller', so that router can find the proper module.**

> **`export default class` is a must in the controller.**

The example controller is like below: 

`./src/controller/home2Controller.ts`

```javascript
import { BaseController } from 'controllers/baseController'

export default class Home2Controller extends BaseController {
    actionMap() {
        return {
            'index2': this.index2
        }
    }

    private index2(params: string) {
        console.log('this is index2 action!');
    }
}
```

## build and run

run npm script to build development code, product code or dev server

```
npm run build
npm run build-p
npm run dev
```

That's it, simple and convenient!