var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/chroma-js/chroma.js
var require_chroma = __commonJS({
  "node_modules/chroma-js/chroma.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.chroma = factory());
    })(exports2, function() {
      "use strict";
      var limit$2 = function(x, min2, max2) {
        if (min2 === void 0)
          min2 = 0;
        if (max2 === void 0)
          max2 = 1;
        return x < min2 ? min2 : x > max2 ? max2 : x;
      };
      var limit$1 = limit$2;
      var clip_rgb$3 = function(rgb3) {
        rgb3._clipped = false;
        rgb3._unclipped = rgb3.slice(0);
        for (var i2 = 0; i2 <= 3; i2++) {
          if (i2 < 3) {
            if (rgb3[i2] < 0 || rgb3[i2] > 255) {
              rgb3._clipped = true;
            }
            rgb3[i2] = limit$1(rgb3[i2], 0, 255);
          } else if (i2 === 3) {
            rgb3[i2] = limit$1(rgb3[i2], 0, 1);
          }
        }
        return rgb3;
      };
      var classToType = {};
      for (var i$1 = 0, list$1 = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Undefined", "Null"]; i$1 < list$1.length; i$1 += 1) {
        var name = list$1[i$1];
        classToType["[object " + name + "]"] = name.toLowerCase();
      }
      var type$p = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
      };
      var type$o = type$p;
      var unpack$B = function(args, keyOrder) {
        if (keyOrder === void 0)
          keyOrder = null;
        if (args.length >= 3) {
          return Array.prototype.slice.call(args);
        }
        if (type$o(args[0]) == "object" && keyOrder) {
          return keyOrder.split("").filter(function(k) {
            return args[0][k] !== void 0;
          }).map(function(k) {
            return args[0][k];
          });
        }
        return args[0];
      };
      var type$n = type$p;
      var last$4 = function(args) {
        if (args.length < 2) {
          return null;
        }
        var l = args.length - 1;
        if (type$n(args[l]) == "string") {
          return args[l].toLowerCase();
        }
        return null;
      };
      var PI$2 = Math.PI;
      var utils = {
        clip_rgb: clip_rgb$3,
        limit: limit$2,
        type: type$p,
        unpack: unpack$B,
        last: last$4,
        PI: PI$2,
        TWOPI: PI$2 * 2,
        PITHIRD: PI$2 / 3,
        DEG2RAD: PI$2 / 180,
        RAD2DEG: 180 / PI$2
      };
      var input$h = {
        format: {},
        autodetect: []
      };
      var last$3 = utils.last;
      var clip_rgb$2 = utils.clip_rgb;
      var type$m = utils.type;
      var _input = input$h;
      var Color$D = function Color4() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var me = this;
        if (type$m(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) {
          return args[0];
        }
        var mode = last$3(args);
        var autodetect = false;
        if (!mode) {
          autodetect = true;
          if (!_input.sorted) {
            _input.autodetect = _input.autodetect.sort(function(a, b) {
              return b.p - a.p;
            });
            _input.sorted = true;
          }
          for (var i2 = 0, list2 = _input.autodetect; i2 < list2.length; i2 += 1) {
            var chk = list2[i2];
            mode = chk.test.apply(chk, args);
            if (mode) {
              break;
            }
          }
        }
        if (_input.format[mode]) {
          var rgb3 = _input.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
          me._rgb = clip_rgb$2(rgb3);
        } else {
          throw new Error("unknown format: " + args);
        }
        if (me._rgb.length === 3) {
          me._rgb.push(1);
        }
      };
      Color$D.prototype.toString = function toString() {
        if (type$m(this.hex) == "function") {
          return this.hex();
        }
        return "[" + this._rgb.join(",") + "]";
      };
      var Color_1 = Color$D;
      var chroma$k = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(chroma$k.Color, [null].concat(args)))();
      };
      chroma$k.Color = Color_1;
      chroma$k.version = "2.4.2";
      var chroma_1 = chroma$k;
      var unpack$A = utils.unpack;
      var max$2 = Math.max;
      var rgb2cmyk$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$A(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max$2(r, max$2(g, b));
        var f = k < 1 ? 1 / (1 - k) : 0;
        var c = (1 - r - k) * f;
        var m = (1 - g - k) * f;
        var y = (1 - b - k) * f;
        return [c, m, y, k];
      };
      var rgb2cmyk_1 = rgb2cmyk$1;
      var unpack$z = utils.unpack;
      var cmyk2rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$z(args, "cmyk");
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) {
          return [0, 0, 0, alpha];
        }
        return [
          c >= 1 ? 0 : 255 * (1 - c) * (1 - k),
          m >= 1 ? 0 : 255 * (1 - m) * (1 - k),
          y >= 1 ? 0 : 255 * (1 - y) * (1 - k),
          alpha
        ];
      };
      var cmyk2rgb_1 = cmyk2rgb;
      var chroma$j = chroma_1;
      var Color$C = Color_1;
      var input$g = input$h;
      var unpack$y = utils.unpack;
      var type$l = utils.type;
      var rgb2cmyk = rgb2cmyk_1;
      Color$C.prototype.cmyk = function() {
        return rgb2cmyk(this._rgb);
      };
      chroma$j.cmyk = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$C, [null].concat(args, ["cmyk"])))();
      };
      input$g.format.cmyk = cmyk2rgb_1;
      input$g.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$y(args, "cmyk");
          if (type$l(args) === "array" && args.length === 4) {
            return "cmyk";
          }
        }
      });
      var unpack$x = utils.unpack;
      var last$2 = utils.last;
      var rnd = function(a) {
        return Math.round(a * 100) / 100;
      };
      var hsl2css$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var hsla2 = unpack$x(args, "hsla");
        var mode = last$2(args) || "lsa";
        hsla2[0] = rnd(hsla2[0] || 0);
        hsla2[1] = rnd(hsla2[1] * 100) + "%";
        hsla2[2] = rnd(hsla2[2] * 100) + "%";
        if (mode === "hsla" || hsla2.length > 3 && hsla2[3] < 1) {
          hsla2[3] = hsla2.length > 3 ? hsla2[3] : 1;
          mode = "hsla";
        } else {
          hsla2.length = 3;
        }
        return mode + "(" + hsla2.join(",") + ")";
      };
      var hsl2css_1 = hsl2css$1;
      var unpack$w = utils.unpack;
      var rgb2hsl$3 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$w(args, "rgba");
        var r = args[0];
        var g = args[1];
        var b = args[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var min2 = Math.min(r, g, b);
        var max2 = Math.max(r, g, b);
        var l = (max2 + min2) / 2;
        var s, h;
        if (max2 === min2) {
          s = 0;
          h = Number.NaN;
        } else {
          s = l < 0.5 ? (max2 - min2) / (max2 + min2) : (max2 - min2) / (2 - max2 - min2);
        }
        if (r == max2) {
          h = (g - b) / (max2 - min2);
        } else if (g == max2) {
          h = 2 + (b - r) / (max2 - min2);
        } else if (b == max2) {
          h = 4 + (r - g) / (max2 - min2);
        }
        h *= 60;
        if (h < 0) {
          h += 360;
        }
        if (args.length > 3 && args[3] !== void 0) {
          return [h, s, l, args[3]];
        }
        return [h, s, l];
      };
      var rgb2hsl_1 = rgb2hsl$3;
      var unpack$v = utils.unpack;
      var last$1 = utils.last;
      var hsl2css = hsl2css_1;
      var rgb2hsl$2 = rgb2hsl_1;
      var round$6 = Math.round;
      var rgb2css$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var rgba2 = unpack$v(args, "rgba");
        var mode = last$1(args) || "rgb";
        if (mode.substr(0, 3) == "hsl") {
          return hsl2css(rgb2hsl$2(rgba2), mode);
        }
        rgba2[0] = round$6(rgba2[0]);
        rgba2[1] = round$6(rgba2[1]);
        rgba2[2] = round$6(rgba2[2]);
        if (mode === "rgba" || rgba2.length > 3 && rgba2[3] < 1) {
          rgba2[3] = rgba2.length > 3 ? rgba2[3] : 1;
          mode = "rgba";
        }
        return mode + "(" + rgba2.slice(0, mode === "rgb" ? 3 : 4).join(",") + ")";
      };
      var rgb2css_1 = rgb2css$1;
      var unpack$u = utils.unpack;
      var round$5 = Math.round;
      var hsl2rgb$1 = function() {
        var assign;
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$u(args, "hsl");
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r, g, b;
        if (s === 0) {
          r = g = b = l * 255;
        } else {
          var t3 = [0, 0, 0];
          var c = [0, 0, 0];
          var t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var t1 = 2 * l - t2;
          var h_ = h / 360;
          t3[0] = h_ + 1 / 3;
          t3[1] = h_;
          t3[2] = h_ - 1 / 3;
          for (var i2 = 0; i2 < 3; i2++) {
            if (t3[i2] < 0) {
              t3[i2] += 1;
            }
            if (t3[i2] > 1) {
              t3[i2] -= 1;
            }
            if (6 * t3[i2] < 1) {
              c[i2] = t1 + (t2 - t1) * 6 * t3[i2];
            } else if (2 * t3[i2] < 1) {
              c[i2] = t2;
            } else if (3 * t3[i2] < 2) {
              c[i2] = t1 + (t2 - t1) * (2 / 3 - t3[i2]) * 6;
            } else {
              c[i2] = t1;
            }
          }
          assign = [round$5(c[0] * 255), round$5(c[1] * 255), round$5(c[2] * 255)], r = assign[0], g = assign[1], b = assign[2];
        }
        if (args.length > 3) {
          return [r, g, b, args[3]];
        }
        return [r, g, b, 1];
      };
      var hsl2rgb_1 = hsl2rgb$1;
      var hsl2rgb2 = hsl2rgb_1;
      var input$f = input$h;
      var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
      var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
      var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
      var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
      var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
      var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
      var round$4 = Math.round;
      var css2rgb$1 = function(css) {
        css = css.toLowerCase().trim();
        var m;
        if (input$f.format.named) {
          try {
            return input$f.format.named(css);
          } catch (e) {
          }
        }
        if (m = css.match(RE_RGB)) {
          var rgb3 = m.slice(1, 4);
          for (var i2 = 0; i2 < 3; i2++) {
            rgb3[i2] = +rgb3[i2];
          }
          rgb3[3] = 1;
          return rgb3;
        }
        if (m = css.match(RE_RGBA)) {
          var rgb$1 = m.slice(1, 5);
          for (var i$12 = 0; i$12 < 4; i$12++) {
            rgb$1[i$12] = +rgb$1[i$12];
          }
          return rgb$1;
        }
        if (m = css.match(RE_RGB_PCT)) {
          var rgb$2 = m.slice(1, 4);
          for (var i$2 = 0; i$2 < 3; i$2++) {
            rgb$2[i$2] = round$4(rgb$2[i$2] * 2.55);
          }
          rgb$2[3] = 1;
          return rgb$2;
        }
        if (m = css.match(RE_RGBA_PCT)) {
          var rgb$3 = m.slice(1, 5);
          for (var i$3 = 0; i$3 < 3; i$3++) {
            rgb$3[i$3] = round$4(rgb$3[i$3] * 2.55);
          }
          rgb$3[3] = +rgb$3[3];
          return rgb$3;
        }
        if (m = css.match(RE_HSL)) {
          var hsl3 = m.slice(1, 4);
          hsl3[1] *= 0.01;
          hsl3[2] *= 0.01;
          var rgb$4 = hsl2rgb2(hsl3);
          rgb$4[3] = 1;
          return rgb$4;
        }
        if (m = css.match(RE_HSLA)) {
          var hsl$1 = m.slice(1, 4);
          hsl$1[1] *= 0.01;
          hsl$1[2] *= 0.01;
          var rgb$5 = hsl2rgb2(hsl$1);
          rgb$5[3] = +m[4];
          return rgb$5;
        }
      };
      css2rgb$1.test = function(s) {
        return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
      };
      var css2rgb_1 = css2rgb$1;
      var chroma$i = chroma_1;
      var Color$B = Color_1;
      var input$e = input$h;
      var type$k = utils.type;
      var rgb2css = rgb2css_1;
      var css2rgb = css2rgb_1;
      Color$B.prototype.css = function(mode) {
        return rgb2css(this._rgb, mode);
      };
      chroma$i.css = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$B, [null].concat(args, ["css"])))();
      };
      input$e.format.css = css2rgb;
      input$e.autodetect.push({
        p: 5,
        test: function(h) {
          var rest = [], len = arguments.length - 1;
          while (len-- > 0)
            rest[len] = arguments[len + 1];
          if (!rest.length && type$k(h) === "string" && css2rgb.test(h)) {
            return "css";
          }
        }
      });
      var Color$A = Color_1;
      var chroma$h = chroma_1;
      var input$d = input$h;
      var unpack$t = utils.unpack;
      input$d.format.gl = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var rgb3 = unpack$t(args, "rgba");
        rgb3[0] *= 255;
        rgb3[1] *= 255;
        rgb3[2] *= 255;
        return rgb3;
      };
      chroma$h.gl = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$A, [null].concat(args, ["gl"])))();
      };
      Color$A.prototype.gl = function() {
        var rgb3 = this._rgb;
        return [rgb3[0] / 255, rgb3[1] / 255, rgb3[2] / 255, rgb3[3]];
      };
      var unpack$s = utils.unpack;
      var rgb2hcg$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$s(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min2 = Math.min(r, g, b);
        var max2 = Math.max(r, g, b);
        var delta = max2 - min2;
        var c = delta * 100 / 255;
        var _g = min2 / (255 - delta) * 100;
        var h;
        if (delta === 0) {
          h = Number.NaN;
        } else {
          if (r === max2) {
            h = (g - b) / delta;
          }
          if (g === max2) {
            h = 2 + (b - r) / delta;
          }
          if (b === max2) {
            h = 4 + (r - g) / delta;
          }
          h *= 60;
          if (h < 0) {
            h += 360;
          }
        }
        return [h, c, _g];
      };
      var rgb2hcg_1 = rgb2hcg$1;
      var unpack$r = utils.unpack;
      var floor$3 = Math.floor;
      var hcg2rgb = function() {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$r(args, "hcg");
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r, g, b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) {
          r = g = b = _g;
        } else {
          if (h === 360) {
            h = 0;
          }
          if (h > 360) {
            h -= 360;
          }
          if (h < 0) {
            h += 360;
          }
          h /= 60;
          var i2 = floor$3(h);
          var f = h - i2;
          var p = _g * (1 - c);
          var q = p + _c * (1 - f);
          var t = p + _c * f;
          var v = p + _c;
          switch (i2) {
            case 0:
              assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2];
              break;
            case 1:
              assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2];
              break;
            case 2:
              assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2];
              break;
            case 3:
              assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2];
              break;
            case 4:
              assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2];
              break;
            case 5:
              assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2];
              break;
          }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      var hcg2rgb_1 = hcg2rgb;
      var unpack$q = utils.unpack;
      var type$j = utils.type;
      var chroma$g = chroma_1;
      var Color$z = Color_1;
      var input$c = input$h;
      var rgb2hcg = rgb2hcg_1;
      Color$z.prototype.hcg = function() {
        return rgb2hcg(this._rgb);
      };
      chroma$g.hcg = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$z, [null].concat(args, ["hcg"])))();
      };
      input$c.format.hcg = hcg2rgb_1;
      input$c.autodetect.push({
        p: 1,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$q(args, "hcg");
          if (type$j(args) === "array" && args.length === 3) {
            return "hcg";
          }
        }
      });
      var unpack$p = utils.unpack;
      var last = utils.last;
      var round$3 = Math.round;
      var rgb2hex$2 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$p(args, "rgba");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last(args) || "auto";
        if (a === void 0) {
          a = 1;
        }
        if (mode === "auto") {
          mode = a < 1 ? "rgba" : "rgb";
        }
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16);
        str = str.substr(str.length - 6);
        var hxa = "0" + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch (mode.toLowerCase()) {
          case "rgba":
            return "#" + str + hxa;
          case "argb":
            return "#" + hxa + str;
          default:
            return "#" + str;
        }
      };
      var rgb2hex_1 = rgb2hex$2;
      var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
      var hex2rgb$1 = function(hex2) {
        if (hex2.match(RE_HEX)) {
          if (hex2.length === 4 || hex2.length === 7) {
            hex2 = hex2.substr(1);
          }
          if (hex2.length === 3) {
            hex2 = hex2.split("");
            hex2 = hex2[0] + hex2[0] + hex2[1] + hex2[1] + hex2[2] + hex2[2];
          }
          var u = parseInt(hex2, 16);
          var r = u >> 16;
          var g = u >> 8 & 255;
          var b = u & 255;
          return [r, g, b, 1];
        }
        if (hex2.match(RE_HEXA)) {
          if (hex2.length === 5 || hex2.length === 9) {
            hex2 = hex2.substr(1);
          }
          if (hex2.length === 4) {
            hex2 = hex2.split("");
            hex2 = hex2[0] + hex2[0] + hex2[1] + hex2[1] + hex2[2] + hex2[2] + hex2[3] + hex2[3];
          }
          var u$1 = parseInt(hex2, 16);
          var r$1 = u$1 >> 24 & 255;
          var g$1 = u$1 >> 16 & 255;
          var b$1 = u$1 >> 8 & 255;
          var a = Math.round((u$1 & 255) / 255 * 100) / 100;
          return [r$1, g$1, b$1, a];
        }
        throw new Error("unknown hex color: " + hex2);
      };
      var hex2rgb_1 = hex2rgb$1;
      var chroma$f = chroma_1;
      var Color$y = Color_1;
      var type$i = utils.type;
      var input$b = input$h;
      var rgb2hex$1 = rgb2hex_1;
      Color$y.prototype.hex = function(mode) {
        return rgb2hex$1(this._rgb, mode);
      };
      chroma$f.hex = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$y, [null].concat(args, ["hex"])))();
      };
      input$b.format.hex = hex2rgb_1;
      input$b.autodetect.push({
        p: 4,
        test: function(h) {
          var rest = [], len = arguments.length - 1;
          while (len-- > 0)
            rest[len] = arguments[len + 1];
          if (!rest.length && type$i(h) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0) {
            return "hex";
          }
        }
      });
      var unpack$o = utils.unpack;
      var TWOPI$2 = utils.TWOPI;
      var min$2 = Math.min;
      var sqrt$4 = Math.sqrt;
      var acos = Math.acos;
      var rgb2hsi$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$o(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min$2(r, g, b);
        var i2 = (r + g + b) / 3;
        var s = i2 > 0 ? 1 - min_ / i2 : 0;
        if (s === 0) {
          h = NaN;
        } else {
          h = (r - g + (r - b)) / 2;
          h /= sqrt$4((r - g) * (r - g) + (r - b) * (g - b));
          h = acos(h);
          if (b > g) {
            h = TWOPI$2 - h;
          }
          h /= TWOPI$2;
        }
        return [h * 360, s, i2];
      };
      var rgb2hsi_1 = rgb2hsi$1;
      var unpack$n = utils.unpack;
      var limit = utils.limit;
      var TWOPI$1 = utils.TWOPI;
      var PITHIRD = utils.PITHIRD;
      var cos$4 = Math.cos;
      var hsi2rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$n(args, "hsi");
        var h = args[0];
        var s = args[1];
        var i2 = args[2];
        var r, g, b;
        if (isNaN(h)) {
          h = 0;
        }
        if (isNaN(s)) {
          s = 0;
        }
        if (h > 360) {
          h -= 360;
        }
        if (h < 0) {
          h += 360;
        }
        h /= 360;
        if (h < 1 / 3) {
          b = (1 - s) / 3;
          r = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
          g = 1 - (b + r);
        } else if (h < 2 / 3) {
          h -= 1 / 3;
          r = (1 - s) / 3;
          g = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
          b = 1 - (r + g);
        } else {
          h -= 2 / 3;
          g = (1 - s) / 3;
          b = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
          r = 1 - (g + b);
        }
        r = limit(i2 * r * 3);
        g = limit(i2 * g * 3);
        b = limit(i2 * b * 3);
        return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
      };
      var hsi2rgb_1 = hsi2rgb;
      var unpack$m = utils.unpack;
      var type$h = utils.type;
      var chroma$e = chroma_1;
      var Color$x = Color_1;
      var input$a = input$h;
      var rgb2hsi = rgb2hsi_1;
      Color$x.prototype.hsi = function() {
        return rgb2hsi(this._rgb);
      };
      chroma$e.hsi = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$x, [null].concat(args, ["hsi"])))();
      };
      input$a.format.hsi = hsi2rgb_1;
      input$a.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$m(args, "hsi");
          if (type$h(args) === "array" && args.length === 3) {
            return "hsi";
          }
        }
      });
      var unpack$l = utils.unpack;
      var type$g = utils.type;
      var chroma$d = chroma_1;
      var Color$w = Color_1;
      var input$9 = input$h;
      var rgb2hsl$1 = rgb2hsl_1;
      Color$w.prototype.hsl = function() {
        return rgb2hsl$1(this._rgb);
      };
      chroma$d.hsl = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$w, [null].concat(args, ["hsl"])))();
      };
      input$9.format.hsl = hsl2rgb_1;
      input$9.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$l(args, "hsl");
          if (type$g(args) === "array" && args.length === 3) {
            return "hsl";
          }
        }
      });
      var unpack$k = utils.unpack;
      var min$1 = Math.min;
      var max$1 = Math.max;
      var rgb2hsl = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$k(args, "rgb");
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h, s, v;
        v = max_ / 255;
        if (max_ === 0) {
          h = Number.NaN;
          s = 0;
        } else {
          s = delta / max_;
          if (r === max_) {
            h = (g - b) / delta;
          }
          if (g === max_) {
            h = 2 + (b - r) / delta;
          }
          if (b === max_) {
            h = 4 + (r - g) / delta;
          }
          h *= 60;
          if (h < 0) {
            h += 360;
          }
        }
        return [h, s, v];
      };
      var rgb2hsv$1 = rgb2hsl;
      var unpack$j = utils.unpack;
      var floor$2 = Math.floor;
      var hsv2rgb = function() {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$j(args, "hsv");
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r, g, b;
        v *= 255;
        if (s === 0) {
          r = g = b = v;
        } else {
          if (h === 360) {
            h = 0;
          }
          if (h > 360) {
            h -= 360;
          }
          if (h < 0) {
            h += 360;
          }
          h /= 60;
          var i2 = floor$2(h);
          var f = h - i2;
          var p = v * (1 - s);
          var q = v * (1 - s * f);
          var t = v * (1 - s * (1 - f));
          switch (i2) {
            case 0:
              assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2];
              break;
            case 1:
              assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2];
              break;
            case 2:
              assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2];
              break;
            case 3:
              assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2];
              break;
            case 4:
              assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2];
              break;
            case 5:
              assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2];
              break;
          }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      var hsv2rgb_1 = hsv2rgb;
      var unpack$i = utils.unpack;
      var type$f = utils.type;
      var chroma$c = chroma_1;
      var Color$v = Color_1;
      var input$8 = input$h;
      var rgb2hsv = rgb2hsv$1;
      Color$v.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
      };
      chroma$c.hsv = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$v, [null].concat(args, ["hsv"])))();
      };
      input$8.format.hsv = hsv2rgb_1;
      input$8.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$i(args, "hsv");
          if (type$f(args) === "array" && args.length === 3) {
            return "hsv";
          }
        }
      });
      var labConstants = {
        Kn: 18,
        Xn: 0.95047,
        Yn: 1,
        Zn: 1.08883,
        t0: 0.137931034,
        t1: 0.206896552,
        t2: 0.12841855,
        t3: 8856452e-9
      };
      var LAB_CONSTANTS$3 = labConstants;
      var unpack$h = utils.unpack;
      var pow$a = Math.pow;
      var rgb2lab$2 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$h(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r, g, b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
      };
      var rgb_xyz = function(r) {
        if ((r /= 255) <= 0.04045) {
          return r / 12.92;
        }
        return pow$a((r + 0.055) / 1.055, 2.4);
      };
      var xyz_lab = function(t) {
        if (t > LAB_CONSTANTS$3.t3) {
          return pow$a(t, 1 / 3);
        }
        return t / LAB_CONSTANTS$3.t2 + LAB_CONSTANTS$3.t0;
      };
      var rgb2xyz = function(r, g, b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS$3.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / LAB_CONSTANTS$3.Yn);
        var z = xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / LAB_CONSTANTS$3.Zn);
        return [x, y, z];
      };
      var rgb2lab_1 = rgb2lab$2;
      var LAB_CONSTANTS$2 = labConstants;
      var unpack$g = utils.unpack;
      var pow$9 = Math.pow;
      var lab2rgb$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$g(args, "lab");
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x, y, z, r, g, b_;
        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;
        y = LAB_CONSTANTS$2.Yn * lab_xyz(y);
        x = LAB_CONSTANTS$2.Xn * lab_xyz(x);
        z = LAB_CONSTANTS$2.Zn * lab_xyz(z);
        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
        g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
        return [r, g, b_, args.length > 3 ? args[3] : 1];
      };
      var xyz_rgb = function(r) {
        return 255 * (r <= 304e-5 ? 12.92 * r : 1.055 * pow$9(r, 1 / 2.4) - 0.055);
      };
      var lab_xyz = function(t) {
        return t > LAB_CONSTANTS$2.t1 ? t * t * t : LAB_CONSTANTS$2.t2 * (t - LAB_CONSTANTS$2.t0);
      };
      var lab2rgb_1 = lab2rgb$1;
      var unpack$f = utils.unpack;
      var type$e = utils.type;
      var chroma$b = chroma_1;
      var Color$u = Color_1;
      var input$7 = input$h;
      var rgb2lab$1 = rgb2lab_1;
      Color$u.prototype.lab = function() {
        return rgb2lab$1(this._rgb);
      };
      chroma$b.lab = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$u, [null].concat(args, ["lab"])))();
      };
      input$7.format.lab = lab2rgb_1;
      input$7.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$f(args, "lab");
          if (type$e(args) === "array" && args.length === 3) {
            return "lab";
          }
        }
      });
      var unpack$e = utils.unpack;
      var RAD2DEG = utils.RAD2DEG;
      var sqrt$3 = Math.sqrt;
      var atan2$2 = Math.atan2;
      var round$2 = Math.round;
      var lab2lch$2 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$e(args, "lab");
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$3(a * a + b * b);
        var h = (atan2$2(b, a) * RAD2DEG + 360) % 360;
        if (round$2(c * 1e4) === 0) {
          h = Number.NaN;
        }
        return [l, c, h];
      };
      var lab2lch_1 = lab2lch$2;
      var unpack$d = utils.unpack;
      var rgb2lab = rgb2lab_1;
      var lab2lch$1 = lab2lch_1;
      var rgb2lch$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$d(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch$1(l, a, b_);
      };
      var rgb2lch_1 = rgb2lch$1;
      var unpack$c = utils.unpack;
      var DEG2RAD = utils.DEG2RAD;
      var sin$3 = Math.sin;
      var cos$3 = Math.cos;
      var lch2lab$2 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$c(args, "lch");
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) {
          h = 0;
        }
        h = h * DEG2RAD;
        return [l, cos$3(h) * c, sin$3(h) * c];
      };
      var lch2lab_1 = lch2lab$2;
      var unpack$b = utils.unpack;
      var lch2lab$1 = lch2lab_1;
      var lab2rgb = lab2rgb_1;
      var lch2rgb$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$b(args, "lch");
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab$1(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      var lch2rgb_1 = lch2rgb$1;
      var unpack$a = utils.unpack;
      var lch2rgb = lch2rgb_1;
      var hcl2rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var hcl = unpack$a(args, "hcl").reverse();
        return lch2rgb.apply(void 0, hcl);
      };
      var hcl2rgb_1 = hcl2rgb;
      var unpack$9 = utils.unpack;
      var type$d = utils.type;
      var chroma$a = chroma_1;
      var Color$t = Color_1;
      var input$6 = input$h;
      var rgb2lch = rgb2lch_1;
      Color$t.prototype.lch = function() {
        return rgb2lch(this._rgb);
      };
      Color$t.prototype.hcl = function() {
        return rgb2lch(this._rgb).reverse();
      };
      chroma$a.lch = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$t, [null].concat(args, ["lch"])))();
      };
      chroma$a.hcl = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$t, [null].concat(args, ["hcl"])))();
      };
      input$6.format.lch = lch2rgb_1;
      input$6.format.hcl = hcl2rgb_1;
      ["lch", "hcl"].forEach(function(m) {
        return input$6.autodetect.push({
          p: 2,
          test: function() {
            var args = [], len = arguments.length;
            while (len--)
              args[len] = arguments[len];
            args = unpack$9(args, m);
            if (type$d(args) === "array" && args.length === 3) {
              return m;
            }
          }
        });
      });
      var w3cx11$1 = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflower: "#6495ed",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        laserlemon: "#ffff54",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrod: "#fafad2",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        maroon2: "#7f0000",
        maroon3: "#b03060",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        purple2: "#7f007f",
        purple3: "#a020f0",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
      };
      var w3cx11_1 = w3cx11$1;
      var Color$s = Color_1;
      var input$5 = input$h;
      var type$c = utils.type;
      var w3cx11 = w3cx11_1;
      var hex2rgb = hex2rgb_1;
      var rgb2hex = rgb2hex_1;
      Color$s.prototype.name = function() {
        var hex2 = rgb2hex(this._rgb, "rgb");
        for (var i2 = 0, list2 = Object.keys(w3cx11); i2 < list2.length; i2 += 1) {
          var n = list2[i2];
          if (w3cx11[n] === hex2) {
            return n.toLowerCase();
          }
        }
        return hex2;
      };
      input$5.format.named = function(name2) {
        name2 = name2.toLowerCase();
        if (w3cx11[name2]) {
          return hex2rgb(w3cx11[name2]);
        }
        throw new Error("unknown color name: " + name2);
      };
      input$5.autodetect.push({
        p: 5,
        test: function(h) {
          var rest = [], len = arguments.length - 1;
          while (len-- > 0)
            rest[len] = arguments[len + 1];
          if (!rest.length && type$c(h) === "string" && w3cx11[h.toLowerCase()]) {
            return "named";
          }
        }
      });
      var unpack$8 = utils.unpack;
      var rgb2num$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$8(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
      };
      var rgb2num_1 = rgb2num$1;
      var type$b = utils.type;
      var num2rgb = function(num2) {
        if (type$b(num2) == "number" && num2 >= 0 && num2 <= 16777215) {
          var r = num2 >> 16;
          var g = num2 >> 8 & 255;
          var b = num2 & 255;
          return [r, g, b, 1];
        }
        throw new Error("unknown num color: " + num2);
      };
      var num2rgb_1 = num2rgb;
      var chroma$9 = chroma_1;
      var Color$r = Color_1;
      var input$4 = input$h;
      var type$a = utils.type;
      var rgb2num = rgb2num_1;
      Color$r.prototype.num = function() {
        return rgb2num(this._rgb);
      };
      chroma$9.num = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$r, [null].concat(args, ["num"])))();
      };
      input$4.format.num = num2rgb_1;
      input$4.autodetect.push({
        p: 5,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          if (args.length === 1 && type$a(args[0]) === "number" && args[0] >= 0 && args[0] <= 16777215) {
            return "num";
          }
        }
      });
      var chroma$8 = chroma_1;
      var Color$q = Color_1;
      var input$3 = input$h;
      var unpack$7 = utils.unpack;
      var type$9 = utils.type;
      var round$1 = Math.round;
      Color$q.prototype.rgb = function(rnd2) {
        if (rnd2 === void 0)
          rnd2 = true;
        if (rnd2 === false) {
          return this._rgb.slice(0, 3);
        }
        return this._rgb.slice(0, 3).map(round$1);
      };
      Color$q.prototype.rgba = function(rnd2) {
        if (rnd2 === void 0)
          rnd2 = true;
        return this._rgb.slice(0, 4).map(function(v, i2) {
          return i2 < 3 ? rnd2 === false ? v : round$1(v) : v;
        });
      };
      chroma$8.rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$q, [null].concat(args, ["rgb"])))();
      };
      input$3.format.rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var rgba2 = unpack$7(args, "rgba");
        if (rgba2[3] === void 0) {
          rgba2[3] = 1;
        }
        return rgba2;
      };
      input$3.autodetect.push({
        p: 3,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$7(args, "rgba");
          if (type$9(args) === "array" && (args.length === 3 || args.length === 4 && type$9(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) {
            return "rgb";
          }
        }
      });
      var log$1 = Math.log;
      var temperature2rgb$1 = function(kelvin) {
        var temp = kelvin / 100;
        var r, g, b;
        if (temp < 66) {
          r = 255;
          g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log$1(g);
          b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log$1(b);
        } else {
          r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log$1(r);
          g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log$1(g);
          b = 255;
        }
        return [r, g, b, 1];
      };
      var temperature2rgb_1 = temperature2rgb$1;
      var temperature2rgb = temperature2rgb_1;
      var unpack$6 = utils.unpack;
      var round = Math.round;
      var rgb2temperature$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var rgb3 = unpack$6(args, "rgb");
        var r = rgb3[0], b = rgb3[2];
        var minTemp = 1e3;
        var maxTemp = 4e4;
        var eps = 0.4;
        var temp;
        while (maxTemp - minTemp > eps) {
          temp = (maxTemp + minTemp) * 0.5;
          var rgb$1 = temperature2rgb(temp);
          if (rgb$1[2] / rgb$1[0] >= b / r) {
            maxTemp = temp;
          } else {
            minTemp = temp;
          }
        }
        return round(temp);
      };
      var rgb2temperature_1 = rgb2temperature$1;
      var chroma$7 = chroma_1;
      var Color$p = Color_1;
      var input$2 = input$h;
      var rgb2temperature = rgb2temperature_1;
      Color$p.prototype.temp = Color$p.prototype.kelvin = Color$p.prototype.temperature = function() {
        return rgb2temperature(this._rgb);
      };
      chroma$7.temp = chroma$7.kelvin = chroma$7.temperature = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$p, [null].concat(args, ["temp"])))();
      };
      input$2.format.temp = input$2.format.kelvin = input$2.format.temperature = temperature2rgb_1;
      var unpack$5 = utils.unpack;
      var cbrt = Math.cbrt;
      var pow$8 = Math.pow;
      var sign$1 = Math.sign;
      var rgb2oklab$2 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$5(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = [rgb2lrgb(r / 255), rgb2lrgb(g / 255), rgb2lrgb(b / 255)];
        var lr = ref$1[0];
        var lg = ref$1[1];
        var lb = ref$1[2];
        var l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
        var m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
        var s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
        return [
          0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
          1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
          0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
        ];
      };
      var rgb2oklab_1 = rgb2oklab$2;
      function rgb2lrgb(c) {
        var abs2 = Math.abs(c);
        if (abs2 < 0.04045) {
          return c / 12.92;
        }
        return (sign$1(c) || 1) * pow$8((abs2 + 0.055) / 1.055, 2.4);
      }
      var unpack$4 = utils.unpack;
      var pow$7 = Math.pow;
      var sign = Math.sign;
      var oklab2rgb$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$4(args, "lab");
        var L = args[0];
        var a = args[1];
        var b = args[2];
        var l = pow$7(L + 0.3963377774 * a + 0.2158037573 * b, 3);
        var m = pow$7(L - 0.1055613458 * a - 0.0638541728 * b, 3);
        var s = pow$7(L - 0.0894841775 * a - 1.291485548 * b, 3);
        return [
          255 * lrgb2rgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
          255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
          255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
          args.length > 3 ? args[3] : 1
        ];
      };
      var oklab2rgb_1 = oklab2rgb$1;
      function lrgb2rgb(c) {
        var abs2 = Math.abs(c);
        if (abs2 > 31308e-7) {
          return (sign(c) || 1) * (1.055 * pow$7(abs2, 1 / 2.4) - 0.055);
        }
        return c * 12.92;
      }
      var unpack$3 = utils.unpack;
      var type$8 = utils.type;
      var chroma$6 = chroma_1;
      var Color$o = Color_1;
      var input$1 = input$h;
      var rgb2oklab$1 = rgb2oklab_1;
      Color$o.prototype.oklab = function() {
        return rgb2oklab$1(this._rgb);
      };
      chroma$6.oklab = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$o, [null].concat(args, ["oklab"])))();
      };
      input$1.format.oklab = oklab2rgb_1;
      input$1.autodetect.push({
        p: 3,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$3(args, "oklab");
          if (type$8(args) === "array" && args.length === 3) {
            return "oklab";
          }
        }
      });
      var unpack$2 = utils.unpack;
      var rgb2oklab = rgb2oklab_1;
      var lab2lch = lab2lch_1;
      var rgb2oklch$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$2(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2oklab(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch(l, a, b_);
      };
      var rgb2oklch_1 = rgb2oklch$1;
      var unpack$1 = utils.unpack;
      var lch2lab = lch2lab_1;
      var oklab2rgb = oklab2rgb_1;
      var oklch2rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$1(args, "lch");
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = oklab2rgb(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      var oklch2rgb_1 = oklch2rgb;
      var unpack = utils.unpack;
      var type$7 = utils.type;
      var chroma$5 = chroma_1;
      var Color$n = Color_1;
      var input = input$h;
      var rgb2oklch = rgb2oklch_1;
      Color$n.prototype.oklch = function() {
        return rgb2oklch(this._rgb);
      };
      chroma$5.oklch = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$n, [null].concat(args, ["oklch"])))();
      };
      input.format.oklch = oklch2rgb_1;
      input.autodetect.push({
        p: 3,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack(args, "oklch");
          if (type$7(args) === "array" && args.length === 3) {
            return "oklch";
          }
        }
      });
      var Color$m = Color_1;
      var type$6 = utils.type;
      Color$m.prototype.alpha = function(a, mutate) {
        if (mutate === void 0)
          mutate = false;
        if (a !== void 0 && type$6(a) === "number") {
          if (mutate) {
            this._rgb[3] = a;
            return this;
          }
          return new Color$m([this._rgb[0], this._rgb[1], this._rgb[2], a], "rgb");
        }
        return this._rgb[3];
      };
      var Color$l = Color_1;
      Color$l.prototype.clipped = function() {
        return this._rgb._clipped || false;
      };
      var Color$k = Color_1;
      var LAB_CONSTANTS$1 = labConstants;
      Color$k.prototype.darken = function(amount) {
        if (amount === void 0)
          amount = 1;
        var me = this;
        var lab2 = me.lab();
        lab2[0] -= LAB_CONSTANTS$1.Kn * amount;
        return new Color$k(lab2, "lab").alpha(me.alpha(), true);
      };
      Color$k.prototype.brighten = function(amount) {
        if (amount === void 0)
          amount = 1;
        return this.darken(-amount);
      };
      Color$k.prototype.darker = Color$k.prototype.darken;
      Color$k.prototype.brighter = Color$k.prototype.brighten;
      var Color$j = Color_1;
      Color$j.prototype.get = function(mc) {
        var ref = mc.split(".");
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
          var i2 = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
          if (i2 > -1) {
            return src[i2];
          }
          throw new Error("unknown channel " + channel + " in mode " + mode);
        } else {
          return src;
        }
      };
      var Color$i = Color_1;
      var type$5 = utils.type;
      var pow$6 = Math.pow;
      var EPS = 1e-7;
      var MAX_ITER = 20;
      Color$i.prototype.luminance = function(lum) {
        if (lum !== void 0 && type$5(lum) === "number") {
          if (lum === 0) {
            return new Color$i([0, 0, 0, this._rgb[3]], "rgb");
          }
          if (lum === 1) {
            return new Color$i([255, 255, 255, this._rgb[3]], "rgb");
          }
          var cur_lum = this.luminance();
          var mode = "rgb";
          var max_iter = MAX_ITER;
          var test = function(low, high) {
            var mid = low.interpolate(high, 0.5, mode);
            var lm = mid.luminance();
            if (Math.abs(lum - lm) < EPS || !max_iter--) {
              return mid;
            }
            return lm > lum ? test(low, mid) : test(mid, high);
          };
          var rgb3 = (cur_lum > lum ? test(new Color$i([0, 0, 0]), this) : test(this, new Color$i([255, 255, 255]))).rgb();
          return new Color$i(rgb3.concat([this._rgb[3]]));
        }
        return rgb2luminance.apply(void 0, this._rgb.slice(0, 3));
      };
      var rgb2luminance = function(r, g, b) {
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      var luminance_x = function(x) {
        x /= 255;
        return x <= 0.03928 ? x / 12.92 : pow$6((x + 0.055) / 1.055, 2.4);
      };
      var interpolator$1 = {};
      var Color$h = Color_1;
      var type$4 = utils.type;
      var interpolator = interpolator$1;
      var mix$1 = function(col1, col2, f) {
        if (f === void 0)
          f = 0.5;
        var rest = [], len = arguments.length - 3;
        while (len-- > 0)
          rest[len] = arguments[len + 3];
        var mode = rest[0] || "lrgb";
        if (!interpolator[mode] && !rest.length) {
          mode = Object.keys(interpolator)[0];
        }
        if (!interpolator[mode]) {
          throw new Error("interpolation mode " + mode + " is not defined");
        }
        if (type$4(col1) !== "object") {
          col1 = new Color$h(col1);
        }
        if (type$4(col2) !== "object") {
          col2 = new Color$h(col2);
        }
        return interpolator[mode](col1, col2, f).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
      };
      var Color$g = Color_1;
      var mix = mix$1;
      Color$g.prototype.mix = Color$g.prototype.interpolate = function(col2, f) {
        if (f === void 0)
          f = 0.5;
        var rest = [], len = arguments.length - 2;
        while (len-- > 0)
          rest[len] = arguments[len + 2];
        return mix.apply(void 0, [this, col2, f].concat(rest));
      };
      var Color$f = Color_1;
      Color$f.prototype.premultiply = function(mutate) {
        if (mutate === void 0)
          mutate = false;
        var rgb3 = this._rgb;
        var a = rgb3[3];
        if (mutate) {
          this._rgb = [rgb3[0] * a, rgb3[1] * a, rgb3[2] * a, a];
          return this;
        } else {
          return new Color$f([rgb3[0] * a, rgb3[1] * a, rgb3[2] * a, a], "rgb");
        }
      };
      var Color$e = Color_1;
      var LAB_CONSTANTS = labConstants;
      Color$e.prototype.saturate = function(amount) {
        if (amount === void 0)
          amount = 1;
        var me = this;
        var lch2 = me.lch();
        lch2[1] += LAB_CONSTANTS.Kn * amount;
        if (lch2[1] < 0) {
          lch2[1] = 0;
        }
        return new Color$e(lch2, "lch").alpha(me.alpha(), true);
      };
      Color$e.prototype.desaturate = function(amount) {
        if (amount === void 0)
          amount = 1;
        return this.saturate(-amount);
      };
      var Color$d = Color_1;
      var type$3 = utils.type;
      Color$d.prototype.set = function(mc, value, mutate) {
        if (mutate === void 0)
          mutate = false;
        var ref = mc.split(".");
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
          var i2 = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
          if (i2 > -1) {
            if (type$3(value) == "string") {
              switch (value.charAt(0)) {
                case "+":
                  src[i2] += +value;
                  break;
                case "-":
                  src[i2] += +value;
                  break;
                case "*":
                  src[i2] *= +value.substr(1);
                  break;
                case "/":
                  src[i2] /= +value.substr(1);
                  break;
                default:
                  src[i2] = +value;
              }
            } else if (type$3(value) === "number") {
              src[i2] = value;
            } else {
              throw new Error("unsupported value for Color.set");
            }
            var out = new Color$d(src, mode);
            if (mutate) {
              this._rgb = out._rgb;
              return this;
            }
            return out;
          }
          throw new Error("unknown channel " + channel + " in mode " + mode);
        } else {
          return src;
        }
      };
      var Color$c = Color_1;
      var rgb2 = function(col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color$c(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "rgb");
      };
      interpolator$1.rgb = rgb2;
      var Color$b = Color_1;
      var sqrt$2 = Math.sqrt;
      var pow$5 = Math.pow;
      var lrgb = function(col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color$b(sqrt$2(pow$5(x1, 2) * (1 - f) + pow$5(x2, 2) * f), sqrt$2(pow$5(y1, 2) * (1 - f) + pow$5(y2, 2) * f), sqrt$2(pow$5(z1, 2) * (1 - f) + pow$5(z2, 2) * f), "rgb");
      };
      interpolator$1.lrgb = lrgb;
      var Color$a = Color_1;
      var lab = function(col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color$a(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "lab");
      };
      interpolator$1.lab = lab;
      var Color$9 = Color_1;
      var _hsx = function(col1, col2, f, m) {
        var assign, assign$1;
        var xyz0, xyz1;
        if (m === "hsl") {
          xyz0 = col1.hsl();
          xyz1 = col2.hsl();
        } else if (m === "hsv") {
          xyz0 = col1.hsv();
          xyz1 = col2.hsv();
        } else if (m === "hcg") {
          xyz0 = col1.hcg();
          xyz1 = col2.hcg();
        } else if (m === "hsi") {
          xyz0 = col1.hsi();
          xyz1 = col2.hsi();
        } else if (m === "lch" || m === "hcl") {
          m = "hcl";
          xyz0 = col1.hcl();
          xyz1 = col2.hcl();
        } else if (m === "oklch") {
          xyz0 = col1.oklch().reverse();
          xyz1 = col2.oklch().reverse();
        }
        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === "h" || m === "oklch") {
          assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2];
          assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2];
        }
        var sat, hue, lbv, dh;
        if (!isNaN(hue0) && !isNaN(hue1)) {
          if (hue1 > hue0 && hue1 - hue0 > 180) {
            dh = hue1 - (hue0 + 360);
          } else if (hue1 < hue0 && hue0 - hue1 > 180) {
            dh = hue1 + 360 - hue0;
          } else {
            dh = hue1 - hue0;
          }
          hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
          hue = hue0;
          if ((lbv1 == 1 || lbv1 == 0) && m != "hsv") {
            sat = sat0;
          }
        } else if (!isNaN(hue1)) {
          hue = hue1;
          if ((lbv0 == 1 || lbv0 == 0) && m != "hsv") {
            sat = sat1;
          }
        } else {
          hue = Number.NaN;
        }
        if (sat === void 0) {
          sat = sat0 + f * (sat1 - sat0);
        }
        lbv = lbv0 + f * (lbv1 - lbv0);
        return m === "oklch" ? new Color$9([lbv, sat, hue], m) : new Color$9([hue, sat, lbv], m);
      };
      var interpolate_hsx$5 = _hsx;
      var lch = function(col1, col2, f) {
        return interpolate_hsx$5(col1, col2, f, "lch");
      };
      interpolator$1.lch = lch;
      interpolator$1.hcl = lch;
      var Color$8 = Color_1;
      var num = function(col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color$8(c1 + f * (c2 - c1), "num");
      };
      interpolator$1.num = num;
      var interpolate_hsx$4 = _hsx;
      var hcg = function(col1, col2, f) {
        return interpolate_hsx$4(col1, col2, f, "hcg");
      };
      interpolator$1.hcg = hcg;
      var interpolate_hsx$3 = _hsx;
      var hsi = function(col1, col2, f) {
        return interpolate_hsx$3(col1, col2, f, "hsi");
      };
      interpolator$1.hsi = hsi;
      var interpolate_hsx$2 = _hsx;
      var hsl2 = function(col1, col2, f) {
        return interpolate_hsx$2(col1, col2, f, "hsl");
      };
      interpolator$1.hsl = hsl2;
      var interpolate_hsx$1 = _hsx;
      var hsv = function(col1, col2, f) {
        return interpolate_hsx$1(col1, col2, f, "hsv");
      };
      interpolator$1.hsv = hsv;
      var Color$7 = Color_1;
      var oklab = function(col1, col2, f) {
        var xyz0 = col1.oklab();
        var xyz1 = col2.oklab();
        return new Color$7(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "oklab");
      };
      interpolator$1.oklab = oklab;
      var interpolate_hsx = _hsx;
      var oklch = function(col1, col2, f) {
        return interpolate_hsx(col1, col2, f, "oklch");
      };
      interpolator$1.oklch = oklch;
      var Color$6 = Color_1;
      var clip_rgb$1 = utils.clip_rgb;
      var pow$4 = Math.pow;
      var sqrt$1 = Math.sqrt;
      var PI$1 = Math.PI;
      var cos$2 = Math.cos;
      var sin$2 = Math.sin;
      var atan2$1 = Math.atan2;
      var average = function(colors, mode, weights) {
        if (mode === void 0)
          mode = "lrgb";
        if (weights === void 0)
          weights = null;
        var l = colors.length;
        if (!weights) {
          weights = Array.from(new Array(l)).map(function() {
            return 1;
          });
        }
        var k = l / weights.reduce(function(a, b) {
          return a + b;
        });
        weights.forEach(function(w, i3) {
          weights[i3] *= k;
        });
        colors = colors.map(function(c) {
          return new Color$6(c);
        });
        if (mode === "lrgb") {
          return _average_lrgb(colors, weights);
        }
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        for (var i2 = 0; i2 < xyz.length; i2++) {
          xyz[i2] = (xyz[i2] || 0) * weights[0];
          cnt.push(isNaN(xyz[i2]) ? 0 : weights[0]);
          if (mode.charAt(i2) === "h" && !isNaN(xyz[i2])) {
            var A = xyz[i2] / 180 * PI$1;
            dx += cos$2(A) * weights[0];
            dy += sin$2(A) * weights[0];
          }
        }
        var alpha = first.alpha() * weights[0];
        colors.forEach(function(c, ci) {
          var xyz2 = c.get(mode);
          alpha += c.alpha() * weights[ci + 1];
          for (var i3 = 0; i3 < xyz.length; i3++) {
            if (!isNaN(xyz2[i3])) {
              cnt[i3] += weights[ci + 1];
              if (mode.charAt(i3) === "h") {
                var A2 = xyz2[i3] / 180 * PI$1;
                dx += cos$2(A2) * weights[ci + 1];
                dy += sin$2(A2) * weights[ci + 1];
              } else {
                xyz[i3] += xyz2[i3] * weights[ci + 1];
              }
            }
          }
        });
        for (var i$12 = 0; i$12 < xyz.length; i$12++) {
          if (mode.charAt(i$12) === "h") {
            var A$1 = atan2$1(dy / cnt[i$12], dx / cnt[i$12]) / PI$1 * 180;
            while (A$1 < 0) {
              A$1 += 360;
            }
            while (A$1 >= 360) {
              A$1 -= 360;
            }
            xyz[i$12] = A$1;
          } else {
            xyz[i$12] = xyz[i$12] / cnt[i$12];
          }
        }
        alpha /= l;
        return new Color$6(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
      };
      var _average_lrgb = function(colors, weights) {
        var l = colors.length;
        var xyz = [0, 0, 0, 0];
        for (var i2 = 0; i2 < colors.length; i2++) {
          var col = colors[i2];
          var f = weights[i2] / l;
          var rgb3 = col._rgb;
          xyz[0] += pow$4(rgb3[0], 2) * f;
          xyz[1] += pow$4(rgb3[1], 2) * f;
          xyz[2] += pow$4(rgb3[2], 2) * f;
          xyz[3] += rgb3[3] * f;
        }
        xyz[0] = sqrt$1(xyz[0]);
        xyz[1] = sqrt$1(xyz[1]);
        xyz[2] = sqrt$1(xyz[2]);
        if (xyz[3] > 0.9999999) {
          xyz[3] = 1;
        }
        return new Color$6(clip_rgb$1(xyz));
      };
      var chroma$4 = chroma_1;
      var type$2 = utils.type;
      var pow$3 = Math.pow;
      var scale$2 = function(colors) {
        var _mode = "rgb";
        var _nacol = chroma$4("#ccc");
        var _spread = 0;
        var _domain = [0, 1];
        var _pos = [];
        var _padding = [0, 0];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;
        var setColors = function(colors2) {
          colors2 = colors2 || ["#fff", "#000"];
          if (colors2 && type$2(colors2) === "string" && chroma$4.brewer && chroma$4.brewer[colors2.toLowerCase()]) {
            colors2 = chroma$4.brewer[colors2.toLowerCase()];
          }
          if (type$2(colors2) === "array") {
            if (colors2.length === 1) {
              colors2 = [colors2[0], colors2[0]];
            }
            colors2 = colors2.slice(0);
            for (var c = 0; c < colors2.length; c++) {
              colors2[c] = chroma$4(colors2[c]);
            }
            _pos.length = 0;
            for (var c$1 = 0; c$1 < colors2.length; c$1++) {
              _pos.push(c$1 / (colors2.length - 1));
            }
          }
          resetCache();
          return _colors = colors2;
        };
        var getClass = function(value) {
          if (_classes != null) {
            var n = _classes.length - 1;
            var i2 = 0;
            while (i2 < n && value >= _classes[i2]) {
              i2++;
            }
            return i2 - 1;
          }
          return 0;
        };
        var tMapLightness = function(t) {
          return t;
        };
        var tMapDomain = function(t) {
          return t;
        };
        var getColor = function(val, bypassMap) {
          var col, t;
          if (bypassMap == null) {
            bypassMap = false;
          }
          if (isNaN(val) || val === null) {
            return _nacol;
          }
          if (!bypassMap) {
            if (_classes && _classes.length > 2) {
              var c = getClass(val);
              t = c / (_classes.length - 2);
            } else if (_max !== _min) {
              t = (val - _min) / (_max - _min);
            } else {
              t = 1;
            }
          } else {
            t = val;
          }
          t = tMapDomain(t);
          if (!bypassMap) {
            t = tMapLightness(t);
          }
          if (_gamma !== 1) {
            t = pow$3(t, _gamma);
          }
          t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
          t = Math.min(1, Math.max(0, t));
          var k = Math.floor(t * 1e4);
          if (_useCache && _colorCache[k]) {
            col = _colorCache[k];
          } else {
            if (type$2(_colors) === "array") {
              for (var i2 = 0; i2 < _pos.length; i2++) {
                var p = _pos[i2];
                if (t <= p) {
                  col = _colors[i2];
                  break;
                }
                if (t >= p && i2 === _pos.length - 1) {
                  col = _colors[i2];
                  break;
                }
                if (t > p && t < _pos[i2 + 1]) {
                  t = (t - p) / (_pos[i2 + 1] - p);
                  col = chroma$4.interpolate(_colors[i2], _colors[i2 + 1], t, _mode);
                  break;
                }
              }
            } else if (type$2(_colors) === "function") {
              col = _colors(t);
            }
            if (_useCache) {
              _colorCache[k] = col;
            }
          }
          return col;
        };
        var resetCache = function() {
          return _colorCache = {};
        };
        setColors(colors);
        var f = function(v) {
          var c = chroma$4(getColor(v));
          if (_out && c[_out]) {
            return c[_out]();
          } else {
            return c;
          }
        };
        f.classes = function(classes) {
          if (classes != null) {
            if (type$2(classes) === "array") {
              _classes = classes;
              _domain = [classes[0], classes[classes.length - 1]];
            } else {
              var d = chroma$4.analyze(_domain);
              if (classes === 0) {
                _classes = [d.min, d.max];
              } else {
                _classes = chroma$4.limits(d, "e", classes);
              }
            }
            return f;
          }
          return _classes;
        };
        f.domain = function(domain) {
          if (!arguments.length) {
            return _domain;
          }
          _min = domain[0];
          _max = domain[domain.length - 1];
          _pos = [];
          var k = _colors.length;
          if (domain.length === k && _min !== _max) {
            for (var i2 = 0, list2 = Array.from(domain); i2 < list2.length; i2 += 1) {
              var d = list2[i2];
              _pos.push((d - _min) / (_max - _min));
            }
          } else {
            for (var c = 0; c < k; c++) {
              _pos.push(c / (k - 1));
            }
            if (domain.length > 2) {
              var tOut = domain.map(function(d2, i3) {
                return i3 / (domain.length - 1);
              });
              var tBreaks = domain.map(function(d2) {
                return (d2 - _min) / (_max - _min);
              });
              if (!tBreaks.every(function(val, i3) {
                return tOut[i3] === val;
              })) {
                tMapDomain = function(t) {
                  if (t <= 0 || t >= 1) {
                    return t;
                  }
                  var i3 = 0;
                  while (t >= tBreaks[i3 + 1]) {
                    i3++;
                  }
                  var f2 = (t - tBreaks[i3]) / (tBreaks[i3 + 1] - tBreaks[i3]);
                  var out = tOut[i3] + f2 * (tOut[i3 + 1] - tOut[i3]);
                  return out;
                };
              }
            }
          }
          _domain = [_min, _max];
          return f;
        };
        f.mode = function(_m) {
          if (!arguments.length) {
            return _mode;
          }
          _mode = _m;
          resetCache();
          return f;
        };
        f.range = function(colors2, _pos2) {
          setColors(colors2);
          return f;
        };
        f.out = function(_o) {
          _out = _o;
          return f;
        };
        f.spread = function(val) {
          if (!arguments.length) {
            return _spread;
          }
          _spread = val;
          return f;
        };
        f.correctLightness = function(v) {
          if (v == null) {
            v = true;
          }
          _correctLightness = v;
          resetCache();
          if (_correctLightness) {
            tMapLightness = function(t) {
              var L0 = getColor(0, true).lab()[0];
              var L1 = getColor(1, true).lab()[0];
              var pol = L0 > L1;
              var L_actual = getColor(t, true).lab()[0];
              var L_ideal = L0 + (L1 - L0) * t;
              var L_diff = L_actual - L_ideal;
              var t0 = 0;
              var t1 = 1;
              var max_iter = 20;
              while (Math.abs(L_diff) > 0.01 && max_iter-- > 0) {
                (function() {
                  if (pol) {
                    L_diff *= -1;
                  }
                  if (L_diff < 0) {
                    t0 = t;
                    t += (t1 - t) * 0.5;
                  } else {
                    t1 = t;
                    t += (t0 - t) * 0.5;
                  }
                  L_actual = getColor(t, true).lab()[0];
                  return L_diff = L_actual - L_ideal;
                })();
              }
              return t;
            };
          } else {
            tMapLightness = function(t) {
              return t;
            };
          }
          return f;
        };
        f.padding = function(p) {
          if (p != null) {
            if (type$2(p) === "number") {
              p = [p, p];
            }
            _padding = p;
            return f;
          } else {
            return _padding;
          }
        };
        f.colors = function(numColors, out) {
          if (arguments.length < 2) {
            out = "hex";
          }
          var result = [];
          if (arguments.length === 0) {
            result = _colors.slice(0);
          } else if (numColors === 1) {
            result = [f(0.5)];
          } else if (numColors > 1) {
            var dm = _domain[0];
            var dd = _domain[1] - dm;
            result = __range__(0, numColors, false).map(function(i3) {
              return f(dm + i3 / (numColors - 1) * dd);
            });
          } else {
            colors = [];
            var samples = [];
            if (_classes && _classes.length > 2) {
              for (var i2 = 1, end = _classes.length, asc = 1 <= end; asc ? i2 < end : i2 > end; asc ? i2++ : i2--) {
                samples.push((_classes[i2 - 1] + _classes[i2]) * 0.5);
              }
            } else {
              samples = _domain;
            }
            result = samples.map(function(v) {
              return f(v);
            });
          }
          if (chroma$4[out]) {
            result = result.map(function(c) {
              return c[out]();
            });
          }
          return result;
        };
        f.cache = function(c) {
          if (c != null) {
            _useCache = c;
            return f;
          } else {
            return _useCache;
          }
        };
        f.gamma = function(g) {
          if (g != null) {
            _gamma = g;
            return f;
          } else {
            return _gamma;
          }
        };
        f.nodata = function(d) {
          if (d != null) {
            _nacol = chroma$4(d);
            return f;
          } else {
            return _nacol;
          }
        };
        return f;
      };
      function __range__(left, right, inclusive) {
        var range = [];
        var ascending = left < right;
        var end = !inclusive ? right : ascending ? right + 1 : right - 1;
        for (var i2 = left; ascending ? i2 < end : i2 > end; ascending ? i2++ : i2--) {
          range.push(i2);
        }
        return range;
      }
      var Color$5 = Color_1;
      var scale$1 = scale$2;
      var binom_row = function(n) {
        var row = [1, 1];
        for (var i2 = 1; i2 < n; i2++) {
          var newrow = [1];
          for (var j = 1; j <= row.length; j++) {
            newrow[j] = (row[j] || 0) + row[j - 1];
          }
          row = newrow;
        }
        return row;
      };
      var bezier = function(colors) {
        var assign, assign$1, assign$2;
        var I, lab0, lab1, lab2;
        colors = colors.map(function(c) {
          return new Color$5(c);
        });
        if (colors.length === 2) {
          assign = colors.map(function(c) {
            return c.lab();
          }), lab0 = assign[0], lab1 = assign[1];
          I = function(t) {
            var lab4 = [0, 1, 2].map(function(i2) {
              return lab0[i2] + t * (lab1[i2] - lab0[i2]);
            });
            return new Color$5(lab4, "lab");
          };
        } else if (colors.length === 3) {
          assign$1 = colors.map(function(c) {
            return c.lab();
          }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2];
          I = function(t) {
            var lab4 = [0, 1, 2].map(function(i2) {
              return (1 - t) * (1 - t) * lab0[i2] + 2 * (1 - t) * t * lab1[i2] + t * t * lab2[i2];
            });
            return new Color$5(lab4, "lab");
          };
        } else if (colors.length === 4) {
          var lab3;
          assign$2 = colors.map(function(c) {
            return c.lab();
          }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3];
          I = function(t) {
            var lab4 = [0, 1, 2].map(function(i2) {
              return (1 - t) * (1 - t) * (1 - t) * lab0[i2] + 3 * (1 - t) * (1 - t) * t * lab1[i2] + 3 * (1 - t) * t * t * lab2[i2] + t * t * t * lab3[i2];
            });
            return new Color$5(lab4, "lab");
          };
        } else if (colors.length >= 5) {
          var labs, row, n;
          labs = colors.map(function(c) {
            return c.lab();
          });
          n = colors.length - 1;
          row = binom_row(n);
          I = function(t) {
            var u = 1 - t;
            var lab4 = [0, 1, 2].map(function(i2) {
              return labs.reduce(function(sum, el, j) {
                return sum + row[j] * Math.pow(u, n - j) * Math.pow(t, j) * el[i2];
              }, 0);
            });
            return new Color$5(lab4, "lab");
          };
        } else {
          throw new RangeError("No point in running bezier with only one color.");
        }
        return I;
      };
      var bezier_1 = function(colors) {
        var f = bezier(colors);
        f.scale = function() {
          return scale$1(f);
        };
        return f;
      };
      var chroma$3 = chroma_1;
      var blend = function(bottom, top, mode) {
        if (!blend[mode]) {
          throw new Error("unknown blend mode " + mode);
        }
        return blend[mode](bottom, top);
      };
      var blend_f = function(f) {
        return function(bottom, top) {
          var c0 = chroma$3(top).rgb();
          var c1 = chroma$3(bottom).rgb();
          return chroma$3.rgb(f(c0, c1));
        };
      };
      var each = function(f) {
        return function(c0, c1) {
          var out = [];
          out[0] = f(c0[0], c1[0]);
          out[1] = f(c0[1], c1[1]);
          out[2] = f(c0[2], c1[2]);
          return out;
        };
      };
      var normal = function(a) {
        return a;
      };
      var multiply = function(a, b) {
        return a * b / 255;
      };
      var darken = function(a, b) {
        return a > b ? b : a;
      };
      var lighten = function(a, b) {
        return a > b ? a : b;
      };
      var screen = function(a, b) {
        return 255 * (1 - (1 - a / 255) * (1 - b / 255));
      };
      var overlay = function(a, b) {
        return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
      };
      var burn = function(a, b) {
        return 255 * (1 - (1 - b / 255) / (a / 255));
      };
      var dodge = function(a, b) {
        if (a === 255) {
          return 255;
        }
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a;
      };
      blend.normal = blend_f(each(normal));
      blend.multiply = blend_f(each(multiply));
      blend.screen = blend_f(each(screen));
      blend.overlay = blend_f(each(overlay));
      blend.darken = blend_f(each(darken));
      blend.lighten = blend_f(each(lighten));
      blend.dodge = blend_f(each(dodge));
      blend.burn = blend_f(each(burn));
      var blend_1 = blend;
      var type$1 = utils.type;
      var clip_rgb = utils.clip_rgb;
      var TWOPI = utils.TWOPI;
      var pow$2 = Math.pow;
      var sin$1 = Math.sin;
      var cos$1 = Math.cos;
      var chroma$2 = chroma_1;
      var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if (start === void 0)
          start = 300;
        if (rotations === void 0)
          rotations = -1.5;
        if (hue === void 0)
          hue = 1;
        if (gamma === void 0)
          gamma = 1;
        if (lightness === void 0)
          lightness = [0, 1];
        var dh = 0, dl;
        if (type$1(lightness) === "array") {
          dl = lightness[1] - lightness[0];
        } else {
          dl = 0;
          lightness = [lightness, lightness];
        }
        var f = function(fract) {
          var a = TWOPI * ((start + 120) / 360 + rotations * fract);
          var l = pow$2(lightness[0] + dl * fract, gamma);
          var h = dh !== 0 ? hue[0] + fract * dh : hue;
          var amp = h * l * (1 - l) / 2;
          var cos_a = cos$1(a);
          var sin_a = sin$1(a);
          var r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
          var g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
          var b = l + amp * (1.97294 * cos_a);
          return chroma$2(clip_rgb([r * 255, g * 255, b * 255, 1]));
        };
        f.start = function(s) {
          if (s == null) {
            return start;
          }
          start = s;
          return f;
        };
        f.rotations = function(r) {
          if (r == null) {
            return rotations;
          }
          rotations = r;
          return f;
        };
        f.gamma = function(g) {
          if (g == null) {
            return gamma;
          }
          gamma = g;
          return f;
        };
        f.hue = function(h) {
          if (h == null) {
            return hue;
          }
          hue = h;
          if (type$1(hue) === "array") {
            dh = hue[1] - hue[0];
            if (dh === 0) {
              hue = hue[1];
            }
          } else {
            dh = 0;
          }
          return f;
        };
        f.lightness = function(h) {
          if (h == null) {
            return lightness;
          }
          if (type$1(h) === "array") {
            lightness = h;
            dl = h[1] - h[0];
          } else {
            lightness = [h, h];
            dl = 0;
          }
          return f;
        };
        f.scale = function() {
          return chroma$2.scale(f);
        };
        f.hue(hue);
        return f;
      };
      var Color$4 = Color_1;
      var digits = "0123456789abcdef";
      var floor$1 = Math.floor;
      var random = Math.random;
      var random_1 = function() {
        var code = "#";
        for (var i2 = 0; i2 < 6; i2++) {
          code += digits.charAt(floor$1(random() * 16));
        }
        return new Color$4(code, "hex");
      };
      var type = type$p;
      var log = Math.log;
      var pow$1 = Math.pow;
      var floor = Math.floor;
      var abs$1 = Math.abs;
      var analyze = function(data, key2) {
        if (key2 === void 0)
          key2 = null;
        var r = {
          min: Number.MAX_VALUE,
          max: Number.MAX_VALUE * -1,
          sum: 0,
          values: [],
          count: 0
        };
        if (type(data) === "object") {
          data = Object.values(data);
        }
        data.forEach(function(val) {
          if (key2 && type(val) === "object") {
            val = val[key2];
          }
          if (val !== void 0 && val !== null && !isNaN(val)) {
            r.values.push(val);
            r.sum += val;
            if (val < r.min) {
              r.min = val;
            }
            if (val > r.max) {
              r.max = val;
            }
            r.count += 1;
          }
        });
        r.domain = [r.min, r.max];
        r.limits = function(mode, num2) {
          return limits(r, mode, num2);
        };
        return r;
      };
      var limits = function(data, mode, num2) {
        if (mode === void 0)
          mode = "equal";
        if (num2 === void 0)
          num2 = 7;
        if (type(data) == "array") {
          data = analyze(data);
        }
        var min2 = data.min;
        var max2 = data.max;
        var values = data.values.sort(function(a, b) {
          return a - b;
        });
        if (num2 === 1) {
          return [min2, max2];
        }
        var limits2 = [];
        if (mode.substr(0, 1) === "c") {
          limits2.push(min2);
          limits2.push(max2);
        }
        if (mode.substr(0, 1) === "e") {
          limits2.push(min2);
          for (var i2 = 1; i2 < num2; i2++) {
            limits2.push(min2 + i2 / num2 * (max2 - min2));
          }
          limits2.push(max2);
        } else if (mode.substr(0, 1) === "l") {
          if (min2 <= 0) {
            throw new Error("Logarithmic scales are only possible for values > 0");
          }
          var min_log = Math.LOG10E * log(min2);
          var max_log = Math.LOG10E * log(max2);
          limits2.push(min2);
          for (var i$12 = 1; i$12 < num2; i$12++) {
            limits2.push(pow$1(10, min_log + i$12 / num2 * (max_log - min_log)));
          }
          limits2.push(max2);
        } else if (mode.substr(0, 1) === "q") {
          limits2.push(min2);
          for (var i$2 = 1; i$2 < num2; i$2++) {
            var p = (values.length - 1) * i$2 / num2;
            var pb = floor(p);
            if (pb === p) {
              limits2.push(values[pb]);
            } else {
              var pr = p - pb;
              limits2.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
            }
          }
          limits2.push(max2);
        } else if (mode.substr(0, 1) === "k") {
          var cluster;
          var n = values.length;
          var assignments = new Array(n);
          var clusterSizes = new Array(num2);
          var repeat = true;
          var nb_iters = 0;
          var centroids = null;
          centroids = [];
          centroids.push(min2);
          for (var i$3 = 1; i$3 < num2; i$3++) {
            centroids.push(min2 + i$3 / num2 * (max2 - min2));
          }
          centroids.push(max2);
          while (repeat) {
            for (var j = 0; j < num2; j++) {
              clusterSizes[j] = 0;
            }
            for (var i$4 = 0; i$4 < n; i$4++) {
              var value = values[i$4];
              var mindist = Number.MAX_VALUE;
              var best = void 0;
              for (var j$1 = 0; j$1 < num2; j$1++) {
                var dist = abs$1(centroids[j$1] - value);
                if (dist < mindist) {
                  mindist = dist;
                  best = j$1;
                }
                clusterSizes[best]++;
                assignments[i$4] = best;
              }
            }
            var newCentroids = new Array(num2);
            for (var j$2 = 0; j$2 < num2; j$2++) {
              newCentroids[j$2] = null;
            }
            for (var i$5 = 0; i$5 < n; i$5++) {
              cluster = assignments[i$5];
              if (newCentroids[cluster] === null) {
                newCentroids[cluster] = values[i$5];
              } else {
                newCentroids[cluster] += values[i$5];
              }
            }
            for (var j$3 = 0; j$3 < num2; j$3++) {
              newCentroids[j$3] *= 1 / clusterSizes[j$3];
            }
            repeat = false;
            for (var j$4 = 0; j$4 < num2; j$4++) {
              if (newCentroids[j$4] !== centroids[j$4]) {
                repeat = true;
                break;
              }
            }
            centroids = newCentroids;
            nb_iters++;
            if (nb_iters > 200) {
              repeat = false;
            }
          }
          var kClusters = {};
          for (var j$5 = 0; j$5 < num2; j$5++) {
            kClusters[j$5] = [];
          }
          for (var i$6 = 0; i$6 < n; i$6++) {
            cluster = assignments[i$6];
            kClusters[cluster].push(values[i$6]);
          }
          var tmpKMeansBreaks = [];
          for (var j$6 = 0; j$6 < num2; j$6++) {
            tmpKMeansBreaks.push(kClusters[j$6][0]);
            tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length - 1]);
          }
          tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a, b) {
            return a - b;
          });
          limits2.push(tmpKMeansBreaks[0]);
          for (var i$7 = 1; i$7 < tmpKMeansBreaks.length; i$7 += 2) {
            var v = tmpKMeansBreaks[i$7];
            if (!isNaN(v) && limits2.indexOf(v) === -1) {
              limits2.push(v);
            }
          }
        }
        return limits2;
      };
      var analyze_1 = { analyze, limits };
      var Color$3 = Color_1;
      var contrast2 = function(a, b) {
        a = new Color$3(a);
        b = new Color$3(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
      };
      var Color$2 = Color_1;
      var sqrt = Math.sqrt;
      var pow = Math.pow;
      var min = Math.min;
      var max = Math.max;
      var atan2 = Math.atan2;
      var abs = Math.abs;
      var cos = Math.cos;
      var sin = Math.sin;
      var exp = Math.exp;
      var PI = Math.PI;
      var deltaE = function(a, b, Kl, Kc, Kh) {
        if (Kl === void 0)
          Kl = 1;
        if (Kc === void 0)
          Kc = 1;
        if (Kh === void 0)
          Kh = 1;
        var rad2deg = function(rad) {
          return 360 * rad / (2 * PI);
        };
        var deg2rad = function(deg) {
          return 2 * PI * deg / 360;
        };
        a = new Color$2(a);
        b = new Color$2(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var avgL = (L1 + L2) / 2;
        var C1 = sqrt(pow(a1, 2) + pow(b1, 2));
        var C2 = sqrt(pow(a2, 2) + pow(b2, 2));
        var avgC = (C1 + C2) / 2;
        var G = 0.5 * (1 - sqrt(pow(avgC, 7) / (pow(avgC, 7) + pow(25, 7))));
        var a1p = a1 * (1 + G);
        var a2p = a2 * (1 + G);
        var C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
        var C2p = sqrt(pow(a2p, 2) + pow(b2, 2));
        var avgCp = (C1p + C2p) / 2;
        var arctan1 = rad2deg(atan2(b1, a1p));
        var arctan2 = rad2deg(atan2(b2, a2p));
        var h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
        var h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
        var avgHp = abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
        var T = 1 - 0.17 * cos(deg2rad(avgHp - 30)) + 0.24 * cos(deg2rad(2 * avgHp)) + 0.32 * cos(deg2rad(3 * avgHp + 6)) - 0.2 * cos(deg2rad(4 * avgHp - 63));
        var deltaHp = h2p - h1p;
        deltaHp = abs(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
        deltaHp = 2 * sqrt(C1p * C2p) * sin(deg2rad(deltaHp) / 2);
        var deltaL = L2 - L1;
        var deltaCp = C2p - C1p;
        var sl = 1 + 0.015 * pow(avgL - 50, 2) / sqrt(20 + pow(avgL - 50, 2));
        var sc = 1 + 0.045 * avgCp;
        var sh = 1 + 0.015 * avgCp * T;
        var deltaTheta = 30 * exp(-pow((avgHp - 275) / 25, 2));
        var Rc = 2 * sqrt(pow(avgCp, 7) / (pow(avgCp, 7) + pow(25, 7)));
        var Rt = -Rc * sin(2 * deg2rad(deltaTheta));
        var result = sqrt(pow(deltaL / (Kl * sl), 2) + pow(deltaCp / (Kc * sc), 2) + pow(deltaHp / (Kh * sh), 2) + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh)));
        return max(0, min(100, result));
      };
      var Color$1 = Color_1;
      var distance = function(a, b, mode) {
        if (mode === void 0)
          mode = "lab";
        a = new Color$1(a);
        b = new Color$1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for (var i2 in l1) {
          var d = (l1[i2] || 0) - (l2[i2] || 0);
          sum_sq += d * d;
        }
        return Math.sqrt(sum_sq);
      };
      var Color3 = Color_1;
      var valid = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        try {
          new (Function.prototype.bind.apply(Color3, [null].concat(args)))();
          return true;
        } catch (e) {
          return false;
        }
      };
      var chroma$1 = chroma_1;
      var scale = scale$2;
      var scales = {
        cool: function cool() {
          return scale([chroma$1.hsl(180, 1, 0.9), chroma$1.hsl(250, 0.7, 0.4)]);
        },
        hot: function hot() {
          return scale(["#000", "#f00", "#ff0", "#fff"]).mode("rgb");
        }
      };
      var colorbrewer = {
        OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
        PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
        BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
        Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
        BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
        YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
        YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
        Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
        RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
        Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
        YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
        Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
        GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
        Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
        YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
        PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
        Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
        PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
        Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
        Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
        RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
        RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
        PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
        PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
        RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
        BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
        RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
        PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
        Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
        Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
        Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
        Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
        Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
        Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
        Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
        Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
      };
      for (var i = 0, list = Object.keys(colorbrewer); i < list.length; i += 1) {
        var key = list[i];
        colorbrewer[key.toLowerCase()] = colorbrewer[key];
      }
      var colorbrewer_1 = colorbrewer;
      var chroma = chroma_1;
      chroma.average = average;
      chroma.bezier = bezier_1;
      chroma.blend = blend_1;
      chroma.cubehelix = cubehelix;
      chroma.mix = chroma.interpolate = mix$1;
      chroma.random = random_1;
      chroma.scale = scale$2;
      chroma.analyze = analyze_1.analyze;
      chroma.contrast = contrast2;
      chroma.deltaE = deltaE;
      chroma.distance = distance;
      chroma.limits = analyze_1.limits;
      chroma.valid = valid;
      chroma.scales = scales;
      chroma.colors = w3cx11_1;
      chroma.brewer = colorbrewer_1;
      var chroma_js = chroma;
      return chroma_js;
    });
  }
});

// node_modules/hsluv/hsluv.js
var require_hsluv = __commonJS({
  "node_modules/hsluv/hsluv.js"(exports2, module2) {
    var hsluv = hsluv || {};
    hsluv.Geometry = function() {
    };
    hsluv.Geometry.intersectLineLine = function(a, b) {
      var x = (a.intercept - b.intercept) / (b.slope - a.slope);
      var y = a.slope * x + a.intercept;
      return { x, y };
    };
    hsluv.Geometry.distanceFromOrigin = function(point) {
      return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
    };
    hsluv.Geometry.distanceLineFromOrigin = function(line) {
      return Math.abs(line.intercept) / Math.sqrt(Math.pow(line.slope, 2) + 1);
    };
    hsluv.Geometry.perpendicularThroughPoint = function(line, point) {
      var slope = -1 / line.slope;
      var intercept = point.y - slope * point.x;
      return { slope, intercept };
    };
    hsluv.Geometry.angleFromOrigin = function(point) {
      return Math.atan2(point.y, point.x);
    };
    hsluv.Geometry.normalizeAngle = function(angle) {
      var m = 2 * Math.PI;
      return (angle % m + m) % m;
    };
    hsluv.Geometry.lengthOfRayUntilIntersect = function(theta, line) {
      return line.intercept / (Math.sin(theta) - line.slope * Math.cos(theta));
    };
    hsluv.Hsluv = function() {
    };
    hsluv.Hsluv.getBounds = function(L) {
      var result = [];
      var sub1 = Math.pow(L + 16, 3) / 1560896;
      var sub2 = sub1 > hsluv.Hsluv.epsilon ? sub1 : L / hsluv.Hsluv.kappa;
      var _g = 0;
      while (_g < 3) {
        var c = _g++;
        var m1 = hsluv.Hsluv.m[c][0];
        var m2 = hsluv.Hsluv.m[c][1];
        var m3 = hsluv.Hsluv.m[c][2];
        var _g1 = 0;
        while (_g1 < 2) {
          var t = _g1++;
          var top1 = (284517 * m1 - 94839 * m3) * sub2;
          var top2 = (838422 * m3 + 769860 * m2 + 731718 * m1) * L * sub2 - 769860 * t * L;
          var bottom = (632260 * m3 - 126452 * m2) * sub2 + 126452 * t;
          result.push({ slope: top1 / bottom, intercept: top2 / bottom });
        }
      }
      return result;
    };
    hsluv.Hsluv.maxSafeChromaForL = function(L) {
      var bounds = hsluv.Hsluv.getBounds(L);
      var min = Infinity;
      var _g = 0;
      while (_g < bounds.length) {
        var bound = bounds[_g];
        ++_g;
        var length = hsluv.Geometry.distanceLineFromOrigin(bound);
        min = Math.min(min, length);
      }
      return min;
    };
    hsluv.Hsluv.maxChromaForLH = function(L, H) {
      var hrad = H / 360 * Math.PI * 2;
      var bounds = hsluv.Hsluv.getBounds(L);
      var min = Infinity;
      var _g = 0;
      while (_g < bounds.length) {
        var bound = bounds[_g];
        ++_g;
        var length = hsluv.Geometry.lengthOfRayUntilIntersect(hrad, bound);
        if (length >= 0) {
          min = Math.min(min, length);
        }
      }
      return min;
    };
    hsluv.Hsluv.dotProduct = function(a, b) {
      var sum = 0;
      var _g1 = 0;
      var _g = a.length;
      while (_g1 < _g) {
        var i = _g1++;
        sum += a[i] * b[i];
      }
      return sum;
    };
    hsluv.Hsluv.fromLinear = function(c) {
      if (c <= 31308e-7) {
        return 12.92 * c;
      } else {
        return 1.055 * Math.pow(c, 0.4166666666666667) - 0.055;
      }
    };
    hsluv.Hsluv.toLinear = function(c) {
      if (c > 0.04045) {
        return Math.pow((c + 0.055) / 1.055, 2.4);
      } else {
        return c / 12.92;
      }
    };
    hsluv.Hsluv.xyzToRgb = function(tuple) {
      return [hsluv.Hsluv.fromLinear(hsluv.Hsluv.dotProduct(hsluv.Hsluv.m[0], tuple)), hsluv.Hsluv.fromLinear(hsluv.Hsluv.dotProduct(hsluv.Hsluv.m[1], tuple)), hsluv.Hsluv.fromLinear(hsluv.Hsluv.dotProduct(hsluv.Hsluv.m[2], tuple))];
    };
    hsluv.Hsluv.rgbToXyz = function(tuple) {
      var rgbl = [hsluv.Hsluv.toLinear(tuple[0]), hsluv.Hsluv.toLinear(tuple[1]), hsluv.Hsluv.toLinear(tuple[2])];
      return [hsluv.Hsluv.dotProduct(hsluv.Hsluv.minv[0], rgbl), hsluv.Hsluv.dotProduct(hsluv.Hsluv.minv[1], rgbl), hsluv.Hsluv.dotProduct(hsluv.Hsluv.minv[2], rgbl)];
    };
    hsluv.Hsluv.yToL = function(Y) {
      if (Y <= hsluv.Hsluv.epsilon) {
        return Y / hsluv.Hsluv.refY * hsluv.Hsluv.kappa;
      } else {
        return 116 * Math.pow(Y / hsluv.Hsluv.refY, 0.3333333333333333) - 16;
      }
    };
    hsluv.Hsluv.lToY = function(L) {
      if (L <= 8) {
        return hsluv.Hsluv.refY * L / hsluv.Hsluv.kappa;
      } else {
        return hsluv.Hsluv.refY * Math.pow((L + 16) / 116, 3);
      }
    };
    hsluv.Hsluv.xyzToLuv = function(tuple) {
      var X = tuple[0];
      var Y = tuple[1];
      var Z = tuple[2];
      var divider = X + 15 * Y + 3 * Z;
      var varU = 4 * X;
      var varV = 9 * Y;
      if (divider != 0) {
        varU /= divider;
        varV /= divider;
      } else {
        varU = NaN;
        varV = NaN;
      }
      var L = hsluv.Hsluv.yToL(Y);
      if (L == 0) {
        return [0, 0, 0];
      }
      var U = 13 * L * (varU - hsluv.Hsluv.refU);
      var V = 13 * L * (varV - hsluv.Hsluv.refV);
      return [L, U, V];
    };
    hsluv.Hsluv.luvToXyz = function(tuple) {
      var L = tuple[0];
      var U = tuple[1];
      var V = tuple[2];
      if (L == 0) {
        return [0, 0, 0];
      }
      var varU = U / (13 * L) + hsluv.Hsluv.refU;
      var varV = V / (13 * L) + hsluv.Hsluv.refV;
      var Y = hsluv.Hsluv.lToY(L);
      var X = 0 - 9 * Y * varU / ((varU - 4) * varV - varU * varV);
      var Z = (9 * Y - 15 * varV * Y - varV * X) / (3 * varV);
      return [X, Y, Z];
    };
    hsluv.Hsluv.luvToLch = function(tuple) {
      var L = tuple[0];
      var U = tuple[1];
      var V = tuple[2];
      var C = Math.sqrt(U * U + V * V);
      var H;
      if (C < 1e-8) {
        H = 0;
      } else {
        var Hrad = Math.atan2(V, U);
        H = Hrad * 180 / Math.PI;
        if (H < 0) {
          H = 360 + H;
        }
      }
      return [L, C, H];
    };
    hsluv.Hsluv.lchToLuv = function(tuple) {
      var L = tuple[0];
      var C = tuple[1];
      var H = tuple[2];
      var Hrad = H / 360 * 2 * Math.PI;
      var U = Math.cos(Hrad) * C;
      var V = Math.sin(Hrad) * C;
      return [L, U, V];
    };
    hsluv.Hsluv.hsluvToLch = function(tuple) {
      var H = tuple[0];
      var S = tuple[1];
      var L = tuple[2];
      if (L > 99.9999999) {
        return [100, 0, H];
      }
      if (L < 1e-8) {
        return [0, 0, H];
      }
      var max = hsluv.Hsluv.maxChromaForLH(L, H);
      var C = max / 100 * S;
      return [L, C, H];
    };
    hsluv.Hsluv.lchToHsluv = function(tuple) {
      var L = tuple[0];
      var C = tuple[1];
      var H = tuple[2];
      if (L > 99.9999999) {
        return [H, 0, 100];
      }
      if (L < 1e-8) {
        return [H, 0, 0];
      }
      var max = hsluv.Hsluv.maxChromaForLH(L, H);
      var S = C / max * 100;
      return [H, S, L];
    };
    hsluv.Hsluv.hpluvToLch = function(tuple) {
      var H = tuple[0];
      var S = tuple[1];
      var L = tuple[2];
      if (L > 99.9999999) {
        return [100, 0, H];
      }
      if (L < 1e-8) {
        return [0, 0, H];
      }
      var max = hsluv.Hsluv.maxSafeChromaForL(L);
      var C = max / 100 * S;
      return [L, C, H];
    };
    hsluv.Hsluv.lchToHpluv = function(tuple) {
      var L = tuple[0];
      var C = tuple[1];
      var H = tuple[2];
      if (L > 99.9999999) {
        return [H, 0, 100];
      }
      if (L < 1e-8) {
        return [H, 0, 0];
      }
      var max = hsluv.Hsluv.maxSafeChromaForL(L);
      var S = C / max * 100;
      return [H, S, L];
    };
    hsluv.Hsluv.rgbToHex = function(tuple) {
      var h = "#";
      var _g = 0;
      while (_g < 3) {
        var i = _g++;
        var chan = tuple[i];
        var c = Math.round(chan * 255);
        var digit2 = c % 16;
        var digit1 = (c - digit2) / 16 | 0;
        h += hsluv.Hsluv.hexChars.charAt(digit1) + hsluv.Hsluv.hexChars.charAt(digit2);
      }
      return h;
    };
    hsluv.Hsluv.hexToRgb = function(hex2) {
      hex2 = hex2.toLowerCase();
      var ret = [];
      var _g = 0;
      while (_g < 3) {
        var i = _g++;
        var digit1 = hsluv.Hsluv.hexChars.indexOf(hex2.charAt(i * 2 + 1));
        var digit2 = hsluv.Hsluv.hexChars.indexOf(hex2.charAt(i * 2 + 2));
        var n = digit1 * 16 + digit2;
        ret.push(n / 255);
      }
      return ret;
    };
    hsluv.Hsluv.lchToRgb = function(tuple) {
      return hsluv.Hsluv.xyzToRgb(hsluv.Hsluv.luvToXyz(hsluv.Hsluv.lchToLuv(tuple)));
    };
    hsluv.Hsluv.rgbToLch = function(tuple) {
      return hsluv.Hsluv.luvToLch(hsluv.Hsluv.xyzToLuv(hsluv.Hsluv.rgbToXyz(tuple)));
    };
    hsluv.Hsluv.hsluvToRgb = function(tuple) {
      return hsluv.Hsluv.lchToRgb(hsluv.Hsluv.hsluvToLch(tuple));
    };
    hsluv.Hsluv.rgbToHsluv = function(tuple) {
      return hsluv.Hsluv.lchToHsluv(hsluv.Hsluv.rgbToLch(tuple));
    };
    hsluv.Hsluv.hpluvToRgb = function(tuple) {
      return hsluv.Hsluv.lchToRgb(hsluv.Hsluv.hpluvToLch(tuple));
    };
    hsluv.Hsluv.rgbToHpluv = function(tuple) {
      return hsluv.Hsluv.lchToHpluv(hsluv.Hsluv.rgbToLch(tuple));
    };
    hsluv.Hsluv.hsluvToHex = function(tuple) {
      return hsluv.Hsluv.rgbToHex(hsluv.Hsluv.hsluvToRgb(tuple));
    };
    hsluv.Hsluv.hpluvToHex = function(tuple) {
      return hsluv.Hsluv.rgbToHex(hsluv.Hsluv.hpluvToRgb(tuple));
    };
    hsluv.Hsluv.hexToHsluv = function(s) {
      return hsluv.Hsluv.rgbToHsluv(hsluv.Hsluv.hexToRgb(s));
    };
    hsluv.Hsluv.hexToHpluv = function(s) {
      return hsluv.Hsluv.rgbToHpluv(hsluv.Hsluv.hexToRgb(s));
    };
    hsluv.Hsluv.m = [[3.240969941904521, -1.537383177570093, -0.498610760293], [-0.96924363628087, 1.87596750150772, 0.041555057407175], [0.055630079696993, -0.20397695888897, 1.056971514242878]];
    hsluv.Hsluv.minv = [[0.41239079926595, 0.35758433938387, 0.18048078840183], [0.21263900587151, 0.71516867876775, 0.072192315360733], [0.019330818715591, 0.11919477979462, 0.95053215224966]];
    hsluv.Hsluv.refY = 1;
    hsluv.Hsluv.refU = 0.19783000664283;
    hsluv.Hsluv.refV = 0.46831999493879;
    hsluv.Hsluv.kappa = 903.2962962;
    hsluv.Hsluv.epsilon = 0.0088564516;
    hsluv.Hsluv.hexChars = "0123456789abcdef";
    var root = {
      "hsluvToRgb": hsluv.Hsluv.hsluvToRgb,
      "rgbToHsluv": hsluv.Hsluv.rgbToHsluv,
      "hpluvToRgb": hsluv.Hsluv.hpluvToRgb,
      "rgbToHpluv": hsluv.Hsluv.rgbToHpluv,
      "hsluvToHex": hsluv.Hsluv.hsluvToHex,
      "hexToHsluv": hsluv.Hsluv.hexToHsluv,
      "hpluvToHex": hsluv.Hsluv.hpluvToHex,
      "hexToHpluv": hsluv.Hsluv.hexToHpluv,
      "lchToHpluv": hsluv.Hsluv.lchToHpluv,
      "hpluvToLch": hsluv.Hsluv.hpluvToLch,
      "lchToHsluv": hsluv.Hsluv.lchToHsluv,
      "hsluvToLch": hsluv.Hsluv.hsluvToLch,
      "lchToLuv": hsluv.Hsluv.lchToLuv,
      "luvToLch": hsluv.Hsluv.luvToLch,
      "xyzToLuv": hsluv.Hsluv.xyzToLuv,
      "luvToXyz": hsluv.Hsluv.luvToXyz,
      "xyzToRgb": hsluv.Hsluv.xyzToRgb,
      "rgbToXyz": hsluv.Hsluv.rgbToXyz,
      "lchToRgb": hsluv.Hsluv.lchToRgb,
      "rgbToLch": hsluv.Hsluv.rgbToLch
    };
    module2.exports = root;
  }
});

// node_modules/mout/object/hasOwn.js
var require_hasOwn = __commonJS({
  "node_modules/mout/object/hasOwn.js"(exports2, module2) {
    function hasOwn(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    module2.exports = hasOwn;
  }
});

// node_modules/mout/object/forIn.js
var require_forIn = __commonJS({
  "node_modules/mout/object/forIn.js"(exports2, module2) {
    var hasOwn = require_hasOwn();
    var _hasDontEnumBug;
    var _dontEnums;
    function checkDontEnum() {
      _dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      _hasDontEnumBug = true;
      for (var key in { "toString": null }) {
        _hasDontEnumBug = false;
      }
    }
    function forIn(obj, fn, thisObj) {
      var key, i = 0;
      if (_hasDontEnumBug == null)
        checkDontEnum();
      for (key in obj) {
        if (exec(fn, obj, key, thisObj) === false) {
          break;
        }
      }
      if (_hasDontEnumBug) {
        var ctor = obj.constructor, isProto = !!ctor && obj === ctor.prototype;
        while (key = _dontEnums[i++]) {
          if ((key !== "constructor" || !isProto && hasOwn(obj, key)) && obj[key] !== Object.prototype[key]) {
            if (exec(fn, obj, key, thisObj) === false) {
              break;
            }
          }
        }
      }
    }
    function exec(fn, obj, key, thisObj) {
      return fn.call(thisObj, obj[key], key, obj);
    }
    module2.exports = forIn;
  }
});

// node_modules/mout/object/functions.js
var require_functions = __commonJS({
  "node_modules/mout/object/functions.js"(exports2, module2) {
    var forIn = require_forIn();
    function functions(obj) {
      var keys = [];
      forIn(obj, function(val, key) {
        if (typeof val === "function") {
          keys.push(key);
        }
      });
      return keys.sort();
    }
    module2.exports = functions;
  }
});

// node_modules/mout/array/slice.js
var require_slice = __commonJS({
  "node_modules/mout/array/slice.js"(exports2, module2) {
    function slice(arr, start, end) {
      var len = arr.length;
      if (start == null) {
        start = 0;
      } else if (start < 0) {
        start = Math.max(len + start, 0);
      } else {
        start = Math.min(start, len);
      }
      if (end == null) {
        end = len;
      } else if (end < 0) {
        end = Math.max(len + end, 0);
      } else {
        end = Math.min(end, len);
      }
      var result = [];
      while (start < end) {
        result.push(arr[start++]);
      }
      return result;
    }
    module2.exports = slice;
  }
});

// node_modules/mout/function/bind.js
var require_bind = __commonJS({
  "node_modules/mout/function/bind.js"(exports2, module2) {
    var slice = require_slice();
    function bind(fn, context, args) {
      var argsArr = slice(arguments, 2);
      return function() {
        return fn.apply(context, argsArr.concat(slice(arguments)));
      };
    }
    module2.exports = bind;
  }
});

// node_modules/mout/array/forEach.js
var require_forEach = __commonJS({
  "node_modules/mout/array/forEach.js"(exports2, module2) {
    function forEach(arr, callback, thisObj) {
      if (arr == null) {
        return;
      }
      var i = -1, len = arr.length;
      while (++i < len) {
        if (callback.call(thisObj, arr[i], i, arr) === false) {
          break;
        }
      }
    }
    module2.exports = forEach;
  }
});

// node_modules/mout/object/bindAll.js
var require_bindAll = __commonJS({
  "node_modules/mout/object/bindAll.js"(exports2, module2) {
    var functions = require_functions();
    var bind = require_bind();
    var forEach = require_forEach();
    var slice = require_slice();
    function bindAll(obj, rest_methodNames) {
      var keys = arguments.length > 1 ? slice(arguments, 1) : functions(obj);
      forEach(keys, function(key) {
        obj[key] = bind(obj[key], obj);
      });
    }
    module2.exports = bindAll;
  }
});

// node_modules/mout/object/forOwn.js
var require_forOwn = __commonJS({
  "node_modules/mout/object/forOwn.js"(exports2, module2) {
    var hasOwn = require_hasOwn();
    var forIn = require_forIn();
    function forOwn(obj, fn, thisObj) {
      forIn(obj, function(val, key) {
        if (hasOwn(obj, key)) {
          return fn.call(thisObj, obj[key], key, obj);
        }
      });
    }
    module2.exports = forOwn;
  }
});

// node_modules/mout/function/identity.js
var require_identity = __commonJS({
  "node_modules/mout/function/identity.js"(exports2, module2) {
    function identity(val) {
      return val;
    }
    module2.exports = identity;
  }
});

// node_modules/mout/function/prop.js
var require_prop = __commonJS({
  "node_modules/mout/function/prop.js"(exports2, module2) {
    function prop(name) {
      return function(obj) {
        return obj[name];
      };
    }
    module2.exports = prop;
  }
});

// node_modules/mout/lang/kindOf.js
var require_kindOf = __commonJS({
  "node_modules/mout/lang/kindOf.js"(exports2, module2) {
    var _rKind = /^\[object (.*)\]$/;
    var _toString = Object.prototype.toString;
    var UNDEF;
    function kindOf(val) {
      if (val === null) {
        return "Null";
      } else if (val === UNDEF) {
        return "Undefined";
      } else {
        return _rKind.exec(_toString.call(val))[1];
      }
    }
    module2.exports = kindOf;
  }
});

// node_modules/mout/lang/isKind.js
var require_isKind = __commonJS({
  "node_modules/mout/lang/isKind.js"(exports2, module2) {
    var kindOf = require_kindOf();
    function isKind(val, kind) {
      return kindOf(val) === kind;
    }
    module2.exports = isKind;
  }
});

// node_modules/mout/lang/isArray.js
var require_isArray = __commonJS({
  "node_modules/mout/lang/isArray.js"(exports2, module2) {
    var isKind = require_isKind();
    var isArray = Array.isArray || function(val) {
      return isKind(val, "Array");
    };
    module2.exports = isArray;
  }
});

// node_modules/mout/object/deepMatches.js
var require_deepMatches = __commonJS({
  "node_modules/mout/object/deepMatches.js"(exports2, module2) {
    var forOwn = require_forOwn();
    var isArray = require_isArray();
    function containsMatch(array, pattern) {
      var i = -1, length = array.length;
      while (++i < length) {
        if (deepMatches(array[i], pattern)) {
          return true;
        }
      }
      return false;
    }
    function matchArray(target, pattern) {
      var i = -1, patternLength = pattern.length;
      while (++i < patternLength) {
        if (!containsMatch(target, pattern[i])) {
          return false;
        }
      }
      return true;
    }
    function matchObject(target, pattern) {
      var result = true;
      forOwn(pattern, function(val, key) {
        if (!deepMatches(target[key], val)) {
          return result = false;
        }
      });
      return result;
    }
    function deepMatches(target, pattern) {
      if (target && typeof target === "object") {
        if (isArray(target) && isArray(pattern)) {
          return matchArray(target, pattern);
        } else {
          return matchObject(target, pattern);
        }
      } else {
        return target === pattern;
      }
    }
    module2.exports = deepMatches;
  }
});

// node_modules/mout/function/makeIterator_.js
var require_makeIterator = __commonJS({
  "node_modules/mout/function/makeIterator_.js"(exports2, module2) {
    var identity = require_identity();
    var prop = require_prop();
    var deepMatches = require_deepMatches();
    function makeIterator(src, thisObj) {
      if (src == null) {
        return identity;
      }
      switch (typeof src) {
        case "function":
          return typeof thisObj !== "undefined" ? function(val, i, arr) {
            return src.call(thisObj, val, i, arr);
          } : src;
        case "object":
          return function(val) {
            return deepMatches(val, src);
          };
        case "string":
        case "number":
          return prop(src);
      }
    }
    module2.exports = makeIterator;
  }
});

// node_modules/mout/object/some.js
var require_some = __commonJS({
  "node_modules/mout/object/some.js"(exports2, module2) {
    var forOwn = require_forOwn();
    var makeIterator = require_makeIterator();
    function some(obj, callback, thisObj) {
      callback = makeIterator(callback, thisObj);
      var result = false;
      forOwn(obj, function(val, key) {
        if (callback(val, key, obj)) {
          result = true;
          return false;
        }
      });
      return result;
    }
    module2.exports = some;
  }
});

// node_modules/mout/object/contains.js
var require_contains = __commonJS({
  "node_modules/mout/object/contains.js"(exports2, module2) {
    var some = require_some();
    function contains(obj, needle) {
      return some(obj, function(val) {
        return val === needle;
      });
    }
    module2.exports = contains;
  }
});

// node_modules/mout/lang/isPlainObject.js
var require_isPlainObject = __commonJS({
  "node_modules/mout/lang/isPlainObject.js"(exports2, module2) {
    function isPlainObject(value) {
      return !!value && typeof value === "object" && value.constructor === Object;
    }
    module2.exports = isPlainObject;
  }
});

// node_modules/mout/object/deepFillIn.js
var require_deepFillIn = __commonJS({
  "node_modules/mout/object/deepFillIn.js"(exports2, module2) {
    var forOwn = require_forOwn();
    var isPlainObject = require_isPlainObject();
    function deepFillIn(target, defaults) {
      var i = 0, n = arguments.length, obj;
      while (++i < n) {
        obj = arguments[i];
        if (obj) {
          forOwn(obj, function(newValue, key) {
            var curValue = target[key];
            if (curValue == null) {
              target[key] = newValue;
            } else if (isPlainObject(curValue) && isPlainObject(newValue)) {
              deepFillIn(curValue, newValue);
            }
          });
        }
      }
      return target;
    }
    module2.exports = deepFillIn;
  }
});

// node_modules/mout/object/deepMixIn.js
var require_deepMixIn = __commonJS({
  "node_modules/mout/object/deepMixIn.js"(exports2, module2) {
    var forOwn = require_forOwn();
    var isPlainObject = require_isPlainObject();
    function deepMixIn(target, objects) {
      var i = 0, n = arguments.length, obj;
      while (++i < n) {
        obj = arguments[i];
        if (obj) {
          forOwn(obj, copyProp, target);
        }
      }
      return target;
    }
    function copyProp(val, key) {
      var existing = this[key];
      if (isPlainObject(val) && isPlainObject(existing)) {
        deepMixIn(existing, val);
      } else {
        this[key] = val;
      }
    }
    module2.exports = deepMixIn;
  }
});

// node_modules/mout/object/every.js
var require_every = __commonJS({
  "node_modules/mout/object/every.js"(exports2, module2) {
    var forOwn = require_forOwn();
    var makeIterator = require_makeIterator();
    function every(obj, callback, thisObj) {
      callback = makeIterator(callback, thisObj);
      var result = true;
      forOwn(obj, function(val, key) {
        if (!callback(val, key, obj)) {
          result = false;
          return false;
        }
      });
      return result;
    }
    module2.exports = every;
  }
});

// node_modules/mout/lang/isObject.js
var require_isObject = __commonJS({
  "node_modules/mout/lang/isObject.js"(exports2, module2) {
    var isKind = require_isKind();
    function isObject(val) {
      return isKind(val, "Object");
    }
    module2.exports = isObject;
  }
});

// node_modules/mout/lang/is.js
var require_is = __commonJS({
  "node_modules/mout/lang/is.js"(exports2, module2) {
    function is(x, y) {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      }
      return x !== x && y !== y;
    }
    module2.exports = is;
  }
});

// node_modules/mout/object/equals.js
var require_equals = __commonJS({
  "node_modules/mout/object/equals.js"(exports2, module2) {
    var hasOwn = require_hasOwn();
    var every = require_every();
    var isObject = require_isObject();
    var is = require_is();
    function makeCompare(callback) {
      return function(value, key) {
        return hasOwn(this, key) && callback(value, this[key]);
      };
    }
    function checkProperties(value, key) {
      return hasOwn(this, key);
    }
    function equals(a, b, callback) {
      callback = callback || is;
      if (!isObject(a) || !isObject(b)) {
        return callback(a, b);
      }
      return every(a, makeCompare(callback), b) && every(b, checkProperties, a);
    }
    module2.exports = equals;
  }
});

// node_modules/mout/object/fillIn.js
var require_fillIn = __commonJS({
  "node_modules/mout/object/fillIn.js"(exports2, module2) {
    var forEach = require_forEach();
    var slice = require_slice();
    var forOwn = require_forOwn();
    function fillIn(obj, var_defaults) {
      forEach(slice(arguments, 1), function(base) {
        forOwn(base, function(val, key) {
          if (obj[key] == null) {
            obj[key] = val;
          }
        });
      });
      return obj;
    }
    module2.exports = fillIn;
  }
});

// node_modules/mout/object/filter.js
var require_filter = __commonJS({
  "node_modules/mout/object/filter.js"(exports2, module2) {
    var forOwn = require_forOwn();
    var makeIterator = require_makeIterator();
    function filterValues(obj, callback, thisObj) {
      callback = makeIterator(callback, thisObj);
      var output = {};
      forOwn(obj, function(value, key, obj2) {
        if (callback(value, key, obj2)) {
          output[key] = value;
        }
      });
      return output;
    }
    module2.exports = filterValues;
  }
});

// node_modules/mout/object/find.js
var require_find = __commonJS({
  "node_modules/mout/object/find.js"(exports2, module2) {
    var some = require_some();
    var makeIterator = require_makeIterator();
    function find(obj, callback, thisObj) {
      callback = makeIterator(callback, thisObj);
      var result;
      some(obj, function(value, key, obj2) {
        if (callback(value, key, obj2)) {
          result = value;
          return true;
        }
      });
      return result;
    }
    module2.exports = find;
  }
});

// node_modules/mout/object/flatten.js
var require_flatten = __commonJS({
  "node_modules/mout/object/flatten.js"(exports2, module2) {
    var forOwn = require_forOwn();
    var isPlainObject = require_isPlainObject();
    function flattenTo(obj, result, prefix, level) {
      forOwn(obj, function(value, key) {
        var nestedPrefix = prefix ? prefix + "." + key : key;
        if (level !== 0 && isPlainObject(value)) {
          flattenTo(value, result, nestedPrefix, level - 1);
        } else {
          result[nestedPrefix] = value;
        }
      });
      return result;
    }
    function flatten(obj, level) {
      if (obj == null) {
        return {};
      }
      level = level == null ? -1 : level;
      return flattenTo(obj, {}, "", level);
    }
    module2.exports = flatten;
  }
});

// node_modules/mout/lang/isPrimitive.js
var require_isPrimitive = __commonJS({
  "node_modules/mout/lang/isPrimitive.js"(exports2, module2) {
    function isPrimitive(value) {
      switch (typeof value) {
        case "string":
        case "number":
        case "boolean":
          return true;
      }
      return value == null;
    }
    module2.exports = isPrimitive;
  }
});

// node_modules/mout/object/get.js
var require_get = __commonJS({
  "node_modules/mout/object/get.js"(exports2, module2) {
    var isPrimitive = require_isPrimitive();
    function get(obj, prop) {
      var parts = prop.split("."), last = parts.pop();
      while (prop = parts.shift()) {
        obj = obj[prop];
        if (obj == null)
          return;
      }
      return obj[last];
    }
    module2.exports = get;
  }
});

// node_modules/mout/object/has.js
var require_has = __commonJS({
  "node_modules/mout/object/has.js"(exports2, module2) {
    var get = require_get();
    var UNDEF;
    function has(obj, prop) {
      return get(obj, prop) !== UNDEF;
    }
    module2.exports = has;
  }
});

// node_modules/mout/object/keys.js
var require_keys = __commonJS({
  "node_modules/mout/object/keys.js"(exports2, module2) {
    var forOwn = require_forOwn();
    var keys = Object.keys || function(obj) {
      var keys2 = [];
      forOwn(obj, function(val, key) {
        keys2.push(key);
      });
      return keys2;
    };
    module2.exports = keys;
  }
});

// node_modules/mout/object/map.js
var require_map = __commonJS({
  "node_modules/mout/object/map.js"(exports2, module2) {
    var forOwn = require_forOwn();
    var makeIterator = require_makeIterator();
    function mapValues(obj, callback, thisObj) {
      callback = makeIterator(callback, thisObj);
      var output = {};
      forOwn(obj, function(val, key, obj2) {
        output[key] = callback(val, key, obj2);
      });
      return output;
    }
    module2.exports = mapValues;
  }
});

// node_modules/mout/object/matches.js
var require_matches = __commonJS({
  "node_modules/mout/object/matches.js"(exports2, module2) {
    var forOwn = require_forOwn();
    function matches(target, props) {
      var result = true;
      forOwn(props, function(val, key) {
        if (target[key] !== val) {
          return result = false;
        }
      });
      return result;
    }
    module2.exports = matches;
  }
});

// node_modules/mout/array/max.js
var require_max = __commonJS({
  "node_modules/mout/array/max.js"(exports2, module2) {
    var makeIterator = require_makeIterator();
    function max(arr, iterator, thisObj) {
      if (arr == null || !arr.length) {
        return Infinity;
      } else if (arr.length && !iterator) {
        return Math.max.apply(Math, arr);
      } else {
        iterator = makeIterator(iterator, thisObj);
        var result, compare = -Infinity, value, temp;
        var i = -1, len = arr.length;
        while (++i < len) {
          value = arr[i];
          temp = iterator(value, i, arr);
          if (temp > compare) {
            compare = temp;
            result = value;
          }
        }
        return result;
      }
    }
    module2.exports = max;
  }
});

// node_modules/mout/object/values.js
var require_values = __commonJS({
  "node_modules/mout/object/values.js"(exports2, module2) {
    var forOwn = require_forOwn();
    function values(obj) {
      var vals = [];
      forOwn(obj, function(val, key) {
        vals.push(val);
      });
      return vals;
    }
    module2.exports = values;
  }
});

// node_modules/mout/object/max.js
var require_max2 = __commonJS({
  "node_modules/mout/object/max.js"(exports2, module2) {
    var arrMax = require_max();
    var values = require_values();
    function max(obj, compareFn) {
      return arrMax(values(obj), compareFn);
    }
    module2.exports = max;
  }
});

// node_modules/mout/object/mixIn.js
var require_mixIn = __commonJS({
  "node_modules/mout/object/mixIn.js"(exports2, module2) {
    var forOwn = require_forOwn();
    function mixIn(target, objects) {
      var i = 0, n = arguments.length, obj;
      while (++i < n) {
        obj = arguments[i];
        if (obj != null) {
          forOwn(obj, copyProp, target);
        }
      }
      return target;
    }
    function copyProp(val, key) {
      this[key] = val;
    }
    module2.exports = mixIn;
  }
});

// node_modules/mout/lang/clone.js
var require_clone = __commonJS({
  "node_modules/mout/lang/clone.js"(exports2, module2) {
    var kindOf = require_kindOf();
    var isPlainObject = require_isPlainObject();
    var mixIn = require_mixIn();
    function clone(val) {
      switch (kindOf(val)) {
        case "Object":
          return cloneObject(val);
        case "Array":
          return cloneArray(val);
        case "RegExp":
          return cloneRegExp(val);
        case "Date":
          return cloneDate(val);
        default:
          return val;
      }
    }
    function cloneObject(source) {
      if (isPlainObject(source)) {
        return mixIn({}, source);
      } else {
        return source;
      }
    }
    function cloneRegExp(r) {
      var flags = "";
      flags += r.multiline ? "m" : "";
      flags += r.global ? "g" : "";
      flags += r.ignoreCase ? "i" : "";
      return new RegExp(r.source, flags);
    }
    function cloneDate(date) {
      return new Date(+date);
    }
    function cloneArray(arr) {
      return arr.slice();
    }
    module2.exports = clone;
  }
});

// node_modules/mout/lang/deepClone.js
var require_deepClone = __commonJS({
  "node_modules/mout/lang/deepClone.js"(exports2, module2) {
    var clone = require_clone();
    var forOwn = require_forOwn();
    var kindOf = require_kindOf();
    var isPlainObject = require_isPlainObject();
    function deepClone(val, instanceClone) {
      switch (kindOf(val)) {
        case "Object":
          return cloneObject(val, instanceClone);
        case "Array":
          return cloneArray(val, instanceClone);
        default:
          return clone(val);
      }
    }
    function cloneObject(source, instanceClone) {
      if (isPlainObject(source)) {
        var out = {};
        forOwn(source, function(val, key) {
          this[key] = deepClone(val, instanceClone);
        }, out);
        return out;
      } else if (instanceClone) {
        return instanceClone(source);
      } else {
        return source;
      }
    }
    function cloneArray(arr, instanceClone) {
      var out = [], i = -1, n = arr.length, val;
      while (++i < n) {
        out[i] = deepClone(arr[i], instanceClone);
      }
      return out;
    }
    module2.exports = deepClone;
  }
});

// node_modules/mout/object/merge.js
var require_merge = __commonJS({
  "node_modules/mout/object/merge.js"(exports2, module2) {
    var hasOwn = require_hasOwn();
    var deepClone = require_deepClone();
    var isObject = require_isObject();
    function merge() {
      var i = 1, key, val, obj, target;
      target = deepClone(arguments[0]);
      while (obj = arguments[i++]) {
        for (key in obj) {
          if (!hasOwn(obj, key)) {
            continue;
          }
          val = obj[key];
          if (isObject(val) && isObject(target[key])) {
            target[key] = merge(target[key], val);
          } else {
            target[key] = deepClone(val);
          }
        }
      }
      return target;
    }
    module2.exports = merge;
  }
});

// node_modules/mout/array/min.js
var require_min = __commonJS({
  "node_modules/mout/array/min.js"(exports2, module2) {
    var makeIterator = require_makeIterator();
    function min(arr, iterator, thisObj) {
      if (arr == null || !arr.length) {
        return -Infinity;
      } else if (arr.length && !iterator) {
        return Math.min.apply(Math, arr);
      } else {
        iterator = makeIterator(iterator, thisObj);
        var result, compare = Infinity, value, temp;
        var i = -1, len = arr.length;
        while (++i < len) {
          value = arr[i];
          temp = iterator(value, i, arr);
          if (temp < compare) {
            compare = temp;
            result = value;
          }
        }
        return result;
      }
    }
    module2.exports = min;
  }
});

// node_modules/mout/object/min.js
var require_min2 = __commonJS({
  "node_modules/mout/object/min.js"(exports2, module2) {
    var arrMin = require_min();
    var values = require_values();
    function min(obj, iterator) {
      return arrMin(values(obj), iterator);
    }
    module2.exports = min;
  }
});

// node_modules/mout/object/namespace.js
var require_namespace = __commonJS({
  "node_modules/mout/object/namespace.js"(exports2, module2) {
    var forEach = require_forEach();
    function namespace(obj, path) {
      if (!path)
        return obj;
      forEach(path.split("."), function(key) {
        if (!obj[key]) {
          obj[key] = {};
        }
        obj = obj[key];
      });
      return obj;
    }
    module2.exports = namespace;
  }
});

// node_modules/mout/array/indexOf.js
var require_indexOf = __commonJS({
  "node_modules/mout/array/indexOf.js"(exports2, module2) {
    function indexOf(arr, item, fromIndex) {
      fromIndex = fromIndex || 0;
      if (arr == null) {
        return -1;
      }
      var len = arr.length, i = fromIndex < 0 ? len + fromIndex : fromIndex;
      while (i < len) {
        if (arr[i] === item) {
          return i;
        }
        i++;
      }
      return -1;
    }
    module2.exports = indexOf;
  }
});

// node_modules/mout/array/contains.js
var require_contains2 = __commonJS({
  "node_modules/mout/array/contains.js"(exports2, module2) {
    var indexOf = require_indexOf();
    function contains(arr, val) {
      return indexOf(arr, val) !== -1;
    }
    module2.exports = contains;
  }
});

// node_modules/mout/object/omit.js
var require_omit = __commonJS({
  "node_modules/mout/object/omit.js"(exports2, module2) {
    var slice = require_slice();
    var contains = require_contains2();
    function omit(obj, var_keys) {
      var keys = typeof arguments[1] !== "string" ? arguments[1] : slice(arguments, 1), out = {};
      for (var property in obj) {
        if (obj.hasOwnProperty(property) && !contains(keys, property)) {
          out[property] = obj[property];
        }
      }
      return out;
    }
    module2.exports = omit;
  }
});

// node_modules/mout/object/pick.js
var require_pick = __commonJS({
  "node_modules/mout/object/pick.js"(exports2, module2) {
    var slice = require_slice();
    function pick(obj, var_keys) {
      var keys = typeof arguments[1] !== "string" ? arguments[1] : slice(arguments, 1), out = {}, i = 0, key;
      while (key = keys[i++]) {
        out[key] = obj[key];
      }
      return out;
    }
    module2.exports = pick;
  }
});

// node_modules/mout/object/pluck.js
var require_pluck = __commonJS({
  "node_modules/mout/object/pluck.js"(exports2, module2) {
    var map = require_map();
    var prop = require_prop();
    function pluck(obj, propName) {
      return map(obj, prop(propName));
    }
    module2.exports = pluck;
  }
});

// node_modules/mout/object/size.js
var require_size = __commonJS({
  "node_modules/mout/object/size.js"(exports2, module2) {
    var forOwn = require_forOwn();
    function size(obj) {
      var count = 0;
      forOwn(obj, function() {
        count++;
      });
      return count;
    }
    module2.exports = size;
  }
});

// node_modules/mout/object/reduce.js
var require_reduce = __commonJS({
  "node_modules/mout/object/reduce.js"(exports2, module2) {
    var forOwn = require_forOwn();
    var size = require_size();
    function reduce(obj, callback, memo, thisObj) {
      var initial = arguments.length > 2;
      if (!size(obj) && !initial) {
        throw new Error("reduce of empty object with no initial value");
      }
      forOwn(obj, function(value, key, list) {
        if (!initial) {
          memo = value;
          initial = true;
        } else {
          memo = callback.call(thisObj, memo, value, key, list);
        }
      });
      return memo;
    }
    module2.exports = reduce;
  }
});

// node_modules/mout/object/reject.js
var require_reject = __commonJS({
  "node_modules/mout/object/reject.js"(exports2, module2) {
    var filter = require_filter();
    var makeIterator = require_makeIterator();
    function reject(obj, callback, thisObj) {
      callback = makeIterator(callback, thisObj);
      return filter(obj, function(value, index, obj2) {
        return !callback(value, index, obj2);
      }, thisObj);
    }
    module2.exports = reject;
  }
});

// node_modules/mout/lang/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/mout/lang/isFunction.js"(exports2, module2) {
    var isKind = require_isKind();
    function isFunction(val) {
      return isKind(val, "Function");
    }
    module2.exports = isFunction;
  }
});

// node_modules/mout/object/result.js
var require_result = __commonJS({
  "node_modules/mout/object/result.js"(exports2, module2) {
    var isFunction = require_isFunction();
    function result(obj, prop) {
      var property = obj[prop];
      if (property === void 0) {
        return;
      }
      return isFunction(property) ? property.call(obj) : property;
    }
    module2.exports = result;
  }
});

// node_modules/mout/object/set.js
var require_set = __commonJS({
  "node_modules/mout/object/set.js"(exports2, module2) {
    var namespace = require_namespace();
    function set(obj, prop, val) {
      var parts = /^(.+)\.(.+)$/.exec(prop);
      if (parts) {
        namespace(obj, parts[1])[parts[2]] = val;
      } else {
        obj[prop] = val;
      }
    }
    module2.exports = set;
  }
});

// node_modules/mout/object/unset.js
var require_unset = __commonJS({
  "node_modules/mout/object/unset.js"(exports2, module2) {
    var has = require_has();
    function unset(obj, prop) {
      if (has(obj, prop)) {
        var parts = prop.split("."), last = parts.pop();
        while (prop = parts.shift()) {
          obj = obj[prop];
        }
        return delete obj[last];
      } else {
        return true;
      }
    }
    module2.exports = unset;
  }
});

// node_modules/mout/object.js
var require_object = __commonJS({
  "node_modules/mout/object.js"(exports2, module2) {
    module2.exports = {
      "bindAll": require_bindAll(),
      "contains": require_contains(),
      "deepFillIn": require_deepFillIn(),
      "deepMatches": require_deepMatches(),
      "deepMixIn": require_deepMixIn(),
      "equals": require_equals(),
      "every": require_every(),
      "fillIn": require_fillIn(),
      "filter": require_filter(),
      "find": require_find(),
      "flatten": require_flatten(),
      "forIn": require_forIn(),
      "forOwn": require_forOwn(),
      "functions": require_functions(),
      "get": require_get(),
      "has": require_has(),
      "hasOwn": require_hasOwn(),
      "keys": require_keys(),
      "map": require_map(),
      "matches": require_matches(),
      "max": require_max2(),
      "merge": require_merge(),
      "min": require_min2(),
      "mixIn": require_mixIn(),
      "namespace": require_namespace(),
      "omit": require_omit(),
      "pick": require_pick(),
      "pluck": require_pluck(),
      "reduce": require_reduce(),
      "reject": require_reject(),
      "result": require_result(),
      "set": require_set(),
      "size": require_size(),
      "some": require_some(),
      "unset": require_unset(),
      "values": require_values()
    };
  }
});

// node_modules/ciebase/dist/illuminant.js
var require_illuminant = __commonJS({
  "node_modules/ciebase/dist/illuminant.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _object = require_object();
    var coordinates = {
      A: { x: 0.44758, y: 0.40745 },
      C: { x: 0.31006, y: 0.31616 },
      D50: { x: 0.34567, y: 0.35851 },
      D65: { x: 0.31272, y: 0.32903 },
      D55: { x: 0.33243, y: 0.34744 },
      D75: { x: 0.29903, y: 0.31488 }
    };
    var illuminants = (0, _object.map)(coordinates, function(v) {
      var X = 100 * (v.x / v.y), Y = 100, Z = 100 * (1 - v.x - v.y) / v.y;
      return [X, Y, Z];
    });
    exports2.default = illuminants;
    module2.exports = exports2["default"];
  }
});

// node_modules/ciebase/dist/workspace.js
var require_workspace = __commonJS({
  "node_modules/ciebase/dist/workspace.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _Math = Math;
    var pow = _Math.pow;
    var sign = _Math.sign;
    var abs = _Math.abs;
    var sRgbGamma = {
      decode: function decode(v) {
        return v <= 0.04045 ? v / 12.92 : pow((v + 0.055) / 1.055, 2.4);
      },
      encode: function encode(v) {
        return v <= 31308e-7 ? 12.92 * v : 1.055 * pow(v, 1 / 2.4) - 0.055;
      }
    };
    var proPhotoGamma = {
      encode: function encode(v) {
        return v < 1953125e-9 ? 16 * v : pow(v, 1 / 1.8);
      },
      decode: function decode(v) {
        return v < 16 * 1953125e-9 ? v / 16 : pow(v, 1.8);
      }
    };
    function simpleGamma(g) {
      return {
        decode: function decode(v) {
          return sign(v) * pow(abs(v), g);
        },
        encode: function encode(v) {
          return sign(v) * pow(abs(v), 1 / g);
        }
      };
    }
    var workspaces = {
      "sRGB": {
        r: { x: 0.64, y: 0.33 },
        g: { x: 0.3, y: 0.6 },
        b: { x: 0.15, y: 0.06 },
        gamma: sRgbGamma
      },
      "Adobe RGB": {
        r: { x: 0.64, y: 0.33 },
        g: { x: 0.21, y: 0.71 },
        b: { x: 0.15, y: 0.06 },
        gamma: simpleGamma(2.2)
      },
      "Wide Gamut RGB": {
        r: { x: 0.7347, y: 0.2653 },
        g: { x: 0.1152, y: 0.8264 },
        b: { x: 0.1566, y: 0.0177 },
        gamma: simpleGamma(563 / 256)
      },
      "ProPhoto RGB": {
        r: { x: 0.7347, y: 0.2653 },
        g: { x: 0.1596, y: 0.8404 },
        b: { x: 0.0366, y: 1e-4 },
        gamma: proPhotoGamma
      }
    };
    exports2.default = workspaces;
    module2.exports = exports2["default"];
  }
});

// node_modules/ciebase/dist/matrix.js
var require_matrix = __commonJS({
  "node_modules/ciebase/dist/matrix.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function transpose(M) {
      return [[M[0][0], M[1][0], M[2][0]], [M[0][1], M[1][1], M[2][1]], [M[0][2], M[1][2], M[2][2]]];
    }
    function determinant(M) {
      return M[0][0] * (M[2][2] * M[1][1] - M[2][1] * M[1][2]) + M[1][0] * (M[2][1] * M[0][2] - M[2][2] * M[0][1]) + M[2][0] * (M[1][2] * M[0][1] - M[1][1] * M[0][2]);
    }
    function inverse(M) {
      var c = 1 / determinant(M);
      return [[(M[2][2] * M[1][1] - M[2][1] * M[1][2]) * c, (M[2][1] * M[0][2] - M[2][2] * M[0][1]) * c, (M[1][2] * M[0][1] - M[1][1] * M[0][2]) * c], [(M[2][0] * M[1][2] - M[2][2] * M[1][0]) * c, (M[2][2] * M[0][0] - M[2][0] * M[0][2]) * c, (M[1][0] * M[0][2] - M[1][2] * M[0][0]) * c], [(M[2][1] * M[1][0] - M[2][0] * M[1][1]) * c, (M[2][0] * M[0][1] - M[2][1] * M[0][0]) * c, (M[1][1] * M[0][0] - M[1][0] * M[0][1]) * c]];
    }
    function multiply(M, v) {
      return [M[0][0] * v[0] + M[0][1] * v[1] + M[0][2] * v[2], M[1][0] * v[0] + M[1][1] * v[1] + M[1][2] * v[2], M[2][0] * v[0] + M[2][1] * v[1] + M[2][2] * v[2]];
    }
    function scalar(M, v) {
      return [[M[0][0] * v[0], M[0][1] * v[1], M[0][2] * v[2]], [M[1][0] * v[0], M[1][1] * v[1], M[1][2] * v[2]], [M[2][0] * v[0], M[2][1] * v[1], M[2][2] * v[2]]];
    }
    function product(M, N) {
      return [[M[0][0] * N[0][0] + M[0][1] * N[1][0] + M[0][2] * N[2][0], M[0][0] * N[0][1] + M[0][1] * N[1][1] + M[0][2] * N[2][1], M[0][0] * N[0][2] + M[0][1] * N[1][2] + M[0][2] * N[2][2]], [M[1][0] * N[0][0] + M[1][1] * N[1][0] + M[1][2] * N[2][0], M[1][0] * N[0][1] + M[1][1] * N[1][1] + M[1][2] * N[2][1], M[1][0] * N[0][2] + M[1][1] * N[1][2] + M[1][2] * N[2][2]], [M[2][0] * N[0][0] + M[2][1] * N[1][0] + M[2][2] * N[2][0], M[2][0] * N[0][1] + M[2][1] * N[1][1] + M[2][2] * N[2][1], M[2][0] * N[0][2] + M[2][1] * N[1][2] + M[2][2] * N[2][2]]];
    }
    exports2.transpose = transpose;
    exports2.determinant = determinant;
    exports2.inverse = inverse;
    exports2.multiply = multiply;
    exports2.scalar = scalar;
    exports2.product = product;
  }
});

// node_modules/ciebase/dist/degree.js
var require_degree = __commonJS({
  "node_modules/ciebase/dist/degree.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _Math = Math;
    var PI = _Math.PI;
    function fromRadian(r) {
      var d = r * 180 / PI;
      while (d < 0) {
        d += 360;
      }
      while (d > 360) {
        d -= 360;
      }
      return d;
    }
    function toRadian(d) {
      var r = PI * d / 180;
      while (r < 0) {
        r += 2 * PI;
      }
      while (r > 2 * PI) {
        r -= 2 * PI;
      }
      return r;
    }
    exports2.fromRadian = fromRadian;
    exports2.toRadian = toRadian;
  }
});

// node_modules/ciebase/dist/rgb.js
var require_rgb = __commonJS({
  "node_modules/ciebase/dist/rgb.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _Math = Math;
    var round = _Math.round;
    function fromHex(hex2) {
      if (hex2[0] == "#") {
        hex2 = hex2.slice(1);
      }
      if (hex2.length < 6) {
        hex2 = hex2.split("").map(function(v) {
          return v + v;
        }).join("");
      }
      return hex2.match(/../g).map(function(v) {
        return parseInt(v, 16) / 255;
      });
    }
    function toHex(RGB) {
      var hex2 = RGB.map(function(v) {
        v = round(255 * v).toString(16);
        if (v.length < 2) {
          v = "0" + v;
        }
        return v;
      }).join("");
      return "#" + hex2;
    }
    exports2.fromHex = fromHex;
    exports2.toHex = toHex;
  }
});

// node_modules/ciebase/dist/xyz.js
var require_xyz = __commonJS({
  "node_modules/ciebase/dist/xyz.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _matrix = require_matrix();
    var matrix = _interopRequireWildcard(_matrix);
    var _illuminant = require_illuminant();
    var _illuminant2 = _interopRequireDefault(_illuminant);
    var _workspace = require_workspace();
    var _workspace2 = _interopRequireDefault(_workspace);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }
    function Converter() {
      var rgbSpace = arguments.length <= 0 || arguments[0] === void 0 ? _workspace2.default.sRGB : arguments[0];
      var whitePoint = arguments.length <= 1 || arguments[1] === void 0 ? _illuminant2.default.D65 : arguments[1];
      var primaries = [rgbSpace.r, rgbSpace.g, rgbSpace.b];
      var M_P = matrix.transpose(primaries.map(function(v) {
        var X = v.x / v.y, Y = 1, Z = (1 - v.x - v.y) / v.y;
        return [X, Y, Z];
      }));
      var gamma = rgbSpace.gamma, M_S = matrix.multiply(matrix.inverse(M_P), whitePoint), M_RGB_XYZ = matrix.scalar(M_P, M_S), M_XYZ_RGB = matrix.inverse(M_RGB_XYZ);
      return {
        fromRgb: function fromRgb(RGB) {
          return matrix.multiply(M_RGB_XYZ, RGB.map(gamma.decode));
        },
        toRgb: function toRgb(XYZ) {
          return matrix.multiply(M_XYZ_RGB, XYZ).map(gamma.encode);
        }
      };
    }
    exports2.default = Converter;
    module2.exports = exports2["default"];
  }
});

// node_modules/ciebase/index.js
var require_ciebase = __commonJS({
  "node_modules/ciebase/index.js"(exports2, module2) {
    var illuminant = require_illuminant();
    var workspace = require_workspace();
    var matrix = require_matrix();
    var degree = require_degree();
    var rgb2 = require_rgb();
    var xyz = require_xyz();
    module2.exports = {
      illuminant,
      workspace,
      matrix,
      degree,
      rgb: rgb2,
      xyz
    };
  }
});

// node_modules/ciecam02/dist/helpers.js
var require_helpers = __commonJS({
  "node_modules/ciecam02/dist/helpers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.cfs = exports2.distance = exports2.lerp = exports2.corLerp = void 0;
    var _object = require_object();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      } else {
        return Array.from(arr);
      }
    }
    var _Math = Math;
    var abs = _Math.abs;
    var pow = _Math.pow;
    var sqrt = _Math.sqrt;
    var hueMax = {
      h: 360,
      H: 400
    };
    function corLerp(a, b, t, cor) {
      var m = hueMax[cor];
      if (m) {
        var d = abs(a - b);
        if (d > m / 2) {
          if (a > b) {
            b += m;
          } else {
            a += m;
          }
        }
      }
      return ((1 - t) * a + t * b) % (m || Infinity);
    }
    function lerp(start, end, t) {
      var CAM = {};
      for (var cor in start) {
        CAM[cor] = corLerp(start[cor], end[cor], t, cor);
      }
      return CAM;
    }
    function distance(start, end) {
      var d = 0;
      for (var cor in start) {
        d += pow(start[cor] - end[cor], 2);
      }
      return sqrt(d);
    }
    function cfs(str) {
      return _object.merge.apply(void 0, _toConsumableArray(str.split("").map(function(v) {
        return _defineProperty({}, v, true);
      })));
    }
    exports2.corLerp = corLerp;
    exports2.lerp = lerp;
    exports2.distance = distance;
    exports2.cfs = cfs;
  }
});

// node_modules/ciecam02/dist/gamut.js
var require_gamut = __commonJS({
  "node_modules/ciecam02/dist/gamut.js"(exports2, module2) {
    "use strict";
    var _slicedToArray = function() {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"])
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      return function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _ciebase = require_ciebase();
    var _helpers = require_helpers();
    function Gamut(xyz, cam) {
      var epsilon = arguments.length <= 2 || arguments[2] === void 0 ? 1e-6 : arguments[2];
      var ZERO = -epsilon;
      var ONE = 1 + epsilon;
      var _Math = Math;
      var min = _Math.min;
      var max = _Math.max;
      var _map = ["000", "fff"].map(function(hex2) {
        return cam.fromXyz(xyz.fromRgb(_ciebase.rgb.fromHex(hex2)));
      });
      var _map2 = _slicedToArray(_map, 2);
      var camBlack = _map2[0];
      var camWhite = _map2[1];
      function contains(CAM) {
        var RGB = xyz.toRgb(cam.toXyz(CAM)), isInside = RGB.map(function(v) {
          return v >= ZERO && v <= ONE;
        }).reduce(function(a, b) {
          return a && b;
        }, true);
        return [isInside, RGB];
      }
      function limit(camIn, camOut) {
        var prec = arguments.length <= 2 || arguments[2] === void 0 ? 1e-3 : arguments[2];
        while ((0, _helpers.distance)(camIn, camOut) > prec) {
          var camMid = (0, _helpers.lerp)(camIn, camOut, 0.5);
          var _contains = contains(camMid);
          var _contains2 = _slicedToArray(_contains, 1);
          var isInside = _contains2[0];
          if (isInside) {
            camIn = camMid;
          } else {
            camOut = camMid;
          }
        }
        return camIn;
      }
      function spine(t) {
        return (0, _helpers.lerp)(camBlack, camWhite, t);
      }
      function crop(RGB) {
        return RGB.map(function(v) {
          return max(ZERO, min(ONE, v));
        });
      }
      return { contains, limit, spine, crop };
    }
    exports2.default = Gamut;
    module2.exports = exports2["default"];
  }
});

// node_modules/ciecam02/dist/hq.js
var require_hq = __commonJS({
  "node_modules/ciecam02/dist/hq.js"(exports2) {
    "use strict";
    var _slicedToArray = function() {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"])
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      return function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.toNotation = exports2.fromNotation = exports2.toHue = exports2.fromHue = void 0;
    var _helpers = require_helpers();
    var _Math = Math;
    var floor = _Math.floor;
    var uniqueHues = [{ s: "R", h: 20.14, e: 0.8, H: 0 }, { s: "Y", h: 90, e: 0.7, H: 100 }, { s: "G", h: 164.25, e: 1, H: 200 }, { s: "B", h: 237.53, e: 1.2, H: 300 }, { s: "R", h: 380.14, e: 0.8, H: 400 }];
    var hueSymbols = uniqueHues.map(function(v) {
      return v.s;
    }).slice(0, -1).join("");
    function fromHue(h) {
      if (h < uniqueHues[0].h) {
        h += 360;
      }
      var j = 0;
      while (uniqueHues[j + 1].h < h) {
        j++;
      }
      var d_j = (h - uniqueHues[j].h) / uniqueHues[j].e, d_k = (uniqueHues[j + 1].h - h) / uniqueHues[j + 1].e, H_j = uniqueHues[j].H;
      return H_j + 100 * d_j / (d_j + d_k);
    }
    function toHue(H) {
      var j = floor(H / 100);
      var amt = H % 100;
      var _uniqueHues$slice = uniqueHues.slice(j, j + 2);
      var _uniqueHues$slice2 = _slicedToArray(_uniqueHues$slice, 2);
      var _uniqueHues$slice2$ = _uniqueHues$slice2[0];
      var e_j = _uniqueHues$slice2$.e;
      var h_j = _uniqueHues$slice2$.h;
      var _uniqueHues$slice2$2 = _uniqueHues$slice2[1];
      var e_k = _uniqueHues$slice2$2.e;
      var h_k = _uniqueHues$slice2$2.h;
      var h = (amt * (e_k * h_j - e_j * h_k) - 100 * h_j * e_k) / (amt * (e_k - e_j) - 100 * e_k);
      return h;
    }
    var shortcuts = {
      O: "RY",
      S: "YG",
      T: "G25B",
      C: "GB",
      A: "B25G",
      V: "B25R",
      M: "BR",
      P: "R25B"
    };
    function fromNotation(N) {
      var _N$match = N.match(/^([a-z])(?:(.+)?([a-z]))?$/i);
      var _N$match2 = _slicedToArray(_N$match, 4);
      var H1 = _N$match2[1];
      var P = _N$match2[2];
      var H2 = _N$match2[3];
      if (H2 === void 0) {
        H2 = H1;
      }
      if (P === void 0) {
        P = "50";
      }
      var _map = [H1, H2].map(function(v) {
        v = v.toUpperCase();
        var sc = shortcuts[v];
        return sc ? fromNotation(sc) : 100 * hueSymbols.indexOf(v);
      });
      var _map2 = _slicedToArray(_map, 2);
      H1 = _map2[0];
      H2 = _map2[1];
      P = parseFloat(P) / 100;
      return (0, _helpers.corLerp)(H1, H2, P, "H");
    }
    function toNotation(H) {
      var i = floor(H / 100), j = (i + 1) % hueSymbols.length, p = H - i * 100;
      if (p > 50) {
        var _ref = [j, i];
        i = _ref[0];
        j = _ref[1];
        p = 100 - p;
      }
      if (p < 1) {
        return hueSymbols[i];
      } else {
        return hueSymbols[i] + p.toFixed() + hueSymbols[j];
      }
    }
    exports2.fromHue = fromHue;
    exports2.toHue = toHue;
    exports2.fromNotation = fromNotation;
    exports2.toNotation = toNotation;
  }
});

// node_modules/ciecam02/dist/cam.js
var require_cam = __commonJS({
  "node_modules/ciecam02/dist/cam.js"(exports2, module2) {
    "use strict";
    var _slicedToArray = function() {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"])
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      return function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _ciebase = require_ciebase();
    var _hq = require_hq();
    var hq = _interopRequireWildcard(_hq);
    var _helpers = require_helpers();
    var _object = require_object();
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }
    var _Math = Math;
    var pow = _Math.pow;
    var sqrt = _Math.sqrt;
    var exp = _Math.exp;
    var abs = _Math.abs;
    var sign = _Math.sign;
    var _Math2 = Math;
    var sin = _Math2.sin;
    var cos = _Math2.cos;
    var atan2 = _Math2.atan2;
    var surrounds = {
      average: { F: 1, c: 0.69, N_c: 1 },
      dim: { F: 0.9, c: 0.59, N_c: 0.9 },
      dark: { F: 0.8, c: 0.535, N_c: 0.8 }
    };
    var M_CAT02 = [[0.7328, 0.4296, -0.1624], [-0.7036, 1.6975, 61e-4], [3e-3, 0.0136, 0.9834]];
    var M_HPE = [[0.38971, 0.68898, -0.07868], [-0.22981, 1.1834, 0.04641], [0, 0, 1]];
    var XYZ_to_CAT02 = M_CAT02;
    var CAT02_to_XYZ = _ciebase.matrix.inverse(M_CAT02);
    var CAT02_to_HPE = _ciebase.matrix.product(M_HPE, _ciebase.matrix.inverse(M_CAT02));
    var HPE_to_CAT02 = _ciebase.matrix.product(M_CAT02, _ciebase.matrix.inverse(M_HPE));
    var defaultViewingConditions = {
      whitePoint: _ciebase.illuminant.D65,
      adaptingLuminance: 40,
      backgroundLuminance: 20,
      surroundType: "average",
      discounting: false
    };
    var defaultCorrelates = (0, _helpers.cfs)("QJMCshH");
    var vitalCorrelates = (0, _helpers.cfs)("JCh");
    function Converter() {
      var viewingConditions = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
      var correlates = arguments.length <= 1 || arguments[1] === void 0 ? defaultCorrelates : arguments[1];
      viewingConditions = (0, _object.merge)(defaultViewingConditions, viewingConditions);
      var XYZ_w = viewingConditions.whitePoint;
      var L_A = viewingConditions.adaptingLuminance;
      var Y_b = viewingConditions.backgroundLuminance;
      var _surrounds$viewingCon = surrounds[viewingConditions.surroundType];
      var F = _surrounds$viewingCon.F;
      var c = _surrounds$viewingCon.c;
      var N_c = _surrounds$viewingCon.N_c;
      var Y_w = XYZ_w[1];
      var k = 1 / (5 * L_A + 1), F_L = 0.2 * pow(k, 4) * 5 * L_A + 0.1 * pow(1 - pow(k, 4), 2) * pow(5 * L_A, 1 / 3), n = Y_b / Y_w, N_bb = 0.725 * pow(1 / n, 0.2), N_cb = N_bb, z = 1.48 + sqrt(n), D = viewingConditions.discounting ? 1 : F * (1 - 1 / 3.6 * exp(-(L_A + 42) / 92));
      var RGB_w = _ciebase.matrix.multiply(M_CAT02, XYZ_w);
      var _RGB_w$map = RGB_w.map(function(v) {
        return D * Y_w / v + 1 - D;
      });
      var _RGB_w$map2 = _slicedToArray(_RGB_w$map, 3);
      var D_R = _RGB_w$map2[0];
      var D_G = _RGB_w$map2[1];
      var D_B = _RGB_w$map2[2];
      var RGB_cw = correspondingColors(XYZ_w);
      var RGB_aw = adaptedResponses(RGB_cw);
      var A_w = achromaticResponse(RGB_aw);
      function correspondingColors(XYZ) {
        var _matrix$multiply = _ciebase.matrix.multiply(XYZ_to_CAT02, XYZ);
        var _matrix$multiply2 = _slicedToArray(_matrix$multiply, 3);
        var R = _matrix$multiply2[0];
        var G = _matrix$multiply2[1];
        var B = _matrix$multiply2[2];
        return [D_R * R, D_G * G, D_B * B];
      }
      function reverseCorrespondingColors(RGB_c) {
        var _RGB_c = _slicedToArray(RGB_c, 3);
        var R_c = _RGB_c[0];
        var G_c = _RGB_c[1];
        var B_c = _RGB_c[2];
        return _ciebase.matrix.multiply(CAT02_to_XYZ, [R_c / D_R, G_c / D_G, B_c / D_B]);
      }
      function adaptedResponses(RGB_c) {
        return _ciebase.matrix.multiply(CAT02_to_HPE, RGB_c).map(function(v) {
          var x = pow(F_L * abs(v) / 100, 0.42);
          return sign(v) * 400 * x / (27.13 + x) + 0.1;
        });
      }
      function reverseAdaptedResponses(RGB_a) {
        return _ciebase.matrix.multiply(HPE_to_CAT02, RGB_a.map(function(v) {
          var x = v - 0.1;
          return sign(x) * 100 / F_L * pow(27.13 * abs(x) / (400 - abs(x)), 1 / 0.42);
        }));
      }
      function achromaticResponse(RGB_a) {
        var _RGB_a = _slicedToArray(RGB_a, 3);
        var R_a = _RGB_a[0];
        var G_a = _RGB_a[1];
        var B_a = _RGB_a[2];
        return (R_a * 2 + G_a + B_a / 20 - 0.305) * N_bb;
      }
      function brightness(J) {
        return 4 / c * sqrt(J / 100) * (A_w + 4) * pow(F_L, 0.25);
      }
      function lightness(Q) {
        return 6.25 * pow(c * Q / ((A_w + 4) * pow(F_L, 0.25)), 2);
      }
      function colorfulness(C) {
        return C * pow(F_L, 0.25);
      }
      function chromaFromSaturationBrightness(s, Q) {
        return pow(s / 100, 2) * Q / pow(F_L, 0.25);
      }
      function chromaFromColorfulness(M) {
        return M / pow(F_L, 0.25);
      }
      function saturation(M, Q) {
        return 100 * sqrt(M / Q);
      }
      function fillOut(correlates2, inputs) {
        var Q = inputs.Q;
        var J = inputs.J;
        var M = inputs.M;
        var C = inputs.C;
        var s = inputs.s;
        var h = inputs.h;
        var H = inputs.H;
        var outputs = {};
        if (correlates2.J) {
          outputs.J = isNaN(J) ? lightness(Q) : J;
        }
        if (correlates2.C) {
          if (isNaN(C)) {
            if (isNaN(M)) {
              Q = isNaN(Q) ? brightness(J) : Q;
              outputs.C = chromaFromSaturationBrightness(s, Q);
            } else {
              outputs.C = chromaFromColorfulness(M);
            }
          } else {
            outputs.C = inputs.C;
          }
        }
        if (correlates2.h) {
          outputs.h = isNaN(h) ? hq.toHue(H) : h;
        }
        if (correlates2.Q) {
          outputs.Q = isNaN(Q) ? brightness(J) : Q;
        }
        if (correlates2.M) {
          outputs.M = isNaN(M) ? colorfulness(C) : M;
        }
        if (correlates2.s) {
          if (isNaN(s)) {
            Q = isNaN(Q) ? brightness(J) : Q;
            M = isNaN(M) ? colorfulness(C) : M;
            outputs.s = saturation(M, Q);
          } else {
            outputs.s = s;
          }
        }
        if (correlates2.H) {
          outputs.H = isNaN(H) ? hq.fromHue(h) : H;
        }
        return outputs;
      }
      function fromXyz(XYZ) {
        var RGB_c = correspondingColors(XYZ);
        var RGB_a = adaptedResponses(RGB_c);
        var _RGB_a2 = _slicedToArray(RGB_a, 3);
        var R_a = _RGB_a2[0];
        var G_a = _RGB_a2[1];
        var B_a = _RGB_a2[2];
        var a = R_a - G_a * 12 / 11 + B_a / 11, b = (R_a + G_a - 2 * B_a) / 9, h_rad = atan2(b, a), h = _ciebase.degree.fromRadian(h_rad), e_t = 1 / 4 * (cos(h_rad + 2) + 3.8), A = achromaticResponse(RGB_a), J = 100 * pow(A / A_w, c * z), t = 5e4 / 13 * N_c * N_cb * e_t * sqrt(a * a + b * b) / (R_a + G_a + 21 / 20 * B_a), C = pow(t, 0.9) * sqrt(J / 100) * pow(1.64 - pow(0.29, n), 0.73);
        return fillOut(correlates, { J, C, h });
      }
      function toXyz(CAM) {
        var _fillOut = fillOut(vitalCorrelates, CAM);
        var J = _fillOut.J;
        var C = _fillOut.C;
        var h = _fillOut.h;
        var h_rad = _ciebase.degree.toRadian(h);
        var t = pow(C / (sqrt(J / 100) * pow(1.64 - pow(0.29, n), 0.73)), 10 / 9);
        var e_t = 1 / 4 * (cos(h_rad + 2) + 3.8);
        var A = A_w * pow(J / 100, 1 / c / z);
        var p_1 = 5e4 / 13 * N_c * N_cb * e_t / t, p_2 = A / N_bb + 0.305, q_1 = p_2 * 61 / 20 * 460 / 1403, q_2 = 61 / 20 * 220 / 1403, q_3 = 21 / 20 * 6300 / 1403 - 27 / 1403;
        var sin_h = sin(h_rad), cos_h = cos(h_rad);
        var a, b;
        if (t === 0 || isNaN(t)) {
          a = b = 0;
        } else if (abs(sin_h) >= abs(cos_h)) {
          b = q_1 / (p_1 / sin_h + q_2 * cos_h / sin_h + q_3);
          a = b * cos_h / sin_h;
        } else {
          a = q_1 / (p_1 / cos_h + q_2 + q_3 * sin_h / cos_h);
          b = a * sin_h / cos_h;
        }
        var RGB_a = [20 / 61 * p_2 + 451 / 1403 * a + 288 / 1403 * b, 20 / 61 * p_2 - 891 / 1403 * a - 261 / 1403 * b, 20 / 61 * p_2 - 220 / 1403 * a - 6300 / 1403 * b];
        var RGB_c = reverseAdaptedResponses(RGB_a), XYZ = reverseCorrespondingColors(RGB_c);
        return XYZ;
      }
      return { fromXyz, toXyz, fillOut };
    }
    exports2.default = Converter;
    module2.exports = exports2["default"];
  }
});

// node_modules/ciecam02/dist/ucs.js
var require_ucs = __commonJS({
  "node_modules/ciecam02/dist/ucs.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _ciebase = require_ciebase();
    var _Math = Math;
    var sqrt = _Math.sqrt;
    var pow = _Math.pow;
    var exp = _Math.exp;
    var log = _Math.log;
    var cos = _Math.cos;
    var sin = _Math.sin;
    var atan2 = _Math.atan2;
    var uniformSpaces = {
      LCD: { K_L: 0.77, c_1: 7e-3, c_2: 53e-4 },
      SCD: { K_L: 1.24, c_1: 7e-3, c_2: 0.0363 },
      UCS: { K_L: 1, c_1: 7e-3, c_2: 0.0228 }
    };
    function Converter() {
      var name = arguments.length <= 0 || arguments[0] === void 0 ? "UCS" : arguments[0];
      var _uniformSpaces$name = uniformSpaces[name];
      var K_L = _uniformSpaces$name.K_L;
      var c_1 = _uniformSpaces$name.c_1;
      var c_2 = _uniformSpaces$name.c_2;
      function fromCam(CAM) {
        var J = CAM.J;
        var M = CAM.M;
        var h = CAM.h;
        var h_rad = _ciebase.degree.toRadian(h);
        var J_p = (1 + 100 * c_1) * J / (1 + c_1 * J);
        var M_p = 1 / c_2 * log(1 + c_2 * M);
        var a_p = M_p * cos(h_rad);
        var b_p = M_p * sin(h_rad);
        return { J_p, a_p, b_p };
      }
      function toCam(UCS) {
        var J_p = UCS.J_p;
        var a_p = UCS.a_p;
        var b_p = UCS.b_p;
        var J = -J_p / (c_1 * J_p - 100 * c_1 - 1);
        var M_p = sqrt(pow(a_p, 2) + pow(b_p, 2));
        var M = (exp(c_2 * M_p) - 1) / c_2;
        var h_rad = atan2(b_p, a_p);
        var h = _ciebase.degree.fromRadian(h_rad);
        return { J, M, h };
      }
      function distance(UCS1, UCS2) {
        return sqrt(pow((UCS1.J_p - UCS2.J_p) / K_L, 2) + pow(UCS1.a_p - UCS2.a_p, 2) + pow(UCS1.b_p - UCS2.b_p, 2));
      }
      return { fromCam, toCam, distance };
    }
    exports2.default = Converter;
    module2.exports = exports2["default"];
  }
});

// node_modules/ciecam02/index.js
var require_ciecam02 = __commonJS({
  "node_modules/ciecam02/index.js"(exports2, module2) {
    var helpers = require_helpers();
    var gamut = require_gamut();
    var cam = require_cam();
    var ucs = require_ucs();
    var hq = require_hq();
    module2.exports = {
      gamut,
      cfs: helpers.cfs,
      lerp: helpers.lerp,
      cam,
      ucs,
      hq
    };
  }
});

// node_modules/@adobe/leonardo-contrast-colors/chroma-plus.js
var require_chroma_plus = __commonJS({
  "node_modules/@adobe/leonardo-contrast-colors/chroma-plus.js"(exports2) {
    var chromajs = require_chroma();
    var hsluv = require_hsluv();
    var ciebase = require_ciebase();
    var ciecam02 = require_ciecam02();
    var cam = ciecam02.cam({
      whitePoint: ciebase.illuminant.D65,
      adaptingLuminance: 40,
      backgroundLuminance: 20,
      surroundType: "average",
      discounting: false
    }, ciecam02.cfs("JCh"));
    var xyz = ciebase.xyz(ciebase.workspace.sRGB, ciebase.illuminant.D65);
    var jch2rgb = (jch) => xyz.toRgb(cam.toXyz({ J: jch[0], C: jch[1], h: jch[2] }));
    var rgb2jch = (rgb2) => {
      const jch = cam.fromXyz(xyz.fromRgb(rgb2));
      return [jch.J, jch.C, jch.h];
    };
    var [jch2jab, jab2jch] = (() => {
      const coefs = { k_l: 1, c1: 7e-3, c2: 0.0228 };
      const \u03C0 = Math.PI;
      const CIECAM02_la = 64 / \u03C0 / 5;
      const CIECAM02_k = 1 / (5 * CIECAM02_la + 1);
      const CIECAM02_fl = 0.2 * CIECAM02_k ** 4 * (5 * CIECAM02_la) + 0.1 * (1 - CIECAM02_k ** 4) ** 2 * (5 * CIECAM02_la) ** (1 / 3);
      return [(jch) => {
        const [J, C, h] = jch;
        const M = C * CIECAM02_fl ** 0.25;
        let j = (1 + 100 * coefs.c1) * J / (1 + coefs.c1 * J);
        j /= coefs.k_l;
        const MPrime = 1 / coefs.c2 * Math.log(1 + coefs.c2 * M);
        const a = MPrime * Math.cos(h * (\u03C0 / 180));
        const b = MPrime * Math.sin(h * (\u03C0 / 180));
        return [j, a, b];
      }, (jab) => {
        const [j, a, b] = jab;
        const newMPrime = Math.sqrt(a * a + b * b);
        const newM = (Math.exp(newMPrime * coefs.c2) - 1) / coefs.c2;
        const h = (180 / \u03C0 * Math.atan2(b, a) + 360) % 360;
        const C = newM / CIECAM02_fl ** 0.25;
        const J = j / (1 + coefs.c1 * (100 - j));
        return [J, C, h];
      }];
    })();
    var jab2rgb = (jab) => jch2rgb(jab2jch(jab));
    var rgb2jab = (rgb2) => jch2jab(rgb2jch(rgb2));
    var con = console;
    con.color = (color2, text = "") => {
      const col = chromajs(color2);
      const l = col.luminance();
      con.log(`%c${color2} ${text}`, `background-color: ${color2};padding: 5px; border-radius: 5px; color: ${l > 0.5 ? "#000" : "#fff"}`);
    };
    con.ramp = (scale, length = 1) => {
      con.log("%c ", `font-size: 1px;line-height: 16px;background: ${chromajs.getCSSGradient(scale, length)};padding: 0 0 0 200px; border-radius: 2px;`);
    };
    var online = (x1, y1, x2, y2, x3, y3, \u03B5 = 0.1) => {
      if (x1 === x2 || y1 === y2) {
        return true;
      }
      const m = (y2 - y1) / (x2 - x1);
      const x4 = (y3 + x3 / m - y1 + m * x1) / (m + 1 / m);
      const y4 = y3 + x3 / m - x4 / m;
      return (x3 - x4) ** 2 + (y3 - y4) ** 2 < \u03B5 ** 2;
    };
    var div = (\u0192, dot1, dot2, \u03B5) => {
      const x3 = (dot1[0] + dot2[0]) / 2;
      const y3 = \u0192(x3);
      if (online(...dot1, ...dot2, x3, y3, \u03B5)) {
        return null;
      }
      return [x3, y3];
    };
    var split = (\u0192, from, to, \u03B5 = 0.1) => {
      const step = (to - from) / 10;
      const points = [];
      for (let i = from; i < to; i += step) {
        points.push([i, \u0192(i)]);
      }
      points.push([to, \u0192(to)]);
      for (let i = 0; i < points.length - 1; i++) {
        const dot = div(\u0192, points[i], points[i + 1], \u03B5);
        if (dot) {
          points.splice(i + 1, 0, dot);
          i--;
        }
      }
      for (let i = 0; i < points.length - 2; i++) {
        if (online(...points[i], ...points[i + 2], ...points[i + 1], \u03B5)) {
          points.splice(i + 1, 1);
          i--;
        }
      }
      return points;
    };
    var round = (x, r = 4) => Math.round(x * 10 ** r) / 10 ** r;
    var getCSSGradient = (scale, length = 1, deg = 90, \u03B5 = 5e-3) => {
      const ptsr = split((x) => scale(x).gl()[0], 0, length, \u03B5);
      const ptsg = split((x) => scale(x).gl()[1], 0, length, \u03B5);
      const ptsb = split((x) => scale(x).gl()[2], 0, length, \u03B5);
      const points = Array.from(new Set([
        ...ptsr.map((a) => round(a[0])),
        ...ptsg.map((a) => round(a[0])),
        ...ptsb.map((a) => round(a[0]))
      ].sort((a, b) => a - b)));
      return `linear-gradient(${deg}deg, ${points.map((x) => `${scale(x).hex()} ${round(x * 100)}%`).join()});`;
    };
    exports2.extendChroma = (chroma) => {
      chroma.Color.prototype.jch = function() {
        return rgb2jch(this._rgb.slice(0, 3).map((c) => c / 255));
      };
      chroma.jch = (...args) => new chroma.Color(...jch2rgb(args).map((c) => Math.floor(c * 255)), "rgb");
      chroma.Color.prototype.jab = function() {
        return rgb2jab(this._rgb.slice(0, 3).map((c) => c / 255));
      };
      chroma.jab = (...args) => new chroma.Color(...jab2rgb(args).map((c) => Math.floor(c * 255)), "rgb");
      chroma.Color.prototype.hsluv = function() {
        return hsluv.rgbToHsluv(this._rgb.slice(0, 3).map((c) => c / 255));
      };
      chroma.hsluv = (...args) => new chroma.Color(...hsluv.hsluvToRgb(args).map((c) => Math.floor(c * 255)), "rgb");
      const oldInterpol = chroma.interpolate;
      const RGB2 = {
        jch: rgb2jch,
        jab: rgb2jab,
        hsluv: hsluv.rgbToHsluv
      };
      const lerpH = (a, b, t) => {
        const m = 360;
        const d = Math.abs(a - b);
        if (d > m / 2) {
          if (a > b) {
            b += m;
          } else {
            a += m;
          }
        }
        return ((1 - t) * a + t * b) % m;
      };
      chroma.interpolate = (col1, col2, f = 0.5, mode = "lrgb") => {
        if (RGB2[mode]) {
          if (typeof col1 !== "object") {
            col1 = new chroma.Color(col1);
          }
          if (typeof col2 !== "object") {
            col2 = new chroma.Color(col2);
          }
          const xyz1 = RGB2[mode](col1.gl());
          const xyz2 = RGB2[mode](col2.gl());
          const grey1 = Number.isNaN(col1.hsl()[0]);
          const grey2 = Number.isNaN(col2.hsl()[0]);
          let X;
          let Y;
          let Z;
          switch (mode) {
            case "hsluv":
              if (xyz1[1] < 1e-10) {
                xyz1[0] = xyz2[0];
              }
              if (xyz1[1] === 0) {
                xyz1[1] = xyz2[1];
              }
              if (xyz2[1] < 1e-10) {
                xyz2[0] = xyz1[0];
              }
              if (xyz2[1] === 0) {
                xyz2[1] = xyz1[1];
              }
              X = lerpH(xyz1[0], xyz2[0], f);
              Y = xyz1[1] + (xyz2[1] - xyz1[1]) * f;
              Z = xyz1[2] + (xyz2[2] - xyz1[2]) * f;
              break;
            case "jch":
              if (grey1) {
                xyz1[2] = xyz2[2];
              }
              if (grey2) {
                xyz2[2] = xyz1[2];
              }
              X = xyz1[0] + (xyz2[0] - xyz1[0]) * f;
              Y = xyz1[1] + (xyz2[1] - xyz1[1]) * f;
              Z = lerpH(xyz1[2], xyz2[2], f);
              break;
            default:
              X = xyz1[0] + (xyz2[0] - xyz1[0]) * f;
              Y = xyz1[1] + (xyz2[1] - xyz1[1]) * f;
              Z = xyz1[2] + (xyz2[2] - xyz1[2]) * f;
          }
          return chroma[mode](X, Y, Z).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
        }
        return oldInterpol(col1, col2, f, mode);
      };
      chroma.getCSSGradient = getCSSGradient;
    };
  }
});

// node_modules/@adobe/leonardo-contrast-colors/curve.js
var require_curve = __commonJS({
  "node_modules/@adobe/leonardo-contrast-colors/curve.js"(exports2) {
    var base3 = (t, p1, p2, p3, p4) => {
      const t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4;
      const t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
      return t * t2 - 3 * p1 + 3 * p2;
    };
    var bezlen = (x1, y1, x2, y2, x3, y3, x4, y4, z) => {
      if (z == null) {
        z = 1;
      }
      z = Math.max(0, Math.min(z, 1));
      const z2 = z / 2;
      const n = 12;
      const Tvalues = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816];
      const Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472];
      let sum = 0;
      for (let i = 0; i < n; i++) {
        const ct = z2 * Tvalues[i] + z2;
        const xbase = base3(ct, x1, x2, x3, x4);
        const ybase = base3(ct, y1, y2, y3, y4);
        const comb = xbase * xbase + ybase * ybase;
        sum += Cvalues[i] * Math.sqrt(comb);
      }
      return z2 * sum;
    };
    exports2.bezlen = bezlen;
    var findDotsAtSegment = (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) => {
      const t1 = 1 - t;
      const t12 = t1 * t1;
      const t13 = t12 * t1;
      const t2 = t * t;
      const t3 = t2 * t;
      const x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x;
      const y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y;
      return { x, y };
    };
    exports2.findDotsAtSegment = findDotsAtSegment;
    exports2.catmullRom2bezier = (crp, z) => {
      const d = [];
      let end = { x: +crp[0], y: +crp[1] };
      for (let i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
        const p = [
          { x: +crp[i - 2], y: +crp[i - 1] },
          { x: +crp[i], y: +crp[i + 1] },
          { x: +crp[i + 2], y: +crp[i + 3] },
          { x: +crp[i + 4], y: +crp[i + 5] }
        ];
        if (z) {
          if (!i) {
            p[0] = { x: +crp[iLen - 2], y: +crp[iLen - 1] };
          } else if (iLen - 4 === i) {
            p[3] = { x: +crp[0], y: +crp[1] };
          } else if (iLen - 2 === i) {
            p[2] = { x: +crp[0], y: +crp[1] };
            p[3] = { x: +crp[2], y: +crp[3] };
          }
        } else if (iLen - 4 === i) {
          p[3] = p[2];
        } else if (!i) {
          p[0] = { x: +crp[i], y: +crp[i + 1] };
        }
        d.push([
          end.x,
          end.y,
          (-p[0].x + 6 * p[1].x + p[2].x) / 6,
          (-p[0].y + 6 * p[1].y + p[2].y) / 6,
          (p[1].x + 6 * p[2].x - p[3].x) / 6,
          (p[1].y + 6 * p[2].y - p[3].y) / 6,
          p[2].x,
          p[2].y
        ]);
        end = p[2];
      }
      return d;
    };
    var bezlen2 = (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) => {
      const n = 5;
      let x0 = p1x;
      let y0 = p1y;
      let len = 0;
      for (let i = 1; i < n; i++) {
        const { x, y } = findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, i / n);
        len += Math.hypot(x - x0, y - y0);
        x0 = x;
        y0 = y;
      }
      len += Math.hypot(p2x - x0, p2y - y0);
      return len;
    };
    exports2.prepareCurve = (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) => {
      const len = Math.floor(bezlen2(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) * 0.75);
      const fs = [];
      let oldi = 0;
      for (let i = 0; i <= len; i++) {
        const t = i / len;
        const xy = findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t);
        const index = Math.round(xy.x);
        fs[index] = xy.y;
        if (index - oldi > 1) {
          const s = fs[oldi];
          const f = fs[index];
          for (let j = oldi + 1; j < index; j++) {
            fs[j] = s + (f - s) / (index - oldi) * (j - oldi);
          }
        }
        oldi = index;
      }
      return (x) => fs[Math.round(x)] || null;
    };
  }
});

// node_modules/@adobe/leonardo-contrast-colors/utils.js
var require_utils = __commonJS({
  "node_modules/@adobe/leonardo-contrast-colors/utils.js"(exports2, module2) {
    var chroma = require_chroma();
    var { catmullRom2bezier, prepareCurve } = require_curve();
    var colorSpaces = {
      CAM02: "jab",
      CAM02p: "jch",
      HEX: "hex",
      HSL: "hsl",
      HSLuv: "hsluv",
      HSV: "hsv",
      LAB: "lab",
      LCH: "lch",
      RGB: "rgb"
    };
    function round(x, n = 0) {
      const ten = 10 ** n;
      return Math.round(x * ten) / ten;
    }
    function multiplyRatios(ratio, multiplier) {
      let r;
      if (ratio > 1) {
        r = (ratio - 1) * multiplier + 1;
      } else if (ratio < -1) {
        r = (ratio + 1) * multiplier - 1;
      } else {
        r = 1;
      }
      return round(r, 2);
    }
    function cArray(c) {
      return chroma(String(c)).hsluv();
    }
    function smoothScale(ColorsArray, domains, space) {
      const points = [[], [], []];
      ColorsArray.forEach((color2, i) => points.forEach((point, j) => point.push(domains[i], color2[j])));
      if (space === "hcl") {
        const point = points[1];
        for (let i = 1; i < point.length; i += 2) {
          if (Number.isNaN(point[i])) {
            point[i] = 0;
          }
        }
      }
      points.forEach((point) => {
        const nans = [];
        for (let i = 1; i < point.length; i += 2) {
          if (Number.isNaN(point[i])) {
            nans.push(i);
          } else {
            nans.forEach((j) => {
              point[j] = point[i];
            });
            nans.length = 0;
            break;
          }
        }
        if (nans.length) {
          const safeJChHue = chroma("#ccc").jch()[2];
          nans.forEach((j) => {
            point[j] = safeJChHue;
          });
        }
        nans.length = 0;
        for (let i = point.length - 1; i > 0; i -= 2) {
          if (Number.isNaN(point[i])) {
            nans.push(i);
          } else {
            nans.forEach((j) => {
              point[j] = point[i];
            });
            break;
          }
        }
        for (let i = 1; i < point.length; i += 2) {
          if (Number.isNaN(point[i])) {
            point.splice(i - 1, 2);
            i -= 2;
          }
        }
        if (space in { hcl: 1, hsl: 1, hsluv: 1, hsv: 1, jch: 1 }) {
          let prev = point[1];
          let addon = 0;
          for (let i = 3; i < point.length; i += 2) {
            const p = point[i] + addon;
            const zero = Math.abs(prev - p);
            const plus = Math.abs(prev - (p + 360));
            const minus = Math.abs(prev - (p - 360));
            if (plus < zero && plus < minus) {
              addon += 360;
            }
            if (minus < zero && minus < plus) {
              addon -= 360;
            }
            point[i] += addon;
            prev = point[i];
          }
        }
      });
      const prep = points.map((point) => catmullRom2bezier(point).map((curve) => prepareCurve(...curve)));
      return (d) => {
        const ch = prep.map((p) => {
          for (let i = 0; i < p.length; i++) {
            const res = p[i](d);
            if (res != null) {
              return res;
            }
          }
          return null;
        });
        if (space === "jch" && ch[1] < 0) {
          ch[1] = 0;
        }
        return chroma[space](...ch).hex();
      };
    }
    function makePowScale(exp = 1, domains = [0, 1], range = [0, 1]) {
      const m = (range[1] - range[0]) / (domains[1] ** exp - domains[0] ** exp);
      const c = range[0] - m * domains[0] ** exp;
      return (x) => m * x ** exp + c;
    }
    function createScale3({
      swatches,
      colorKeys,
      colorspace = "LAB",
      shift = 1,
      fullScale = true,
      smooth = false,
      asFun = false
    } = {}) {
      const space = colorSpaces[colorspace];
      if (!space) {
        throw new Error(`Colorspace \u201C${colorspace}\u201D not supported`);
      }
      if (!colorKeys) {
        throw new Error(`Colorkeys missing: returned \u201C${colorKeys}\u201D`);
      }
      let domains = colorKeys.map((key) => swatches - swatches * (chroma(key).hsluv()[2] / 100)).sort((a, b) => a - b).concat(swatches);
      domains.unshift(0);
      let sqrtDomains = makePowScale(shift, [1, swatches], [1, swatches]);
      sqrtDomains = domains.map((d) => Math.max(0, sqrtDomains(d)));
      domains = sqrtDomains;
      const sortedColor = colorKeys.map((c, i) => ({ colorKeys: cArray(c), index: i })).sort((c1, c2) => c2.colorKeys[2] - c1.colorKeys[2]).map((data) => colorKeys[data.index]);
      let ColorsArray = [];
      let scale;
      if (fullScale) {
        const white = space === "lch" ? chroma.lch(...chroma("#fff").lch()) : "#fff";
        const black = space === "lch" ? chroma.lch(...chroma("#000").lch()) : "#000";
        ColorsArray = [
          white,
          ...sortedColor,
          black
        ];
      } else {
        ColorsArray = sortedColor;
      }
      if (smooth) {
        const stringColors = ColorsArray;
        ColorsArray = ColorsArray.map((d) => chroma(String(d))[space]());
        if (space === "hcl") {
          ColorsArray.forEach((c) => {
            c[1] = Number.isNaN(c[1]) ? 0 : c[1];
          });
        }
        if (space === "jch") {
          for (let i = 0; i < stringColors.length; i++) {
            const color2 = chroma(stringColors[i]).hcl();
            if (Number.isNaN(color2[0])) {
              ColorsArray[i][2] = NaN;
            }
          }
        }
        scale = smoothScale(ColorsArray, domains, space);
      } else {
        scale = chroma.scale(ColorsArray.map((color2) => {
          if (typeof color2 === "object" && color2.constructor === chroma.Color) {
            return color2;
          }
          return String(color2);
        })).domain(domains).mode(space);
      }
      if (asFun) {
        return scale;
      }
      const Colors = new Array(swatches).fill().map((_, d) => chroma(scale(d)).hex());
      const colors = Colors.filter((el) => el != null);
      return colors;
    }
    function removeDuplicates(originalArray, prop) {
      const newArray = [];
      const lookupObject = {};
      const keys1 = Object.keys(originalArray);
      keys1.forEach((i) => {
        lookupObject[originalArray[i][prop]] = originalArray[i];
      });
      const keys2 = Object.keys(lookupObject);
      keys2.forEach((i) => newArray.push(lookupObject[i]));
      return newArray;
    }
    function uniq(a) {
      return Array.from(new Set(a));
    }
    function filterNaN(x) {
      if (Number.isNaN(x)) {
        return 0;
      }
      return x;
    }
    function convertColorValue(color2, format, object = false) {
      if (!color2) {
        throw new Error(`Cannot convert color value of \u201C${color2}\u201D`);
      }
      if (!colorSpaces[format]) {
        throw new Error(`Cannot convert to colorspace \u201C${format}\u201D`);
      }
      const space = colorSpaces[format];
      const colorObj = chroma(String(color2))[space]();
      if (format === "HSL") {
        colorObj.pop();
      }
      if (format === "HEX") {
        if (object) {
          const rgb2 = chroma(String(color2)).rgb();
          return { r: rgb2[0], g: rgb2[1], b: rgb2[2] };
        }
        return colorObj;
      }
      const colorObject = {};
      let newColorObj = colorObj.map(filterNaN);
      newColorObj = newColorObj.map((ch, i) => {
        let rnd = round(ch);
        let j = i;
        if (space === "hsluv") {
          j += 2;
        }
        let letter = space.charAt(j);
        if (space === "jch" && letter === "c") {
          letter = "C";
        }
        colorObject[letter === "j" ? "J" : letter] = rnd;
        if (space in { lab: 1, lch: 1, jab: 1, jch: 1 }) {
          if (!object) {
            if (letter === "l" || letter === "j") {
              rnd += "%";
            }
            if (letter === "h") {
              rnd += "deg";
            }
          }
        } else if (space !== "hsluv") {
          if (letter === "s" || letter === "l" || letter === "v") {
            colorObject[letter] = round(ch, 2);
            if (!object) {
              rnd = round(ch * 100);
              rnd += "%";
            }
          } else if (letter === "h" && !object) {
            rnd += "deg";
          }
        }
        return rnd;
      });
      const stringName = space;
      const stringValue = `${stringName}(${newColorObj.join(", ")})`;
      if (object) {
        return colorObject;
      }
      return stringValue;
    }
    function luminance2(r, g, b) {
      const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }
    function getContrast(color2, base, baseV) {
      if (baseV === void 0) {
        const baseLightness = chroma.rgb(...base).hsluv()[2];
        baseV = round(baseLightness / 100, 2);
      }
      const colorLum = luminance2(color2[0], color2[1], color2[2]);
      const baseLum = luminance2(base[0], base[1], base[2]);
      const cr1 = (colorLum + 0.05) / (baseLum + 0.05);
      const cr2 = (baseLum + 0.05) / (colorLum + 0.05);
      if (baseV < 0.5) {
        if (cr1 >= 1) {
          return cr1;
        }
        return -cr2;
      }
      if (cr1 < 1) {
        return cr2;
      }
      if (cr1 === 1) {
        return cr1;
      }
      return -cr1;
    }
    function minPositive2(r) {
      if (!r) {
        throw new Error("Array undefined");
      }
      if (!Array.isArray(r)) {
        throw new Error("Passed object is not an array");
      }
      return Math.min(...r.filter((val) => val >= 1));
    }
    function ratioName2(r) {
      if (!r) {
        throw new Error("Ratios undefined");
      }
      r = r.sort((a, b) => a - b);
      const min = minPositive2(r);
      const minIndex = r.indexOf(min);
      const nArr = [];
      const rNeg = r.slice(0, minIndex);
      const rPos = r.slice(minIndex, r.length);
      for (let i = 0; i < rNeg.length; i++) {
        const d = 1 / (rNeg.length + 1);
        const m = d * 100;
        const nVal = m * (i + 1);
        nArr.push(round(nVal));
      }
      for (let i = 0; i < rPos.length; i++) {
        nArr.push((i + 1) * 100);
      }
      nArr.sort((a, b) => a - b);
      return nArr;
    }
    var searchColors = (color2, bgRgbArray, baseV, ratioValues) => {
      const colorLen = 3e3;
      const colorScale = createScale3({
        swatches: colorLen,
        colorKeys: color2._colorKeys,
        colorspace: color2._colorspace,
        shift: 1,
        smooth: color2._smooth,
        asFun: true
      });
      const ccache = {};
      const getContrast2 = (i) => {
        if (ccache[i]) {
          return ccache[i];
        }
        const rgb2 = chroma(colorScale(i)).rgb();
        const c = getContrast(rgb2, bgRgbArray, baseV);
        ccache[i] = c;
        return c;
      };
      const colorSearch = (x) => {
        const first = getContrast2(0);
        const last = getContrast2(colorLen);
        const dir = first < last ? 1 : -1;
        const \u03B5 = 0.01;
        x += 5e-3 * Math.sign(x);
        let step = colorLen / 2;
        let dot = step;
        let val = getContrast2(dot);
        let counter = 100;
        while (Math.abs(val - x) > \u03B5 && counter) {
          counter--;
          step /= 2;
          if (val < x) {
            dot += step * dir;
          } else {
            dot -= step * dir;
          }
          val = getContrast2(dot);
        }
        return round(dot, 3);
      };
      const outputColors = [];
      ratioValues.forEach((ratio) => outputColors.push(colorScale(colorSearch(+ratio))));
      return outputColors;
    };
    module2.exports = {
      cArray,
      colorSpaces,
      convertColorValue,
      createScale: createScale3,
      getContrast,
      luminance: luminance2,
      minPositive: minPositive2,
      multiplyRatios,
      ratioName: ratioName2,
      removeDuplicates,
      round,
      searchColors,
      uniq
    };
  }
});

// node_modules/@adobe/leonardo-contrast-colors/color.js
var require_color = __commonJS({
  "node_modules/@adobe/leonardo-contrast-colors/color.js"(exports2, module2) {
    var chroma = require_chroma();
    var {
      colorSpaces,
      createScale: createScale3
    } = require_utils();
    var Color3 = class {
      constructor({ name, colorKeys, colorspace = "RGB", ratios, smooth = false, output = "HEX" }) {
        this._name = name;
        this._colorKeys = colorKeys;
        this._colorspace = colorspace;
        this._ratios = ratios;
        this._smooth = smooth;
        this._output = output;
        if (!this._name) {
          throw new Error("Color missing name");
        }
        if (!this._colorKeys) {
          throw new Error("Color Keys are undefined");
        }
        if (!colorSpaces[this._colorspace]) {
          throw new Error(`Colorspace \u201C${colorspace}\u201D not supported`);
        }
        if (!colorSpaces[this._output]) {
          throw new Error(`Output \u201C${colorspace}\u201D not supported`);
        }
        for (let i = 0; i < this._colorKeys.length; i++) {
          if (!chroma.valid(this._colorKeys[i])) {
            throw new Error(`Invalid Color Key \u201C${this._colorKeys[i]}\u201D`);
          }
        }
        this._colorScale = null;
      }
      set colorKeys(colorKeys) {
        this._colorKeys = colorKeys;
        this._colorScale = null;
      }
      get colorKeys() {
        return this._colorKeys;
      }
      set colorspace(colorspace) {
        this._colorspace = colorspace;
        this._colorScale = null;
      }
      get colorspace() {
        return this._colorspace;
      }
      set ratios(ratios) {
        this._ratios = ratios;
      }
      get ratios() {
        return this._ratios;
      }
      set name(name) {
        this._name = name;
      }
      get name() {
        return this._name;
      }
      set smooth(smooth) {
        this._smooth = smooth;
        this._colorScale = null;
      }
      get smooth() {
        return this._smooth;
      }
      set output(output) {
        this._output = output;
        this._colorScale = null;
      }
      get output() {
        return this._output;
      }
      get colorScale() {
        if (!this._colorScale) {
          this._generateColorScale();
        }
        return this._colorScale;
      }
      _generateColorScale() {
        this._colorScale = createScale3({
          swatches: 3e3,
          colorKeys: this._colorKeys,
          colorspace: this._colorspace,
          shift: 1,
          smooth: this._smooth,
          asFun: true
        });
      }
    };
    module2.exports = { Color: Color3 };
  }
});

// node_modules/@adobe/leonardo-contrast-colors/backgroundcolor.js
var require_backgroundcolor = __commonJS({
  "node_modules/@adobe/leonardo-contrast-colors/backgroundcolor.js"(exports2, module2) {
    var {
      cArray,
      convertColorValue,
      createScale: createScale3,
      removeDuplicates
    } = require_utils();
    var { Color: Color3 } = require_color();
    var BackgroundColor2 = class extends Color3 {
      get backgroundColorScale() {
        if (!this._backgroundColorScale) {
          this._generateColorScale();
        }
        return this._backgroundColorScale;
      }
      _generateColorScale() {
        Color3.prototype._generateColorScale.call(this);
        const backgroundColorScale = createScale3({ swatches: 1e3, colorKeys: this._colorKeys, colorspace: this._colorspace, shift: 1, smooth: this._smooth });
        backgroundColorScale.push(...this.colorKeys);
        const colorObj = backgroundColorScale.map((c, i) => ({ value: Math.round(cArray(c)[2]), index: i }));
        const bgColorArrayFiltered = removeDuplicates(colorObj, "value").map((data) => backgroundColorScale[data.index]);
        bgColorArrayFiltered.length = 100;
        bgColorArrayFiltered.push("#ffffff");
        this._backgroundColorScale = bgColorArrayFiltered.map((color2) => convertColorValue(color2, this._output));
        return this._backgroundColorScale;
      }
    };
    module2.exports = { BackgroundColor: BackgroundColor2 };
  }
});

// node_modules/@adobe/leonardo-contrast-colors/theme.js
var require_theme = __commonJS({
  "node_modules/@adobe/leonardo-contrast-colors/theme.js"(exports2, module2) {
    var chroma = require_chroma();
    var {
      colorSpaces,
      convertColorValue,
      multiplyRatios,
      ratioName: ratioName2,
      round,
      searchColors
    } = require_utils();
    var { BackgroundColor: BackgroundColor2 } = require_backgroundcolor();
    var Theme2 = class {
      constructor({ colors, backgroundColor, lightness, contrast: contrast2 = 1, saturation = 100, output = "HEX" }) {
        this._output = output;
        this._colors = colors;
        this._lightness = lightness;
        this._saturation = saturation;
        this._setBackgroundColor(backgroundColor);
        this._setBackgroundColorValue();
        this._contrast = contrast2;
        if (!this._colors) {
          throw new Error("No colors are defined");
        }
        if (!this._backgroundColor) {
          throw new Error("Background color is undefined");
        }
        colors.forEach((color2) => {
          if (!color2.ratios)
            throw new Error(`Color ${color2.name}'s ratios are undefined`);
        });
        if (!colorSpaces[this._output]) {
          throw new Error(`Output \u201C${output}\u201D not supported`);
        }
        this._findContrastColors();
        this._findContrastColorPairs();
        this._findContrastColorValues();
      }
      set contrast(contrast2) {
        this._contrast = contrast2;
        this._findContrastColors();
      }
      get contrast() {
        return this._contrast;
      }
      set lightness(lightness) {
        this._lightness = lightness;
        this._setBackgroundColor(this._backgroundColor);
        this._findContrastColors();
      }
      get lightness() {
        return this._lightness;
      }
      set saturation(saturation) {
        this._saturation = saturation;
        this._updateColorSaturation(saturation);
        this._findContrastColors();
      }
      get saturation() {
        return this._saturation;
      }
      set backgroundColor(backgroundColor) {
        this._setBackgroundColor(backgroundColor);
        this._findContrastColors();
      }
      get backgroundColorValue() {
        return this._backgroundColorValue;
      }
      get backgroundColor() {
        return this._backgroundColor;
      }
      set colors(colors) {
        this._colors = colors;
        this._findContrastColors();
      }
      get colors() {
        return this._colors;
      }
      set addColor(color2) {
        this._colors.push(color2);
        this._findContrastColors();
      }
      set removeColor(color2) {
        const filteredColors = this._colors.filter((entry) => {
          return entry.name !== color2.name;
        });
        this._colors = filteredColors;
        this._findContrastColors();
      }
      set updateColor(param) {
        let currentColor = this._colors.filter((entry) => {
          return entry.name === param.color;
        });
        currentColor = currentColor[0];
        const filteredColors = this._colors.filter((entry) => {
          return entry.name !== param.color;
        });
        if (param.name)
          currentColor.name = param.name;
        if (param.colorKeys)
          currentColor.colorKeys = param.colorKeys;
        if (param.ratios)
          currentColor.ratios = param.ratios;
        if (param.colorspace)
          currentColor.colorspace = param.colorspace;
        if (param.smooth)
          currentColor.smooth = param.smooth;
        filteredColors.push(currentColor);
        this._colors = filteredColors;
        this._findContrastColors();
      }
      set output(output) {
        this._output = output;
        this._colors.forEach((element) => {
          element.output = this._output;
        });
        this._backgroundColor.output = this._output;
        this._findContrastColors();
      }
      get output() {
        return this._output;
      }
      get contrastColors() {
        return this._contrastColors;
      }
      get contrastColorPairs() {
        return this._contrastColorPairs;
      }
      get contrastColorValues() {
        return this._contrastColorValues;
      }
      _setBackgroundColor(backgroundColor) {
        if (typeof backgroundColor === "string") {
          const newBackgroundColor = new BackgroundColor2({ name: "background", colorKeys: [backgroundColor], output: "RGB" });
          const calcLightness = round(chroma(String(backgroundColor)).hsluv()[2]);
          this._backgroundColor = newBackgroundColor;
          this._lightness = calcLightness;
          this._backgroundColorValue = newBackgroundColor[this._lightness];
        } else {
          backgroundColor.output = "RGB";
          const calcBackgroundColorValue = backgroundColor.backgroundColorScale[this._lightness];
          this._backgroundColor = backgroundColor;
          this._backgroundColorValue = calcBackgroundColorValue;
        }
      }
      _setBackgroundColorValue() {
        this._backgroundColorValue = this._backgroundColor.backgroundColorScale[this._lightness];
      }
      _updateColorSaturation(saturation) {
        this._colors.map((color2) => {
          const colorKeys = color2.colorKeys;
          let newColorKeys = [];
          colorKeys.forEach((key) => {
            let currentHsluv = chroma(`${key}`).hsluv();
            let currentSaturation = currentHsluv[1];
            let newSaturation = currentSaturation * (saturation / 100);
            let newHsluv = chroma.hsluv(currentHsluv[0], newSaturation, currentHsluv[2]);
            let newColor = chroma.rgb(newHsluv).hex();
            newColorKeys.push(newColor);
          });
          color2.colorKeys = newColorKeys;
        });
      }
      _findContrastColors() {
        const bgRgbArray = chroma(String(this._backgroundColorValue)).rgb();
        const baseV = this._lightness / 100;
        const convertedBackgroundColorValue = convertColorValue(this._backgroundColorValue, this._output);
        const baseObj = { background: convertedBackgroundColorValue };
        const returnColors = [];
        const returnColorValues = [];
        const returnColorPairs = __spreadValues({}, baseObj);
        returnColors.push(baseObj);
        this._colors.map((color2) => {
          if (color2.ratios !== void 0) {
            let swatchNames;
            const newArr = [];
            const colorObj = {
              name: color2.name,
              values: newArr
            };
            let ratioValues;
            if (Array.isArray(color2.ratios)) {
              ratioValues = color2.ratios;
            } else if (!Array.isArray(color2.ratios)) {
              swatchNames = Object.keys(color2.ratios);
              ratioValues = Object.values(color2.ratios);
            }
            ratioValues = ratioValues.map((ratio) => multiplyRatios(+ratio, this._contrast));
            const contrastColors2 = searchColors(color2, bgRgbArray, baseV, ratioValues).map((clr) => convertColorValue(clr, this._output));
            for (let i = 0; i < contrastColors2.length; i++) {
              let n;
              if (!swatchNames) {
                const rVal = ratioName2(color2.ratios)[i];
                n = color2.name.concat(rVal);
              } else {
                n = swatchNames[i];
              }
              const obj = {
                name: n,
                contrast: ratioValues[i],
                value: contrastColors2[i]
              };
              newArr.push(obj);
              returnColorPairs[n] = contrastColors2[i];
              returnColorValues.push(contrastColors2[i]);
            }
            returnColors.push(colorObj);
          }
          return null;
        });
        this._contrastColorValues = returnColorValues;
        this._contrastColorPairs = returnColorPairs;
        this._contrastColors = returnColors;
        return this._contrastColors;
      }
      _findContrastColorPairs() {
        return this._contrastColorPairs;
      }
      _findContrastColorValues() {
        return this._contrastColorValues;
      }
    };
    module2.exports = { Theme: Theme2 };
  }
});

// node_modules/@adobe/leonardo-contrast-colors/index.js
var require_leonardo_contrast_colors = __commonJS({
  "node_modules/@adobe/leonardo-contrast-colors/index.js"(exports2, module2) {
    var chroma = require_chroma();
    var { extendChroma } = require_chroma_plus();
    var {
      convertColorValue,
      createScale: createScale3,
      getContrast,
      luminance: luminance2,
      minPositive: minPositive2,
      ratioName: ratioName2
    } = require_utils();
    var { Color: Color3 } = require_color();
    var { BackgroundColor: BackgroundColor2 } = require_backgroundcolor();
    var { Theme: Theme2 } = require_theme();
    extendChroma(chroma);
    module2.exports = {
      Color: Color3,
      BackgroundColor: BackgroundColor2,
      Theme: Theme2,
      createScale: createScale3,
      luminance: luminance2,
      contrast: getContrast,
      minPositive: minPositive2,
      ratioName: ratioName2,
      convertColorValue
    };
  }
});

// node_modules/@adobe/leonardo-contrast-colors/wrapper.mjs
var import_index = __toModule(require_leonardo_contrast_colors());
var createScale = import_index.default.createScale;
var luminance = import_index.default.luminance;
var contrast = import_index.default.contrast;
var binarySearch = import_index.default.binarySearch;
var minPositive = import_index.default.minPositive;
var ratioName = import_index.default.ratioName;
var BackgroundColor = import_index.default.BackgroundColor;
var Color = import_index.default.Color;
var Theme = import_index.default.Theme;

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color2() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color2, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color2))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color2, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color2))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
  if (s) {
    if (r === max)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color2, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// src/generateRamp.ts
var generateRamp = (state) => {
  console.log("$$generateRamp state:", state);
  const background = state.baseColor;
  const bg = color(background).rgb();
  const color2 = {
    name: `${state.colorScheme}`,
    ratios: state.inputRatios,
    colorKeys: state.colorKeys,
    colorspace: state.colorSpace
  };
  color2.colorKeys.map((key, index) => {
    color2.colorKeys[index] = ensureColorValueIsProperHex(key);
  });
  const uniqueInputs = [...new Set(color2.colorKeys)];
  let colorData = new Color(color2);
  let theme = new Theme({ colors: [colorData], backgroundColor: background, lightness: 100, contrast: 1 });
  let newColors = theme._contrastColorValues;
  const outputRatios = [];
  newColors.map((key) => {
    var outputRatio = contrast([rgb(key).r, rgb(key).g, rgb(key).b], [bg.r, bg.g, bg.b], 1);
    outputRatios.push(outputRatio);
  });
  const finalColors = [];
  newColors.map((key, index) => {
    finalColors.push({
      color: key,
      ratio: outputRatios[index].toFixed(2)
    });
  });
  let newArray = [];
  for (let i = 0; i < finalColors.length; i++) {
    let contrastDisplay;
    let color3 = finalColors[i].color;
    let colorRGB = rgb(color3);
    if (luminance(colorRGB.r, colorRGB.g, colorRGB.b) < 0.1848) {
      contrastDisplay = "#ffffff";
    } else {
      contrastDisplay = "#000000";
    }
    newArray[i] = __spreadProps(__spreadValues(__spreadValues({}, newArray[i]), finalColors[i]), {
      contrastDisplay
    });
  }
  const finalRamp = {
    name: state.colorScheme,
    colorSpace: color2.colorspace,
    colorKeys: uniqueInputs,
    baseColor: background,
    inputRatios: color2.ratios,
    outputRatios,
    results: finalColors,
    colorStops: state.colorStops,
    theme,
    combined: newArray
  };
  return finalRamp;
};
var ensureColorValueIsProperHex = (value, source = "your colors") => {
  let isValid = false;
  if (typeof value !== "string") {
    value = value.toString();
  }
  if (value.length === 4 && value.charAt(0) === "#") {
    value = value.slice(1);
  }
  if (value.startsWith("#") !== true && value.length === 3) {
    value = value.split("").map((v) => v + v).join("");
    value = "#" + value;
  }
  if (value.startsWith("#") !== true && value.length === 6) {
    value = "#" + value;
  }
  isValid = /^#([0-9A-F]{3}){1,2}$/i.test(value);
  if (isValid === false) {
    alert(`'${value}' is an invalid HEX code in ` + source);
    return "#FFFFFF";
  }
  return value.toUpperCase();
};

// src/drawRamp.ts
var parentProperties = {
  layoutMode: "HORIZONTAL",
  fills: [],
  itemSpacing: 16,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  primaryAxisSizingMode: "AUTO",
  counterAxisSizingMode: "AUTO"
};
var containerProperties = {
  layoutMode: "VERTICAL",
  fills: [],
  itemSpacing: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  primaryAxisSizingMode: "AUTO",
  counterAxisSizingMode: "AUTO"
};
var textContainerProperties = {
  layoutMode: "VERTICAL",
  primaryAxisSizingMode: "FIXED",
  counterAxisSizingMode: "AUTO",
  itemSpacing: 8,
  layoutAlign: "STRETCH",
  fills: []
};
var addPropertiesToContainer = (properties, container) => {
  Object.keys(properties).map((item, key) => {
    container[item] = properties[item];
  });
};
function hexToRgb(hex2) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex2);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 255, g: 0, b: 0 };
}
var createText = (str = "placeholder", fontSize = 12, fontName = { family: "Cera Pro", style: "Medium" }) => {
  let t = figma.createText();
  t.characters = str;
  t.fontSize = fontSize;
  t.fontName = fontName;
  return t;
};
var color_black = { color: hexToRgb("#141414"), type: "SOLID" };
var color_white = { color: hexToRgb("#ffffff"), type: "SOLID" };
var buildBox = (item) => {
  let container = figma.createFrame();
  addPropertiesToContainer(containerProperties, container);
  container.name = `${item.name} ${item.step} (${item.color_hex})`;
  container.layoutMode = "NONE";
  container.resize(384, 288);
  container.cornerRadius = 12;
  container.fills = [{ color: item.color_rgb, type: "SOLID" }];
  let text_container = figma.createFrame();
  container.appendChild(text_container);
  addPropertiesToContainer(textContainerProperties, text_container);
  text_container.primaryAxisAlignItems = "MIN";
  text_container.name = "TextFrame";
  text_container.x = 24;
  text_container.y = 24;
  let t_hexCode = createText(`${item.color_hex.toUpperCase()}`, 20);
  t_hexCode.name = "Color Hex value";
  t_hexCode.fills = [{ color: hexToRgb(item.reverse_hex), type: "SOLID" }];
  text_container.appendChild(t_hexCode);
  let t_colorStop = createText(`${item.name} ${item.step}`, 31, { family: "Cera Pro", style: "Bold" });
  t_colorStop.name = "Color Title";
  if (parseInt(item.step) < 500) {
    t_colorStop.fills = [color_black];
  } else {
    t_colorStop.fills = [color_white];
  }
  text_container.appendChild(t_colorStop);
  let text_container_low = figma.createFrame();
  container.appendChild(text_container_low);
  text_container_low.name = "Lower Text";
  text_container_low.x = 24;
  text_container_low.y = 176;
  text_container_low.itemSpacing = 0;
  addPropertiesToContainer(textContainerProperties, text_container_low);
  let t_wcag = createText(`${item.contrast}:1
${item.lt}
${item.st}`);
  t_wcag.name = "WCAG 2.1";
  text_container_low.appendChild(t_wcag);
  let t_a11yc = createText(`(todo) ${item.a11yc}`, 20);
  t_a11yc.name = "A11y Color";
  text_container_low.appendChild(t_a11yc);
  t_a11yc.fills = [{ color: hexToRgb(item.reverse_hex), type: "SOLID" }];
  return container;
};
var drawRamp = (data, opts) => {
  console.log("$$drawRamp data", data);
  let parent = figma.createFrame();
  addPropertiesToContainer(parentProperties, parent);
  parent.name = `${data.name} (${opts.colorSpace}, Generated)`;
  parent.x = figma.viewport.center.x;
  parent.y = figma.viewport.center.y;
  data.results.forEach((_res, i) => {
    const item = {
      name: `${data.name}`,
      step: data.colorStops[i],
      color_rgb: hexToRgb(data.results[i].color),
      color_hex: data.results[i].color,
      contrast: data.results[i].ratio,
      lt: "large text rating",
      st: "small text rating",
      a11yc: `todo ${data.results.length} ${data.results.length - (i + 1)}`,
      reverse_hex: data.results[data.results.length - (i + 1)].color
    };
    parent.appendChild(buildBox(item));
  });
  let ref_container = figma.createFrame();
  addPropertiesToContainer(textContainerProperties, ref_container);
  ref_container.name = "Reference Frame";
  ref_container.layoutMode = "NONE";
  ref_container.resize(384, 288);
  parent.appendChild(ref_container);
  let t_refcode = createText(`Reference Code`, 20);
  ref_container.appendChild(t_refcode);
  let t_info = createText(`${opts.sourceString}

Using ${opts.colorSpace} Colorspace`);
  t_info.y = 36;
  t_info.resize(384, 288 - 36);
  t_info.textAutoResize = "HEIGHT";
  ref_container.appendChild(t_info);
};

// src/plugin.ts
figma.loadFontAsync({ family: "Roboto", style: "Regular" });
figma.loadFontAsync({ family: "Cera Pro", style: "Medium" });
figma.loadFontAsync({ family: "Cera Pro", style: "Bold" });
figma.ui.onmessage = (opts) => {
  figma.closePlugin();
  return drawRamp(generateRamp(opts), opts);
};
figma.showUI(__html__, { visible: true, height: 320 });
/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */
