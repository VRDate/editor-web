'use strict';

EditAdocApp.config(function ($provide) {

  $provide.constant("FBURL","https://luminous-fire-672.firebaseio.com/");

  $provide.constant('defaults',

  // BEGIN-DEFAULTS-JSON
  {
    version: '0.1.0.alpha5',

    //notifications
    enableOnOnlineUserNotification: false,

    enableAttachUserToProjectForNoOwner: false,
    enableGitHubIntegration: true,
    limitCollaborativeEvents: 20,


    exampleFiles: [
      'default.adoc',
      'slides.adoc',
      'asciidoctor-manual.adoc'
    ],

    useBackendForStorage: true, //Firebase
    useAsciidoctorBackend: false

  }
  // END-DEFAULTS-JSON

  );
});
