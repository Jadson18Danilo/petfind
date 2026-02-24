/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/tutor-profile",{

/***/ "./src/components/Header.js":
/*!**********************************!*\
  !*** ./src/components/Header.js ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "./src/components/Layout.js":
/*!**********************************!*\
  !*** ./src/components/Layout.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Layout; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Header */ \"./src/components/Header.js\");\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Header__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nfunction Layout(param) {\n    let { children, title } = param;\n    _s();\n    const [toasts, setToasts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        function handleToast(event) {\n            const { message, type = \"info\", duration = 2800 } = event.detail || {};\n            if (!message) return;\n            const id = Date.now() + Math.random();\n            setToasts((previous)=>[\n                    ...previous,\n                    {\n                        id,\n                        message,\n                        type\n                    }\n                ]);\n            window.setTimeout(()=>{\n                setToasts((previous)=>previous.filter((toast)=>toast.id !== id));\n            }, duration);\n        }\n        window.addEventListener(\"app:toast\", handleToast);\n        return ()=>window.removeEventListener(\"app:toast\", handleToast);\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"page\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_Header__WEBPACK_IMPORTED_MODULE_2___default()), {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Jadson Danilo\\\\Desktop\\\\petfind\\\\frontend\\\\src\\\\components\\\\Layout.js\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"container-page py-10\",\n                children: [\n                    title && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"section-title mb-4\",\n                        children: title\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Jadson Danilo\\\\Desktop\\\\petfind\\\\frontend\\\\src\\\\components\\\\Layout.js\",\n                        lineNumber: 28,\n                        columnNumber: 19\n                    }, this),\n                    children\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Jadson Danilo\\\\Desktop\\\\petfind\\\\frontend\\\\src\\\\components\\\\Layout.js\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this),\n            toasts.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"fixed top-20 right-4 z-120 flex flex-col gap-2 w-[min(92vw,360px)]\",\n                children: toasts.map((toast)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"rounded-2xl border px-4 py-3 shadow-lg text-sm font-medium \".concat(toast.type === \"success\" ? \"bg-green-50 border-green-200 text-green-700\" : toast.type === \"error\" ? \"bg-red-50 border-red-200 text-red-700\" : \"bg-white border-slate-200 text-slate-700\"),\n                        children: toast.message\n                    }, toast.id, false, {\n                        fileName: \"C:\\\\Users\\\\Jadson Danilo\\\\Desktop\\\\petfind\\\\frontend\\\\src\\\\components\\\\Layout.js\",\n                        lineNumber: 35,\n                        columnNumber: 13\n                    }, this))\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Jadson Danilo\\\\Desktop\\\\petfind\\\\frontend\\\\src\\\\components\\\\Layout.js\",\n                lineNumber: 33,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Jadson Danilo\\\\Desktop\\\\petfind\\\\frontend\\\\src\\\\components\\\\Layout.js\",\n        lineNumber: 25,\n        columnNumber: 5\n    }, this);\n}\n_s(Layout, \"oL0MrtDCqig+amxuKH2EOlnBcjg=\");\n_c = Layout;\nvar _c;\n$RefreshReg$(_c, \"Layout\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9MYXlvdXQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ3JCO0FBRWYsU0FBU0ksT0FBTyxLQUFtQjtRQUFuQixFQUFFQyxRQUFRLEVBQUVDLEtBQUssRUFBRSxHQUFuQjs7SUFDN0IsTUFBTSxDQUFDQyxRQUFRQyxVQUFVLEdBQUdOLCtDQUFRQSxDQUFDLEVBQUU7SUFFdkNELGdEQUFTQSxDQUFDO1FBQ1IsU0FBU1EsWUFBWUMsS0FBSztZQUN4QixNQUFNLEVBQUVDLE9BQU8sRUFBRUMsT0FBTyxNQUFNLEVBQUVDLFdBQVcsSUFBSSxFQUFFLEdBQUdILE1BQU1JLE1BQU0sSUFBSSxDQUFDO1lBQ3JFLElBQUksQ0FBQ0gsU0FBUztZQUVkLE1BQU1JLEtBQUtDLEtBQUtDLEdBQUcsS0FBS0MsS0FBS0MsTUFBTTtZQUNuQ1gsVUFBVSxDQUFDWSxXQUFhO3VCQUFJQTtvQkFBVTt3QkFBRUw7d0JBQUlKO3dCQUFTQztvQkFBSztpQkFBRTtZQUU1RFMsT0FBT0MsVUFBVSxDQUFDO2dCQUNoQmQsVUFBVSxDQUFDWSxXQUFhQSxTQUFTRyxNQUFNLENBQUMsQ0FBQ0MsUUFBVUEsTUFBTVQsRUFBRSxLQUFLQTtZQUNsRSxHQUFHRjtRQUNMO1FBRUFRLE9BQU9JLGdCQUFnQixDQUFDLGFBQWFoQjtRQUNyQyxPQUFPLElBQU1ZLE9BQU9LLG1CQUFtQixDQUFDLGFBQWFqQjtJQUN2RCxHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ2tCO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDekIsZ0RBQU1BOzs7OzswQkFDUCw4REFBQzBCO2dCQUFLRCxXQUFVOztvQkFDYnRCLHVCQUFTLDhEQUFDd0I7d0JBQUdGLFdBQVU7a0NBQXNCdEI7Ozs7OztvQkFDN0NEOzs7Ozs7O1lBR0ZFLE9BQU93QixNQUFNLEdBQUcsbUJBQ2YsOERBQUNKO2dCQUFJQyxXQUFVOzBCQUNackIsT0FBT3lCLEdBQUcsQ0FBQyxDQUFDUixzQkFDWCw4REFBQ0c7d0JBRUNDLFdBQVcsOERBTVYsT0FMQ0osTUFBTVosSUFBSSxLQUFLLFlBQ1gsZ0RBQ0FZLE1BQU1aLElBQUksS0FBSyxVQUNiLDBDQUNBO2tDQUdQWSxNQUFNYixPQUFPO3VCQVRUYSxNQUFNVCxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0IzQjtHQWhEd0JYO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0xheW91dC5qcz9mZTZiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExheW91dCh7IGNoaWxkcmVuLCB0aXRsZSB9KSB7XHJcbiAgY29uc3QgW3RvYXN0cywgc2V0VG9hc3RzXSA9IHVzZVN0YXRlKFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGhhbmRsZVRvYXN0KGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHsgbWVzc2FnZSwgdHlwZSA9ICdpbmZvJywgZHVyYXRpb24gPSAyODAwIH0gPSBldmVudC5kZXRhaWwgfHwge307XHJcbiAgICAgIGlmICghbWVzc2FnZSkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgaWQgPSBEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKTtcclxuICAgICAgc2V0VG9hc3RzKChwcmV2aW91cykgPT4gWy4uLnByZXZpb3VzLCB7IGlkLCBtZXNzYWdlLCB0eXBlIH1dKTtcclxuXHJcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzZXRUb2FzdHMoKHByZXZpb3VzKSA9PiBwcmV2aW91cy5maWx0ZXIoKHRvYXN0KSA9PiB0b2FzdC5pZCAhPT0gaWQpKTtcclxuICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdhcHA6dG9hc3QnLCBoYW5kbGVUb2FzdCk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FwcDp0b2FzdCcsIGhhbmRsZVRvYXN0KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIj5cclxuICAgICAgPEhlYWRlciAvPlxyXG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJjb250YWluZXItcGFnZSBweS0xMFwiPlxyXG4gICAgICAgIHt0aXRsZSAmJiA8aDEgY2xhc3NOYW1lPVwic2VjdGlvbi10aXRsZSBtYi00XCI+e3RpdGxlfTwvaDE+fVxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC9tYWluPlxyXG5cclxuICAgICAge3RvYXN0cy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIHRvcC0yMCByaWdodC00IHotMTIwIGZsZXggZmxleC1jb2wgZ2FwLTIgdy1bbWluKDkydncsMzYwcHgpXVwiPlxyXG4gICAgICAgICAge3RvYXN0cy5tYXAoKHRvYXN0KSA9PiAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBrZXk9e3RvYXN0LmlkfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJvdW5kZWQtMnhsIGJvcmRlciBweC00IHB5LTMgc2hhZG93LWxnIHRleHQtc20gZm9udC1tZWRpdW0gJHtcclxuICAgICAgICAgICAgICAgIHRvYXN0LnR5cGUgPT09ICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgICA/ICdiZy1ncmVlbi01MCBib3JkZXItZ3JlZW4tMjAwIHRleHQtZ3JlZW4tNzAwJ1xyXG4gICAgICAgICAgICAgICAgICA6IHRvYXN0LnR5cGUgPT09ICdlcnJvcidcclxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1yZWQtNTAgYm9yZGVyLXJlZC0yMDAgdGV4dC1yZWQtNzAwJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS03MDAnXHJcbiAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7dG9hc3QubWVzc2FnZX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJIZWFkZXIiLCJMYXlvdXQiLCJjaGlsZHJlbiIsInRpdGxlIiwidG9hc3RzIiwic2V0VG9hc3RzIiwiaGFuZGxlVG9hc3QiLCJldmVudCIsIm1lc3NhZ2UiLCJ0eXBlIiwiZHVyYXRpb24iLCJkZXRhaWwiLCJpZCIsIkRhdGUiLCJub3ciLCJNYXRoIiwicmFuZG9tIiwicHJldmlvdXMiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiZmlsdGVyIiwidG9hc3QiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRpdiIsImNsYXNzTmFtZSIsIm1haW4iLCJoMSIsImxlbmd0aCIsIm1hcCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/Layout.js\n"));

/***/ })

});