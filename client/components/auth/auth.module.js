'use strict';

angular.module('irAppApp.auth', [
  'irAppApp.constants',
  'irAppApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
