declare const __EnvConfig__: Env;

interface Host {
}

interface Env {
    platformCode: number,
    host: Host
}

interface EnvConfig {
    dev: Env,
    test: Env,
    production: Env
}

declare module "*.json" {
    const config: EnvConfig;
    export default config;
}