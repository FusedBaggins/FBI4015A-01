import express from 'express';
import http from 'http';

// local
import routes from "./routes";

class Application {
    express: express.Application
    server: http.Server

    constructor() {
        this.express = express();
        this.server = http.createServer(this.express);

        this._setMiddlewares();
        this._setRoutes();
    }


    private _setMiddlewares(): void {
        this.express.use(express.json());
    }

    private _setRoutes(): void {
        this.express.use(routes);
    }
}

export default new Application().server;