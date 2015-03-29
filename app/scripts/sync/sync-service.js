(function(){

    var module = angular.module("editAdoc.sync.service", []);

  module.factory("SyncAuth", ["FBURL", "$firebaseAuth", function(FBURL, $firebaseAuth){
    var ref = new Firebase(FBURL);
    return function() {
      return $firebaseAuth(ref);
    }
  }]);

  module.factory("Sync", ["FBURL", function(FBURL){
    var ref = new Firebase(FBURL);
    return function() {
      return ref;
    }
  }]);

  module.factory("SyncProject", ["FBURL", "$firebaseObject", "$firebaseArray", function(FBURL, $firebaseObject, $firebaseArray){
    var ref = new Firebase(FBURL+"/projects/");

    var syncAsObject = function(projectId) {
      return $firebaseObject(ref.child(projectId));
    }

    var syncFileAsObject = function(projectId, fileId) {
        return $firebaseObject(ref.child(projectId).child("files").child(fileId));
    }

    var syncFileAsArray = function(projectId, fileId) {
        return $firebaseArray(ref.child(projectId).child("files").child(fileId));
    }

    var syncFile = function(projectId, fileId) {
        return (ref.child(projectId).child("files").child(fileId));
    }
    var syncFileRevisions = function(projectId, fileId) {
        return (ref.child(projectId).child("files").child(fileId).child("revisions"));
    }
    var syncFileRevisionsAsArray = function(projectId, fileId) {
        return $firebaseArray(ref.child(projectId).child("files").child(fileId).child("revisions"));
    }
    var syncFileRevisionAsObject = function(projectId, fileId, revisionId) {
        return $firebaseObject(ref.child(projectId).child("files").child(fileId).child("revisions").child(revisionId));
    }
      var syncFileRevisionAsciidocAsObject = function(projectId, fileId, revisionId) {
          return $firebaseObject(ref.child(projectId).child("files").child(fileId).child("revisions").child(revisionId).child("asciidoc"));
      }

    var syncFileRevisionEventAsArray = function(projectId, fileId, revisionId) {
        return $firebaseArray(ref.child(projectId).child("files").child(fileId).child("events").child("revision:"+revisionId));
    }

    var sync = function() {
      return ref;
    }

    return {
      syncAsObject: syncAsObject,
      syncFileAsObject: syncFileAsObject,
      syncFileAsArray: syncFileAsArray,
      syncFile: syncFile,
      syncFileRevisions: syncFileRevisions,
      syncFileRevisionsAsArray: syncFileRevisionsAsArray,
      syncFileRevisionAsObject: syncFileRevisionAsObject,
      syncFileRevisionAsciidocAsObject: syncFileRevisionAsciidocAsObject,
      syncFileRevisionEventAsArray: syncFileRevisionEventAsArray,
      sync: sync
    }
  }]);

  module.factory("SyncUser", ["FBURL", "$firebaseObject", "$firebaseArray", function(FBURL, $firebaseObject, $firebaseArray){
      var ref = new Firebase(FBURL+"/users/");

      var syncUserAsObject = function(userid) {
        return $firebaseObject(ref.child(userid));
      }

      var syncUserAuthAsObject = function(userid) {
          return $firebaseObject(ref.child(userid).child("auth"));
      }

      var syncUserProjectAsObject = function(userid, projectId) {
          return $firebaseObject(ref.child(userid).child("projects").child(projectId));
      }

      var syncUsersAsObject = function() {
          return $firebaseObject(ref);
      }
      var sync = function() {
        return ref;
      }
        var syncUsersAsArray = function() {
          return $firebaseArray(ref);
        }

      return {
        syncUserAsObject: syncUserAsObject,
        syncUserAuthAsObject: syncUserAuthAsObject,
        syncUserProjectAsObject: syncUserProjectAsObject,
        syncUsersAsObject: syncUsersAsObject,
        sync: sync,
        syncUsersAsArray: syncUsersAsArray
      }
  }]);

  module.factory("SyncUserConnected", ["FBURL", function(FBURL){
    var ref = new Firebase(FBURL+"/.info/connected");

    var sync = function() {
      return ref;
    }

    return {
      sync: sync
    }
  }]);

    module.factory("SyncUsersPresence", ["FBURL", "$firebaseObject", function(FBURL, $firebaseArray){
        var ref = new Firebase(FBURL+"/presence/");

        var sync = function() {
            return ref;
        }

        var syncUsersPresenceAsArray = function(){
            return $firebaseArray(ref);
        }

        var syncUserConnections = function(userid) {
            return (ref.child(userid).child("connections"));
        }

        var syncUser = function(userid) {
            return (ref.child(userid));
        }

        var syncUserLastOnline = function(userid) {
            return (ref.child(userid).child("lastOnline"));
        }
        var syncUserIsOnline = function(userid) {
            return (ref.child(userid).child("isOnline"));
        }

        return {
            sync: sync,
            syncUserConnections: syncUserConnections,
            syncUserLastOnline: syncUserLastOnline,
            syncUserIsOnline: syncUserIsOnline,
            syncUser: syncUser,
            syncUsersPresenceAsArray: syncUsersPresenceAsArray
        }
    }]);
})();
