# BuildUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

To get started, you will need the latest version of angular (6 or 7 or... they update every 6 months).

`git clone https://github.com/couchbaselabs/build-ui.git`  
`npm install -g @angular/cli@latest`  
`npm install --save-dev @angular-devkit/build-angular`  
`npm install webpack-dev-server`  
`ng build`  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deploying code to a web server

To build the code in a form suitable for placing in your favorite webserver, do:

`ng build -prod`  

That works if the code is going at the top level. If it's going in a subdirectory, such as /build, you need to add the following:

`ng build -prod --base-href /build`  


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
