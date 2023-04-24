# HostingPortal

Hosting portal helps a user to host his website. Current requirement is to help a customer search for a server satisfying his criteria and buy that server. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

The code is structured based on features. There are multiple feature modules. Common components are place udner shared module. There are core components provided under core module, which is used in every screen. Server specific components are placed under servers module.

Bootstrap CSS framework is used along with SASS, and global css placed in styles.scss.

## Third party libraries

Following libraries have been used in this application.

1. ngx-spinner - Global spinner whenever a REST API is triggered from application
2. ngx-slider - To show range slider in filter
3. ngx-infinite-scroll - for pagination of results

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
