// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $('.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
localStorage.setItem('theme', 'dark.css');
var themeStylesheet = document.getElementById('theme_css');
var hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.bilibili.com'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}];

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  var $li;
  hashMap.forEach(function (item, index) {
    if (themeStylesheet.href.includes('style')) {
      $li = $("<li>\n            <div class=\"site\">\n                <div class=\"logo\">".concat(item.logo[0], "</div>\n                <div class=\"link\">").concat(simplifyUrl(item.url), "</div>\n                <div class=\"remove\">\n                <svg class=\"icon\">\n                        <use xlink:href=\"#icon-remove\"></use>\n                </svg>\n                </div>\n            </div>\n        </li>")).insertBefore($lastLi);
    } else {
      $li = $("<li>\n        <div class=\"site\">\n            <div class=\"logo\">".concat(item.logo[0], "</div>\n            <div class=\"link\">").concat(simplifyUrl(item.url), "</div>\n            <div class=\"remove\">\n            <svg class=\"icon\">\n                    <use xlink:href=\"#icon-darkR\"></use>\n            </svg>\n            </div>\n        </div>\n    </li>")).insertBefore($lastLi);
    }

    $li.on('click', function () {
      window.open(item.url);
    });
    $li.on('click', '.remove', function (e) {
      e.stopPropagation(); //阻止冒泡

      hashMap.splice(index, 1);
      render();
    });
  });
};

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("www.", '').replace('http://', '').replace('/\/.*/', ""); //删除/开头的内容直到结尾
};

render();
$('.addButton').on('click', function (e) {
  var url = window.prompt('请问要添加的网址是什么？');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});
$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    console.log(hashMap[i].logo);
    console.log(hashMap[i].url);

    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
$(document).on('DOMContentLoaded', function () {
  var addIcon = document.querySelector('.icon-wrapper use');
  var removeIcon = document.querySelectorAll('.remove use');
  console.log(removeIcon);
  var storedTheme = localStorage.getItem('theme');

  if (storedTheme) {
    themeStylesheet.href = storedTheme;
  }

  var theme = document.getElementById('theme');
  theme.addEventListener('click', function () {
    if (themeStylesheet.href.includes('style')) {
      themeStylesheet.href = 'dark.css';
      theme.innerHTML = "<svg class=\"icon\" aria-hidden=\"true\">\n            <use xlink:href=\"#icon-light\"></use>\n        </svg>";
      addIcon.href.animVal = "#icon-darkA";
      addIcon.href.baseVal = "#icon-darkA";
      removeIcon.forEach(function (item) {
        item.href.animVal = "#icon-darkR";
        item.href.baseVal = "#icon-darkR";
      });
    } else {
      themeStylesheet.href = 'style.css';
      theme.innerHTML = "<svg class=\"icon\" aria-hidden=\"true\">\n            <use xlink:href=\"#icon-dark\"></use>\n        </svg>";
      addIcon.href.animVal = "#icon-add";
      addIcon.href.baseVal = "#icon-add";
      removeIcon.forEach(function (item) {
        item.href.animVal = "#icon-remove";
        item.href.baseVal = "#icon-remove";
      });
    }

    localStorage.setItem('theme', themeStylesheet.href);
  });
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.cac4bedf.js.map