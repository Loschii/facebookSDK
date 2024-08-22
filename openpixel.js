// Open Pixel v1.3.1 | Published By Dockwa | Created By Stuart Yamartino | MIT License
;(function(window, document, pixelFunc, pixelFuncName, pixelEndpoint, versionNumber) {
"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Config = {
  id: '',
  params: {},
  version: versionNumber
};
var Helper = /*#__PURE__*/function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }
  return _createClass(Helper, null, [{
    key: "isPresent",
    value: function isPresent(variable) {
      return typeof variable !== 'undefined' && variable !== null && variable !== '';
    }
  }, {
    key: "now",
    value: function now() {
      return 1 * new Date();
    }
  }, {
    key: "guid",
    value: function guid() {
      return Config.version + '-xxxxxxxx-'.replace(/[x]/g, function (c) {
        var r = Math.random() * 36 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(36);
      }) + (1 * new Date()).toString(36);
    }

    // reduces all optional data down to a string
  }, {
    key: "optionalData",
    value: function optionalData(data) {
      if (Helper.isPresent(data) === false) {
        return '';
      } else if (_typeof(data) === 'object') {
        // runs Helper.optionalData again to reduce to string in case something else was returned
        return Helper.optionalData(JSON.stringify(data));
      } else if (typeof data === 'function') {
        // runs the function and calls Helper.optionalData again to reduce further if it isn't a string
        return Helper.optionalData(data());
      } else {
        return String(data);
      }
    }
  }]);
}();
var Browser = /*#__PURE__*/function () {
  function Browser() {
    _classCallCheck(this, Browser);
  }
  return _createClass(Browser, null, [{
    key: "nameAndVersion",
    value: function nameAndVersion() {
      // http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
      var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
      }
      if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
      return M.join(' ');
    }
  }, {
    key: "isMobile",
    value: function isMobile() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }
  }, {
    key: "userAgent",
    value: function userAgent() {
      return window.navigator.userAgent;
    }
  }]);
}();
var Cookie = /*#__PURE__*/function () {
  function Cookie() {
    _classCallCheck(this, Cookie);
  }
  return _createClass(Cookie, null, [{
    key: "prefix",
    value: function prefix() {
      return "__".concat(pixelFuncName, "_");
    }
  }, {
    key: "set",
    value: function set(name, value, minutes) {
      var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
      var expires = '';
      if (Helper.isPresent(minutes)) {
        var date = new Date();
        date.setTime(date.getTime() + minutes * 60 * 1000);
        expires = "expires=".concat(date.toGMTString(), "; ");
      }
      document.cookie = "".concat(this.prefix()).concat(name, "=").concat(value, "; ").concat(expires, "path=").concat(path, "; SameSite=Lax");
    }
  }, {
    key: "get",
    value: function get(name) {
      var name = "".concat(this.prefix()).concat(name, "=");
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return;
    }
  }, {
    key: "delete",
    value: function _delete(name) {
      this.set(name, '', -100);
    }
  }, {
    key: "exists",
    value: function exists(name) {
      return Helper.isPresent(this.get(name));
    }
  }, {
    key: "setUtms",
    value: function setUtms() {
      var utmArray = ['utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_campaign', 'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic'];
      var exists = false;
      for (var i = 0, l = utmArray.length; i < l; i++) {
        if (Helper.isPresent(Url.getParameterByName(utmArray[i]))) {
          exists = true;
          break;
        }
      }
      if (exists) {
        var val,
          save = {};
        for (var i = 0, l = utmArray.length; i < l; i++) {
          val = Url.getParameterByName(utmArray[i]);
          if (Helper.isPresent(val)) {
            save[utmArray[i]] = val;
          }
        }
        this.set('utm', JSON.stringify(save));
      }
    }
  }, {
    key: "getUtm",
    value: function getUtm(name) {
      if (this.exists('utm')) {
        var utms = JSON.parse(this.get('utm'));
        return name in utms ? utms[name] : '';
      }
    }
  }]);
}();
var Url = /*#__PURE__*/function () {
  function Url() {
    _classCallCheck(this, Url);
  }
  return _createClass(Url, null, [{
    key: "getParameterByName",
    value:
    // http://stackoverflow.com/a/901144/1231563
    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  }, {
    key: "externalHost",
    value: function externalHost(link) {
      return link.hostname != location.hostname && link.protocol.indexOf('http') === 0;
    }
  }]);
}();
var Pixel = /*#__PURE__*/function () {
  function Pixel(event, timestamp, optional) {
    _classCallCheck(this, Pixel);
    this.params = [];
    this.event = event;
    this.timestamp = timestamp;
    this.optional = Helper.optionalData(optional);
    this.buildParams();
    this.send();
  }
  return _createClass(Pixel, [{
    key: "buildParams",
    value: function buildParams() {
      var attr = this.getAttribute();
      for (var index in attr) {
        if (attr.hasOwnProperty(index)) {
          this.setParam(index, attr[index](index));
        }
      }
    }
  }, {
    key: "getAttribute",
    value: function getAttribute() {
      var _this = this;
      return _objectSpread({
        id: function id() {
          return Config.id;
        },
        // website Id
        uid: function uid() {
          return Cookie.get('uid');
        },
        // user Id
        ev: function ev() {
          return _this.event;
        },
        // event being triggered
        ed: function ed() {
          return _this.optional;
        },
        // any event data to pass along
        v: function v() {
          return Config.version;
        },
        // openpixel.js version
        dl: function dl() {
          return window.location.href;
        },
        // document location
        rl: function rl() {
          return document.referrer;
        },
        // referrer location
        ts: function ts() {
          return _this.timestamp;
        },
        // timestamp when event was triggered
        de: function de() {
          return document.characterSet;
        },
        // document encoding
        sr: function sr() {
          return window.screen.width + 'x' + window.screen.height;
        },
        // screen resolution
        vp: function vp() {
          return window.innerWidth + 'x' + window.innerHeight;
        },
        // viewport size
        cd: function cd() {
          return window.screen.colorDepth;
        },
        // color depth
        dt: function dt() {
          return document.title;
        },
        // document title
        bn: function bn() {
          return Browser.nameAndVersion();
        },
        // browser name and version number
        md: function md() {
          return Browser.isMobile();
        },
        // is a mobile device?
        ua: function ua() {
          return Browser.userAgent();
        },
        // user agent
        tz: function tz() {
          return new Date().getTimezoneOffset();
        },
        // timezone
        utm_source: function utm_source(key) {
          return Cookie.getUtm(key);
        },
        // get the utm source
        utm_medium: function utm_medium(key) {
          return Cookie.getUtm(key);
        },
        // get the utm medium
        utm_term: function utm_term(key) {
          return Cookie.getUtm(key);
        },
        // get the utm term
        utm_content: function utm_content(key) {
          return Cookie.getUtm(key);
        },
        // get the utm content
        utm_campaign: function utm_campaign(key) {
          return Cookie.getUtm(key);
        },
        // get the utm campaign
        utm_source_platform: function utm_source_platform(key) {
          return Cookie.getUtm(key);
        },
        // get the utm source platform
        utm_creative_format: function utm_creative_format(key) {
          return Cookie.getUtm(key);
        },
        // get the utm creative format
        utm_marketing_tactic: function utm_marketing_tactic(key) {
          return Cookie.getUtm(key);
        }
      }, Config.params);
    }
  }, {
    key: "setParam",
    value: function setParam(key, val) {
      if (Helper.isPresent(val)) {
        this.params.push("".concat(key, "=").concat(encodeURIComponent(val)));
      } else {
        this.params.push("".concat(key, "="));
      }
    }
  }, {
    key: "send",
    value: function send() {
      window.navigator.sendBeacon ? this.sendBeacon() : this.sendImage();
    }
  }, {
    key: "sendBeacon",
    value: function sendBeacon() {
      window.navigator.sendBeacon(this.getSourceUrl());
    }
  }, {
    key: "sendImage",
    value: function sendImage() {
      this.img = document.createElement('img');
      this.img.src = this.getSourceUrl();
      this.img.style.display = 'none';
      this.img.width = '1';
      this.img.height = '1';
      document.getElementsByTagName('body')[0].appendChild(this.img);
    }
  }, {
    key: "getSourceUrl",
    value: function getSourceUrl() {
      return "".concat(pixelEndpoint, "?").concat(this.params.join('&'));
    }
  }]);
}(); // update the cookie if it exists, if it doesn't, create a new one, lasting 2 years
Cookie.exists('uid') ? Cookie.set('uid', Cookie.get('uid'), 2 * 365 * 24 * 60) : Cookie.set('uid', Helper.guid(), 2 * 365 * 24 * 60);
// save any utms through as session cookies
Cookie.setUtms();

// process the queue and future incoming commands
pixelFunc.process = function (method, value, optional) {
  if (method === 'init') {
    Config.id = value;
  } else if (method === 'param') {
    Config.params[value] = function () {
      return optional;
    };
  } else if (method === 'event') {
    if (value === 'pageload' && !Config.pageLoadOnce) {
      Config.pageLoadOnce = true;
      new Pixel(value, pixelFunc.t, optional);
    } else if (value !== 'pageload' && value !== 'pageclose') {
      new Pixel(value, Helper.now(), optional);
    }
  }
};

// run the queued calls from the snippet to be processed
for (var i = 0, l = pixelFunc.queue.length; i < l; i++) {
  pixelFunc.process.apply(pixelFunc, pixelFunc.queue[i]);
}

// https://github.com/GoogleChromeLabs/page-lifecycle/blob/master/src/Lifecycle.mjs
// Safari does not reliably fire the `pagehide` or `visibilitychange`
var isSafari = (typeof safari === "undefined" ? "undefined" : _typeof(safari)) === 'object' && safari.pushNotification;
var isPageHideSupported = 'onpageshow' in self;

// IE9-10 do not support the pagehide event, so we fall back to unload
// pagehide event is more reliable but less broad than unload event for mobile and modern browsers
var pageCloseEvent = isPageHideSupported && !isSafari ? 'pagehide' : 'unload';
window.addEventListener(pageCloseEvent, function () {
  if (!Config.pageCloseOnce) {
    Config.pageCloseOnce = true;
    new Pixel('pageclose', Helper.now(), function () {
      // if a link was clicked in the last 5 seconds that goes to an external host, pass it through as event data
      if (Helper.isPresent(Config.externalHost) && Helper.now() - Config.externalHost.time < 5 * 1000) {
        return Config.externalHost.link;
      }
    });
  }
});
window.onload = function () {
  var aTags = document.getElementsByTagName('a');
  for (var i = 0, l = aTags.length; i < l; i++) {
    aTags[i].addEventListener('click', function (_e) {
      if (Url.externalHost(this)) {
        Config.externalHost = {
          link: this.href,
          time: Helper.now()
        };
      }
    }.bind(aTags[i]));
  }
  var dataAttributes = document.querySelectorAll('[data-opix-event]');
  for (var i = 0, l = dataAttributes.length; i < l; i++) {
    dataAttributes[i].addEventListener('click', function (_e) {
      var event = this.getAttribute('data-opix-event');
      if (event) {
        new Pixel(event, Helper.now(), this.getAttribute('data-opix-data'));
      }
    }.bind(dataAttributes[i]));
  }
};
}(window, document, window["opix"], "opix", "https://script.google.com/macros/s/AKfycbznIxu-oa-WAqQ_oqx73IwWk1BBl9IywJ9Y3f0oXTZxHaPz3EPPaPb1zAOfmZ_57KsKqA/exec", 1));
