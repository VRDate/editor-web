'use strict';
(function(){

    var module = angular.module('editAdoc.service.storage', []);

    module.service('LocalStorage', function LocalStorage($localStorage, $q) {
        var storageKey = 'EditAdocCache';
        var changeListeners =  Object.create(null);
        var that = this;

        $localStorage[storageKey] = $localStorage[storageKey] || Object.create(null);

        this.save = function (key, value) {
            if (value === null) {
                return;
            }

            if (Array.isArray(changeListeners[key])) {
                changeListeners[key].forEach(function (fn) {
                    fn(value);
                });
            }

            //_.debounce(function () {
               // window.requestAnimationFrame(function () {
                    $localStorage[storageKey][key] = value;
                //});
          //  }, 100)();
        };

        this.reset = function () {
            Object.keys($localStorage[storageKey]).forEach(function (key) {
                that.save(key, '');
            });
        };

        this.load = function (key) {
            var deferred = $q.defer();
            if (!key) {
                deferred.resolve($localStorage[storageKey]);
            } else {
                deferred.resolve($localStorage[storageKey][key]);
            }

            return deferred.promise;
        };

        this.addChangeListener = function (key, fn) {
            if (angular.isFunction(fn)) {
                if (!changeListeners[key]) {
                    changeListeners[key] = [];
                }
                changeListeners[key].push(fn);
            }
        };
    });


    /*
     * Determines if LocalStorage should be used for storage or a Backend
    */
    module.service('Storage', function Storage(LocalStorage,
      defaults) {
      if (defaults.useBackendForStorage) {
          //TODO : handle backend storage or Firebird Storage ?
        return LocalStorage;
      }

      return LocalStorage;
    });

})();
