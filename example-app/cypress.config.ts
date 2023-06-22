import { defineConfig } from 'cypress';
import webpackConfig from '../example-app/webpack.config';

export default defineConfig({
    video: false,
    screenshotsFolder: false,
    e2e: {
        baseUrl: 'http://localhost:8080',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        }
    },
    component: {
        devServer: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            framework: 'cypress-ct-aurelia',
            bundler: 'webpack',
            webpackConfig
        }
    }
});
