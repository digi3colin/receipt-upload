const { RouteList, loadModuleRoutes } = require('@kohanajs/mod-route');
loadModuleRoutes();

RouteList.add('/', 'controller/Home');
RouteList.add('/pages/:slug', 'controller/Home', 'page');
RouteList.add('/submit', 'controller/Home', 'submit', 'POST');