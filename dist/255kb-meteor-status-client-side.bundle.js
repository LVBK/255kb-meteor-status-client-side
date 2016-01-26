//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Template = Package.templating.Template;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var meteorStatusI18n;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/255kb_meteor-status/packages/255kb_meteor-status.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
                                                                                                                       // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                                               //    // 4
// packages/255kb:meteor-status/client/template.meteor-status.js                                                 //    // 5
//                                                                                                               //    // 6
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                                                 //    // 8
                                                                                                                 // 1  // 9
Template.__checkName("meteorStatus");                                                                            // 2  // 10
Template["meteorStatus"] = new Template("Template.meteorStatus", (function() {                                   // 3  // 11
  var view = this;                                                                                               // 4  // 12
  return Blaze.If(function() {                                                                                   // 5  // 13
    return Spacebars.call(view.lookup("show"));                                                                  // 6  // 14
  }, function() {                                                                                                // 7  // 15
    return [ "\n        ", Blaze.If(function() {                                                                 // 8  // 16
      return Spacebars.call(view.lookup("isStyled"));                                                            // 9  // 17
    }, function() {                                                                                              // 10
      return [ "\n            ", HTML.DIV({                                                                      // 11
        "class": function() {                                                                                    // 12
          return [ "meteor-status ", Spacebars.mustache(view.lookup("position")) ];                              // 13
        }                                                                                                        // 14
      }, Blaze.View("lookup:langDisconnected", function() {                                                      // 15
        return Spacebars.mustache(view.lookup("langDisconnected"));                                              // 16
      }), Blaze.If(function() {                                                                                  // 17
        return Spacebars.call(view.lookup("showLink"));                                                          // 18
      }, function() {                                                                                            // 19
        return [ " ", HTML.A({                                                                                   // 20
          href: "#",                                                                                             // 21
          "class": "meteor-status-retry"                                                                         // 22
        }, Blaze.View("lookup:langRetryLink", function() {                                                       // 23
          return Spacebars.mustache(view.lookup("langRetryLink"));                                               // 24
        })) ];                                                                                                   // 25
      })), "\n        " ];                                                                                       // 26
    }, function() {                                                                                              // 27
      return [ "\n            ", Blaze.View("lookup:langDisconnected", function() {                              // 28
        return Spacebars.mustache(view.lookup("langDisconnected"));                                              // 29
      }), Blaze.If(function() {                                                                                  // 30
        return Spacebars.call(view.lookup("showLink"));                                                          // 31
      }, function() {                                                                                            // 32
        return [ " ", HTML.A({                                                                                   // 33
          href: "#",                                                                                             // 34
          "class": "meteor-status-retry"                                                                         // 35
        }, Blaze.View("lookup:langRetryLink", function() {                                                       // 36
          return Spacebars.mustache(view.lookup("langRetryLink"));                                               // 37
        })) ];                                                                                                   // 38
      }), "\n        " ];                                                                                        // 39
    }), "\n    " ];                                                                                              // 40
  });                                                                                                            // 41
}));                                                                                                             // 42
                                                                                                                 // 43
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 52
                                                                                                                       // 53
}).call(this);                                                                                                         // 54
                                                                                                                       // 55
                                                                                                                       // 56
                                                                                                                       // 57
                                                                                                                       // 58
                                                                                                                       // 59
                                                                                                                       // 60
(function () {                                                                                                         // 61
                                                                                                                       // 62
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 63
//                                                                                                               //    // 64
// packages/255kb:meteor-status/client/meteor-status.js                                                          //    // 65
//                                                                                                               //    // 66
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 67
                                                                                                                 //    // 68
Template.meteorStatus.onCreated(function () {                                                                    // 1  // 69
    var instance = this;                                                                                         // 2  // 70
                                                                                                                 // 3  // 71
    instance.updateCountdownTimeout;                                                                             // 4  // 72
    instance.nextRetry = new ReactiveVar(0);                                                                     // 5  // 73
    instance.options = {                                                                                         // 6  // 74
        style: true,                                                                                             // 7  // 75
        lang: 'en',                                                                                              // 8  // 76
        position: 'bottom',                                                                                      // 9  // 77
        showLink: true,                                                                                          // 10
        msgText: '',                                                                                             // 11
        linkText: ''                                                                                             // 12
    };                                                                                                           // 13
    instance.firstConnection = new ReactiveVar(true);                                                            // 14
                                                                                                                 // 15
    //get template params                                                                                        // 16
    if(Template.currentData()) {                                                                                 // 17
        for(var property in instance.options) {                                                                  // 18
            if(Template.currentData()[property] !== undefined) {                                                 // 19
                instance.options[property] = Template.currentData()[property];                                   // 20
            }                                                                                                    // 21
        }                                                                                                        // 22
    }                                                                                                            // 23
                                                                                                                 // 24
    //set tracker for retry delay                                                                                // 25
    Tracker.autorun(function() {                                                                                 // 26
        //set nextRetry delay update                                                                             // 27
        if(Meteor.status().status === 'waiting') {                                                               // 28
            instance.updateCountdownTimeout = Meteor.setInterval(function() {                                    // 29
                instance.nextRetry.set(Math.round((Meteor.status().retryTime - (new Date()).getTime()) / 1000)); // 30
            }, 1000);                                                                                            // 31
        } else {                                                                                                 // 32
            instance.nextRetry.set(0);                                                                           // 33
            Meteor.clearInterval(instance.updateCountdownTimeout);                                               // 34
        }                                                                                                        // 35
    });                                                                                                          // 36
                                                                                                                 // 37
    //do not alert on first connection to avoid meteor status flashing                                           // 38
    Tracker.autorun(function(computation) {                                                                      // 39
        if(Meteor.status().connected && Meteor.status().status === 'connected') {                                // 40
            instance.firstConnection.set(false);                                                                 // 41
            computation.stop();                                                                                  // 42
        }                                                                                                        // 43
    });                                                                                                          // 44
});                                                                                                              // 45
                                                                                                                 // 46
Template.meteorStatus.helpers({                                                                                  // 47
    langDisconnected: function() {                                                                               // 48
        if(Template.instance().options.msgText) {                                                                // 49
            return Template.instance().options.msgText.replace('%delay%', Template.instance().nextRetry.get());  // 50
        } else {                                                                                                 // 51
            return meteorStatusI18n[Template.instance().options.lang].disconnected.replace('%delay%', Template.instance().nextRetry.get());
        }                                                                                                        // 53
    },                                                                                                           // 54
    langRetryLink: function() {                                                                                  // 55
        if(Template.instance().options.linkText) {                                                               // 56
            return Template.instance().options.linkText;                                                         // 57
        } else {                                                                                                 // 58
            return meteorStatusI18n[Template.instance().options.lang].retry;                                     // 59
        }                                                                                                        // 60
    },                                                                                                           // 61
    isStyled: function() {                                                                                       // 62
        return Template.instance().options.style;                                                                // 63
    },                                                                                                           // 64
    showLink: function() {                                                                                       // 65
        return Template.instance().options.showLink;                                                             // 66
    },                                                                                                           // 67
    position: function () {                                                                                      // 68
        if(Template.instance().options.position === 'top') {                                                     // 69
            return 'meteor-status-top';                                                                          // 70
        }                                                                                                        // 71
        return 'meteor-status-bottom';                                                                           // 72
    },                                                                                                           // 73
    show: function () {                                                                                          // 74
        //only show alert after the first connection attempt, if disconnected, if not manually disconnected (status == 'offline), if at least second retry
        if(!Template.instance().firstConnection.get() && !Meteor.status().connected && Meteor.status().status !== 'offline' && Meteor.status().retryCount > 1){
            return true;                                                                                         // 77
        }                                                                                                        // 78
        return false;                                                                                            // 79
    }                                                                                                            // 80
});                                                                                                              // 81
                                                                                                                 // 82
Template.meteorStatus.events({                                                                                   // 83
    'click a.meteor-status-retry': function() {                                                                  // 84
        if(Meteor.status().status !== 'connecting') {                                                            // 85
            Meteor.reconnect();                                                                                  // 86
        }                                                                                                        // 87
        return false;                                                                                            // 88
    }                                                                                                            // 89
});                                                                                                              // 90
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 159
                                                                                                                       // 160
}).call(this);                                                                                                         // 161
                                                                                                                       // 162
                                                                                                                       // 163
                                                                                                                       // 164
                                                                                                                       // 165
                                                                                                                       // 166
                                                                                                                       // 167
(function () {                                                                                                         // 168
                                                                                                                       // 169
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 170
//                                                                                                               //    // 171
// packages/255kb:meteor-status/client/i18n.js                                                                   //    // 172
//                                                                                                               //    // 173
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 174
                                                                                                                 //    // 175
meteorStatusI18n = {                                                                                             // 1  // 176
    en: {                                                                                                        // 2  // 177
        disconnected: 'Disconnected from server, trying to reconnect in %delay%s.',                              // 3  // 178
        retry: 'Retry now'                                                                                       // 4  // 179
    },                                                                                                           // 5  // 180
    es: {                                                                                                        // 6  // 181
        disconnected: 'Desconectado del servidor, reconectando en %delay% segundos.',                            // 7  // 182
        retry: 'Reintentar ahora'                                                                                // 8  // 183
    },                                                                                                           // 9  // 184
    fr: {                                                                                                        // 10
        disconnected: 'Déconnecté du serveur, prochaine tentative de reconnexion dans %delay%s.',                // 11
        retry: 'Réessayer'                                                                                       // 12
    },                                                                                                           // 13
    zh: {                                                                                                        // 14
        disconnected: '从服务器断开连接，%delay%秒后将尝试重新链接。',                                                              // 15
        retry: '现在再试'                                                                                            // 16
    },                                                                                                           // 17
    ar: {                                                                                                        // 18
        disconnected: 'انقطع الاتصال، جاري اعادة المحاولة خلال %delay%ث.',                                       // 19
        retry: 'جرب الآن'                                                                                        // 20
    }                                                                                                            // 21
};                                                                                                               // 22
                                                                                                                 // 23
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 199
                                                                                                                       // 200
}).call(this);                                                                                                         // 201
                                                                                                                       // 202
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['255kb:meteor-status'] = {};

})();
