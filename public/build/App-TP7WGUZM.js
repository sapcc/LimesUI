import {
  __commonJS,
  __toESM,
  require_react,
  require_react_dom
} from "./chunk-E4BFALZD.js";

// node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type2) {
          return typeof type2 === "string" || typeof type2 === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type2 === REACT_FRAGMENT_TYPE || type2 === REACT_CONCURRENT_MODE_TYPE || type2 === REACT_PROFILER_TYPE || type2 === REACT_STRICT_MODE_TYPE || type2 === REACT_SUSPENSE_TYPE || type2 === REACT_SUSPENSE_LIST_TYPE || typeof type2 === "object" && type2 !== null && (type2.$$typeof === REACT_LAZY_TYPE || type2.$$typeof === REACT_MEMO_TYPE || type2.$$typeof === REACT_PROVIDER_TYPE || type2.$$typeof === REACT_CONTEXT_TYPE || type2.$$typeof === REACT_FORWARD_REF_TYPE || type2.$$typeof === REACT_FUNDAMENTAL_TYPE || type2.$$typeof === REACT_RESPONDER_TYPE || type2.$$typeof === REACT_SCOPE_TYPE || type2.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type2 = object.type;
                switch (type2) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type2;
                  default:
                    var $$typeofType = type2 && type2.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment3 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal2 = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement3(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment3;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal2;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement3;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/prop-types/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/prop-types/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message2 = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message2);
        }
        try {
          throw new Error(message2);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error(
                  (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                );
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning(
                "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
              );
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message2 = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message2);
        }
        try {
          throw new Error(message2);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement2, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message2, data) {
        this.message = message2;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3) {
                printWarning(
                  "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement2(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning(
                "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              );
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type2 = getPreciseType(value);
            if (type2 === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode4(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type2) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type2 + "`."
        );
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode4(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode4);
            }
            if (propValue === null || isValidElement2(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode4(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode4(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type2 = getPreciseType(value);
        switch (type2) {
          case "array":
          case "object":
            return "an " + type2;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type2;
          default:
            return type2;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React12 = require_react();
        var ReactSharedInternals = React12.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var useState34 = React12.useState, useEffect33 = React12.useEffect, useLayoutEffect4 = React12.useLayoutEffect, useDebugValue2 = React12.useDebugValue;
        var didWarnOld18Alpha = false;
        var didWarnUncachedGetSnapshot = false;
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          {
            if (!didWarnOld18Alpha) {
              if (React12.startTransition !== void 0) {
                didWarnOld18Alpha = true;
                error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
              }
            }
          }
          var value = getSnapshot();
          {
            if (!didWarnUncachedGetSnapshot) {
              var cachedValue = getSnapshot();
              if (!objectIs(value, cachedValue)) {
                error("The result of getSnapshot should be cached to avoid an infinite loop");
                didWarnUncachedGetSnapshot = true;
              }
            }
          }
          var _useState = useState34({
            inst: {
              value,
              getSnapshot
            }
          }), inst = _useState[0].inst, forceUpdate = _useState[1];
          useLayoutEffect4(function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
          }, [subscribe, value, getSnapshot]);
          useEffect33(function() {
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
            var handleStoreChange = function() {
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
            };
            return subscribe(handleStoreChange);
          }, [subscribe]);
          useDebugValue2(value);
          return value;
        }
        function checkIfSnapshotChanged(inst) {
          var latestGetSnapshot = inst.getSnapshot;
          var prevValue = inst.value;
          try {
            var nextValue = latestGetSnapshot();
            return !objectIs(prevValue, nextValue);
          } catch (error2) {
            return true;
          }
        }
        function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
          return getSnapshot();
        }
        var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
        var isServerEnvironment = !canUseDOM;
        var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
        var useSyncExternalStore$2 = React12.useSyncExternalStore !== void 0 ? React12.useSyncExternalStore : shim;
        exports.useSyncExternalStore = useSyncExternalStore$2;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React12 = require_react();
        var shim = require_shim();
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var useSyncExternalStore = shim.useSyncExternalStore;
        var useRef10 = React12.useRef, useEffect33 = React12.useEffect, useMemo12 = React12.useMemo, useDebugValue2 = React12.useDebugValue;
        function useSyncExternalStoreWithSelector2(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
          var instRef = useRef10(null);
          var inst;
          if (instRef.current === null) {
            inst = {
              hasValue: false,
              value: null
            };
            instRef.current = inst;
          } else {
            inst = instRef.current;
          }
          var _useMemo = useMemo12(function() {
            var hasMemo = false;
            var memoizedSnapshot;
            var memoizedSelection;
            var memoizedSelector = function(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                var _nextSelection = selector(nextSnapshot);
                if (isEqual !== void 0) {
                  if (inst.hasValue) {
                    var currentSelection = inst.value;
                    if (isEqual(currentSelection, _nextSelection)) {
                      memoizedSelection = currentSelection;
                      return currentSelection;
                    }
                  }
                }
                memoizedSelection = _nextSelection;
                return _nextSelection;
              }
              var prevSnapshot = memoizedSnapshot;
              var prevSelection = memoizedSelection;
              if (objectIs(prevSnapshot, nextSnapshot)) {
                return prevSelection;
              }
              var nextSelection = selector(nextSnapshot);
              if (isEqual !== void 0 && isEqual(prevSelection, nextSelection)) {
                return prevSelection;
              }
              memoizedSnapshot = nextSnapshot;
              memoizedSelection = nextSelection;
              return nextSelection;
            };
            var maybeGetServerSnapshot = getServerSnapshot === void 0 ? null : getServerSnapshot;
            var getSnapshotWithSelector = function() {
              return memoizedSelector(getSnapshot());
            };
            var getServerSnapshotWithSelector = maybeGetServerSnapshot === null ? void 0 : function() {
              return memoizedSelector(maybeGetServerSnapshot());
            };
            return [getSnapshotWithSelector, getServerSnapshotWithSelector];
          }, [getSnapshot, getServerSnapshot, selector, isEqual]), getSelection = _useMemo[0], getServerSelection = _useMemo[1];
          var value = useSyncExternalStore(subscribe, getSelection, getServerSelection);
          useEffect33(function() {
            inst.hasValue = true;
            inst.value = value;
          }, [value]);
          useDebugValue2(value);
          return value;
        }
        exports.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector2;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// src/App.js
var import_react98 = __toESM(require_react());

// node_modules/juno-ui-components/build/_rollupPluginBabelHelpers-2025bc13.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(a) {
    for (var b6, c2 = 1; c2 < arguments.length; c2++)
      for (var d in b6 = arguments[c2], b6)
        Object.prototype.hasOwnProperty.call(b6, d) && (a[d] = b6[d]);
    return a;
  }, _extends.apply(this, arguments);
}

// node_modules/juno-ui-components/build/AppBody.component-620e87d9.js
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var containerStyles = `
  jn-flex
  jn-flex-col
  jn-h-full
`;
var AppBody = ({ className: a, children: b6, ...c2 }) => import_react.default.createElement("div", _extends({ className: `juno-body ${containerStyles} ${a}` }, c2), b6);
AppBody.propTypes = { className: import_prop_types.default.string }, AppBody.defaultProps = { className: "" };

// node_modules/juno-ui-components/build/AppIntro.component-81ef98f9.js
var import_react2 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
var introStyles = `
  jn-pt-16
  jn-pb-14
  jn-text-xl
  in-pr-[45%]
`;
var AppIntro = ({ className: a, children: b6, ...c2 }) => import_react2.default.createElement("div", _extends({ className: `juno-app-intro ${introStyles} ${a}` }, c2), b6);
AppIntro.propTypes = { className: import_prop_types2.default.string }, AppIntro.defaultProps = { className: "" };

// node_modules/juno-ui-components/build/AppShell.component-9157efe5.js
var import_react9 = __toESM(require_react());
var import_prop_types9 = __toESM(require_prop_types());

// node_modules/juno-ui-components/build/PageHeader.component-216223fc.js
var React = __toESM(require_react());
var import_react3 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());
var _path;
var _path2;
var _defs;
var _excluded = ["title", "titleId"];
function _extends2() {
  return _extends2 = Object.assign ? Object.assign.bind() : function(a) {
    for (var b6, c2 = 1; c2 < arguments.length; c2++)
      for (var d in b6 = arguments[c2], b6)
        Object.prototype.hasOwnProperty.call(b6, d) && (a[d] = b6[d]);
    return a;
  }, _extends2.apply(this, arguments);
}
function _objectWithoutProperties(a, b6) {
  if (null == a)
    return {};
  var c2, d, e = _objectWithoutPropertiesLoose(a, b6);
  if (Object.getOwnPropertySymbols) {
    var f = Object.getOwnPropertySymbols(a);
    for (d = 0; d < f.length; d++)
      c2 = f[d], 0 <= b6.indexOf(c2) || Object.prototype.propertyIsEnumerable.call(a, c2) && (e[c2] = a[c2]);
  }
  return e;
}
function _objectWithoutPropertiesLoose(a, b6) {
  if (null == a)
    return {};
  var c2, d, e = {}, f = Object.keys(a);
  for (d = 0; d < f.length; d++)
    c2 = f[d], 0 <= b6.indexOf(c2) || (e[c2] = a[c2]);
  return e;
}
var SvgSapLogo = function(a) {
  var b6 = a.title, c2 = a.titleId, d = _objectWithoutProperties(a, _excluded);
  return React.createElement("svg", _extends2({ height: 40, viewBox: "0 0 82 40", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": c2 }, d), b6 === void 0 ? React.createElement("title", { id: c2 }, "SAP Logo") : b6 ? React.createElement("title", { id: c2 }, b6) : null, _path || (_path = React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0 40H41.2286L81.5789 0H0V40Z", fill: "url(#paint0_linear_250_2398)" })), _path2 || (_path2 = React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M48.2209 7.27111H40.2071V26.3527L33.2079 7.26518H26.268L20.2932 23.2232C19.6537 19.2001 15.5086 17.8103 12.2321 16.7684C10.0727 16.0745 7.78107 15.0524 7.81068 13.9216C7.82844 12.9964 9.04038 12.1423 11.4386 12.2649C13.0512 12.3499 14.4724 12.4804 17.3028 13.8465L20.0859 8.99304C17.4943 7.67836 13.9296 6.84606 11.0024 6.84211H10.9846C7.57382 6.84211 4.73151 7.9492 2.97085 9.77394C1.75165 11.0275 1.06473 12.7054 1.05426 14.4554C1.00886 16.9167 1.9109 18.6663 3.80578 20.0502C5.40458 21.2245 7.44947 21.9856 9.25355 22.5451C11.4781 23.2351 13.294 23.8361 13.2723 25.1152C13.2597 25.5867 13.0718 26.0365 12.7453 26.3765C12.1906 26.9498 11.3379 27.1673 10.1615 27.187C7.89358 27.2345 6.21385 26.8786 3.52747 25.2911L1.05426 30.2157C3.82299 31.7897 6.95026 32.6218 10.1339 32.6316H10.5504C13.3611 32.5822 15.631 31.7795 17.443 30.3166C17.5476 30.2355 17.6403 30.1505 17.7371 30.0635L16.9238 32.2085H24.1935L25.4153 28.4879C26.7952 28.9464 28.2407 29.1754 29.6945 29.166C31.1118 29.1729 32.5213 28.9561 33.8711 28.5235L35.0554 32.2085H46.9261V24.4984H49.5137C55.7728 24.4984 59.4737 21.3056 59.4737 15.9579C59.4737 10.0052 55.8774 7.27111 48.2209 7.27111ZM29.7024 23.6087C28.827 23.614 27.9578 23.4613 27.1364 23.158L29.6768 15.1335H29.7202L32.2171 23.1817C31.4089 23.4649 30.5587 23.6093 29.7024 23.6087ZM48.6907 18.9965H46.9261V12.5199H48.6907C51.0454 12.5199 52.9225 13.3107 52.9225 15.7108C52.9225 18.2017 51.0454 18.9866 48.6907 18.9866V18.9965Z", fill: "white" })), _defs || (_defs = React.createElement("defs", null, React.createElement("linearGradient", { id: "paint0_linear_250_2398", x1: 0, y1: 0, x2: 0, y2: 40, gradientUnits: "userSpaceOnUse" }, React.createElement("stop", { stopColor: "#00B8F1" }), React.createElement("stop", { offset: 0.02, stopColor: "#01B6F0" }), React.createElement("stop", { offset: 0.31, stopColor: "#0D90D9" }), React.createElement("stop", { offset: 0.58, stopColor: "#1775C8" }), React.createElement("stop", { offset: 0.82, stopColor: "#1C65BF" }), React.createElement("stop", { offset: 1, stopColor: "#1E5FBB" })))));
};
var basePageHeader = `
  jn-flex
  jn-items-center
  jn-bg-juno-grey-blue-11
  jn-sticky
  jn-top-0
  jn-px-6
  jn-py-3
  jn-z-50
`;
var logoStyles = `
  jn-h-6
  jn-mr-3
`;
var headingStyles = (a) => `
    jn-text-lg
    jn-text-theme-high
    ${a && "jn-cursor-pointer"}
    `;
var PageHeader = ({ heading: a, className: b6, children: c2, onClick: d, ...e }) => import_react3.default.createElement("div", _extends({ className: `juno-pageheader theme-dark ${basePageHeader} ${b6}`, role: "banner" }, e), import_react3.default.createElement(SvgSapLogo, { className: logoStyles, alt: "SAP" }), a && import_react3.default.createElement("div", { className: headingStyles(void 0 !== d), onClick: d }, a), c2);
PageHeader.propTypes = { heading: import_prop_types3.default.string, className: import_prop_types3.default.string, onClick: import_prop_types3.default.func }, PageHeader.defaultProps = { heading: null, className: "", onClick: void 0 };

// node_modules/juno-ui-components/build/MainContainer.component-923584de.js
var import_react4 = __toESM(require_react());
var import_prop_types4 = __toESM(require_prop_types());
var mainClasses = `
  jn-flex
  jn-flex-col
  jn-grow
  jn-bg-theme-global-bg
`;
var MainContainer = ({ className: a, children: b6, ...c2 }) => import_react4.default.createElement("main", _extends({ className: `juno-main ${mainClasses} ${a}` }, c2), b6);
MainContainer.propTypes = { className: import_prop_types4.default.string }, MainContainer.defaultProps = { className: "" };

// node_modules/juno-ui-components/build/ContentContainer.component-f0e8bd32.js
var import_react5 = __toESM(require_react());
var import_prop_types5 = __toESM(require_prop_types());
var containerStyles2 = `
  jn-flex
  jn-flex-col
  jn-grow
  jn-ml-8
  jn-bg-[right_top_1rem]
  jn-bg-no-repeat
  2xl:jn-container
  2xl:jn-mx-auto
`;
var ContentContainer = ({ className: a, children: b6, ...c2 }) => import_react5.default.createElement("div", _extends({ className: `juno-content-container ${containerStyles2} ${a}` }, c2), b6);
ContentContainer.propTypes = { className: import_prop_types5.default.string }, ContentContainer.defaultProps = { className: "" };

// node_modules/juno-ui-components/build/ContentAreaHeading.component-c1558d83.js
var import_react6 = __toESM(require_react());
var import_prop_types6 = __toESM(require_prop_types());
var toolbarStyles = `
  jn-font-bold
  jn-text-lg
  jn-text-theme-high
  jn-pb-2
  jn-pt-6
`;
var ContentAreaHeading = ({ heading: a, className: b6, children: c2, ...d }) => import_react6.default.createElement("h1", _extends({ className: `juno-content-area-heading ${toolbarStyles} ${b6}` }, d), a, c2);
ContentAreaHeading.propTypes = { heading: import_prop_types6.default.string, className: import_prop_types6.default.string }, ContentAreaHeading.defaultProps = { heading: "", className: "" };

// node_modules/juno-ui-components/build/ContentArea.component-ac2eedf3.js
var import_react7 = __toESM(require_react());
var import_prop_types7 = __toESM(require_prop_types());
var containerStyles3 = `
  jn-bg-theme-content-area-bg
  jn-relative
  jn-grow
  jn-overflow-hidden
`;
var ContentArea = ({ className: a, children: b6, ...c2 }) => import_react7.default.createElement("div", _extends({ className: `juno-content-area ${containerStyles3} ${a}` }, c2), b6);
ContentArea.propTypes = { className: import_prop_types7.default.string }, ContentArea.defaultProps = { className: "" };

// node_modules/juno-ui-components/build/PageFooter.component-8fd2ddef.js
var React2 = __toESM(require_react());
var import_react8 = __toESM(require_react());
var import_prop_types8 = __toESM(require_prop_types());
var _path3;
var _excluded2 = ["title", "titleId"];
function _extends3() {
  return _extends3 = Object.assign ? Object.assign.bind() : function(a) {
    for (var b6, c2 = 1; c2 < arguments.length; c2++)
      for (var d in b6 = arguments[c2], b6)
        Object.prototype.hasOwnProperty.call(b6, d) && (a[d] = b6[d]);
    return a;
  }, _extends3.apply(this, arguments);
}
function _objectWithoutProperties2(a, b6) {
  if (null == a)
    return {};
  var c2, d, e = _objectWithoutPropertiesLoose2(a, b6);
  if (Object.getOwnPropertySymbols) {
    var f = Object.getOwnPropertySymbols(a);
    for (d = 0; d < f.length; d++)
      c2 = f[d], 0 <= b6.indexOf(c2) || Object.prototype.propertyIsEnumerable.call(a, c2) && (e[c2] = a[c2]);
  }
  return e;
}
function _objectWithoutPropertiesLoose2(a, b6) {
  if (null == a)
    return {};
  var c2, d, e = {}, f = Object.keys(a);
  for (d = 0; d < f.length; d++)
    c2 = f[d], 0 <= b6.indexOf(c2) || (e[c2] = a[c2]);
  return e;
}
var SvgCcloudShape = function(a) {
  var b6 = a.title, c2 = a.titleId, d = _objectWithoutProperties2(a, _excluded2);
  return React2.createElement("svg", _extends3({ width: 59, height: 42, viewBox: "0 0 59 42", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": c2 }, d), b6 ? React2.createElement("title", { id: c2 }, b6) : null, _path3 || (_path3 = React2.createElement("path", { d: "M59.3825 11.1608C59.3545 11.1402 59.3267 11.1209 59.299 11.1029C56.8161 9.48915 53.8572 8.55235 50.6806 8.55235C49.5105 8.55235 48.3701 8.67944 47.272 8.92064C44.3685 3.66326 38.8166 0.108856 32.4447 0.108856C23.4894 0.108856 16.1537 7.12988 15.514 16.032L15.3487 16.0309L15.1066 16.0329C7.13468 16.1633 0.712036 22.728 0.712036 30.807C0.712036 35.0932 2.69502 38.9531 5.7492 41.6521H10.3029C6.42919 39.7347 3.75866 35.6852 3.75866 30.9998C3.75866 24.4639 8.95513 19.1655 15.3653 19.1655C16.2819 19.1655 17.1736 19.2738 18.0286 19.4792C17.9603 18.8925 17.9251 18.2952 17.9251 17.6896C17.9251 9.4705 24.4057 2.80763 32.4 2.80763C38.5297 2.80763 43.7695 6.72481 45.8801 12.2573C47.317 11.7139 48.8714 11.417 50.4937 11.417C53.699 11.417 56.6389 12.5758 58.9323 14.505C59.0819 14.6309 59.2321 14.8185 59.3825 15.0614V11.1608Z", fill: "#F0AB00" })));
};
var basePageFooter = `
  jn-flex
  jn-relative
  jn-bg-theme-global-bg
  jn-min-h-[3.25rem]
  jn-pl-6
  jn-pr-24
  jn-py-5
  jn-z-50
`;
var logoStyles2 = `
  jn-h-[2.625rem]
  jn-absolute
  jn-right-0
  jn-bottom-0
`;
var PageFooter = ({ className: a, children: b6, ...c2 }) => import_react8.default.createElement("div", _extends({ className: `juno-pagefooter ${basePageFooter} ${a}`, role: "contentinfo" }, c2), b6, import_react8.default.createElement(SvgCcloudShape, { className: logoStyles2, alt: "cloud shape" }));
PageFooter.propTypes = { className: import_prop_types8.default.string }, PageFooter.defaultProps = { className: "" };

// node_modules/juno-ui-components/build/AppShell.component-9157efe5.js
var AppShell = ({ pageHeader: a, pageFooter: b6, topNavigation: c2, contentHeading: d, embedded: e, className: f, children: g, ...h }) => import_react9.default.createElement(AppBody, _extends({ className: f }, h), e ? import_react9.default.createElement(ContentArea, null, g) : import_react9.default.createElement(import_react9.default.Fragment, null, a && ("string" == typeof a || a instanceof String) ? import_react9.default.createElement(PageHeader, { heading: a }) : a, c2 && c2, import_react9.default.createElement(MainContainer, null, import_react9.default.createElement(ContentContainer, null, import_react9.default.createElement(ContentAreaHeading, { heading: d }), import_react9.default.createElement(ContentArea, null, g))), b6 ? b6 : import_react9.default.createElement(PageFooter, null)));
AppShell.propTypes = { pageHeader: import_prop_types9.default.oneOfType([import_prop_types9.default.string, import_prop_types9.default.element]), pageFooter: import_prop_types9.default.element, topNavigation: import_prop_types9.default.element, contentHeading: import_prop_types9.default.string, embedded: import_prop_types9.default.bool, className: import_prop_types9.default.string }, AppShell.defaultProps = { pageHeader: import_react9.default.createElement(PageHeader, null), pageFooter: import_react9.default.createElement(PageFooter, null), topNavigation: void 0, contentHeading: "", embedded: false, className: "" };

// node_modules/juno-ui-components/build/AppShellProvider.component-4104aef6.js
var import_react93 = __toESM(require_react());
var import_prop_types92 = __toESM(require_prop_types());

// node_modules/juno-ui-components/build/Badge.component-b408dd7f.js
var import_react11 = __toESM(require_react());
var import_prop_types11 = __toESM(require_prop_types());

// node_modules/juno-ui-components/build/Icon.component-30024ef2.js
var React3 = __toESM(require_react());
var import_react10 = __toESM(require_react());
var import_prop_types10 = __toESM(require_prop_types());
var _path$G;
var _excluded$G = ["title", "titleId"];
function _extends$G() {
  return _extends$G = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$G.apply(this, arguments);
}
function _objectWithoutProperties$G(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$G(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$G(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$F;
var SvgAccountCircle = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$G(e, _excluded$G);
  return React3.createElement("svg", _extends$G({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$G || (_path$G = React3.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z" })));
};
var _excluded$F = ["title", "titleId"];
function _extends$F() {
  return _extends$F = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$F.apply(this, arguments);
}
function _objectWithoutProperties$F(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$F(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$F(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$E;
var SvgAddCircle = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$F(e, _excluded$F);
  return React3.createElement("svg", _extends$F({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$F || (_path$F = React3.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" })));
};
var _excluded$E = ["title", "titleId"];
function _extends$E() {
  return _extends$E = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$E.apply(this, arguments);
}
function _objectWithoutProperties$E(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$E(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$E(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$D;
var SvgAutoAwesomeMosaic = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$E(e, _excluded$E);
  return React3.createElement("svg", _extends$E({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$E || (_path$E = React3.createElement("path", { d: "M3 5v14a2 2 0 0 0 2 2h6V3H5a2 2 0 0 0-2 2zm16-2h-6v8h8V5c0-1.1-.9-2-2-2zm-6 18h6c1.1 0 2-.9 2-2v-6h-8v8z" })));
};
var _excluded$D = ["title", "titleId"];
function _extends$D() {
  return _extends$D = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$D.apply(this, arguments);
}
function _objectWithoutProperties$D(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$D(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$D(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$C;
var SvgAutoAwesomeMotion = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$D(e, _excluded$D);
  return React3.createElement("svg", _extends$D({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$D || (_path$D = React3.createElement("path", { d: "M14 2H4a2 2 0 0 0-2 2v10h2V4h10V2zm4 4H8a2 2 0 0 0-2 2v10h2V8h10V6zm2 4h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2z" })));
};
var _excluded$C = ["title", "titleId"];
function _extends$C() {
  return _extends$C = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$C.apply(this, arguments);
}
function _objectWithoutProperties$C(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$C(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$C(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$B;
var SvgBolt = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$C(e, _excluded$C);
  return React3.createElement("svg", _extends$C({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$C || (_path$C = React3.createElement("path", { d: "M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z" })));
};
var _excluded$B = ["title", "titleId"];
function _extends$B() {
  return _extends$B = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$B.apply(this, arguments);
}
function _objectWithoutProperties$B(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$B(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$B(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$A;
var SvgCancel = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$B(e, _excluded$B);
  return React3.createElement("svg", _extends$B({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$B || (_path$B = React3.createElement("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })));
};
var _excluded$A = ["title", "titleId"];
function _extends$A() {
  return _extends$A = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$A.apply(this, arguments);
}
function _objectWithoutProperties$A(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$A(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$A(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$z;
var SvgCheckCircle = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$A(e, _excluded$A);
  return React3.createElement("svg", _extends$A({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$A || (_path$A = React3.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })));
};
var _excluded$z = ["title", "titleId"];
function _extends$z() {
  return _extends$z = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$z.apply(this, arguments);
}
function _objectWithoutProperties$z(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$z(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$z(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$y;
var SvgChevronLeft = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$z(e, _excluded$z);
  return React3.createElement("svg", _extends$z({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$z || (_path$z = React3.createElement("path", { d: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" })));
};
var _excluded$y = ["title", "titleId"];
function _extends$y() {
  return _extends$y = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$y.apply(this, arguments);
}
function _objectWithoutProperties$y(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$y(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$y(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$x;
var SvgChevronRight = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$y(e, _excluded$y);
  return React3.createElement("svg", _extends$y({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$y || (_path$y = React3.createElement("path", { d: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" })));
};
var _excluded$x = ["title", "titleId"];
function _extends$x() {
  return _extends$x = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$x.apply(this, arguments);
}
function _objectWithoutProperties$x(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$x(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$x(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$w;
var SvgClose = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$x(e, _excluded$x);
  return React3.createElement("svg", _extends$x({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$x || (_path$x = React3.createElement("path", { d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })));
};
var _excluded$w = ["title", "titleId"];
function _extends$w() {
  return _extends$w = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$w.apply(this, arguments);
}
function _objectWithoutProperties$w(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$w(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$w(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$v;
var SvgContentCopy = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$w(e, _excluded$w);
  return React3.createElement("svg", _extends$w({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$w || (_path$w = React3.createElement("path", { d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" })));
};
var _excluded$v = ["title", "titleId"];
function _extends$v() {
  return _extends$v = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$v.apply(this, arguments);
}
function _objectWithoutProperties$v(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$v(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$v(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$u;
var SvgJunoDanger = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$v(e, _excluded$v);
  return React3.createElement("svg", _extends$v({ width: "24px", height: "24px", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$v || (_path$v = React3.createElement("path", { d: "M22,17.9999996 L22,19.9999996 L2,19.9999996 L2,17.9999996 L22,17.9999996 Z M12,6.428571 C14.7642857,6.428571 17.0146825,8.23991359 17.1375716,10.5179164 L17.1428571,10.7142853 L17.1428571,16.7142853 L6.85714286,16.7142853 L6.85714286,10.7142853 L6.86242835,10.5179164 C6.98531746,8.23991359 9.23571429,6.428571 12,6.428571 Z M12,7.71428529 L12,15.428571 L15.8571429,15.428571 L15.8571429,11.1428567 L15.851803,10.960591 C15.745448,9.15003461 14.0636603,7.71428529 12,7.71428529 Z M19.075912,3.96838198 L20.490712,5.38218198 L18.370012,7.50438202 L16.955212,6.09058202 L19.075912,3.96838198 Z M4.956739,3.939208 L7.078039,6.060508 L5.663839,7.474708 L3.542539,5.353408 L4.956739,3.939208 Z M13,1.428571 L13,4.428571 L11,4.428571 L11,1.428571 L13,1.428571 Z" })));
};
var _excluded$u = ["title", "titleId"];
function _extends$u() {
  return _extends$u = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$u.apply(this, arguments);
}
function _objectWithoutProperties$u(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$u(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$u(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$t;
var SvgDangerous = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$u(e, _excluded$u);
  return React3.createElement("svg", _extends$u({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$u || (_path$u = React3.createElement("path", { d: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM17 15.74 15.74 17 12 13.26 8.26 17 7 15.74 10.74 12 7 8.26 8.26 7 12 10.74 15.74 7 17 8.26 13.26 12 17 15.74z" })));
};
var _excluded$t = ["title", "titleId"];
function _extends$t() {
  return _extends$t = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$t.apply(this, arguments);
}
function _objectWithoutProperties$t(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$t(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$t(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$s;
var SvgDownload = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$t(e, _excluded$t);
  return React3.createElement("svg", _extends$t({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$t || (_path$t = React3.createElement("path", { d: "M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" })));
};
var _excluded$s = ["title", "titleId"];
function _extends$s() {
  return _extends$s = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$s.apply(this, arguments);
}
function _objectWithoutProperties$s(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$s(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$s(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$r;
var SvgDeleteForever = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$s(e, _excluded$s);
  return React3.createElement("svg", _extends$s({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$s || (_path$s = React3.createElement("path", { d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" })));
};
var _excluded$r = ["title", "titleId"];
function _extends$r() {
  return _extends$r = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$r.apply(this, arguments);
}
function _objectWithoutProperties$r(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$r(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$r(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$q;
var SvgDescription = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$r(e, _excluded$r);
  return React3.createElement("svg", _extends$r({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$r || (_path$r = React3.createElement("path", { d: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" })));
};
var _excluded$q = ["title", "titleId"];
function _extends$q() {
  return _extends$q = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$q.apply(this, arguments);
}
function _objectWithoutProperties$q(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$q(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$q(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$p;
var SvgDns = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$q(e, _excluded$q);
  return React3.createElement("svg", _extends$q({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$q || (_path$q = React3.createElement("path", { d: "M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" })));
};
var _excluded$p = ["title", "titleId"];
function _extends$p() {
  return _extends$p = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$p.apply(this, arguments);
}
function _objectWithoutProperties$p(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$p(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$p(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$o;
var SvgEdit = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$p(e, _excluded$p);
  return React3.createElement("svg", _extends$p({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$p || (_path$p = React3.createElement("path", { d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" })));
};
var _excluded$o = ["title", "titleId"];
function _extends$o() {
  return _extends$o = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$o.apply(this, arguments);
}
function _objectWithoutProperties$o(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$o(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$o(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$n;
var SvgErrorOutline = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$o(e, _excluded$o);
  return React3.createElement("svg", _extends$o({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$o || (_path$o = React3.createElement("path", { d: "M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" })));
};
var _excluded$n = ["title", "titleId"];
function _extends$n() {
  return _extends$n = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$n.apply(this, arguments);
}
function _objectWithoutProperties$n(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$n(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$n(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$m;
var SvgExitToApp = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$n(e, _excluded$n);
  return React3.createElement("svg", _extends$n({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$n || (_path$n = React3.createElement("path", { d: "M10.09 15.59 11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" })));
};
var _excluded$m = ["title", "titleId"];
function _extends$m() {
  return _extends$m = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$m.apply(this, arguments);
}
function _objectWithoutProperties$m(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$m(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$m(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$l;
var SvgExpandLess = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$m(e, _excluded$m);
  return React3.createElement("svg", _extends$m({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$m || (_path$m = React3.createElement("path", { d: "m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" })));
};
var _excluded$l = ["title", "titleId"];
function _extends$l() {
  return _extends$l = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$l.apply(this, arguments);
}
function _objectWithoutProperties$l(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$l(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$l(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$k;
var SvgExpandMore = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$l(e, _excluded$l);
  return React3.createElement("svg", _extends$l({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$l || (_path$l = React3.createElement("path", { d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" })));
};
var _excluded$k = ["title", "titleId"];
function _extends$k() {
  return _extends$k = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$k.apply(this, arguments);
}
function _objectWithoutProperties$k(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$k(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$k(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$j;
var SvgFilterAlt = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$k(e, _excluded$k);
  return React3.createElement("svg", _extends$k({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$k || (_path$k = React3.createElement("path", { d: "M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0 0 18.95 4H5.04c-.83 0-1.3.95-.79 1.61z" })));
};
var _excluded$j = ["title", "titleId"];
function _extends$j() {
  return _extends$j = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$j.apply(this, arguments);
}
function _objectWithoutProperties$j(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$j(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$j(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$i;
var SvgForum = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$j(e, _excluded$j);
  return React3.createElement("svg", _extends$j({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$j || (_path$j = React3.createElement("path", { d: "M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" })));
};
var _excluded$i = ["title", "titleId"];
function _extends$i() {
  return _extends$i = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$i.apply(this, arguments);
}
function _objectWithoutProperties$i(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$i(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$i(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$h;
var _path2$6;
var SvgHelp = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$i(e, _excluded$i);
  return React3.createElement("svg", _extends$i({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$i || (_path$i = React3.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" })));
};
var _excluded$h = ["title", "titleId"];
function _extends$h() {
  return _extends$h = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$h.apply(this, arguments);
}
function _objectWithoutProperties$h(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$h(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$h(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$g;
var SvgHomeSharp = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$h(e, _excluded$h);
  return React3.createElement("svg", _extends$h({ xmlns: "http://www.w3.org/2000/svg", height: 24, viewBox: "0 0 24 24", width: 24, "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$h || (_path$h = React3.createElement("path", { d: "M0 0h24v24H0V0z", fill: "none" })), _path2$6 || (_path2$6 = React3.createElement("path", { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" })));
};
var _excluded$g = ["title", "titleId"];
function _extends$g() {
  return _extends$g = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$g.apply(this, arguments);
}
function _objectWithoutProperties$g(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$g(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$g(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$f;
var SvgInfo = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$g(e, _excluded$g);
  return React3.createElement("svg", _extends$g({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$g || (_path$g = React3.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" })));
};
var _excluded$f = ["title", "titleId"];
function _extends$f() {
  return _extends$f = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$f.apply(this, arguments);
}
function _objectWithoutProperties$f(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$f(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$f(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _circle;
var _path$e;
var SvgComment = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$f(e, _excluded$f);
  return React3.createElement("svg", _extends$f({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$f || (_path$f = React3.createElement("path", { d: "M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" })));
};
var _excluded$e = ["title", "titleId"];
function _extends$e() {
  return _extends$e = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$e.apply(this, arguments);
}
function _objectWithoutProperties$e(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$e(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$e(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$d;
var _path2$5;
var SvgManageAccounts = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$e(e, _excluded$e);
  return React3.createElement("svg", _extends$e({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _circle || (_circle = React3.createElement("circle", { cx: 10, cy: 8, r: 4 })), _path$e || (_path$e = React3.createElement("path", { d: "M10.67 13.02c-.22-.01-.44-.02-.67-.02-2.42 0-4.68.67-6.61 1.82-.88.52-1.39 1.5-1.39 2.53V20h9.26a6.963 6.963 0 0 1-.59-6.98zM20.75 16c0-.22-.03-.42-.06-.63l1.14-1.01-1-1.73-1.45.49c-.32-.27-.68-.48-1.08-.63L18 11h-2l-.3 1.49c-.4.15-.76.36-1.08.63l-1.45-.49-1 1.73 1.14 1.01c-.03.21-.06.41-.06.63s.03.42.06.63l-1.14 1.01 1 1.73 1.45-.49c.32.27.68.48 1.08.63L16 21h2l.3-1.49c.4-.15.76-.36 1.08-.63l1.45.49 1-1.73-1.14-1.01c.03-.21.06-.41.06-.63zM17 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" })));
};
var _excluded$d = ["title", "titleId"];
function _extends$d() {
  return _extends$d = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$d.apply(this, arguments);
}
function _objectWithoutProperties$d(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$d(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$d(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$c;
var SvgMonitorHeart = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$d(e, _excluded$d);
  return React3.createElement("svg", _extends$d({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$d || (_path$d = React3.createElement("path", { d: "M20 4H4c-1.1 0-2 .9-2 2v3h2V6h16v3h2V6c0-1.1-.9-2-2-2zm0 14H4v-3H2v3c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-3h-2v3z" })), _path2$5 || (_path2$5 = React3.createElement("path", { d: "M14.89 7.55c-.34-.68-1.45-.68-1.79 0L10 13.76l-1.11-2.21A.988.988 0 0 0 8 11H2v2h5.38l1.72 3.45c.18.34.52.55.9.55s.72-.21.89-.55L14 10.24l1.11 2.21c.17.34.51.55.89.55h6v-2h-5.38l-1.73-3.45z" })));
};
var _excluded$c = ["title", "titleId"];
function _extends$c() {
  return _extends$c = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$c.apply(this, arguments);
}
function _objectWithoutProperties$c(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$c(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$c(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$b;
var SvgMoreVert = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$c(e, _excluded$c);
  return React3.createElement("svg", _extends$c({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$c || (_path$c = React3.createElement("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })));
};
var _excluded$b = ["title", "titleId"];
function _extends$b() {
  return _extends$b = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$b.apply(this, arguments);
}
function _objectWithoutProperties$b(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$b(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$b(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$a;
var SvgNotificationsOff = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$b(e, _excluded$b);
  return React3.createElement("svg", _extends$b({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$b || (_path$b = React3.createElement("path", { d: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm0-15.5c2.49 0 4 2.02 4 4.5v.1l2 2V11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.24.06-.47.15-.69.23l1.64 1.64c.18-.02.36-.05.55-.05zM5.41 3.35 4 4.76l2.81 2.81C6.29 8.57 6 9.74 6 11v5l-2 2v1h14.24l1.74 1.74 1.41-1.41L5.41 3.35zM16 17H8v-6c0-.68.12-1.32.34-1.9L16 16.76V17z" })));
};
var _excluded$a = ["title", "titleId"];
function _extends$a() {
  return _extends$a = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$a.apply(this, arguments);
}
function _objectWithoutProperties$a(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$a(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$a(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$9;
var SvgOpenInBrowser = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$a(e, _excluded$a);
  return React3.createElement("svg", _extends$a({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$a || (_path$a = React3.createElement("path", { d: "M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6a2 2 0 0 0-2-2zm-7 6-4 4h3v6h2v-6h3l-4-4z" })));
};
var _excluded$9 = ["title", "titleId"];
function _extends$9() {
  return _extends$9 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$9.apply(this, arguments);
}
function _objectWithoutProperties$9(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$9(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$9(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$8;
var _path2$4;
var SvgOpenInNew = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$9(e, _excluded$9);
  return React3.createElement("svg", _extends$9({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$9 || (_path$9 = React3.createElement("path", { d: "M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" })));
};
var _excluded$8 = ["title", "titleId"];
function _extends$8() {
  return _extends$8 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$8.apply(this, arguments);
}
function _objectWithoutProperties$8(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$8(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$8(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$7;
var SvgPlace = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$8(e, _excluded$8);
  return React3.createElement("svg", _extends$8({ xmlns: "http://www.w3.org/2000/svg", height: 24, viewBox: "0 0 24 24", width: 24, "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$8 || (_path$8 = React3.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })), _path2$4 || (_path2$4 = React3.createElement("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" })));
};
var _excluded$7 = ["title", "titleId"];
function _extends$7() {
  return _extends$7 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$7.apply(this, arguments);
}
function _objectWithoutProperties$7(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$7(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$7(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$6;
var SvgCheckBox = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$7(e, _excluded$7);
  return React3.createElement("svg", _extends$7({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$7 || (_path$7 = React3.createElement("path", { d: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })));
};
var _excluded$6 = ["title", "titleId"];
function _extends$6() {
  return _extends$6 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$6.apply(this, arguments);
}
function _objectWithoutProperties$6(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$6(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$6(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$5;
var _path2$3;
var _path3$3;
var _path4$2;
var SvgSearch = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$6(e, _excluded$6);
  return React3.createElement("svg", _extends$6({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$6 || (_path$6 = React3.createElement("path", { d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" })));
};
var _excluded$5 = ["title", "titleId"];
function _extends$5() {
  return _extends$5 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$5.apply(this, arguments);
}
function _objectWithoutProperties$5(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$5(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$5(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$4;
var _path2$2;
var _path3$2;
var _path4$1;
var SvgJunoSeverityLow = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$5(e, _excluded$5);
  return React3.createElement("svg", _extends$5({ width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$5 || (_path$5 = React3.createElement("path", { d: "M15.7956 22H14.5955L15.7956 14.2222H11.5955C10.8994 14.2222 10.9114 13.8667 11.1395 13.4889C11.3675 13.1111 11.1995 13.4 11.2235 13.3556C12.7715 10.8222 15.0995 7.04444 18.1956 2L19.3956 2L18.1956 9.77778H22.3957C22.9837 9.77778 23.0677 10.1444 22.9597 10.3444L22.8757 10.5111C18.1476 18.1667 15.7956 22 15.7956 22Z" })), _path2$3 || (_path2$3 = React3.createElement("path", { d: "M2 17H8V23H2V17Z" })), _path3$3 || (_path3$3 = React3.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7 10H3V14H7V10ZM2 9V15H8V9H2Z" })), _path4$2 || (_path4$2 = React3.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7 2H3V6H7V2ZM2 1V7H8V1H2Z" })));
};
var _excluded$4 = ["title", "titleId"];
function _extends$4() {
  return _extends$4 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$4.apply(this, arguments);
}
function _objectWithoutProperties$4(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$4(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$4(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$3;
var _path2$1;
var _path3$1;
var _path4;
var SvgJunoSeverityMedium = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$4(e, _excluded$4);
  return React3.createElement("svg", _extends$4({ width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$4 || (_path$4 = React3.createElement("path", { d: "M15.7956 22H14.5955L15.7956 14.2222H11.5955C10.8994 14.2222 10.9114 13.8667 11.1395 13.4889C11.3675 13.1111 11.1995 13.4 11.2235 13.3556C12.7715 10.8222 15.0995 7.04444 18.1956 2L19.3956 2L18.1956 9.77778H22.3957C22.9837 9.77778 23.0677 10.1444 22.9597 10.3444L22.8757 10.5111C18.1476 18.1667 15.7956 22 15.7956 22Z" })), _path2$2 || (_path2$2 = React3.createElement("path", { d: "M2 17H8V23H2V17Z" })), _path3$2 || (_path3$2 = React3.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2 9V15H8V9H2Z" })), _path4$1 || (_path4$1 = React3.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7 2H3V6H7V2ZM2 1V7H8V1H2Z" })));
};
var _excluded$3 = ["title", "titleId"];
function _extends$3() {
  return _extends$3 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$3.apply(this, arguments);
}
function _objectWithoutProperties$3(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$3(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$3(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$2;
var _path22;
var _path32;
var SvgJunoSeverityHigh = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$3(e, _excluded$3);
  return React3.createElement("svg", _extends$3({ width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$3 || (_path$3 = React3.createElement("path", { d: "M15.7956 22H14.5955L15.7956 14.2222H11.5955C10.8994 14.2222 10.9114 13.8667 11.1395 13.4889C11.3675 13.1111 11.1995 13.4 11.2235 13.3556C12.7715 10.8222 15.0995 7.04444 18.1956 2L19.3956 2L18.1956 9.77778H22.3957C22.9837 9.77778 23.0677 10.1444 22.9597 10.3444L22.8757 10.5111C18.1476 18.1667 15.7956 22 15.7956 22Z" })), _path2$1 || (_path2$1 = React3.createElement("path", { d: "M2 17H8V23H2V17Z" })), _path3$1 || (_path3$1 = React3.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2 9V15H8V9H2Z" })), _path4 || (_path4 = React3.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2 1V7H8V1H2Z" })));
};
var _excluded$2 = ["title", "titleId"];
function _extends$2() {
  return _extends$2 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$2.apply(this, arguments);
}
function _objectWithoutProperties$2(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$2(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$2(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path$1;
var SvgJunoSeverityCritical = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$2(e, _excluded$2);
  return React3.createElement("svg", _extends$2({ width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$2 || (_path$2 = React3.createElement("path", { d: "M15.7956 22H14.5955L15.7956 14.2222H11.5955C10.8994 14.2222 10.9114 13.8667 11.1395 13.4889C11.3675 13.1111 11.1995 13.4 11.2235 13.3556C12.7715 10.8222 15.0995 7.04445 18.1956 2H19.3956L18.1956 9.77778H22.3957C22.9837 9.77778 23.0677 10.1444 22.9597 10.3444L22.8757 10.5111C18.1476 18.1667 15.7956 22 15.7956 22Z" })), _path22 || (_path22 = React3.createElement("path", { d: "M2 17H8V23H2V17Z" })), _path32 || (_path32 = React3.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2 1L2 15H8V1H2Z" })));
};
var _excluded$1 = ["title", "titleId"];
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends$1.apply(this, arguments);
}
function _objectWithoutProperties$1(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose$1(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose$1(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var _path5;
var SvgWarning = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties$1(e, _excluded$1);
  return React3.createElement("svg", _extends$1({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path$1 || (_path$1 = React3.createElement("path", { d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" })));
};
var _excluded3 = ["title", "titleId"];
function _extends4() {
  return _extends4 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, l = 1; l < arguments.length; l++)
      for (var n in t = arguments[l], t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }, _extends4.apply(this, arguments);
}
function _objectWithoutProperties3(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = _objectWithoutPropertiesLoose3(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      l = a[n], 0 <= t.indexOf(l) || Object.prototype.propertyIsEnumerable.call(e, l) && (r2[l] = e[l]);
  }
  return r2;
}
function _objectWithoutPropertiesLoose3(e, t) {
  if (null == e)
    return {};
  var l, n, r2 = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    l = a[n], 0 <= t.indexOf(l) || (r2[l] = e[l]);
  return r2;
}
var SvgWidgets = function(e) {
  var t = e.title, l = e.titleId, i = _objectWithoutProperties3(e, _excluded3);
  return React3.createElement("svg", _extends4({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", "aria-labelledby": l }, i), t ? React3.createElement("title", { id: l }, t) : null, _path5 || (_path5 = React3.createElement("path", { d: "M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z" })));
};
var anchorIconStyles = `
	jn-text-current
  hover:jn-text-theme-high
  focus:jn-outline-none 
  focus-visible:jn-ring-2
  focus-visible:jn-ring-theme-focus
  focus-visible:jn-ring-offset-1
  focus-visible:jn-ring-offset-theme-focus
	disabled:jn-opacity-50
	disabled:jn-cursor-not-allowed
`;
var buttonIconStyles = `
  hover:jn-text-theme-high
  focus:jn-outline-none 
  focus-visible:jn-ring-2
  focus-visible:jn-ring-theme-focus
  focus-visible:jn-ring-offset-1
  focus-visible:jn-ring-offset-theme-focus
	disabled:jn-opacity-50
	disabled:jn-cursor-not-allowed
`;
var knownIcons = ["accountCircle", "addCircle", "autoAwesomeMosaic", "autoAwesomeMotion", "bolt", "cancel", "checkCircle", "chevronLeft", "chevronRight", "close", "comment", "contentCopy", "danger", "dangerous", "default", "deleteForever", "description", "dns", "download", "edit", "error", "errorOutline", "exitToApp", "expandLess", "expandMore", "filterAlt", "forum", "help", "home", "info", "manageAccounts", "monitorHeart", "moreVert", "notificationsOff", "openInBrowser", "openInNew", "place", "search", "severityLow", "severityMedium", "severityHigh", "severityCritical", "success", "warning", "widgets"];
var getColoredSizedIcon = ({ icon: e, color: t, size: l, title: i, iconClassName: n, ...r2 }) => {
  const a = `juno-icon juno-icon-${e} jn-fill-current ${t} ${n}`;
  return "accountCircle" === e ? import_react10.default.createElement(SvgAccountCircle, _extends({ width: l, height: l, className: a, alt: "account", title: i ? i : "Account", role: "img" }, r2)) : "addCircle" === e ? import_react10.default.createElement(SvgAddCircle, _extends({ width: l, height: l, className: a, alt: "add", title: i ? i : "Add", role: "img" }, r2)) : "autoAwesomeMosaic" === e ? import_react10.default.createElement(SvgAutoAwesomeMosaic, _extends({ width: l, height: l, className: a, alt: "mosaic", title: i ? i : "Mosaic", role: "img" }, r2)) : "autoAwesomeMotion" === e ? import_react10.default.createElement(SvgAutoAwesomeMotion, _extends({ width: l, height: l, className: a, alt: "items stacked behind each other", title: i ? i : "Items stacked behind each other", role: "img" }, r2)) : "bolt" === e ? import_react10.default.createElement(SvgBolt, _extends({ width: l, height: l, className: a, alt: "bolt", title: i ? i : "Bolt", role: "img" }, r2)) : "cancel" === e ? import_react10.default.createElement(SvgCancel, _extends({ width: l, height: l, className: a, alt: "cancel", title: i ? i : "Cancel", role: "img" }, r2)) : "checkCircle" === e ? import_react10.default.createElement(SvgCheckCircle, _extends({ width: l, height: l, className: a, alt: "checkCircle", title: i ? i : "CheckCircle", role: "img" }, r2)) : "chevronLeft" === e ? import_react10.default.createElement(SvgChevronLeft, _extends({ width: l, height: l, className: a, alt: "chevronLeft", title: i ? i : "ChevronLeft", role: "img" }, r2)) : "chevronRight" === e ? import_react10.default.createElement(SvgChevronRight, _extends({ width: l, height: l, className: a, alt: "chevronRight", title: i ? i : "ChevronRight", role: "img" }, r2)) : "close" === e ? import_react10.default.createElement(SvgClose, _extends({ width: l, height: l, className: a, alt: "close", title: i ? i : "Close", role: "img" }, r2)) : "comment" === e ? import_react10.default.createElement(SvgComment, _extends({ width: l, height: l, className: a, alt: "comment", title: i ? i : "Comment", role: "img" }, r2)) : "contentCopy" === e ? import_react10.default.createElement(SvgContentCopy, _extends({ width: l, height: l, className: a, alt: "copy", title: i ? i : "Copy", role: "img" }, r2)) : "danger" === e ? import_react10.default.createElement(SvgJunoDanger, _extends({ width: l, height: l, className: a, alt: "danger", title: i ? i : "Danger", role: "img" }, r2)) : "dangerous" === e ? import_react10.default.createElement(SvgDangerous, _extends({ width: l, height: l, className: a, alt: "dangerous", title: i ? i : "Dangerous", role: "img" }, r2)) : "deleteForever" === e ? import_react10.default.createElement(SvgDeleteForever, _extends({ width: l, height: l, className: a, alt: "delete forever", title: i ? i : "Delete Forever", role: "img" }, r2)) : "description" === e ? import_react10.default.createElement(SvgDescription, _extends({ width: l, height: l, className: a, alt: "description", title: i ? i : "Description", role: "img" }, r2)) : "dns" === e ? import_react10.default.createElement(SvgDns, _extends({ width: l, height: l, className: a, alt: "service", title: i ? i : "Service", role: "img" }, r2)) : "download" === e ? import_react10.default.createElement(SvgDownload, _extends({ width: l, height: l, className: a, alt: "download", title: i ? i : "download", role: "img" }, r2)) : "edit" === e ? import_react10.default.createElement(SvgEdit, _extends({ width: l, height: l, className: a, alt: "edit", title: i ? i : "Edit", role: "img" }, r2)) : "error" === e ? import_react10.default.createElement(SvgDangerous, _extends({ width: l, height: l, className: a, alt: "error", title: i ? i : "Error", role: "img" }, r2)) : "errorOutline" === e ? import_react10.default.createElement(SvgErrorOutline, _extends({ width: l, height: l, className: a, alt: "error outline", title: i ? i : "Error", role: "img" }, r2)) : "exitToApp" === e ? import_react10.default.createElement(SvgExitToApp, _extends({ width: l, height: l, className: a, alt: "exit to other app", title: i ? i : "Exit to app", role: "img" }, r2)) : "expandLess" === e ? import_react10.default.createElement(SvgExpandLess, _extends({ width: l, height: l, className: a, alt: "expand less", title: i ? i : "Expand Less", role: "img" }, r2)) : "expandMore" === e ? import_react10.default.createElement(SvgExpandMore, _extends({ width: l, height: l, className: a, alt: "expand more", title: i ? i : "Expand More", role: "img" }, r2)) : "filterAlt" === e ? import_react10.default.createElement(SvgFilterAlt, _extends({ width: l, height: l, className: a, alt: "filter", title: i ? i : "Filter", role: "img" }, r2)) : "forum" === e ? import_react10.default.createElement(SvgForum, _extends({ width: l, height: l, className: a, alt: "forum", title: i ? i : "Forum", role: "img" }, r2)) : "help" === e ? import_react10.default.createElement(SvgHelp, _extends({ width: l, height: l, className: a, alt: "help", title: i ? i : "Help", role: "img" }, r2)) : "home" === e ? import_react10.default.createElement(SvgHomeSharp, _extends({ width: l, height: l, className: a, alt: "home", title: i ? i : "Home", role: "img" }, r2)) : "info" === e ? import_react10.default.createElement(SvgInfo, _extends({ width: l, height: l, className: a, alt: "info", title: i ? i : "Info", role: "img" }, r2)) : "manageAccounts" === e ? import_react10.default.createElement(SvgManageAccounts, _extends({ width: l, height: l, className: a, alt: "user account configuration", title: i ? i : "User account configuration", role: "img" }, r2)) : "monitorHeart" === e ? import_react10.default.createElement(SvgMonitorHeart, _extends({ width: l, height: l, className: a, alt: "heart monitor", title: i ? i : "Heart monitor", role: "img" }, r2)) : "moreVert" === e ? import_react10.default.createElement(SvgMoreVert, _extends({ width: l, height: l, className: a, alt: "more", title: i ? i : "More", role: "img" }, r2)) : "notificationsOff" === e ? import_react10.default.createElement(SvgNotificationsOff, _extends({ width: l, height: l, className: a, alt: "notifications off", title: i ? i : "Notifications off", role: "img" }, r2)) : "openInBrowser" === e ? import_react10.default.createElement(SvgOpenInBrowser, _extends({ width: l, height: l, className: a, alt: "open in browser", title: i ? i : "Open in browser", role: "img" }, r2)) : "openInNew" === e ? import_react10.default.createElement(SvgOpenInNew, _extends({ width: l, height: l, className: a, alt: "open in new tab", title: i ? i : "Open in new tab", role: "img" }, r2)) : "place" === e ? import_react10.default.createElement(SvgPlace, _extends({ width: l, height: l, className: a, alt: "location", title: i ? i : "Location", role: "img" }, r2)) : "search" === e ? import_react10.default.createElement(SvgSearch, _extends({ width: l, height: l, className: a, alt: "search", title: i ? i : "Search", role: "img" }, r2)) : "severityLow" === e ? import_react10.default.createElement(SvgJunoSeverityLow, _extends({ width: l, height: l, className: a, alt: "Severity low", title: i ? i : "Severity Low", role: "img" }, r2)) : "severityMedium" === e ? import_react10.default.createElement(SvgJunoSeverityMedium, _extends({ width: l, height: l, className: a, alt: "Severity medium", title: i ? i : "Severity Medium", role: "img" }, r2)) : "severityHigh" === e ? import_react10.default.createElement(SvgJunoSeverityHigh, _extends({ width: l, height: l, className: a, alt: "Severity high", title: i ? i : "Severity High", role: "img" }, r2)) : "severityCritical" === e ? import_react10.default.createElement(SvgJunoSeverityCritical, _extends({ width: l, height: l, className: a, alt: "Severity critical", title: i ? i : "Severity Critical", role: "img" }, r2)) : "success" === e ? import_react10.default.createElement(SvgCheckBox, _extends({ width: l, height: l, className: a, alt: "success", title: i ? i : "Success", role: "img" }, r2)) : "widgets" === e ? import_react10.default.createElement(SvgWidgets, _extends({ width: l, height: l, className: a, alt: "widgets", title: i ? i : "Widgets", role: "img" }, r2)) : "warning" === e ? import_react10.default.createElement(SvgWarning, _extends({ width: l, height: l, className: a, alt: "warning", title: i ? i : "Warning", role: "img" }, r2)) : "default" === e ? import_react10.default.createElement(SvgHelp, _extends({ width: l, height: l, className: a, alt: "help", title: i ? i : "Help", role: "img" }, r2)) : import_react10.default.createElement(SvgHelp, _extends({ width: l, height: l, className: a, alt: "help", title: i ? i : "Help", role: "img" }, r2));
};
var Icon = (0, import_react10.forwardRef)(({ icon: e, color: t, size: l, title: i, className: n, href: r2, disabled: a, onClick: d, ...o2 }, y) => {
  const s = r2 || d ? "" : n, h = r2 || d ? {} : o2, p = getColoredSizedIcon({ icon: e, color: t, size: l, title: i, iconClassName: s, ...h }), g = import_react10.default.createElement("button", _extends({ onClick: (e2) => {
    d && d(e2);
  }, className: `juno-icon-button ${buttonIconStyles} ${n}`, "aria-label": i || e, disabled: a, ref: y }, o2), p), m = import_react10.default.createElement("a", _extends({ href: r2, className: `juno-icon-link ${anchorIconStyles} ${n}`, "aria-label": i || e, ref: y }, o2), p);
  return r2 ? m : d ? g : import_react10.default.createElement("span", { ref: y }, p);
});
Icon.propTypes = { icon: import_prop_types10.default.oneOf(knownIcons), color: import_prop_types10.default.string, size: import_prop_types10.default.string, title: import_prop_types10.default.string, className: import_prop_types10.default.string, href: import_prop_types10.default.string, disabled: import_prop_types10.default.bool, onClick: import_prop_types10.default.func }, Icon.defaultProps = { icon: null, color: "", size: "24", title: "", className: "", href: "", disabled: false, onClick: void 0 };

// node_modules/juno-ui-components/build/Badge.component-b408dd7f.js
var badgeBaseStyles = `
	jn-rounded
	jn-text-sm
	jn-text-theme-default
	jn-py-0.5
	jn-px-1
  jn-justify-center
  jn-items-center
`;
var defaultStyles = `jn-bg-theme-badge-default`;
var infoStyles = `jn-bg-theme-info/25`;
var successStyles = `jn-bg-theme-success/25`;
var warningStyles = `jn-bg-theme-warning/25`;
var dangerStyles = `jn-bg-theme-danger/25`;
var criticalStyles = `jn-bg-theme-danger/70 jn-text-theme-high`;
var errorStyles = `jn-bg-theme-error/25`;
var iconStyles = `jn-mr-1 jn-items-center`;
var knownVariants = ["info", "success", "warning", "danger", "error", "critical"];
var getVariantStyle = (a) => "info" === a ? infoStyles : "success" === a ? successStyles : "warning" === a ? warningStyles : "danger" === a ? dangerStyles : "error" === a ? errorStyles : "critical" === a ? criticalStyles : defaultStyles;
var Badge = ({ variant: a, icon: b6, text: c2, className: d, children: e, ...f }) => {
  return import_react11.default.createElement("span", _extends({ className: `
        juno-badge 
        juno-badge-${a} 
        ${badgeBaseStyles} 
        ${getVariantStyle(a)}
        ${b6 ? "jn-inline-flex" : ""}
        ${d}` }, f), b6 ? import_react11.default.createElement(Icon, { icon: ((a2, b7) => a2 && knownIcons.includes(a2) ? a2 : true === a2 ? b7 : null)(b6, a), size: "1.125rem", className: `${iconStyles}`, color: ((a2, b7) => true === a2 ? `jn-text-theme-${b7}` : void 0)(b6, a) }) : null, e ? e : c2);
};
Badge.propTypes = { variant: import_prop_types11.default.oneOf(["default", ...knownVariants]), icon: import_prop_types11.default.oneOfType([import_prop_types11.default.bool, import_prop_types11.default.oneOf(knownIcons)]), text: import_prop_types11.default.string, className: import_prop_types11.default.string, children: import_prop_types11.default.node }, Badge.defaultProps = { variant: "default", icon: false, text: "", className: "", children: null };

// node_modules/juno-ui-components/build/Box.component-051cf2c7.js
var import_react12 = __toESM(require_react());
var import_prop_types12 = __toESM(require_prop_types());
var boxstyles = `
  jn-text-sm
  jn-rounded
  jn-bg-theme-box-default
  jn-border
  jn-border-theme-box-default
`;
var boxpadding = `
  jn-py-1
  jn-px-2
`;
var Box = ({ children: a, unpad: b6, className: c2, ...d }) => import_react12.default.createElement("div", _extends({ className: `juno-box ${boxstyles} ${b6 ? "" : boxpadding} ${c2}` }, d), a);
Box.propTypes = { children: import_prop_types12.default.node, unpad: import_prop_types12.default.bool, className: import_prop_types12.default.string }, Box.defaultProps = { children: null, unpad: false, className: "" };

// node_modules/juno-ui-components/build/Breadcrumb.component-b3d1985f.js
var import_react15 = __toESM(require_react());
var import_prop_types15 = __toESM(require_prop_types());

// node_modules/juno-ui-components/build/BreadcrumbItem.component-77d56c3f.js
var import_react13 = __toESM(require_react());
var import_prop_types13 = __toESM(require_prop_types());
var breadcrumbitemstyles = `
  jn-text-sm
  jn-text-theme-high
  jn-flex
  jn-gap-1
  jn-items-center
`;
var breadcrumblinkstyles = `
  jn-text-theme-high
  jn-inline-flex
`;
var BreadcrumbItem = ({ icon: a, href: b6, label: c2, ariaLabel: d, active: e, children: f, onClick: g, disabled: h, className: i, ...j }) => {
  const k = a ? import_react13.default.createElement(Icon, { icon: a, size: "18", color: "jn-text-theme-default", className: c2 && c2.length ? "jn-mr-1" : "" }) : null;
  return f ? f : import_react13.default.createElement("span", _extends({ className: `juno-breadcrumb-item 
              ${breadcrumbitemstyles} 
              ${h ? "juno-breadcrumb-item-disabled" : ""} 
              ${e ? "juno-breadcrumb-item-active" : ""}
              ${i}` }, j), e || h ? import_react13.default.createElement(import_react13.default.Fragment, null, k, c2) : import_react13.default.createElement("a", { href: b6, className: `${breadcrumblinkstyles} `, "aria-label": d || c2, onClick: (a2) => {
    g && g(a2);
  } }, k, c2));
};
BreadcrumbItem.propTypes = { icon: import_prop_types13.default.oneOf(knownIcons), href: import_prop_types13.default.string, label: import_prop_types13.default.string, ariaLabel: import_prop_types13.default.string, active: import_prop_types13.default.bool, onClick: import_prop_types13.default.func, disabled: import_prop_types13.default.bool, className: import_prop_types13.default.string, children: import_prop_types13.default.node }, BreadcrumbItem.defaultProps = { icon: null, href: "#", label: "Item", ariaLabel: "", active: false, onClick: void 0, disabled: false, className: "", children: null };

// node_modules/juno-ui-components/build/Stack.component-ced60308.js
var import_react14 = __toESM(require_react());
var import_prop_types14 = __toESM(require_prop_types());
var gapSize = (a) => "0" === a ? "jn-gap-0" : "px" === a ? "jn-gap-px" : "0.5" === a ? "jn-gap-0.5" : "1" === a ? "jn-gap-1" : "1.5" === a ? "jn-gap-1.5" : "2" === a ? "jn-gap-2" : "2.5" === a ? "jn-gap-2.5" : "3" === a ? "jn-gap-3" : "3.5" === a ? "jn-gap-3.5" : "4" === a ? "jn-gap-4" : "5" === a ? "jn-gap-5" : "6" === a ? "jn-gap-6" : "7" === a ? "jn-gap-7" : "8" === a ? "jn-gap-8" : "9" === a ? "jn-gap-9" : "10" === a ? "jn-gap-10" : "11" === a ? "jn-gap-11" : "12" === a ? "jn-gap-12" : "14" === a ? "jn-gap-14" : "16" === a ? "jn-gap-16" : "20" === a ? "jn-gap-20" : "24" === a ? "jn-gap-24" : "28" === a ? "jn-gap-28" : "32" === a ? "jn-gap-32" : "36" === a ? "jn-gap-36" : "40" === a ? "jn-gap-40" : "44" === a ? "jn-gap-44" : "48" === a ? "jn-gap-48" : "52" === a ? "jn-gap-52" : "56" === a ? "jn-gap-56" : "60" === a ? "jn-gap-60" : "64" === a ? "jn-gap-64" : "72" === a ? "jn-gap-72" : "80" === a ? "jn-gap-80" : "96" === a ? "jn-gap-96" : "jn-gap-0";
var baseStack = (a, b6, c2) => `
      ${"vertical" === a ? "jn-flex jn-flex-col" : "md:jn-flex md:jn-flex-row"}
      ${c2 && "jn-flex-wrap"}
      ${gapSize(b6)}
    `;
var alignItems = (a) => "start" === a ? "jn-items-start" : "end" === a ? "jn-items-end" : "center" === a ? "jn-items-center" : "baseline" === a ? "jn-items-baseline" : "stretch" === a ? "jn-items-stretch" : "";
var justifyItems = (a) => "start" === a ? "jn-justify-start" : "end" === a ? "jn-justify-end" : "center" === a ? "jn-justify-center" : "between" === a ? "jn-justify-between" : "around" === a ? "jn-justify-around" : "evenly" === a ? "jn-justify-evenly" : "";
var Stack = ({ direction: a, gap: b6, alignment: c2, distribution: d, wrap: e, className: f, children: g, ...h }) => import_react14.default.createElement("div", _extends({ className: `juno-stack ${baseStack(a, b6, e)} ${alignItems(c2)} ${justifyItems(d)} ${f || ""}` }, h), g);
Stack.propTypes = { direction: import_prop_types14.default.oneOf(["horizontal", "vertical"]), alignment: import_prop_types14.default.oneOf(["start", "end", "center", "baseline", "stretch"]), distribution: import_prop_types14.default.oneOf(["start", "end", "center", "between", "around", "evenly"]), wrap: import_prop_types14.default.bool, gap: import_prop_types14.default.oneOf(["0", "px", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96"]) }, Stack.defaultProps = { direction: "horizontal", alignment: "stretch", distribution: "start", wrap: false, gap: "0", className: "" };

// node_modules/juno-ui-components/build/Breadcrumb.component-b3d1985f.js
var breadcrumbstyles = `

`;
var Breadcrumb = ({ children: a, className: b6, ...c2 }) => {
  const d = import_react15.Children.toArray(a), e = [];
  return d.forEach((a2, b7) => {
    e.push(import_react15.default.createElement(import_react15.default.Fragment, { key: b7 }, import_react15.default.createElement(BreadcrumbItem, a2.props), b7 < d.length - 1 ? import_react15.default.createElement(Icon, { icon: "chevronRight" }) : null));
  }), import_react15.default.createElement(Stack, _extends({ className: `juno-breadcrumb ${breadcrumbstyles} ${b6}`, gap: "1", key: "stck" }, c2), e);
};
Breadcrumb.propTypes = { className: import_prop_types15.default.string, children: import_prop_types15.default.node }, Breadcrumb.defaultProps = { className: "", children: null };

// node_modules/juno-ui-components/build/Button.component-2cf3027c.js
var import_react17 = __toESM(require_react());
var import_prop_types17 = __toESM(require_prop_types());

// node_modules/juno-ui-components/build/Spinner.component-5bfac1a2.js
var import_react16 = __toESM(require_react());
var import_prop_types16 = __toESM(require_prop_types());
var spinnerBaseStyles = `
  jn-animate-spin 
  jn-mr-3 
  jn-h-5 
  jn-w-5 
`;
var primary = `
  jn-text-theme-accent
`;
var danger = `
  jn-text-theme-danger 
`;
var success = `
  jn-text-theme-success
`;
var warning = `
  jn-text-theme-warning  
`;
var defaultColor = `
  jn-text-theme-on-default
`;
var Spinner = ({ variant: a, size: b6, className: c2, color: d, ...e }) => {
  const f = (a2) => "small" === a2 ? "1rem" : "large" === a2 ? "3rem" : a2, g = b6 ? { width: f(b6), height: f(b6) } : {};
  return import_react16.default.createElement("svg", _extends({ className: `juno-spinner ${spinnerBaseStyles} ${d ? d : (() => "primary" === a ? primary : "danger" === a ? danger : "success" === a ? success : "warning" === a ? warning : defaultColor)()} ${c2}`, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", style: g, role: "progressbar" }, e), import_react16.default.createElement("circle", { className: "jn-opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), import_react16.default.createElement("path", { className: "jn-opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }));
};
Spinner.propTypes = { variant: import_prop_types16.default.oneOf(["primary", "danger", "default", "success", "warning"]), size: import_prop_types16.default.string, className: import_prop_types16.default.string, color: import_prop_types16.default.string }, Spinner.defaultProps = { className: "", variant: "default", size: null, color: "" };

// node_modules/juno-ui-components/build/Button.component-2cf3027c.js
var btnBase = `
  jn-font-bold
  jn-inline-flex 
  jn-justify-center 
  jn-items-center
  jn-rounded
  jn-shadow-sm 
  jn-w-auto
  focus:jn-outline-none 
  focus-visible:jn-ring-2
  focus-visible:jn-ring-theme-focus
  focus-visible:jn-ring-offset-1
  focus-visible:jn-ring-offset-theme-focus
  disabled:jn-opacity-50
  disabled:jn-cursor-not-allowed
  disabled:jn-pointer-events-none
`;
var btnSmallBase = `
  jn-text-sm
  jn-leading-5
`;
var btnDefaultBase = `
  jn-text-base
  jn-leading-6
`;
var btnSmallDefaultPadding = `
  jn-py-[0.3125rem]
  jn-px-[0.5rem]
`;
var btnSmallSubduedPadding = `
  jn-py-[0.25rem]
  jn-px-[0.4375rem]
`;
var btnDefaultPadding = `
  jn-py-[0.4375rem]
  jn-px-[0.625rem] 
`;
var btnDefaultSubduedPadding = `
  jn-py-[0.375rem]
  jn-px-[0.5625rem]
`;
var getButtonPadding = (a, b6) => "small" === a ? "subdued" === b6 ? `${btnSmallSubduedPadding}` : `${btnSmallDefaultPadding}` : "subdued" === b6 ? `${btnDefaultSubduedPadding}` : `${btnDefaultPadding}`;
var btnIconSmall = `
  jn-mr-2
`;
var btnIconDefault = `
  jn-mr-2
`;
var iconClasses = (a) => "small" === a ? `${btnIconSmall}` : `${btnIconDefault}`;
var progressClass = (a) => {
  const b6 = a ? `in-progress` : ``;
  return b6;
};
var spinnerColorClass = (a) => "default" === a ? "jn-text-theme-accent" : "primary" === a ? "jn-text-white" : "primary-danger" === a ? "jn-text-white" : "";
var Button = import_react17.default.forwardRef(({ label: a, title: b6, variant: c2, size: d, disabled: e, href: f, icon: g, className: h, onClick: i, children: j, progress: k, progressLabel: l, ...m }, n) => {
  const o2 = c2 || "default", p = b6 || a || "", q = k ? import_react17.default.createElement(Spinner, { size: "small" === d ? "1.125rem" : "1.5rem", color: `${spinnerColorClass(o2)}` }) : g ? import_react17.default.createElement(Icon, { icon: g, className: `juno-button-icon ${a || j ? iconClasses(d) : ""} `, size: "small" === d ? "1.125rem" : "1.5rem" }) : null, r2 = k && l ? l : a || j, s = import_react17.default.createElement("button", _extends({ type: "button", className: `
          juno-button 
          juno-button-${o2} 
          juno-button-${d}-size 
          ${btnBase} 
          ${"small" === d ? btnSmallBase : btnDefaultBase} 
          ${getButtonPadding(d, c2)}
          ${progressClass(k)} 
          ${h}`, disabled: e, onClick: (a2) => {
    i && i(a2);
  }, title: p, ref: n }, m), q, r2), t = import_react17.default.createElement("a", _extends({ href: f, role: "button", className: `
          juno-button 
          juno-button-${o2} 
          juno-button-${d}-size 
          ${btnBase} 
          ${"small" === d ? btnSmallBase : btnDefaultBase}
          ${getButtonPadding(d, c2)}
          ${progressClass(k)} 
          ${h}
        `, disabled: e, onClick: i, title: p, ref: n }, m), q, r2);
  return f ? t : s;
});
Button.propTypes = { variant: import_prop_types17.default.oneOf(["primary", "primary-danger", "default", "subdued"]), size: import_prop_types17.default.oneOf(["small", "default"]), disabled: import_prop_types17.default.bool, href: import_prop_types17.default.string, label: import_prop_types17.default.string, title: import_prop_types17.default.string, icon: import_prop_types17.default.oneOf(knownIcons), className: import_prop_types17.default.string, onClick: import_prop_types17.default.func, disabled: import_prop_types17.default.bool, progress: import_prop_types17.default.bool, progressLabel: import_prop_types17.default.string }, Button.defaultProps = { variant: void 0, size: "default", disabled: null, icon: null, className: "", href: null, title: null, onClick: void 0, progress: false, progressLabel: "" };

// node_modules/juno-ui-components/build/ButtonRow.component-65ee6aff.js
var import_react18 = __toESM(require_react());
var import_prop_types18 = __toESM(require_prop_types());
var ButtonRow = ({ children: a, className: b6, ...c2 }) => import_react18.default.createElement(Stack, _extends({ gap: "2", className: `juno-button-row ${b6}` }, c2), a);
ButtonRow.propTypes = { className: import_prop_types18.default.string, children: import_prop_types18.default.node }, ButtonRow.defaultProps = { children: null, className: "" };

// node_modules/juno-ui-components/build/Checkbox.component-93c7cb9b.js
var import_react19 = __toESM(require_react());
var import_prop_types19 = __toESM(require_prop_types());
var inputstyles = `
	jn-w-4
	jn-h-4
	jn-opacity-0
	jn-cursor-pointer
`;
var mockcheckboxstyles = `
	jn-w-4
	jn-h-4
	jn-rounded-sm
	jn-bg-theme-checkbox
	jn-cursor-pointer
	jn-relative
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
`;
var mockfocusstyles = `
	jn-ring-2
	jn-ring-theme-focus
`;
var mockcheckmarkstyles = `
	jn-absolute
	jn-top-0
	jn-left-0
	jn-text-theme-checkbox-checked
	jn-fill-current
`;
var mockindeterminatestyles = `
	jn-absolute
	jn-w-2
	jn-h-0.5
	jn-top-2
	jn-left-1
	jn-inline-block
	jn-bg-theme-focus
`;
var mockdisabledstyles = `
	jn-pointer-events-none
	jn-opacity-50
`;
var errorstyles = `
	jn-border
	jn-border-theme-error
`;
var successstyles = `
	jn-border
	jn-border-theme-success
`;
var Checkbox = ({ name: a, id: b6, value: c2, checked: d, indeterminate: e, className: f, disabled: g, invalid: h, valid: i, onChange: j, onClick: k, ...l }) => {
  const [m, n] = (0, import_react19.useState)(false), [o2, p] = (0, import_react19.useState)(""), [q, r2] = (0, import_react19.useState)(false), [s, t] = (0, import_react19.useState)(false), [u, v] = (0, import_react19.useState)(false);
  (0, import_react19.useEffect)(() => {
    n(d);
  }, [d]), (0, import_react19.useEffect)(() => {
    p(e);
  }, [e]), (0, import_react19.useEffect)(() => {
    t(h);
  }, [h]), (0, import_react19.useEffect)(() => {
    v(i);
  }, [i]);
  return import_react19.default.createElement("div", _extends({ className: `juno-checkbox ${mockcheckboxstyles} ${q ? mockfocusstyles : ""} ${g ? mockdisabledstyles : ""} ${s ? errorstyles : ""} ${u ? successstyles : ""} ${f}` }, l), m ? import_react19.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: `${mockcheckmarkstyles}`, width: "16", height: "16", viewBox: "0 0 16 16" }, import_react19.default.createElement("polygon", { points: "5.75 11.15 2.6 8 1.55 9.05 5.75 13.25 14.75 4.25 13.7 3.2" })) : "", import_react19.default.createElement("input", { type: "checkbox", name: a || "unnamed checkbox", value: c2, id: b6, checked: m, className: `${inputstyles} ${s ? "juno-checkbox-invalid" : ""} ${u ? "juno-checkbox-valid" : ""} `, disabled: g, onChange: (a2) => {
    n(!m), j && j(a2);
  }, onClick: (a2) => {
    k && k(a2);
  }, onFocus: () => {
    r2(true);
  }, onBlur: () => {
    r2(false);
  } }), o2 && !m ? import_react19.default.createElement("div", { className: `${mockindeterminatestyles}` }) : "");
};
Checkbox.propTypes = { name: import_prop_types19.default.string, id: import_prop_types19.default.string, value: import_prop_types19.default.string, checked: import_prop_types19.default.bool, indeterminate: import_prop_types19.default.bool, disabled: import_prop_types19.default.bool, invalid: import_prop_types19.default.bool, valid: import_prop_types19.default.bool, className: import_prop_types19.default.string, onChange: import_prop_types19.default.func, onClick: import_prop_types19.default.func }, Checkbox.defaultProps = { checked: false, value: "", id: "", className: "", disabled: false, invalid: false, valid: false, onChange: void 0, onClick: void 0 };

// node_modules/juno-ui-components/build/CheckboxRow.component-eb478d42.js
var import_react21 = __toESM(require_react());
var import_prop_types21 = __toESM(require_prop_types());

// node_modules/juno-ui-components/build/Label.component-d882f37e.js
var import_react20 = __toESM(require_react());
var import_prop_types20 = __toESM(require_prop_types());
var labelstyles = `
	jn-text-theme-high
`;
var stackedlabelstyles = `
	jn-text-sm
`;
var floatinglabelstyles = `
	floating-label
	jn-text-base
`;
var defaultlabelstyles = `
	jn-text-base
`;
var requiredstyles = `
	jn-inline-block
	jn-w-1
	jn-h-1
	jn-rounded-full
	jn-align-top
	jn-ml-1
	jn-mt-2
	jn-bg-theme-required
`;
var disabledstyles = `
	disabled 
	jn-opacity-50
`;
var variantStyles = (a) => "floating" === a ? floatinglabelstyles : "stacked" === a ? stackedlabelstyles : defaultlabelstyles;
var Label = ({ text: a, htmlFor: b6, required: c2, variant: d, disabled: e, className: f, ...g }) => import_react20.default.createElement(import_react20.default.Fragment, null, import_react20.default.createElement("label", _extends({ className: `juno-label ${labelstyles} ${variantStyles(d)} ${e ? disabledstyles : ""} ${f}`, htmlFor: b6 }, g), a ? a : "unlabeled"), c2 ? import_react20.default.createElement("span", { className: `required ${requiredstyles}` }) : "");
Label.propTypes = { text: import_prop_types20.default.string, htmlFor: import_prop_types20.default.string, required: import_prop_types20.default.bool, className: import_prop_types20.default.string, disabled: import_prop_types20.default.bool, variant: import_prop_types20.default.oneOf(["floating", "stacked"]) }, Label.defaultProps = { text: null, htmlFor: null, required: null, className: "", disabled: null, variant: null };

// node_modules/juno-ui-components/build/CheckboxRow.component-eb478d42.js
var checkboxrow = `
	jn-flex
	jn-flex-row
  jn-mb-1
`;
var checkboxcontainerstyles = `
	jn-mt-1
	jn-mr-2
`;
var helptextstyles = `
	jn-text-xs
	jn-text-theme-light
	jn-mt-1
`;
var errortextstyles = `
  jn-text-xs
  jn-text-theme-error
  jn-mt-1
`;
var successtextstyles = `
  jn-text-xs
  jn-text-theme-success
  jn-mt-1
`;
var iconstyles = `
  jn-inline-block 
  jn-ml-1 
  jn-leading-1
  jn-mt-[-.2rem]
`;
var CheckboxRow = ({ value: a, checked: b6, name: c2, label: d, id: e, helptext: f, required: g, disabled: h, invalid: i, errortext: j, valid: k, successtext: l, className: m, onChange: n, ...o2 }) => {
  const [p, q] = (0, import_react21.useState)(false), [r2, s] = (0, import_react21.useState)(false), [t, u] = (0, import_react21.useState)(false), v = (0, import_react21.useMemo)(() => i || !!(j && j.length), [i, j]), w = (0, import_react21.useMemo)(() => k || !!(l && l.length), [k, l]);
  (0, import_react21.useEffect)(() => {
    q(b6);
  }, [b6]), (0, import_react21.useEffect)(() => {
    s(v);
  }, [v]), (0, import_react21.useEffect)(() => {
    u(w);
  }, [w]);
  return import_react21.default.createElement("div", _extends({ className: `juno-checkbox-row ${checkboxrow}  ${m}` }, o2), import_react21.default.createElement("div", { className: `juno-checkbox-container ${checkboxcontainerstyles}` }, import_react21.default.createElement(Checkbox, { name: c2, checked: p, disabled: h, onChange: (a2) => {
    q(!p), n(a2);
  }, id: e, value: a || "", invalid: r2, valid: t })), import_react21.default.createElement("div", null, import_react21.default.createElement(Label, { text: d, htmlFor: e, required: g, disabled: h }), r2 ? import_react21.default.createElement(Icon, { icon: "dangerous", color: "jn-text-theme-error", size: "1.125rem", className: `${iconstyles}` }) : null, t ? import_react21.default.createElement(Icon, { icon: "checkCircle", color: "jn-text-theme-success", size: "1.125rem", className: `${iconstyles}` }) : null, j && j.length ? import_react21.default.createElement("p", { className: `${errortextstyles}` }, j) : null, l && l.length ? import_react21.default.createElement("p", { className: `${successtextstyles}` }, l) : null, f ? import_react21.default.createElement("p", { className: `${helptextstyles}` }, f) : null));
};
CheckboxRow.propTypes = { value: import_prop_types21.default.string, checked: import_prop_types21.default.bool, name: import_prop_types21.default.string, label: import_prop_types21.default.string, id: import_prop_types21.default.string, helptext: import_prop_types21.default.node, required: import_prop_types21.default.bool, disabled: import_prop_types21.default.bool, invalid: import_prop_types21.default.bool, errortext: import_prop_types21.default.string, valid: import_prop_types21.default.bool, successtext: import_prop_types21.default.string, className: import_prop_types21.default.string, onChange: import_prop_types21.default.func }, CheckboxRow.defaultProps = { value: null, checked: false, name: null, label: null, id: null, helptext: null, required: null, disabled: false, invalid: false, errortext: "", valid: false, successtext: "", className: "", onChange: void 0 };

// node_modules/juno-ui-components/build/CheckboxGroup.component-bdeedb96.js
var import_react22 = __toESM(require_react());
var import_prop_types22 = __toESM(require_prop_types());
var checkboxgroupstyles = `
	jn-mb-4
	jn-last:mb-0
`;
var checkboxgrouplabelstyles = `
	jn-inline-block
	jn-mb-1
`;
var groupstyles = `
	jn-relative
	jn-rounded
	jn-border
	jn-py-1
`;
var defaultgroupstyles = `
	jn-border-transparent
`;
var validgroupstyles = `
	jn-border-theme-success
	jn-px-2
`;
var invalidgroupstyles = `
	jn-border-theme-error
	jn-px-2
`;
var errortextstyles2 = `
	jn-text-xs
	jn-text-theme-error
	jn-mb-2
`;
var successtextstyles2 = `
	jn-text-xs
	jn-text-theme-success
	jn-mb-2
`;
var iconstyles2 = `
	jn-absolute
	jn-right-2
	jn-top-1.5
`;
var CheckboxGroup = ({ name: a, label: b6, selected: c2, required: d, disabled: e, valid: f, errortext: g, invalid: h, successtext: i, children: j, className: k, ...l }) => {
  const [m, n] = (0, import_react22.useState)([]), [o2, p] = (0, import_react22.useState)(false), [q, r2] = (0, import_react22.useState)(false), s = (0, import_react22.useMemo)(() => f || !!(i && i.length), [f, i]), t = (0, import_react22.useMemo)(() => h || !!(g && g.length), [h, g]);
  (0, import_react22.useEffect)(() => {
    n(c2);
  }, [c2]), (0, import_react22.useEffect)(() => {
    p(s);
  }, [s]), (0, import_react22.useEffect)(() => {
    r2(t);
  }, [t]);
  const u = (a2) => {
    const b7 = a2.target.value, c3 = m.includes(b7);
    c3 ? n(m.filter((a3) => a3 !== b7)) : n((a3) => [...a3, b7]);
  };
  return import_react22.default.createElement("div", _extends({ role: "group", className: `juno-checkbox-group ${o2 ? "juno-checkbox-group-valid" : ""} ${q ? "juno-checkbox-group-invalid" : ""} ${checkboxgroupstyles} ${k}` }, l), b6 ? import_react22.default.createElement(Label, { text: b6, htmlFor: a, required: d, className: `${checkboxgrouplabelstyles}` }) : "", g && g.length ? import_react22.default.createElement("p", { className: `${errortextstyles2}` }, g) : null, i && i.length ? import_react22.default.createElement("p", { className: `${successtextstyles2}` }, i) : null, import_react22.default.createElement("div", { className: `juno-checkbox-group-options ${groupstyles} ${o2 ? validgroupstyles : ""} ${q ? invalidgroupstyles : ""} ${o2 || q ? "" : defaultgroupstyles}` }, q ? import_react22.default.createElement(Icon, { icon: "dangerous", color: "jn-text-theme-error", className: `${iconstyles2}` }) : null, o2 ? import_react22.default.createElement(Icon, { icon: "checkCircle", color: "jn-text-theme-success", className: `${iconstyles2}` }) : null, (() => import_react22.default.Children.map(j, (b7) => {
    const c3 = m.includes(b7.props.value);
    return import_react22.default.cloneElement(b7, { name: a, className: k, disabled: e, checked: c3, onChange: u });
  }))()));
};
CheckboxGroup.propTypes = { name: import_prop_types22.default.string, label: import_prop_types22.default.string, selected: import_prop_types22.default.array, required: import_prop_types22.default.bool, disabled: import_prop_types22.default.bool, invalid: import_prop_types22.default.bool, errortext: import_prop_types22.default.string, valid: import_prop_types22.default.bool, successtext: import_prop_types22.default.string, className: import_prop_types22.default.string, children: import_prop_types22.default.node }, CheckboxGroup.defaultProps = { name: "", className: "", label: "", required: false, selected: [], disabled: false, invalid: false, errortext: "", valid: false, successtext: "", children: null };

// node_modules/juno-ui-components/build/Code.component-460cc7c6.js
var import_react23 = __toESM(require_react());
var import_prop_types23 = __toESM(require_prop_types());
var codeStyles = `
  jn-bg-theme-code-block
  jn-text-sm
`;
var Code = ({ content: a, children: b6, className: c2, ...d }) => import_react23.default.createElement("code", _extends({ className: `juno-code ${codeStyles} ${c2}` }, d), a || b6);
Code.propTypes = { content: import_prop_types23.default.string, className: import_prop_types23.default.string, children: import_prop_types23.default.node }, Code.defaultProps = { content: "", className: "", children: null };

// node_modules/juno-ui-components/build/CodeBlock.component-94df30d1.js
var import_react25 = __toESM(require_react());
var import_prop_types25 = __toESM(require_prop_types());

// node_modules/juno-ui-components/build/JsonViewer.component-24e2148d.js
var import_prop_types24 = __toESM(require_prop_types());
var import_react24 = __toESM(require_react());
var dark = { base00: "rgb(39, 40, 34)", base01: "rgb(245, 245, 245)", base02: "rgb(73, 72, 62)", base03: "#93a1a1", base04: "rgb(165, 159, 133)", base05: "rgb(248, 248, 242)", base06: "#073642", base07: "rgb(249, 248, 245)", base08: "rgb(249, 38, 114)", base09: "rgb(253, 151, 31)", base0A: "rgb(244, 191, 117)", base0B: "rgb(166, 226, 46)", base0C: "rgb(161, 239, 228)", base0D: "rgb(102, 217, 239)", base0E: "rgb(174, 129, 255)", base0F: "rgb(204, 102, 51)" };
var light = { base00: "#fff", base01: "rgb(245, 245, 245)", base02: "rgb(235, 235, 235)", base03: "#93a1a1", base04: "rgba(0, 0, 0, 0.3)", base05: "#586e75", base06: "#073642", base07: "#002b36", base08: "#d33682", base09: "#cb4b16", base0A: "#dc322f", base0B: "#859900", base0C: "#6c71c4", base0D: "#586e75", base0E: "#2aa198", base0F: "#268bd2" };
var themes = Object.freeze({ __proto__: null, dark, light });
var DEFAULT_THEME = { base00: "var(--color-syntax-highlight-base00)", base01: "var(--color-syntax-highlight-base01)", base02: "var(--color-syntax-highlight-base02)", base03: "var(--color-syntax-highlight-base03)", base04: "var(--color-syntax-highlight-base04)", base05: "var(--color-syntax-highlight-base05)", base06: "var(--color-syntax-highlight-base06)", base07: "var(--color-syntax-highlight-base07)", base08: "var(--color-syntax-highlight-base08)", base09: "var(--color-syntax-highlight-base09)", base0A: "var(--color-syntax-highlight-base0A)", base0B: "var(--color-syntax-highlight-base0B)", base0C: "var(--color-syntax-highlight-base0C)", base0D: "var(--color-syntax-highlight-base0D)", base0E: "var(--color-syntax-highlight-base0E)", base0F: "var(--color-syntax-highlight-base0F)" };
var INDENTATION_SIZE = 5;
var DEFAULT_TRUNCATE_LENGTH = 100;
var colorMap = (a) => ({ background: a.base00, ellipsis: a.base09, brace: a.base07, key: a.base07, index: a.base0C, size: a.base04, border: a.base02, highlight: { foreground: a.base06, background: a.base02 }, toolbar: { border: a.base01, background: a.base01 }, icon: { expanded: a.base0D, collapsed: a.base0E, expandAll: a.base0E }, dataType: { boolean: a.base0E, date: a.base0D, float: a.base0B, function: a.base0D, integer: a.base0F, string: a.base09, nan: a.base08, null: a.base0A, undefined: a.base05, regexp: a.base0A, background: a.base02 } });
var type = (a) => {
  var b6 = Number.isInteger, c2 = Number.isNaN;
  if (null === a)
    return "null";
  if (Array.isArray(a))
    return "array";
  if (a instanceof RegExp)
    return "regex";
  if (a instanceof Date)
    return "date";
  const d = (typeof a).toLowerCase();
  return "number" === d ? c2(a) ? "nan" : b6(a) ? "integer" : "float" : d;
};
var ThemeContext = import_react24.default.createContext(DEFAULT_THEME);
var ExpandIcon = ({ expanded: a }) => {
  const { colors: b6 } = (0, import_react24.useContext)(ThemeContext);
  return import_react24.default.createElement("svg", { fill: a ? b6.icon.expanded : b6.icon.collapsed, width: "1em", height: "1em", viewBox: "0 0 1792 1792", style: { verticalAlign: "middle", color: "var(--color-syntax-highlight-base0E)", height: "1em", width: "1em" } }, import_react24.default.createElement("title", null, "Expand/Collapse"), a ? import_react24.default.createElement("path", { d: "M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z" }) : import_react24.default.createElement("path", { d: "M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z" }));
};
var ExpandAllIcon = () => {
  const { colors: a } = (0, import_react24.useContext)(ThemeContext);
  return import_react24.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: a.icon.expandAll, alt: "expand more", role: "img" }, import_react24.default.createElement("title", null, "Expand All"), import_react24.default.createElement("path", { d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" }));
};
var CollapseAllIcon = () => {
  const { colors: a } = (0, import_react24.useContext)(ThemeContext);
  return import_react24.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: a.icon.expandAll, alt: "expand less", role: "img" }, import_react24.default.createElement("title", null, "Collapse All"), import_react24.default.createElement("path", { d: "m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" }));
};
var StringWithHighlight = ({ value: a }) => {
  const { colors: b6, searchTerm: c2 } = (0, import_react24.useContext)(ThemeContext), d = import_react24.default.useMemo(() => {
    if (a === void 0 || null === a || !c2 || "" === c2)
      return null;
    try {
      const b7 = a.toString().toLowerCase().indexOf(c2.toLowerCase());
      return 0 > b7 ? null : { start: b7, end: b7 + c2.length };
    } catch (a2) {
      return console.debug("JsonViewer:", a2), null;
    }
  }, [c2]);
  return d ? import_react24.default.createElement(import_react24.default.Fragment, null, a.slice(0, d.start), import_react24.default.createElement("span", { style: { backgroundColor: b6.highlight.background, color: b6.highlight.foreground } }, a.slice(d.start, d.end)), a.slice(d.end)) : a;
};
var NameLabel = ({ name: a }) => {
  const { colors: b6 } = (0, import_react24.useContext)(ThemeContext), c2 = "number" == typeof a, d = c2 ? b6.index : b6.key, e = c2 ? a : `"${a}"`;
  return import_react24.default.createElement("span", { style: { color: d } }, " ", import_react24.default.createElement("span", { style: { opacity: 0.85 } }, import_react24.default.createElement(StringWithHighlight, { value: e })), " : ");
};
var TypeValueLabel = ({ type: a, value: b6 }) => {
  const { colors: c2, truncate: d } = (0, import_react24.useContext)(ThemeContext);
  let e = ["nan", "null", "undefined"].includes(a), f = "string" === a ? `"${b6}"` : `${b6}`;
  if (d) {
    const a2 = true === d ? DEFAULT_TRUNCATE_LENGTH : d;
    f.length > a2 && (f = f.slice(0, a2 - 3) + "...");
  }
  return import_react24.default.createElement("span", { style: { color: c2.dataType[a], backgroundColor: e ? c2.dataType.background : void 0, borderRadius: 3, padding: e ? "2px 5px" : 0 } }, !e && import_react24.default.createElement("span", { style: { opacity: 0.8, fontSize: "small", margin: "0 4px" } }, a), import_react24.default.createElement("span", null, import_react24.default.createElement(StringWithHighlight, { value: f })));
};
var Toolbar = () => {
  const { colors: a, searchTerm: b6, onExpandAll: c2, onSearch: d } = (0, import_react24.useContext)(ThemeContext);
  return import_react24.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${a.toolbar?.border}`, padding: "3px 0 5px 0" } }, import_react24.default.createElement("span", { style: { display: "flex" } }, import_react24.default.createElement("span", { style: { cursor: "pointer" }, onClick: () => c2(true) }, import_react24.default.createElement(ExpandAllIcon, null)), import_react24.default.createElement("span", { style: { cursor: "pointer" }, onClick: () => c2(false) }, import_react24.default.createElement(CollapseAllIcon, null))), import_react24.default.createElement("input", { value: b6, onChange: (a2) => d(a2.target.value), placeholder: "Search", style: { backgroundColor: a.toolbar.background, borderRadius: 3, padding: "3px 5px", outline: "none" } }));
};
var JsonData = ({ name: a, value: b6, nestedLevel: c2 = 0 }) => {
  const { colors: d, expanded: e, searchTerm: f, indentWidth: g, expandAll: h } = (0, import_react24.useContext)(ThemeContext), [i, j] = import_react24.default.useState(true === e || false !== e && e > c2);
  (0, import_react24.useLayoutEffect)(() => {
    h && j(h.expanded);
  }, [h]), (0, import_react24.useLayoutEffect)(() => {
    if (b6 && f)
      try {
        0 < JSON.stringify(b6).indexOf(f) && j(true);
      } catch (a2) {
      }
  }, [f]);
  const k = import_react24.default.useMemo(() => type(b6), [b6]), l = import_react24.default.useMemo(() => "array" === k ? b6.map((a2, b7) => ({ name: b7, value: a2 })) : "object" === k ? Object.keys(b6).map((a2) => ({ name: a2, value: b6[a2] })) : null, [k, b6]), m = import_react24.default.useCallback(({ children: a2 }) => import_react24.default.createElement("span", { style: { cursor: "pointer", display: "inline-block" }, onClick: () => {
    j(!i);
  } }, a2), [i, j]);
  return import_react24.default.createElement("div", { "data-json-viewer": a }, import_react24.default.createElement("div", { style: { letterSpacing: 0.5, padding: "3px 0" } }, l && import_react24.default.createElement(import_react24.default.Fragment, null, import_react24.default.createElement(m, null, import_react24.default.createElement(ExpandIcon, { expanded: i })), " "), (a || 0 === a) && import_react24.default.createElement(NameLabel, { name: a }), l ? import_react24.default.createElement(import_react24.default.Fragment, null, import_react24.default.createElement("span", { style: { color: d.brace } }, "array" === k ? "[" : "{"), !i && import_react24.default.createElement(import_react24.default.Fragment, null, import_react24.default.createElement(m, null, import_react24.default.createElement("span", { style: { color: d.ellipsis } }, "...")), import_react24.default.createElement("span", { style: { color: d.brace } }, "array" === k ? "]" : "}")), import_react24.default.createElement("span", { style: { color: d.size, opacity: 0.85, fontStyle: "italic", fontSize: "smaller" } }, " ", l?.length, " ", 1 === l?.length ? "item" : "items"), i && import_react24.default.createElement(import_react24.default.Fragment, null, import_react24.default.createElement("div", { "data-body": a, style: { paddingLeft: INDENTATION_SIZE * g, marginLeft: 8, borderLeft: `1px solid ${d.border}` } }, l?.map((a2, b7) => import_react24.default.createElement(JsonData, { key: b7, name: a2.name, value: a2.value, nestedLevel: c2 + 1 }))), import_react24.default.createElement("span", { style: { color: d.key, marginLeft: 6 } }, "array" === k ? "]" : "}"))) : import_react24.default.createElement(TypeValueLabel, { type: k, value: b6 })));
};
var JsonViewer = ({ data: a, showRoot: b6, toolbar: c2, theme: d, expanded: e, indentWidth: f, style: g, truncate: h }) => {
  const i = "string" == typeof d && themes[d] || { ...DEFAULT_THEME, ...d }, j = colorMap(i), [k, l] = import_react24.default.useState(""), [m, n] = import_react24.default.useState(null);
  return import_react24.default.createElement(ThemeContext.Provider, { value: { colors: j, expanded: e, expandAll: m, searchTerm: k, indentWidth: f, truncate: h, onExpandAll: (a2) => n({ expanded: a2, timestamp: Date.now() }), onSearch: (a2) => l(a2) } }, import_react24.default.createElement("div", { "data-json-viewer": true, style: { backgroundColor: j.background, fontFamily: "monospace", overflow: "auto", ...g } }, c2 && import_react24.default.createElement(Toolbar, null), import_react24.default.createElement(JsonData, { name: !!b6 && "root", value: a })));
};
JsonViewer.propTypes = { data: import_prop_types24.default.object.isRequired, style: import_prop_types24.default.object, toolbar: import_prop_types24.default.bool, showRoot: import_prop_types24.default.bool, theme: import_prop_types24.default.oneOfType([import_prop_types24.default.shape({ base00: import_prop_types24.default.string, base01: import_prop_types24.default.string, base02: import_prop_types24.default.string, base03: import_prop_types24.default.string, base04: import_prop_types24.default.string, base05: import_prop_types24.default.string, base06: import_prop_types24.default.string, base07: import_prop_types24.default.string, base08: import_prop_types24.default.string, base09: import_prop_types24.default.string, base0A: import_prop_types24.default.string, base0B: import_prop_types24.default.string, base0C: import_prop_types24.default.string, base0D: import_prop_types24.default.string, base0E: import_prop_types24.default.string, base0F: import_prop_types24.default.string }), import_prop_types24.default.oneOf(["dark", "light"])]), expanded: import_prop_types24.default.oneOfType([import_prop_types24.default.number, import_prop_types24.default.bool]), truncate: import_prop_types24.default.oneOfType([import_prop_types24.default.bool, import_prop_types24.default.number]), indentWidth: import_prop_types24.default.number }, JsonViewer.defaultProps = { showRoot: false, indentWidth: 4, toolbar: false, expanded: 1, truncate: false, style: void 0, data: {}, theme: null };

// node_modules/juno-ui-components/build/CodeBlock.component-94df30d1.js
var wrapperStyles = `
  jn-bg-theme-code-block
  jn-rounded
`;
var preStyles = (a) => `
    jn-p-6
    ${a ? "jn-break-words jn-break-all jn-whitespace-pre-wrap" : "jn-overflow-x-auto"}
  `;
var sizeStyles = (a) => "small" === a ? `
        juno-codeblock-pre-small
        jn-max-h-64
        jn-overflow-y-auto
      ` : "medium" === a ? `
        juno-codeblock-pre-medium
        jn-max-h-[32rem]
        jn-overflow-y-auto
      ` : "large" === a ? `
        juno-codeblock-pre-large
        jn-max-h-[56rem]
        jn-overflow-y-auto
      ` : ``;
var codeStyles2 = `
  jn-bg-theme-code-block
  jn-text-sm
`;
var headingStyles2 = `
  jn-text-sm
  jn-border-b-[1px]
  jn-border-theme-codeblock-bar 
  jn-h-[3.4375rem]
  jn-flex
`;
var headingInnerStyles = `
  jn-flex
  jn-font-bold
  jn-px-[1.5625rem]
  jn-items-center
`;
var bottomBarStyles = `
  jn-flex 
  jn-justify-end 
  jn-px-3
  jn-py-2 
  jn-border-t-[1px]
  jn-border-theme-codeblock-bar
`;
var copyTextStyles = `
  jn-font-bold 
  jn-text-sm 
  jn-mr-4 
  jn-mt-1
`;
var jsonViewStyles = { fontFamily: "IBM Plex Mono", fontSize: "0.875rem", padding: "1.5rem" };
var jsonTheme = { base00: "var(--color-syntax-highlight-base00)", base01: "var(--color-syntax-highlight-base01)", base02: "var(--color-syntax-highlight-base02)", base03: "var(--color-syntax-highlight-base03)", base04: "var(--color-syntax-highlight-base04)", base05: "var(--color-syntax-highlight-base05)", base06: "var(--color-syntax-highlight-base06)", base07: "var(--color-syntax-highlight-base07)", base08: "var(--color-syntax-highlight-base08)", base09: "var(--color-syntax-highlight-base09)", base0A: "var(--color-syntax-highlight-base0A)", base0B: "var(--color-syntax-highlight-base0B)", base0C: "var(--color-syntax-highlight-base0C)", base0D: "var(--color-syntax-highlight-base0D)", base0E: "var(--color-syntax-highlight-base0E)", base0F: "var(--color-syntax-highlight-base0F)" };
var CodeBlock = ({ content: a, children: b6, heading: c2, wrap: d, size: e, copy: f, lang: g, className: h, ...i }) => {
  const [j, k] = (0, import_react25.useState)(false), l = import_react25.default.useRef(null);
  import_react25.default.useEffect(() => () => clearTimeout(l.current), []);
  const m = (0, import_react25.useRef)(null);
  return import_react25.default.createElement("div", _extends({ className: `juno-code-block ${wrapperStyles} ${g ? `juno-code-block-lang-${g}` : ""} ${h}`, "data-lang": g || null }, i), c2 && c2.length ? import_react25.default.createElement("div", { className: `juno-codeblock-heading ${headingStyles2}` }, import_react25.default.createElement("span", { className: `${headingInnerStyles}` }, c2)) : "", "json" === g ? import_react25.default.createElement(JsonViewer, { data: a, expanded: 3, theme: jsonTheme, style: jsonViewStyles }) : import_react25.default.createElement("pre", { className: `juno-code-block-pre ${preStyles(d)} ${sizeStyles(e)}` }, import_react25.default.createElement("code", { className: `${codeStyles2}`, ref: m }, a || b6)), f ? import_react25.default.createElement("div", { className: `juno-codeblock-bottombar ${bottomBarStyles}` }, import_react25.default.createElement("span", { className: `${copyTextStyles}` }, j ? "Copied!" : ""), import_react25.default.createElement(Icon, { icon: "contentCopy", onClick: () => {
    const c3 = "json" === g ? JSON.stringify(a || b6) : m.current.textContent;
    navigator.clipboard.writeText(c3), k(true), clearTimeout(l.current), l.current = setTimeout(() => k(false), 1e3);
  } })) : "");
};
CodeBlock.propTypes = { content: import_prop_types25.default.oneOfType([import_prop_types25.default.string, import_prop_types25.default.object]), children: import_prop_types25.default.oneOfType([import_prop_types25.default.node, import_prop_types25.default.object]), heading: import_prop_types25.default.string, wrap: import_prop_types25.default.bool, size: import_prop_types25.default.oneOf(["auto", "small", "medium", "large"]), copy: import_prop_types25.default.bool, lang: import_prop_types25.default.string, className: import_prop_types25.default.string }, CodeBlock.defaultProps = { content: "", children: null, wrap: true, size: "auto", copy: true, lang: "", className: "" };

// node_modules/juno-ui-components/build/ContentAreaToolbar.component-46604554.js
var import_react26 = __toESM(require_react());
var import_prop_types26 = __toESM(require_prop_types());
var toolbarStyles2 = `
  jn-bg-theme-background-lvl-1
  jn-py-3
  jn-px-6
  jn-flex
  jn-items-center
  jn-justify-end
`;
var ContentAreaToolbar = ({ className: a, children: b6, ...c2 }) => import_react26.default.createElement("div", _extends({ className: `juno-content-area-toolbar ${toolbarStyles2} ${a}` }, c2), b6);
ContentAreaToolbar.propTypes = { className: import_prop_types26.default.string }, ContentAreaToolbar.defaultProps = { className: "" };

// node_modules/juno-ui-components/build/ContentAreaWrapper.component-30178b78.js
var import_react27 = __toESM(require_react());
var import_prop_types27 = __toESM(require_prop_types());
var containerStyles4 = `
  jn-relative
  jn-grow
  jn-flex
  jn-flex-col
  jn-overflow-hidden
`;
var ContentAreaWrapper = ({ className: a, children: b6, ...c2 }) => import_react27.default.createElement("div", _extends({ className: `juno-content-area-wrapper ${containerStyles4} ${a}` }, c2), b6);
ContentAreaWrapper.propTypes = { className: import_prop_types27.default.string }, ContentAreaWrapper.defaultProps = { className: "" };

// node_modules/juno-ui-components/build/Container.component-51f141d3.js
var import_react28 = __toESM(require_react());
var import_prop_types28 = __toESM(require_prop_types());
var containerStyles5 = (a, b6) => `
    ${a ? "jn-px-6 " : " "} 
    ${b6 ? " jn-py-6" : ""}
  `;
var Container = ({ px: a, py: b6, className: c2, children: d, ...e }) => import_react28.default.createElement("div", _extends({ className: `juno-container ${containerStyles5(a, b6)} ${c2}` }, e), d);
Container.propTypes = { px: import_prop_types28.default.bool, py: import_prop_types28.default.bool, className: import_prop_types28.default.string }, Container.defaultProps = { px: true, py: false, className: "" };

// node_modules/juno-ui-components/build/DataList.component-9bf888b5.js
var import_react29 = __toESM(require_react());
var import_prop_types29 = __toESM(require_prop_types());
var DataListContext = import_react29.default.createContext();
var useDataListContext = () => import_react29.default.useContext(DataListContext);
var DataList = ({ selectable: a, className: b6, children: c2, ...d }) => {
  return import_react29.default.createElement(DataListContext.Provider, { value: { selectable: a } }, import_react29.default.createElement("div", { className: `juno-datalist-container` }, import_react29.default.createElement("ul", _extends({ className: `juno-datalist ${b6}` }, d), c2)));
};
DataList.propTypes = { selectable: import_prop_types29.default.bool, className: import_prop_types29.default.string, children: import_prop_types29.default.node }, DataList.defaultProps = { selectable: false, className: "", children: null };

// node_modules/juno-ui-components/build/DataListCell.component-60a63018.js
var import_react30 = __toESM(require_react());
var import_prop_types30 = __toESM(require_prop_types());
var datalistcellbasestyles = `
	jn-flex
	jn-p-2
	jn-overflow-hidden
	jn-overflow-ellipsis
	jn-grow-0
	jn-shrink-0
	jn-flex-basis-auto
`;
var cols_1 = `
	jn-w-grid-col-1
`;
var cols_2 = `
	jn-w-grid-col-2
`;
var cols_3 = `
	jn-w-grid-col-3
`;
var cols_4 = `
	jn-w-grid-col-4
`;
var cols_5 = `
	jn-w-grid-col-6
`;
var cols_6 = `
	jn-w-grid-col-6
`;
var cols_7 = `
	jn-w-grid-col-7
`;
var cols_8 = `
	jn-w-grid-col-8
`;
var cols_9 = `
	jn-w-grid-col-9
`;
var cols_10 = `
	jn-w-grid-col-10
`;
var cols_11 = `
	jn-w-grid-col-11
`;
var cols_12 = `
	jn-w-grid-col-12
`;
var colsClass = (a) => 1 === a ? cols_1 : 2 === a ? cols_2 : 3 === a ? cols_3 : 4 === a ? cols_4 : 5 === a ? cols_5 : 6 === a ? cols_6 : 7 === a ? cols_7 : 8 === a ? cols_8 : 9 === a ? cols_9 : 10 === a ? cols_10 : 11 === a ? cols_11 : 12 === a ? cols_12 : void 0;
var DataListCell = ({ cols: a, width: b6, auto: c2, className: d, children: e, ...f }) => {
  const g = b6 ? { width: b6 + "%", flexGrow: "0", flexShrink: "0", flexBasis: b6 + "%" } : {}, h = b6 ? g : c2 ? { flexGrow: "1", flexShrink: "0", flexBasis: "0" } : {};
  return import_react30.default.createElement("div", _extends({ className: `juno-datalist-cell ${datalistcellbasestyles} ${a ? colsClass(a) : ""} ${d}`, style: h }, f), e);
};
DataListCell.propTypes = { cols: import_prop_types30.default.number, width: import_prop_types30.default.number, auto: import_prop_types30.default.bool, className: import_prop_types30.default.string, children: import_prop_types30.default.node }, DataListCell.defaultProps = { cols: null, width: null, auto: false, className: "", children: null };

// node_modules/juno-ui-components/build/DataListCheckboxCell.component-fd10b745.js
var import_react31 = __toESM(require_react());
var import_prop_types31 = __toESM(require_prop_types());
var datalistcheckboxcellbasestyles = `
	jn-flex
	jn-flex-col
	jn-justify-center
`;
var DataListCheckboxCell = ({ selected: a, disabled: b6, onChange: c2, className: d, children: e, ...f }) => import_react31.default.createElement(DataListCell, _extends({ className: `juno-datalist-checkbox-cell ${datalistcheckboxcellbasestyles} ${d}` }, f), import_react31.default.createElement(Checkbox, { disabled: b6, checked: a, onChange: c2 }));
DataListCheckboxCell.propTypes = { selected: import_prop_types31.default.bool, disabled: import_prop_types31.default.bool, className: import_prop_types31.default.string, children: import_prop_types31.default.node, onChange: import_prop_types31.default.func }, DataListCell.defaultProps = { selected: false, disabled: false, className: "", children: null, onChange: void 0 };

// node_modules/juno-ui-components/build/DataListRow.component-6c1b50e6.js
var import_react32 = __toESM(require_react());
var import_prop_types32 = __toESM(require_prop_types());
var datalistrowbasestyles = `
	jn-flex
	jn-rounded-[3px]
	jn-border
	jn-border-theme-datalist-row
	jn-mb-2
`;
var rowselectedstyle = `
	jn-bg-theme-datalistrow-selected
`;
var DataListRow = ({ selected: a, disabled: b6, onChange: c2, className: d, children: e, ...f }) => {
  const g = useDataListContext() || {}, h = g.selectable, [i, j] = (0, import_react32.useState)(false);
  (0, import_react32.useEffect)(() => {
    j(a);
  }, [a]);
  return import_react32.default.createElement("li", _extends({ className: `juno-datalist-row ${datalistrowbasestyles} ${h && i ? rowselectedstyle : ""}${d}` }, f), h ? import_react32.default.createElement(DataListCheckboxCell, { selected: a, disabled: b6, onChange: (a2) => {
    j(!i), c2(a2);
  } }) : null, e);
};
DataListRow.propTypes = { className: import_prop_types32.default.string, children: import_prop_types32.default.node }, DataListRow.defaultProps = { className: "", children: null };

// node_modules/juno-ui-components/build/DataGrid.component-65aaa1c3.js
var import_react33 = __toESM(require_react());
var import_prop_types33 = __toESM(require_prop_types());
var dataGridStyles = `
	jn-grid
	jn-items-stretch
`;
var gridTemplate = (a, b6, c2, d, e) => {
  let f;
  if (e && 0 < e.length)
    return f = { gridTemplateColumns: e }, f;
  let g = "";
  return d && Array.isArray(d) && 0 < d.length ? [...Array(a)].map((a2, e2) => {
    g += d.includes(e2) ? "min-content " : `minmax(${c2}, ${b6}) `;
  }) : g = `repeat(${a}, minmax(${c2}, ${b6}))`, f = { gridTemplateColumns: g }, f;
};
var DataGridContext = import_react33.default.createContext();
var useDataGridContext = () => import_react33.default.useContext(DataGridContext);
var DataGrid = ({ columns: a, columnMaxSize: b6, columnMinSize: c2, minContentColumns: d, gridColumnTemplate: e, cellVerticalAlignment: f, className: g, children: h, ...i }) => {
  return import_react33.default.createElement(DataGridContext.Provider, { value: { cellVerticalAlignment: f } }, import_react33.default.createElement("div", _extends({ className: `juno-datagrid ${dataGridStyles} ${g}`, style: gridTemplate(a, b6, c2, d, e), role: "grid" }, i), h));
};
DataGrid.propTypes = { columns: import_prop_types33.default.number, columnMaxSize: import_prop_types33.default.string, columnMinSize: import_prop_types33.default.string, minContentColumns: import_prop_types33.default.arrayOf(import_prop_types33.default.number), gridColumnTemplate: import_prop_types33.default.string, cellVerticalAlignment: import_prop_types33.default.oneOf(["center", "top"]), children: import_prop_types33.default.node, className: import_prop_types33.default.string }, DataGrid.defaultProps = { columns: 1, columnMaxSize: "auto", columnMinSize: "0px", minContentColumns: void 0, gridColumnTemplate: void 0, cellVerticalAlignment: "center", className: "", children: null };

// node_modules/juno-ui-components/build/DataGridCell.component-e614c4e8.js
var import_react34 = __toESM(require_react());
var import_prop_types34 = __toESM(require_prop_types());
var cellBaseStyles = (a, b6) => `
		${a ? "jn-whitespace-nowrap" : ""}
		${"center" === b6 ? `
				jn-justify-center
				jn-flex
				jn-flex-col		
			` : ""}
		jn-px-5
		jn-py-3
		jn-border-b
		jn-border-theme-background-lvl-2
		jn-h-full
	`;
var cellCustomStyles = (a) => {
  let b6;
  return a && (b6 = { gridColumn: `span ${a} / span ${a}` }), b6;
};
var DataGridCell = ({ colSpan: a, nowrap: b6, className: c2, children: d, ...e }) => {
  const f = useDataGridContext() || {}, g = f.cellVerticalAlignment;
  return import_react34.default.createElement("div", _extends({ className: `juno-datagrid-cell ${cellBaseStyles(b6, g)} ${c2}`, style: cellCustomStyles(a), role: "gridcell" }, e), d);
};
DataGridCell.propTypes = { colSpan: import_prop_types34.default.number, nowrap: import_prop_types34.default.bool, children: import_prop_types34.default.node, className: import_prop_types34.default.string }, DataGridCell.defaultProps = { colSpan: void 0, nowrap: false, className: "", children: null };

// node_modules/juno-ui-components/build/DataGridHeadCell.component-e3e04bd3.js
var import_react35 = __toESM(require_react());
var import_prop_types35 = __toESM(require_prop_types());
var headCellBaseStyles = `
	jn-font-bold
	jn-text-theme-high
	jn-bg-theme-background-lvl-1
	jn-border-theme-background-lvl-0
`;
var DataGridHeadCell = ({ colSpan: a, nowrap: b6, className: c2, children: d, ...e }) => import_react35.default.createElement(DataGridCell, _extends({ colSpan: a, nowrap: b6, className: `juno-datagrid-head-cell ${headCellBaseStyles} ${c2}`, role: "columnheader" }, e), d);
DataGridHeadCell.propTypes = { colSpan: import_prop_types35.default.number, nowrap: import_prop_types35.default.bool, children: import_prop_types35.default.node, className: import_prop_types35.default.string }, DataGridHeadCell.defaultProps = { colSpan: void 0, nowrap: false, className: "", children: null };

// node_modules/juno-ui-components/build/DataGridRow.component-f1afe91d.js
var import_react36 = __toESM(require_react());
var import_prop_types36 = __toESM(require_prop_types());
var rowBaseStyle = `
	jn-contents
`;
var DataGridRow = ({ selected: a, disabled: b6, className: c2, children: d, onChange: e, ...f }) => import_react36.default.createElement("div", _extends({ className: `juno-datagrid-row ${rowBaseStyle} ${c2}`, role: "row" }, f), d);
DataGridRow.propTypes = { children: import_prop_types36.default.node, className: import_prop_types36.default.string }, DataGridRow.defaultProps = { className: "", children: null };

// node_modules/juno-ui-components/build/DataGridToolbar.component-c0f8d124.js
var import_react37 = __toESM(require_react());
var import_prop_types37 = __toESM(require_prop_types());
var datagridtoolbarstyles = `
	jn-flex
	jn-items-center
	jn-bg-theme-background-lvl-1
	jn-py-3
	jn-px-6
	jn-mb-px
`;
var childrenWrapperStyles = `
	jn-ml-auto
`;
var DataGridToolbar = ({ search: a, className: b6, children: c2, ...d }) => import_react37.default.createElement("div", _extends({ className: `juno-datagrid-toolbar ${datagridtoolbarstyles} ${b6}` }, d), a && import_react37.default.createElement("div", null, a), import_react37.default.createElement("div", { className: childrenWrapperStyles }, c2));
DataGridToolbar.propTypes = { search: import_prop_types37.default.node, children: import_prop_types37.default.node, className: import_prop_types37.default.string }, DataGridToolbar.defaultProps = { search: void 0, className: "", children: null };

// node_modules/juno-ui-components/build/FilterInput.component-4e6e4ac6.js
var import_react41 = __toESM(require_react());
var import_prop_types41 = __toESM(require_prop_types());

// node_modules/juno-ui-components/build/NativeSelect.component-7833a09e.js
var import_react38 = __toESM(require_react());
var import_prop_types38 = __toESM(require_prop_types());
var selectstyles = `
	jn-w-full
	jn-bg-theme-select
	jn-text-theme-high
	jn-appearance-none
	jn-text-base
	jn-pl-4
	jn-h-[2.375rem]
	jn-rounded-3px
	jn-bg-icon-arrow-down
	jn-bg-right
	jn-bg-no-repeat
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
	disabled:jn-opacity-50
`;
var wrapperstyles = `
	jn-relative
`;
var iconstyles3 = `
	jn-absolute
	jn-flex
	jn-right-2
	jn-top-1.5
	jn-pointer-events-none
`;
var disablediconstyles = `
	jn-opacity-50
`;
var errorstyles2 = `
	jn-border
	jn-border-theme-error
`;
var successstyles2 = `
	jn-border
	jn-border-theme-success
`;
var loadingStyles = `
	jn-absolute
	jn-top-0
	jn-right-0
	jn-bottom-0
	jn-left-0
	jn-text-center
	jn-bg-theme-select
	jn-text-theme-high
	jn-text-base
	jn-rounded-3px
	jn-flex
	jn-flex-col
	jn-justify-center
	jn-select-none
	jn-cursor-not-allowed
`;
var errorStyles2 = `
	jn-absolute
	jn-top-0
	jn-right-0
	jn-bottom-0
	jn-left-0
	jn-text-center
	jn-bg-theme-select
	jn-text-theme-high
	jn-text-base
	jn-rounded-3px
	jn-flex
	jn-flex-col
	jn-justify-center
	jn-select-none
	jn-cursor-not-allowed
`;
var loadingSpinnerStyles = `
	jn-ml-auto
	jn-mr-auto
`;
var errorIconStyles = `
	jn-ml-auto
	jn-mr-auto
`;
var iconpaddingright = `
	jn-pr-[3.75rem]
`;
var defaultpaddingright = `
	jn-pr-9
`;
var NativeSelect = ({ name: a, id: b6, children: c2, className: d, disabled: e, invalid: f, valid: g, loading: h, error: i, onChange: j, onClick: k, ...l }) => {
  const [m, n] = (0, import_react38.useState)(false), [o2, p] = (0, import_react38.useState)(false), [q, r2] = (0, import_react38.useState)(false), [s, t] = (0, import_react38.useState)(false);
  (0, import_react38.useEffect)(() => {
    n(h);
  }, [h]), (0, import_react38.useEffect)(() => {
    p(f);
  }, [f]), (0, import_react38.useEffect)(() => {
    r2(g);
  }, [g]), (0, import_react38.useEffect)(() => {
    t(i);
  }, [i]);
  return import_react38.default.createElement("div", { className: `juno-select-wrapper ${wrapperstyles}` }, import_react38.default.createElement("select", _extends({ name: a || "Unnamed Select", id: b6, className: `juno-select ${selectstyles} ${o2 ? "juno-select-invalid " + errorstyles2 : ""} ${q ? "juno-select-valid " + successstyles2 : ""} ${s ? "juno-select-error " : ""} ${(() => q || o2 ? iconpaddingright : defaultpaddingright)()} ${d}`, onChange: (a2) => {
    j && j(a2);
  }, onClick: (a2) => {
    k && k(a2);
  }, disabled: e || m || s }, l), c2), import_react38.default.createElement(({ disabled: a2 }) => m ? import_react38.default.createElement("div", { className: `juno-select-loading ${loadingStyles}` }, import_react38.default.createElement(Spinner, { className: `${loadingSpinnerStyles}` })) : s ? import_react38.default.createElement("div", { className: `juno-select-errortext ${errorStyles2}` }, import_react38.default.createElement(Icon, { icon: "errorOutline", color: "jn-text-theme-error", className: `${errorIconStyles}` })) : import_react38.default.createElement("div", { className: `${iconstyles3} ${a2 ? disablediconstyles : ""} ` }, o2 ? import_react38.default.createElement(Icon, { icon: "dangerous", color: "jn-text-theme-error" }) : null, q ? import_react38.default.createElement(Icon, { icon: "checkCircle", color: "jn-text-theme-success" }) : null, import_react38.default.createElement(Icon, { icon: "expandMore" })), { disabled: e }));
};
NativeSelect.propTypes = { name: import_prop_types38.default.string, id: import_prop_types38.default.string, className: import_prop_types38.default.string, children: import_prop_types38.default.node, disabled: import_prop_types38.default.bool, invalid: import_prop_types38.default.bool, valid: import_prop_types38.default.bool, loading: import_prop_types38.default.bool, error: import_prop_types38.default.bool, onChange: import_prop_types38.default.func, onClick: import_prop_types38.default.func }, NativeSelect.defaultProps = { name: null, id: "", className: "", disabled: null, invalid: false, valid: false, loading: false, error: false, onChange: void 0, onClick: void 0 };

// node_modules/juno-ui-components/build/NativeSelectOption.component-5287d66a.js
var import_react39 = __toESM(require_react());
var import_prop_types39 = __toESM(require_prop_types());
var NativeSelectOption = ({ value: a, label: b6, disabled: c2, className: d, ...e }) => import_react39.default.createElement("option", _extends({ value: a, disabled: c2, className: `juno-select-option ${d}` }, e), b6 || a);
NativeSelectOption.propTypes = { label: import_prop_types39.default.oneOfType([import_prop_types39.default.string, import_prop_types39.default.number]), value: import_prop_types39.default.oneOfType([import_prop_types39.default.string, import_prop_types39.default.number]), disabled: import_prop_types39.default.bool, className: import_prop_types39.default.string }, NativeSelectOption.defaultProps = { value: null, label: null, disabled: false, className: "" };

// node_modules/juno-ui-components/build/TextInput.component-622701fa.js
var import_react40 = __toESM(require_react());
var import_prop_types40 = __toESM(require_prop_types());
var textinputstyles = `
	jn-bg-theme-textinput
	jn-text-theme-textinput
	jn-text-base
	jn-leading-4
	jn-p-4
	jn-h-textinput
	jn-border
	jn-rounded-3px
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
	disabled:jn-opacity-50
`;
var defaultborderstyles = `
	jn-border-transparent
`;
var invalidstyles = `
	jn-border-theme-error
`;
var validstyles = `
	jn-border-theme-success
`;
var TextInput = ({ name: a, value: b6, id: c2, type: d, placeholder: e, disabled: f, readOnly: g, invalid: h, valid: i, autoFocus: j, className: k, autoComplete: l, onChange: m, ...n }) => {
  const [o2, p] = (0, import_react40.useState)(""), [q, r2] = (0, import_react40.useState)(false), [s, t] = (0, import_react40.useState)(false);
  (0, import_react40.useEffect)(() => {
    p(b6);
  }, [b6]), (0, import_react40.useEffect)(() => {
    r2(h);
  }, [h]), (0, import_react40.useEffect)(() => {
    t(i);
  }, [i]);
  return import_react40.default.createElement("input", _extends({ type: d, name: a || "unnamed input", autoComplete: l, value: o2, id: c2, placeholder: e, disabled: f, readOnly: g, autoFocus: j, onChange: (a2) => {
    p(a2.target.value), m && m(a2);
  }, className: `juno-textinput ${textinputstyles} ${q ? "juno-textinput-invalid " + invalidstyles : ""} ${s ? "juno-textinput-valid " + validstyles : ""}  ${s || q ? "" : defaultborderstyles} ${k}` }, n));
};
TextInput.propTypes = { name: import_prop_types40.default.string, value: import_prop_types40.default.oneOfType([import_prop_types40.default.string, import_prop_types40.default.number]), id: import_prop_types40.default.string, placeholder: import_prop_types40.default.string, disabled: import_prop_types40.default.bool, readOnly: import_prop_types40.default.bool, invalid: import_prop_types40.default.bool, valid: import_prop_types40.default.bool, autoFocus: import_prop_types40.default.bool, className: import_prop_types40.default.string, autoComplete: import_prop_types40.default.string, onChange: import_prop_types40.default.func, type: import_prop_types40.default.oneOf(["text", "email", "password", "tel", "url", "number"]) }, TextInput.defaultProps = { value: "", id: "", placeholder: "", disabled: false, readOnly: false, invalid: false, valid: false, autoFocus: false, className: "", autoComplete: "off", onChange: void 0, type: null };

// node_modules/juno-ui-components/build/FilterInput.component-4e6e4ac6.js
var wrapperStyles2 = `
	jn-flex
	jn-relative
	jn-p-px
	jn-border
	jn-rounded
	jn-bg-theme-filter-input
`;
var defaultWrapperStyles = `
  jn-border-theme-filter-input
`;
var errorWrapperStyles = `
  jn-border-theme-error
`;
var selectStyles = `
	jn-rounded-r-none
`;
var textInputStyles = `
	jn-grow
	jn-rounded-l-none
	jn-pr-16
	!jn-bg-theme-filter-input-textinput
	focus:jn-z-40
`;
var iconWrapperStyles = `
	jn-absolute
	jn-flex
	jn-right-2
	jn-top-1.5
	jn-z-50
`;
var FilterInput = ({ keyLabel: a, options: b6, valueLabel: c2, className: d, selectedFilterKey: e, onSelectedFilterKeyChange: f, filterValue: g, valuePlaceholder: h, onFilterValueChange: i, onClear: j, onKeyPress: k, onFilter: l, loading: m, error: n, ...o2 }) => {
  const [p, q] = (0, import_react41.useState)(e), [r2, s] = (0, import_react41.useState)(g), [t, u] = (0, import_react41.useState)(1 > b6.length || m), [v, w] = (0, import_react41.useState)(n);
  (0, import_react41.useEffect)(() => {
    s(g);
  }, [g]), (0, import_react41.useEffect)(() => {
    q(e);
  }, [e]), (0, import_react41.useEffect)(() => {
    1 > b6.length || m ? (u(true), s("")) : u(false);
  }, [b6, m]), (0, import_react41.useEffect)(() => {
    w(n);
  }, [n]);
  return import_react41.default.createElement("div", _extends({ className: `juno-filter-input ${wrapperStyles2} ${t ? "juno-filter-input-loading " : ""} ${v ? "juno-filter-input-error " : ""} ${v ? errorWrapperStyles : defaultWrapperStyles} ${d}` }, o2), import_react41.default.createElement("div", null, import_react41.default.createElement(NativeSelect, { className: `juno-filter-input-select ${selectStyles}`, "aria-label": a, value: p, onChange: (a2) => {
    q(a2.target.value), s(""), f && f(a2);
  }, loading: t, error: v }, '// First "Placeholder" option:', import_react41.default.createElement(NativeSelectOption, { label: a || "Select Filter", value: "" }), "// Options representing actual filter key values:", b6.map((a2, b7) => import_react41.default.createElement(NativeSelectOption, _extends({ label: a2.label, value: a2.key, key: `${b7}` }, a2))))), import_react41.default.createElement(TextInput, { value: r2, className: `${textInputStyles}`, "aria-label": c2, onChange: (a2) => {
    s(a2.target.value), i && i(a2);
  }, onKeyPress: (a2) => {
    "Enter" === a2.key && l && l && l(r2), k && k(a2);
  }, disabled: t || v, placeholder: t ? "Loading Filter Options\u2026" : h }), import_react41.default.createElement("div", { className: `${iconWrapperStyles}` }, r2 && r2.length ? import_react41.default.createElement(Icon, { icon: "close", title: "Clear", size: "18", className: `jn-mr-2`, onClick: (a2) => {
    s(""), j && j(a2);
  } }) : null, import_react41.default.createElement(Icon, { icon: "filterAlt", title: "Filter", disabled: t || v, onClick: () => {
    l && l(r2);
  } })));
};
FilterInput.propTypes = { keyLabel: import_prop_types41.default.string, options: import_prop_types41.default.arrayOf(import_prop_types41.default.object), selectedFilterKey: import_prop_types41.default.string, onSelectedFilterKeyChange: import_prop_types41.default.func, valueLabel: import_prop_types41.default.string, filterValue: import_prop_types41.default.string, valuePlaceholder: import_prop_types41.default.string, onFilterValueChange: import_prop_types41.default.func, onClear: import_prop_types41.default.func, loading: import_prop_types41.default.bool, className: import_prop_types41.default.string, onFilter: import_prop_types41.default.func, error: import_prop_types41.default.bool }, FilterInput.defaultProps = { keyLabel: "Select Filter", options: [], selectedFilterKey: "", onSelectedFilterKeyChange: void 0, valueLabel: "Filter by Value", filterValue: "", valuePlaceholder: "", onFilterValueChange: void 0, onClear: void 0, onFilter: void 0, loading: false, className: "", error: false };

// node_modules/juno-ui-components/build/FilterPill.component-e2a56f8b.js
var import_react42 = __toESM(require_react());
var import_prop_types42 = __toESM(require_prop_types());
var filterpillStyles = `
	jn-inline-flex
	jn-basis-auto
	jn-shrink
	jn-items-center
	jn-flex-nowrap
	jn-text-xs
	jn-p-px
	jn-border
	jn-rounded
	jn-mr-2
	jn-border-theme-filter-pill
	last:jn-mr-0
`;
var filterkeyStyles = `
	jn-bg-theme-filter-pill-key
	jn-px-1
	jn-py-0.5
	jn-rounded-sm
	jn-inline-block
`;
var filtervalueStyles = `
	jn-px-1
	jn-py-0.5
	jn-text-theme-high
	jn-inline-block
`;
var FilterPill = ({ uid: a, filterKey: b6, filterKeyLabel: c2, filterValue: d, filterValueLabel: e, onClose: f, className: g, ...h }) => {
  return import_react42.default.createElement("div", _extends({ className: `juno-filterpill ${filterpillStyles} ${g}` }, h), import_react42.default.createElement("span", { className: `${filterkeyStyles}` }, c2 || b6), import_react42.default.createElement("span", { className: `${filtervalueStyles}` }, e || d), import_react42.default.createElement(Icon, { icon: "close", size: "18", onClick: () => {
    f && f(a || b6);
  } }));
};
FilterPill.propTypes = { uid: import_prop_types42.default.string, filterKey: import_prop_types42.default.string.isRequired, filterKeyLabel: import_prop_types42.default.string, filterValue: import_prop_types42.default.string.isRequired, filterValueLabel: import_prop_types42.default.string, className: import_prop_types42.default.string, onClose: import_prop_types42.default.func }, FilterPill.defaultProps = { uid: "", filterKey: "", filterKeyLabel: "", filterValue: "", filterValueLabel: "", onClose: void 0, className: "" };

// node_modules/juno-ui-components/build/Filters.component-c0b48e34.js
var import_react43 = __toESM(require_react());
var import_prop_types43 = __toESM(require_prop_types());
var filterStyles = `
	jn-mb-px
	jn-bg-theme-filters
	jn-rounded-t
	jn-pt-4
	jn-px-4
	jn-pb-2
`;
var inputWrapperStyles = `
	jn-w-full
	jn-flex
	jn-mb-2
`;
var searchWrapperStyles = `
	jn-ml-auto
`;
var filterPillWrapperStyles = `
	jn-flex
	jn-flex-wrap
`;
var errortextStyles = `
	jn-text-theme-error
	jn-text-sm
	jn-mt-[-0.25rem]
	jn-mb-1.5
`;
var Filters = ({ search: a, filters: b6, selectedFilterKey: c2, onSelectedFilterKeyChange: d, filterValue: e, valuePlaceholder: f, onFilterValueChange: g, onFilter: h, onFilterClear: i, children: j, className: k, loading: l, error: m, errortext: n, ...o2 }) => {
  const [p, q] = (0, import_react43.useState)(false), [r2, s] = (0, import_react43.useState)(false);
  return (0, import_react43.useEffect)(() => {
    s(m || "string" == typeof n && 0 < n.length);
  }, [m, n]), (0, import_react43.useEffect)(() => {
    q(l);
  }, [l]), import_react43.default.createElement("div", _extends({ className: `juno-filters ${r2 ? "juno-filters-error " : ""} ${filterStyles} ${k}` }, o2), import_react43.default.createElement("div", { className: `juno-filters-input-wrapper ${inputWrapperStyles}` }, b6 && b6.options ? import_react43.default.createElement(FilterInput, { keyLabel: b6.keyLabel, valueLabel: b6.valueLabel, options: b6.options, selectedFilterKey: c2, onSelectedFilterKeyChange: d, filterValue: e, valuePlaceholder: f, onFilterValueChange: g, onFilter: h, onClear: i, loading: p, error: r2 }) : null, a ? import_react43.default.createElement("div", { className: `${searchWrapperStyles}` }, a) : null), r2 && n ? import_react43.default.createElement("div", { className: `juno-filters-errortext ${errortextStyles}` }, n) : "", import_react43.default.createElement("div", { className: `${filterPillWrapperStyles}` }, j));
};
Filters.propTypes = { search: import_prop_types43.default.node, filters: import_prop_types43.default.object, selectedFilterKey: import_prop_types43.default.string, onSelectedFilterKeyChange: import_prop_types43.default.func, filterValue: import_prop_types43.default.string, valuePlaceholder: import_prop_types43.default.string, onFilterValueChange: import_prop_types43.default.func, onFilter: import_prop_types43.default.func, onFilterClear: import_prop_types43.default.func, className: import_prop_types43.default.string, loading: import_prop_types43.default.bool, error: import_prop_types43.default.bool, errortext: import_prop_types43.default.string }, Filters.defaultProps = { search: null, filters: null, selectedFilterKey: "", onSelectedFilterKeyChange: void 0, filterValue: "", valuePlaceholder: "", onFilter: void 0, onFilterValueChange: void 0, onFilterClear: void 0, className: "", loading: false, error: false, errortext: "" };

// node_modules/juno-ui-components/build/Form.component-abb18ddb.js
var import_react44 = __toESM(require_react());
var import_prop_types44 = __toESM(require_prop_types());
var formStyles = `
	jn-mb-8
`;
var formHeading = `
	jn-text-2xl
	jn-font-bold
	jn-mb-4
`;
var Form = ({ title: a, className: b6, children: c2, ...d }) => import_react44.default.createElement("form", _extends({ className: `juno-form ${formStyles} ${b6}` }, d), a ? import_react44.default.createElement("h1", { className: `juno-form-heading ${formHeading}` }, a) : "", c2);
Form.propTypes = { title: import_prop_types44.default.string, className: import_prop_types44.default.string, children: import_prop_types44.default.node }, Form.defaultProps = { title: null, className: "", children: null };

// node_modules/juno-ui-components/build/FormSection.component-54fb3928.js
var import_react45 = __toESM(require_react());
var import_prop_types45 = __toESM(require_prop_types());
var formSection = `
	jn-mb-8
	jn-last:mb-0
`;
var formSectionHeading = `
	jn-text-lg
	jn-font-bold
	jn-mb-4
`;
var FormSection = ({ title: a, children: b6, className: c2, ...d }) => import_react45.default.createElement("section", _extends({ className: `juno-form-section ${formSection} ${c2}` }, d), a ? import_react45.default.createElement("h1", { className: `juno-formsection-heading ${formSectionHeading}` }, a) : "", b6);
FormSection.propTypes = { title: import_prop_types45.default.string, className: import_prop_types45.default.string, children: import_prop_types45.default.node }, FormSection.defaultProps = { title: null, className: "", children: null };

// node_modules/juno-ui-components/build/Grid.component-294d371f.js
var import_react46 = __toESM(require_react());
var import_prop_types46 = __toESM(require_prop_types());
var Grid = ({ auto: a, children: b6, className: c2, ...d }) => {
  const e = a ? { "--grid-column-flex-grow": "1", "--grid-column-flex-shrink": "0", "--grid-column-flex-basis": "0", "--grid-column-default-width": "auto" } : {};
  return import_react46.default.createElement("div", _extends({ className: `juno-grid ${c2}`, style: e }, d), b6);
};
Grid.propTypes = { auto: import_prop_types46.default.bool, children: import_prop_types46.default.node, className: import_prop_types46.default.string }, Grid.defaultProps = { auto: false, className: "", children: null };

// node_modules/juno-ui-components/build/GridRow.component-5b4eeca9.js
var import_react47 = __toESM(require_react());
var import_prop_types47 = __toESM(require_prop_types());
var gridRowBaseStyles = `
	jn-flex
	jn-flex-wrap
	jn-m-grid-row
`;
var GridRow = ({ children: a, className: b6, ...c2 }) => import_react47.default.createElement("div", _extends({ className: `juno-grid-row ${gridRowBaseStyles} ${b6}` }, c2), a);
GridRow.propTypes = { children: import_prop_types47.default.node, className: import_prop_types47.default.string }, GridRow.defaultProps = { children: null, className: "" };

// node_modules/juno-ui-components/build/GridColumn.component-7cbfc0e8.js
var import_react48 = __toESM(require_react());
var import_prop_types48 = __toESM(require_prop_types());
var columnBaseStyles = `
	jn-flex-grid-column
	jn-w-grid-column-default
	jn-p-grid-column
`;
var cols_13 = `
	jn-w-grid-col-1
`;
var cols_22 = `
	jn-w-grid-col-2
`;
var cols_32 = `
	jn-w-grid-col-3
`;
var cols_42 = `
	jn-w-grid-col-4
`;
var cols_52 = `
	jn-w-grid-col-6
`;
var cols_62 = `
	jn-w-grid-col-6
`;
var cols_72 = `
	jn-w-grid-col-7
`;
var cols_82 = `
	jn-w-grid-col-8
`;
var cols_92 = `
	jn-w-grid-col-9
`;
var cols_102 = `
	jn-w-grid-col-10
`;
var cols_112 = `
	jn-w-grid-col-11
`;
var cols_122 = `
	jn-w-grid-col-12
`;
var colsClass2 = (a) => 1 === a ? cols_13 : 2 === a ? cols_22 : 3 === a ? cols_32 : 4 === a ? cols_42 : 5 === a ? cols_52 : 6 === a ? cols_62 : 7 === a ? cols_72 : 8 === a ? cols_82 : 9 === a ? cols_92 : 10 === a ? cols_102 : 11 === a ? cols_112 : 12 === a ? cols_122 : void 0;
var GridColumn = ({ width: a, cols: b6, auto: c2, className: d, children: e, ...f }) => {
  const g = a ? { width: a + "%", flexGrow: "0", flexShrink: "0", flexBasis: a + "%" } : {}, h = a ? g : c2 ? { flexGrow: "1", flexShrink: "0", flexBasis: "0" } : {};
  return import_react48.default.createElement("div", _extends({ className: `juno-grid-column ${columnBaseStyles} ${b6 ? colsClass2(b6) : ""} ${d}`, style: h }, f), e);
};
GridColumn.propTypes = { cols: import_prop_types48.default.number, width: import_prop_types48.default.number, auto: import_prop_types48.default.bool, className: import_prop_types48.default.string, children: import_prop_types48.default.node }, GridColumn.defaultProps = { width: null, cols: null, auto: false, className: "" };

// node_modules/juno-ui-components/build/InputGroup.component-531a44ab.js
var import_react49 = __toESM(require_react());
var import_prop_types49 = __toESM(require_prop_types());
var InputGroup = ({ children: a, className: b6, variant: c2, disabled: d, ...e }) => {
  return import_react49.default.createElement(Stack, _extends({ className: `juno-input-group juno-input-group-${c2} ${d ? "juno-input-group-disabled" : ""} ${b6}` }, e), (() => import_react49.default.Children.map(a, (a2) => {
    const b7 = a2.props.variant || c2, e2 = a2.props.disabled || d;
    return import_react49.default.cloneElement(a2, { variant: b7, disabled: e2 });
  }))());
};
InputGroup.propTypes = { children: import_prop_types49.default.node, className: import_prop_types49.default.string, variant: import_prop_types49.default.oneOf(["default", "primary", "primary-danger", "subdued"]), disabled: import_prop_types49.default.bool }, InputGroup.defaultProps = { children: null, className: void 0, variant: "default", disabled: false };

// node_modules/juno-ui-components/build/IntroBox.component-8f6485a5.js
var import_react50 = __toESM(require_react());
var import_prop_types50 = __toESM(require_prop_types());
var introbox = (a, b6) => `
			jn-bg-theme-introbox
			jn-text-theme-default
			jn-flex
			jn-rounded-l
			jn-overflow-hidden
			jn-mb-8

			${"hero" === a && b6 ? `
					jn-bg-right-top
					jn-bg-no-repeat
				` : ""}
		`;
var introboxBorder = `
	jn-border-l-4
	jn-border-theme-introbox
`;
var introboxContent = (a, b6) => `
		${b6 ? `jn-pl-4 jn-pr-56` : `jn-px-4`}

		${"hero" === a ? `
			jn-text-xl
			jn-min-h-[8rem]
			jn-py-4
			jn-flex
			jn-flex-col
			jn-justify-center
		` : `
			jn-py-3
		`}
	`;
var introboxHeading = `
	jn-font-bold
`;
var IntroBox = ({ title: a, text: b6, variant: c2, heroImage: d, className: e, children: f, ...g }) => {
  const h = import_react50.default.useMemo(() => d && "hero" === c2, [c2, d]);
  return import_react50.default.createElement("div", _extends({ className: `juno-introbox ${introbox(c2, d)} ${e}`, style: h ? { backgroundImage: `${d}` } : {} }, g), import_react50.default.createElement("div", { className: `${introboxBorder}` }), import_react50.default.createElement("div", { className: `${introboxContent(c2, d)}` }, a ? import_react50.default.createElement("h1", { className: `${introboxHeading}` }, a) : "", f ? f : import_react50.default.createElement("p", null, b6)));
};
IntroBox.propTypes = { title: import_prop_types50.default.string, text: import_prop_types50.default.string, variant: import_prop_types50.default.oneOf(["default", "hero"]), heroImage: import_prop_types50.default.string, className: import_prop_types50.default.string, children: import_prop_types50.default.node }, IntroBox.defaultProps = { title: null, text: null, variant: "default", heroImage: null, className: "" };

// node_modules/juno-ui-components/build/LoadingIndicator.component-9730377f.js
var React4 = __toESM(require_react());
var import_react51 = __toESM(require_react());
var import_prop_types51 = __toESM(require_prop_types());
var _style;
var _g;
var _excluded4 = ["title", "titleId"];
function _extends5() {
  return _extends5 = Object.assign ? Object.assign.bind() : function(a) {
    for (var b6, c2 = 1; c2 < arguments.length; c2++)
      for (var d in b6 = arguments[c2], b6)
        Object.prototype.hasOwnProperty.call(b6, d) && (a[d] = b6[d]);
    return a;
  }, _extends5.apply(this, arguments);
}
function _objectWithoutProperties4(a, b6) {
  if (null == a)
    return {};
  var c2, d, e = _objectWithoutPropertiesLoose4(a, b6);
  if (Object.getOwnPropertySymbols) {
    var f = Object.getOwnPropertySymbols(a);
    for (d = 0; d < f.length; d++)
      c2 = f[d], 0 <= b6.indexOf(c2) || Object.prototype.propertyIsEnumerable.call(a, c2) && (e[c2] = a[c2]);
  }
  return e;
}
function _objectWithoutPropertiesLoose4(a, b6) {
  if (null == a)
    return {};
  var c2, d, e = {}, f = Object.keys(a);
  for (d = 0; d < f.length; d++)
    c2 = f[d], 0 <= b6.indexOf(c2) || (e[c2] = a[c2]);
  return e;
}
var SvgLoadingIndicator = function(a) {
  var b6 = a.title, c2 = a.titleId, d = _objectWithoutProperties4(a, _excluded4);
  return React4.createElement("svg", _extends5({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 210 210", height: 210, width: 210, "aria-labelledby": c2 }, d), b6 ? React4.createElement("title", { id: c2 }, b6) : null, _style || (_style = React4.createElement("style", null, "\n	@keyframes a0_t { 0% { transform: translate(59.3px,59.3px) scale(1,1) translate(-19px,-19px); } 82.5% { transform: translate(59.3px,59.3px) scale(1,1) translate(-19px,-19px); animation-timing-function: cubic-bezier(0,0,.6,1); } 87.5% { transform: translate(59.3px,59.3px) scale(1.1,1.1) translate(-19px,-19px); } 100% { transform: translate(59.3px,59.3px) scale(1.1,1.1) translate(-19px,-19px); } }\n	@keyframes a0_o { 0% { opacity: 1; } 82.5% { opacity: 1; animation-timing-function: cubic-bezier(0,0,.6,1); } 87.5% { opacity: 0; } 100% { opacity: 0; } }\n	@keyframes a1_v { 0% { visibility: hidden; animation-timing-function: steps(1); } 20% { visibility: visible; animation-timing-function: steps(1); } 100% { visibility: visible; animation-timing-function: steps(1); } }\n	@keyframes a2_v { 0% { visibility: hidden; animation-timing-function: steps(1); } 39.16% { visibility: visible; animation-timing-function: steps(1); } 59.16% { visibility: visible; animation-timing-function: steps(1); } 100% { visibility: visible; animation-timing-function: steps(1); } }\n	@keyframes a2_do { 0% { stroke-dashoffset: 0px; } 39.16% { stroke-dashoffset: 0px; animation-timing-function: cubic-bezier(0,0,.6,1); } 50.84% { stroke-dashoffset: 75.7px; animation-timing-function: cubic-bezier(.3,.5,.7,1); } 59.16% { stroke-dashoffset: 75.7px; } 100% { stroke-dashoffset: 75.7px; } }\n	@keyframes a3_v { 0% { visibility: hidden; animation-timing-function: steps(1); } 20% { visibility: visible; animation-timing-function: steps(1); } 40% { visibility: hidden; animation-timing-function: steps(1); } 100% { visibility: hidden; animation-timing-function: steps(1); } }\n	@keyframes a3_do { 0% { stroke-dashoffset: 118.5px; } 20% { stroke-dashoffset: 118.5px; animation-timing-function: cubic-bezier(.4,0,1,1); } 40% { stroke-dashoffset: 0px; } 100% { stroke-dashoffset: 0px; } }\n	@keyframes a4_v { 0% { visibility: visible; animation-timing-function: steps(1); } 21.66% { visibility: hidden; animation-timing-function: steps(1); } 100% { visibility: hidden; animation-timing-function: steps(1); } }\n	@keyframes a5_do { 0% { stroke-dashoffset: 0px; } 1.66% { stroke-dashoffset: 0px; animation-timing-function: cubic-bezier(0,0,.6,1); } 21.66% { stroke-dashoffset: 118.5px; } 100% { stroke-dashoffset: 118.5px; } }\n	@keyframes a7_t { 0% { transform: translate(61.4px,61.4px) rotate(-210deg); } 30% { transform: translate(61.4px,61.4px) rotate(-210deg); animation-timing-function: cubic-bezier(.4,0,.6,1); } 40% { transform: translate(61.4px,61.4px) rotate(0deg); } 100% { transform: translate(61.4px,61.4px) rotate(0deg); } }\n	@keyframes a6_t { 0% { transform: scale(1,1) translate(-42.7px,-42.7px); } 78.34% { transform: scale(1,1) translate(-42.7px,-42.7px); animation-timing-function: cubic-bezier(0,0,.6,1); } 84.16% { transform: scale(1.1,1.1) translate(-42.7px,-42.7px); } 100% { transform: scale(1.1,1.1) translate(-42.7px,-42.7px); } }\n	@keyframes a6_o { 0% { opacity: 1; } 78.34% { opacity: 1; animation-timing-function: cubic-bezier(0,0,.6,1); } 84.16% { opacity: 0; } 100% { opacity: 0; } }\n	@keyframes a8_v { 0% { visibility: hidden; animation-timing-function: steps(1); } 11.66% { visibility: visible; animation-timing-function: steps(1); } 100% { visibility: visible; animation-timing-function: steps(1); } }\n	@keyframes a8_da { 0% { stroke-dasharray: 185.96px 185.96px; } 11.66% { stroke-dasharray: 185.96px 185.96px; animation-timing-function: cubic-bezier(.4,0,1,1); } 30% { stroke-dasharray: 185.96px 185.96px; } 100% { stroke-dasharray: 185.96px 185.96px; } }\n	@keyframes a8_do { 0% { stroke-dashoffset: 186px; } 11.66% { stroke-dashoffset: 186px; animation-timing-function: cubic-bezier(.4,0,1,1); } 30% { stroke-dashoffset: 0px; } 46.66% { stroke-dashoffset: 0px; animation-timing-function: cubic-bezier(0,0,.6,1); } 59.16% { stroke-dashoffset: 110px; } 100% { stroke-dashoffset: 110px; } }\n	@keyframes a9_do { 0% { stroke-dashoffset: 27.4px; animation-timing-function: cubic-bezier(.4,0,1,1); } 10.84% { stroke-dashoffset: 0px; } 100% { stroke-dashoffset: 0px; } }\n	@keyframes a11_t { 0% { transform: translate(61.4px,61.4px) rotate(170deg); animation-timing-function: cubic-bezier(.4,0,.6,1); } 30% { transform: translate(61.4px,61.4px) rotate(170deg); animation-timing-function: cubic-bezier(.4,0,.6,1); } 40% { transform: translate(61.4px,61.4px) rotate(0deg); } 100% { transform: translate(61.4px,61.4px) rotate(0deg); } }\n	@keyframes a10_t { 0% { transform: scale(1,1) translate(-53px,-53px); } 75.84% { transform: scale(1,1) translate(-53px,-53px); animation-timing-function: cubic-bezier(0,0,.6,1); } 80% { transform: scale(1.1,1.1) translate(-53px,-53px); } 100% { transform: scale(1.1,1.1) translate(-53px,-53px); } }\n	@keyframes a10_o { 0% { opacity: 1; } 75.84% { opacity: 1; animation-timing-function: cubic-bezier(0,0,.6,1); } 80% { opacity: 0; } 100% { opacity: 0; } }\n	@keyframes a12_t { 0% { transform: translate(53.5px,53.5px) scale(1,1) translate(-0.5px,-0.5px); } 100% { transform: translate(53.5px,53.5px) scale(1,1) translate(-0.5px,-0.5px); } }\n	@keyframes a12_v { 0% { visibility: hidden; animation-timing-function: steps(1); } 5% { visibility: visible; animation-timing-function: steps(1); } 100% { visibility: visible; animation-timing-function: steps(1); } }\n	@keyframes a12_do { 0% { stroke-dashoffset: 266.7px; } 5% { stroke-dashoffset: 266.7px; animation-timing-function: cubic-bezier(.4,0,.6,1); } 36.66% { stroke-dashoffset: 0px; animation-timing-function: cubic-bezier(0,0,.6,1); } 59.16% { stroke-dashoffset: 136px; } 100% { stroke-dashoffset: 136px; } }\n	@keyframes a13_da { 0% { stroke-dasharray: 27.35px 27.35px; } 100% { stroke-dasharray: 27.35px 27.35px; } }\n	@keyframes a13_do { 0% { stroke-dashoffset: 27.4px; animation-timing-function: cubic-bezier(.4,0,1,1); } 5% { stroke-dashoffset: 0px; } 100% { stroke-dashoffset: 0px; } }\n	@keyframes a14_t { 0% { transform: translate(51.4px,122.3px) scale(1,1); } 85.84% { transform: translate(51.4px,122.3px) scale(1,1); animation-timing-function: cubic-bezier(0,0,.6,1); } 91.66% { transform: translate(51.4px,122.3px) scale(1.1,1.1); } 100% { transform: translate(51.4px,122.3px) scale(1.1,1.1); } }\n	@keyframes a14_v { 0% { visibility: hidden; animation-timing-function: steps(1); } 53.34% { visibility: visible; animation-timing-function: steps(1); } 100% { visibility: visible; animation-timing-function: steps(1); } }\n	@keyframes a14_o { 0% { opacity: 1; } 85.84% { opacity: 1; animation-timing-function: cubic-bezier(0,0,.6,1); } 91.66% { opacity: 0; } 100% { opacity: 0; } }\n	@keyframes a14_do { 0% { stroke-dashoffset: 427px; } 53.34% { stroke-dashoffset: 427px; animation-timing-function: cubic-bezier(.4,0,.6,1); } 67.5% { stroke-dashoffset: 0px; } 100% { stroke-dashoffset: 0px; } }\n")), _g || (_g = React4.createElement("g", { transform: "translate(101.9,25.7)" })), React4.createElement("g", { transform: "translate(86.5,8.5)" }, React4.createElement("g", { transform: "translate(59.3,59.3) translate(-19,-19)", style: { animation: "5s linear infinite both a0_t, 5s linear infinite both a0_o" } }, React4.createElement("g", { visibility: "hidden", transform: "translate(21.1,21.1) rotate(97) scale(1,-1) translate(-19,-19)", style: { animation: "5s linear infinite forwards a1_v" } }, React4.createElement("path", { fill: "none", stroke: "currentcolor", strokeLinecap: "round", strokeMiterlimit: 1, strokeWidth: 5, d: "M-12.5-14.3c-0.1 .2-3 2.8-4.8 6.4c-1.1 2.4-1.7 5.1-1.7 7.9c0 10.5 8.5 19 19 19c10.5 0 19-8.5 19-19c0-10.5-8.5-19-19-19c-2.3 0-4.5 .4-6.6 1.2c-2.2 .8-4.2 2-5.9 3.5", strokeDasharray: "118.5 118.5", visibility: "hidden", transform: "translate(19,19)", style: { animation: "5s linear infinite forwards a2_v, 5s linear infinite both a2_do" } }), React4.createElement("path", { fill: "none", stroke: "currentcolor", strokeLinecap: "round", strokeMiterlimit: 1, strokeWidth: 5, d: "M-12.5-14.3c1.7-1.5 3.7-2.7 5.9-3.5c2.1-0.8 4.3-1.2 6.6-1.2c10.5 0 19 8.5 19 19c0 10.5-8.5 19-19 19c-10.5 0-19-8.5-19-19c0-2.8 .6-5.5 1.7-7.9c1.8-3.6 4.7-6.2 4.8-6.4", strokeDasharray: "118.5 118.5", strokeDashoffset: 118.5, visibility: "hidden", transform: "translate(19,19)", style: { animation: "5s linear infinite forwards a3_v, 5s linear infinite both a3_do" } })), React4.createElement("g", { opacity: 0, visibility: "visible", transform: "translate(2.2,2.2)", style: { animation: "5s linear infinite forwards a4_v" } }, React4.createElement("path", { fill: "none", stroke: "currentcolor", strokeLinecap: "round", strokeMiterlimit: 1, strokeWidth: 5, d: "M-12.5-14.3c3.3-2.9 7.7-4.7 12.5-4.7c10.5 0 19 8.5 19 19c0 10.5-8.5 19-19 19c-10.5 0-19-8.5-19-19c0-2.8 .6-5.5 1.7-7.9c1.8-3.6 4.7-6.2 4.8-6.4", strokeDasharray: "118.5 118.5", transform: "translate(19,19)", style: { animation: "5s linear infinite both a5_do" } }))), React4.createElement("g", { style: { animation: "5s linear infinite both a7_t" } }, React4.createElement("g", { transform: "translate(61.4,61.4) rotate(-210) translate(-42.7,-42.7)", style: { animation: "5s linear infinite both a6_t, 5s linear infinite both a6_o" } }, React4.createElement("path", { fill: "none", stroke: "currentcolor", strokeLinecap: "round", strokeMiterlimit: 1, strokeWidth: 5, d: "M-17.4-26.9c.7-0.4 1.4-0.9 2.2-1.3c2.5-1.4 5.3-2.4 8.2-3.1c2.2-0.5 4.6-0.7 7-0.7c17.7 0 32 14.3 32 32c0 17.7-14.3 32-32 32c-17.7 0-32-14.3-32-32c0-5.9 1.6-11.4 4.3-16.1", strokeDasharray: "186 186", strokeDashoffset: 186, visibility: "hidden", transform: "translate(42.7,42.7)", style: { animation: "5s linear infinite forwards a8_v, 5s linear infinite both a8_da, 5s linear infinite both a8_do" } }), React4.createElement("path", { fill: "none", stroke: "currentcolor", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1, strokeWidth: 3.5, d: "M4.5 0c0 1.1-0.4 2.1-1.1 2.8c-0.8 1-2 1.7-3.4 1.7c-2.5 0-4.5-2-4.5-4.5c0-2.5 2-4.5 4.5-4.5c2.5 0 4.5 2 4.5 4.5Z", strokeDasharray: "27.4 27.4", strokeDashoffset: 27.3, transform: "translate(19.4,18.6) rotate(-26) scale(1.08,1.08) translate(1.1,1.1)", style: { animation: "5s linear infinite both a9_do" } }))), React4.createElement("g", { style: { animation: "5s linear infinite both a11_t" } }, React4.createElement("g", { transform: "translate(61.4,61.4) rotate(170) translate(-53,-53)", style: { animation: "5s linear infinite both a10_t, 5s linear infinite both a10_o" } }, React4.createElement("path", { fill: "none", stroke: "currentcolor", strokeLinecap: "round", strokeMiterlimit: 1, strokeWidth: 5, d: "M41.8 16.7m.2-0.5c1.9-5 3-10.5 3-16.2c0-8.9-2.6-17.1-7-24.1c-8-12.5-22-20.9-38-20.9c-24.8 0-45 20.2-45 45c0 24.8 20.2 45 45 45c13.6 0 25.7-6 34-15.6", strokeDasharray: "266.7 266.7", strokeDashoffset: 266.7, visibility: "hidden", transform: "translate(53.5,53.5) translate(-0.5,-0.5)", style: { animation: "5s linear infinite both a12_t, 5s linear infinite forwards a12_v, 5s linear infinite both a12_do" } }), React4.createElement("path", { fill: "none", stroke: "currentcolor", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1, strokeWidth: 3.5, d: "M3.5-2.7c.6 .7 1 1.7 1 2.7c0 2.5-2 4.5-4.5 4.5c-2.5 0-4.5-2-4.5-4.5c0-2.5 2-4.5 4.5-4.5c1.4 0 2.7 .7 3.5 1.8Z", strokeDasharray: "27.3 27.3", strokeDashoffset: 27.3, transform: "translate(91.7,74) rotate(-26) scale(1.08,1.08) translate(1.1,1.1)", style: { animation: "5s linear infinite both a13_da, 5s linear infinite both a13_do" } })))), React4.createElement("path", { fill: "none", stroke: "currentcolor", d: "M123.3-21.9c1.6 4.3 2.5 8.9 2.5 13.8c0 21.4-16.9 38.8-38.1 39.7v.1h-1.7h-11.4h-75.2c-17.2-0.4-31.1-14.4-31.1-31.7c0-17.5 14.2-31.7 31.7-31.7c1.7 0 3.4 .2 5 .4c0-0.1 0-0.2 0-0.4c0-20.8 16.9-37.7 37.7-37.7c15.5 0 28.7 9.2 34.6 22.5c2.8-0.6 5.7-0.9 8.7-0.9c17.1 0 31.7 10.7 37.3 25.9Z", strokeDasharray: "427 427", strokeDashoffset: 427, strokeWidth: 6, strokeLinecap: "round", visibility: "hidden", transform: "translate(51.4,122.3)", style: { animation: "5s linear infinite both a14_t, 5s linear infinite forwards a14_v, 5s linear infinite both a14_o, 5s linear infinite both a14_do" } }));
};
var LoadingIndicator = ({ size: a, color: b6, className: c2, ...d }) => import_react51.default.createElement(SvgLoadingIndicator, _extends({ width: a, height: a, className: `${c2} ${b6}`, role: "progressbar" }, d));
LoadingIndicator.propTypes = { size: import_prop_types51.default.string, color: import_prop_types51.default.string, className: import_prop_types51.default.string }, LoadingIndicator.defaultProps = { size: "96", color: "", className: "" };

// node_modules/juno-ui-components/build/MainTabs.component-0b095994.js
var import_react54 = __toESM(require_react());

// node_modules/juno-ui-components/build/Tabs.component-4b4b1198.js
var import_react53 = __toESM(require_react());

// node_modules/juno-ui-components/build/TabPanel-038dc9d7.js
var import_prop_types52 = __toESM(require_prop_types());
var import_react52 = __toESM(require_react());
function makeTypeChecker(a) {
  return function(b6) {
    return !!b6.type && b6.type.tabsRole === a;
  };
}
var isTab = makeTypeChecker("Tab");
var isTabList = makeTypeChecker("TabList");
var isTabPanel = makeTypeChecker("TabPanel");
function _extends$52() {
  return _extends$52 = Object.assign || function(a) {
    for (var b6, c2 = 1; c2 < arguments.length; c2++)
      for (var d in b6 = arguments[c2], b6)
        Object.prototype.hasOwnProperty.call(b6, d) && (a[d] = b6[d]);
    return a;
  }, _extends$52.apply(this, arguments);
}
function isTabChild(a) {
  return isTab(a) || isTabList(a) || isTabPanel(a);
}
function deepMap(a, b6) {
  return import_react52.Children.map(a, function(a2) {
    return null === a2 ? null : isTabChild(a2) ? b6(a2) : a2.props && a2.props.children && "object" == typeof a2.props.children ? (0, import_react52.cloneElement)(a2, _extends$52({}, a2.props, { children: deepMap(a2.props.children, b6) })) : a2;
  });
}
function deepForEach(a, b6) {
  return import_react52.Children.forEach(a, function(a2) {
    null === a2 || (isTab(a2) || isTabPanel(a2) ? b6(a2) : a2.props && a2.props.children && "object" == typeof a2.props.children && (isTabList(a2) && b6(a2), deepForEach(a2.props.children, b6)));
  });
}
function childrenPropType(a, b6, c2) {
  var d, e = 0, f = 0, g = false, h = [], i = a[b6];
  return deepForEach(i, function(a2) {
    isTabList(a2) && (a2.props && a2.props.children && "object" == typeof a2.props.children && deepForEach(a2.props.children, function(a3) {
      return h.push(a3);
    }), g && (d = new Error("Found multiple 'TabList' components inside 'Tabs'. Only one is allowed.")), g = true), isTab(a2) ? ((!g || -1 === h.indexOf(a2)) && (d = new Error("Found a 'Tab' component outside of the 'TabList' component. 'Tab' components have to be inside the 'TabList' component.")), e++) : isTabPanel(a2) && f++;
  }), d || e === f || (d = new Error("There should be an equal number of 'Tab' and 'TabPanel' in `" + c2 + "`. " + ("Received " + e + " 'Tab' and " + f + " 'TabPanel'."))), d;
}
function onSelectPropType(a, b6, c2, d, e) {
  var f = a[b6], g = e || b6, h = null;
  return f && "function" != typeof f ? h = new Error("Invalid " + d + " `" + g + "` of type `" + typeof f + "` supplied " + ("to `" + c2 + "`, expected `function`.")) : null != a.selectedIndex && null == f && (h = new Error("The " + d + " `" + g + "` is marked as required in `" + c2 + "`, but its value is `undefined` or `null`.\n`onSelect` is required when `selectedIndex` is also set. Not doing so will make the tabs not do anything, as `selectedIndex` indicates that you want to handle the selected tab yourself.\nIf you only want to set the inital tab replace `selectedIndex` with `defaultIndex`.")), h;
}
function selectedIndexPropType(a, b6, c2, d, e) {
  var f = a[b6], g = e || b6, h = null;
  if (null != f && "number" != typeof f)
    h = new Error("Invalid " + d + " `" + g + "` of type `" + typeof f + "` supplied to " + ("`" + c2 + "`, expected `number`."));
  else if (null != a.defaultIndex && null != f)
    return new Error("The " + d + " `" + g + "` cannot be used together with `defaultIndex` " + ("in `" + c2 + "`.\n") + ("Either remove `" + g + "` to let `" + c2 + "` handle the selected tab internally or remove `defaultIndex` to handle it yourself."));
  return h;
}
function r(a) {
  var b6, c2, d = "";
  if ("string" == typeof a || "number" == typeof a)
    d += a;
  else if ("object" == typeof a)
    if (Array.isArray(a))
      for (b6 = 0; b6 < a.length; b6++)
        a[b6] && (c2 = r(a[b6])) && (d && (d += " "), d += c2);
    else
      for (b6 in a)
        a[b6] && (d && (d += " "), d += b6);
  return d;
}
function clsx() {
  for (var a, b6, c2 = 0, d = ""; c2 < arguments.length; )
    (a = arguments[c2++]) && (b6 = r(a)) && (d && (d += " "), d += b6);
  return d;
}
var count = 0;
function uuid() {
  return "react-tabs-" + count++;
}
function getTabsCount(a) {
  var b6 = 0;
  return deepForEach(a, function(a2) {
    isTab(a2) && b6++;
  }), b6;
}
var _excluded$32 = ["children", "className", "disabledTabClassName", "domRef", "focus", "forceRenderTabPanel", "onSelect", "selectedIndex", "selectedTabClassName", "selectedTabPanelClassName", "environment", "disableUpDownKeys"];
function _extends$42() {
  return _extends$42 = Object.assign || function(a) {
    for (var b6, c2 = 1; c2 < arguments.length; c2++)
      for (var d in b6 = arguments[c2], b6)
        Object.prototype.hasOwnProperty.call(b6, d) && (a[d] = b6[d]);
    return a;
  }, _extends$42.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$32(a, b6) {
  if (null == a)
    return {};
  var c2, d, e = {}, f = Object.keys(a);
  for (d = 0; d < f.length; d++)
    c2 = f[d], 0 <= b6.indexOf(c2) || (e[c2] = a[c2]);
  return e;
}
function isNode(a) {
  return a && "getAttribute" in a;
}
function isTabNode(a) {
  return isNode(a) && a.getAttribute("data-rttab");
}
function isTabDisabled(a) {
  return isNode(a) && "true" === a.getAttribute("aria-disabled");
}
var canUseActiveElement;
function determineCanUseActiveElement(a) {
  var b6 = a || ("undefined" == typeof window ? void 0 : window);
  try {
    canUseActiveElement = !!("undefined" != typeof b6 && b6.document && b6.document.activeElement);
  } catch (a2) {
    canUseActiveElement = false;
  }
}
var defaultProps$3 = { className: "react-tabs", focus: false };
var propTypes$4 = false ? {} : { children: childrenPropType, direction: import_prop_types52.default.oneOf(["rtl", "ltr"]), className: import_prop_types52.default.oneOfType([import_prop_types52.default.string, import_prop_types52.default.array, import_prop_types52.default.object]), disabledTabClassName: import_prop_types52.default.string, disableUpDownKeys: import_prop_types52.default.bool, domRef: import_prop_types52.default.func, focus: import_prop_types52.default.bool, forceRenderTabPanel: import_prop_types52.default.bool, onSelect: import_prop_types52.default.func.isRequired, selectedIndex: import_prop_types52.default.number.isRequired, selectedTabClassName: import_prop_types52.default.string, selectedTabPanelClassName: import_prop_types52.default.string, environment: import_prop_types52.default.object };
var UncontrolledTabs = function(a) {
  function b6(b7, c3) {
    if (!(0 > b7 || b7 >= h())) {
      var d2 = a.onSelect, e = a.selectedIndex;
      d2(b7, e, c3);
    }
  }
  function c2(a2) {
    for (var b7 = h(), c3 = a2 + 1; c3 < b7; c3++)
      if (!isTabDisabled(j(c3)))
        return c3;
    for (var d2 = 0; d2 < a2; d2++)
      if (!isTabDisabled(j(d2)))
        return d2;
    return a2;
  }
  function d(a2) {
    for (var b7 = a2; b7--; )
      if (!isTabDisabled(j(b7)))
        return b7;
    for (b7 = h(); b7-- > a2; )
      if (!isTabDisabled(j(b7)))
        return b7;
    return a2;
  }
  function f() {
    for (var a2 = h(), b7 = 0; b7 < a2; b7++)
      if (!isTabDisabled(j(b7)))
        return b7;
    return null;
  }
  function g() {
    for (var a2 = h(); a2--; )
      if (!isTabDisabled(j(a2)))
        return a2;
    return null;
  }
  function h() {
    var b7 = a.children;
    return getTabsCount(b7);
  }
  function j(a2) {
    return m.current["tabs-" + a2];
  }
  function k(a2) {
    var c3 = a2.target;
    do
      if (l(c3)) {
        if (isTabDisabled(c3))
          return;
        var d2 = [].slice.call(c3.parentNode.children).filter(isTabNode).indexOf(c3);
        return void b6(d2, a2);
      }
    while (null != (c3 = c3.parentNode));
  }
  function l(a2) {
    if (!isTabNode(a2))
      return false;
    var b7 = a2.parentElement;
    do {
      if (b7 === p.current)
        return true;
      if (b7.getAttribute("data-rttabs"))
        break;
      b7 = b7.parentElement;
    } while (b7);
    return false;
  }
  var m = (0, import_react52.useRef)([]), n = (0, import_react52.useRef)([]), o2 = (0, import_react52.useRef)([]), p = (0, import_react52.useRef)();
  a.children;
  var q = a.className;
  a.disabledTabClassName;
  var r2 = a.domRef;
  a.focus, a.forceRenderTabPanel, a.onSelect, a.selectedIndex, a.selectedTabClassName, a.selectedTabPanelClassName, a.environment, a.disableUpDownKeys;
  var s = _objectWithoutPropertiesLoose$32(a, _excluded$32);
  return import_react52.default.createElement("div", _extends$42({}, s, { className: clsx(q), onClick: k, onKeyDown: function e(h2) {
    var i = a.direction, j2 = a.disableUpDownKeys;
    if (l(h2.target)) {
      var m2 = a.selectedIndex, n2 = false, o3 = false;
      ("Space" === h2.code || 32 === h2.keyCode || "Enter" === h2.code || 13 === h2.keyCode) && (n2 = true, o3 = false, k(h2)), "ArrowLeft" !== h2.code && 37 !== h2.keyCode && (j2 || 38 !== h2.keyCode && "ArrowUp" !== h2.code) ? "ArrowRight" !== h2.code && 39 !== h2.keyCode && (j2 || 40 !== h2.keyCode && "ArrowDown" !== h2.code) ? 35 === h2.keyCode || "End" === h2.code ? (m2 = g(), n2 = true, o3 = true) : (36 === h2.keyCode || "Home" === h2.code) && (m2 = f(), n2 = true, o3 = true) : (m2 = "rtl" === i ? d(m2) : c2(m2), n2 = true, o3 = true) : (m2 = "rtl" === i ? c2(m2) : d(m2), n2 = true, o3 = true), n2 && h2.preventDefault(), o3 && b6(m2, h2);
    }
  }, ref: function b7(a2) {
    p.current = a2, r2 && r2(a2);
  }, "data-rttabs": true }), function b7() {
    var c3 = 0, d2 = a.children, e = a.disabledTabClassName, f2 = a.focus, g2 = a.forceRenderTabPanel, i = a.selectedIndex, k2 = a.selectedTabClassName, l2 = a.selectedTabPanelClassName, p2 = a.environment;
    n.current = n.current || [], o2.current = o2.current || [];
    for (var q2 = n.current.length - h(); 0 > q2++; )
      n.current.push(uuid()), o2.current.push(uuid());
    return deepMap(d2, function(a2) {
      var b8 = a2;
      if (isTabList(a2)) {
        var d3 = 0, h2 = false;
        null == canUseActiveElement && determineCanUseActiveElement(p2);
        var q3 = p2 || ("undefined" == typeof window ? void 0 : window);
        canUseActiveElement && q3 && (h2 = import_react52.default.Children.toArray(a2.props.children).filter(isTab).some(function(a3, b9) {
          return q3.document.activeElement === j(b9);
        })), b8 = (0, import_react52.cloneElement)(a2, { children: deepMap(a2.props.children, function(a3) {
          var b9 = "tabs-" + d3, c4 = i === d3, g3 = { tabRef: function c5(a4) {
            m.current[b9] = a4;
          }, id: n.current[d3], panelId: o2.current[d3], selected: c4, focus: c4 && (f2 || h2) };
          return k2 && (g3.selectedClassName = k2), e && (g3.disabledClassName = e), d3++, (0, import_react52.cloneElement)(a3, g3);
        }) });
      } else if (isTabPanel(a2)) {
        var r3 = { id: o2.current[c3], tabId: n.current[c3], selected: i === c3 };
        g2 && (r3.forceRender = g2), l2 && (r3.selectedClassName = l2), c3++, b8 = (0, import_react52.cloneElement)(a2, r3);
      }
      return b8;
    });
  }());
};
UncontrolledTabs.defaultProps = defaultProps$3, UncontrolledTabs.propTypes = false ? {} : propTypes$4;
function _extends$32() {
  return _extends$32 = Object.assign || function(a) {
    for (var b6, c2 = 1; c2 < arguments.length; c2++)
      for (var d in b6 = arguments[c2], b6)
        Object.prototype.hasOwnProperty.call(b6, d) && (a[d] = b6[d]);
    return a;
  }, _extends$32.apply(this, arguments);
}
var MODE_CONTROLLED = 0;
var MODE_UNCONTROLLED = 1;
var propTypes$3 = false ? {} : { children: childrenPropType, direction: import_prop_types52.default.oneOf(["rtl", "ltr"]), className: import_prop_types52.default.oneOfType([import_prop_types52.default.string, import_prop_types52.default.array, import_prop_types52.default.object]), defaultFocus: import_prop_types52.default.bool, defaultIndex: import_prop_types52.default.number, disabledTabClassName: import_prop_types52.default.string, disableUpDownKeys: import_prop_types52.default.bool, domRef: import_prop_types52.default.func, focusTabOnClick: import_prop_types52.default.bool, forceRenderTabPanel: import_prop_types52.default.bool, onSelect: onSelectPropType, selectedIndex: selectedIndexPropType, selectedTabClassName: import_prop_types52.default.string, selectedTabPanelClassName: import_prop_types52.default.string, environment: import_prop_types52.default.object };
var defaultProps$2 = { defaultFocus: false, focusTabOnClick: true, forceRenderTabPanel: false, selectedIndex: null, defaultIndex: null, environment: null, disableUpDownKeys: false };
var getModeFromProps = function b(a) {
  return null === a.selectedIndex ? MODE_UNCONTROLLED : MODE_CONTROLLED;
};
var checkForIllegalModeChange = function c(a, b6) {
  if (b6 != null && b6 !== getModeFromProps(a))
    throw new Error("Switching between controlled mode (by using `selectedIndex`) and uncontrolled mode is not supported in `Tabs`.\nFor more information about controlled and uncontrolled mode of react-tabs see https://github.com/reactjs/react-tabs#controlled-vs-uncontrolled-mode.");
};
var Tabs = function b2(a) {
  var c2 = a.children, d = a.defaultFocus, e = a.defaultIndex, f = a.focusTabOnClick, g = a.onSelect, h = (0, import_react52.useState)(d), i = h[0], j = h[1], k = (0, import_react52.useState)(getModeFromProps(a)), l = k[0], m = (0, import_react52.useState)(l === MODE_UNCONTROLLED ? e || 0 : null), n = m[0], o2 = m[1];
  if ((0, import_react52.useEffect)(function() {
    j(false);
  }, []), l === MODE_UNCONTROLLED) {
    var p = getTabsCount(c2);
    (0, import_react52.useEffect)(function() {
      var a2 = Math.min, b6 = Math.max;
      if (null != n) {
        var c3 = b6(0, p - 1);
        o2(a2(n, c3));
      }
    }, [p]);
  }
  checkForIllegalModeChange(a, l);
  var q = function d2(a2, b6, c3) {
    "function" == typeof g && false === g(a2, b6, c3) || (f && j(true), l === MODE_UNCONTROLLED && o2(a2));
  }, r2 = _extends$32({}, a);
  return r2.focus = i, r2.onSelect = q, null != n && (r2.selectedIndex = n), delete r2.defaultFocus, delete r2.defaultIndex, delete r2.focusTabOnClick, import_react52.default.createElement(UncontrolledTabs, r2, c2);
};
Tabs.propTypes = false ? {} : propTypes$3, Tabs.defaultProps = defaultProps$2, Tabs.tabsRole = "Tabs";
var _excluded$22 = ["children", "className"];
function _extends$22() {
  return _extends$22 = Object.assign || function(a) {
    for (var b6, c2 = 1; c2 < arguments.length; c2++)
      for (var d in b6 = arguments[c2], b6)
        Object.prototype.hasOwnProperty.call(b6, d) && (a[d] = b6[d]);
    return a;
  }, _extends$22.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$22(a, b6) {
  if (null == a)
    return {};
  var c2, d, e = {}, f = Object.keys(a);
  for (d = 0; d < f.length; d++)
    c2 = f[d], 0 <= b6.indexOf(c2) || (e[c2] = a[c2]);
  return e;
}
var defaultProps$1 = { className: "react-tabs__tab-list" };
var propTypes$2 = false ? {} : { children: import_prop_types52.default.oneOfType([import_prop_types52.default.object, import_prop_types52.default.array]), className: import_prop_types52.default.oneOfType([import_prop_types52.default.string, import_prop_types52.default.array, import_prop_types52.default.object]) };
var TabList = function b3(a) {
  var c2 = a.children, d = a.className, e = _objectWithoutPropertiesLoose$22(a, _excluded$22);
  return import_react52.default.createElement("ul", _extends$22({}, e, { className: clsx(d), role: "tablist" }), c2);
};
TabList.tabsRole = "TabList", TabList.propTypes = false ? {} : propTypes$2, TabList.defaultProps = defaultProps$1;
var _excluded$12 = ["children", "className", "disabled", "disabledClassName", "focus", "id", "panelId", "selected", "selectedClassName", "tabIndex", "tabRef"];
function _extends$12() {
  return _extends$12 = Object.assign || function(a) {
    for (var b6, c2 = 1; c2 < arguments.length; c2++)
      for (var d in b6 = arguments[c2], b6)
        Object.prototype.hasOwnProperty.call(b6, d) && (a[d] = b6[d]);
    return a;
  }, _extends$12.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$12(a, b6) {
  if (null == a)
    return {};
  var c2, d, e = {}, f = Object.keys(a);
  for (d = 0; d < f.length; d++)
    c2 = f[d], 0 <= b6.indexOf(c2) || (e[c2] = a[c2]);
  return e;
}
var DEFAULT_PROPS = { className: "react-tabs__tab", disabledClassName: "react-tabs__tab--disabled", focus: false, id: null, panelId: null, selected: false, selectedClassName: "react-tabs__tab--selected" };
var propTypes$1 = false ? {} : { children: import_prop_types52.default.oneOfType([import_prop_types52.default.array, import_prop_types52.default.object, import_prop_types52.default.string]), className: import_prop_types52.default.oneOfType([import_prop_types52.default.string, import_prop_types52.default.array, import_prop_types52.default.object]), disabled: import_prop_types52.default.bool, tabIndex: import_prop_types52.default.string, disabledClassName: import_prop_types52.default.string, focus: import_prop_types52.default.bool, id: import_prop_types52.default.string, panelId: import_prop_types52.default.string, selected: import_prop_types52.default.bool, selectedClassName: import_prop_types52.default.string, tabRef: import_prop_types52.default.func };
var Tab = function b4(a) {
  var c2, d = (0, import_react52.useRef)(), e = a.children, f = a.className, g = a.disabled, h = a.disabledClassName, i = a.focus, j = a.id, k = a.panelId, l = a.selected, m = a.selectedClassName, n = a.tabIndex, o2 = a.tabRef, p = _objectWithoutPropertiesLoose$12(a, _excluded$12);
  return (0, import_react52.useEffect)(function() {
    l && i && d.current.focus();
  }, [l, i]), import_react52.default.createElement("li", _extends$12({}, p, { className: clsx(f, (c2 = {}, c2[m] = l, c2[h] = g, c2)), ref: function b6(a2) {
    d.current = a2, o2 && o2(a2);
  }, role: "tab", id: j, "aria-selected": l ? "true" : "false", "aria-disabled": g ? "true" : "false", "aria-controls": k, tabIndex: n || (l ? "0" : null), "data-rttab": true }), e);
};
Tab.propTypes = false ? {} : propTypes$1, Tab.tabsRole = "Tab", Tab.defaultProps = DEFAULT_PROPS;
var _excluded5 = ["children", "className", "forceRender", "id", "selected", "selectedClassName", "tabId"];
function _extends6() {
  return _extends6 = Object.assign || function(a) {
    for (var b6, c2 = 1; c2 < arguments.length; c2++)
      for (var d in b6 = arguments[c2], b6)
        Object.prototype.hasOwnProperty.call(b6, d) && (a[d] = b6[d]);
    return a;
  }, _extends6.apply(this, arguments);
}
function _objectWithoutPropertiesLoose5(a, b6) {
  if (null == a)
    return {};
  var c2, d, e = {}, f = Object.keys(a);
  for (d = 0; d < f.length; d++)
    c2 = f[d], 0 <= b6.indexOf(c2) || (e[c2] = a[c2]);
  return e;
}
var defaultProps = { className: "react-tabs__tab-panel", forceRender: false, selectedClassName: "react-tabs__tab-panel--selected" };
var propTypes = false ? {} : { children: import_prop_types52.default.node, className: import_prop_types52.default.oneOfType([import_prop_types52.default.string, import_prop_types52.default.array, import_prop_types52.default.object]), forceRender: import_prop_types52.default.bool, id: import_prop_types52.default.string, selected: import_prop_types52.default.bool, selectedClassName: import_prop_types52.default.string, tabId: import_prop_types52.default.string };
var TabPanel = function b5(a) {
  var c2, d = a.children, e = a.className, f = a.forceRender, g = a.id, h = a.selected, i = a.selectedClassName, j = a.tabId, k = _objectWithoutPropertiesLoose5(a, _excluded5);
  return import_react52.default.createElement("div", _extends6({}, k, { className: clsx(e, (c2 = {}, c2[i] = h, c2)), role: "tabpanel", id: g, "aria-labelledby": j }), f || h ? d : null);
};
TabPanel.tabsRole = "TabPanel", TabPanel.propTypes = false ? {} : propTypes, TabPanel.defaultProps = defaultProps;

// node_modules/juno-ui-components/build/Tabs.component-4b4b1198.js
var import_prop_types53 = __toESM(require_prop_types());
var TabsContext = import_react53.default.createContext();
var useTabsContext = () => import_react53.default.useContext(TabsContext);
var Tabs2 = ({ children: a, defaultIndex: b6, selectedIndex: c2, onSelect: d, variant: e, className: f, ...g }) => {
  const [h, i] = (0, import_react53.useState)(c2);
  (0, import_react53.useEffect)(() => {
    i(c2);
  }, [c2]);
  return import_react53.default.createElement(TabsContext.Provider, { value: { variant: e } }, import_react53.default.createElement(Tabs, _extends({ className: `juno-tabs juno-tabs-${e} ${f}`, defaultIndex: b6, selectedIndex: h, onSelect: (a2) => {
    d && d(a2);
  } }, g), a));
};
Tabs2.tabsRole = "Tabs", Tabs2.propTypes = { children: import_prop_types53.default.node, defaultIndex: import_prop_types53.default.number, selectedIndex: import_prop_types53.default.number, onSelect: import_prop_types53.default.func, variant: import_prop_types53.default.oneOf(["main", "content", "codeblocks"]), className: import_prop_types53.default.string }, Tabs2.defaultProps = { children: null, defaultIndex: void 0, selectedIndex: void 0, onSelect: void 0, variant: "content", className: "" };

// node_modules/juno-ui-components/build/MainTabs.component-0b095994.js
var import_prop_types54 = __toESM(require_prop_types());
var MainTabs = ({ children: a, defaultIndex: b6, selectedIndex: c2, onSelect: d, className: e, ...f }) => import_react54.default.createElement(Tabs2, _extends({ defaultIndex: b6, selectedIndex: c2, onSelect: d, className: e, variant: "main" }, f), a);
MainTabs.propTypes = { children: import_prop_types54.default.node, defaultIndex: import_prop_types54.default.number, selectedIndex: import_prop_types54.default.number, onSelect: import_prop_types54.default.func, className: import_prop_types54.default.string }, MainTabs.defaultTabs = { children: null, defaultIndex: void 0, selectedIndex: void 0, onSelect: void 0, className: "" };

// node_modules/juno-ui-components/build/Message.component-4107c43a.js
var import_react55 = __toESM(require_react());
var import_prop_types55 = __toESM(require_prop_types());
var message = `
	jn-text-theme-high
	jn-flex
	jn-rounded
	jn-leading-5
	jn-overflow-hidden
	jn-items-center
`;
var messageBorderStyles = `
	jn-w-[4px]
	jn-self-stretch
	jn-border-l-4
	jn-mr-6
	jn-shrink-0
`;
var messageDefault = `
	jn-border-theme-message-default
`;
var messageDefaultBg = `
	jn-bg-theme-message-default
`;
var messageError = `
	jn-border-theme-message-error
`;
var messageErrorBg = `
	jn-bg-theme-message-error
`;
var messageWarning = `
	jn-border-theme-message-warning
`;
var messageWarningBg = `
	jn-bg-theme-message-warning
`;
var messageDanger = `
	jn-border-theme-message-danger
`;
var messageDangerBg = `
	jn-bg-theme-message-danger
`;
var messageSuccess = `
	jn-border-theme-message-success
`;
var messageSuccessBg = `
	jn-bg-theme-message-success
`;
var messageContentStyles = `
	jn-py-3
	jn-pr-4
	jn-ml-7
`;
var messageHeading = `
	jn-font-bold
`;
var dismissButtonStyles = `
	jn-ml-auto
	jn-self-stretch
	jn-flex
	jn-flex-col
	jn-py-2.5
	jn-pr-2.5
`;
var backgroundClass = (a) => "error" === a ? messageErrorBg : "warning" === a ? messageWarningBg : "success" === a ? messageSuccessBg : "info" === a ? messageDefaultBg : "danger" === a ? messageDangerBg : messageDefaultBg;
var variantClass = (a) => "error" === a ? messageError : "warning" === a ? messageWarning : "success" === a ? messageSuccess : "info" === a ? messageDefault : "danger" === a ? messageDanger : messageDefault;
var getMuiIcon = (a) => "error" === a ? "dangerous" : a;
var Message = ({ title: a, text: b6, variant: c2, dismissible: d, autoDismiss: e, autoDismissTimeout: f, onDismiss: g, className: h, children: i, ...j }) => {
  const [k, l] = (0, import_react55.useState)(true), m = import_react55.default.useRef(null);
  import_react55.default.useEffect(() => () => clearTimeout(m.current), []), (0, import_react55.useEffect)(() => {
    e && (clearTimeout(m.current), m.current = setTimeout(() => n(), f));
  }, [e, f]);
  const n = () => {
    l(false), g && g();
  };
  return import_react55.default.createElement(import_react55.default.Fragment, null, k && import_react55.default.createElement("div", _extends({ className: `juno-message juno-message-${c2} ${message} ${backgroundClass(c2)} ${h}` }, j), import_react55.default.createElement("div", { className: `juno-message-border ${messageBorderStyles} ${variantClass(c2)}` }), import_react55.default.createElement(Icon, { icon: getMuiIcon(c2), color: "jn-text-theme-" + c2, className: "jn-shrink-0" }), import_react55.default.createElement("div", { className: `juno-message-content ${messageContentStyles}` }, a ? import_react55.default.createElement("h1", { className: `${messageHeading}` }, a) : "", import_react55.default.createElement("div", null, i ? i : b6)), d && import_react55.default.createElement("div", { className: dismissButtonStyles }, import_react55.default.createElement(Icon, { icon: "close", onClick: n, className: "juno-message-close-button jn-opacity-50 hover:jn-opacity-100" }))));
};
Message.propTypes = { title: import_prop_types55.default.string, text: import_prop_types55.default.string, variant: import_prop_types55.default.oneOf(["info", "warning", "danger", "error", "success"]), dismissible: import_prop_types55.default.bool, autoDismiss: import_prop_types55.default.bool, autoDismissTimeout: import_prop_types55.default.number, onDismiss: import_prop_types55.default.func, className: import_prop_types55.default.string, children: import_prop_types55.default.node }, Message.defaultProps = { title: null, text: null, variant: "info", dismissible: false, autoDismiss: false, autoDismissTimeout: 1e4, onDismiss: void 0, className: "" };

// node_modules/juno-ui-components/build/Modal.component-b1f0cc02.js
var import_react57 = __toESM(require_react());
var import_prop_types57 = __toESM(require_prop_types());

// node_modules/juno-ui-components/build/ModalFooter.component-7b60460a.js
var import_react56 = __toESM(require_react());
var import_prop_types56 = __toESM(require_prop_types());
var modalfooterstyles = `
	jn-flex
	jn-flex-row
	jn-border-t
	jn-border-theme-background-lvl-4
	jn-py-2
	jn-px-8
`;
var defaultmodalfooterstyles = `
	jn-justify-end
	jn-gap-3.5
`;
var ModalFooter = ({ children: a, confirmButtonLabel: b6, cancelButtonLabel: c2, confirmButtonIcon: d, cancelButtonIcon: e, onConfirm: f, onCancel: g, className: h, ...i }) => {
  const j = (a2) => {
    g && g(a2);
  };
  return import_react56.default.createElement("div", _extends({ className: `juno-modal-footer ${modalfooterstyles} ${a ? null : defaultmodalfooterstyles} ${h} ` }, i), a ? a : b6 || f ? import_react56.default.createElement(ButtonRow, null, import_react56.default.createElement(Button, { variant: "primary", label: b6 || "Confirm", icon: d, onClick: (a2) => {
    f && f(a2);
  } }), import_react56.default.createElement(Button, { variant: "subdued", label: c2 || "Cancel", icon: e, onClick: j })) : import_react56.default.createElement(ButtonRow, null, import_react56.default.createElement(Button, { variant: "subdued", onClick: j, label: c2 || "Close", icon: e })));
};
ModalFooter.propTypes = { children: import_prop_types56.default.node, confirmButtonLabel: import_prop_types56.default.string, cancelButtonLabel: import_prop_types56.default.string, confirmButtonIcon: import_prop_types56.default.oneOf(knownIcons), cancelButtonIcon: import_prop_types56.default.oneOf(knownIcons), className: import_prop_types56.default.string, onConfirm: import_prop_types56.default.func, onCancel: import_prop_types56.default.func }, ModalFooter.defaultProps = { children: null, confirmButtonLabel: "", cancelButtonLabel: "", confirmButtonIcon: null, cancelButtonIcon: null, className: "", onConfirm: void 0, onCancel: void 0 };

// node_modules/juno-ui-components/build/Modal.component-b1f0cc02.js
var modalcontainerstyles = `
	jn-fixed
	jn-inset-0
	jn-flex
	jn-items-center
	jn-bg-theme-modal-backdrop
	jn-backdrop-blur-[2px]
	jn-z-[999]
`;
var modalstyles = `
	jn-bg-theme-background-lvl-0
	jn-relative
	jn-rounded
	jn-m-auto
	jn-overflow-y-auto
	jn-max-h-[90%]
`;
var headerstyles = `
	jn-flex
	jn-py-2
	jn-px-8
	jn-border-b
	jn-border-theme-background-lvl-4
`;
var titlestyles = `
	jn-text-xl
	jn-font-bold
`;
var contentstyles = `
	jn-min-h-[5rem]
`;
var contentpaddingstyles = `
	jn-py-4
	jn-px-8
`;
var sizeClass = (a) => "large" === a ? `jn-w-[40rem]` : `jn-w-[33.625rem]`;
var Modal = ({ size: a, title: b6, heading: c2, confirmButtonLabel: d, cancelButtonLabel: e, confirmButtonIcon: f, cancelButtonIcon: g, open: h, children: i, modalFooter: j, closeable: k, unpad: l, onConfirm: m, onCancel: n, className: o2, ...p }) => {
  const [q, r2] = (0, import_react57.useState)(h), [s, t] = (0, import_react57.useState)(k);
  (0, import_react57.useEffect)(() => {
    r2(h);
  }, [h]), (0, import_react57.useEffect)(() => {
    t(k);
  }, [k]);
  const u = (a2) => {
    r2(false), n && n(a2);
  };
  return import_react57.default.createElement(import_react57.default.Fragment, null, q && import_react57.default.createElement("div", { className: `juno-modal-container ${modalcontainerstyles}` }, import_react57.default.createElement("div", _extends({ className: `juno-modal ${sizeClass(a)} ${modalstyles} ${o2}`, role: "dialog" }, p), import_react57.default.createElement("div", { className: `juno-modal-header ${headerstyles} ${b6 || c2 ? `jn-justify-between` : `jn-justify-end`}` }, b6 || c2 ? import_react57.default.createElement("h1", { className: `juno-modal-title ${titlestyles}` }, b6 || c2) : null, s ? import_react57.default.createElement(Icon, { icon: "close", onClick: u }) : null), import_react57.default.createElement("div", { className: `juno-modal-content ${contentstyles} ${l ? "" : contentpaddingstyles}` }, i), s ? j ? j : import_react57.default.createElement(ModalFooter, { confirmButtonLabel: d, cancelButtonLabel: e, confirmButtonIcon: f, cancelButtonIcon: g, onConfirm: m ? (a2) => {
    m && m(a2);
  } : null, onCancel: u }) : null)));
};
Modal.propTypes = { size: import_prop_types57.default.oneOf(["small", "large"]), title: import_prop_types57.default.string, heading: import_prop_types57.default.string, confirmButtonLabel: import_prop_types57.default.string, cancelButtonLabel: import_prop_types57.default.string, confirmButtonIcon: import_prop_types57.default.oneOf(knownIcons), cancelButtonIcon: import_prop_types57.default.oneOf(knownIcons), open: import_prop_types57.default.bool, children: import_prop_types57.default.node, modalFooter: import_prop_types57.default.element, closeable: import_prop_types57.default.bool, unpad: import_prop_types57.default.bool, className: import_prop_types57.default.string, onConfirm: import_prop_types57.default.func, onCancel: import_prop_types57.default.func }, Modal.defaultProps = { size: "small", title: "", heading: "", confirmButtonLabel: "", cancelButtonLabel: "", confirmButtonIcon: null, cancelButtonIcon: null, open: false, children: null, modalFooter: null, closeable: true, unpad: false, className: "", onConfirm: void 0, onCancel: void 0 };

// node_modules/juno-ui-components/build/NativeSelectOptionGroup.component-88720b9d.js
var import_react58 = __toESM(require_react());
var import_prop_types58 = __toESM(require_prop_types());
var NativeSelectOptionGroup = ({ label: a, disabled: b6, className: c2, children: d, ...e }) => import_react58.default.createElement("optgroup", _extends({ label: a, disabled: b6, className: `juno-select-option-group ${c2}` }, e), d);
NativeSelectOptionGroup.propTypes = { label: import_prop_types58.default.string, disabled: import_prop_types58.default.bool, className: import_prop_types58.default.string, children: import_prop_types58.default.node }, NativeSelectOptionGroup.defaultProps = { label: null, disabled: false, className: "" };

// node_modules/juno-ui-components/build/Panel.component-fcb4d7b6.js
var import_react59 = __toESM(require_react());
var import_prop_types59 = __toESM(require_prop_types());
var panelClasses = (a, b6, c2) => `
      jn-absolute
      jn-right-0
      jn-transition-transform
      jn-ease-out
      jn-duration-300
      jn-inset-y-0
      jn-z-10
      jn-grid
      jn-grid-rows-[auto_1fr]
      jn-bg-theme-panel
      jn-backdrop-blur
      jn-backdrop-saturate-150     
      jn-shadow-md
      ${"large" === c2 ? `jn-w-[80%]` : `jn-w-[50%]`}
			${a ? "" : `jn-translate-x-[100%]`}
			${a || b6 ? "" : `jn-invisible`}
		`.replace(/\n/g, " ").replace(/\s+/g, " ");
var panelHeaderClasses = `
  jn-flex
  jn-items-center
  jn-py-4
  jn-px-8
`;
var panelTitleClasses = `
  jn-text-theme-high
  jn-text-lg
  jn-font-bold
`;
var Panel = ({ heading: a, size: b6, className: c2, opened: d, closeable: e, onClose: f, children: g, ...h }) => {
  const [i, j] = (0, import_react59.useState)(d), [k, l] = (0, import_react59.useState)(e), [m, n] = (0, import_react59.useState)(false);
  (0, import_react59.useEffect)(() => {
    j(d);
  }, [d]), (0, import_react59.useEffect)(() => {
    l(e);
  }, [e]);
  const o2 = import_react59.default.useRef(null);
  import_react59.default.useEffect(() => () => clearTimeout(o2.current), []), (0, import_react59.useEffect)(() => {
    i || (n(true), clearTimeout(o2.current), o2.current = setTimeout(() => n(false), 500));
  }, [i]);
  return import_react59.default.createElement("div", _extends({ className: `juno-panel ${panelClasses(i, m, b6)} ${c2}`, role: "dialog", "aria-labelledby": "juno-panel-title" }, h), import_react59.default.createElement("div", { className: `juno-panel-header ${panelHeaderClasses}` }, import_react59.default.createElement("div", { className: `juno-panel-title ${panelTitleClasses}`, id: "juno-panel-title" }, a), k && import_react59.default.createElement(Icon, { icon: "close", onClick: (a2) => {
    j(false), f && f(a2);
  }, className: "juno-panel-close jn-ml-auto" })), g);
};
Panel.propTypes = { heading: import_prop_types59.default.node, size: import_prop_types59.default.oneOf(["default", "large"]), opened: import_prop_types59.default.bool, closeable: import_prop_types59.default.bool, onClose: import_prop_types59.default.func, className: import_prop_types59.default.string, children: import_prop_types59.default.node }, Panel.defaultProps = { heading: "", size: void 0, opened: false, closeable: true, onClose: void 0, className: "" };

// node_modules/juno-ui-components/build/PanelBody.component-bbbf8a34.js
var import_react60 = __toESM(require_react());
var import_prop_types60 = __toESM(require_prop_types());
var panelBodyClasses = `
  jn-overflow-auto
`;
var bodyContentClasses = `
  jn-px-8
  jn-py-4
`;
var PanelBody = ({ className: a, footer: b6, children: c2, ...d }) => import_react60.default.createElement("div", _extends({ className: `juno-panel-body ${panelBodyClasses}  ${a}` }, d), import_react60.default.createElement("div", { className: `juno-panel-body-content ${bodyContentClasses}` }, c2), b6);
PanelBody.propTypes = { className: import_prop_types60.default.string, footer: import_prop_types60.default.element }, PanelBody.defaultProps = { className: "", footer: void 0 };

// node_modules/juno-ui-components/build/PanelFooter.component-e90c0a38.js
var import_react61 = __toESM(require_react());
var import_prop_types61 = __toESM(require_prop_types());
var panelFooterClasses = `
  jn-border-t
  jn-border-t-theme-panel
  jn-px-8
  jn-py-4
  jn-flex
  jn-items-center
  jn-justify-end
  jn-gap-3
  jn-w-full
`;
var PanelFooter = ({ className: a, children: b6, ...c2 }) => import_react61.default.createElement("div", _extends({ className: `juno-panel-footer ${panelFooterClasses}  ${a}` }, c2), b6);
PanelFooter.propTypes = { className: import_prop_types61.default.string }, PanelFooter.defaultProps = { className: "" };

// node_modules/juno-ui-components/build/Pagination.component-cea959c7.js
var import_react66 = __toESM(require_react());
var import_prop_types65 = __toESM(require_prop_types());

// node_modules/juno-ui-components/build/Select.component-5280b070.js
var import_react64 = __toESM(require_react());

// node_modules/juno-ui-components/build/index.module-8a3c0a6b.js
var React5 = __toESM(require_react());
var import_react62 = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());
var import_react_dom = __toESM(require_react_dom());
function _extends7() {
  return _extends7 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t, n = 1; n < arguments.length; n++)
      for (var o2 in t = arguments[n], t)
        Object.prototype.hasOwnProperty.call(t, o2) && (e[o2] = t[o2]);
    return e;
  }, _extends7.apply(this, arguments);
}
function $ae6933e535247d3d$export$7d15b64cf5a3a4c4(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function $e42e1063c40fb3ef$export$b9ecd428b558ff10(e, t, { checkForDefaultPrevented: n = true } = {}) {
  return function(i) {
    if (null === e || void 0 === e || e(i), false === n || !i.defaultPrevented)
      return null === t || void 0 === t ? void 0 : t(i);
  };
}
function $c512c27ab02ef895$export$50c7b4e9d9f19c1(e, t = []) {
  function n(t2, n2) {
    function o3(t3) {
      const { scope: n3, children: i2, ...o4 } = t3, r3 = (null === n3 || void 0 === n3 ? void 0 : n3[e][d]) || a, l = (0, import_react62.useMemo)(() => o4, Object.values(o4));
      return (0, import_react62.createElement)(r3.Provider, { value: l }, i2);
    }
    function r2(i2, o4) {
      const r3 = (null === o4 || void 0 === o4 ? void 0 : o4[e][d]) || a, l = (0, import_react62.useContext)(r3);
      if (l)
        return l;
      if (void 0 !== n2)
        return n2;
      throw new Error(`\`${i2}\` must be used within \`${t2}\``);
    }
    const a = (0, import_react62.createContext)(n2), d = i.length;
    return i = [...i, n2], o3.displayName = t2 + "Provider", [o3, r2];
  }
  let i = [];
  const o2 = () => {
    const t2 = i.map((e2) => (0, import_react62.createContext)(e2));
    return function i2(n2) {
      const o3 = (null === n2 || void 0 === n2 ? void 0 : n2[e]) || t2;
      return (0, import_react62.useMemo)(() => ({ [`__scope${e}`]: { ...n2, [e]: o3 } }), [n2, o3]);
    };
  };
  return o2.scopeName = e, [n, $c512c27ab02ef895$var$composeContextScopes(o2, ...t)];
}
function $c512c27ab02ef895$var$composeContextScopes(...e) {
  const t = e[0];
  if (1 === e.length)
    return t;
  const n = () => {
    const n2 = e.map((e2) => ({ useScope: e2(), scopeName: e2.scopeName }));
    return function i(e2) {
      const o2 = n2.reduce((t2, { useScope: n3, scopeName: i2 }) => {
        const o3 = n3(e2), r2 = o3[`__scope${i2}`];
        return { ...t2, ...r2 };
      }, {});
      return (0, import_react62.useMemo)(() => ({ [`__scope${t.scopeName}`]: o2 }), [o2]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function $6ed0406888f73fc4$var$setRef(e, t) {
  "function" == typeof e ? e(t) : null !== e && e !== void 0 && (e.current = t);
}
function $6ed0406888f73fc4$export$43e446d32b3d21af(...e) {
  return (t) => e.forEach((e2) => $6ed0406888f73fc4$var$setRef(e2, t));
}
function $6ed0406888f73fc4$export$c7b2cbe3552a0d05(...e) {
  return (0, import_react62.useCallback)($6ed0406888f73fc4$export$43e446d32b3d21af(...e), e);
}
var $5e63c961fc1ce211$export$8c6ed5c666ac1360 = (0, import_react62.forwardRef)((e, t) => {
  const { children: n, ...i } = e, o2 = import_react62.Children.toArray(n), r2 = o2.find($5e63c961fc1ce211$var$isSlottable);
  if (r2) {
    const e2 = r2.props.children, n2 = o2.map((t2) => t2 === r2 ? 1 < import_react62.Children.count(e2) ? import_react62.Children.only(null) : (0, import_react62.isValidElement)(e2) ? e2.props.children : null : t2);
    return (0, import_react62.createElement)($5e63c961fc1ce211$var$SlotClone, _extends7({}, i, { ref: t }), (0, import_react62.isValidElement)(e2) ? (0, import_react62.cloneElement)(e2, void 0, n2) : null);
  }
  return (0, import_react62.createElement)($5e63c961fc1ce211$var$SlotClone, _extends7({}, i, { ref: t }), n);
});
$5e63c961fc1ce211$export$8c6ed5c666ac1360.displayName = "Slot";
var $5e63c961fc1ce211$var$SlotClone = (0, import_react62.forwardRef)((e, t) => {
  const { children: n, ...i } = e;
  return (0, import_react62.isValidElement)(n) ? (0, import_react62.cloneElement)(n, { ...$5e63c961fc1ce211$var$mergeProps(i, n.props), ref: $6ed0406888f73fc4$export$43e446d32b3d21af(t, n.ref) }) : 1 < import_react62.Children.count(n) ? import_react62.Children.only(null) : null;
});
$5e63c961fc1ce211$var$SlotClone.displayName = "SlotClone";
var $5e63c961fc1ce211$export$d9f1ccf0bdb05d45 = ({ children: e }) => (0, import_react62.createElement)(import_react62.Fragment, null, e);
function $5e63c961fc1ce211$var$isSlottable(e) {
  return (0, import_react62.isValidElement)(e) && e.type === $5e63c961fc1ce211$export$d9f1ccf0bdb05d45;
}
function $5e63c961fc1ce211$var$mergeProps(e, t) {
  const n = { ...t };
  for (const i in t) {
    const o2 = e[i], r2 = t[i], a = /^on[A-Z]/.test(i);
    a ? o2 && r2 ? n[i] = (...e2) => {
      r2(...e2), o2(...e2);
    } : o2 && (n[i] = o2) : "style" === i ? n[i] = { ...o2, ...r2 } : "className" === i && (n[i] = [o2, r2].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function $e02a7d9cb1dc128c$export$c74125a8e3af6bb2(e) {
  function t(t2) {
    const n2 = a(e + "CollectionConsumer", t2), i2 = import_react62.default.useCallback(() => {
      const e2 = n2.collectionRef.current;
      if (!e2)
        return [];
      const t3 = Array.from(e2.querySelectorAll(`[${u}]`)), i3 = Array.from(n2.itemMap.values()), o3 = i3.sort((e3, n3) => t3.indexOf(e3.ref.current) - t3.indexOf(n3.ref.current));
      return o3;
    }, [n2.collectionRef, n2.itemMap]);
    return i2;
  }
  const n = e + "CollectionProvider", [i, o2] = $c512c27ab02ef895$export$50c7b4e9d9f19c1(n), [r2, a] = i(n, { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }), d = (e2) => {
    const { scope: t2, children: n2 } = e2, i2 = import_react62.default.useRef(null), o3 = import_react62.default.useRef(/* @__PURE__ */ new Map()).current;
    return import_react62.default.createElement(r2, { scope: t2, itemMap: o3, collectionRef: i2 }, n2);
  }, l = e + "CollectionSlot", s = import_react62.default.forwardRef((e2, t2) => {
    const { scope: n2, children: i2 } = e2, o3 = a(l, n2), r3 = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t2, o3.collectionRef);
    return import_react62.default.createElement($5e63c961fc1ce211$export$8c6ed5c666ac1360, { ref: r3 }, i2);
  }), c2 = e + "CollectionItemSlot", u = "data-radix-collection-item", f = import_react62.default.forwardRef((e2, t2) => {
    const { scope: n2, children: i2, ...o3 } = e2, r3 = import_react62.default.useRef(null), d2 = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t2, r3), l2 = a(c2, n2);
    return import_react62.default.useEffect(() => (l2.itemMap.set(r3, { ref: r3, ...o3 }), () => void l2.itemMap.delete(r3))), import_react62.default.createElement($5e63c961fc1ce211$export$8c6ed5c666ac1360, { [u]: "", ref: d2 }, i2);
  });
  return [{ Provider: d, Slot: s, ItemSlot: f }, t, o2];
}
var $f631663db3294ace$var$DirectionContext = (0, import_react62.createContext)(void 0);
function $f631663db3294ace$export$b39126d51d94e6f3(e) {
  const t = (0, import_react62.useContext)($f631663db3294ace$var$DirectionContext);
  return e || t || "ltr";
}
var $8927f6f2acc4f386$var$NODES = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "span", "svg", "ul"];
var $8927f6f2acc4f386$export$250ffa63cdc0d034 = $8927f6f2acc4f386$var$NODES.reduce((e, t) => {
  const n = (0, import_react62.forwardRef)((e2, n2) => {
    const { asChild: i, ...o2 } = e2, r2 = i ? $5e63c961fc1ce211$export$8c6ed5c666ac1360 : t;
    return (0, import_react62.useEffect)(() => {
      window[Symbol.for("radix-ui")] = true;
    }, []), (0, import_react62.createElement)(r2, _extends7({}, o2, { ref: n2 }));
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function $8927f6f2acc4f386$export$6d1a0317bde7de7f(e, t) {
  e && (0, import_react_dom.flushSync)(() => e.dispatchEvent(t));
}
function $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(e) {
  const t = (0, import_react62.useRef)(e);
  return (0, import_react62.useEffect)(() => {
    t.current = e;
  }), (0, import_react62.useMemo)(() => (...e2) => {
    var n;
    return null === (n = t.current) || void 0 === n ? void 0 : n.call(t, ...e2);
  }, []);
}
function $addc16e1bbe58fd0$export$3a72a57244d6e765(e, t = null === globalThis || void 0 === globalThis ? void 0 : globalThis.document) {
  const n = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(e);
  (0, import_react62.useEffect)(() => {
    const e2 = (e3) => {
      "Escape" === e3.key && n(e3);
    };
    return t.addEventListener("keydown", e2), () => t.removeEventListener("keydown", e2);
  }, [n, t]);
}
var $5cb92bef7577960e$var$CONTEXT_UPDATE = "dismissableLayer.update";
var $5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var $5cb92bef7577960e$var$FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var $5cb92bef7577960e$var$originalBodyPointerEvents;
var $5cb92bef7577960e$var$DismissableLayerContext = (0, import_react62.createContext)({ layers: /* @__PURE__ */ new Set(), layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(), branches: /* @__PURE__ */ new Set() });
var $5cb92bef7577960e$export$177fb62ff3ec1f22 = (0, import_react62.forwardRef)((e, t) => {
  var n;
  const { disableOutsidePointerEvents: s = false, onEscapeKeyDown: i, onPointerDownOutside: o2, onFocusOutside: r2, onInteractOutside: a, onDismiss: d, ...l } = e, c2 = (0, import_react62.useContext)($5cb92bef7577960e$var$DismissableLayerContext), [u, f] = (0, import_react62.useState)(null), p = null !== (n = null === u || void 0 === u ? void 0 : u.ownerDocument) && void 0 !== n ? n : null === globalThis || void 0 === globalThis ? void 0 : globalThis.document, [, h] = (0, import_react62.useState)({}), m = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, (e2) => f(e2)), g = Array.from(c2.layers), [y] = [...c2.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(y), x = u ? g.indexOf(u) : -1, b6 = 0 < c2.layersWithOutsidePointerEventsDisabled.size, w = x >= v, E = $5cb92bef7577960e$var$usePointerDownOutside((e2) => {
    const t2 = e2.target, n2 = [...c2.branches].some((e3) => e3.contains(t2));
    !w || n2 || (null === o2 || void 0 === o2 || o2(e2), null === a || void 0 === a || a(e2), !e2.defaultPrevented && (null === d || void 0 === d || d()));
  }, p), C = $5cb92bef7577960e$var$useFocusOutside((e2) => {
    const t2 = e2.target, n2 = [...c2.branches].some((e3) => e3.contains(t2));
    n2 || (null === r2 || void 0 === r2 || r2(e2), null === a || void 0 === a || a(e2), !e2.defaultPrevented && (null === d || void 0 === d || d()));
  }, p);
  return $addc16e1bbe58fd0$export$3a72a57244d6e765((e2) => {
    const t2 = x === c2.layers.size - 1;
    t2 && (null === i || void 0 === i || i(e2), !e2.defaultPrevented && d && (e2.preventDefault(), d()));
  }, p), (0, import_react62.useEffect)(() => {
    if (u)
      return s && (0 === c2.layersWithOutsidePointerEventsDisabled.size && ($5cb92bef7577960e$var$originalBodyPointerEvents = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), c2.layersWithOutsidePointerEventsDisabled.add(u)), c2.layers.add(u), $5cb92bef7577960e$var$dispatchUpdate(), () => {
        s && 1 === c2.layersWithOutsidePointerEventsDisabled.size && (p.body.style.pointerEvents = $5cb92bef7577960e$var$originalBodyPointerEvents);
      };
  }, [u, p, s, c2]), (0, import_react62.useEffect)(() => () => {
    u && (c2.layers.delete(u), c2.layersWithOutsidePointerEventsDisabled.delete(u), $5cb92bef7577960e$var$dispatchUpdate());
  }, [u, c2]), (0, import_react62.useEffect)(() => {
    const e2 = () => h({});
    return document.addEventListener($5cb92bef7577960e$var$CONTEXT_UPDATE, e2), () => document.removeEventListener($5cb92bef7577960e$var$CONTEXT_UPDATE, e2);
  }, []), (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends7({}, l, { ref: m, style: { pointerEvents: b6 ? w ? "auto" : "none" : void 0, ...e.style }, onFocusCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(e.onFocusCapture, C.onFocusCapture), onBlurCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(e.onBlurCapture, C.onBlurCapture), onPointerDownCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(e.onPointerDownCapture, E.onPointerDownCapture) }));
});
function $5cb92bef7577960e$var$usePointerDownOutside(e, t = null === globalThis || void 0 === globalThis ? void 0 : globalThis.document) {
  const n = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(e), i = (0, import_react62.useRef)(false), o2 = (0, import_react62.useRef)(() => {
  });
  return (0, import_react62.useEffect)(() => {
    const e2 = (e3) => {
      if (e3.target && !i.current) {
        let i2 = function() {
          $5cb92bef7577960e$var$handleAndDispatchCustomEvent($5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE, n, r3, { discrete: true });
        };
        const r3 = { originalEvent: e3 };
        "touch" === e3.pointerType ? (t.removeEventListener("click", o2.current), o2.current = i2, t.addEventListener("click", o2.current, { once: true })) : i2();
      }
      i.current = false;
    }, r2 = window.setTimeout(() => {
      t.addEventListener("pointerdown", e2);
    }, 0);
    return () => {
      window.clearTimeout(r2), t.removeEventListener("pointerdown", e2), t.removeEventListener("click", o2.current);
    };
  }, [t, n]), { onPointerDownCapture: () => i.current = true };
}
function $5cb92bef7577960e$var$useFocusOutside(e, t = null === globalThis || void 0 === globalThis ? void 0 : globalThis.document) {
  const n = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(e), i = (0, import_react62.useRef)(false);
  return (0, import_react62.useEffect)(() => {
    const e2 = (e3) => {
      if (e3.target && !i.current) {
        const t2 = { originalEvent: e3 };
        $5cb92bef7577960e$var$handleAndDispatchCustomEvent($5cb92bef7577960e$var$FOCUS_OUTSIDE, n, t2, { discrete: false });
      }
    };
    return t.addEventListener("focusin", e2), () => t.removeEventListener("focusin", e2);
  }, [t, n]), { onFocusCapture: () => i.current = true, onBlurCapture: () => i.current = false };
}
function $5cb92bef7577960e$var$dispatchUpdate() {
  const e = new CustomEvent($5cb92bef7577960e$var$CONTEXT_UPDATE);
  document.dispatchEvent(e);
}
function $5cb92bef7577960e$var$handleAndDispatchCustomEvent(e, t, n, { discrete: i }) {
  const o2 = n.originalEvent.target, r2 = new CustomEvent(e, { bubbles: false, cancelable: true, detail: n });
  t && o2.addEventListener(e, t, { once: true }), i ? $8927f6f2acc4f386$export$6d1a0317bde7de7f(o2, r2) : o2.dispatchEvent(r2);
}
var $3db38b7d1fb3fe6a$var$count = 0;
function $3db38b7d1fb3fe6a$export$b7ece24a22aeda8c() {
  (0, import_react62.useEffect)(() => {
    var e, t;
    const n = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", null !== (e = n[0]) && void 0 !== e ? e : $3db38b7d1fb3fe6a$var$createFocusGuard()), document.body.insertAdjacentElement("beforeend", null !== (t = n[1]) && void 0 !== t ? t : $3db38b7d1fb3fe6a$var$createFocusGuard()), $3db38b7d1fb3fe6a$var$count++, () => {
      1 == $3db38b7d1fb3fe6a$var$count && document.querySelectorAll("[data-radix-focus-guard]").forEach((e2) => e2.remove()), $3db38b7d1fb3fe6a$var$count--;
    };
  }, []);
}
function $3db38b7d1fb3fe6a$var$createFocusGuard() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.cssText = "outline: none; opacity: 0; position: fixed; pointer-events: none", e;
}
var $d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var $d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var $d3863c46a17e8a28$var$EVENT_OPTIONS = { bubbles: false, cancelable: true };
var $d3863c46a17e8a28$export$20e40289641fbbb6 = (0, import_react62.forwardRef)((e, t) => {
  const { loop: r2 = false, trapped: a = false, onMountAutoFocus: n, onUnmountAutoFocus: i, ...o2 } = e, [d, l] = (0, import_react62.useState)(null), s = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(n), c2 = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(i), u = (0, import_react62.useRef)(null), f = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, (e2) => l(e2)), p = (0, import_react62.useRef)({ paused: false, pause() {
    this.paused = true;
  }, resume() {
    this.paused = false;
  } }).current;
  (0, import_react62.useEffect)(() => {
    if (a) {
      let e2 = function(e3) {
        if (!p.paused && d) {
          const t3 = e3.target;
          d.contains(t3) ? u.current = t3 : $d3863c46a17e8a28$var$focus(u.current, { select: true });
        }
      }, t2 = function(e3) {
        !p.paused && d && (d.contains(e3.relatedTarget) || $d3863c46a17e8a28$var$focus(u.current, { select: true }));
      };
      return document.addEventListener("focusin", e2), document.addEventListener("focusout", t2), () => {
        document.removeEventListener("focusin", e2), document.removeEventListener("focusout", t2);
      };
    }
  }, [a, d, p.paused]), (0, import_react62.useEffect)(() => {
    if (d) {
      $d3863c46a17e8a28$var$focusScopesStack.add(p);
      const e2 = document.activeElement, t2 = d.contains(e2);
      if (!t2) {
        const t3 = new CustomEvent($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, $d3863c46a17e8a28$var$EVENT_OPTIONS);
        d.addEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, s), d.dispatchEvent(t3), t3.defaultPrevented || ($d3863c46a17e8a28$var$focusFirst($d3863c46a17e8a28$var$removeLinks($d3863c46a17e8a28$var$getTabbableCandidates(d)), { select: true }), document.activeElement === e2 && $d3863c46a17e8a28$var$focus(d));
      }
      return () => {
        d.removeEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, s), setTimeout(() => {
          const t3 = new CustomEvent($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, $d3863c46a17e8a28$var$EVENT_OPTIONS);
          d.addEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, c2), d.dispatchEvent(t3), t3.defaultPrevented || $d3863c46a17e8a28$var$focus(null !== e2 && void 0 !== e2 ? e2 : document.body, { select: true }), d.removeEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, c2), $d3863c46a17e8a28$var$focusScopesStack.remove(p);
        }, 0);
      };
    }
  }, [d, s, c2, p]);
  const h = (0, import_react62.useCallback)((e2) => {
    if (!r2 && !a)
      return;
    if (p.paused)
      return;
    const t2 = "Tab" === e2.key && !e2.altKey && !e2.ctrlKey && !e2.metaKey, n2 = document.activeElement;
    if (t2 && n2) {
      const t3 = e2.currentTarget, [i2, o3] = $d3863c46a17e8a28$var$getTabbableEdges(t3), a2 = i2 && o3;
      a2 ? e2.shiftKey || n2 !== o3 ? e2.shiftKey && n2 === i2 && (e2.preventDefault(), r2 && $d3863c46a17e8a28$var$focus(o3, { select: true })) : (e2.preventDefault(), r2 && $d3863c46a17e8a28$var$focus(i2, { select: true })) : n2 === t3 && e2.preventDefault();
    }
  }, [r2, a, p.paused]);
  return (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends7({ tabIndex: -1 }, o2, { ref: f, onKeyDown: h }));
});
function $d3863c46a17e8a28$var$focusFirst(e, { select: t = false } = {}) {
  const n = document.activeElement;
  for (const i of e)
    if ($d3863c46a17e8a28$var$focus(i, { select: t }), document.activeElement !== n)
      return;
}
function $d3863c46a17e8a28$var$getTabbableEdges(e) {
  const t = $d3863c46a17e8a28$var$getTabbableCandidates(e), n = $d3863c46a17e8a28$var$findVisible(t, e), i = $d3863c46a17e8a28$var$findVisible(t.reverse(), e);
  return [n, i];
}
function $d3863c46a17e8a28$var$getTabbableCandidates(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e2) => {
    const t2 = "INPUT" === e2.tagName && "hidden" === e2.type;
    return e2.disabled || e2.hidden || t2 ? NodeFilter.FILTER_SKIP : 0 <= e2.tabIndex ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; n.nextNode(); )
    t.push(n.currentNode);
  return t;
}
function $d3863c46a17e8a28$var$findVisible(e, t) {
  for (const n of e)
    if (!$d3863c46a17e8a28$var$isHidden(n, { upTo: t }))
      return n;
}
function $d3863c46a17e8a28$var$isHidden(e, { upTo: t }) {
  if ("hidden" === getComputedStyle(e).visibility)
    return true;
  for (; e; ) {
    if (t !== void 0 && e === t)
      return false;
    if ("none" === getComputedStyle(e).display)
      return true;
    e = e.parentElement;
  }
  return false;
}
function $d3863c46a17e8a28$var$isSelectableInput(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function $d3863c46a17e8a28$var$focus(e, { select: t = false } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: true }), e !== n && $d3863c46a17e8a28$var$isSelectableInput(e) && t && e.select();
  }
}
var $d3863c46a17e8a28$var$focusScopesStack = $d3863c46a17e8a28$var$createFocusScopesStack();
function $d3863c46a17e8a28$var$createFocusScopesStack() {
  let e = [];
  return { add(t) {
    const n = e[0];
    t !== n && (null === n || void 0 === n || n.pause()), e = $d3863c46a17e8a28$var$arrayRemove(e, t), e.unshift(t);
  }, remove(t) {
    var n;
    e = $d3863c46a17e8a28$var$arrayRemove(e, t), null === (n = e[0]) || void 0 === n || n.resume();
  } };
}
function $d3863c46a17e8a28$var$arrayRemove(e, t) {
  const n = [...e], i = n.indexOf(t);
  return -1 !== i && n.splice(i, 1), n;
}
function $d3863c46a17e8a28$var$removeLinks(e) {
  return e.filter((e2) => "A" !== e2.tagName);
}
var $9f79659886946c16$export$e5c5a5f917a5871c = !(!(null !== globalThis && void 0 !== globalThis) || !globalThis.document) ? import_react62.useLayoutEffect : () => {
};
var $1746a345f3d73bb7$var$useReactId = React5["useId".toString()] || (() => void 0);
var $1746a345f3d73bb7$var$count = 0;
function $1746a345f3d73bb7$export$f680877a34711e37(e) {
  const [t, n] = React5.useState($1746a345f3d73bb7$var$useReactId());
  return $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    e || n((e2) => null !== e2 && void 0 !== e2 ? e2 : $1746a345f3d73bb7$var$count++ + "");
  }, [e]), e || (t ? `radix-${t}` : "");
}
function getSide(e) {
  return e.split("-")[0];
}
function getAlignment(e) {
  return e.split("-")[1];
}
function getMainAxisFromPlacement(e) {
  return ["top", "bottom"].includes(getSide(e)) ? "x" : "y";
}
function getLengthFromAxis(e) {
  return "y" === e ? "height" : "width";
}
function computeCoordsFromPlacement(e, t, n) {
  let { reference: i, floating: o2 } = e;
  const r2 = i.x + i.width / 2 - o2.width / 2, a = i.y + i.height / 2 - o2.height / 2, d = getMainAxisFromPlacement(t), l = getLengthFromAxis(d), s = i[l] / 2 - o2[l] / 2, c2 = getSide(t), u = "x" === d;
  let f;
  switch (f = "top" === c2 ? { x: r2, y: i.y - o2.height } : "bottom" === c2 ? { x: r2, y: i.y + i.height } : "right" === c2 ? { x: i.x + i.width, y: a } : "left" === c2 ? { x: i.x - o2.width, y: a } : { x: i.x, y: i.y }, getAlignment(t)) {
    case "start":
      f[d] -= s * (n && u ? -1 : 1);
      break;
    case "end":
      f[d] += s * (n && u ? -1 : 1);
  }
  return f;
}
var computePosition$1 = async (e, t, n) => {
  const { placement: r2 = "bottom", strategy: a = "absolute", middleware: d = [], platform: o2 } = n, l = await (null == o2.isRTL ? void 0 : o2.isRTL(t));
  if (null == o2 && console.error("Floating UI: `platform` property was not passed to config. If you want to use Floating UI on the web, install @floating-ui/dom instead of the /core package. Otherwise, you can create your own `platform`: https://floating-ui.com/docs/platform"), 1 < d.filter((e2) => {
    let { name: t2 } = e2;
    return "autoPlacement" === t2 || "flip" === t2;
  }).length)
    throw new Error("Floating UI: duplicate `flip` and/or `autoPlacement` middleware detected. This will lead to an infinite loop. Ensure only one of either has been passed to the `middleware` array.");
  let s = await o2.getElementRects({ reference: e, floating: t, strategy: a }), { x: c2, y: u } = computeCoordsFromPlacement(s, r2, l), f = r2, p = {}, h = 0;
  for (let m = 0; m < d.length; m++) {
    const { name: n2, fn: i } = d[m], { x: g, y, data: v, reset: x } = await i({ x: c2, y: u, initialPlacement: r2, placement: f, strategy: a, middlewareData: p, rects: s, platform: o2, elements: { reference: e, floating: t } });
    if (c2 = null == g ? c2 : g, u = null == y ? u : y, p = { ...p, [n2]: { ...p[n2], ...v } }, 50 < h && console.warn("Floating UI: The middleware lifecycle appears to be running in an infinite loop. This is usually caused by a `reset` continually being returned without a break condition."), x && 50 >= h) {
      h++, "object" == typeof x && (x.placement && (f = x.placement), x.rects && (s = true === x.rects ? await o2.getElementRects({ reference: e, floating: t, strategy: a }) : x.rects), { x: c2, y: u } = computeCoordsFromPlacement(s, f, l)), m = -1;
      continue;
    }
  }
  return { x: c2, y: u, placement: f, strategy: a, middlewareData: p };
};
function expandPaddingObject(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function getSideObjectFromPadding(e) {
  return "number" == typeof e ? { top: e, right: e, bottom: e, left: e } : expandPaddingObject(e);
}
function rectToClientRect(e) {
  return { ...e, top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height };
}
async function detectOverflow(e, t) {
  var n;
  void 0 === t && (t = {});
  const { x: i, y: o2, platform: r2, rects: a, elements: d, strategy: l } = e, { boundary: s = "clippingAncestors", rootBoundary: c2 = "viewport", elementContext: u = "floating", altBoundary: f = false, padding: p = 0 } = t, h = getSideObjectFromPadding(p), m = "floating" === u ? "reference" : "floating", g = d[f ? m : u], y = rectToClientRect(await r2.getClippingRect({ element: !(null != (n = await (null == r2.isElement ? void 0 : r2.isElement(g)))) || n ? g : g.contextElement || await (null == r2.getDocumentElement ? void 0 : r2.getDocumentElement(d.floating)), boundary: s, rootBoundary: c2, strategy: l })), v = rectToClientRect(r2.convertOffsetParentRelativeRectToViewportRelativeRect ? await r2.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: "floating" === u ? { ...a.floating, x: i, y: o2 } : a.reference, offsetParent: await (null == r2.getOffsetParent ? void 0 : r2.getOffsetParent(d.floating)), strategy: l }) : a[u]);
  return { top: y.top - v.top + h.top, bottom: v.bottom - y.bottom + h.bottom, left: y.left - v.left + h.left, right: v.right - y.right + h.right };
}
var min$1 = Math.min;
var max$1 = Math.max;
function within(e, t, n) {
  return max$1(e, min$1(t, n));
}
var arrow$1 = (e) => ({ name: "arrow", options: e, async fn(t) {
  const { element: n, padding: i = 0 } = null == e ? {} : e, { x: o2, y: r2, placement: a, rects: d, platform: l } = t;
  if (null == n)
    return console.warn("Floating UI: No `element` was passed to the `arrow` middleware."), {};
  const s = getSideObjectFromPadding(i), c2 = { x: o2, y: r2 }, u = getMainAxisFromPlacement(a), f = getAlignment(a), p = getLengthFromAxis(u), h = await l.getDimensions(n), m = "y" === u ? "top" : "left", g = "y" === u ? "bottom" : "right", y = d.reference[p] + d.reference[u] - c2[u] - d.floating[p], v = c2[u] - d.reference[u], x = await (null == l.getOffsetParent ? void 0 : l.getOffsetParent(n));
  let b6 = x ? "y" === u ? x.clientHeight || 0 : x.clientWidth || 0 : 0;
  0 === b6 && (b6 = d.floating[p]);
  const w = y / 2 - v / 2, E = s[m], C = b6 - h[p] - s[g], S = b6 / 2 - h[p] / 2 + w, P = within(E, S, C), T = "start" === f ? s[m] : s[g], A = 0 < T && S !== P && d.reference[p] <= d.floating[p], L = A ? S < E ? E - S : C - S : 0;
  return { [u]: c2[u] - L, data: { [u]: P, centerOffset: S - P } };
} });
var hash$1 = { left: "right", right: "left", bottom: "top", top: "bottom" };
function getOppositePlacement(e) {
  return e.replace(/left|right|bottom|top/g, (e2) => hash$1[e2]);
}
function getAlignmentSides(e, t, n) {
  void 0 === n && (n = false);
  const i = getAlignment(e), o2 = getMainAxisFromPlacement(e), r2 = getLengthFromAxis(o2);
  let a = "x" === o2 ? i === (n ? "end" : "start") ? "right" : "left" : "start" === i ? "bottom" : "top";
  return t.reference[r2] > t.floating[r2] && (a = getOppositePlacement(a)), { main: a, cross: getOppositePlacement(a) };
}
var hash = { start: "end", end: "start" };
function getOppositeAlignmentPlacement(e) {
  return e.replace(/start|end/g, (e2) => hash[e2]);
}
var sides = ["top", "right", "bottom", "left"];
function getExpandedPlacements(e) {
  const t = getOppositePlacement(e);
  return [getOppositeAlignmentPlacement(e), t, getOppositeAlignmentPlacement(t)];
}
var flip = function(e) {
  return void 0 === e && (e = {}), { name: "flip", options: e, async fn(t) {
    var n;
    const { placement: i, middlewareData: o2, rects: r2, initialPlacement: a, platform: d, elements: l } = t, { mainAxis: u = true, crossAxis: f = true, fallbackPlacements: s, fallbackStrategy: p = "bestFit", flipAlignment: h = true, ...c2 } = e, m = getSide(i), g = m === a, y = s || (g || !h ? [getOppositePlacement(a)] : getExpandedPlacements(a)), v = [a, ...y], x = await detectOverflow(t, c2), b6 = [];
    let w = (null == (n = o2.flip) ? void 0 : n.overflows) || [];
    if (u && b6.push(x[m]), f) {
      const { main: e2, cross: t2 } = getAlignmentSides(i, r2, await (null == d.isRTL ? void 0 : d.isRTL(l.floating)));
      b6.push(x[e2], x[t2]);
    }
    if (w = [...w, { placement: i, overflows: b6 }], !b6.every((e2) => 0 >= e2)) {
      var E, C;
      const e2 = (null == (E = null == (C = o2.flip) ? void 0 : C.index) ? 0 : E) + 1, t2 = v[e2];
      if (t2)
        return { data: { index: e2, overflows: w }, reset: { placement: t2 } };
      let n2 = "bottom";
      switch (p) {
        case "bestFit": {
          var S;
          const e3 = null == (S = w.map((e4) => [e4, e4.overflows.filter((e5) => 0 < e5).reduce((e5, t3) => e5 + t3, 0)]).sort((e4, t3) => e4[1] - t3[1])[0]) ? void 0 : S[0].placement;
          e3 && (n2 = e3);
          break;
        }
        case "initialPlacement":
          n2 = a;
      }
      if (i !== n2)
        return { reset: { placement: n2 } };
    }
    return {};
  } };
};
function getSideOffsets(e, t) {
  return { top: e.top - t.height, right: e.right - t.width, bottom: e.bottom - t.height, left: e.left - t.width };
}
function isAnySideFullyClipped(e) {
  return sides.some((t) => 0 <= e[t]);
}
var hide = function(e) {
  let { strategy: n = "referenceHidden", ...t } = void 0 === e ? {} : e;
  return { name: "hide", async fn(e2) {
    const { rects: i } = e2;
    switch (n) {
      case "referenceHidden": {
        const n2 = await detectOverflow(e2, { ...t, elementContext: "reference" }), o2 = getSideOffsets(n2, i.reference);
        return { data: { referenceHiddenOffsets: o2, referenceHidden: isAnySideFullyClipped(o2) } };
      }
      case "escaped": {
        const n2 = await detectOverflow(e2, { ...t, altBoundary: true }), o2 = getSideOffsets(n2, i.floating);
        return { data: { escapedOffsets: o2, escaped: isAnySideFullyClipped(o2) } };
      }
      default:
        return {};
    }
  } };
};
async function convertValueToCoords(e, t) {
  const { placement: n, platform: i, elements: o2 } = e, r2 = await (null == i.isRTL ? void 0 : i.isRTL(o2.floating)), a = getSide(n), d = getAlignment(n), l = "x" === getMainAxisFromPlacement(n), s = ["left", "top"].includes(a) ? -1 : 1, c2 = r2 && l ? -1 : 1, u = "function" == typeof t ? t(e) : t;
  let { mainAxis: f, crossAxis: p, alignmentAxis: h } = "number" == typeof u ? { mainAxis: u, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...u };
  return d && "number" == typeof h && (p = "end" === d ? -1 * h : h), l ? { x: p * c2, y: f * s } : { x: f * s, y: p * c2 };
}
var offset = function(e) {
  return void 0 === e && (e = 0), { name: "offset", options: e, async fn(t) {
    const { x: n, y: i } = t, o2 = await convertValueToCoords(t, e);
    return { x: n + o2.x, y: i + o2.y, data: o2 };
  } };
};
function getCrossAxis(e) {
  return "x" === e ? "y" : "x";
}
var shift = function(e) {
  return void 0 === e && (e = {}), { name: "shift", options: e, async fn(t) {
    const { x: n, y: i, placement: o2 } = t, { mainAxis: a = true, crossAxis: d = false, limiter: l = { fn: (e2) => {
      let { x: t2, y: n2 } = e2;
      return { x: t2, y: n2 };
    } }, ...r2 } = e, s = { x: n, y: i }, c2 = await detectOverflow(t, r2), u = getMainAxisFromPlacement(getSide(o2)), f = getCrossAxis(u);
    let p = s[u], h = s[f];
    if (a) {
      const e2 = "y" === u ? "top" : "left", t2 = "y" === u ? "bottom" : "right", n2 = p + c2[e2], i2 = p - c2[t2];
      p = within(n2, p, i2);
    }
    if (d) {
      const e2 = "y" === f ? "top" : "left", t2 = "y" === f ? "bottom" : "right", n2 = h + c2[e2], i2 = h - c2[t2];
      h = within(n2, h, i2);
    }
    const m = l.fn({ ...t, [u]: p, [f]: h });
    return { ...m, data: { x: m.x - n, y: m.y - i } };
  } };
};
var limitShift = function(e) {
  return void 0 === e && (e = {}), { options: e, fn(t) {
    const { x: n, y: i, placement: o2, rects: r2, middlewareData: a } = t, { offset: d = 0, mainAxis: l = true, crossAxis: s = true } = e, c2 = { x: n, y: i }, u = getMainAxisFromPlacement(o2), f = getCrossAxis(u);
    let p = c2[u], h = c2[f];
    const m = "function" == typeof d ? d({ ...r2, placement: o2 }) : d, g = "number" == typeof m ? { mainAxis: m, crossAxis: 0 } : { mainAxis: 0, crossAxis: 0, ...m };
    if (l) {
      const e2 = "y" === u ? "height" : "width", t2 = r2.reference[u] - r2.floating[e2] + g.mainAxis, n2 = r2.reference[u] + r2.reference[e2] - g.mainAxis;
      p < t2 ? p = t2 : p > n2 && (p = n2);
    }
    if (s) {
      var y, v, x, b6;
      const e2 = "y" === u ? "width" : "height", t2 = ["top", "left"].includes(getSide(o2)), n2 = r2.reference[f] - r2.floating[e2] + (t2 ? null == (y = null == (v = a.offset) ? void 0 : v[f]) ? 0 : y : 0) + (t2 ? 0 : g.crossAxis), i2 = r2.reference[f] + r2.reference[e2] + (t2 ? 0 : null == (x = null == (b6 = a.offset) ? void 0 : b6[f]) ? 0 : x) - (t2 ? g.crossAxis : 0);
      h < n2 ? h = n2 : h > i2 && (h = i2);
    }
    return { [u]: p, [f]: h };
  } };
};
var size = function(e) {
  return void 0 === e && (e = {}), { name: "size", options: e, async fn(t) {
    const { placement: n, rects: i, platform: o2, elements: r2 } = t, { apply: a, ...d } = e, l = await detectOverflow(t, d), s = getSide(n), c2 = getAlignment(n);
    let u, f;
    "top" === s || "bottom" === s ? (u = s, f = c2 === (await (null == o2.isRTL ? void 0 : o2.isRTL(r2.floating)) ? "start" : "end") ? "left" : "right") : (f = s, u = "end" === c2 ? "top" : "bottom");
    const p = max$1(l.left, 0), h = max$1(l.right, 0), m = max$1(l.top, 0), g = max$1(l.bottom, 0), y = { availableHeight: i.floating.height - (["left", "right"].includes(n) ? 2 * (0 !== m || 0 !== g ? m + g : max$1(l.top, l.bottom)) : l[u]), availableWidth: i.floating.width - (["top", "bottom"].includes(n) ? 2 * (0 !== p || 0 !== h ? p + h : max$1(l.left, l.right)) : l[f]) }, v = await o2.getDimensions(r2.floating);
    null == a ? void 0 : a({ ...t, ...y });
    const x = await o2.getDimensions(r2.floating);
    return v.width !== x.width || v.height !== x.height ? { reset: { rects: true } } : {};
  } };
};
function isWindow(e) {
  return e && e.document && e.location && e.alert && e.setInterval;
}
function getWindow(e) {
  if (null == e)
    return window;
  if (!isWindow(e)) {
    const t = e.ownerDocument;
    return t ? t.defaultView || window : window;
  }
  return e;
}
function getComputedStyle$1(e) {
  return getWindow(e).getComputedStyle(e);
}
function getNodeName(e) {
  return isWindow(e) ? "" : e ? (e.nodeName || "").toLowerCase() : "";
}
function getUAString() {
  const e = navigator.userAgentData;
  return null != e && e.brands ? e.brands.map((e2) => e2.brand + "/" + e2.version).join(" ") : navigator.userAgent;
}
function isHTMLElement(e) {
  return e instanceof getWindow(e).HTMLElement;
}
function isElement(e) {
  return e instanceof getWindow(e).Element;
}
function isNode2(e) {
  return e instanceof getWindow(e).Node;
}
function isShadowRoot(e) {
  if ("undefined" == typeof ShadowRoot)
    return false;
  const t = getWindow(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function isOverflowElement(e) {
  const { overflow: t, overflowX: n, overflowY: i } = getComputedStyle$1(e);
  return /auto|scroll|overlay|hidden/.test(t + i + n);
}
function isTableElement(e) {
  return ["table", "td", "th"].includes(getNodeName(e));
}
function isContainingBlock(e) {
  const t = /firefox/i.test(getUAString()), n = getComputedStyle$1(e);
  return "none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || ["transform", "perspective"].includes(n.willChange) || t && "filter" === n.willChange || t && !!n.filter && "none" !== n.filter;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
var min = Math.min;
var max = Math.max;
var round = Math.round;
function getBoundingClientRect(e, t, n) {
  var i, o2, r2, a;
  void 0 === t && (t = false), void 0 === n && (n = false);
  const d = e.getBoundingClientRect();
  let l = 1, s = 1;
  t && isHTMLElement(e) && (l = 0 < e.offsetWidth ? round(d.width) / e.offsetWidth || 1 : 1, s = 0 < e.offsetHeight ? round(d.height) / e.offsetHeight || 1 : 1);
  const c2 = isElement(e) ? getWindow(e) : window, u = !isLayoutViewport() && n, f = (d.left + (u ? null == (i = null == (o2 = c2.visualViewport) ? void 0 : o2.offsetLeft) ? 0 : i : 0)) / l, p = (d.top + (u ? null == (r2 = null == (a = c2.visualViewport) ? void 0 : a.offsetTop) ? 0 : r2 : 0)) / s, h = d.width / l, m = d.height / s;
  return { width: h, height: m, top: p, right: f + h, bottom: p + m, left: f, x: f, y: p };
}
function getDocumentElement(e) {
  return ((isNode2(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function getNodeScroll(e) {
  return isElement(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function getWindowScrollBarX(e) {
  return getBoundingClientRect(getDocumentElement(e)).left + getNodeScroll(e).scrollLeft;
}
function isScaled(e) {
  const t = getBoundingClientRect(e);
  return round(t.width) !== e.offsetWidth || round(t.height) !== e.offsetHeight;
}
function getRectRelativeToOffsetParent(e, t, n) {
  const i = isHTMLElement(t), o2 = getDocumentElement(t), r2 = getBoundingClientRect(e, i && isScaled(t), "fixed" === n);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const d = { x: 0, y: 0 };
  if (i || !i && "fixed" !== n)
    if (("body" !== getNodeName(t) || isOverflowElement(o2)) && (a = getNodeScroll(t)), isHTMLElement(t)) {
      const e2 = getBoundingClientRect(t, true);
      d.x = e2.x + t.clientLeft, d.y = e2.y + t.clientTop;
    } else
      o2 && (d.x = getWindowScrollBarX(o2));
  return { x: r2.left + a.scrollLeft - d.x, y: r2.top + a.scrollTop - d.y, width: r2.width, height: r2.height };
}
function getParentNode(e) {
  return "html" === getNodeName(e) ? e : e.assignedSlot || e.parentNode || (isShadowRoot(e) ? e.host : null) || getDocumentElement(e);
}
function getTrueOffsetParent(e) {
  return isHTMLElement(e) && "fixed" !== getComputedStyle(e).position ? e.offsetParent : null;
}
function getContainingBlock(e) {
  let t = getParentNode(e);
  for (isShadowRoot(t) && (t = t.host); isHTMLElement(t) && !["html", "body"].includes(getNodeName(t)); ) {
    if (isContainingBlock(t))
      return t;
    t = t.parentNode;
  }
  return null;
}
function getOffsetParent(e) {
  const t = getWindow(e);
  let n = getTrueOffsetParent(e);
  for (; n && isTableElement(n) && "static" === getComputedStyle(n).position; )
    n = getTrueOffsetParent(n);
  return n && ("html" === getNodeName(n) || "body" === getNodeName(n) && "static" === getComputedStyle(n).position && !isContainingBlock(n)) ? t : n || getContainingBlock(e) || t;
}
function getDimensions(e) {
  if (isHTMLElement(e))
    return { width: e.offsetWidth, height: e.offsetHeight };
  const t = getBoundingClientRect(e);
  return { width: t.width, height: t.height };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(e) {
  let { rect: t, offsetParent: n, strategy: i } = e;
  const o2 = isHTMLElement(n), r2 = getDocumentElement(n);
  if (n === r2)
    return t;
  let a = { scrollLeft: 0, scrollTop: 0 };
  const d = { x: 0, y: 0 };
  if ((o2 || !o2 && "fixed" !== i) && (("body" !== getNodeName(n) || isOverflowElement(r2)) && (a = getNodeScroll(n)), isHTMLElement(n))) {
    const e2 = getBoundingClientRect(n, true);
    d.x = e2.x + n.clientLeft, d.y = e2.y + n.clientTop;
  }
  return { ...t, x: t.x - a.scrollLeft + d.x, y: t.y - a.scrollTop + d.y };
}
function getViewportRect(e, t) {
  const n = getWindow(e), i = getDocumentElement(e), o2 = n.visualViewport;
  let r2 = i.clientWidth, a = i.clientHeight, d = 0, l = 0;
  if (o2) {
    r2 = o2.width, a = o2.height;
    const e2 = isLayoutViewport();
    (e2 || !e2 && "fixed" === t) && (d = o2.offsetLeft, l = o2.offsetTop);
  }
  return { width: r2, height: a, x: d, y: l };
}
function getDocumentRect(e) {
  var t;
  const n = getDocumentElement(e), i = getNodeScroll(e), o2 = null == (t = e.ownerDocument) ? void 0 : t.body, r2 = max(n.scrollWidth, n.clientWidth, o2 ? o2.scrollWidth : 0, o2 ? o2.clientWidth : 0), a = max(n.scrollHeight, n.clientHeight, o2 ? o2.scrollHeight : 0, o2 ? o2.clientHeight : 0);
  let d = -i.scrollLeft + getWindowScrollBarX(e);
  const l = -i.scrollTop;
  return "rtl" === getComputedStyle$1(o2 || n).direction && (d += max(n.clientWidth, o2 ? o2.clientWidth : 0) - r2), { width: r2, height: a, x: d, y: l };
}
function getNearestOverflowAncestor(e) {
  const t = getParentNode(e);
  return ["html", "body", "#document"].includes(getNodeName(t)) ? e.ownerDocument.body : isHTMLElement(t) && isOverflowElement(t) ? t : getNearestOverflowAncestor(t);
}
function getOverflowAncestors(e, t) {
  var n;
  void 0 === t && (t = []);
  const i = getNearestOverflowAncestor(e), o2 = i === (null == (n = e.ownerDocument) ? void 0 : n.body), r2 = getWindow(i), a = o2 ? [r2].concat(r2.visualViewport || [], isOverflowElement(i) ? i : []) : i, d = t.concat(a);
  return o2 ? d : d.concat(getOverflowAncestors(a));
}
function contains(e, t) {
  const n = null == t.getRootNode ? void 0 : t.getRootNode();
  if (e.contains(t))
    return true;
  if (n && isShadowRoot(n)) {
    let n2 = t;
    do {
      if (n2 && e === n2)
        return true;
      n2 = n2.parentNode || n2.host;
    } while (n2);
  }
  return false;
}
function getInnerBoundingClientRect(e, t) {
  const n = getBoundingClientRect(e, false, "fixed" === t), i = n.top + e.clientTop, o2 = n.left + e.clientLeft;
  return { top: i, left: o2, x: o2, y: i, right: o2 + e.clientWidth, bottom: i + e.clientHeight, width: e.clientWidth, height: e.clientHeight };
}
function getClientRectFromClippingAncestor(e, t, n) {
  return "viewport" === t ? rectToClientRect(getViewportRect(e, n)) : isElement(t) ? getInnerBoundingClientRect(t, n) : rectToClientRect(getDocumentRect(getDocumentElement(e)));
}
function getClippingAncestors(e) {
  const t = getOverflowAncestors(e), n = ["absolute", "fixed"].includes(getComputedStyle$1(e).position), i = n && isHTMLElement(e) ? getOffsetParent(e) : e;
  return isElement(i) ? t.filter((e2) => isElement(e2) && contains(e2, i) && "body" !== getNodeName(e2)) : [];
}
function getClippingRect(e) {
  let { element: t, boundary: n, rootBoundary: i, strategy: o2 } = e;
  const r2 = "clippingAncestors" === n ? getClippingAncestors(t) : [].concat(n), a = [...r2, i], d = a[0], l = a.reduce((e2, n2) => {
    const i2 = getClientRectFromClippingAncestor(t, n2, o2);
    return e2.top = max(i2.top, e2.top), e2.right = min(i2.right, e2.right), e2.bottom = min(i2.bottom, e2.bottom), e2.left = max(i2.left, e2.left), e2;
  }, getClientRectFromClippingAncestor(t, d, o2));
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}
var platform = { getClippingRect, convertOffsetParentRelativeRectToViewportRelativeRect, isElement, getDimensions, getOffsetParent, getDocumentElement, getElementRects: (e) => {
  let { reference: t, floating: n, strategy: i } = e;
  return { reference: getRectRelativeToOffsetParent(t, getOffsetParent(n), i), floating: { ...getDimensions(n), x: 0, y: 0 } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => "rtl" === getComputedStyle$1(e).direction };
function autoUpdate(e, t, n, i) {
  function o2() {
    const t2 = getBoundingClientRect(e);
    h && (t2.x !== h.x || t2.y !== h.y || t2.width !== h.width || t2.height !== h.height) && n(), h = t2, p = requestAnimationFrame(o2);
  }
  void 0 === i && (i = {});
  const { ancestorScroll: r2 = true, ancestorResize: a = true, elementResize: d = true, animationFrame: l = false } = i, s = r2 && !l, c2 = a && !l, u = s || c2 ? [...isElement(e) ? getOverflowAncestors(e) : [], ...getOverflowAncestors(t)] : [];
  u.forEach((e2) => {
    s && e2.addEventListener("scroll", n, { passive: true }), c2 && e2.addEventListener("resize", n);
  });
  let f = null;
  if (d) {
    let i2 = true;
    f = new ResizeObserver(() => {
      i2 || n(), i2 = false;
    }), isElement(e) && !l && f.observe(e), f.observe(t);
  }
  let p, h = l ? getBoundingClientRect(e) : null;
  return l && o2(), n(), () => {
    var e2;
    u.forEach((e3) => {
      s && e3.removeEventListener("scroll", n), c2 && e3.removeEventListener("resize", n);
    }), null == (e2 = f) ? void 0 : e2.disconnect(), f = null, l && cancelAnimationFrame(p);
  };
}
var computePosition = (e, t, n) => computePosition$1(e, t, { platform, ...n });
var index = "undefined" == typeof document ? import_react62.useEffect : import_react62.useLayoutEffect;
function deepEqual(e, t) {
  if (e === t)
    return true;
  if (typeof e != typeof t)
    return false;
  if ("function" == typeof e && e.toString() === t.toString())
    return true;
  let n, o2, r2;
  if (e && t && "object" == typeof e) {
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return false;
      for (o2 = n; 0 != o2--; )
        if (!deepEqual(e[o2], t[o2]))
          return false;
      return true;
    }
    if (r2 = Object.keys(e), n = r2.length, n !== Object.keys(t).length)
      return false;
    for (o2 = n; 0 != o2--; )
      if (!Object.prototype.hasOwnProperty.call(t, r2[o2]))
        return false;
    for (o2 = n; 0 != o2--; ) {
      const n2 = r2[o2];
      if (!("_owner" === n2 && e.$$typeof) && !deepEqual(e[n2], t[n2]))
        return false;
    }
    return true;
  }
  return e !== e && t !== t;
}
function useLatestRef(e) {
  const t = React5.useRef(e);
  return index(() => {
    t.current = e;
  }), t;
}
function useFloating(e) {
  let { middleware: t, placement: i = "bottom", strategy: o2 = "absolute", whileElementsMounted: n } = void 0 === e ? {} : e;
  const r2 = React5.useRef(null), a = React5.useRef(null), d = useLatestRef(n), l = React5.useRef(null), [s, c2] = React5.useState({ x: null, y: null, strategy: o2, placement: i, middlewareData: {} }), [u, f] = React5.useState(t);
  deepEqual(null == u ? void 0 : u.map((e2) => {
    let { options: t2 } = e2;
    return t2;
  }), null == t ? void 0 : t.map((e2) => {
    let { options: t2 } = e2;
    return t2;
  })) || f(t);
  const p = React5.useCallback(() => {
    r2.current && a.current && computePosition(r2.current, a.current, { middleware: u, placement: i, strategy: o2 }).then((e2) => {
      h.current && ReactDOM.flushSync(() => {
        c2(e2);
      });
    });
  }, [u, i, o2]);
  index(() => {
    h.current && p();
  }, [p]);
  const h = React5.useRef(false);
  index(() => (h.current = true, () => {
    h.current = false;
  }), []);
  const m = React5.useCallback(() => {
    if ("function" == typeof l.current && (l.current(), l.current = null), r2.current && a.current)
      if (d.current) {
        const e2 = d.current(r2.current, a.current, p);
        l.current = e2;
      } else
        p();
  }, [p, d]), g = React5.useCallback((e2) => {
    r2.current = e2, m();
  }, [m]), y = React5.useCallback((e2) => {
    a.current = e2, m();
  }, [m]), v = React5.useMemo(() => ({ reference: r2, floating: a }), []);
  return React5.useMemo(() => ({ ...s, update: p, refs: v, reference: g, floating: y }), [s, p, v, g, y]);
}
var arrow = (e) => {
  function t(e2) {
    return Object.prototype.hasOwnProperty.call(e2, "current");
  }
  const { element: n, padding: i } = e;
  return { name: "arrow", options: e, fn(e2) {
    if (t(n))
      return null == n.current ? {} : arrow$1({ element: n.current, padding: i }).fn(e2);
    return n ? arrow$1({ element: n, padding: i }).fn(e2) : {};
  } };
};
function $db6c3485150b8e66$export$1ab7ae714698c4b8(e) {
  const [t, n] = (0, import_react62.useState)(void 0);
  return $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const t2 = new ResizeObserver((t3) => {
        if (!Array.isArray(t3))
          return;
        if (!t3.length)
          return;
        const i = t3[0];
        let o2, r2;
        if ("borderBoxSize" in i) {
          const e2 = i.borderBoxSize, t4 = Array.isArray(e2) ? e2[0] : e2;
          o2 = t4.inlineSize, r2 = t4.blockSize;
        } else
          o2 = e.offsetWidth, r2 = e.offsetHeight;
        n({ width: o2, height: r2 });
      });
      return t2.observe(e, { box: "border-box" }), () => t2.unobserve(e);
    }
    n(void 0);
  }, [e]), t;
}
var [$cf1ac5d9fe0e8206$var$createPopperContext, $cf1ac5d9fe0e8206$export$722aac194ae923] = $c512c27ab02ef895$export$50c7b4e9d9f19c1("Popper");
var [$cf1ac5d9fe0e8206$var$PopperProvider, $cf1ac5d9fe0e8206$var$usePopperContext] = $cf1ac5d9fe0e8206$var$createPopperContext("Popper");
var $cf1ac5d9fe0e8206$export$badac9ada3a0bdf9 = (e) => {
  const { __scopePopper: t, children: n } = e, [i, o2] = (0, import_react62.useState)(null);
  return (0, import_react62.createElement)($cf1ac5d9fe0e8206$var$PopperProvider, { scope: t, anchor: i, onAnchorChange: o2 }, n);
};
var $cf1ac5d9fe0e8206$var$ANCHOR_NAME = "PopperAnchor";
var $cf1ac5d9fe0e8206$export$ecd4e1ccab6ed6d = (0, import_react62.forwardRef)((e, t) => {
  const { __scopePopper: n, virtualRef: i, ...o2 } = e, r2 = $cf1ac5d9fe0e8206$var$usePopperContext($cf1ac5d9fe0e8206$var$ANCHOR_NAME, n), a = (0, import_react62.useRef)(null), d = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, a);
  return (0, import_react62.useEffect)(() => {
    r2.onAnchorChange((null === i || void 0 === i ? void 0 : i.current) || a.current);
  }), i ? null : (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends7({}, o2, { ref: d }));
});
var $cf1ac5d9fe0e8206$var$CONTENT_NAME = "PopperContent";
var [$cf1ac5d9fe0e8206$var$PopperContentProvider, $cf1ac5d9fe0e8206$var$useContentContext] = $cf1ac5d9fe0e8206$var$createPopperContext($cf1ac5d9fe0e8206$var$CONTENT_NAME);
var [$cf1ac5d9fe0e8206$var$PositionContextProvider, $cf1ac5d9fe0e8206$var$usePositionContext] = $cf1ac5d9fe0e8206$var$createPopperContext($cf1ac5d9fe0e8206$var$CONTENT_NAME, { hasParent: false, positionUpdateFns: /* @__PURE__ */ new Set() });
var $cf1ac5d9fe0e8206$export$bc4ae5855d3c4fc = (0, import_react62.forwardRef)((e, t) => {
  var i, o2, r2, a, d, l, s, c2, n = Math.round;
  const { __scopePopper: u, side: h = "bottom", sideOffset: m = 0, align: g = "center", alignOffset: v = 0, arrowPadding: b6 = 0, collisionBoundary: w = [], collisionPadding: E = 0, sticky: C = "partial", hideWhenDetached: S = false, avoidCollisions: P = true, onPlaced: f, ...p } = e, T = $cf1ac5d9fe0e8206$var$usePopperContext($cf1ac5d9fe0e8206$var$CONTENT_NAME, u), [A, L] = (0, import_react62.useState)(null), R = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, (e2) => L(e2)), [D, N] = (0, import_react62.useState)(null), O = $db6c3485150b8e66$export$1ab7ae714698c4b8(D), k = null !== (i = null === O || void 0 === O ? void 0 : O.width) && void 0 !== i ? i : 0, I = null !== (o2 = null === O || void 0 === O ? void 0 : O.height) && void 0 !== o2 ? o2 : 0, _ = h + ("center" === g ? "" : "-" + g), H = "number" == typeof E ? E : { top: 0, right: 0, bottom: 0, left: 0, ...E }, W = Array.isArray(w) ? w : [w], B = 0 < W.length, M = { padding: H, boundary: W.filter($cf1ac5d9fe0e8206$var$isNotNull), altBoundary: B }, { reference: F, floating: V, strategy: K, x: z, y: x, placement: y, middlewareData: U, update: X } = useFloating({ strategy: "fixed", placement: _, whileElementsMounted: autoUpdate, middleware: [$cf1ac5d9fe0e8206$var$anchorCssProperties(), offset({ mainAxis: m + I, alignmentAxis: v }), P ? shift({ mainAxis: true, crossAxis: false, limiter: "partial" === C ? limitShift() : void 0, ...M }) : void 0, D ? arrow({ element: D, padding: b6 }) : void 0, P ? flip({ ...M }) : void 0, size({ ...M, apply: ({ elements: e2, availableWidth: t2, availableHeight: n2 }) => {
    e2.floating.style.setProperty("--radix-popper-available-width", `${t2}px`), e2.floating.style.setProperty("--radix-popper-available-height", `${n2}px`);
  } }), $cf1ac5d9fe0e8206$var$transformOrigin({ arrowWidth: k, arrowHeight: I }), S ? hide({ strategy: "referenceHidden" }) : void 0].filter($cf1ac5d9fe0e8206$var$isDefined) });
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    F(T.anchor);
  }, [F, T.anchor]);
  const Y = null !== z && null !== x, [j, q] = $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(y), Z = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(f);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    Y && (null === Z || void 0 === Z || Z());
  }, [Y, Z]);
  const $ = null === (r2 = U.arrow) || void 0 === r2 ? void 0 : r2.x, G = null === (a = U.arrow) || void 0 === a ? void 0 : a.y, J = 0 !== (null === (d = U.arrow) || void 0 === d ? void 0 : d.centerOffset), [Q, ee] = (0, import_react62.useState)();
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    A && ee(window.getComputedStyle(A).zIndex);
  }, [A]);
  const { hasParent: te, positionUpdateFns: ne } = $cf1ac5d9fe0e8206$var$usePositionContext($cf1ac5d9fe0e8206$var$CONTENT_NAME, u), ie = !te;
  (0, import_react62.useLayoutEffect)(() => {
    if (!ie)
      return ne.add(X), () => {
        ne.delete(X);
      };
  }, [ie, ne, X]), $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    ie && Y && Array.from(ne).reverse().forEach((e2) => requestAnimationFrame(e2));
  }, [ie, Y, ne]);
  const oe = { "data-side": j, "data-align": q, ...p, ref: R, style: { ...p.style, animation: Y ? void 0 : "none", opacity: null !== (l = U.hide) && void 0 !== l && l.referenceHidden ? 0 : void 0 } };
  return (0, import_react62.createElement)("div", { ref: V, "data-radix-popper-content-wrapper": "", style: { position: K, left: 0, top: 0, transform: Y ? `translate3d(${n(z)}px, ${n(x)}px, 0)` : "translate3d(0, -200%, 0)", minWidth: "max-content", zIndex: Q, "--radix-popper-transform-origin": [null === (s = U.transformOrigin) || void 0 === s ? void 0 : s.x, null === (c2 = U.transformOrigin) || void 0 === c2 ? void 0 : c2.y].join(" ") }, dir: e.dir }, (0, import_react62.createElement)($cf1ac5d9fe0e8206$var$PopperContentProvider, { scope: u, placedSide: j, onArrowChange: N, arrowX: $, arrowY: G, shouldHideArrow: J }, ie ? (0, import_react62.createElement)($cf1ac5d9fe0e8206$var$PositionContextProvider, { scope: u, hasParent: true, positionUpdateFns: ne }, (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, oe)) : (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, oe)));
});
function $cf1ac5d9fe0e8206$var$isDefined(e) {
  return e !== void 0;
}
function $cf1ac5d9fe0e8206$var$isNotNull(e) {
  return null !== e;
}
var $cf1ac5d9fe0e8206$var$anchorCssProperties = () => ({ name: "anchorCssProperties", fn(e) {
  const { rects: t, elements: n } = e, { width: i, height: o2 } = t.reference;
  return n.floating.style.setProperty("--radix-popper-anchor-width", `${i}px`), n.floating.style.setProperty("--radix-popper-anchor-height", `${o2}px`), {};
} });
var $cf1ac5d9fe0e8206$var$transformOrigin = (e) => ({ name: "transformOrigin", options: e, fn(t) {
  var n, i, o2, r2, a;
  const { placement: d, rects: l, middlewareData: s } = t, c2 = 0 !== (null === (n = s.arrow) || void 0 === n ? void 0 : n.centerOffset), u = c2, f = u ? 0 : e.arrowWidth, p = u ? 0 : e.arrowHeight, [h, m] = $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(d), g = { start: "0%", center: "50%", end: "100%" }[m], v = (null !== (i = null === (o2 = s.arrow) || void 0 === o2 ? void 0 : o2.x) && void 0 !== i ? i : 0) + f / 2, b6 = (null !== (r2 = null === (a = s.arrow) || void 0 === a ? void 0 : a.y) && void 0 !== r2 ? r2 : 0) + p / 2;
  let w = "", E = "";
  return "bottom" === h ? (w = u ? g : `${v}px`, E = `${-p}px`) : "top" === h ? (w = u ? g : `${v}px`, E = `${l.floating.height + p}px`) : "right" === h ? (w = `${-p}px`, E = u ? g : `${b6}px`) : "left" === h && (w = `${l.floating.width + p}px`, E = u ? g : `${b6}px`), { data: { x: w, y: E } };
} });
function $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var $cf1ac5d9fe0e8206$export$be92b6f5f03c0fe9 = $cf1ac5d9fe0e8206$export$badac9ada3a0bdf9;
var $cf1ac5d9fe0e8206$export$b688253958b8dfe7 = $cf1ac5d9fe0e8206$export$ecd4e1ccab6ed6d;
var $cf1ac5d9fe0e8206$export$7c6e2c02157bb7d2 = $cf1ac5d9fe0e8206$export$bc4ae5855d3c4fc;
var $f1701beae083dbae$export$602eac185826482c = (0, import_react62.forwardRef)((e, t) => {
  var n;
  const { container: o2 = null === globalThis || void 0 === globalThis || null === (n = globalThis.document) || void 0 === n ? void 0 : n.body, ...i } = e;
  return o2 ? import_react_dom.default.createPortal((0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends7({}, i, { ref: t })), o2) : null;
});
function $71cd76cc60e0454e$export$6f32135080cb4c3({ prop: e, defaultProp: t, onChange: n = () => {
} }) {
  const [i, o2] = $71cd76cc60e0454e$var$useUncontrolledState({ defaultProp: t, onChange: n }), r2 = e !== void 0, a = r2 ? e : i, d = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(n), l = (0, import_react62.useCallback)((t2) => {
    if (r2) {
      const n2 = t2, i2 = "function" == typeof t2 ? n2(e) : t2;
      i2 !== e && d(i2);
    } else
      o2(t2);
  }, [r2, e, o2, d]);
  return [a, l];
}
function $71cd76cc60e0454e$var$useUncontrolledState({ defaultProp: e, onChange: t }) {
  const n = (0, import_react62.useState)(e), [i] = n, o2 = (0, import_react62.useRef)(i), r2 = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(t);
  return (0, import_react62.useEffect)(() => {
    o2.current !== i && (r2(i), o2.current = i);
  }, [i, o2, r2]), n;
}
function $010c2913dbd2fe3d$export$5cae361ad82dce8b(e) {
  const t = (0, import_react62.useRef)({ value: e, previous: e });
  return (0, import_react62.useMemo)(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var $ea1ef594cf570d83$export$439d29a4e110a164 = (0, import_react62.forwardRef)((e, t) => (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends7({}, e, { ref: t, style: { position: "absolute", border: 0, width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", wordWrap: "normal", ...e.style } })));
var getDefaultParent = function(e) {
  if ("undefined" == typeof document)
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(e) {
  return e && (e.host || unwrapHost(e.parentNode));
};
var correctTargets = function(e, t) {
  return t.map(function(t2) {
    if (e.contains(t2))
      return t2;
    var n = unwrapHost(t2);
    return n && e.contains(n) ? n : (console.error("aria-hidden", t2, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(e2) {
    return !!e2;
  });
};
var applyAttributeToOthers = function(e, t, n, i) {
  var o2 = correctTargets(t, Array.isArray(e) ? e : [e]);
  markerMap[n] || (markerMap[n] = /* @__PURE__ */ new WeakMap());
  var r2 = markerMap[n], a = [], d = /* @__PURE__ */ new Set(), l = new Set(o2), s = function(e2) {
    !e2 || d.has(e2) || (d.add(e2), s(e2.parentNode));
  };
  o2.forEach(s);
  var c2 = function(e2) {
    !e2 || l.has(e2) || Array.prototype.forEach.call(e2.children, function(e3) {
      if (d.has(e3))
        c2(e3);
      else {
        var t2 = e3.getAttribute(i), o3 = null !== t2 && "false" !== t2, l2 = (counterMap.get(e3) || 0) + 1, s2 = (r2.get(e3) || 0) + 1;
        counterMap.set(e3, l2), r2.set(e3, s2), a.push(e3), 1 === l2 && o3 && uncontrolledNodes.set(e3, true), 1 === s2 && e3.setAttribute(n, "true"), o3 || e3.setAttribute(i, "true");
      }
    });
  };
  return c2(t), d.clear(), lockCount++, function() {
    a.forEach(function(e2) {
      var t2 = counterMap.get(e2) - 1, o3 = r2.get(e2) - 1;
      counterMap.set(e2, t2), r2.set(e2, o3), t2 || (!uncontrolledNodes.has(e2) && e2.removeAttribute(i), uncontrolledNodes.delete(e2)), o3 || e2.removeAttribute(n);
    }), lockCount--, lockCount || (counterMap = /* @__PURE__ */ new WeakMap(), counterMap = /* @__PURE__ */ new WeakMap(), uncontrolledNodes = /* @__PURE__ */ new WeakMap(), markerMap = {});
  };
};
var hideOthers = function(e, t, n) {
  void 0 === n && (n = "data-aria-hidden");
  var i = Array.from(Array.isArray(e) ? e : [e]), o2 = t || getDefaultParent(e);
  return o2 ? (i.push.apply(i, Array.from(o2.querySelectorAll("[aria-live]"))), applyAttributeToOthers(i, o2, n, "aria-hidden")) : function() {
    return null;
  };
};
var __assign = function() {
  return __assign = Object.assign || function t(e) {
    for (var o2, r2 = 1, a = arguments.length; r2 < a; r2++)
      for (var n in o2 = arguments[r2], o2)
        Object.prototype.hasOwnProperty.call(o2, n) && (e[n] = o2[n]);
    return e;
  }, __assign.apply(this, arguments);
};
function __rest(n, o2) {
  var e = {};
  for (var t in n)
    Object.prototype.hasOwnProperty.call(n, t) && 0 > o2.indexOf(t) && (e[t] = n[t]);
  if (null != n && "function" == typeof Object.getOwnPropertySymbols)
    for (var r2 = 0, t = Object.getOwnPropertySymbols(n); r2 < t.length; r2++)
      0 > o2.indexOf(t[r2]) && Object.prototype.propertyIsEnumerable.call(n, t[r2]) && (e[t[r2]] = n[t[r2]]);
  return e;
}
function __spreadArray(e, t, n) {
  if (n || 2 === arguments.length)
    for (var o2, r2 = 0, a = t.length; r2 < a; r2++)
      (o2 || !(r2 in t)) && (o2 || (o2 = Array.prototype.slice.call(t, 0, r2)), o2[r2] = t[r2]);
  return e.concat(o2 || Array.prototype.slice.call(t));
}
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";
function assignRef(e, t) {
  return "function" == typeof e ? e(t) : e && (e.current = t), e;
}
function useCallbackRef(e, t) {
  var n = (0, import_react62.useState)(function() {
    return { value: e, callback: t, facade: { get current() {
      return n.value;
    }, set current(e2) {
      var t2 = n.value;
      t2 !== e2 && (n.value = e2, n.callback(e2, t2));
    } } };
  })[0];
  return n.callback = t, n.facade;
}
function useMergeRefs(e, t) {
  return useCallbackRef(t || null, function(t2) {
    return e.forEach(function(e2) {
      return assignRef(e2, t2);
    });
  });
}
"[object process]" === Object.prototype.toString.call("undefined" == typeof process ? 0 : process);
function ItoI(e) {
  return e;
}
function innerCreateMedium(e, t) {
  void 0 === t && (t = ItoI);
  var n = [], i = false, o2 = { read: function() {
    if (i)
      throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
    return n.length ? n[n.length - 1] : e;
  }, useMedium: function(e2) {
    var o3 = t(e2, i);
    return n.push(o3), function() {
      n = n.filter(function(e3) {
        return e3 !== o3;
      });
    };
  }, assignSyncMedium: function(e2) {
    for (i = true; n.length; ) {
      var t2 = n;
      n = [], t2.forEach(e2);
    }
    n = { push: function(t3) {
      return e2(t3);
    }, filter: function() {
      return n;
    } };
  }, assignMedium: function(e2) {
    i = true;
    var t2 = [];
    if (n.length) {
      var o3 = n;
      n = [], o3.forEach(e2), t2 = n;
    }
    var r2 = function() {
      var n2 = t2;
      t2 = [], n2.forEach(e2);
    }, a = function() {
      return Promise.resolve().then(r2);
    };
    a(), n = { push: function(e3) {
      t2.push(e3), a();
    }, filter: function(e3) {
      return t2 = t2.filter(e3), n;
    } };
  } };
  return o2;
}
function createSidecarMedium(e) {
  void 0 === e && (e = {});
  var t = innerCreateMedium(null);
  return t.options = __assign({ async: true, ssr: false }, e), t;
}
var SideCar$1 = function(e) {
  var t = e.sideCar, n = __rest(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var i = t.read();
  if (!i)
    throw new Error("Sidecar medium not found");
  return React5.createElement(i, __assign({}, n));
};
SideCar$1.isSideCarExport = true;
function exportSidecar(e, t) {
  return e.useMedium(t), SideCar$1;
}
var effectCar = createSidecarMedium();
var nothing = function() {
};
var RemoveScroll = React5.forwardRef(function(e, t) {
  var n = React5.useRef(null), i = React5.useState({ onScrollCapture: nothing, onWheelCapture: nothing, onTouchMoveCapture: nothing }), o2 = i[0], r2 = i[1], a = e.forwardProps, d = e.children, l = e.className, s = e.removeScrollBar, c2 = e.enabled, u = e.shards, f = e.sideCar, p = e.noIsolation, h = e.inert, m = e.allowPinchZoom, g = e.as, y = void 0 === g ? "div" : g, v = __rest(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as"]), x = f, b6 = useMergeRefs([n, t]), w = __assign(__assign({}, v), o2);
  return React5.createElement(React5.Fragment, null, c2 && React5.createElement(x, { sideCar: effectCar, removeScrollBar: s, shards: u, noIsolation: p, inert: h, setCallbacks: r2, allowPinchZoom: !!m, lockRef: n }), a ? React5.cloneElement(React5.Children.only(d), __assign(__assign({}, w), { ref: b6 })) : React5.createElement(y, __assign({}, w, { className: l, ref: b6 }), d));
});
RemoveScroll.defaultProps = { enabled: true, removeScrollBar: true, inert: false }, RemoveScroll.classNames = { fullWidth: fullWidthClassName, zeroRight: "right-scroll-bar-position" };
var getNonce = function() {
  return "undefined" == typeof __webpack_nonce__ ? void 0 : __webpack_nonce__;
};
function makeStyleTag() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = getNonce();
  return t && e.setAttribute("nonce", t), e;
}
function injectStyles(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function insertStyleTag(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var stylesheetSingleton = function() {
  var e = 0, t = null;
  return { add: function(n) {
    0 == e && (t = makeStyleTag()) && (injectStyles(t, n), insertStyleTag(t)), e++;
  }, remove: function() {
    e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
  } };
};
var styleHookSingleton = function() {
  var e = stylesheetSingleton();
  return function(t, n) {
    React5.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
};
var styleSingleton = function() {
  var e = styleHookSingleton(), t = function(t2) {
    var n = t2.styles, i = t2.dynamic;
    return e(n, i), null;
  };
  return t;
};
var zeroGap = { left: 0, top: 0, right: 0, gap: 0 };
var parse = function(e) {
  return parseInt(e || "", 10) || 0;
};
var getOffset = function(e) {
  var t = window.getComputedStyle(document.body), n = t["padding" === e ? "paddingLeft" : "marginLeft"], i = t["padding" === e ? "paddingTop" : "marginTop"], o2 = t["padding" === e ? "paddingRight" : "marginRight"];
  return [parse(n), parse(i), parse(o2)];
};
var getGapWidth = function(e) {
  var t = Math.max;
  if (void 0 === e && (e = "margin"), "undefined" == typeof window)
    return zeroGap;
  var n = getOffset(e), i = document.documentElement.clientWidth, o2 = window.innerWidth;
  return { left: n[0], top: n[1], right: n[2], gap: t(0, o2 - i + n[2] - n[0]) };
};
var Style = styleSingleton();
var getStyles = function(e, t, n, i) {
  var o2 = e.left, r2 = e.top, a = e.right, d = e.gap;
  return void 0 === n && (n = "margin"), "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(i, ";\n   padding-right: ").concat(d, "px ").concat(i, ";\n  }\n  body {\n    overflow: hidden ").concat(i, ";\n    overscroll-behavior: contain;\n    ").concat([t && "position: relative ".concat(i, ";"), "margin" === n && "\n    padding-left: ".concat(o2, "px;\n    padding-top: ").concat(r2, "px;\n    padding-right: ").concat(a, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(d, "px ").concat(i, ";\n    "), "padding" === n && "padding-right: ".concat(d, "px ").concat(i, ";")].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(d, "px ").concat(i, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(d, "px ").concat(i, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(i, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(i, ";\n  }\n  \n  body {\n    ").concat(removedBarSizeVariable, ": ").concat(d, "px;\n  }\n");
};
var RemoveScrollBar = function(e) {
  var t = e.noRelative, n = e.noImportant, i = e.gapMode, o2 = void 0 === i ? "margin" : i, r2 = React5.useMemo(function() {
    return getGapWidth(o2);
  }, [o2]);
  return React5.createElement(Style, { styles: getStyles(r2, !t, o2, n ? "" : "!important") });
};
var passiveSupported = false;
if ("undefined" != typeof window)
  try {
    options = Object.defineProperty({}, "passive", { get: function() {
      return passiveSupported = true, true;
    } });
    window.addEventListener("test", options, options), window.removeEventListener("test", options, options);
  } catch (e) {
    passiveSupported = false;
  }
var options;
var nonPassive = !!passiveSupported && { passive: false };
var alwaysContainsScroll = function(e) {
  return "TEXTAREA" === e.tagName;
};
var elementCanBeScrolled = function(e, t) {
  var n = window.getComputedStyle(e);
  return "hidden" !== n[t] && (n.overflowY !== n.overflowX || alwaysContainsScroll(e) || "visible" !== n[t]);
};
var elementCouldBeVScrolled = function(e) {
  return elementCanBeScrolled(e, "overflowY");
};
var elementCouldBeHScrolled = function(e) {
  return elementCanBeScrolled(e, "overflowX");
};
var locationCouldBeScrolled = function(e, t) {
  var n = t;
  do {
    "undefined" != typeof ShadowRoot && n instanceof ShadowRoot && (n = n.host);
    var i = elementCouldBeScrolled(e, n);
    if (i) {
      var o2 = getScrollVariables(e, n), r2 = o2[1], a = o2[2];
      if (r2 > a)
        return true;
    }
    n = n.parentNode;
  } while (n && n !== document.body);
  return false;
};
var getVScrollVariables = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, i = e.clientHeight;
  return [t, n, i];
};
var getHScrollVariables = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, i = e.clientWidth;
  return [t, n, i];
};
var elementCouldBeScrolled = function(e, t) {
  return "v" === e ? elementCouldBeVScrolled(t) : elementCouldBeHScrolled(t);
};
var getScrollVariables = function(e, t) {
  return "v" === e ? getVScrollVariables(t) : getHScrollVariables(t);
};
var getDirectionFactor = function(e, t) {
  return "h" === e && "rtl" === t ? -1 : 1;
};
var handleScroll = function(e, t, n, i, o2) {
  var r2 = getDirectionFactor(e, window.getComputedStyle(t).direction), a = r2 * i, d = n.target, l = t.contains(d), s = false, c2 = 0 < a, u = 0, f = 0;
  do {
    var p = getScrollVariables(e, d), h = p[0], m = p[1], g = p[2], y = m - g - r2 * h;
    (h || y) && elementCouldBeScrolled(e, d) && (u += y, f += h), d = d.parentNode;
  } while (!l && d !== document.body || l && (t.contains(d) || t === d));
  return c2 && (o2 && 0 === u || !o2 && a > u) ? s = true : !c2 && (o2 && 0 === f || !o2 && -a > f) && (s = true), s;
};
var getTouchXY = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(e) {
  return [e.deltaX, e.deltaY];
};
var extractRef = function(e) {
  return e && "current" in e ? e.current : e;
};
var deltaCompare = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
};
var generateStyle = function(e) {
  return "\n  .block-interactivity-".concat(e, " {pointer-events: none;}\n  .allow-interactivity-").concat(e, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(e) {
  var t = Math.abs, n = React5.useRef([]), i = React5.useRef([0, 0]), o2 = React5.useRef(), r2 = React5.useState(idCounter++)[0], a = React5.useState(function() {
    return styleSingleton();
  })[0], d = React5.useRef(e);
  React5.useEffect(function() {
    d.current = e;
  }, [e]), React5.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r2));
      var t2 = __spreadArray([e.lockRef.current], (e.shards || []).map(extractRef), true).filter(Boolean);
      return t2.forEach(function(e2) {
        return e2.classList.add("allow-interactivity-".concat(r2));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r2)), t2.forEach(function(e2) {
          return e2.classList.remove("allow-interactivity-".concat(r2));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var l = React5.useCallback(function(e2, n2) {
    if ("touches" in e2 && 2 === e2.touches.length)
      return !d.current.allowPinchZoom;
    var r3, a2 = getTouchXY(e2), l2 = i.current, s2 = "deltaX" in e2 ? e2.deltaX : l2[0] - a2[0], c3 = "deltaY" in e2 ? e2.deltaY : l2[1] - a2[1], u2 = e2.target, f2 = t(s2) > t(c3) ? "h" : "v";
    if ("touches" in e2 && "h" === f2 && "range" === u2.type)
      return false;
    var p2 = locationCouldBeScrolled(f2, u2);
    if (!p2)
      return true;
    if (p2 ? r3 = f2 : (r3 = "v" === f2 ? "h" : "v", p2 = locationCouldBeScrolled(f2, u2)), !p2)
      return false;
    if (!o2.current && "changedTouches" in e2 && (s2 || c3) && (o2.current = r3), !r3)
      return true;
    var h2 = o2.current || r3;
    return handleScroll(h2, n2, e2, "h" === h2 ? s2 : c3, true);
  }, []), s = React5.useCallback(function(e2) {
    var t2 = e2;
    if (lockStack.length && lockStack[lockStack.length - 1] === a) {
      var i2 = "deltaY" in t2 ? getDeltaXY(t2) : getTouchXY(t2), o3 = n.current.filter(function(n2) {
        return n2.name === t2.type && n2.target === t2.target && deltaCompare(n2.delta, i2);
      })[0];
      if (o3 && o3.should)
        return void (t2.cancelable && t2.preventDefault());
      if (!o3) {
        var r3 = (d.current.shards || []).map(extractRef).filter(Boolean).filter(function(e3) {
          return e3.contains(t2.target);
        }), s2 = 0 < r3.length ? l(t2, r3[0]) : !d.current.noIsolation;
        s2 && t2.cancelable && t2.preventDefault();
      }
    }
  }, []), c2 = React5.useCallback(function(e2, t2, i2, o3) {
    var r3 = { name: e2, delta: t2, target: i2, should: o3 };
    n.current.push(r3), setTimeout(function() {
      n.current = n.current.filter(function(t3) {
        return t3 !== r3;
      });
    }, 1);
  }, []), u = React5.useCallback(function(e2) {
    i.current = getTouchXY(e2), o2.current = void 0;
  }, []), f = React5.useCallback(function(t2) {
    c2(t2.type, getDeltaXY(t2), t2.target, l(t2, e.lockRef.current));
  }, []), p = React5.useCallback(function(t2) {
    c2(t2.type, getTouchXY(t2), t2.target, l(t2, e.lockRef.current));
  }, []);
  React5.useEffect(function() {
    return lockStack.push(a), e.setCallbacks({ onScrollCapture: f, onWheelCapture: f, onTouchMoveCapture: p }), document.addEventListener("wheel", s, nonPassive), document.addEventListener("touchmove", s, nonPassive), document.addEventListener("touchstart", u, nonPassive), function() {
      lockStack = lockStack.filter(function(e2) {
        return e2 !== a;
      }), document.removeEventListener("wheel", s, nonPassive), document.removeEventListener("touchmove", s, nonPassive), document.removeEventListener("touchstart", u, nonPassive);
    };
  }, []);
  var h = e.removeScrollBar, m = e.inert;
  return React5.createElement(React5.Fragment, null, m ? React5.createElement(a, { styles: generateStyle(r2) }) : null, h ? React5.createElement(RemoveScrollBar, { gapMode: "margin" }) : null);
}
var SideCar = exportSidecar(effectCar, RemoveScrollSideCar);
var ReactRemoveScroll = React5.forwardRef(function(e, t) {
  return React5.createElement(RemoveScroll, __assign({}, e, { ref: t, sideCar: SideCar }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var $cc7e05a45900e73f$var$OPEN_KEYS = [" ", "Enter", "ArrowUp", "ArrowDown"];
var $cc7e05a45900e73f$var$SELECTION_KEYS = [" ", "Enter"];
var $cc7e05a45900e73f$var$SELECT_NAME = "Select";
var [$cc7e05a45900e73f$var$Collection, $cc7e05a45900e73f$var$useCollection, $cc7e05a45900e73f$var$createCollectionScope] = $e02a7d9cb1dc128c$export$c74125a8e3af6bb2($cc7e05a45900e73f$var$SELECT_NAME);
var [$cc7e05a45900e73f$var$createSelectContext, $cc7e05a45900e73f$export$286727a75dc039bd] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($cc7e05a45900e73f$var$SELECT_NAME, [$cc7e05a45900e73f$var$createCollectionScope, $cf1ac5d9fe0e8206$export$722aac194ae923]);
var $cc7e05a45900e73f$var$usePopperScope = $cf1ac5d9fe0e8206$export$722aac194ae923();
var [$cc7e05a45900e73f$var$SelectProvider, $cc7e05a45900e73f$var$useSelectContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$SELECT_NAME);
var [$cc7e05a45900e73f$var$SelectNativeOptionsProvider, $cc7e05a45900e73f$var$useSelectNativeOptionsContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$SELECT_NAME);
var $cc7e05a45900e73f$export$ef9b1a59e592288f = (e) => {
  const { __scopeSelect: t, children: n, open: i, defaultOpen: o2, onOpenChange: r2, value: a, defaultValue: d, onValueChange: l, dir: s, name: c2, autoComplete: u, disabled: f, required: p } = e, h = $cc7e05a45900e73f$var$usePopperScope(t), [m, g] = (0, import_react62.useState)(null), [y, v] = (0, import_react62.useState)(null), [x, b6] = (0, import_react62.useState)(false), w = $f631663db3294ace$export$b39126d51d94e6f3(s), [C = false, E] = $71cd76cc60e0454e$export$6f32135080cb4c3({ prop: i, defaultProp: o2, onChange: r2 }), [S, P] = $71cd76cc60e0454e$export$6f32135080cb4c3({ prop: a, defaultProp: d, onChange: l }), T = (0, import_react62.useRef)(null), A = !m || !!m.closest("form"), [L, R] = (0, import_react62.useState)(/* @__PURE__ */ new Set()), D = Array.from(L).map((e2) => e2.props.value).join(";");
  return (0, import_react62.createElement)($cf1ac5d9fe0e8206$export$be92b6f5f03c0fe9, h, (0, import_react62.createElement)($cc7e05a45900e73f$var$SelectProvider, { required: p, scope: t, trigger: m, onTriggerChange: g, valueNode: y, onValueNodeChange: v, valueNodeHasChildren: x, onValueNodeHasChildrenChange: b6, contentId: $1746a345f3d73bb7$export$f680877a34711e37(), value: S, onValueChange: P, open: C, onOpenChange: E, dir: w, triggerPointerDownPosRef: T, disabled: f }, (0, import_react62.createElement)($cc7e05a45900e73f$var$Collection.Provider, { scope: t }, (0, import_react62.createElement)($cc7e05a45900e73f$var$SelectNativeOptionsProvider, { scope: e.__scopeSelect, onNativeOptionAdd: (0, import_react62.useCallback)((e2) => {
    R((t2) => new Set(t2).add(e2));
  }, []), onNativeOptionRemove: (0, import_react62.useCallback)((e2) => {
    R((t2) => {
      const n2 = new Set(t2);
      return n2.delete(e2), n2;
    });
  }, []) }, n)), A ? (0, import_react62.createElement)($cc7e05a45900e73f$var$BubbleSelect, { key: D, "aria-hidden": true, required: p, tabIndex: -1, name: c2, autoComplete: u, value: S, onChange: (e2) => P(e2.target.value), disabled: f }, S === void 0 ? (0, import_react62.createElement)("option", { value: "" }) : null, Array.from(L)) : null));
};
var $cc7e05a45900e73f$var$TRIGGER_NAME = "SelectTrigger";
var $cc7e05a45900e73f$export$3ac1e88a1c0b9f1 = (0, import_react62.forwardRef)((e, t) => {
  var n = Math.round;
  const { __scopeSelect: i, disabled: r2 = false, ...o2 } = e, a = $cc7e05a45900e73f$var$usePopperScope(i), d = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$TRIGGER_NAME, i), l = d.disabled || r2, s = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, d.onTriggerChange), c2 = $cc7e05a45900e73f$var$useCollection(i), [u, f, p] = $cc7e05a45900e73f$var$useTypeaheadSearch((e2) => {
    const t2 = c2().filter((e3) => !e3.disabled), n2 = t2.find((e3) => e3.value === d.value), i2 = $cc7e05a45900e73f$var$findNextItem(t2, e2, n2);
    i2 !== void 0 && d.onValueChange(i2.value);
  }), h = () => {
    l || (d.onOpenChange(true), p());
  };
  return (0, import_react62.createElement)($cf1ac5d9fe0e8206$export$b688253958b8dfe7, _extends7({ asChild: true }, a), (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.button, _extends7({ type: "button", role: "combobox", "aria-controls": d.contentId, "aria-expanded": d.open, "aria-required": d.required, "aria-autocomplete": "none", dir: d.dir, "data-state": d.open ? "open" : "closed", disabled: l, "data-disabled": l ? "" : void 0, "data-placeholder": void 0 === d.value ? "" : void 0 }, o2, { ref: s, onClick: $e42e1063c40fb3ef$export$b9ecd428b558ff10(o2.onClick, (e2) => {
    e2.currentTarget.focus();
  }), onPointerDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(o2.onPointerDown, (e2) => {
    const t2 = e2.target;
    t2.hasPointerCapture(e2.pointerId) && t2.releasePointerCapture(e2.pointerId), 0 === e2.button && false === e2.ctrlKey && (h(), d.triggerPointerDownPosRef.current = { x: n(e2.pageX), y: n(e2.pageY) }, e2.preventDefault());
  }), onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(o2.onKeyDown, (e2) => {
    const t2 = "" !== u.current, n2 = e2.ctrlKey || e2.altKey || e2.metaKey;
    n2 || 1 !== e2.key.length || f(e2.key);
    t2 && " " === e2.key || $cc7e05a45900e73f$var$OPEN_KEYS.includes(e2.key) && (h(), e2.preventDefault());
  }) })));
});
var $cc7e05a45900e73f$var$VALUE_NAME = "SelectValue";
var $cc7e05a45900e73f$export$e288731fd71264f0 = (0, import_react62.forwardRef)((e, t) => {
  const { __scopeSelect: n, className: i, style: o2, children: r2, placeholder: a, ...d } = e, l = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$VALUE_NAME, n), { onValueNodeHasChildrenChange: s } = l, c2 = void 0 !== r2, u = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, l.onValueNodeChange);
  return $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    s(c2);
  }, [s, c2]), (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends7({}, d, { ref: u, style: { pointerEvents: "none" } }), void 0 === l.value && void 0 !== a ? a : r2);
});
var $cc7e05a45900e73f$export$99b400cabb58c515 = (0, import_react62.forwardRef)((e, t) => {
  const { __scopeSelect: n, children: i, ...o2 } = e;
  return (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends7({ "aria-hidden": true }, o2, { ref: t }), i || "\u25BC");
});
var $cc7e05a45900e73f$export$b2af6c9944296213 = (e) => (0, import_react62.createElement)($f1701beae083dbae$export$602eac185826482c, _extends7({ asChild: true }, e));
var $cc7e05a45900e73f$var$CONTENT_NAME = "SelectContent";
var $cc7e05a45900e73f$export$c973a4b3cb86a03d = (0, import_react62.forwardRef)((e, t) => {
  const n = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$CONTENT_NAME, e.__scopeSelect), [i, o2] = (0, import_react62.useState)();
  if ($9f79659886946c16$export$e5c5a5f917a5871c(() => {
    o2(new DocumentFragment());
  }, []), !n.open) {
    const t2 = i;
    return t2 ? (0, import_react_dom.createPortal)((0, import_react62.createElement)($cc7e05a45900e73f$var$SelectContentProvider, { scope: e.__scopeSelect }, (0, import_react62.createElement)($cc7e05a45900e73f$var$Collection.Slot, { scope: e.__scopeSelect }, (0, import_react62.createElement)("div", null, e.children))), t2) : null;
  }
  return (0, import_react62.createElement)($cc7e05a45900e73f$var$SelectContentImpl, _extends7({}, e, { ref: t }));
});
var $cc7e05a45900e73f$var$CONTENT_MARGIN = 10;
var [$cc7e05a45900e73f$var$SelectContentProvider, $cc7e05a45900e73f$var$useSelectContentContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$CONTENT_NAME);
var $cc7e05a45900e73f$var$SelectContentImpl = (0, import_react62.forwardRef)((e, t) => {
  var n = Math.abs, i = Math.round;
  const { __scopeSelect: o2, position: x = "item-aligned", onCloseAutoFocus: r2, onEscapeKeyDown: a, onPointerDownOutside: d, side: l, sideOffset: s, align: c2, alignOffset: u, arrowPadding: f, collisionBoundary: p, collisionPadding: h, sticky: m, hideWhenDetached: g, avoidCollisions: y, ...v } = e, b6 = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$CONTENT_NAME, o2), [w, E] = (0, import_react62.useState)(null), [C, S] = (0, import_react62.useState)(null), P = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, (e2) => E(e2)), [T, A] = (0, import_react62.useState)(null), [L, R] = (0, import_react62.useState)(null), D = $cc7e05a45900e73f$var$useCollection(o2), [N, O] = (0, import_react62.useState)(false), k = (0, import_react62.useRef)(false);
  (0, import_react62.useEffect)(() => {
    if (w)
      return hideOthers(w);
  }, [w]), $3db38b7d1fb3fe6a$export$b7ece24a22aeda8c();
  const I = (0, import_react62.useCallback)((e2) => {
    const [t2, ...n2] = D().map((e3) => e3.ref.current), [i2] = n2.slice(-1), o3 = document.activeElement;
    for (const n3 of e2) {
      if (n3 === o3)
        return;
      if (null === n3 || void 0 === n3 || n3.scrollIntoView({ block: "nearest" }), n3 === t2 && C && (C.scrollTop = 0), n3 === i2 && C && (C.scrollTop = C.scrollHeight), null === n3 || void 0 === n3 || n3.focus(), document.activeElement !== o3)
        return;
    }
  }, [D, C]), _ = (0, import_react62.useCallback)(() => I([T, w]), [I, T, w]);
  (0, import_react62.useEffect)(() => {
    N && _();
  }, [N, _]);
  const { onOpenChange: H, triggerPointerDownPosRef: W } = b6;
  (0, import_react62.useEffect)(() => {
    if (w) {
      let e2 = { x: 0, y: 0 };
      const t2 = (t3) => {
        var o4, r3, a2, d2;
        e2 = { x: n(i(t3.pageX) - (null !== (o4 = null === (r3 = W.current) || void 0 === r3 ? void 0 : r3.x) && void 0 !== o4 ? o4 : 0)), y: n(i(t3.pageY) - (null !== (a2 = null === (d2 = W.current) || void 0 === d2 ? void 0 : d2.y) && void 0 !== a2 ? a2 : 0)) };
      }, o3 = (n2) => {
        10 >= e2.x && 10 >= e2.y ? n2.preventDefault() : !w.contains(n2.target) && H(false), document.removeEventListener("pointermove", t2), W.current = null;
      };
      return null !== W.current && (document.addEventListener("pointermove", t2), document.addEventListener("pointerup", o3, { capture: true, once: true })), () => {
        document.removeEventListener("pointermove", t2), document.removeEventListener("pointerup", o3, { capture: true });
      };
    }
  }, [w, H, W]), (0, import_react62.useEffect)(() => {
    const e2 = () => H(false);
    return window.addEventListener("blur", e2), window.addEventListener("resize", e2), () => {
      window.removeEventListener("blur", e2), window.removeEventListener("resize", e2);
    };
  }, [H]);
  const [B, M] = $cc7e05a45900e73f$var$useTypeaheadSearch((e2) => {
    const t2 = D().filter((e3) => !e3.disabled), n2 = t2.find((e3) => e3.ref.current === document.activeElement), i2 = $cc7e05a45900e73f$var$findNextItem(t2, e2, n2);
    i2 && setTimeout(() => i2.ref.current.focus());
  }), F = (0, import_react62.useCallback)((e2, t2, n2) => {
    const i2 = !k.current && !n2, o3 = b6.value !== void 0 && b6.value === t2;
    (o3 || i2) && (A(e2), i2 && (k.current = true));
  }, [b6.value]), V = (0, import_react62.useCallback)(() => null === w || void 0 === w ? void 0 : w.focus(), [w]), K = (0, import_react62.useCallback)((e2, t2, n2) => {
    const i2 = !k.current && !n2, o3 = b6.value !== void 0 && b6.value === t2;
    (o3 || i2) && R(e2);
  }, [b6.value]), z = "popper" === x ? $cc7e05a45900e73f$var$SelectPopperPosition : $cc7e05a45900e73f$var$SelectItemAlignedPosition, U = z === $cc7e05a45900e73f$var$SelectPopperPosition ? { side: l, sideOffset: s, align: c2, alignOffset: u, arrowPadding: f, collisionBoundary: p, collisionPadding: h, sticky: m, hideWhenDetached: g, avoidCollisions: y } : {};
  return (0, import_react62.createElement)($cc7e05a45900e73f$var$SelectContentProvider, { scope: o2, content: w, viewport: C, onViewportChange: S, itemRefCallback: F, selectedItem: T, onItemLeave: V, itemTextRefCallback: K, focusSelectedItem: _, selectedItemText: L, position: x, isPositioned: N, searchRef: B }, (0, import_react62.createElement)(ReactRemoveScroll, { as: $5e63c961fc1ce211$export$8c6ed5c666ac1360, allowPinchZoom: true }, (0, import_react62.createElement)($d3863c46a17e8a28$export$20e40289641fbbb6, { asChild: true, trapped: b6.open, onMountAutoFocus: (e2) => {
    e2.preventDefault();
  }, onUnmountAutoFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(r2, (e2) => {
    var t2;
    null === (t2 = b6.trigger) || void 0 === t2 || t2.focus({ preventScroll: true }), e2.preventDefault();
  }) }, (0, import_react62.createElement)($5cb92bef7577960e$export$177fb62ff3ec1f22, { asChild: true, disableOutsidePointerEvents: true, onEscapeKeyDown: a, onPointerDownOutside: d, onFocusOutside: (e2) => e2.preventDefault(), onDismiss: () => b6.onOpenChange(false) }, (0, import_react62.createElement)(z, _extends7({ role: "listbox", id: b6.contentId, "data-state": b6.open ? "open" : "closed", dir: b6.dir, onContextMenu: (e2) => e2.preventDefault() }, v, U, { onPlaced: () => O(true), ref: P, style: { display: "flex", flexDirection: "column", outline: "none", ...v.style }, onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(v.onKeyDown, (e2) => {
    const t2 = e2.ctrlKey || e2.altKey || e2.metaKey;
    if ("Tab" === e2.key && e2.preventDefault(), t2 || 1 !== e2.key.length || M(e2.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(e2.key)) {
      const t3 = D().filter((e3) => !e3.disabled);
      let n2 = t3.map((e3) => e3.ref.current);
      if (["ArrowUp", "End"].includes(e2.key) && (n2 = n2.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e2.key)) {
        const t4 = e2.target, i2 = n2.indexOf(t4);
        n2 = n2.slice(i2 + 1);
      }
      setTimeout(() => I(n2)), e2.preventDefault();
    }
  }) }))))));
});
var $cc7e05a45900e73f$var$SelectItemAlignedPosition = (0, import_react62.forwardRef)((e, t) => {
  var n = Math.max;
  const { __scopeSelect: i, onPlaced: o2, ...r2 } = e, a = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$CONTENT_NAME, i), d = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$CONTENT_NAME, i), [l, s] = (0, import_react62.useState)(null), [c2, u] = (0, import_react62.useState)(null), f = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, (e2) => u(e2)), p = $cc7e05a45900e73f$var$useCollection(i), h = (0, import_react62.useRef)(false), m = (0, import_react62.useRef)(true), { viewport: g, selectedItem: y, selectedItemText: v, focusSelectedItem: x } = d, b6 = (0, import_react62.useCallback)(() => {
    if (a.trigger && a.valueNode && l && c2 && g && y && v) {
      const e2 = a.trigger.getBoundingClientRect(), t2 = c2.getBoundingClientRect(), i2 = a.valueNode.getBoundingClientRect(), r3 = v.getBoundingClientRect();
      if ("rtl" !== a.dir) {
        const o3 = r3.left - t2.left, a2 = i2.left - o3, d3 = e2.left - a2, s3 = e2.width + d3, c3 = n(s3, t2.width), u3 = window.innerWidth - $cc7e05a45900e73f$var$CONTENT_MARGIN, f3 = $ae6933e535247d3d$export$7d15b64cf5a3a4c4(a2, [$cc7e05a45900e73f$var$CONTENT_MARGIN, u3 - c3]);
        l.style.minWidth = s3 + "px", l.style.left = f3 + "px";
      } else {
        const o3 = t2.right - r3.right, a2 = window.innerWidth - i2.right - o3, d3 = window.innerWidth - e2.right - a2, s3 = e2.width + d3, c3 = n(s3, t2.width), u3 = window.innerWidth - $cc7e05a45900e73f$var$CONTENT_MARGIN, f3 = $ae6933e535247d3d$export$7d15b64cf5a3a4c4(a2, [$cc7e05a45900e73f$var$CONTENT_MARGIN, u3 - c3]);
        l.style.minWidth = s3 + "px", l.style.right = f3 + "px";
      }
      const d2 = p(), s2 = window.innerHeight - 2 * $cc7e05a45900e73f$var$CONTENT_MARGIN, u2 = g.scrollHeight, f2 = window.getComputedStyle(c2), m2 = parseInt(f2.borderTopWidth, 10), x2 = parseInt(f2.paddingTop, 10), b7 = parseInt(f2.borderBottomWidth, 10), w2 = parseInt(f2.paddingBottom, 10), E2 = m2 + x2 + u2 + w2 + b7, C2 = Math.min(5 * y.offsetHeight, E2), S = window.getComputedStyle(g), P = parseInt(S.paddingTop, 10), T = parseInt(S.paddingBottom, 10), A = e2.top + e2.height / 2 - $cc7e05a45900e73f$var$CONTENT_MARGIN, L = s2 - A, R = y.offsetHeight / 2, D = y.offsetTop + R, N = m2 + x2 + D, O = E2 - N, k = N <= A;
      if (k) {
        const e3 = y === d2[d2.length - 1].ref.current;
        l.style.bottom = "0px";
        const t3 = c2.clientHeight - g.offsetTop - g.offsetHeight, i3 = n(L, R + (e3 ? T : 0) + t3 + b7), o3 = N + i3;
        l.style.height = o3 + "px";
      } else {
        const e3 = y === d2[0].ref.current;
        l.style.top = "0px";
        const t3 = n(A, m2 + g.offsetTop + (e3 ? P : 0) + R), i3 = t3 + O;
        l.style.height = i3 + "px", g.scrollTop = N - A + g.offsetTop;
      }
      l.style.margin = `${$cc7e05a45900e73f$var$CONTENT_MARGIN}px 0`, l.style.minHeight = C2 + "px", l.style.maxHeight = s2 + "px", null === o2 || void 0 === o2 || o2(), requestAnimationFrame(() => h.current = true);
    }
  }, [p, a.trigger, a.valueNode, l, c2, g, y, v, a.dir, o2]);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => b6(), [b6]);
  const [w, E] = (0, import_react62.useState)();
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    c2 && E(window.getComputedStyle(c2).zIndex);
  }, [c2]);
  const C = (0, import_react62.useCallback)((e2) => {
    e2 && true === m.current && (b6(), null === x || void 0 === x || x(), m.current = false);
  }, [b6, x]);
  return (0, import_react62.createElement)($cc7e05a45900e73f$var$SelectViewportProvider, { scope: i, contentWrapper: l, shouldExpandOnScrollRef: h, onScrollButtonChange: C }, (0, import_react62.createElement)("div", { ref: s, style: { display: "flex", flexDirection: "column", position: "fixed", zIndex: w } }, (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends7({}, r2, { ref: f, style: { boxSizing: "border-box", maxHeight: "100%", ...r2.style } }))));
});
var $cc7e05a45900e73f$var$SelectPopperPosition = (0, import_react62.forwardRef)((e, t) => {
  const { __scopeSelect: n, align: o2 = "start", collisionPadding: r2 = $cc7e05a45900e73f$var$CONTENT_MARGIN, ...i } = e, a = $cc7e05a45900e73f$var$usePopperScope(n);
  return (0, import_react62.createElement)($cf1ac5d9fe0e8206$export$7c6e2c02157bb7d2, _extends7({}, a, i, { ref: t, align: o2, collisionPadding: r2, style: { boxSizing: "border-box", ...i.style, "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-select-content-available-width": "var(--radix-popper-available-width)", "--radix-select-content-available-height": "var(--radix-popper-available-height)", "--radix-select-trigger-width": "var(--radix-popper-anchor-width)", "--radix-select-trigger-height": "var(--radix-popper-anchor-height)" } }));
});
var [$cc7e05a45900e73f$var$SelectViewportProvider, $cc7e05a45900e73f$var$useSelectViewportContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$CONTENT_NAME, {});
var $cc7e05a45900e73f$var$VIEWPORT_NAME = "SelectViewport";
var $cc7e05a45900e73f$export$9ed6e7b40248d36d = (0, import_react62.forwardRef)((e, t) => {
  const { __scopeSelect: n, ...i } = e, o2 = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$VIEWPORT_NAME, n), r2 = $cc7e05a45900e73f$var$useSelectViewportContext($cc7e05a45900e73f$var$VIEWPORT_NAME, n), a = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, o2.onViewportChange), d = (0, import_react62.useRef)(0);
  return (0, import_react62.createElement)(import_react62.Fragment, null, (0, import_react62.createElement)("style", { dangerouslySetInnerHTML: { __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}` } }), (0, import_react62.createElement)($cc7e05a45900e73f$var$Collection.Slot, { scope: n }, (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends7({ "data-radix-select-viewport": "", role: "presentation" }, i, { ref: a, style: { position: "relative", flex: 1, overflow: "auto", ...i.style }, onScroll: $e42e1063c40fb3ef$export$b9ecd428b558ff10(i.onScroll, (e2) => {
    const t2 = e2.currentTarget, { contentWrapper: n2, shouldExpandOnScrollRef: i2 } = r2;
    if (null !== i2 && void 0 !== i2 && i2.current && n2) {
      const e3 = Math.abs(d.current - t2.scrollTop);
      if (0 < e3) {
        const i3 = window.innerHeight - 2 * $cc7e05a45900e73f$var$CONTENT_MARGIN, o3 = parseFloat(n2.style.minHeight), r3 = parseFloat(n2.style.height), a2 = Math.max(o3, r3);
        if (a2 < i3) {
          const o4 = a2 + e3, r4 = Math.min(i3, o4), d2 = o4 - r4;
          n2.style.height = r4 + "px", "0px" === n2.style.bottom && (t2.scrollTop = 0 < d2 ? d2 : 0, n2.style.justifyContent = "flex-end");
        }
      }
    }
    d.current = t2.scrollTop;
  }) }))));
});
var $cc7e05a45900e73f$var$GROUP_NAME = "SelectGroup";
var [$cc7e05a45900e73f$var$SelectGroupContextProvider, $cc7e05a45900e73f$var$useSelectGroupContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$GROUP_NAME);
var $cc7e05a45900e73f$export$ee25a334c55de1f4 = (0, import_react62.forwardRef)((e, t) => {
  const { __scopeSelect: n, ...i } = e, o2 = $1746a345f3d73bb7$export$f680877a34711e37();
  return (0, import_react62.createElement)($cc7e05a45900e73f$var$SelectGroupContextProvider, { scope: n, id: o2 }, (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends7({ role: "group", "aria-labelledby": o2 }, i, { ref: t })));
});
var $cc7e05a45900e73f$var$LABEL_NAME = "SelectLabel";
var $cc7e05a45900e73f$export$f67338d29bd972f8 = (0, import_react62.forwardRef)((e, t) => {
  const { __scopeSelect: n, ...i } = e, o2 = $cc7e05a45900e73f$var$useSelectGroupContext($cc7e05a45900e73f$var$LABEL_NAME, n);
  return (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends7({ id: o2.id }, i, { ref: t }));
});
var $cc7e05a45900e73f$var$ITEM_NAME = "SelectItem";
var [$cc7e05a45900e73f$var$SelectItemContextProvider, $cc7e05a45900e73f$var$useSelectItemContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$ITEM_NAME);
var $cc7e05a45900e73f$export$13ef48a934230896 = (0, import_react62.forwardRef)((e, t) => {
  const { __scopeSelect: n, value: i, disabled: a = false, textValue: o2, ...r2 } = e, d = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$ITEM_NAME, n), l = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$ITEM_NAME, n), s = d.value === i, [c2, u] = (0, import_react62.useState)(null !== o2 && void 0 !== o2 ? o2 : ""), [f, p] = (0, import_react62.useState)(false), h = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, (e2) => {
    var t2;
    return null === (t2 = l.itemRefCallback) || void 0 === t2 ? void 0 : t2.call(l, e2, i, a);
  }), m = $1746a345f3d73bb7$export$f680877a34711e37(), g = () => {
    a || (d.onValueChange(i), d.onOpenChange(false));
  };
  return (0, import_react62.createElement)($cc7e05a45900e73f$var$SelectItemContextProvider, { scope: n, value: i, disabled: a, textId: m, isSelected: s, onItemTextChange: (0, import_react62.useCallback)((e2) => {
    u((t2) => {
      var n2;
      return t2 || (null !== (n2 = null === e2 || void 0 === e2 ? void 0 : e2.textContent) && void 0 !== n2 ? n2 : "").trim();
    });
  }, []) }, (0, import_react62.createElement)($cc7e05a45900e73f$var$Collection.ItemSlot, { scope: n, value: i, disabled: a, textValue: c2 }, (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends7({ role: "option", "aria-labelledby": m, "data-highlighted": f ? "" : void 0, "aria-selected": s && f, "data-state": s ? "checked" : "unchecked", "aria-disabled": a || void 0, "data-disabled": a ? "" : void 0, tabIndex: a ? void 0 : -1 }, r2, { ref: h, onFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(r2.onFocus, () => p(true)), onBlur: $e42e1063c40fb3ef$export$b9ecd428b558ff10(r2.onBlur, () => p(false)), onPointerUp: $e42e1063c40fb3ef$export$b9ecd428b558ff10(r2.onPointerUp, g), onPointerMove: $e42e1063c40fb3ef$export$b9ecd428b558ff10(r2.onPointerMove, (e2) => {
    if (a) {
      var t2;
      null === (t2 = l.onItemLeave) || void 0 === t2 || t2.call(l);
    } else
      e2.currentTarget.focus({ preventScroll: true });
  }), onPointerLeave: $e42e1063c40fb3ef$export$b9ecd428b558ff10(r2.onPointerLeave, (e2) => {
    if (e2.currentTarget === document.activeElement) {
      var t2;
      null === (t2 = l.onItemLeave) || void 0 === t2 || t2.call(l);
    }
  }), onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(r2.onKeyDown, (e2) => {
    var t2;
    const n2 = "" !== (null === (t2 = l.searchRef) || void 0 === t2 ? void 0 : t2.current);
    n2 && " " === e2.key || ($cc7e05a45900e73f$var$SELECTION_KEYS.includes(e2.key) && g(), " " === e2.key && e2.preventDefault());
  }) }))));
});
var $cc7e05a45900e73f$var$ITEM_TEXT_NAME = "SelectItemText";
var $cc7e05a45900e73f$export$3572fb0fb821ff49 = (0, import_react62.forwardRef)((e, t) => {
  const { __scopeSelect: n, className: i, style: o2, ...r2 } = e, a = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$ITEM_TEXT_NAME, n), d = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$ITEM_TEXT_NAME, n), l = $cc7e05a45900e73f$var$useSelectItemContext($cc7e05a45900e73f$var$ITEM_TEXT_NAME, n), s = $cc7e05a45900e73f$var$useSelectNativeOptionsContext($cc7e05a45900e73f$var$ITEM_TEXT_NAME, n), [c2, u] = (0, import_react62.useState)(null), f = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, (e2) => u(e2), l.onItemTextChange, (e2) => {
    var t2;
    return null === (t2 = d.itemTextRefCallback) || void 0 === t2 ? void 0 : t2.call(d, e2, l.value, l.disabled);
  }), p = null === c2 || void 0 === c2 ? void 0 : c2.textContent, h = (0, import_react62.useMemo)(() => (0, import_react62.createElement)("option", { key: l.value, value: l.value, disabled: l.disabled }, p), [l.disabled, l.value, p]), { onNativeOptionAdd: m, onNativeOptionRemove: g } = s;
  return $9f79659886946c16$export$e5c5a5f917a5871c(() => (m(h), () => g(h)), [m, g, h]), (0, import_react62.createElement)(import_react62.Fragment, null, (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends7({ id: l.textId }, r2, { ref: f })), l.isSelected && a.valueNode && !a.valueNodeHasChildren ? (0, import_react_dom.createPortal)(r2.children, a.valueNode) : null);
});
var $cc7e05a45900e73f$var$SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var $cc7e05a45900e73f$export$d8117927658af6d7 = (0, import_react62.forwardRef)((e, t) => {
  const n = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$SCROLL_UP_BUTTON_NAME, e.__scopeSelect), i = $cc7e05a45900e73f$var$useSelectViewportContext($cc7e05a45900e73f$var$SCROLL_UP_BUTTON_NAME, e.__scopeSelect), [o2, r2] = (0, import_react62.useState)(false), a = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, i.onScrollButtonChange);
  return $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (n.viewport && n.isPositioned) {
      let e2 = function() {
        const e3 = 0 < t2.scrollTop;
        r2(e3);
      };
      const t2 = n.viewport;
      return e2(), t2.addEventListener("scroll", e2), () => t2.removeEventListener("scroll", e2);
    }
  }, [n.viewport, n.isPositioned]), o2 ? (0, import_react62.createElement)($cc7e05a45900e73f$var$SelectScrollButtonImpl, _extends7({}, e, { ref: a, onAutoScroll: () => {
    const { viewport: e2, selectedItem: t2 } = n;
    e2 && t2 && (e2.scrollTop -= t2.offsetHeight);
  } })) : null;
});
var $cc7e05a45900e73f$var$SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var $cc7e05a45900e73f$export$ff951e476c12189 = (0, import_react62.forwardRef)((e, t) => {
  const n = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$SCROLL_DOWN_BUTTON_NAME, e.__scopeSelect), i = $cc7e05a45900e73f$var$useSelectViewportContext($cc7e05a45900e73f$var$SCROLL_DOWN_BUTTON_NAME, e.__scopeSelect), [o2, r2] = (0, import_react62.useState)(false), a = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, i.onScrollButtonChange);
  return $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (n.viewport && n.isPositioned) {
      let e2 = function() {
        var e3 = Math.ceil;
        const n2 = t2.scrollHeight - t2.clientHeight, i2 = e3(t2.scrollTop) < n2;
        r2(i2);
      };
      const t2 = n.viewport;
      return e2(), t2.addEventListener("scroll", e2), () => t2.removeEventListener("scroll", e2);
    }
  }, [n.viewport, n.isPositioned]), o2 ? (0, import_react62.createElement)($cc7e05a45900e73f$var$SelectScrollButtonImpl, _extends7({}, e, { ref: a, onAutoScroll: () => {
    const { viewport: e2, selectedItem: t2 } = n;
    e2 && t2 && (e2.scrollTop += t2.offsetHeight);
  } })) : null;
});
var $cc7e05a45900e73f$var$SelectScrollButtonImpl = (0, import_react62.forwardRef)((e, t) => {
  const { __scopeSelect: n, onAutoScroll: i, ...o2 } = e, r2 = $cc7e05a45900e73f$var$useSelectContentContext("SelectScrollButton", n), a = (0, import_react62.useRef)(null), d = $cc7e05a45900e73f$var$useCollection(n), l = (0, import_react62.useCallback)(() => {
    null !== a.current && (window.clearInterval(a.current), a.current = null);
  }, []);
  return (0, import_react62.useEffect)(() => () => l(), [l]), $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    var e2;
    const t2 = d().find((e3) => e3.ref.current === document.activeElement);
    null === t2 || void 0 === t2 || null === (e2 = t2.ref.current) || void 0 === e2 || e2.scrollIntoView({ block: "nearest" });
  }, [d]), (0, import_react62.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends7({ "aria-hidden": true }, o2, { ref: t, style: { flexShrink: 0, ...o2.style }, onPointerMove: $e42e1063c40fb3ef$export$b9ecd428b558ff10(o2.onPointerMove, () => {
    var e2;
    null === (e2 = r2.onItemLeave) || void 0 === e2 || e2.call(r2), null === a.current && (a.current = window.setInterval(i, 50));
  }), onPointerLeave: $e42e1063c40fb3ef$export$b9ecd428b558ff10(o2.onPointerLeave, () => {
    l();
  }) }));
});
var $cc7e05a45900e73f$var$BubbleSelect = (0, import_react62.forwardRef)((e, t) => {
  const { value: n, ...i } = e, o2 = (0, import_react62.useRef)(null), r2 = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(t, o2), a = $010c2913dbd2fe3d$export$5cae361ad82dce8b(n);
  return (0, import_react62.useEffect)(() => {
    const e2 = o2.current, t2 = window.HTMLSelectElement.prototype, i2 = Object.getOwnPropertyDescriptor(t2, "value"), r3 = i2.set;
    if (a !== n && r3) {
      const t3 = new Event("change", { bubbles: true });
      r3.call(e2, n), e2.dispatchEvent(t3);
    }
  }, [a, n]), (0, import_react62.createElement)($ea1ef594cf570d83$export$439d29a4e110a164, { asChild: true }, (0, import_react62.createElement)("select", _extends7({}, i, { ref: r2, defaultValue: n })));
});
$cc7e05a45900e73f$var$BubbleSelect.displayName = "BubbleSelect";
function $cc7e05a45900e73f$var$useTypeaheadSearch(e) {
  const t = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(e), n = (0, import_react62.useRef)(""), i = (0, import_react62.useRef)(0), o2 = (0, import_react62.useCallback)((e2) => {
    const o3 = n.current + e2;
    t(o3), function t2(e3) {
      n.current = e3, window.clearTimeout(i.current), "" !== e3 && (i.current = window.setTimeout(() => t2(""), 1e3));
    }(o3);
  }, [t]), r2 = (0, import_react62.useCallback)(() => {
    n.current = "", window.clearTimeout(i.current);
  }, []);
  return (0, import_react62.useEffect)(() => () => window.clearTimeout(i.current), []), [n, o2, r2];
}
function $cc7e05a45900e73f$var$findNextItem(e, t, n) {
  const i = 1 < t.length && Array.from(t).every((e2) => e2 === t[0]), o2 = i ? t[0] : t, r2 = n ? e.indexOf(n) : -1;
  let a = $cc7e05a45900e73f$var$wrapArray(e, Math.max(r2, 0));
  const d = 1 === o2.length;
  d && (a = a.filter((e2) => e2 !== n));
  const l = a.find((e2) => e2.textValue.toLowerCase().startsWith(o2.toLowerCase()));
  return l === n ? void 0 : l;
}
function $cc7e05a45900e73f$var$wrapArray(e, t) {
  return e.map((n, i) => e[(t + i) % e.length]);
}
var $cc7e05a45900e73f$export$be92b6f5f03c0fe9 = $cc7e05a45900e73f$export$ef9b1a59e592288f;
var $cc7e05a45900e73f$export$41fb9f06171c75f4 = $cc7e05a45900e73f$export$3ac1e88a1c0b9f1;
var $cc7e05a45900e73f$export$4c8d1a57a761ef94 = $cc7e05a45900e73f$export$e288731fd71264f0;
var $cc7e05a45900e73f$export$f04a61298a47a40f = $cc7e05a45900e73f$export$99b400cabb58c515;
var $cc7e05a45900e73f$export$602eac185826482c = $cc7e05a45900e73f$export$b2af6c9944296213;
var $cc7e05a45900e73f$export$7c6e2c02157bb7d2 = $cc7e05a45900e73f$export$c973a4b3cb86a03d;
var $cc7e05a45900e73f$export$d5c6c08dc2d3ca7 = $cc7e05a45900e73f$export$9ed6e7b40248d36d;
var $cc7e05a45900e73f$export$eb2fcfdbd7ba97d4 = $cc7e05a45900e73f$export$ee25a334c55de1f4;
var $cc7e05a45900e73f$export$b04be29aa201d4f5 = $cc7e05a45900e73f$export$f67338d29bd972f8;
var $cc7e05a45900e73f$export$6d08773d2e66f8f2 = $cc7e05a45900e73f$export$13ef48a934230896;
var $cc7e05a45900e73f$export$d6e5bf9c43ea9319 = $cc7e05a45900e73f$export$3572fb0fb821ff49;
var $cc7e05a45900e73f$export$2f60d3ec9ad468f2 = $cc7e05a45900e73f$export$d8117927658af6d7;
var $cc7e05a45900e73f$export$bf1aedc3039c8d63 = $cc7e05a45900e73f$export$ff951e476c12189;

// node_modules/juno-ui-components/build/PortalProvider.component-9f9e7f3a.js
var import_react63 = __toESM(require_react());
var import_prop_types62 = __toESM(require_prop_types());
var import_react_dom2 = __toESM(require_react_dom());
var PortalContext = (0, import_react63.createContext)();
function usePortalRef() {
  const a = (0, import_react63.useContext)(PortalContext), [b6, c2] = (0, import_react63.useState)(a?.current);
  return (0, import_react63.useEffect)(() => a ? void (a.current && c2(true)) : void console.warn("usePortalRef should be called inside a PortalProvider! You are probably using a component that renders a portal, e.g. Select. Be sure that your app is wrapped in an AppShellProvider."), [a]), a?.current;
}
var Portal = ({ children: a }) => {
  const b6 = usePortalRef();
  return b6 ? (0, import_react_dom2.createPortal)(a, b6) : null;
};
Portal.propTypes = {};
var PortalProvider = ({ className: a, id: b6, children: c2 }) => {
  const d = (0, import_react63.useRef)();
  return import_react63.default.createElement(PortalContext.Provider, { value: d }, c2, import_react63.default.createElement("div", { "data-juno-portal-container": true, className: a, id: b6, ref: d }));
};
PortalProvider.Portal = Portal, Portal.displayName = "PortalProvider.Portal", PortalProvider.propTypes = { className: import_prop_types62.default.string, id: import_prop_types62.default.string }, PortalProvider.defaultProps = { className: void 0, id: void 0 };

// node_modules/juno-ui-components/build/Select.component-5280b070.js
var import_prop_types63 = __toESM(require_prop_types());
var triggerStyles = `
  jn-appearance-none
  jn-bg-theme-select
  jn-h-[2.375rem]
  jn-inline-flex
  jn-items-center
  jn-px-4
  jn-rounded-3px
  jn-select-none
  jn-text-theme-high
  jn-text-base
  focus:jn-outline-none
  focus:jn-ring-2
  focus:jn-ring-theme-focus
`;
var triggerErrorStyles = `
  jn-border
  jn-border-theme-error
`;
var triggerValidStyles = `
  jn-border
  jn-border-theme-success
`;
var contentStyles = `
  jn-rounded
  jn-bg-theme-background-lvl-1
  jn-w-[var(--radix-select-trigger-width)]
  jn-max-h-[var(--radix-select-content-available-height)]
  jn-z-[9999]
`;
var scrollButtonStyles = `
  jn-text-center
  jn-py-1
`;
var PortalWrapper = ({ withPortal: a, children: b6 }) => {
  if (a) {
    const a2 = usePortalRef();
    return import_react64.default.createElement($cc7e05a45900e73f$export$602eac185826482c, { container: a2 }, b6);
  }
  return b6;
};
var Select = import_react64.default.forwardRef(({ ariaLabel: a, children: b6, className: c2, defaultOpen: d, defaultValue: e, disabled: f, error: g, id: h, invalid: i, labelClassName: j, loading: k, name: l, onOpenChange: m, onValueChange: n, open: o2, placeholder: p, portal: q, position: r2, valid: s, value: t, variant: u, width: v, ...w }, x) => {
  const [y, z] = (0, import_react64.useState)(false), [A, B] = (0, import_react64.useState)(false), [C, D] = (0, import_react64.useState)(false), [E, F] = (0, import_react64.useState)(false), [G, H] = (0, import_react64.useState)(false);
  (0, import_react64.useEffect)(() => {
    z(o2);
  }, [o2]), (0, import_react64.useEffect)(() => {
    B(g);
  }, [g]), (0, import_react64.useEffect)(() => {
    D(i);
  }, [i]), (0, import_react64.useEffect)(() => {
    F(k);
  }, [k]), (0, import_react64.useEffect)(() => {
    H(s);
  }, [s]);
  return import_react64.default.createElement($cc7e05a45900e73f$export$be92b6f5f03c0fe9, { defaultOpen: d, disabled: f || A || E, name: l, onOpenChange: (a2) => {
    o2 === void 0 && z(!y), m && m(a2);
  }, onValueChange: n, value: t, open: o2, defaultValue: e }, import_react64.default.createElement($cc7e05a45900e73f$export$41fb9f06171c75f4, _extends({ id: h, "aria-label": a, className: `
            juno-select
            juno-select-trigger
            ${triggerStyles}
            ${"auto" == v ? "jn-w-auto" : "jn-w-full"}
            ${A || C || G || E ? "" : "juno-select-" + (u || "default")}
            ${A || C ? triggerErrorStyles : ""}
            ${A ? "juno-select-error jn-cursor-not-allowed" : ""}
            ${G ? "juno-select-valid " + triggerValidStyles : ""} 
            ${f ? "juno-select-disabled jn-opacity-50 jn-cursor-not-allowed" : ""}
            ${E || A ? "jn-justify-center" : "jn-justify-between"}
            ${E ? "juno-select-loading jn-cursor-not-allowed" : ""}
            ${C ? "juno-select-invalid" : ""}
            ${c2}
          `, ref: x }, w), E || A ? "" : import_react64.default.createElement("span", { className: `${j}` }, import_react64.default.createElement($cc7e05a45900e73f$export$4c8d1a57a761ef94, { placeholder: p })), import_react64.default.createElement($cc7e05a45900e73f$export$f04a61298a47a40f, { className: "jn-inline-flex" }, import_react64.default.createElement(() => E ? import_react64.default.createElement(Spinner, { className: "jn-mr-0" }) : A ? import_react64.default.createElement(Icon, { icon: "errorOutline", color: "jn-text-theme-error" }) : G ? import_react64.default.createElement(import_react64.default.Fragment, null, import_react64.default.createElement(Icon, { icon: "checkCircle", color: "jn-text-theme-success", className: "jn-pointer-events-none" }), y ? import_react64.default.createElement(Icon, { icon: "expandLess" }) : import_react64.default.createElement(Icon, { icon: "expandMore" })) : C ? import_react64.default.createElement(import_react64.default.Fragment, null, import_react64.default.createElement(Icon, { icon: "dangerous", color: "jn-text-theme-error", className: "jn-pointer-events-none" }), y ? import_react64.default.createElement(Icon, { icon: "expandLess" }) : import_react64.default.createElement(Icon, { icon: "expandMore" })) : y ? import_react64.default.createElement(Icon, { icon: "expandLess" }) : import_react64.default.createElement(Icon, { icon: "expandMore" }), null))), import_react64.default.createElement(PortalWrapper, { withPortal: q }, import_react64.default.createElement($cc7e05a45900e73f$export$7c6e2c02157bb7d2, { className: `juno-select-content ${contentStyles}`, position: r2, sideOffset: 2 }, import_react64.default.createElement($cc7e05a45900e73f$export$2f60d3ec9ad468f2, { className: `${scrollButtonStyles}` }, import_react64.default.createElement(Icon, { icon: "expandLess" })), import_react64.default.createElement($cc7e05a45900e73f$export$d5c6c08dc2d3ca7, null, b6), import_react64.default.createElement($cc7e05a45900e73f$export$bf1aedc3039c8d63, { className: `${scrollButtonStyles}` }, import_react64.default.createElement(Icon, { icon: "expandMore" })))));
});
Select.propTypes = { ariaLabel: import_prop_types63.default.string, className: import_prop_types63.default.string, children: import_prop_types63.default.node, defaultOpen: import_prop_types63.default.bool, disabled: import_prop_types63.default.bool, error: import_prop_types63.default.bool, id: import_prop_types63.default.string, invalid: import_prop_types63.default.bool, labelClassName: import_prop_types63.default.string, loading: import_prop_types63.default.bool, name: import_prop_types63.default.string, onOpenChange: import_prop_types63.default.func, onValueChange: import_prop_types63.default.func, open: import_prop_types63.default.bool, placeholder: import_prop_types63.default.string, portal: import_prop_types63.default.bool, position: import_prop_types63.default.oneOf(["popper", "align-items"]), valid: import_prop_types63.default.bool, defaultValue: import_prop_types63.default.string, value: import_prop_types63.default.string, variant: import_prop_types63.default.oneOf(["", "primary", "primary-danger", "default", "subdued"]), width: import_prop_types63.default.oneOf(["full", "auto"]) }, Select.defaultProps = { ariaLabel: "", className: "", children: null, defaultOpen: void 0, disabled: false, error: false, id: "", invalid: false, labelClassName: "", loading: false, name: "", onOpenChange: void 0, onValueChange: void 0, open: void 0, placeholder: "Select\u2026", portal: true, position: "popper", valid: false, defaultValue: void 0, value: void 0, width: "full", variant: void 0 };

// node_modules/juno-ui-components/build/SelectOption.component-a3ef2dde.js
var import_react65 = __toESM(require_react());
var import_prop_types64 = __toESM(require_prop_types());
var optionStyles = `
  jn-text-theme-default
  jn-flex
  jn-items-center
  jn-w-full
  jn-pt-[0.6875rem]
  jn-pb-[0.5rem]
  jn-px-[0.875rem]
  jn-cursor-pointer
  jn-select-none
  jn-bg-clip-padding
  jn-truncate
  jn-text-left
  jn-bg-theme-background-lvl-1
  focus:jn-outline-none
  focus:jn-ring-2
  focus:jn-ring-inset
  focus:jn-ring-theme-focus
  hover:jn-bg-theme-background-lvl-3
`;
var SelectOption = import_react65.default.forwardRef(({ children: a, value: b6, label: c2, disabled: d, className: e, ...f }, g) => import_react65.default.createElement($cc7e05a45900e73f$export$6d08773d2e66f8f2, _extends({ className: `juno-select-option ${optionStyles} ${d ? "jn-opacity-50 jn-cursor-not-allowed" : ""} ${e}`, ref: g, value: b6, disabled: d }, f), import_react65.default.createElement($cc7e05a45900e73f$export$d6e5bf9c43ea9319, null, a || c2 || b6)));
SelectOption.propTypes = { children: import_prop_types64.default.node, value: import_prop_types64.default.string, label: import_prop_types64.default.string, disabled: import_prop_types64.default.bool, className: import_prop_types64.default.string }, SelectOption.defaultProps = { children: null, value: "", label: "", disabled: false, className: "" };

// node_modules/juno-ui-components/build/Pagination.component-cea959c7.js
var paginationStyles = `
  jn-flex
  jn-gap-[0.375rem]
  jn-items-center
`;
var inputStyles = `
  jn-w-[3.125rem]
`;
var selectOptions = (a) => {
  let b6 = [];
  if (a)
    for (let c2 = 0; c2 < a; c2++) {
      const a2 = (c2 + 1).toString();
      b6.push(import_react66.default.createElement(SelectOption, { value: a2, label: a2, key: a2 }));
    }
  return b6;
};
var renderPaginationInnards = (a, b6, c2, d, e) => "number" === a ? import_react66.default.createElement("span", null, b6 || "0") : "select" === a ? import_react66.default.createElement(Select, { name: "pages", width: "auto", defaultValue: b6?.toString(), onValueChange: d }, selectOptions(c2)) : "input" === a ? import_react66.default.createElement("span", null, import_react66.default.createElement(TextInput, { value: b6 || "", onKeyPress: e, className: `${inputStyles}` }), import_react66.default.createElement("span", { className: "jn-ml-1" }, "of ", c2 || "0")) : null;
var Pagination = ({ variant: a, currentPage: b6, pages: c2, isFirstPage: d, isLastPage: e, onPressPrevious: f, onPressNext: g, onSelectChange: h, onKeyPress: i, className: j, ...k }) => {
  return import_react66.default.createElement("div", _extends({ className: `juno-pagination juno-pagination-${a || "default"} ${paginationStyles} ${j}` }, k), import_react66.default.createElement(Button, { icon: "chevronLeft", disabled: d, onClick: (a2) => {
    f && f(a2);
  }, title: "Previous Page" }), a ? renderPaginationInnards(a, b6, c2, (a2) => {
    h && h(a2);
  }, (a2) => {
    "Enter" === a2.key && i && i(a2);
  }) : null, import_react66.default.createElement(Button, { icon: "chevronRight", disabled: e, onClick: (a2) => {
    g && g(a2);
  }, title: "Next Page" }));
};
Pagination.propTypes = { variant: import_prop_types65.default.oneOf(["", "number", "select", "input"]), currentPage: import_prop_types65.default.number, pages: import_prop_types65.default.number, isFirstPage: import_prop_types65.default.bool, isLastPage: import_prop_types65.default.bool, onPressPrevious: import_prop_types65.default.func, onPressNext: import_prop_types65.default.func, onSelectChange: import_prop_types65.default.func, onKeyPress: import_prop_types65.default.func, className: import_prop_types65.default.string }, Pagination.defaultProps = { variant: "", currentPage: null, pages: null, isFirstPage: false, isLastPage: false, onPressPrevious: void 0, onPressNext: void 0, onSelectChange: void 0, onKeyPress: void 0, className: "" };

// node_modules/juno-ui-components/build/Pill.component-33a06f60.js
var import_react67 = __toESM(require_react());
var import_prop_types66 = __toESM(require_prop_types());
var pillStyles = `
	jn-inline-flex
	jn-basis-auto
	jn-shrink
	jn-items-center
	jn-flex-nowrap
	jn-text-xs
	jn-p-px
	jn-border
	jn-rounded
	jn-border-theme-background-lvl-4
`;
var pillKeyStyles = `
	jn-bg-theme-background-lvl-3
	jn-px-1
	jn-py-0.5
	jn-rounded-sm
	jn-inline-block
`;
var pillValueStyles = `
	jn-px-1
	jn-py-0.5
	jn-text-theme-high
	jn-inline-block
`;
var Pill = ({ uid: a, pillKey: b6, pillKeyLabel: c2, pillValue: d, pillValueLabel: e, closeable: f, onClose: g, className: h, ...i }) => {
  return import_react67.default.createElement("div", _extends({ className: `juno-pill ${pillStyles} ${h}` }, i), d || e ? import_react67.default.createElement(import_react67.default.Fragment, null, (c2 || b6) && import_react67.default.createElement("span", { className: `${pillKeyStyles}` }, c2 || b6), import_react67.default.createElement("span", { className: `${pillValueStyles}` }, e || d)) : import_react67.default.createElement("span", { className: `${pillValueStyles}` }, "set pillValue or pillValueLabel"), f && import_react67.default.createElement(Icon, { icon: "close", size: "18", onClick: () => {
    g && g(a || b6 || d);
  } }));
};
Pill.propTypes = { uid: import_prop_types66.default.string, pillKey: import_prop_types66.default.string, pillKeyLabel: import_prop_types66.default.string, pillValue: import_prop_types66.default.string.isRequired, pillValueLabel: import_prop_types66.default.string, className: import_prop_types66.default.string, closeable: import_prop_types66.default.bool, onClose: import_prop_types66.default.func }, Pill.defaultProps = { uid: "", pillKey: "", pillKeyLabel: "", pillValue: "", pillValueLabel: "", closeable: false, onClose: void 0, className: "" };

// node_modules/juno-ui-components/build/Radio.component-30134444.js
var import_react68 = __toESM(require_react());
var import_prop_types67 = __toESM(require_prop_types());
var inputstyles2 = `
	jn-w-4
	jn-h-4
	jn-opacity-0
	jn-z-50
`;
var checkedstyles = `
	jn-inline-block
	jn-absolute
	jn-bg-theme-radio-checked
	jn-rounded-full
	jn-w-3
	jn-h-3
	jn-top-0.5
	jn-left-0.5
`;
var mockradiostyles = `
	jn-w-4
	jn-h-4
	jn-rounded-full
	jn-bg-theme-radio
	jn-relative
`;
var mockfocusradiostyles = `
	jn-outline-none
	jn-ring-2
	jn-ring-theme-focus
`;
var mockdisabledradiostyles = `
	jn-opacity-50
	jn-cursor-not-allowed
`;
var errorstyles3 = `
	jn-border
	jn-border-theme-error
`;
var successstyles3 = `
	jn-border
	jn-border-theme-success
`;
var Radio = ({ name: a, id: b6, value: c2, checked: d, className: e, disabled: f, invalid: g, valid: h, onChange: i, onClick: j, ...k }) => {
  const [l, m] = (0, import_react68.useState)(false), [n, o2] = (0, import_react68.useState)(false), [p, q] = (0, import_react68.useState)(false), [r2, s] = (0, import_react68.useState)(false);
  (0, import_react68.useEffect)(() => {
    m(d);
  }, [d]), (0, import_react68.useEffect)(() => {
    q(g);
  }, [g]), (0, import_react68.useEffect)(() => {
    s(h);
  }, [h]);
  return import_react68.default.createElement("div", _extends({ className: `juno-radio ${mockradiostyles} ${n ? mockfocusradiostyles : ""} ${f ? mockdisabledradiostyles : ""} ${p ? errorstyles3 : ""} ${r2 ? successstyles3 : ""} ${e}` }, k), import_react68.default.createElement("input", { type: "radio", name: a || "unnamed radio", value: c2, id: b6, checked: l, className: `${inputstyles2} ${p ? "juno-radio-invalid" : ""} ${r2 ? "juno-radio-valid" : ""}`, disabled: f, onChange: (a2) => {
    m(!l), i && i(a2);
  }, onClick: (a2) => {
    j && j(a2);
  }, onFocus: () => {
    o2(true);
  }, onBlur: () => {
    o2(false);
  } }), l ? import_react68.default.createElement("span", { className: `${checkedstyles}` }) : "");
};
Radio.propTypes = { name: import_prop_types67.default.string, id: import_prop_types67.default.string, value: import_prop_types67.default.string, checked: import_prop_types67.default.bool, className: import_prop_types67.default.string, disabled: import_prop_types67.default.bool, invalid: import_prop_types67.default.bool, valid: import_prop_types67.default.bool, onChange: import_prop_types67.default.func, onClick: import_prop_types67.default.func }, Radio.defaultProps = { checked: false, value: "", id: "", className: "", disabled: false, invalid: false, valid: false, onChange: void 0, onClick: void 0 };

// node_modules/juno-ui-components/build/RadioGroup.component-bb81986a.js
var import_react69 = __toESM(require_react());
var import_prop_types68 = __toESM(require_prop_types());
var radiogroupstyles = `
	jn-mb-4
	last:jn-mb-0
`;
var radiogrouplabelstyles = `
	jn-inline-block
	jn-mb-1
`;
var groupstyles2 = `
	jn-relative
	jn-rounded
	jn-border
	jn-py-1
`;
var defaultgroupstyles2 = `
	jn-border-transparent
`;
var validgroupstyles2 = `
	jn-border-theme-success
	jn-px-2
`;
var invalidgroupstyles2 = `
	jn-border-theme-error
	jn-px-2
`;
var errortextstyles3 = `
	jn-text-xs
	jn-text-theme-error
	jn-mb-2
`;
var successtextstyles3 = `
	jn-text-xs
	jn-text-theme-success
	jn-mb-2
`;
var iconstyles4 = `
	jn-absolute
	jn-right-2
	jn-top-1.5
`;
var RadioGroup = ({ name: a, label: b6, selected: c2, required: d, disabled: e, valid: f, successtext: g, invalid: h, errortext: i, children: j, className: k, ...l }) => {
  const [m, n] = (0, import_react69.useState)(""), [o2, p] = (0, import_react69.useState)(false), [q, r2] = (0, import_react69.useState)(false), s = (0, import_react69.useMemo)(() => f || !!(g && g.length), [f, g]), t = (0, import_react69.useMemo)(() => h || !!(i && i.length), [h, i]);
  (0, import_react69.useEffect)(() => {
    n(c2);
  }, [c2]), (0, import_react69.useEffect)(() => {
    p(s);
  }, [s]), (0, import_react69.useEffect)(() => {
    r2(t);
  }, [t]);
  const u = (a2) => {
    n(a2.target.value);
  }, v = () => import_react69.default.Children.map(j, (b7) => {
    let c3 = false;
    return m ? c3 = m === b7.props.value : b7.props.checked && (c3 = true, n(b7.props.value)), import_react69.default.cloneElement(b7, { name: a, className: k, onChange: u, checked: c3, disabled: e });
  });
  return import_react69.default.createElement("div", _extends({ role: "radiogroup", className: `juno-radiogroup ${radiogroupstyles} ${o2 ? "juno-radiogroup-valid" : ""} ${q ? "juno-radiogroup-invalid" : ""}${k}`, onChange: v }, l), b6 ? import_react69.default.createElement(Label, { text: b6, htmlFor: a, className: `${radiogrouplabelstyles}`, required: d }) : "", i && i.length ? import_react69.default.createElement("p", { className: `${errortextstyles3}` }, i) : null, g && g.length ? import_react69.default.createElement("p", { className: `${successtextstyles3}` }, g) : null, import_react69.default.createElement("div", { className: `juno-checkbox-group-options ${groupstyles2} ${o2 ? validgroupstyles2 : ""} ${q ? invalidgroupstyles2 : ""} ${o2 || q ? "" : defaultgroupstyles2}` }, q ? import_react69.default.createElement(Icon, { icon: "dangerous", color: "jn-text-theme-error", className: `${iconstyles4}` }) : null, o2 ? import_react69.default.createElement(Icon, { icon: "checkCircle", color: "jn-text-theme-success", className: `${iconstyles4}` }) : null, v()));
};
RadioGroup.propTypes = { name: import_prop_types68.default.string.isRequired, label: import_prop_types68.default.string, selected: import_prop_types68.default.string, required: import_prop_types68.default.bool, disabled: import_prop_types68.default.bool, invalid: import_prop_types68.default.bool, errortext: import_prop_types68.default.string, valid: import_prop_types68.default.bool, successtext: import_prop_types68.default.string, className: import_prop_types68.default.string, children: import_prop_types68.default.node }, RadioGroup.defaultProps = { name: null, className: "", required: null, label: null, selected: "", disabled: false, valid: false, successtext: "", invalid: false, errortext: "", className: "" };

// node_modules/juno-ui-components/build/RadioRow.component-8078d462.js
var import_react70 = __toESM(require_react());
var import_prop_types69 = __toESM(require_prop_types());
var radiorow = `
	jn-flex
	jn-flex-row
  jn-mb-1
`;
var radiocontainerstyles = `
	jn-mt-1
	jn-mr-2
`;
var helptextstyles2 = `
	jn-text-xs
	jn-text-theme-light
	jn-mt-1
`;
var errortextstyles4 = `
  jn-text-xs
  jn-text-theme-error
  jn-mt-1
`;
var successtextstyles4 = `
  jn-text-xs
  jn-text-theme-success
  jn-mt-1
`;
var iconstyles5 = `
  jn-inline-block 
  jn-ml-1 
  jn-leading-1
  jn-mt-[-.2rem]
`;
var RadioRow = ({ value: a, name: b6, checked: c2, label: d, id: e, helptext: f, className: g, disabled: h, invalid: i, errortext: j, valid: k, successtext: l, onChange: m, ...n }) => {
  const [o2, p] = (0, import_react70.useState)(false), [q, r2] = (0, import_react70.useState)(false), [s, t] = (0, import_react70.useState)(false);
  (0, import_react70.useEffect)(() => {
    p(c2);
  }, [c2]);
  const u = (0, import_react70.useMemo)(() => i || !!(j && j.length), [i, j]), v = (0, import_react70.useMemo)(() => k || !!(l && l.length), [k, l]);
  return (0, import_react70.useEffect)(() => {
    r2(u);
  }, [u]), (0, import_react70.useEffect)(() => {
    t(v);
  }, [v]), import_react70.default.createElement("div", _extends({ className: `juno-radio-row ${radiorow} ${g}` }, n), import_react70.default.createElement("div", { className: `juno-radio-container ${radiocontainerstyles}` }, import_react70.default.createElement(Radio, { name: b6, checked: o2, onChange: m, id: e, value: a, disabled: h, invalid: q, valid: s })), import_react70.default.createElement("div", null, import_react70.default.createElement(Label, { text: d, htmlFor: e, disabled: h }), q ? import_react70.default.createElement(Icon, { icon: "dangerous", color: "jn-text-theme-error", size: "1.125rem", className: `${iconstyles5}` }) : null, s ? import_react70.default.createElement(Icon, { icon: "checkCircle", color: "jn-text-theme-success", size: "1.125rem", className: `${iconstyles5}` }) : null, j && j.length ? import_react70.default.createElement("p", { className: `${errortextstyles4}` }, j) : null, l && l.length ? import_react70.default.createElement("p", { className: `${successtextstyles4}` }, l) : null, f ? import_react70.default.createElement("p", { className: `${helptextstyles2}` }, f) : null));
};
RadioRow.propTypes = { value: import_prop_types69.default.string, checked: import_prop_types69.default.bool, name: import_prop_types69.default.string, label: import_prop_types69.default.string, id: import_prop_types69.default.string, helptext: import_prop_types69.default.node, disabled: import_prop_types69.default.bool, invalid: import_prop_types69.default.bool, errortext: import_prop_types69.default.string, valid: import_prop_types69.default.bool, successtext: import_prop_types69.default.string, className: import_prop_types69.default.string, onChange: import_prop_types69.default.func }, RadioRow.defaultProps = { value: "", checked: false, name: null, label: null, id: null, helptext: null, className: "", disabled: false, errortext: "", valid: false, successtext: "", onChange: void 0 };

// node_modules/juno-ui-components/build/SearchInput.component-83d2117c.js
var import_react71 = __toESM(require_react());
var import_prop_types70 = __toESM(require_prop_types());
var wrapperStyles3 = (a) => {
  return "rounded" === a ? `${"\n    jn-relative\n    jn-inline-block\n    jn-win-max\n  "} jn-w-auto` : "hero" === a ? `${"\n    jn-relative\n    jn-inline-block\n    jn-win-max\n  "} jn-w-full` : `${"\n    jn-relative\n    jn-inline-block\n    jn-win-max\n  "} jn-w-auto`;
};
var searchStyles = (a) => {
  const b6 = `
    jn-rounded-full 
    focus:jn-rounded-full
  `;
  return "rounded" === a ? `${"\n    jn-bg-theme-textinput\n    jn-text-theme-high\n    jn-shadow\n    focus:jn-outline-none\n    focus:jn-ring-2\n    focus:jn-ring-theme-focus\n    disabled:jn-cursor-not-allowed\n    disabled:jn-opacity-50\n  "} ${b6} jn-text-base jn-w-auto jn-pl-3 jn-pr-16 jn-py-1` : "hero" === a ? `${"\n    jn-bg-theme-textinput\n    jn-text-theme-high\n    jn-shadow\n    focus:jn-outline-none\n    focus:jn-ring-2\n    focus:jn-ring-theme-focus\n    disabled:jn-cursor-not-allowed\n    disabled:jn-opacity-50\n  "} ${b6} jn-text-lg jn-w-full jn-pl-6 jn-pr-20 jn-py-2.5` : `${"\n    jn-bg-theme-textinput\n    jn-text-theme-high\n    jn-shadow\n    focus:jn-outline-none\n    focus:jn-ring-2\n    focus:jn-ring-theme-focus\n    disabled:jn-cursor-not-allowed\n    disabled:jn-opacity-50\n  "} jn-rounded jn-text-base jn-leading-4 jn-pl-4 jn-pr-16 jn-py-2.5`;
};
var iconWrapperStyles2 = (a) => "rounded" === a ? `jn-absolute jn-inline-flex jn-right-3 jn-top-1` : "hero" === a ? `jn-absolute jn-inline-flex jn-right-5` : `jn-absolute jn-inline-flex jn-right-3 jn-top-2`;
var clearIconStyles = (a) => "rounded" === a ? `jn-mr-2` : "hero" === a ? `jn-mr-2.5` : `jn-mr-2`;
var clearIconSize = (a) => "hero" === a ? "24" : "18";
var SearchInput = ({ name: a, value: b6, placeholder: c2, clear: d, className: e, autoComplete: f, onSearch: g, onChange: h, onClick: i, onKeyPress: j, onClear: k, variant: l, disabled: m, ...n }) => {
  const [o2, p] = (0, import_react71.useState)(b6);
  (0, import_react71.useEffect)(() => {
    p(b6);
  }, [b6]);
  return import_react71.default.createElement("div", { className: `juno-search-input-wrapper ${wrapperStyles3(l)}`, role: "search" }, import_react71.default.createElement(Stack, { gap: "2", alignment: "center" }, import_react71.default.createElement("input", _extends({ type: "search", name: a || "search", placeholder: c2, disabled: m, value: o2, autoComplete: f, className: `juno-search-input ${searchStyles(l)} ${e}`, onChange: (a2) => {
    p(a2.target.value), h && h(a2);
  }, onKeyPress: (a2) => {
    "Enter" === a2.key && g && g(o2), j && j(a2);
  } }, n)), import_react71.default.createElement("div", { className: `${iconWrapperStyles2(l)}` }, d && o2.length ? import_react71.default.createElement(Icon, { icon: "close", size: `${clearIconSize(l)}`, title: "Clear", className: `${clearIconStyles(l)}`, onClick: (a2) => {
    p(""), k && k(a2);
  }, disabled: m }) : null, import_react71.default.createElement(Icon, { icon: "search", title: "Search", onClick: (a2) => {
    g && g(o2), i && i(a2);
  }, disabled: m }))));
};
SearchInput.propTypes = { name: import_prop_types70.default.string, variant: import_prop_types70.default.oneOf(["rounded", "hero", "default"]), disabled: import_prop_types70.default.bool, placeholder: import_prop_types70.default.string, value: import_prop_types70.default.string, autoComplete: import_prop_types70.default.string, clear: import_prop_types70.default.bool, className: import_prop_types70.default.string, onSearch: import_prop_types70.default.func, onClick: import_prop_types70.default.func, onChange: import_prop_types70.default.func, onKeyPress: import_prop_types70.default.func, onClear: import_prop_types70.default.func }, SearchInput.defaultProps = { value: "", variant: "default", disabled: false, clear: true, onSearch: void 0, onChange: void 0, onClick: void 0, onKeyPress: void 0, onClear: void 0, autoComplete: "off", placeholder: "Search\u2026", className: "" };

// node_modules/juno-ui-components/build/SelectDivider.component-66249bd3.js
var import_react72 = __toESM(require_react());
var import_prop_types71 = __toESM(require_prop_types());
var dividerStyles = `
  jn-h-px 
  jn-w-full
  jn-bg-theme-background-lvl-3
`;
var SelectDivider = import_react72.default.forwardRef(({ className: a, ...b6 }, c2) => import_react72.default.createElement("div", _extends({ className: `juno-select-divider ${dividerStyles} ${a}`, ref: c2 }, b6)));
SelectDivider.propTypes = { className: import_prop_types71.default.string }, SelectDivider.defaultProps = { className: "" };

// node_modules/juno-ui-components/build/SelectOptionGroup.component-55d155ef.js
var import_react73 = __toESM(require_react());
var import_prop_types72 = __toESM(require_prop_types());
var labelStyles = `
  jn-text-xs
  jn-font-bold
  jn-py-1
  jn-px-3.5
`;
var SelectOptionGroup = import_react73.default.forwardRef(({ children: a, label: b6, className: c2, ...d }, e) => import_react73.default.createElement($cc7e05a45900e73f$export$eb2fcfdbd7ba97d4, _extends({ className: `juno-select-option-group ${c2}`, ref: e }, d), b6 ? import_react73.default.createElement($cc7e05a45900e73f$export$b04be29aa201d4f5, { className: `juno-select-group-label ${labelStyles}` }, b6) : "", a));
SelectOptionGroup.propTypes = { label: import_prop_types72.default.string, children: import_prop_types72.default.node, className: import_prop_types72.default.string }, SelectOptionGroup.defaultProps = { children: null, label: "", className: "" };

// node_modules/juno-ui-components/build/SelectRow.component-0ea18e44.js
var import_react74 = __toESM(require_react());
var import_prop_types73 = __toESM(require_prop_types());
var selectrow = `
	jn-flex
	jn-flex-col
	jn-mb-2
`;
var helptextstyles3 = `
	jn-text-xs
	jn-text-theme-light
	jn-mt-1
`;
var selectstyles2 = `
	jn-w-full
`;
var floatingcontainerstyles = `
  jn-relative
`;
var floatinglabelcontainerstyles = `
  jn-absolute
  jn-top-0.5
  jn-left-4
  jn-transform 
  jn-origin-top-left 
  jn-scale-75
  jn-opacity-75
`;
var errortextstyles5 = `
  jn-text-xs
  jn-text-theme-error
  jn-mt-1
`;
var successtextstyles5 = `
  jn-text-xs
  jn-text-theme-success
  jn-mt-1
`;
var SelectRow = ({ name: a, variant: b6, label: c2, id: d, helptext: e, required: f, className: g, disabled: h, invalid: i, errortext: j, valid: k, placeholder: l, successtext: m, children: n, value: o2, onValueChange: p, onChange: q, onOpenChange: r2, defaultValue: s, open: t, error: u, loading: v, ...w }) => {
  const [x, y] = (0, import_react74.useState)(false), [z, A] = (0, import_react74.useState)(false), [B, C] = (0, import_react74.useState)(false), [D, E] = (0, import_react74.useState)(false), [F, G] = (0, import_react74.useState)(false);
  (0, import_react74.useEffect)(() => {
    y(t);
  }, [t]), (0, import_react74.useEffect)(() => {
    A(u);
  }, [u]), (0, import_react74.useEffect)(() => {
    G(v);
  }, [v]);
  const H = (0, import_react74.useMemo)(() => i || !!(j && j.length), [i, j]), I = (0, import_react74.useMemo)(() => k || !!(m && m.length), [k, m]);
  (0, import_react74.useEffect)(() => {
    C(H);
  }, [H]), (0, import_react74.useEffect)(() => {
    E(I);
  }, [I]);
  const J = import_react74.default.createElement("div", { className: `juno-label-container ${"floating" === b6 ? floatinglabelcontainerstyles : ""}` }, import_react74.default.createElement(Label, { text: c2, htmlFor: d, required: f, disabled: h }));
  return import_react74.default.createElement("div", _extends({ className: `juno-select-row juno-select-row-${b6} ${selectrow} ${"floating" === b6 ? floatingcontainerstyles : ""} ${g}` }, w), "floating" === b6 ? null : J, import_react74.default.createElement("div", null, import_react74.default.createElement(Select, { className: `${selectstyles2}`, labelClassName: "floating" === b6 ? "jn-pt-[0.8125rem]" : "", name: a, id: d, placeholder: l, onValueChange: p || q, onOpenChange: r2, disabled: h, invalid: B, valid: D, value: o2, defaultValue: s, open: x, error: z, loading: F }, n), "floating" === b6 ? J : null, j && j.length ? import_react74.default.createElement("p", { className: `${errortextstyles5}` }, j) : null, m && m.length ? import_react74.default.createElement("p", { className: `${successtextstyles5}` }, m) : null, e ? import_react74.default.createElement("p", { className: `${helptextstyles3}` }, e) : ""));
};
SelectRow.propTypes = { name: import_prop_types73.default.string, variant: import_prop_types73.default.oneOf(["floating", "stacked"]), label: import_prop_types73.default.string, placeholder: import_prop_types73.default.string, id: import_prop_types73.default.string, helptext: import_prop_types73.default.node, required: import_prop_types73.default.bool, className: import_prop_types73.default.string, disabled: import_prop_types73.default.bool, invalid: import_prop_types73.default.bool, errortext: import_prop_types73.default.string, children: import_prop_types73.default.node, value: import_prop_types73.default.string, onValueChange: import_prop_types73.default.func, onChange: import_prop_types73.default.func, onOpenChange: import_prop_types73.default.func, defaultValue: import_prop_types73.default.string, open: import_prop_types73.default.bool, error: import_prop_types73.default.bool, loading: import_prop_types73.default.bool }, SelectRow.defaultProps = { name: null, variant: "floating", label: null, placeholder: "Select\u2026", id: null, required: null, className: "", helptext: null, disabled: null, invalid: false, errortext: "", value: void 0, onValueChange: void 0, onChange: void 0, onOpenChange: void 0, defaultValue: void 0, open: void 0, error: void 0, loading: void 0 };

// node_modules/juno-ui-components/build/ShadowRoot.component-dbd7ac26.js
var import_react_dom3 = __toESM(require_react_dom());
var import_react75 = __toESM(require_react());
var import_prop_types74 = __toESM(require_prop_types());
var ShadowRoot2 = ({ mode: a, delegatesFocus: b6, children: c2 }) => {
  const d = (0, import_react75.useRef)(), [e, f] = (0, import_react75.useState)();
  return import_react75.default.useEffect(() => {
    d.current && f(d.current.attachShadow({ delegatesFocus: b6, mode: a }));
  }, []), import_react75.default.createElement("div", { ref: d, "data-shadow-host": "true", style: { height: "100%" } }, e && import_react_dom3.default.createPortal(c2, e));
};
ShadowRoot2.propTypes = { mode: import_prop_types74.default.oneOf(["open", "closed"]), delegatesFocus: import_prop_types74.default.bool }, ShadowRoot2.defaultProps = { mode: "open", delegatesFocus: false };

// node_modules/juno-ui-components/build/SideNavigation.component-7bbea526.js
var import_react76 = __toESM(require_react());
var import_prop_types75 = __toESM(require_prop_types());
var SideNavigation = ({ children: a, className: b6, ...c2 }) => import_react76.default.createElement(Stack, _extends({ direction: "vertical", className: `juno-sidenavigation ${b6}`, role: "navigation" }, c2), a);
SideNavigation.propTypes = { children: import_prop_types75.default.node, className: import_prop_types75.default.string }, SideNavigation.defaultProps = { children: null, className: "" };

// node_modules/juno-ui-components/build/SideNavigationItem.component-ee67aaf4.js
var import_react77 = __toESM(require_react());
var import_prop_types76 = __toESM(require_prop_types());
var SideNavigationItem = ({ icon: a, label: b6, ariaLabel: c2, href: d, active: e, onClick: f, children: g, className: h, ...i }) => {
  const j = a ? import_react77.default.createElement(Icon, { icon: a, size: "18", color: "jn-text-theme-default", className: b6 && b6.length ? "jn-mr-1" : "" }) : null, k = b6 || g, l = import_react77.default.createElement("a", _extends({ className: `juno-sidenavigation-item ${e ? "juno-sidenavigation-item-active" : ""} ${h}`, href: d, "aria-label": c2 }, i), j, k), m = import_react77.default.createElement("button", _extends({ className: `juno-sidenavigation-item ${e ? "juno-sidenavigation-item-active" : ""} ${h}`, onClick: (a2) => {
    f && f(a2);
  }, "aria-label": c2 }, i), j, k), n = import_react77.default.createElement("div", _extends({ className: `juno-sidenavigation-item ${e ? "juno-sidenavigation-item-active" : ""} ${h}`, "aria-label": c2 }, i), j, b6 || g);
  return d ? l : f ? m : n;
};
SideNavigationItem.propTypes = { icon: import_prop_types76.default.oneOf(knownIcons), label: import_prop_types76.default.string, children: import_prop_types76.default.node, className: import_prop_types76.default.string, ariaLabel: import_prop_types76.default.string, href: import_prop_types76.default.string, active: import_prop_types76.default.bool, onClick: import_prop_types76.default.func }, SideNavigationItem.defaultProps = { icon: null, label: "", children: null, className: "", ariaLabel: "", href: "", active: false, onClick: void 0 };

// node_modules/juno-ui-components/build/StyleProvider.component-551d74f4.js
var import_react78 = __toESM(require_react());
var import_prop_types77 = __toESM(require_prop_types());
function withOpacity(r2) {
  return ({ opacityVariable: o2, opacityValue: t }) => void 0 === t ? void 0 === o2 ? `rgb(var(${r2}))` : `rgba(var(${r2}), var(${o2}, 1))` : `rgba(var(${r2}), ${t})`;
}
var tailwind_config = { content: ["./src/components/**/*.{js,jsx,ts,tsx}", "./src/dummyComponents/*.{js,jsx,ts,tsx}"], prefix: "jn-", theme: { fontFamily: { sans: ['"IBM Plex Sans"', "ui-sans-serif", "Arial", "system-ui", "sans-serif"], condensed: ['"IBM Plex Sans Condensed"', "ui-sans-serif", "Arial", "system-ui", "sans-serif"], serif: ['"IBM Plex Serif"', "ui-serif", "serif"], mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"] }, colors: { current: "currentColor", "juno-grey-blue": { 1: withOpacity("--color-juno-grey-blue-1-raw"), 2: withOpacity("--color-juno-grey-blue-2-raw"), 3: withOpacity("--color-juno-grey-blue-3-raw"), 4: withOpacity("--color-juno-grey-blue-4-raw"), 5: withOpacity("--color-juno-grey-blue-5-raw"), 6: withOpacity("--color-juno-grey-blue-6-raw"), 7: withOpacity("--color-juno-grey-blue-7-raw"), 8: withOpacity("--color-juno-grey-blue-8-raw"), 9: withOpacity("--color-juno-grey-blue-9-raw"), 10: withOpacity("--color-juno-grey-blue-10-raw"), 11: withOpacity("--color-juno-grey-blue-11-raw"), DEFAULT: withOpacity("--color-juno-grey-blue-11-raw") }, "juno-blue": { 1: withOpacity("--color-juno-blue-1-raw"), 2: withOpacity("--color-juno-blue-2-raw"), 3: withOpacity("--color-juno-blue-3-raw"), 4: withOpacity("--color-juno-blue-4-raw"), 5: withOpacity("--color-juno-blue-5-raw"), 6: withOpacity("--color-juno-blue-6-raw"), 7: withOpacity("--color-juno-blue-7-raw"), 8: withOpacity("--color-juno-blue-8-raw"), 9: withOpacity("--color-juno-blue-9-raw"), 10: withOpacity("--color-juno-blue-10-raw"), DEFAULT: withOpacity("--color-juno-blue-5-raw") }, "juno-turquoise": { 1: withOpacity("--color-juno-turquoise-1-raw"), 2: withOpacity("--color-juno-turquoise-2-raw"), 3: withOpacity("--color-juno-turquoise-3-raw"), 4: withOpacity("--color-juno-turquoise-4-raw"), 5: withOpacity("--color-juno-turquoise-5-raw"), 6: withOpacity("--color-juno-turquoise-6-raw"), 7: withOpacity("--color-juno-turquoise-7-raw"), 8: withOpacity("--color-juno-turquoise-8-raw"), 9: withOpacity("--color-juno-turquoise-9-raw"), 10: withOpacity("--color-juno-turquoise-10-raw"), DEFAULT: withOpacity("--color-juno-turquoise-5-raw") }, "juno-grey-light": { 1: withOpacity("--color-juno-grey-light-1-raw"), 2: withOpacity("--color-juno-grey-light-2-raw"), 3: withOpacity("--color-juno-grey-light-3-raw"), 4: withOpacity("--color-juno-grey-light-4-raw"), 5: withOpacity("--color-juno-grey-light-5-raw"), 6: withOpacity("--color-juno-grey-light-6-raw"), 7: withOpacity("--color-juno-grey-light-7-raw"), 8: withOpacity("--color-juno-grey-light-8-raw"), 9: withOpacity("--color-juno-grey-light-9-raw"), 10: withOpacity("--color-juno-grey-light-10-raw"), 11: withOpacity("--color-juno-grey-light-11-raw"), DEFAULT: withOpacity("--color-juno-grey-light-1-raw") }, "sap-grey": { 1: withOpacity("--color-sap-grey-1-raw"), 2: withOpacity("--color-sap-grey-2-raw"), 3: withOpacity("--color-sap-grey-3-raw"), 4: withOpacity("--color-sap-grey-4-raw"), 5: withOpacity("--color-sap-grey-5-raw"), 6: withOpacity("--color-sap-grey-6-raw"), 7: withOpacity("--color-sap-grey-7-raw"), 8: withOpacity("--color-sap-grey-8-raw"), DEFAULT: withOpacity("--color-sap-grey-8-raw") }, "sap-blue": { 1: withOpacity("--color-sap-blue-1-raw"), 2: withOpacity("--color-sap-blue-2-raw"), 3: withOpacity("--color-sap-blue-3-raw"), 4: withOpacity("--color-sap-blue-4-raw"), 5: withOpacity("--color-sap-blue-5-raw"), 6: withOpacity("--color-sap-blue-6-raw"), 7: withOpacity("--color-sap-blue-7-raw"), DEFAULT: withOpacity("--color-sap-blue-5-raw") }, "sap-gold": { 1: withOpacity("--color-sap-gold-1-raw"), 2: withOpacity("--color-sap-gold-2-raw"), 3: withOpacity("--color-sap-gold-3-raw"), 4: withOpacity("--color-sap-gold-4-raw"), 5: withOpacity("--color-sap-gold-5-raw"), 6: withOpacity("--color-sap-gold-6-raw"), 7: withOpacity("--color-sap-gold-7-raw"), DEFAULT: withOpacity("--color-sap-gold-5-raw") }, "sap-purple": { 1: withOpacity("--color-sap-purple-1-raw"), 2: withOpacity("--color-sap-purple-2-raw"), 3: withOpacity("--color-sap-purple-3-raw"), 4: withOpacity("--color-sap-purple-4-raw"), 5: withOpacity("--color-sap-purple-5-raw"), 6: withOpacity("--color-sap-purple-6-raw"), 7: withOpacity("--color-sap-purple-7-raw"), DEFAULT: withOpacity("--color-sap-purple-5-raw") }, "sap-green": { 1: withOpacity("--color-sap-green-1-raw"), 2: withOpacity("--color-sap-green-2-raw"), 3: withOpacity("--color-sap-green-3-raw"), 4: withOpacity("--color-sap-green-4-raw"), 5: withOpacity("--color-sap-green-5-raw"), 6: withOpacity("--color-sap-green-6-raw"), 7: withOpacity("--color-sap-green-7-raw"), DEFAULT: withOpacity("--color-sap-green-5-raw") }, "sap-red": { 1: withOpacity("--color-sap-red-1-raw"), 2: withOpacity("--color-sap-red-2-raw"), 3: withOpacity("--color-sap-red-3-raw"), 4: withOpacity("--color-sap-red-4-raw"), 5: withOpacity("--color-sap-red-5-raw"), 6: withOpacity("--color-sap-red-6-raw"), 7: withOpacity("--color-sap-red-7-raw"), 8: withOpacity("--color-sap-red-8-raw"), DEFAULT: withOpacity("--color-sap-red-5-raw") }, white: withOpacity("--color-white-raw"), black: withOpacity("--color-black-raw"), transparent: "transparent", theme: { accent: withOpacity("--color-accent-raw"), danger: withOpacity("--color-danger-raw"), error: withOpacity("--color-error-raw"), info: withOpacity("--color-info-raw"), success: withOpacity("--color-success-raw"), warning: withOpacity("--color-warning-raw"), focus: withOpacity("--color-focus-raw"), "background-lvl-0": withOpacity("--color-background-lvl-0-raw"), "background-lvl-1": withOpacity("--color-background-lvl-1-raw"), "background-lvl-2": withOpacity("--color-background-lvl-2-raw"), "background-lvl-3": withOpacity("--color-background-lvl-3-raw"), "background-lvl-4": withOpacity("--color-background-lvl-4-raw") } }, extend: { backgroundColor: { theme: { "global-bg": withOpacity("--color-global-bg-raw"), "badge-default": "var(--color-badge-default-bg)", "box-default": "var(--color-box-bg)", "code-block": withOpacity("--color-codeblock-bg"), "content-area-bg": withOpacity("--color-content-area-bg-raw"), panel: "var(--color-panel-bg)", textinput: withOpacity("--color-textinput-bg"), select: withOpacity("--color-select-bg"), checkbox: withOpacity("--color-checkbox-bg"), radio: withOpacity("--color-radio-bg"), "radio-checked": withOpacity("--color-radio-checked-bg"), "switch-handle": withOpacity("--color-switch-handle-bg"), "switch-handle-checked": withOpacity("--color-switch-handle-checked-bg"), required: withOpacity("--color-required-bg"), introbox: withOpacity("--color-introbox-bg"), "datagridrow-selected": withOpacity("--color-datagridrow-selected"), "datalistrow-selected": withOpacity("--color-datalistrow-selected"), "message-border-danger": withOpacity("--color-message-danger-border"), "message-border-default": withOpacity("--color-message-default-border"), "message-border-error": withOpacity("--color-message-error-border"), "message-border-warning": withOpacity("--color-message-warning-border"), "message-border-success": withOpacity("--color-message-success-border"), "tab-navigation-top": withOpacity("--color-tabnavigation-top-bg"), filters: withOpacity("--color-filters-bg"), "filter-input": withOpacity("--color-filter-input-bg"), "filter-input-textinput": withOpacity("--color-filter-input-textinput-bg"), "filter-pill-key": withOpacity("--color-filter-pill-key-bg"), "modal-backdrop": "var(--color-modal-backdrop-bg)" } }, backgroundImage: { "theme-message-default": "var(--gradient-message-default-bg)", "theme-message-success": "var(--gradient-message-success-bg)", "theme-message-warning": "var(--gradient-message-warning-bg)", "theme-message-danger": "var(--gradient-message-danger-bg)", "theme-message-error": "var(--gradient-message-error-bg)" }, textColor: { theme: { high: withOpacity("--color-text-high-raw"), default: withOpacity("--color-text-default-raw"), light: withOpacity("--color-text-light-raw"), disabled: withOpacity("--color-text-disabled-raw"), link: withOpacity("--color-text-link-raw"), "on-danger": withOpacity("--color-button-danger-text"), "on-default": withOpacity("--color-button-default-text"), textinput: withOpacity("--color-textinput-text"), "checkbox-checked": withOpacity("--color-checkbox-checked-color") } }, borderColor: { theme: { default: withOpacity("--color-default-border"), "codeblock-bar": withOpacity("--color-codeblock-bar-border"), "codeblock-tab-active": withOpacity("--color-text-default-raw"), "message-default": withOpacity("--color-message-default-border"), "message-danger": withOpacity("--color-message-danger-border"), "message-error": withOpacity("--color-message-error-border"), "message-warning": withOpacity("--color-message-warning-border"), "message-success": withOpacity("--color-message-success-border"), panel: withOpacity("--color-panel-border-raw"), "switch-default": withOpacity("--color-switch-default-border"), "switch-hover": withOpacity("--color-switch-hover-border"), "datalist-row": withOpacity("--color-datalist-row-border"), introbox: withOpacity("--color-introbox-border"), "tab-navigation-content-bottom": withOpacity("--color-tabnavigation-content-bottom-border"), "tab-active-bottom": withOpacity("--color-text-default-raw"), "filter-input": withOpacity("--color-filter-input-border"), "filter-pill": withOpacity("--color-filter-pill-border"), "box-default": "var(--color-box-border)" } }, padding: { xs: "0.25rem", sm: "0.5rem", md: "1rem", lg: "1.5rem", "grid-column": "0 .5rem" }, height: { textinput: "2.375rem", floatinglabelinput: "3rem", "switch-default": "1.4375rem", "switch-handle-default": "1.1875rem" }, ringOffsetColor: { theme: { focus: withOpacity("--color-global-bg-raw") } }, width: { "switch-default": "2.625rem", "switch-handle-default": "1.1875rem", "grid-column-default": "var(--grid-column-default-width)", "grid-col-1": "8.333333%", "grid-col-2": "16.666667%", "grid-col-3": "25%", "grid-col-4": "33.333333%", "grid-col-5": "41.666667%", "grid-col-6": "50%", "grid-col-7": "58.333333%", "grid-col-8": "66.666667%", "grid-col-9": "75%", "grid-col-10": "83.333333%", "grid-col-11": "91.666667%", "grid-col-12": "100%" }, borderRadius: { "3px": "3px" }, margin: { "grid-row": "0 var(--grid-row-margin-x)" }, flex: { "grid-column": "var(--grid-column-flex-grow) var(--grid-column-flex-shrink) var(--grid-column-flex-basis)" } }, borderWidth: { DEFAULT: "1px", 0: "0", 2: "2px", 3: "3px", 4: "4px", 6: "6px" } }, plugins: [] };
var CSS_FONTS_URL = "https://assets.juno.qa-de-1.cloud.sap/assets/fonts/plex/css/ibm-plex.min.css";
var STYLE_ID = "juno-style-provider-golbal-fonts";
var Fonts = ({ inline: r2 }) => ((0, import_react78.useInsertionEffect)(() => {
  if (!document.querySelector(`[id="${STYLE_ID}"]`)) {
    const r3 = document.createElement("link");
    r3.rel = "preconnect", r3.href = "https://fonts.googleapis.com";
    const o2 = document.createElement("link");
    o2.rel = "preconnect", o2.href = "https://fonts.gstatic.com", o2.crossOrigin = "anonymous";
    const t = document.createElement("link");
    t.rel = "stylesheet", t.href = CSS_FONTS_URL, t.setAttribute("id", STYLE_ID), document.head.appendChild(r3), document.head.appendChild(o2), document.head.appendChild(t);
  }
}, []), r2 ? import_react78.default.createElement("style", { [`data-${STYLE_ID}`]: "" }, `@import url("${CSS_FONTS_URL}");`) : null);
var styles = "/*\n! tailwindcss v3.3.1 | MIT License | https://tailwindcss.com\n*//*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: currentColor; /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n5. Use the user's configured `sans` font-feature-settings by default.\n6. Use the user's configured `sans` font-variation-settings by default.\n*/\n\nhtml {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: \"IBM Plex Sans\", ui-sans-serif, Arial, system-ui, sans-serif; /* 4 */\n  font-feature-settings: normal; /* 5 */\n  font-variation-settings: normal; /* 6 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: \"IBM Plex Mono\", ui-monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n[hidden] {\n  display: none;\n}\n  html,\n  body,\n  .juno-app-body {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    font-family: \"IBM Plex Sans\", ui-sans-serif, Arial, system-ui, sans-serif;\n    font-size: 1rem;\n    line-height: 1.5rem;\n    height: 100%;\n  }\n  .theme-dark,\n  .theme-light {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-global-bg-raw), var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-text-default-raw), var(--tw-text-opacity));\n}\n  a {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-text-link-raw), var(--tw-text-opacity));\n}\n\n*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n} /* Colors */\n:root,\n:host {\n  --color-sap-grey-1: rgb(255, 255, 255);\n  --color-sap-grey-2: rgb(234, 234, 234);\n  --color-sap-grey-3: rgb(198, 198, 198);\n  --color-sap-grey-4: rgb(150, 150, 150);\n  --color-sap-grey-5: rgb(114, 114, 114);\n  --color-sap-grey-6: rgb(60, 60, 60);\n  --color-sap-grey-7: rgb(34, 34, 34);\n  --color-sap-grey-8: rgb(0, 0, 0);\n  --color-sap-grey-1-raw: 255, 255, 255;\n  --color-sap-grey-2-raw: 234, 234, 234;\n  --color-sap-grey-3-raw: 198, 198, 198;\n  --color-sap-grey-4-raw: 150, 150, 150;\n  --color-sap-grey-5-raw: 114, 114, 114;\n  --color-sap-grey-6-raw: 60, 60, 60;\n  --color-sap-grey-7-raw: 34, 34, 34;\n  --color-sap-grey-8-raw: 0, 0, 0;\n  --color-white: rgb(255, 255, 255);\n  --color-white-raw: 255, 255, 255;\n  --color-black: rgb(0, 0, 0);\n  --color-black-raw: 0, 0, 0;\n  --color-sap-blue-1: rgb(203, 232, 247);\n  --color-sap-blue-2: rgb(165, 211, 234);\n  --color-sap-blue-3: rgb(137, 201, 232);\n  --color-sap-blue-4: rgb(67, 162, 208);\n  --color-sap-blue-5: rgb(0, 125, 184);\n  --color-sap-blue-6: rgb(0, 103, 153);\n  --color-sap-blue-7: rgb(0, 81, 120);\n  --color-sap-blue-1-raw: 203, 232, 247;\n  --color-sap-blue-2-raw: 165, 211, 234;\n  --color-sap-blue-3-raw: 137, 201, 232;\n  --color-sap-blue-4-raw: 67, 162, 208;\n  --color-sap-blue-5-raw: 0, 125, 184;\n  --color-sap-blue-6-raw: 0, 103, 153;\n  --color-sap-blue-7-raw: 0, 81, 120;\n  --color-sap-gold-1: rgb(251, 232, 188);\n  --color-sap-gold-2: rgb(248, 219, 150);\n  --color-sap-gold-3: rgb(246, 204, 108);\n  --color-sap-gold-4: rgb(243, 188, 58);\n  --color-sap-gold-5: rgb(240, 171, 0);\n  --color-sap-gold-6: rgb(217, 151, 0);\n  --color-sap-gold-7: rgb(150, 105, 0);\n  --color-sap-gold-1-raw: 251, 232, 188;\n  --color-sap-gold-2-raw: 248, 219, 150;\n  --color-sap-gold-3-raw: 246, 204, 108;\n  --color-sap-gold-4-raw: 243, 188, 58;\n  --color-sap-gold-5-raw: 240, 171, 0;\n  --color-sap-gold-6-raw: 217, 151, 0;\n  --color-sap-gold-7-raw: 150, 105, 0;\n  --color-sap-purple-1: rgb(235, 209, 232);\n  --color-sap-purple-2: rgb(223, 181, 218);\n  --color-sap-purple-3: rgb(209, 147, 201);\n  --color-sap-purple-4: rgb(190, 102, 178);\n  --color-sap-purple-5: rgb(151, 10, 130);\n  --color-sap-purple-6: rgb(118, 7, 103);\n  --color-sap-purple-7: rgb(97, 6, 85);\n  --color-sap-purple-1-raw: 235, 209, 232;\n  --color-sap-purple-2-raw: 223, 181, 218;\n  --color-sap-purple-3-raw: 209, 147, 201;\n  --color-sap-purple-4-raw: 190, 102, 178;\n  --color-sap-purple-5-raw: 151, 10, 130;\n  --color-sap-purple-6-raw: 118, 7, 103;\n  --color-sap-purple-7-raw: 97, 6, 85;\n  --color-sap-green-1: rgb(201, 238, 207);\n  --color-sap-green-2: rgb(169, 228, 179);\n  --color-sap-green-3: rgb(132, 216, 146);\n  --color-sap-green-4: rgb(87, 202, 106);\n  --color-sap-green-5: rgb(79, 184, 28);\n  --color-sap-green-6: rgb(22, 145, 42);\n  --color-sap-green-7: rgb(18, 120, 35);\n  --color-sap-green-1-raw: 201, 238, 207;\n  --color-sap-green-2-raw: 169, 228, 179;\n  --color-sap-green-3-raw: 132, 216, 146;\n  --color-sap-green-4-raw: 87, 202, 106;\n  --color-sap-green-5-raw: 79, 184, 28;\n  --color-sap-green-6-raw: 22, 145, 42 ;\n  --color-sap-green-7-raw: 18, 120, 35;\n  --color-sap-red-1: rgb(244, 215, 204);\n  --color-sap-red-2: rgb(238, 191, 174);\n  --color-sap-red-3: rgb(231, 163, 137);\n  --color-sap-red-4: rgb(222, 126, 91);\n  --color-sap-red-5: rgb(208, 69, 18);\n  --color-sap-red-6: rgb(187, 62, 16);\n  --color-sap-red-7: rgb(164, 54, 14);\n  --color-sap-red-8: rgb(124, 37, 4);\n  --color-sap-red-1-raw: 244, 215, 204;\n  --color-sap-red-2-raw: 238, 191, 174;\n  --color-sap-red-3-raw: 231, 163, 137;\n  --color-sap-red-4-raw: 222, 126, 91;\n  --color-sap-red-5-raw: 208, 69, 18;\n  --color-sap-red-6-raw: 187, 62, 16;\n  --color-sap-red-7-raw: 164, 54, 14;\n  --color-sap-red-8-raw: 124, 37, 4;\n  --color-juno-grey-blue-11: rgb(0, 8, 16);\n  --color-juno-grey-blue-10: rgb(13, 20, 28);\n  --color-juno-grey-blue-9: rgb(18, 25, 32);\n  --color-juno-grey-blue-8: rgb(23, 30, 37);\n  --color-juno-grey-blue-7: rgb(28, 35, 42);\n  --color-juno-grey-blue-6: rgb(31, 38, 45);\n  --color-juno-grey-blue-5: rgb(36, 42, 49);\n  --color-juno-grey-blue-4: rgb(38, 44, 51);\n  --color-juno-grey-blue-3: rgb(41, 47, 54);\n  --color-juno-grey-blue-2: rgb(48, 54, 60);\n  --color-juno-grey-blue-1: rgb(64, 70, 75);\n  --color-juno-grey-blue-11-raw: 0, 8, 16;\n  --color-juno-grey-blue-10-raw: 13, 20, 28;\n  --color-juno-grey-blue-9-raw: 18, 25, 32;\n  --color-juno-grey-blue-8-raw: 23, 30, 37;\n  --color-juno-grey-blue-7-raw: 28, 35, 42;\n  --color-juno-grey-blue-6-raw: 31, 38, 45;\n  --color-juno-grey-blue-5-raw: 36, 42, 49;\n  --color-juno-grey-blue-4-raw: 38, 44, 51;\n  --color-juno-grey-blue-3-raw: 41, 47, 54;\n  --color-juno-grey-blue-2-raw: 48, 54, 60;\n  --color-juno-grey-blue-1-raw: 64, 70, 75;\n  --color-juno-grey-light-1: rgb(249, 249, 249);\n  --color-juno-grey-light-2: rgb(247, 247, 247);\n  --color-juno-grey-light-3: rgb(244, 244, 244);\n  --color-juno-grey-light-4: rgb(241, 241, 241);\n  --color-juno-grey-light-5: rgb(238, 238, 238);\n  --color-juno-grey-light-6: rgb(235, 235, 235);\n  --color-juno-grey-light-7: rgb(233, 233, 233);\n  --color-juno-grey-light-8: rgb(230, 230, 230);\n  --color-juno-grey-light-9: rgb(227, 227, 227);\n  --color-juno-grey-light-10: rgb(215, 215, 215);\n  --color-juno-grey-light-1-raw: 249, 249, 249;\n  --color-juno-grey-light-2-raw: 247, 247, 247;\n  --color-juno-grey-light-3-raw: 244, 244, 244;\n  --color-juno-grey-light-4-raw: 241, 241, 241;\n  --color-juno-grey-light-5-raw: 238, 238, 238;\n  --color-juno-grey-light-6-raw: 235, 235, 235;\n  --color-juno-grey-light-7-raw: 233, 233, 233;\n  --color-juno-grey-light-8-raw: 230, 230, 230;\n  --color-juno-grey-light-9-raw: 227, 227, 227;\n  --color-juno-grey-light-10-raw: 215, 215, 215;\n  --color-juno-blue-10: rgb(3, 55, 84);\n  --color-juno-blue-9: rgb(5, 70, 105);\n  --color-juno-blue-8: rgb(7, 85, 128);\n  --color-juno-blue-7: var(--color-sap-blue-7);\n  --color-juno-blue-6: var(--color-sap-blue-6);\n  --color-juno-blue-5: var(--color-sap-blue-5);\n  --color-juno-blue-4: var(--color-sap-blue-4);\n  --color-juno-blue-3: var(--color-sap-blue-3);\n  --color-juno-blue-2: var(--color-sap-blue-2);\n  --color-juno-blue-1: var(--color-sap-blue-1);\n  --color-juno-blue-10-raw: 3, 55, 84;\n  --color-juno-blue-9-raw: 5, 70, 105;\n  --color-juno-blue-8-raw: 7, 85, 128;\n  --color-juno-blue-7-raw: var(--color-sap-blue-7-raw);\n  --color-juno-blue-6-raw: var(--color-sap-blue-6-raw);\n  --color-juno-blue-5-raw: var(--color-sap-blue-5-raw);\n  --color-juno-blue-4-raw: var(--color-sap-blue-4-raw);\n  --color-juno-blue-3-raw: var(--color-sap-blue-3-raw);\n  --color-juno-blue-2-raw: var(--color-sap-blue-2-raw);\n  --color-juno-blue-1-raw: var(--color-sap-blue-1-raw);\n  --color-juno-turquoise-1: rgb(197, 247, 255);\n  --color-juno-turquoise-2: rgb(132, 241, 255);\n  --color-juno-turquoise-3: rgb(25, 232, 250);\n  --color-juno-turquoise-4: rgb(22, 217, 234);\n  --color-juno-turquoise-5: rgb(21, 208, 224);\n  --color-juno-turquoise-6: rgb(15, 167, 180);\n  --color-juno-turquoise-7: rgb(9, 133, 144);\n  --color-juno-turquoise-8: rgb(5, 100, 109);\n  --color-juno-turquoise-9: rgb(2, 69, 75);\n  --color-juno-turquoise-10: rgb(1, 41, 45);\n  --color-juno-turquoise-1-raw: 197, 247, 255;\n  --color-juno-turquoise-2-raw: 132, 241, 255;\n  --color-juno-turquoise-3-raw: 25, 232, 250;\n  --color-juno-turquoise-4-raw: 22, 217, 234;\n  --color-juno-turquoise-5-raw: 21, 208, 224;\n  --color-juno-turquoise-6-raw: 15, 167, 180;\n  --color-juno-turquoise-7-raw: 9, 133, 144;\n  --color-juno-turquoise-8-raw: 5, 100, 109;\n  --color-juno-turquoise-9-raw: 2, 69, 75;\n  --color-juno-turquoise-10-raw: 1, 41, 45;\n}\n\n.theme-dark {\n  --color-juno-text-high: rgb(222, 223, 224);\n  --color-juno-text-default: rgb(187, 187, 187);\n  --color-juno-text-light: rgb(122, 122, 122);\n  --color-juno-text-disabled: rgb(92, 92, 92);\n  --color-juno-text-high-raw: 222, 223, 224;\n  --color-juno-text-default-raw: 187, 187, 187;\n  --color-juno-text-light-raw: 122, 122, 122;\n  --color-juno-text-disabled-raw: 92, 92, 92;\n  --color-info: var(--color-juno-turquoise-5);\n  --color-success: rgb(59, 255, 91);\n  --color-warning: rgb(255, 198, 0);\n  --color-danger: rgb(255, 65, 11);\n  --color-error: rgb(255, 65, 11);\n  --color-info-raw: var(--color-juno-turquoise-5-raw);\n  --color-success-raw: 59, 255, 91;\n  --color-warning-raw: 255, 198, 0;\n  --color-danger-raw: 255, 65, 11;\n  --color-error-raw: 255, 65, 11;\n}\n\n.theme-light {\n  --color-juno-text-high: rgb(0, 0, 0);\n  --color-juno-text-default: rgb(76, 76, 76);\n  --color-juno-text-light: rgb(150, 150, 150);\n  --color-juno-text-disabled: rgb(183, 183, 183);\n  --color-juno-text-high-raw: 0, 0, 0;\n  --color-juno-text-default-raw: 76, 76, 76;\n  --color-juno-text-light-raw: 150, 150, 150;\n  --color-juno-text-disabled-raw: 183, 183, 183;\n  --color-info: var(--color-juno-blue-5);\n  --color-success: rgb(22, 145, 43);\n  --color-warning: rgb(255, 205, 0);\n  --color-danger: rgb(187, 62, 15);\n  --color-error: rgb(187, 62, 15);\n  --color-info-raw: var(--color-juno-blue-4-raw);\n  --color-success-raw: 22, 145, 43;\n  --color-warning-raw: 255, 205, 0;\n  --color-danger-raw: 187, 62, 15;\n  --color-error-raw: 187, 62, 15;\n}\n\n/* ----- LIGHT THEME ----- */\n.theme-light {\n  --color-background-lvl-0: var(--color-white);\n  --color-background-lvl-1: var(--color-juno-grey-light-1);\n  --color-background-lvl-2: var(--color-juno-grey-light-3);\n  --color-background-lvl-3: var(--color-juno-grey-light-4);\n  --color-background-lvl-4: var(--color-juno-grey-light-10);\n  --color-background-lvl-0-raw: var(--color-white-raw);\n  --color-background-lvl-1-raw: var(--color-juno-grey-light-1-raw);\n  --color-background-lvl-2-raw: var(--color-juno-grey-light-3-raw);\n  --color-background-lvl-3-raw: var(--color-juno-grey-light-4-raw);\n  --color-background-lvl-4-raw: var(--color-juno-grey-light-10-raw);\n  --color-global-bg: var(--color-juno-grey-light-1);\n  --color-global-bg-raw: var(--color-juno-grey-light-1-raw);\n  --color-global-text: var(--color-juno-text-default-raw);\n  --color-content-area-bg: var(--color-background-lvl-0);\n  --color-content-area-bg-raw: var(--color-background-lvl-0-raw);\n  --color-accent: var(--color-juno-blue-5);\n  --color-accent-raw: var(--color-juno-blue-5-raw);\n  --color-focus: var(--color-accent);\n  --color-focus-raw: var(--color-accent-raw);\n  --color-text-high: var(--color-juno-text-high);\n  --color-text-default: var(--color-juno-text-default);\n  --color-text-light: var(--color-juno-text-light);\n  --color-text-disabled: var(--color-juno-text-disabled);\n  --color-text-link: var(--color-accent);\n  --color-text-high-raw: var(--color-juno-text-high-raw);\n  --color-text-default-raw: var(--color-juno-text-default-raw);\n  --color-text-light-raw: var(--color-juno-text-light-raw);\n  --color-text-disabled-raw: var(--color-juno-text-disabled-raw);\n  --color-text-link-raw: var(--color-accent-raw);\n  --color-badge-default-bg: var(--color-juno-grey-light-3);\n  --color-button-primary-text: var(--color-white);\n  --color-button-primary-bg: var(--color-juno-blue-7);\n  --color-button-primary-hover-bg: var(--color-juno-blue-5);\n  --color-button-primary-hover-text: var(--color-white);\n  --color-button-primary-active-bg: var(--color-juno-blue-8);\n  --color-button-primary-active-text: var(--color-white);\n  --color-button-default-text: var(--color-text-high);\n  --color-button-default-bg: var(--color-background-lvl-4);\n  --color-button-default-border: var(--color-background-lvl-4);\n  --color-button-default-hover-text: var(--color-text-high);\n  --color-button-default-hover-bg: var(--color-background-lvl-3);\n  --color-button-default-hover-border: var(--color-background-lvl-3);\n  --color-button-default-active-text: var(--color-text-high);\n  --color-button-default-active-bg: var(--color-background-lvl-2);\n  --color-button-default-active-border: var(--color-background-lvl-4);\n  --color-button-subdued-text: var(--color-text-default);\n  --color-button-subdued-icon: var(--color-text-default);\n  --color-button-subdued-bg: var(--color-background-lvl-3);\n  --color-button-subdued-border: var(--color-background-lvl-4);\n  --color-button-subdued-hover-text: var(--color-text-default);\n  --color-button-subdued-hover-bg: var(--color-background-lvl-1);\n  --color-button-subdued-hover-border: var(--color-background-lvl-4);\n  --color-button-subdued-active-text: var(--color-text-default);\n  --color-button-subdued-active-bg: var(--color-background-lvl-0);\n  --color-button-subdued-active-border: var(--color-background-lvl-4);\n  --color-button-primary-danger-text: var(--color-white);\n  --color-button-primary-danger-bg: var(--color-sap-red-7);\n  --color-button-primary-danger-hover-text: var(--color-white);\n  --color-button-primary-danger-hover-bg: var(--color-sap-red-6);\n  --color-button-primary-danger-active-text: var(--color-white);\n  --color-button-primary-danger-active-bg: var(--color-sap-red-8);\n  --color-icon-danger: var(--color-sap-red-raw);\n  --color-icon-info: var(--color-accent-raw);\n  --color-icon-success: var(--color-sap-green-raw);\n  --color-icon-warning: var(--color-warning-raw);\n  --color-message-danger-border: var(--color-danger-raw);\n  --gradient-message-danger-bg: linear-gradient(\n    90deg,\n    rgb(255, 231, 224) 0%,\n    rgb(255, 180, 158) 100%\n  );\n  --color-message-default-border: var(--color-info-raw);\n  --gradient-message-default-bg: linear-gradient(\n    90deg,\n    rgb(229, 244, 248) 0%,\n    rgb(46, 168, 196) 100%\n  );\n  --color-message-error-border: var(--color-error-raw);\n  --gradient-message-error-bg: linear-gradient(\n    90deg,\n    rgb(255, 231, 224) 0%,\n    rgb(255, 180, 158) 100%\n  );\n  --color-message-warning-border: var(--color-warning-raw);\n  --gradient-message-warning-bg: linear-gradient(\n    90deg,\n    rgb(253, 245, 226) 0%,\n    rgb(255, 231, 147) 100%\n  );\n  --color-message-success-border: var(--color-success-raw);\n  --gradient-message-success-bg: linear-gradient(\n    90deg,\n    rgb(230, 247, 233) 0%,\n    rgb(170, 229, 180) 100%\n  );\n  --color-introbox-bg: var(--color-background-lvl-2-raw);\n  --color-introbox-border: var(--color-accent-raw);\n  --color-textinput-bg: var(--color-background-lvl-3-raw);\n  --color-textinput-text: var(--color-juno-text-high-raw);\n  --color-textinput-placeholder-text: var(--color-juno-text-high-raw);\n  --color-textinput-focus-border: var(--color-accent-raw);\n  --color-select-bg: var(--color-background-lvl-3-raw);\n  --color-checkbox-bg: var(--color-background-lvl-4-raw);\n  --color-checkbox-checked-color: var(--color-accent-raw);\n  --color-radio-bg: var(--color-background-lvl-4-raw);\n  --color-radio-checked-bg: var(--color-accent-raw);\n  --color-switch-default-border: var(--color-juno-text-default-raw);\n  --color-switch-handle-bg: var(--color-juno-text-default-raw);\n  --color-switch-handle-checked-bg: var(--color-accent-raw);\n  --color-required-bg: var(--color-accent-raw);\n  --color-spinner-primary: var(--color-accent-raw);\n  --color-syntax-highlight-base00: var(--color-codeblock-bg);\n  --color-syntax-highlight-base01: var(--color-juno-grey-light-3);\n  --color-syntax-highlight-base02: var(--color-sap-grey-3);\n  --color-syntax-highlight-base03: var(--color-sap-grey-3);\n  --color-syntax-highlight-base04: var(--color-sap-grey-3);\n  --color-syntax-highlight-base05: var(--color-juno-text-high);\n  --color-syntax-highlight-base06: red;\n  --color-syntax-highlight-base07: var(--color-juno-text-high);\n  --color-syntax-highlight-base08: var(--color-juno-grey-blue-6);\n  --color-syntax-highlight-base09: var(--color-juno-blue-4);\n  --color-syntax-highlight-base0A: var(--color-juno-grey-blue-6);\n  --color-syntax-highlight-base0B: var(--color-juno-blue-4);\n  --color-syntax-highlight-base0C: var(--color-sap-gold-5);\n  --color-syntax-highlight-base0D: var(--color-sap-gold-5);\n  --color-syntax-highlight-base0E: var(--color-juno-blue-4);\n  --color-syntax-highlight-base0F: var(--color-juno-blue-4);\n  --color-datagridrow-selected: var(--color-accent-raw);\n  --color-datalist-row-border: var(--color-background-lvl-1-raw);\n  --color-datalistrow-selected: var(--color-accent-raw);\n  --color-codeblock-bg: var(--color-background-lvl-2-raw);\n  --color-codeblock-bar-border: var(--color-background-lvl-4-raw);\n  --color-panel-bg: rgba(252, 252, 252, 0.8);\n  --color-panel-border-raw: var(--color-juno-white-raw);\n  --color-tabnavigation-top-bg: var(--color-juno-grey-light-5-raw);\n  --color-tabnavigation-content-bottom-border: var(--color-background-lvl-4-raw);\n  --color-filters-bg: var(--color-background-lvl-1-raw);\n  --color-filter-input-bg: var(--color-background-lvl-0-raw);\n  --color-filter-input-border: var(--color-background-lvl-4-raw);\n  --color-filter-input-textinput-bg: transparent;\n  --color-filter-pill-border: var(--color-background-lvl-4-raw);\n  --color-filter-pill-key-bg: var(--color-background-lvl-3-raw);\n  --color-modal-backdrop-bg: rgba(0, 0, 0, 0.2);\n  --color-navigation-active: var(--color-black);\n  --color-box-bg: var(--color-background-lvl-1);\n  --color-box-border: var(--color-background-lvl-3) ;\n}\n\n/* ----- LIGHT THEME END -----*/\n/* ----- DARK THEME ----- */\n.theme-dark {\n  --color-background-lvl-0: var(--color-juno-grey-blue-7);\n  --color-background-lvl-1: var(--color-juno-grey-blue-5);\n  --color-background-lvl-2: var(--color-juno-grey-blue-3);\n  --color-background-lvl-3: var(--color-juno-grey-blue-2);\n  --color-background-lvl-4: var(--color-juno-grey-blue-1);\n  --color-background-lvl-0-raw: var(--color-juno-grey-blue-7-raw);\n  --color-background-lvl-1-raw: var(--color-juno-grey-blue-5-raw);\n  --color-background-lvl-2-raw: var(--color-juno-grey-blue-3-raw);\n  --color-background-lvl-3-raw: var(--color-juno-grey-blue-2-raw);\n  --color-background-lvl-4-raw: var(--color-juno-grey-blue-1-raw);\n  --color-global-bg: var(--color-juno-grey-blue-10);\n  --color-global-bg-raw: var(--color-juno-grey-blue-10-raw);\n  --color-global-text: var(--color-juno-text-default-raw);\n  --color-content-area-bg: var(--color-background-lvl-0);\n  --color-content-area-bg-raw: var(--color-background-lvl-0-raw);\n  --color-accent: var(--color-juno-turquoise-5);\n  --color-accent-raw: var(--color-juno-turquoise-5-raw);\n  --color-focus: var(--color-accent);\n  --color-focus-raw: var(--color-accent-raw);\n  --color-focus-border: var(--color-accent-raw);\n  --color-text-high: var(--color-juno-text-high);\n  --color-text-default: var(--color-juno-text-default);\n  --color-text-light: var(--color-juno-text-light);\n  --color-text-disabled: var(--color-juno-text-disabled);\n  --color-text-link: var(--color-accent);\n  --color-text-high-raw: var(--color-juno-text-high-raw);\n  --color-text-default-raw: var(--color-juno-text-default-raw);\n  --color-text-light-raw: var(--color-juno-text-light-raw);\n  --color-text-disabled-raw: var(--color-juno-text-disabled-raw);\n  --color-text-link-raw: var(--color-accent-raw);\n  --color-badge-default-bg: var(--color-juno-grey-blue-3);\n  --color-button-primary-bg: var(--color-juno-turquoise-7);\n  --color-button-primary-text: var(--color-white);\n  --color-button-primary-hover-bg: var(--color-juno-turquoise-5);\n  --color-button-primary-hover-text: var(--color-white);\n  --color-button-primary-active-bg: var(--color-juno-turquoise-9);\n  --color-button-primary-active-text: var(--color-white);\n  --color-button-default-text: var(--color-text-high);\n  --color-button-default-icon: var(--color-text-high);\n  --color-button-default-bg: var(--color-background-lvl-4);\n  --color-button-default-border: var(--color-background-lvl-4);\n  --color-button-default-hover-text: var(--color-text-high);\n  --color-button-default-hover-bg: var(--color-background-lvl-3);\n  --color-button-default-hover-border: var(--color-background-lvl-3);\n  --color-button-default-active-text: var(--color-text-high);\n  --color-button-default-active-bg: var(--color-background-lvl-2);\n  --color-button-default-active-border: var(--color-background-lvl-4);\n  --color-button-subdued-text: var(--color-text-default);\n  --color-button-subdued-icon: var(--color-text-default);\n  --color-button-subdued-bg: var(--color-background-lvl-3);\n  --color-button-subdued-border: var(--color-background-lvl-4);\n  --color-button-subdued-hover-text: var(--color-text-default);\n  --color-button-subdued-hover-bg: var(--color-background-lvl-2);\n  --color-button-subdued-hover-border: var(--color-background-lvl-4);\n  --color-button-subdued-active-text: var(--color-text-default);\n  --color-button-subdued-active-bg: var(--color-background-lvl-0);\n  --color-button-subdued-active-border: var(--color-background-lvl-4);\n  --color-button-primary-danger-text: var(--color-white);\n  --color-button-primary-danger-bg: var(--color-sap-red-6);\n  --color-button-primary-danger-hover-text: var(--color-white);\n  --color-button-primary-danger-hover-bg: var(--color-sap-red-5);\n  --color-button-primary-danger-active-text: var(--color-white);\n  --color-button-primary-danger-active-bg: var(--color-sap-red-7);\n  --color-icon-danger: var(--color-sap-red-5-raw);\n  --color-icon-info: var(--color-accent-raw);\n  --color-icon-success: var(--color-sap-green-5-raw);\n  --color-icon-warning: var(--color-warning-raw);\n  --color-message-danger-border: var(--color-danger-raw);\n  --gradient-message-danger-bg: linear-gradient(\n    90deg,\n    rgb(57, 39, 38) 0%,\n    rgb(124, 48, 30) 100%\n  );\n  --color-message-default-border: var(--color-info-raw);\n  --gradient-message-default-bg: linear-gradient(\n    90deg,\n    rgb(28, 57, 65) 0%,\n    rgb(25, 108, 119) 100%\n  );\n  --color-message-error-border: var(--color-error-raw);\n  --gradient-message-error-bg: linear-gradient(\n    90deg,\n    rgb(57, 39, 38) 0%,\n    rgb(124, 48, 30) 100%\n  );\n  --color-message-warning-border: var(--color-warning-raw);\n  --gradient-message-warning-bg: linear-gradient(\n    90deg,\n    rgb(57, 56, 36) 0%,\n    rgb(124, 104, 24) 100%\n  );\n  --color-message-success-border: var(--color-success-raw);\n  --gradient-message-success-bg: linear-gradient(\n    90deg,\n    rgb(32, 55, 46) 0%,\n    rgb(39, 102, 57) 100%\n  );\n  --color-introbox-bg: var(--color-background-lvl-2-raw);\n  --color-introbox-border: var(--color-accent-raw);\n  --color-textinput-bg: var(--color-background-lvl-3-raw);\n  --color-textinput-text: var(--color-juno-text-high-raw);\n  --color-textinput-placeholder-text: var(--color-juno-text-high-raw);\n  --color-textinput-focus-border: var(--color-accent-raw);\n  --color-select-bg: var(--color-background-lvl-3-raw);\n  --color-checkbox-bg: var(--color-background-lvl-4-raw);\n  --color-checkbox-checked-color: var(--color-accent-raw);\n  --color-radio-bg: var(--color-background-lvl-4-raw);\n  --color-radio-checked-bg: var(--color-accent-raw);\n  --color-switch-default-border: var(--color-juno-text-high-raw);\n  --color-switch-handle-bg: var(--color-juno-text-high-raw);\n  --color-switch-handle-checked-bg: var(--color-accent-raw);\n  --color-switch-hover-border: var(--color-accent-raw);\n  --color-required-bg: var(--color-accent-raw);\n  --color-spinner-primary: var(--color-accent-raw);\n  --color-syntax-highlight-base00: var(--color-codeblock-bg);\n  --color-syntax-highlight-base01: var(--color-juno-grey-blue-3);\n  --color-syntax-highlight-base02: #bbb;\n  --color-syntax-highlight-base03: var(--color-sap-grey-3);\n  --color-syntax-highlight-base04: var(--color-sap-grey-3);\n  --color-syntax-highlight-base05: #dedfe0;\n  --color-syntax-highlight-base06: red;\n  --color-syntax-highlight-base07: #dedfe0;\n  --color-syntax-highlight-base08: var(--color-juno-grey-blue-6);\n  --color-syntax-highlight-base09: var(--color-juno-blue-4);\n  --color-syntax-highlight-base0A: var(--color-juno-grey-blue-6);\n  --color-syntax-highlight-base0B: var(--color-juno-blue-4);\n  --color-syntax-highlight-base0C: var(--color-sap-gold-4);\n  --color-syntax-highlight-base0D: var(--color-sap-gold-4);\n  --color-syntax-highlight-base0E: var(--color-juno-blue-4);\n  --color-syntax-highlight-base0F: var(--color-juno-blue-4);\n  --color-datagridrow-selected: var(--color-accent-raw);\n  --color-datalist-row-border: var(--color-background-lvl-1-raw);\n  --color-datalistrow-selected: var(--color-accent-raw);\n  --color-codeblock-bg: var(--color-background-lvl-2-raw);\n  --color-codeblock-bar-border: var(--color-background-lvl-4-raw);\n  --color-panel-bg: rgba(var(--color-juno-grey-blue-11-raw), 0.6);\n  --color-panel-border-raw: var(--color-juno-grey-blue-11-raw);\n  --color-tabnavigation-top-bg: var(--color-juno-grey-blue-8-raw);\n  --color-tabnavigation-content-bottom-border: var(--color-background-lvl-4-raw);\n  --color-filters-bg: var(--color-background-lvl-1-raw);\n  --color-filter-input-bg: var(--color-background-lvl-0-raw);\n  --color-filter-input-border: var(--color-background-lvl-4-raw);\n  --color-filter-input-textinput-bg: transparent;\n  --color-filter-pill-border: var(--color-background-lvl-4-raw);\n  --color-filter-pill-key-bg: var(--color-background-lvl-4-raw);\n  --color-modal-backdrop-bg: rgba(60, 70, 75, 0.6);\n  --color-navigation-active: var(--color-white);\n  --color-box-bg: var(--color-background-lvl-1);\n  --color-box-border: var(--color-background-lvl-3) ;\n}\n\n/* ----- DARK THEME END ----- */\n:root,\n:host {\n  --grid-columns: 12;\n  --grid-row-margin-x: -0.5rem;\n  --grid-column-flex-grow: 0;\n  --grid-column-flex-shrink: 1;\n  --grid-column-flex-basis: auto;\n  --grid-column-default-width: 8.333333%;\n}\n.jn-pointer-events-none {\n  pointer-events: none;\n}\n.jn-invisible {\n  visibility: hidden;\n}\n.jn-fixed {\n  position: fixed;\n}\n.jn-absolute {\n  position: absolute;\n}\n.jn-relative {\n  position: relative;\n}\n.jn-sticky {\n  position: sticky;\n}\n.jn-inset-0 {\n  inset: 0px;\n}\n.jn-inset-y-0 {\n  top: 0px;\n  bottom: 0px;\n}\n.jn-bottom-0 {\n  bottom: 0px;\n}\n.jn-left-0 {\n  left: 0px;\n}\n.jn-left-0\\.5 {\n  left: 0.125rem;\n}\n.jn-left-1 {\n  left: 0.25rem;\n}\n.jn-left-4 {\n  left: 1rem;\n}\n.jn-left-\\[1px\\] {\n  left: 1px;\n}\n.jn-right-0 {\n  right: 0px;\n}\n.jn-right-2 {\n  right: 0.5rem;\n}\n.jn-right-3 {\n  right: 0.75rem;\n}\n.jn-right-5 {\n  right: 1.25rem;\n}\n.jn-right-\\[1px\\] {\n  right: 1px;\n}\n.jn-top-0 {\n  top: 0px;\n}\n.jn-top-0\\.5 {\n  top: 0.125rem;\n}\n.jn-top-1 {\n  top: 0.25rem;\n}\n.jn-top-1\\.5 {\n  top: 0.375rem;\n}\n.jn-top-2 {\n  top: 0.5rem;\n}\n.jn-top-\\[\\.4rem\\] {\n  top: .4rem;\n}\n.jn-top-\\[1px\\] {\n  top: 1px;\n}\n.jn-z-10 {\n  z-index: 10;\n}\n.jn-z-50 {\n  z-index: 50;\n}\n.jn-z-\\[9999\\] {\n  z-index: 9999;\n}\n.jn-z-\\[999\\] {\n  z-index: 999;\n}\n.jn-m-auto {\n  margin: auto;\n}\n.jn-m-grid-row {\n  margin: 0 var(--grid-row-margin-x);\n}\n.jn-mx-4 {\n  margin-left: 1rem;\n  margin-right: 1rem;\n}\n.jn-my-6 {\n  margin-top: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n.jn-mb-1 {\n  margin-bottom: 0.25rem;\n}\n.jn-mb-1\\.5 {\n  margin-bottom: 0.375rem;\n}\n.jn-mb-2 {\n  margin-bottom: 0.5rem;\n}\n.jn-mb-4 {\n  margin-bottom: 1rem;\n}\n.jn-mb-8 {\n  margin-bottom: 2rem;\n}\n.jn-mb-px {\n  margin-bottom: 1px;\n}\n.jn-ml-1 {\n  margin-left: 0.25rem;\n}\n.jn-ml-2 {\n  margin-left: 0.5rem;\n}\n.jn-ml-7 {\n  margin-left: 1.75rem;\n}\n.jn-ml-8 {\n  margin-left: 2rem;\n}\n.jn-ml-auto {\n  margin-left: auto;\n}\n.jn-mr-0 {\n  margin-right: 0px;\n}\n.jn-mr-1 {\n  margin-right: 0.25rem;\n}\n.jn-mr-1\\.5 {\n  margin-right: 0.375rem;\n}\n.jn-mr-2 {\n  margin-right: 0.5rem;\n}\n.jn-mr-2\\.5 {\n  margin-right: 0.625rem;\n}\n.jn-mr-3 {\n  margin-right: 0.75rem;\n}\n.jn-mr-4 {\n  margin-right: 1rem;\n}\n.jn-mr-6 {\n  margin-right: 1.5rem;\n}\n.jn-mr-auto {\n  margin-right: auto;\n}\n.jn-mt-1 {\n  margin-top: 0.25rem;\n}\n.jn-mt-2 {\n  margin-top: 0.5rem;\n}\n.jn-mt-\\[-\\.2rem\\] {\n  margin-top: -.2rem;\n}\n.jn-mt-\\[-0\\.25rem\\] {\n  margin-top: -0.25rem;\n}\n.jn-inline-block {\n  display: inline-block;\n}\n.jn-flex {\n  display: flex;\n}\n.jn-inline-flex {\n  display: inline-flex;\n}\n.jn-grid {\n  display: grid;\n}\n.jn-contents {\n  display: contents;\n}\n.jn-h-0 {\n  height: 0px;\n}\n.jn-h-0\\.5 {\n  height: 0.125rem;\n}\n.jn-h-1 {\n  height: 0.25rem;\n}\n.jn-h-24 {\n  height: 6rem;\n}\n.jn-h-3 {\n  height: 0.75rem;\n}\n.jn-h-4 {\n  height: 1rem;\n}\n.jn-h-5 {\n  height: 1.25rem;\n}\n.jn-h-6 {\n  height: 1.5rem;\n}\n.jn-h-80 {\n  height: 20rem;\n}\n.jn-h-\\[0\\.75rem\\] {\n  height: 0.75rem;\n}\n.jn-h-\\[1\\.4375rem\\] {\n  height: 1.4375rem;\n}\n.jn-h-\\[1\\.6875rem\\] {\n  height: 1.6875rem;\n}\n.jn-h-\\[14rem\\] {\n  height: 14rem;\n}\n.jn-h-\\[150px\\] {\n  height: 150px;\n}\n.jn-h-\\[2\\.375rem\\] {\n  height: 2.375rem;\n}\n.jn-h-\\[2\\.625rem\\] {\n  height: 2.625rem;\n}\n.jn-h-\\[250px\\] {\n  height: 250px;\n}\n.jn-h-\\[3\\.4375rem\\] {\n  height: 3.4375rem;\n}\n.jn-h-full {\n  height: 100%;\n}\n.jn-h-px {\n  height: 1px;\n}\n.jn-h-switch-default {\n  height: 1.4375rem;\n}\n.jn-h-switch-handle-default {\n  height: 1.1875rem;\n}\n.jn-h-textinput {\n  height: 2.375rem;\n}\n.jn-max-h-64 {\n  max-height: 16rem;\n}\n.jn-max-h-\\[32rem\\] {\n  max-height: 32rem;\n}\n.jn-max-h-\\[56rem\\] {\n  max-height: 56rem;\n}\n.jn-max-h-\\[90\\%\\] {\n  max-height: 90%;\n}\n.jn-max-h-\\[var\\(--radix-select-content-available-height\\)\\] {\n  max-height: var(--radix-select-content-available-height);\n}\n.jn-min-h-\\[3\\.25rem\\] {\n  min-height: 3.25rem;\n}\n.jn-min-h-\\[5rem\\] {\n  min-height: 5rem;\n}\n.jn-min-h-\\[8rem\\] {\n  min-height: 8rem;\n}\n.jn-w-1 {\n  width: 0.25rem;\n}\n.jn-w-2 {\n  width: 0.5rem;\n}\n.jn-w-3 {\n  width: 0.75rem;\n}\n.jn-w-4 {\n  width: 1rem;\n}\n.jn-w-5 {\n  width: 1.25rem;\n}\n.jn-w-\\[0\\.75rem\\] {\n  width: 0.75rem;\n}\n.jn-w-\\[1\\.4375rem\\] {\n  width: 1.4375rem;\n}\n.jn-w-\\[1\\.75rem\\] {\n  width: 1.75rem;\n}\n.jn-w-\\[11\\.25rem\\] {\n  width: 11.25rem;\n}\n.jn-w-\\[3\\.125rem\\] {\n  width: 3.125rem;\n}\n.jn-w-\\[33\\.625rem\\] {\n  width: 33.625rem;\n}\n.jn-w-\\[40rem\\] {\n  width: 40rem;\n}\n.jn-w-\\[4px\\] {\n  width: 4px;\n}\n.jn-w-\\[50\\%\\] {\n  width: 50%;\n}\n.jn-w-\\[80\\%\\] {\n  width: 80%;\n}\n.jn-w-\\[var\\(--radix-select-trigger-width\\)\\] {\n  width: var(--radix-select-trigger-width);\n}\n.jn-w-auto {\n  width: auto;\n}\n.jn-w-full {\n  width: 100%;\n}\n.jn-w-grid-col-1 {\n  width: 8.333333%;\n}\n.jn-w-grid-col-10 {\n  width: 83.333333%;\n}\n.jn-w-grid-col-11 {\n  width: 91.666667%;\n}\n.jn-w-grid-col-12 {\n  width: 100%;\n}\n.jn-w-grid-col-2 {\n  width: 16.666667%;\n}\n.jn-w-grid-col-3 {\n  width: 25%;\n}\n.jn-w-grid-col-4 {\n  width: 33.333333%;\n}\n.jn-w-grid-col-6 {\n  width: 50%;\n}\n.jn-w-grid-col-7 {\n  width: 58.333333%;\n}\n.jn-w-grid-col-8 {\n  width: 66.666667%;\n}\n.jn-w-grid-col-9 {\n  width: 75%;\n}\n.jn-w-grid-column-default {\n  width: var(--grid-column-default-width);\n}\n.jn-w-switch-default {\n  width: 2.625rem;\n}\n.jn-w-switch-handle-default {\n  width: 1.1875rem;\n}\n.jn-max-w-full {\n  max-width: 100%;\n}\n.jn-flex-grid-column {\n  flex: var(--grid-column-flex-grow) var(--grid-column-flex-shrink) var(--grid-column-flex-basis);\n}\n.jn-shrink {\n  flex-shrink: 1;\n}\n.jn-shrink-0 {\n  flex-shrink: 0;\n}\n.jn-grow {\n  flex-grow: 1;\n}\n.jn-grow-0 {\n  flex-grow: 0;\n}\n.jn-basis-auto {\n  flex-basis: auto;\n}\n.jn-origin-top-left {\n  transform-origin: top left;\n}\n.-jn-translate-y-1 {\n  --tw-translate-y: -0.25rem;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.-jn-translate-y-2 {\n  --tw-translate-y: -0.5rem;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.jn-translate-x-1 {\n  --tw-translate-x: 0.25rem;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.jn-translate-x-2 {\n  --tw-translate-x: 0.5rem;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.jn-translate-x-\\[100\\%\\] {\n  --tw-translate-x: 100%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.jn-scale-75 {\n  --tw-scale-x: .75;\n  --tw-scale-y: .75;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.jn-transform {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n@keyframes jn-spin {\n\n  to {\n    transform: rotate(360deg);\n  }\n}\n.jn-animate-spin {\n  animation: jn-spin 1s linear infinite;\n}\n.jn-cursor-default {\n  cursor: default;\n}\n.jn-cursor-not-allowed {\n  cursor: not-allowed;\n}\n.jn-cursor-pointer {\n  cursor: pointer;\n}\n.jn-select-none {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.jn-appearance-none {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n.jn-grid-rows-\\[auto_1fr\\] {\n  grid-template-rows: auto 1fr;\n}\n.jn-flex-row {\n  flex-direction: row;\n}\n.jn-flex-col {\n  flex-direction: column;\n}\n.jn-flex-wrap {\n  flex-wrap: wrap;\n}\n.jn-flex-nowrap {\n  flex-wrap: nowrap;\n}\n.jn-items-start {\n  align-items: flex-start;\n}\n.jn-items-end {\n  align-items: flex-end;\n}\n.jn-items-center {\n  align-items: center;\n}\n.jn-items-baseline {\n  align-items: baseline;\n}\n.jn-items-stretch {\n  align-items: stretch;\n}\n.jn-justify-start {\n  justify-content: flex-start;\n}\n.jn-justify-end {\n  justify-content: flex-end;\n}\n.jn-justify-center {\n  justify-content: center;\n}\n.jn-justify-between {\n  justify-content: space-between;\n}\n.jn-justify-around {\n  justify-content: space-around;\n}\n.jn-justify-evenly {\n  justify-content: space-evenly;\n}\n.jn-gap-0 {\n  gap: 0px;\n}\n.jn-gap-0\\.5 {\n  gap: 0.125rem;\n}\n.jn-gap-1 {\n  gap: 0.25rem;\n}\n.jn-gap-1\\.5 {\n  gap: 0.375rem;\n}\n.jn-gap-10 {\n  gap: 2.5rem;\n}\n.jn-gap-11 {\n  gap: 2.75rem;\n}\n.jn-gap-12 {\n  gap: 3rem;\n}\n.jn-gap-14 {\n  gap: 3.5rem;\n}\n.jn-gap-16 {\n  gap: 4rem;\n}\n.jn-gap-2 {\n  gap: 0.5rem;\n}\n.jn-gap-2\\.5 {\n  gap: 0.625rem;\n}\n.jn-gap-20 {\n  gap: 5rem;\n}\n.jn-gap-24 {\n  gap: 6rem;\n}\n.jn-gap-28 {\n  gap: 7rem;\n}\n.jn-gap-3 {\n  gap: 0.75rem;\n}\n.jn-gap-3\\.5 {\n  gap: 0.875rem;\n}\n.jn-gap-32 {\n  gap: 8rem;\n}\n.jn-gap-36 {\n  gap: 9rem;\n}\n.jn-gap-4 {\n  gap: 1rem;\n}\n.jn-gap-40 {\n  gap: 10rem;\n}\n.jn-gap-44 {\n  gap: 11rem;\n}\n.jn-gap-48 {\n  gap: 12rem;\n}\n.jn-gap-5 {\n  gap: 1.25rem;\n}\n.jn-gap-52 {\n  gap: 13rem;\n}\n.jn-gap-56 {\n  gap: 14rem;\n}\n.jn-gap-6 {\n  gap: 1.5rem;\n}\n.jn-gap-60 {\n  gap: 15rem;\n}\n.jn-gap-64 {\n  gap: 16rem;\n}\n.jn-gap-7 {\n  gap: 1.75rem;\n}\n.jn-gap-72 {\n  gap: 18rem;\n}\n.jn-gap-8 {\n  gap: 2rem;\n}\n.jn-gap-80 {\n  gap: 20rem;\n}\n.jn-gap-9 {\n  gap: 2.25rem;\n}\n.jn-gap-96 {\n  gap: 24rem;\n}\n.jn-gap-\\[0\\.375rem\\] {\n  gap: 0.375rem;\n}\n.jn-gap-px {\n  gap: 1px;\n}\n.jn-self-stretch {\n  align-self: stretch;\n}\n.jn-overflow-auto {\n  overflow: auto;\n}\n.jn-overflow-hidden {\n  overflow: hidden;\n}\n.jn-overflow-x-auto {\n  overflow-x: auto;\n}\n.jn-overflow-y-auto {\n  overflow-y: auto;\n}\n.jn-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.jn-overflow-ellipsis {\n  text-overflow: ellipsis;\n}\n.jn-whitespace-nowrap {\n  white-space: nowrap;\n}\n.jn-whitespace-pre-wrap {\n  white-space: pre-wrap;\n}\n.jn-break-words {\n  overflow-wrap: break-word;\n}\n.jn-break-all {\n  word-break: break-all;\n}\n.jn-rounded {\n  border-radius: 0.25rem;\n}\n.jn-rounded-3px {\n  border-radius: 3px;\n}\n.jn-rounded-\\[3px\\] {\n  border-radius: 3px;\n}\n.jn-rounded-full {\n  border-radius: 9999px;\n}\n.jn-rounded-sm {\n  border-radius: 0.125rem;\n}\n.jn-rounded-l {\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n.jn-rounded-l-none {\n  border-top-left-radius: 0px;\n  border-bottom-left-radius: 0px;\n}\n.jn-rounded-r-none {\n  border-top-right-radius: 0px;\n  border-bottom-right-radius: 0px;\n}\n.jn-rounded-t {\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n.jn-border {\n  border-width: 1px;\n}\n.jn-border-b {\n  border-bottom-width: 1px;\n}\n.jn-border-b-\\[1px\\] {\n  border-bottom-width: 1px;\n}\n.jn-border-b-\\[3px\\] {\n  border-bottom-width: 3px;\n}\n.jn-border-l-4 {\n  border-left-width: 4px;\n}\n.jn-border-t {\n  border-top-width: 1px;\n}\n.jn-border-t-\\[1px\\] {\n  border-top-width: 1px;\n}\n.jn-border-theme-background-lvl-0 {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-background-lvl-0-raw), var(--tw-border-opacity));\n}\n.jn-border-theme-background-lvl-2 {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-background-lvl-2-raw), var(--tw-border-opacity));\n}\n.jn-border-theme-background-lvl-3 {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-background-lvl-3-raw), var(--tw-border-opacity));\n}\n.jn-border-theme-background-lvl-4 {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-background-lvl-4-raw), var(--tw-border-opacity));\n}\n.jn-border-theme-box-default {\n  border-color: var(--color-box-border);\n}\n.jn-border-theme-codeblock-bar {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-codeblock-bar-border), var(--tw-border-opacity));\n}\n.jn-border-theme-datalist-row {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-datalist-row-border), var(--tw-border-opacity));\n}\n.jn-border-theme-default {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-default-border), var(--tw-border-opacity));\n}\n.jn-border-theme-error {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-error-raw), var(--tw-border-opacity));\n}\n.jn-border-theme-filter-input {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-filter-input-border), var(--tw-border-opacity));\n}\n.jn-border-theme-filter-pill {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-filter-pill-border), var(--tw-border-opacity));\n}\n.jn-border-theme-introbox {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-introbox-border), var(--tw-border-opacity));\n}\n.jn-border-theme-message-danger {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-message-danger-border), var(--tw-border-opacity));\n}\n.jn-border-theme-message-default {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-message-default-border), var(--tw-border-opacity));\n}\n.jn-border-theme-message-error {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-message-error-border), var(--tw-border-opacity));\n}\n.jn-border-theme-message-success {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-message-success-border), var(--tw-border-opacity));\n}\n.jn-border-theme-message-warning {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-message-warning-border), var(--tw-border-opacity));\n}\n.jn-border-theme-success {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-success-raw), var(--tw-border-opacity));\n}\n.jn-border-theme-switch-default {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-switch-default-border), var(--tw-border-opacity));\n}\n.jn-border-theme-tab-active-bottom {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-text-default-raw), var(--tw-border-opacity));\n}\n.jn-border-theme-tab-navigation-content-bottom {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--color-tabnavigation-content-bottom-border), var(--tw-border-opacity));\n}\n.jn-border-transparent {\n  border-color: transparent;\n}\n.jn-border-t-theme-panel {\n  --tw-border-opacity: 1;\n  border-top-color: rgba(var(--color-panel-border-raw), var(--tw-border-opacity));\n}\n.\\!jn-bg-theme-filter-input-textinput {\n  --tw-bg-opacity: 1 !important;\n  background-color: rgba(var(--color-filter-input-textinput-bg), var(--tw-bg-opacity)) !important;\n}\n.jn-bg-juno-blue-3 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-juno-blue-3-raw), var(--tw-bg-opacity));\n}\n.jn-bg-juno-grey-blue-11 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-juno-grey-blue-11-raw), var(--tw-bg-opacity));\n}\n.jn-bg-theme-background-lvl-0 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-background-lvl-0-raw), var(--tw-bg-opacity));\n}\n.jn-bg-theme-background-lvl-1 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-background-lvl-1-raw), var(--tw-bg-opacity));\n}\n.jn-bg-theme-background-lvl-3 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-background-lvl-3-raw), var(--tw-bg-opacity));\n}\n.jn-bg-theme-badge-default {\n  background-color: var(--color-badge-default-bg);\n}\n.jn-bg-theme-box-default {\n  background-color: var(--color-box-bg);\n}\n.jn-bg-theme-checkbox {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-checkbox-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-code-block {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-codeblock-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-content-area-bg {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-content-area-bg-raw), var(--tw-bg-opacity));\n}\n.jn-bg-theme-danger\\/25 {\n  background-color: rgba(var(--color-danger-raw), 0.25);\n}\n.jn-bg-theme-danger\\/70 {\n  background-color: rgba(var(--color-danger-raw), 0.7);\n}\n.jn-bg-theme-datagridrow-selected {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-datagridrow-selected), var(--tw-bg-opacity));\n}\n.jn-bg-theme-datalistrow-selected {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-datalistrow-selected), var(--tw-bg-opacity));\n}\n.jn-bg-theme-error\\/25 {\n  background-color: rgba(var(--color-error-raw), 0.25);\n}\n.jn-bg-theme-filter-input {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-filter-input-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-filter-pill-key {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-filter-pill-key-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-filters {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-filters-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-focus {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-focus-raw), var(--tw-bg-opacity));\n}\n.jn-bg-theme-global-bg {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-global-bg-raw), var(--tw-bg-opacity));\n}\n.jn-bg-theme-info\\/25 {\n  background-color: rgba(var(--color-info-raw), 0.25);\n}\n.jn-bg-theme-introbox {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-introbox-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-modal-backdrop {\n  background-color: var(--color-modal-backdrop-bg);\n}\n.jn-bg-theme-panel {\n  background-color: var(--color-panel-bg);\n}\n.jn-bg-theme-radio {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-radio-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-radio-checked {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-radio-checked-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-required {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-required-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-select {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-select-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-success\\/25 {\n  background-color: rgba(var(--color-success-raw), 0.25);\n}\n.jn-bg-theme-switch-handle {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-switch-handle-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-switch-handle-checked {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-switch-handle-checked-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-tab-navigation-top {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-tabnavigation-top-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-textinput {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-textinput-bg), var(--tw-bg-opacity));\n}\n.jn-bg-theme-warning\\/25 {\n  background-color: rgba(var(--color-warning-raw), 0.25);\n}\n.jn-bg-theme-message-danger {\n  background-image: var(--gradient-message-danger-bg);\n}\n.jn-bg-theme-message-default {\n  background-image: var(--gradient-message-default-bg);\n}\n.jn-bg-theme-message-error {\n  background-image: var(--gradient-message-error-bg);\n}\n.jn-bg-theme-message-success {\n  background-image: var(--gradient-message-success-bg);\n}\n.jn-bg-theme-message-warning {\n  background-image: var(--gradient-message-warning-bg);\n}\n.jn-bg-clip-padding {\n  background-clip: padding-box;\n}\n.jn-bg-\\[right_top_1rem\\] {\n  background-position: right top 1rem;\n}\n.jn-bg-right {\n  background-position: right;\n}\n.jn-bg-right-top {\n  background-position: right top;\n}\n.jn-bg-no-repeat {\n  background-repeat: no-repeat;\n}\n.jn-fill-current {\n  fill: currentColor;\n}\n.jn-p-0 {\n  padding: 0px;\n}\n.jn-p-2 {\n  padding: 0.5rem;\n}\n.jn-p-2\\.5 {\n  padding: 0.625rem;\n}\n.jn-p-3 {\n  padding: 0.75rem;\n}\n.jn-p-4 {\n  padding: 1rem;\n}\n.jn-p-6 {\n  padding: 1.5rem;\n}\n.jn-p-grid-column {\n  padding: 0 .5rem;\n}\n.jn-p-px {\n  padding: 1px;\n}\n.jn-px-1 {\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n}\n.jn-px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n.jn-px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n.jn-px-3\\.5 {\n  padding-left: 0.875rem;\n  padding-right: 0.875rem;\n}\n.jn-px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.jn-px-5 {\n  padding-left: 1.25rem;\n  padding-right: 1.25rem;\n}\n.jn-px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n.jn-px-8 {\n  padding-left: 2rem;\n  padding-right: 2rem;\n}\n.jn-px-\\[0\\.4375rem\\] {\n  padding-left: 0.4375rem;\n  padding-right: 0.4375rem;\n}\n.jn-px-\\[0\\.5625rem\\] {\n  padding-left: 0.5625rem;\n  padding-right: 0.5625rem;\n}\n.jn-px-\\[0\\.5rem\\] {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n.jn-px-\\[0\\.625rem\\] {\n  padding-left: 0.625rem;\n  padding-right: 0.625rem;\n}\n.jn-px-\\[0\\.875rem\\] {\n  padding-left: 0.875rem;\n  padding-right: 0.875rem;\n}\n.jn-px-\\[1\\.5625rem\\] {\n  padding-left: 1.5625rem;\n  padding-right: 1.5625rem;\n}\n.jn-py-0 {\n  padding-top: 0px;\n  padding-bottom: 0px;\n}\n.jn-py-0\\.5 {\n  padding-top: 0.125rem;\n  padding-bottom: 0.125rem;\n}\n.jn-py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.jn-py-1\\.5 {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n}\n.jn-py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.jn-py-2\\.5 {\n  padding-top: 0.625rem;\n  padding-bottom: 0.625rem;\n}\n.jn-py-3 {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n.jn-py-4 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n.jn-py-5 {\n  padding-top: 1.25rem;\n  padding-bottom: 1.25rem;\n}\n.jn-py-6 {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n.jn-py-\\[0\\.25rem\\] {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.jn-py-\\[0\\.3125rem\\] {\n  padding-top: 0.3125rem;\n  padding-bottom: 0.3125rem;\n}\n.jn-py-\\[0\\.375rem\\] {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n}\n.jn-py-\\[0\\.4375rem\\] {\n  padding-top: 0.4375rem;\n  padding-bottom: 0.4375rem;\n}\n.jn-pb-1 {\n  padding-bottom: 0.25rem;\n}\n.jn-pb-14 {\n  padding-bottom: 3.5rem;\n}\n.jn-pb-2 {\n  padding-bottom: 0.5rem;\n}\n.jn-pb-\\[0\\.5rem\\] {\n  padding-bottom: 0.5rem;\n}\n.jn-pl-3 {\n  padding-left: 0.75rem;\n}\n.jn-pl-4 {\n  padding-left: 1rem;\n}\n.jn-pl-6 {\n  padding-left: 1.5rem;\n}\n.jn-pr-10 {\n  padding-right: 2.5rem;\n}\n.jn-pr-16 {\n  padding-right: 4rem;\n}\n.jn-pr-2 {\n  padding-right: 0.5rem;\n}\n.jn-pr-2\\.5 {\n  padding-right: 0.625rem;\n}\n.jn-pr-20 {\n  padding-right: 5rem;\n}\n.jn-pr-24 {\n  padding-right: 6rem;\n}\n.jn-pr-4 {\n  padding-right: 1rem;\n}\n.jn-pr-56 {\n  padding-right: 14rem;\n}\n.jn-pr-9 {\n  padding-right: 2.25rem;\n}\n.jn-pr-\\[3\\.75rem\\] {\n  padding-right: 3.75rem;\n}\n.jn-pt-0 {\n  padding-top: 0px;\n}\n.jn-pt-0\\.5 {\n  padding-top: 0.125rem;\n}\n.jn-pt-16 {\n  padding-top: 4rem;\n}\n.jn-pt-4 {\n  padding-top: 1rem;\n}\n.jn-pt-6 {\n  padding-top: 1.5rem;\n}\n.jn-pt-\\[0\\.4325rem\\] {\n  padding-top: 0.4325rem;\n}\n.jn-pt-\\[0\\.6875rem\\] {\n  padding-top: 0.6875rem;\n}\n.jn-pt-\\[0\\.8125rem\\] {\n  padding-top: 0.8125rem;\n}\n.jn-pt-\\[1\\.125\\] {\n  padding-top: 1.125;\n}\n.jn-pt-\\[1\\.125rem\\] {\n  padding-top: 1.125rem;\n}\n.jn-text-left {\n  text-align: left;\n}\n.jn-text-center {\n  text-align: center;\n}\n.jn-align-top {\n  vertical-align: top;\n}\n.jn-text-2xl {\n  font-size: 1.5rem;\n  line-height: 2rem;\n}\n.jn-text-base {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n.jn-text-lg {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n.jn-text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n.jn-text-xl {\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n.jn-text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n.jn-font-bold {\n  font-weight: 700;\n}\n.jn-leading-4 {\n  line-height: 1rem;\n}\n.jn-leading-5 {\n  line-height: 1.25rem;\n}\n.jn-leading-6 {\n  line-height: 1.5rem;\n}\n.jn-leading-none {\n  line-height: 1;\n}\n.jn-text-current {\n  color: currentColor;\n}\n.jn-text-juno-grey-blue {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-juno-grey-blue-11-raw), var(--tw-text-opacity));\n}\n.jn-text-theme-accent {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-accent-raw), var(--tw-text-opacity));\n}\n.jn-text-theme-checkbox-checked {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-checkbox-checked-color), var(--tw-text-opacity));\n}\n.jn-text-theme-danger {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-danger-raw), var(--tw-text-opacity));\n}\n.jn-text-theme-default {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-text-default-raw), var(--tw-text-opacity));\n}\n.jn-text-theme-disabled {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-text-disabled-raw), var(--tw-text-opacity));\n}\n.jn-text-theme-error {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-error-raw), var(--tw-text-opacity));\n}\n.jn-text-theme-high {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-text-high-raw), var(--tw-text-opacity));\n}\n.jn-text-theme-info {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-info-raw), var(--tw-text-opacity));\n}\n.jn-text-theme-light {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-text-light-raw), var(--tw-text-opacity));\n}\n.jn-text-theme-on-default {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-button-default-text), var(--tw-text-opacity));\n}\n.jn-text-theme-success {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-success-raw), var(--tw-text-opacity));\n}\n.jn-text-theme-textinput {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-textinput-text), var(--tw-text-opacity));\n}\n.jn-text-theme-warning {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-warning-raw), var(--tw-text-opacity));\n}\n.jn-text-white {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-white-raw), var(--tw-text-opacity));\n}\n.jn-placeholder-transparent::-moz-placeholder {\n  color: transparent;\n}\n.jn-placeholder-transparent::placeholder {\n  color: transparent;\n}\n.jn-opacity-0 {\n  opacity: 0;\n}\n.jn-opacity-25 {\n  opacity: 0.25;\n}\n.jn-opacity-50 {\n  opacity: 0.5;\n}\n.jn-opacity-75 {\n  opacity: 0.75;\n}\n.jn-shadow {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.jn-shadow-md {\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.jn-shadow-sm {\n  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.jn-outline-none {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n.jn-ring-2 {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n.jn-ring-theme-focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(var(--color-focus-raw), var(--tw-ring-opacity));\n}\n.jn-drop-shadow-\\[0_0_4px_rgba\\(0\\,0\\,0\\,0\\.15\\)\\] {\n  --tw-drop-shadow: drop-shadow(0 0 4px rgba(0,0,0,0.15));\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n.jn-backdrop-blur {\n  --tw-backdrop-blur: blur(8px);\n  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n}\n.jn-backdrop-blur-\\[2px\\] {\n  --tw-backdrop-blur: blur(2px);\n  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n}\n.jn-backdrop-saturate-150 {\n  --tw-backdrop-saturate: saturate(1.5);\n  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n}\n.jn-transition-all {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.jn-transition-transform {\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.jn-duration-100 {\n  transition-duration: 100ms;\n}\n.jn-duration-300 {\n  transition-duration: 300ms;\n}\n.jn-ease-in-out {\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n}\n.jn-ease-out {\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n.juno-button-default {\n  background-color: var(--color-button-default-bg);\n  color: var(--color-button-default-text);\n}\n.juno-button-default:hover {\n  background-color: var(--color-button-default-hover-bg);\n  color: var(--color-button-default-hover-text);\n}\n.juno-button-default:active {\n  background-color: var(--color-button-default-active-bg);\n  border-color: var(--color-button-default-active-border);\n  color: var(--color-button-default-active-text);\n}\n\n.juno-button-subdued {\n  background-color: var(--color-button-subdued-bg);\n  border: 1px solid var(--color-button-subdued-border);\n  color: var(--color-button-subdued-text);\n}\n.juno-button-subdued:hover {\n  background-color: var(--color-button-subdued-hover-bg);\n  border-color: var(--color-button-subdued-hover-border);\n  color: var(--color-button-subdued-hover-text);\n}\n.juno-button-subdued:active {\n  background-color: var(--color-button-subdued-active-bg);\n  border-color: var(--color-button-subdued-active-border);\n  color: var(--color-button-subdued-active-text);\n}\n\n.juno-button-primary {\n  background-color: var(--color-button-primary-bg);\n  color: var(--color-button-primary-text);\n}\n.juno-button-primary:hover {\n  background-color: var(--color-button-primary-hover-bg);\n  color: var(--color-button-primary-hover-text);\n}\n.juno-button-primary:active {\n  background-color: var(--color-button-primary-active-bg);\n  color: var(--color-button-primary-active-text);\n}\n\n.juno-button-primary-danger {\n  background-color: var(--color-button-primary-danger-bg);\n  color: var(--color-button-primary-danger-text);\n}\n.juno-button-primary-danger:hover {\n  background-color: var(--color-button-primary-danger-hover-bg);\n  color: var(--color-button-primary-danger-hover-text);\n}\n.juno-button-primary-danger:active {\n  background-color: var(--color-button-primary-danger-active-bg);\n  color: var(--color-button-primary-danger-active-text);\n}\n\n.juno-input-group .juno-button:not(:first-child, :last-child),\n.juno-input-group .juno-textinput:not(:first-child, :last-child),\n.juno-input-group .juno-select:not(:first-child, :last-child) {\n  border-radius: 0;\n}\n.juno-input-group .juno-button:first-child,\n.juno-input-group .juno-textinput:first-child,\n.juno-input-group .juno-select:first-child {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.juno-input-group .juno-button:last-child,\n.juno-input-group .juno-textinput:last-child,\n.juno-input-group .juno-select:last-child {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.juno-input-group .juno-button-default + .juno-button-default,\n.juno-input-group .juno-button-primary + .juno-button-primary,\n.juno-input-group .juno-button-default-primary-danger + .juno-button-primary-danger,\n.juno-input-group .juno-button-subdued + .juno-button-subdued {\n  border-left: 0;\n}\n\n.juno-select-default {\n  background-color: var(--color-button-default-bg);\n  border: 1px solid var(--color-button-default-border);\n  color: var(--color-button-default-text);\n}\n.juno-select-default:hover {\n  background-color: var(--color-button-default-hover-bg);\n  border-color: var(--color-button-default-hover-border);\n  color: var(--color-button-default-hover-text);\n}\n.juno-select-default:active {\n  background-color: var(--color-button-default-active-bg);\n  border-color: var(--color-button-default-active-border);\n  color: var(--color-button-default-active-text);\n}\n\n.juno-select-subdued {\n  background-color: var(--color-button-subdued-bg);\n  border: 1px solid var(--color-button-subdued-border);\n  color: var(--color-button-subdued-text);\n}\n.juno-select-subdued:hover {\n  background-color: var(--color-button-subdued-hover-bg);\n  border-color: var(--color-button-subdued-hover-border);\n  color: var(--color-button-subdued-hover-text);\n}\n.juno-select-subdued:active {\n  background-color: var(--color-button-subdued-active-bg);\n  border-color: var(--color-button-subdued-active-border);\n  color: var(--color-button-subdued-active-text);\n}\n\n.juno-select-primary {\n  background-color: var(--color-button-primary-bg);\n  color: var(--color-button-primary-text);\n}\n.juno-select-primary:hover {\n  background-color: var(--color-button-primary-hover-bg);\n  color: var(--color-button-primary-hover-text);\n}\n.juno-select-primary:active {\n  background-color: var(--color-button-primary-active-bg);\n  color: var(--color-button-primary-active-text);\n}\n\n.juno-select-primary-danger {\n  background-color: var(--color-button-primary-danger-bg);\n  color: var(--color-button-primary-danger-text);\n}\n.juno-select-primary-danger:hover {\n  background-color: var(--color-button-primary-danger-hover-bg);\n  color: var(--color-button-primary-danger-hover-text);\n}\n.juno-select-primary-danger:active {\n  background-color: var(--color-button-primary-danger-active-bg);\n  color: var(--color-button-primary-danger-active-text);\n}\n\n.juno-sidenavigation-item {\n  color: var(--color-text-default);\n  font-weight: bold;\n  display: inline-flex;\n  align-items: center;\n  border-left: 3px solid transparent;\n  padding-left: 1.75rem;\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n}\n.juno-sidenavigation-item .juno-icon {\n  margin-right: 0.5rem;\n}\n.juno-sidenavigation-item:hover {\n  color: var(--color-text-high);\n  border-left: 3px solid var(--color-accent);\n}\n.juno-sidenavigation-item:hover .juno-icon {\n  color: var(--color-text-high);\n  margin-right: 0.5rem;\n}\n.juno-sidenavigation-item:active, .juno-sidenavigation-item.juno-sidenavigation-item-active {\n  color: var(--color-navigation-active);\n  border-left: 3px solid var(--color-navigation-active);\n}\n.juno-sidenavigation-item:active .juno-icon, .juno-sidenavigation-item.juno-sidenavigation-item-active .juno-icon {\n  color: var(--color-navigation-active);\n}\n\n.juno-topnavigation-item {\n  color: var(--color-text-default);\n  font-weight: bold;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  border-bottom: 3px solid transparent;\n  padding-top: 0.125rem;\n  padding-bottom: 0.3125rem;\n}\n.juno-topnavigation-item:hover {\n  color: var(--color-text-high);\n  border-bottom: 3px solid var(--color-accent);\n}\n.juno-topnavigation-item:hover .juno-icon {\n  color: var(--color-text-high);\n}\n.juno-topnavigation-item:active, .juno-topnavigation-item.juno-topnavigation-item-active {\n  color: var(--color-navigation-active);\n  border-bottom: 3px solid var(--color-navigation-active);\n}\n.juno-topnavigation-item:active .juno-icon, .juno-topnavigation-item.juno-topnavigation-item-active .juno-icon {\n  color: var(--color-navigation-active);\n}\n@media (min-width: 1536px) {\n\n  .\\32xl\\:jn-container {\n    width: 100%;\n  }\n\n  @media (min-width: 640px) {\n\n    .\\32xl\\:jn-container {\n      max-width: 640px;\n    }\n  }\n\n  @media (min-width: 768px) {\n\n    .\\32xl\\:jn-container {\n      max-width: 768px;\n    }\n  }\n\n  @media (min-width: 1024px) {\n\n    .\\32xl\\:jn-container {\n      max-width: 1024px;\n    }\n  }\n\n  @media (min-width: 1280px) {\n\n    .\\32xl\\:jn-container {\n      max-width: 1280px;\n    }\n  }\n\n  @media (min-width: 1536px) {\n\n    .\\32xl\\:jn-container {\n      max-width: 1536px;\n    }\n  }\n}\n.last\\:jn-mb-0:last-child {\n  margin-bottom: 0px;\n}\n.last\\:jn-mr-0:last-child {\n  margin-right: 0px;\n}\n.last\\:jn-border-b-0:last-child {\n  border-bottom-width: 0;\n}\n.hover\\:jn-bg-theme-background-lvl-3:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--color-background-lvl-3-raw), var(--tw-bg-opacity));\n}\n.hover\\:jn-text-theme-accent:hover {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-accent-raw), var(--tw-text-opacity));\n}\n.hover\\:jn-text-theme-high:hover {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-text-high-raw), var(--tw-text-opacity));\n}\n.hover\\:jn-opacity-100:hover {\n  opacity: 1;\n}\n.focus\\:jn-z-40:focus {\n  z-index: 40;\n}\n.focus\\:jn-rounded-full:focus {\n  border-radius: 9999px;\n}\n.focus\\:jn-outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n.focus\\:jn-ring-2:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n.focus\\:jn-ring-inset:focus {\n  --tw-ring-inset: inset;\n}\n.focus\\:jn-ring-theme-focus:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(var(--color-focus-raw), var(--tw-ring-opacity));\n}\n.focus-visible\\:jn-ring-2:focus-visible {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n.focus-visible\\:jn-ring-theme-focus:focus-visible {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(var(--color-focus-raw), var(--tw-ring-opacity));\n}\n.focus-visible\\:jn-ring-offset-1:focus-visible {\n  --tw-ring-offset-width: 1px;\n}\n.focus-visible\\:jn-ring-offset-theme-focus:focus-visible {\n  --tw-ring-offset-color: rgb(var(--color-global-bg-raw));\n}\n.active\\:jn-text-theme-accent:active {\n  --tw-text-opacity: 1;\n  color: rgba(var(--color-accent-raw), var(--tw-text-opacity));\n}\n.disabled\\:jn-pointer-events-none:disabled {\n  pointer-events: none;\n}\n.disabled\\:jn-cursor-not-allowed:disabled {\n  cursor: not-allowed;\n}\n.disabled\\:jn-opacity-50:disabled {\n  opacity: 0.5;\n}\n@media (min-width: 768px) {\n\n  .md\\:jn-flex {\n    display: flex;\n  }\n\n  .md\\:jn-flex-row {\n    flex-direction: row;\n  }\n}\n@media (min-width: 1536px) {\n\n  .\\32xl\\:jn-mx-auto {\n    margin-left: auto;\n    margin-right: auto;\n  }\n}".toString();
var GLOBAL_STYLE_ID = "juno-style-provider-global-styles";
var GlobalStyles = ({ inline: r2 }) => ((0, import_react78.useInsertionEffect)(() => {
  if (!(r2 || document.querySelector(`[id="${GLOBAL_STYLE_ID}"]`))) {
    const r3 = document.createElement("style");
    r3.setAttribute("id", GLOBAL_STYLE_ID), r3.appendChild(document.createTextNode(styles)), document.head.append(r3);
  }
}, []), r2 ? import_react78.default.createElement("style", { [`data-${GLOBAL_STYLE_ID}`]: "" }, styles) : null);
var StylesContext = import_react78.default.createContext();
var APP_BODY_CSS_CLASS_NAME = "juno-app-body";
var StyleProvider = ({ stylesWrapper: r2, theme: o2, children: t, shadowRootMode: e }) => {
  const a = o2 || "theme-dark", l = (0, import_react78.useRef)(APP_BODY_CSS_CLASS_NAME + " " + a), n = (0, import_react78.useRef)(), c2 = import_react78.default.useCallback(({ children: o3 }) => "shadowRoot" === r2 ? import_react78.default.createElement(ShadowRoot2, { mode: e }, o3) : o3, [r2, e]), i = (0, import_react78.useCallback)((r3) => {
    n.current && "string" == typeof r3 && (n.current.className = `${APP_BODY_CSS_CLASS_NAME} ${a} ${r3}`);
  }, []);
  return import_react78.default.createElement(c2, null, import_react78.default.createElement(Fonts, { inline: "head" !== r2 }), import_react78.default.createElement(GlobalStyles, { inline: "head" !== r2 }), import_react78.default.createElement(StylesContext.Provider, { value: { styles, theme: tailwind_config, setCustomCssClasses: i } }, import_react78.default.createElement("div", { className: l.current, ref: n }, t)));
};
StyleProvider.propTypes = { stylesWrapper: import_prop_types77.default.oneOfType([import_prop_types77.default.oneOf(["head", "inline", "shadowRoot"])]), theme: import_prop_types77.default.string, shadowRootMode: import_prop_types77.default.oneOf(["open", "closed"]) }, StyleProvider.defaultProps = { stylesWrapper: "inline", theme: void 0 }, StyleProvider.useStyles = () => import_react78.default.useContext(StylesContext);

// node_modules/juno-ui-components/build/Switch.component-c895c56f.js
var import_react79 = __toESM(require_react());
var import_prop_types78 = __toESM(require_prop_types());
var switchbasestyles = `
	jn-rounded-full
	jn-relative
	jn-p-0
	jn-leading-0
	jn-border
	jn-g-theme-default
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
	disabled:jn-opacity-50
	disabled:jn-cursor-not-allowed
`;
var switchsizestyles = (a) => "small" === a ? "jn-w-[1.75rem] jn-h-4" : "large" === a ? "jn-w-[3.125rem] jn-h-[1.6875rem]" : "jn-w-switch-default jn-h-switch-default";
var handlebasestyles = `
	jn-inline-block
	jn-absolute
	jn-top-[1px]
	jn-rounded-full
	jn-bg-theme-switch-handle
	jn-border-theme-default
`;
var handlesizestyles = (a) => "small" === a ? "jn-w-[0.75rem] jn-h-[0.75rem]" : "large" === a ? "jn-w-[1.4375rem] jn-h-[1.4375rem]" : "jn-w-switch-handle-default jn-h-switch-handle-default";
var defaultborderstyles2 = `
	jn-border-theme-switch-default
`;
var invalidbasestyles = `
	jn-border-theme-error
`;
var validbasestyles = `
	jn-border-theme-success
`;
var handleonstyles = `
	jn-right-[1px] jn-bg-theme-switch-handle-checked
`;
var handleoffstyles = `
	jn-left-[1px]
`;
var Switch = ({ name: a, id: b6, size: c2, on: d, disabled: e, invalid: f, valid: g, className: h, onChange: i, onClick: j, ...k }) => {
  const [l, m] = (0, import_react79.useState)(d), [n, o2] = (0, import_react79.useState)(false), [p, q] = (0, import_react79.useState)(false);
  (0, import_react79.useEffect)(() => {
    m(d);
  }, [d]), (0, import_react79.useEffect)(() => {
    o2(f);
  }, [f]), (0, import_react79.useEffect)(() => {
    q(g);
  }, [g]);
  return import_react79.default.createElement(import_react79.default.Fragment, null, import_react79.default.createElement("button", _extends({ type: "button", role: "switch", name: a, id: b6, "aria-checked": l, disabled: e, onClick: (a2) => {
    m(!l), j && j(a2), i && i(a2);
  }, className: `juno-switch juno-switch-${c2} ${switchbasestyles} ${switchsizestyles(c2)} ${n ? "juno-switch-invalid " + invalidbasestyles : ""} ${p ? "juno-switch-valid " + validbasestyles : ""} ${p || n ? "" : defaultborderstyles2} ${h}` }, k), import_react79.default.createElement("span", { className: `juno-switch-handle ${handlebasestyles} ${handlesizestyles(c2)} ${l ? handleonstyles : handleoffstyles}` })));
};
Switch.propTypes = { name: import_prop_types78.default.string, id: import_prop_types78.default.string, size: import_prop_types78.default.oneOf(["small", "default", "large"]), on: import_prop_types78.default.bool, disabled: import_prop_types78.default.bool, invalid: import_prop_types78.default.bool, valid: import_prop_types78.default.bool, className: import_prop_types78.default.string, onChange: import_prop_types78.default.func, onClick: import_prop_types78.default.func }, Switch.defaultProps = { name: "unnamed switch", id: null, size: "default", on: false, disabled: null, invalid: false, valid: false, className: "", onChange: void 0, onClick: void 0 };

// node_modules/juno-ui-components/build/SwitchRow.component-711de5b0.js
var import_react80 = __toESM(require_react());
var import_prop_types79 = __toESM(require_prop_types());
var switchrow = `
	jn-flex
	jn-flex-row
	jn-mb-1
`;
var switchcontainerstyles = `
	jn-mr-2
	jn-leading-none
`;
var helptextstyles4 = `
	jn-text-xs
	jn-text-theme-light
	jn-mt-1
`;
var errortextstyles6 = `
  jn-text-xs
  jn-text-theme-error
  jn-mt-1
`;
var successtextstyles6 = `
  jn-text-xs
  jn-text-theme-success
  jn-mt-1
`;
var iconstyles6 = `
  jn-inline-block 
  jn-ml-1 
  jn-leading-1
  jn-mt-[-.2rem]
`;
var SwitchRow = ({ name: a, label: b6, id: c2, on: d, disabled: e, helptext: f, required: g, invalid: h, errortext: i, valid: j, successtext: k, className: l, onChange: m, onClick: n, ...o2 }) => {
  const [p, q] = (0, import_react80.useState)(d), [r2, s] = (0, import_react80.useState)(false), [t, u] = (0, import_react80.useState)(false);
  (0, import_react80.useEffect)(() => {
    q(d);
  }, [d]);
  const v = (0, import_react80.useMemo)(() => h || !!(i && i.length), [h, i]), w = (0, import_react80.useMemo)(() => j || !!(k && k.length), [j, k]);
  (0, import_react80.useEffect)(() => {
    s(v);
  }, [v]), (0, import_react80.useEffect)(() => {
    u(w);
  }, [w]);
  return import_react80.default.createElement("div", _extends({ className: `juno-switch-row ${switchrow} ${l}` }, o2), import_react80.default.createElement("div", { className: `juno-switch-container ${switchcontainerstyles}` }, import_react80.default.createElement(Switch, { name: a, onChange: (a2) => {
    q(!p), m && m(a2);
  }, onClick: n, id: c2, on: d, disabled: e, invalid: r2, valid: t })), import_react80.default.createElement("div", { className: `jn-pt-0.5` }, import_react80.default.createElement(Label, { text: b6, htmlFor: c2, required: g, disabled: e }), r2 ? import_react80.default.createElement(Icon, { icon: "dangerous", color: "jn-text-theme-error", size: "1.125rem", className: `${iconstyles6}` }) : null, t ? import_react80.default.createElement(Icon, { icon: "checkCircle", color: "jn-text-theme-success", size: "1.125rem", className: `${iconstyles6}` }) : null, i && i.length ? import_react80.default.createElement("p", { className: `${errortextstyles6}` }, i) : null, k && k.length ? import_react80.default.createElement("p", { className: `${successtextstyles6}` }, k) : null, f ? import_react80.default.createElement("p", { className: `${helptextstyles4}` }, f) : null));
};
SwitchRow.propTypes = { name: import_prop_types79.default.string, label: import_prop_types79.default.string, id: import_prop_types79.default.string, on: import_prop_types79.default.bool, disabled: import_prop_types79.default.bool, helptext: import_prop_types79.default.node, required: import_prop_types79.default.bool, invalid: import_prop_types79.default.bool, errortext: import_prop_types79.default.string, valid: import_prop_types79.default.bool, successtext: import_prop_types79.default.string, className: import_prop_types79.default.string, onChange: import_prop_types79.default.func, onClick: import_prop_types79.default.func }, SwitchRow.defaultProps = { name: null, label: null, id: null, on: false, disabled: null, helptext: null, required: null, invalid: false, errortext: "", valid: false, successtext: "", className: "", onChange: void 0, onClick: void 0 };

// node_modules/juno-ui-components/build/Tab.component-3aec19f4.js
var import_react81 = __toESM(require_react());
var import_prop_types80 = __toESM(require_prop_types());
var tabStyles = `
	jn-flex
	jn-font-bold
	jn-px-[1.5625rem]
	jn-items-center
	jn-cursor-pointer
	focus:jn-outline-none 
`;
var disabledTabStyles = `
	jn-pointer-events-none
	jn-opacity-50
`;
var selectedTabStyles = `
	jn-border-b-[3px]
	jn-border-theme-tab-active-bottom
`;
var iconStyles2 = `
	jn-mr-2
`;
var Tab2 = ({ children: a, label: b6, icon: c2, disabled: d, className: e, ...f }) => import_react81.default.createElement(Tab, _extends({ className: `juno-tab ${tabStyles} ${e}`, disabledClassName: `juno-tab-disabled ${disabledTabStyles}`, selectedClassName: `juno-tab-selected ${selectedTabStyles}`, disabled: d }, f), c2 ? import_react81.default.createElement(Icon, { icon: c2, size: "18", className: `${iconStyles2}` }) : null, a || b6);
Tab2.tabsRole = "Tab", Tab2.propTypes = { children: import_prop_types80.default.node, label: import_prop_types80.default.string, icon: import_prop_types80.default.oneOf(knownIcons), disabled: import_prop_types80.default.bool, className: import_prop_types80.default.string }, Tab2.defaultProps = { children: null, label: "", disabled: false, className: "" };

// node_modules/juno-ui-components/build/TabList.component-d9e89920.js
var import_react82 = __toESM(require_react());
var import_prop_types81 = __toESM(require_prop_types());
var tabListStyles = `
	jn-flex
	jn-h-[3.4375rem]
`;
var getVariantStyles = (a) => "main" === a ? `jn-bg-theme-tab-navigation-top` : "codeblocks" === a ? `
				jn-text-sm
				jn-bg-theme-code-block
				jn-border-b-[1px]
				jn-border-theme-codeblock-bar 
			` : `
				jn-border-b-[1px] 
				jn-border-theme-tab-navigation-content-bottom
			`;
var TabList2 = ({ variant: a, children: b6, ...c2 }) => {
  const d = useTabsContext() || {}, e = d.variant || a;
  return import_react82.default.createElement(TabList, _extends({ className: `juno-tablist juno-tablist-${e} ${tabListStyles} ${getVariantStyles(e)}` }, c2), b6);
};
TabList2.tabsRole = "TabList", TabList2.propTypes = { variant: import_prop_types81.default.oneOf(["main", "content", "codeblocks"]), children: import_prop_types81.default.node }, TabList2.defaultProps = { variant: "content", children: null };

// node_modules/juno-ui-components/build/TabPanel.component-079e754c.js
var import_react83 = __toESM(require_react());
var import_prop_types82 = __toESM(require_prop_types());
var TabPanel2 = ({ padding: a, children: b6, className: c2, ...d }) => import_react83.default.createElement(TabPanel, _extends({ className: `juno-tabpanel ${c2}`, selectedClassName: "juno-tabpanel-selected" }, d), b6);
TabPanel2.tabsRole = "TabPanel", TabPanel2.propTypes = { children: import_prop_types82.default.node, className: import_prop_types82.default.string }, TabPanel2.defaultProps = { children: null, className: "" };

// node_modules/juno-ui-components/build/Textarea.component-0a616ebd.js
var import_react84 = __toESM(require_react());
var import_prop_types83 = __toESM(require_prop_types());
var textareastyles = `
	jn-bg-theme-textinput
	jn-text-theme-textinput
	jn-text-base
	jn-leading-4
	jn-p-3
	jn-rounded-3px
	jn-h-[14rem]
	jn-border
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
	disabled:jn-opacity-50
`;
var defaultborderstyles3 = `
	jn-border-transparent
`;
var invalidstyles2 = `
	jn-border-theme-error
`;
var validstyles2 = `
	jn-border-theme-success
`;
var Textarea = ({ name: a, value: b6, placeholder: c2, className: d, autoComplete: e, autoFocus: f, invalid: g, valid: h, onChange: i, ...j }) => {
  const [k, l] = (0, import_react84.useState)(""), [m, n] = (0, import_react84.useState)(false), [o2, p] = (0, import_react84.useState)(false);
  (0, import_react84.useEffect)(() => {
    l(b6);
  }, [b6]), (0, import_react84.useEffect)(() => {
    n(g);
  }, [g]), (0, import_react84.useEffect)(() => {
    p(h);
  }, [h]);
  return import_react84.default.createElement("textarea", _extends({ name: a || "unnamed textarea", value: k, autoComplete: e, autoFocus: f, placeholder: c2, onChange: (a2) => {
    l(a2.target.value), i && i(a2);
  }, className: `juno-textarea ${textareastyles} ${m ? "juno-textarea-invalid " + invalidstyles2 : ""} ${o2 ? "juno-textarea-valid " + validstyles2 : ""} ${m || o2 ? "" : defaultborderstyles3} ${d}` }, j));
};
Textarea.propTypes = { name: import_prop_types83.default.string, value: import_prop_types83.default.string, placeholder: import_prop_types83.default.string, autoComplete: import_prop_types83.default.oneOf(["on", "off"]), autoFocus: import_prop_types83.default.bool, invalid: import_prop_types83.default.bool, valid: import_prop_types83.default.bool, className: import_prop_types83.default.string, onChange: import_prop_types83.default.func }, Textarea.defaultProps = { name: null, value: "", placeholder: "", autoComplete: null, autoFocus: false, invalid: false, valid: false, className: "", onChange: void 0 };

// node_modules/juno-ui-components/build/TextareaRow.component-75850788.js
var import_react85 = __toESM(require_react());
var import_prop_types84 = __toESM(require_prop_types());
var stackedcontainerstyles = `
	jn-flex
	jn-flex-col
	jn-mb-2
`;
var floatingcontainerstyles2 = `
	jn-relative
	jn-mb-2
`;
var floatinglabelcontainerstyles2 = (a) => `
    jn-absolute
    jn-top-0
    jn-left-0
    jn-p-2.5
    jn-pl-3
    jn-pt-[0.4325rem]
    jn-pointer-events-none
    jn-transform 
    jn-origin-top-left 
    jn-transition-all 
    jn-duration-100 
    jn-ease-in-out
    jn-z-10

    ${a && `
      jn-scale-75
      jn-opacity-75
      -jn-translate-y-2
      jn-translate-x-1
      `}
  `;
var floatinginputstyles = (a) => `
    ${a ? `
      jn-px-4
      jn-pt-[1.125]
      jn-pb-1
      ` : `
      jn-p-3 
      jn-pt-4
      `}
    jn-placeholder-transparent
    jn-w-full
  `;
var inputcontainerstyles = `
  jn-relative
`;
var helptextstyles5 = `
	jn-text-xs
	jn-text-theme-light
	jn-mt-1
`;
var errortextstyles7 = `
  jn-text-xs
  jn-text-theme-error
  jn-mt-1
`;
var successtextstyles7 = `
  jn-text-xs
  jn-text-theme-success
  jn-mt-1
`;
var stackedinputstyles = `
	jn-w-full
`;
var iconcontainerstyles = `
  jn-flex
  jn-absolute
  jn-top-1.5
  jn-right-3
`;
var disablediconstyles2 = `
  jn-opacity-50
`;
var iconpadding = `
  jn-pr-10
`;
var getContainerStyles = (a) => "stacked" === a ? stackedcontainerstyles : floatingcontainerstyles2;
var getLabelContainerStyles = (a, b6) => "stacked" === a ? "" : floatinglabelcontainerstyles2(b6);
var getInputStyles = (a, b6) => "stacked" === a ? stackedinputstyles : floatinginputstyles(b6);
var TextareaRow = ({ value: a, variant: b6, name: c2, label: d, id: e, placeholder: f, helptext: g, required: h, invalid: i, errortext: j, valid: k, successtext: l, className: m, disabled: n, onChange: o2, ...p }) => {
  const [q, r2] = (0, import_react85.useState)(""), [s, t] = (0, import_react85.useState)(false), [u, v] = (0, import_react85.useState)(false), [w, x] = (0, import_react85.useState)(false);
  import_react85.default.useEffect(() => {
    r2(a);
  }, [a]);
  const y = (0, import_react85.useMemo)(() => i || !!(j && j.length), [i, j]), z = (0, import_react85.useMemo)(() => k || !!(l && l.length), [k, l]);
  (0, import_react85.useEffect)(() => {
    v(y);
  }, [y]), (0, import_react85.useEffect)(() => {
    x(z);
  }, [z]);
  const A = (a2, b7, c3) => !!("floating" === a2 && (c3 || b7 && 0 < b7.length));
  return import_react85.default.createElement("div", _extends({ className: `juno-textarea-row juno-textarea-row-${b6} ${getContainerStyles(b6)} ${m}` }, p), import_react85.default.createElement("div", { className: `juno-label-container ${getLabelContainerStyles(b6, A(b6, q, s))}` }, import_react85.default.createElement(Label, { text: d, htmlFor: e, required: h, variant: b6, disabled: !!("stacked" === b6 && n) && n })), import_react85.default.createElement("div", { className: `juno-input-container ${inputcontainerstyles}` }, import_react85.default.createElement(Textarea, { value: q, name: c2, id: e, placeholder: f, disabled: n, invalid: u, valid: w, onChange: (a2) => {
    r2(a2.target.value), o2 && o2(a2);
  }, onFocus: () => t(true), onBlur: () => t(false), className: `${getInputStyles(b6, A(b6, q, s))} ${(() => w || u ? iconpadding : "")()}` }), import_react85.default.createElement(({ disabled: a2 }) => w || u ? import_react85.default.createElement("div", { className: `juno-textinput-row-icon-container ${iconcontainerstyles} ${a2 ? disablediconstyles2 : ""}` }, u ? import_react85.default.createElement(Icon, { icon: "dangerous", color: "jn-text-theme-error" }) : null, w ? import_react85.default.createElement(Icon, { icon: "checkCircle", color: "jn-text-theme-success" }) : null) : "", { disabled: n }), j && j.length ? import_react85.default.createElement("p", { className: `${errortextstyles7}` }, j) : null, l && l.length ? import_react85.default.createElement("p", { className: `${successtextstyles7}` }, l) : null, g ? import_react85.default.createElement("p", { className: `${helptextstyles5}` }, g) : null));
};
TextareaRow.propTypes = { value: import_prop_types84.default.string, name: import_prop_types84.default.string, label: import_prop_types84.default.string, id: import_prop_types84.default.string, helptext: import_prop_types84.default.node, placeholder: import_prop_types84.default.string, required: import_prop_types84.default.bool, invalid: import_prop_types84.default.bool, errortext: import_prop_types84.default.string, valid: import_prop_types84.default.bool, successtext: import_prop_types84.default.string, className: import_prop_types84.default.string, variant: import_prop_types84.default.oneOf(["floating", "stacked"]), disabled: import_prop_types84.default.bool, onChange: import_prop_types84.default.func }, TextareaRow.defaultProps = { value: "", variant: "floating", name: null, label: null, id: null, placeholder: null, required: null, invalid: false, errortext: "", valid: false, successtext: "", helptext: null, className: "", disabled: null, onChange: void 0 };

// node_modules/juno-ui-components/build/TextInputRow.component-e52922a0.js
var import_react86 = __toESM(require_react());
var import_prop_types85 = __toESM(require_prop_types());
var stackedcontainerstyles2 = `
	jn-flex
	jn-flex-col
  jn-mb-2
`;
var floatingcontainerstyles3 = `
	jn-relative
	jn-mb-2
`;
var floatinglabelcontainerstyles3 = (a) => `
    jn-absolute
    jn-top-0
    jn-left-0
    jn-p-2.5
    jn-pl-3
    jn-pt-[0.4325rem]
    jn-pointer-events-none
    jn-transform 
    jn-origin-top-left 
    jn-transition-all 
    jn-duration-100 
    jn-ease-in-out
    jn-z-10

    ${a && `
      jn-scale-75
      jn-opacity-75
      -jn-translate-y-1
      jn-translate-x-2
      `}
  `;
var floatinginputstyles2 = (a) => `
    ${a ? `
      jn-px-4
      jn-pt-[1.125rem]
      jn-pb-1  
      ` : `
      jn-p-4 
      jn-pt-4
      `}
    jn-placeholder-transparent
    jn-w-full
  `;
var inputcontainerstyles2 = `
  jn-relative
`;
var helptextstyles6 = `
	jn-text-xs
	jn-text-theme-light
	jn-mt-1
`;
var errortextstyles8 = `
  jn-text-xs
  jn-text-theme-error
  jn-mt-1
`;
var successtextstyles8 = `
  jn-text-xs
  jn-text-theme-success
  jn-mt-1
`;
var iconcontainerstyles2 = `
  jn-inline-flex
  jn-absolute
  jn-top-[.4rem]
  jn-right-3
`;
var disablediconstyles3 = `
  jn-opacity-50
`;
var stackedinputstyles2 = `
	jn-w-full
`;
var iconpadding2 = `
  jn-pr-10
`;
var getContainerStyles2 = (a) => "stacked" === a ? stackedcontainerstyles2 : floatingcontainerstyles3;
var getLabelContainerStyles2 = (a, b6) => "stacked" === a ? "" : floatinglabelcontainerstyles3(b6);
var getInputStyles2 = (a, b6) => "stacked" === a ? stackedinputstyles2 : floatinginputstyles2(b6);
var TextInputRow = ({ type: a, variant: b6, value: c2, name: d, label: e, id: f, placeholder: g, helptext: h, required: i, invalid: j, errortext: k, valid: l, successtext: m, autoFocus: n, className: o2, disabled: p, onChange: q, onFocus: r2, onBlur: s, ...t }) => {
  const [u, v] = (0, import_react86.useState)(""), [w, x] = (0, import_react86.useState)(false), [y, z] = (0, import_react86.useState)(false), [A, B] = (0, import_react86.useState)(false);
  import_react86.default.useEffect(() => {
    v(c2);
  }, [c2]);
  const C = (0, import_react86.useMemo)(() => j || !!(k && k.length), [j, k]), D = (0, import_react86.useMemo)(() => l || !!(m && m.length), [l, m]);
  (0, import_react86.useEffect)(() => {
    z(C);
  }, [C]), (0, import_react86.useEffect)(() => {
    B(D);
  }, [D]), (0, import_react86.useEffect)(() => {
    x(n);
  }, [n]);
  const E = (a2, b7, c3) => !!("floating" === a2 && (c3 || b7 && 0 < b7.length));
  return import_react86.default.createElement("div", _extends({ className: `juno-textinput-row juno-textinput-row-${b6} ${getContainerStyles2(b6)} ${o2}` }, t), import_react86.default.createElement("div", { className: `juno-label-container ${getLabelContainerStyles2(b6, E(b6, u, w))}` }, import_react86.default.createElement(Label, { text: e, htmlFor: f, required: i, variant: b6, disabled: !!("stacked" === b6 && p) && p })), import_react86.default.createElement("div", { className: `juno-input-container ${inputcontainerstyles2}` }, import_react86.default.createElement(TextInput, { type: a, value: u, name: d, id: f, placeholder: g, disabled: p, invalid: y, valid: A, autoFocus: n, onChange: (a2) => {
    v(a2.target.value), q && q(a2);
  }, onFocus: (a2) => {
    x(true), r2 && r2(a2);
  }, onBlur: (a2) => {
    x(false), s && s(a2);
  }, className: `${getInputStyles2(b6, E(b6, u, w))} ${(() => A || y ? iconpadding2 : "")()}` }), import_react86.default.createElement(({ disabled: a2 }) => A || y ? import_react86.default.createElement("div", { className: `juno-textinput-row-icon-container ${iconcontainerstyles2} ${a2 ? disablediconstyles3 : ""}` }, y ? import_react86.default.createElement(Icon, { icon: "dangerous", color: "jn-text-theme-error" }) : null, A ? import_react86.default.createElement(Icon, { icon: "checkCircle", color: "jn-text-theme-success" }) : null) : "", { disabled: p }), k && k.length ? import_react86.default.createElement("p", { className: `${errortextstyles8}` }, k) : null, m && m.length ? import_react86.default.createElement("p", { className: `${successtextstyles8}` }, m) : null, h ? import_react86.default.createElement("p", { className: `${helptextstyles6}` }, h) : null));
};
TextInputRow.propTypes = { type: import_prop_types85.default.oneOf(["text", "password", "email", "tel", "url", "number"]), variant: import_prop_types85.default.oneOf(["floating", "stacked"]), value: import_prop_types85.default.string, name: import_prop_types85.default.string, label: import_prop_types85.default.string, id: import_prop_types85.default.string, placeholder: import_prop_types85.default.string, helptext: import_prop_types85.default.node, required: import_prop_types85.default.bool, invalid: import_prop_types85.default.bool, errortext: import_prop_types85.default.string, valid: import_prop_types85.default.bool, successtext: import_prop_types85.default.string, autoFocus: import_prop_types85.default.bool, className: import_prop_types85.default.string, disabled: import_prop_types85.default.bool, onChange: import_prop_types85.default.func, onFocus: import_prop_types85.default.func, onBlur: import_prop_types85.default.func }, TextInputRow.defaultProps = { type: null, variant: "floating", value: "", name: null, label: null, id: null, placeholder: null, helptext: null, required: null, invalid: false, errortext: "", valid: false, successtext: "", autoFocus: false, className: "", disabled: null, onChange: void 0, onFocus: void 0, onBlur: void 0 };

// node_modules/juno-ui-components/build/Toast.component-bd504af5.js
var import_react87 = __toESM(require_react());
var import_prop_types86 = __toESM(require_prop_types());
var toastStyles = `
	jn-bg-theme-background-lvl-1
	jn-text-theme-high 
	jn-inline-flex	
	jn-items-start
	jn-p-2
	jn-mb-8
	jn-rounded
`;
var toastStylesText = `
	jn-mx-4
	jn-max-w-full
`;
var getMuiIcon2 = (a) => "error" === a ? "dangerous" : a;
var Toast = ({ variant: a, children: b6, text: c2, autoDismiss: d, autoDismissTimeout: e, onDismiss: f, className: g, ...h }) => {
  const [i, j] = (0, import_react87.useState)(true), k = import_react87.default.useRef(null);
  import_react87.default.useEffect(() => () => clearTimeout(k.current), []), (0, import_react87.useEffect)(() => {
    d && (clearTimeout(k.current), k.current = setTimeout(() => l(), e));
  }, [d, e]);
  const l = () => {
    j(false), f && f();
  };
  return import_react87.default.createElement(import_react87.default.Fragment, null, i && import_react87.default.createElement("div", _extends({ className: `juno-toast juno-toast-${a} ${toastStyles} ${g}` }, h), import_react87.default.createElement(Icon, { icon: getMuiIcon2(a), color: "jn-text-theme-" + a, className: "jn-shrink-0" }), import_react87.default.createElement("div", { className: `juno-toast-text ${toastStylesText}` }, b6 ? b6 : c2), import_react87.default.createElement(Icon, { icon: "close", onClick: l, className: "juno-message-close-button jn-opacity-50 hover:jn-opacity-100 jn-shrink-0" })));
};
Toast.propTypes = { variant: import_prop_types86.default.oneOf(["info", "warning", "danger", "error", "success"]), children: import_prop_types86.default.node, text: import_prop_types86.default.string, autoDismiss: import_prop_types86.default.bool, autoDismissTimeout: import_prop_types86.default.number, onDismiss: import_prop_types86.default.func, className: import_prop_types86.default.string }, Toast.defaultProps = { variant: "info", children: null, text: "", autoDismiss: false, autoDismissTimeout: 1e4, onDismiss: void 0, className: "" };

// node_modules/juno-ui-components/build/Tooltip.component-bcc2e16c.js
var React6 = __toESM(require_react());
var import_react88 = __toESM(require_react());
var import_prop_types87 = __toESM(require_prop_types());
var ReactDOM2 = __toESM(require_react_dom());
function getAlignment2(e) {
  return e.split("-")[1];
}
function getLengthFromAxis2(e) {
  return "y" === e ? "height" : "width";
}
function getSide2(e) {
  return e.split("-")[0];
}
function getMainAxisFromPlacement2(e) {
  return ["top", "bottom"].includes(getSide2(e)) ? "x" : "y";
}
function computeCoordsFromPlacement2(e, t, n) {
  let { reference: r2, floating: o2 } = e;
  const i = r2.x + r2.width / 2 - o2.width / 2, s = r2.y + r2.height / 2 - o2.height / 2, d = getMainAxisFromPlacement2(t), l = getLengthFromAxis2(d), c2 = r2[l] / 2 - o2[l] / 2, a = getSide2(t), f = "x" === d;
  let u;
  switch (u = "top" === a ? { x: i, y: r2.y - o2.height } : "bottom" === a ? { x: i, y: r2.y + r2.height } : "right" === a ? { x: r2.x + r2.width, y: s } : "left" === a ? { x: r2.x - o2.width, y: s } : { x: r2.x, y: r2.y }, getAlignment2(t)) {
    case "start":
      u[d] -= c2 * (n && f ? -1 : 1);
      break;
    case "end":
      u[d] += c2 * (n && f ? -1 : 1);
  }
  return u;
}
var computePosition$12 = async (e, t, n) => {
  const { placement: o2 = "bottom", strategy: s = "absolute", middleware: d = [], platform: r2 } = n, l = d.filter(Boolean), c2 = await (null == r2.isRTL ? void 0 : r2.isRTL(t));
  let a = await r2.getElementRects({ reference: e, floating: t, strategy: s }), { x: f, y: u } = computeCoordsFromPlacement2(a, o2, c2), m = o2, p = {}, g = 0;
  for (let d2 = 0; d2 < l.length; d2++) {
    const { name: n2, fn: i } = l[d2], { x: h, y, data: v, reset: x } = await i({ x: f, y: u, initialPlacement: o2, placement: m, strategy: s, middlewareData: p, rects: a, platform: r2, elements: { reference: e, floating: t } });
    if (f = null == h ? f : h, u = null == y ? u : y, p = { ...p, [n2]: { ...p[n2], ...v } }, x && 50 >= g) {
      g++, "object" == typeof x && (x.placement && (m = x.placement), x.rects && (a = true === x.rects ? await r2.getElementRects({ reference: e, floating: t, strategy: s }) : x.rects), { x: f, y: u } = computeCoordsFromPlacement2(a, m, c2)), d2 = -1;
      continue;
    }
  }
  return { x: f, y: u, placement: m, strategy: s, middlewareData: p };
};
function expandPaddingObject2(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function getSideObjectFromPadding2(e) {
  return "number" == typeof e ? { top: e, right: e, bottom: e, left: e } : expandPaddingObject2(e);
}
function rectToClientRect2(e) {
  return { ...e, top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height };
}
async function detectOverflow2(e, t) {
  var n;
  void 0 === t && (t = {});
  const { x: r2, y: o2, platform: i, rects: s, elements: d, strategy: l } = e, { boundary: c2 = "clippingAncestors", rootBoundary: a = "viewport", elementContext: f = "floating", altBoundary: u = false, padding: m = 0 } = t, p = getSideObjectFromPadding2(m), g = "floating" === f ? "reference" : "floating", h = d[u ? g : f], y = rectToClientRect2(await i.getClippingRect({ element: !(null != (n = await (null == i.isElement ? void 0 : i.isElement(h)))) || n ? h : h.contextElement || await (null == i.getDocumentElement ? void 0 : i.getDocumentElement(d.floating)), boundary: c2, rootBoundary: a, strategy: l })), v = "floating" === f ? { ...s.floating, x: r2, y: o2 } : s.reference, x = await (null == i.getOffsetParent ? void 0 : i.getOffsetParent(d.floating)), b6 = await (null == i.isElement ? void 0 : i.isElement(x)) ? await (null == i.getScale ? void 0 : i.getScale(x)) || { x: 1, y: 1 } : { x: 1, y: 1 }, E = rectToClientRect2(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: v, offsetParent: x, strategy: l }) : v);
  return { top: (y.top - E.top + p.top) / b6.y, bottom: (E.bottom - y.bottom + p.bottom) / b6.y, left: (y.left - E.left + p.left) / b6.x, right: (E.right - y.right + p.right) / b6.x };
}
var min$12 = Math.min;
var max$12 = Math.max;
function within2(e, t, n) {
  return max$12(e, min$12(t, n));
}
var oppositeSideMap = { left: "right", right: "left", bottom: "top", top: "bottom" };
function getOppositePlacement2(e) {
  return e.replace(/left|right|bottom|top/g, (e2) => oppositeSideMap[e2]);
}
function getAlignmentSides2(e, t, n) {
  void 0 === n && (n = false);
  const r2 = getAlignment2(e), o2 = getMainAxisFromPlacement2(e), i = getLengthFromAxis2(o2);
  let s = "x" === o2 ? r2 === (n ? "end" : "start") ? "right" : "left" : "start" === r2 ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = getOppositePlacement2(s)), { main: s, cross: getOppositePlacement2(s) };
}
var oppositeAlignmentMap = { start: "end", end: "start" };
function getOppositeAlignmentPlacement2(e) {
  return e.replace(/start|end/g, (e2) => oppositeAlignmentMap[e2]);
}
function getExpandedPlacements2(e) {
  const t = getOppositePlacement2(e);
  return [getOppositeAlignmentPlacement2(e), t, getOppositeAlignmentPlacement2(t)];
}
function getSideList(e, t, n) {
  const r2 = ["left", "right"], o2 = ["right", "left"];
  return "top" === e || "bottom" === e ? n ? t ? o2 : r2 : t ? r2 : o2 : "left" === e || "right" === e ? t ? ["top", "bottom"] : ["bottom", "top"] : [];
}
function getOppositeAxisPlacements(e, t, n, r2) {
  const o2 = getAlignment2(e);
  let i = getSideList(getSide2(e), "start" === n, r2);
  return o2 && (i = i.map((e2) => e2 + "-" + o2), t && (i = i.concat(i.map(getOppositeAlignmentPlacement2)))), i;
}
var flip2 = function(e) {
  return void 0 === e && (e = {}), { name: "flip", options: e, async fn(t) {
    var n;
    const { placement: r2, middlewareData: o2, rects: i, initialPlacement: s, platform: d, elements: l } = t, { mainAxis: f = true, crossAxis: u = true, fallbackPlacements: c2, fallbackStrategy: m = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: g = true, ...a } = e, h = getSide2(r2), y = getSide2(s) === s, v = await (null == d.isRTL ? void 0 : d.isRTL(l.floating)), x = c2 || (y || !g ? [getOppositePlacement2(s)] : getExpandedPlacements2(s));
    c2 || "none" === p || x.push(...getOppositeAxisPlacements(s, g, p, v));
    const b6 = [s, ...x], E = await detectOverflow2(t, a), w = [];
    let R = (null == (n = o2.flip) ? void 0 : n.overflows) || [];
    if (f && w.push(E[h]), u) {
      const { main: e2, cross: t2 } = getAlignmentSides2(r2, i, v);
      w.push(E[e2], E[t2]);
    }
    if (R = [...R, { placement: r2, overflows: w }], !w.every((e2) => 0 >= e2)) {
      var L, k;
      const e2 = ((null == (L = o2.flip) ? void 0 : L.index) || 0) + 1, t2 = b6[e2];
      if (t2)
        return { data: { index: e2, overflows: R }, reset: { placement: t2 } };
      let n2 = null == (k = R.filter((e3) => 0 >= e3.overflows[0]).sort((e3, t3) => e3.overflows[1] - t3.overflows[1])[0]) ? void 0 : k.placement;
      if (!n2)
        switch (m) {
          case "bestFit": {
            var C;
            const e3 = null == (C = R.map((e4) => [e4.placement, e4.overflows.filter((e5) => 0 < e5).reduce((e5, t3) => e5 + t3, 0)]).sort((e4, t3) => e4[1] - t3[1])[0]) ? void 0 : C[0];
            e3 && (n2 = e3);
            break;
          }
          case "initialPlacement":
            n2 = s;
        }
      if (r2 !== n2)
        return { reset: { placement: n2 } };
    }
    return {};
  } };
};
async function convertValueToCoords2(e, t) {
  const { placement: n, platform: r2, elements: o2 } = e, i = await (null == r2.isRTL ? void 0 : r2.isRTL(o2.floating)), s = getSide2(n), d = getAlignment2(n), l = "x" === getMainAxisFromPlacement2(n), c2 = ["left", "top"].includes(s) ? -1 : 1, a = i && l ? -1 : 1, f = "function" == typeof t ? t(e) : t;
  let { mainAxis: u, crossAxis: m, alignmentAxis: p } = "number" == typeof f ? { mainAxis: f, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...f };
  return d && "number" == typeof p && (m = "end" === d ? -1 * p : p), l ? { x: m * a, y: u * c2 } : { x: u * c2, y: m * a };
}
var offset2 = function(e) {
  return void 0 === e && (e = 0), { name: "offset", options: e, async fn(t) {
    const { x: n, y: r2 } = t, o2 = await convertValueToCoords2(t, e);
    return { x: n + o2.x, y: r2 + o2.y, data: o2 };
  } };
};
function getCrossAxis2(e) {
  return "x" === e ? "y" : "x";
}
var shift2 = function(e) {
  return void 0 === e && (e = {}), { name: "shift", options: e, async fn(t) {
    const { x: n, y: r2, placement: o2 } = t, { mainAxis: s = true, crossAxis: d = false, limiter: l = { fn: (e2) => {
      let { x: t2, y: n2 } = e2;
      return { x: t2, y: n2 };
    } }, ...i } = e, c2 = { x: n, y: r2 }, a = await detectOverflow2(t, i), f = getMainAxisFromPlacement2(getSide2(o2)), u = getCrossAxis2(f);
    let m = c2[f], p = c2[u];
    if (s) {
      const e2 = "y" === f ? "top" : "left", t2 = "y" === f ? "bottom" : "right", n2 = m + a[e2], r3 = m - a[t2];
      m = within2(n2, m, r3);
    }
    if (d) {
      const e2 = "y" === u ? "top" : "left", t2 = "y" === u ? "bottom" : "right", n2 = p + a[e2], r3 = p - a[t2];
      p = within2(n2, p, r3);
    }
    const g = l.fn({ ...t, [f]: m, [u]: p });
    return { ...g, data: { x: g.x - n, y: g.y - r2 } };
  } };
};
function getWindow$1(e) {
  var t;
  return (null == (t = e.ownerDocument) ? void 0 : t.defaultView) || window;
}
function getComputedStyle$12(e) {
  return getWindow$1(e).getComputedStyle(e);
}
function isNode3(e) {
  return e instanceof getWindow$1(e).Node;
}
function getNodeName2(e) {
  return isNode3(e) ? (e.nodeName || "").toLowerCase() : "";
}
var uaString;
function getUAString2() {
  if (uaString)
    return uaString;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (uaString = e.brands.map((e2) => e2.brand + "/" + e2.version).join(" "), uaString) : navigator.userAgent;
}
function isHTMLElement$1(e) {
  return e instanceof getWindow$1(e).HTMLElement;
}
function isElement$1(e) {
  return e instanceof getWindow$1(e).Element;
}
function isShadowRoot2(e) {
  if ("undefined" == typeof ShadowRoot)
    return false;
  const t = getWindow$1(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function isOverflowElement2(e) {
  const { overflow: t, overflowX: n, overflowY: r2, display: o2 } = getComputedStyle$12(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r2 + n) && !["inline", "contents"].includes(o2);
}
function isTableElement2(e) {
  return ["table", "td", "th"].includes(getNodeName2(e));
}
function isContainingBlock2(e) {
  const t = /firefox/i.test(getUAString2()), n = getComputedStyle$12(e), r2 = n.backdropFilter || n.WebkitBackdropFilter;
  return "none" !== n.transform || "none" !== n.perspective || !!r2 && "none" !== r2 || t && "filter" === n.willChange || t && !!n.filter && "none" !== n.filter || ["transform", "perspective"].some((e2) => n.willChange.includes(e2)) || ["paint", "layout", "strict", "content"].some((e2) => {
    const t2 = n.contain;
    return null != t2 && t2.includes(e2);
  });
}
function isClientRectVisualViewportBased() {
  return /^((?!chrome|android).)*safari/i.test(getUAString2());
}
function isLastTraversableNode(e) {
  return ["html", "body", "#document"].includes(getNodeName2(e));
}
var min2 = Math.min;
var max2 = Math.max;
var round2 = Math.round;
function getCssDimensions(e) {
  const t = getComputedStyle$12(e);
  let n = parseFloat(t.width), r2 = parseFloat(t.height);
  const o2 = isHTMLElement$1(e), i = o2 ? e.offsetWidth : n, s = o2 ? e.offsetHeight : r2, d = round2(n) !== i || round2(r2) !== s;
  return d && (n = i, r2 = s), { width: n, height: r2, fallback: d };
}
function unwrapElement(e) {
  return isElement$1(e) ? e : e.contextElement;
}
var FALLBACK_SCALE = { x: 1, y: 1 };
function getScale(e) {
  var t = Number.isFinite;
  const n = unwrapElement(e);
  if (!isHTMLElement$1(n))
    return FALLBACK_SCALE;
  const r2 = n.getBoundingClientRect(), { width: o2, height: i, fallback: s } = getCssDimensions(n);
  let d = (s ? round2(r2.width) : r2.width) / o2, l = (s ? round2(r2.height) : r2.height) / i;
  return d && t(d) || (d = 1), l && t(l) || (l = 1), { x: d, y: l };
}
function getBoundingClientRect2(e, t, n, r2) {
  var o2, i;
  void 0 === t && (t = false), void 0 === n && (n = false);
  const s = e.getBoundingClientRect(), d = unwrapElement(e);
  let l = FALLBACK_SCALE;
  t && (r2 ? isElement$1(r2) && (l = getScale(r2)) : l = getScale(e));
  const c2 = d ? getWindow$1(d) : window, a = isClientRectVisualViewportBased() && n;
  let f = (s.left + (a ? (null == (o2 = c2.visualViewport) ? void 0 : o2.offsetLeft) || 0 : 0)) / l.x, u = (s.top + (a ? (null == (i = c2.visualViewport) ? void 0 : i.offsetTop) || 0 : 0)) / l.y, m = s.width / l.x, p = s.height / l.y;
  if (d) {
    const e2 = getWindow$1(d), t2 = r2 && isElement$1(r2) ? getWindow$1(r2) : r2;
    for (let n2 = e2.frameElement; n2 && r2 && t2 !== e2; ) {
      const e3 = getScale(n2), t3 = n2.getBoundingClientRect(), r3 = getComputedStyle(n2);
      t3.x += (n2.clientLeft + parseFloat(r3.paddingLeft)) * e3.x, t3.y += (n2.clientTop + parseFloat(r3.paddingTop)) * e3.y, f *= e3.x, u *= e3.y, m *= e3.x, p *= e3.y, f += t3.x, u += t3.y, n2 = getWindow$1(n2).frameElement;
    }
  }
  return rectToClientRect2({ width: m, height: p, x: f, y: u });
}
function getDocumentElement2(e) {
  return ((isNode3(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function getNodeScroll2(e) {
  return isElement$1(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function convertOffsetParentRelativeRectToViewportRelativeRect2(e) {
  let { rect: t, offsetParent: n, strategy: r2 } = e;
  const o2 = isHTMLElement$1(n), i = getDocumentElement2(n);
  if (n === i)
    return t;
  let s = { scrollLeft: 0, scrollTop: 0 }, d = { x: 1, y: 1 };
  const l = { x: 0, y: 0 };
  if ((o2 || !o2 && "fixed" !== r2) && (("body" !== getNodeName2(n) || isOverflowElement2(i)) && (s = getNodeScroll2(n)), isHTMLElement$1(n))) {
    const e2 = getBoundingClientRect2(n);
    d = getScale(n), l.x = e2.x + n.clientLeft, l.y = e2.y + n.clientTop;
  }
  return { width: t.width * d.x, height: t.height * d.y, x: t.x * d.x - s.scrollLeft * d.x + l.x, y: t.y * d.y - s.scrollTop * d.y + l.y };
}
function getWindowScrollBarX2(e) {
  return getBoundingClientRect2(getDocumentElement2(e)).left + getNodeScroll2(e).scrollLeft;
}
function getDocumentRect2(e) {
  const t = getDocumentElement2(e), n = getNodeScroll2(e), r2 = e.ownerDocument.body, o2 = max2(t.scrollWidth, t.clientWidth, r2.scrollWidth, r2.clientWidth), i = max2(t.scrollHeight, t.clientHeight, r2.scrollHeight, r2.clientHeight);
  let s = -n.scrollLeft + getWindowScrollBarX2(e);
  const d = -n.scrollTop;
  return "rtl" === getComputedStyle$12(r2).direction && (s += max2(t.clientWidth, r2.clientWidth) - o2), { width: o2, height: i, x: s, y: d };
}
function getParentNode2(e) {
  if ("html" === getNodeName2(e))
    return e;
  const t = e.assignedSlot || e.parentNode || isShadowRoot2(e) && e.host || getDocumentElement2(e);
  return isShadowRoot2(t) ? t.host : t;
}
function getNearestOverflowAncestor2(e) {
  const t = getParentNode2(e);
  return isLastTraversableNode(t) ? t.ownerDocument.body : isHTMLElement$1(t) && isOverflowElement2(t) ? t : getNearestOverflowAncestor2(t);
}
function getOverflowAncestors2(e, t) {
  var n;
  void 0 === t && (t = []);
  const r2 = getNearestOverflowAncestor2(e), o2 = r2 === (null == (n = e.ownerDocument) ? void 0 : n.body), i = getWindow$1(r2);
  return o2 ? t.concat(i, i.visualViewport || [], isOverflowElement2(r2) ? r2 : []) : t.concat(r2, getOverflowAncestors2(r2));
}
function getViewportRect2(e, t) {
  const n = getWindow$1(e), r2 = getDocumentElement2(e), o2 = n.visualViewport;
  let i = r2.clientWidth, s = r2.clientHeight, d = 0, l = 0;
  if (o2) {
    i = o2.width, s = o2.height;
    const e2 = isClientRectVisualViewportBased();
    (!e2 || e2 && "fixed" === t) && (d = o2.offsetLeft, l = o2.offsetTop);
  }
  return { width: i, height: s, x: d, y: l };
}
function getInnerBoundingClientRect2(e, t) {
  const n = getBoundingClientRect2(e, true, "fixed" === t), r2 = n.top + e.clientTop, o2 = n.left + e.clientLeft, i = isHTMLElement$1(e) ? getScale(e) : { x: 1, y: 1 }, s = e.clientWidth * i.x, d = e.clientHeight * i.y, l = o2 * i.x, c2 = r2 * i.y;
  return { width: s, height: d, x: l, y: c2 };
}
function getClientRectFromClippingAncestor2(e, t, n) {
  let r2;
  if ("viewport" === t)
    r2 = getViewportRect2(e, n);
  else if ("document" === t)
    r2 = getDocumentRect2(getDocumentElement2(e));
  else if (isElement$1(t))
    r2 = getInnerBoundingClientRect2(t, n);
  else {
    const n2 = { ...t };
    if (isClientRectVisualViewportBased()) {
      var o2, i;
      const t2 = getWindow$1(e);
      n2.x -= (null == (o2 = t2.visualViewport) ? void 0 : o2.offsetLeft) || 0, n2.y -= (null == (i = t2.visualViewport) ? void 0 : i.offsetTop) || 0;
    }
    r2 = n2;
  }
  return rectToClientRect2(r2);
}
function getClippingElementAncestors(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r2 = getOverflowAncestors2(e).filter((e2) => isElement$1(e2) && "body" !== getNodeName2(e2)), o2 = null;
  const i = "fixed" === getComputedStyle$12(e).position;
  for (let n2 = i ? getParentNode2(e) : e; isElement$1(n2) && !isLastTraversableNode(n2); ) {
    const e2 = getComputedStyle$12(n2), t2 = isContainingBlock2(n2), s = "fixed" === e2.position;
    if (s)
      o2 = null;
    else {
      const s2 = i ? !t2 && !o2 : !t2 && "static" === e2.position && !!o2 && ["absolute", "fixed"].includes(o2.position);
      s2 ? r2 = r2.filter((e3) => e3 !== n2) : o2 = e2;
    }
    n2 = getParentNode2(n2);
  }
  return t.set(e, r2), r2;
}
function getClippingRect2(e) {
  let { element: t, boundary: n, rootBoundary: r2, strategy: o2 } = e;
  const i = "clippingAncestors" === n ? getClippingElementAncestors(t, this._c) : [].concat(n), s = [...i, r2], d = s[0], l = s.reduce((e2, n2) => {
    const r3 = getClientRectFromClippingAncestor2(t, n2, o2);
    return e2.top = max2(r3.top, e2.top), e2.right = min2(r3.right, e2.right), e2.bottom = min2(r3.bottom, e2.bottom), e2.left = max2(r3.left, e2.left), e2;
  }, getClientRectFromClippingAncestor2(t, d, o2));
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}
function getDimensions2(e) {
  return getCssDimensions(e);
}
function getTrueOffsetParent2(e, t) {
  return isHTMLElement$1(e) && "fixed" !== getComputedStyle$12(e).position ? t ? t(e) : e.offsetParent : null;
}
function getContainingBlock2(e) {
  for (let t = getParentNode2(e); isHTMLElement$1(t) && !isLastTraversableNode(t); ) {
    if (isContainingBlock2(t))
      return t;
    t = getParentNode2(t);
  }
  return null;
}
function getOffsetParent2(e, t) {
  const n = getWindow$1(e);
  if (!isHTMLElement$1(e))
    return n;
  let r2 = getTrueOffsetParent2(e, t);
  for (; r2 && isTableElement2(r2) && "static" === getComputedStyle$12(r2).position; )
    r2 = getTrueOffsetParent2(r2, t);
  return r2 && ("html" === getNodeName2(r2) || "body" === getNodeName2(r2) && "static" === getComputedStyle$12(r2).position && !isContainingBlock2(r2)) ? n : r2 || getContainingBlock2(e) || n;
}
function getRectRelativeToOffsetParent2(e, t, n) {
  const r2 = isHTMLElement$1(t), o2 = getDocumentElement2(t), i = getBoundingClientRect2(e, true, "fixed" === n, t);
  let s = { scrollLeft: 0, scrollTop: 0 };
  const d = { x: 0, y: 0 };
  if (r2 || !r2 && "fixed" !== n)
    if (("body" !== getNodeName2(t) || isOverflowElement2(o2)) && (s = getNodeScroll2(t)), isHTMLElement$1(t)) {
      const e2 = getBoundingClientRect2(t, true);
      d.x = e2.x + t.clientLeft, d.y = e2.y + t.clientTop;
    } else
      o2 && (d.x = getWindowScrollBarX2(o2));
  return { x: i.left + s.scrollLeft - d.x, y: i.top + s.scrollTop - d.y, width: i.width, height: i.height };
}
var platform2 = { getClippingRect: getClippingRect2, convertOffsetParentRelativeRectToViewportRelativeRect: convertOffsetParentRelativeRectToViewportRelativeRect2, isElement: isElement$1, getDimensions: getDimensions2, getOffsetParent: getOffsetParent2, getDocumentElement: getDocumentElement2, getScale, async getElementRects(e) {
  let { reference: t, floating: n, strategy: r2 } = e;
  const o2 = this.getOffsetParent || getOffsetParent2, i = this.getDimensions;
  return { reference: getRectRelativeToOffsetParent2(t, await o2(n), r2), floating: { x: 0, y: 0, ...await i(n) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => "rtl" === getComputedStyle$12(e).direction };
function autoUpdate2(e, t, n, r2) {
  function o2() {
    const t2 = getBoundingClientRect2(e);
    m && (t2.x !== m.x || t2.y !== m.y || t2.width !== m.width || t2.height !== m.height) && n(), m = t2, u = requestAnimationFrame(o2);
  }
  void 0 === r2 && (r2 = {});
  const { ancestorScroll: i = true, ancestorResize: s = true, elementResize: d = true, animationFrame: l = false } = r2, c2 = i && !l, a = c2 || s ? [...isElement$1(e) ? getOverflowAncestors2(e) : e.contextElement ? getOverflowAncestors2(e.contextElement) : [], ...getOverflowAncestors2(t)] : [];
  a.forEach((e2) => {
    c2 && e2.addEventListener("scroll", n, { passive: true }), s && e2.addEventListener("resize", n);
  });
  let f = null;
  d && (f = new ResizeObserver(() => {
    n();
  }), isElement$1(e) && !l && f.observe(e), !isElement$1(e) && e.contextElement && !l && f.observe(e.contextElement), f.observe(t));
  let u, m = l ? getBoundingClientRect2(e) : null;
  return l && o2(), n(), () => {
    var e2;
    a.forEach((e3) => {
      c2 && e3.removeEventListener("scroll", n), s && e3.removeEventListener("resize", n);
    }), null == (e2 = f) ? void 0 : e2.disconnect(), f = null, l && cancelAnimationFrame(u);
  };
}
var computePosition2 = (e, t, n) => {
  const r2 = /* @__PURE__ */ new Map(), o2 = { platform: platform2, ...n }, i = { ...o2.platform, _c: r2 };
  return computePosition$12(e, t, { ...o2, platform: i });
};
var index$1 = "undefined" == typeof document ? import_react88.useEffect : import_react88.useLayoutEffect;
function deepEqual2(e, t) {
  if (e === t)
    return true;
  if (typeof e != typeof t)
    return false;
  if ("function" == typeof e && e.toString() === t.toString())
    return true;
  let n, r2, o2;
  if (e && t && "object" == typeof e) {
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return false;
      for (r2 = n; 0 != r2--; )
        if (!deepEqual2(e[r2], t[r2]))
          return false;
      return true;
    }
    if (o2 = Object.keys(e), n = o2.length, n !== Object.keys(t).length)
      return false;
    for (r2 = n; 0 != r2--; )
      if (!Object.prototype.hasOwnProperty.call(t, o2[r2]))
        return false;
    for (r2 = n; 0 != r2--; ) {
      const n2 = o2[r2];
      if (!("_owner" === n2 && e.$$typeof) && !deepEqual2(e[n2], t[n2]))
        return false;
    }
    return true;
  }
  return e !== e && t !== t;
}
function useLatestRef$1(e) {
  const t = React6.useRef(e);
  return index$1(() => {
    t.current = e;
  }), t;
}
function useFloating$1(e) {
  void 0 === e && (e = {});
  const { placement: o2 = "bottom", strategy: i = "absolute", middleware: s = [], platform: t, whileElementsMounted: n, open: r2 } = e, [d, l] = React6.useState({ x: null, y: null, strategy: i, placement: o2, middlewareData: {}, isPositioned: false }), [c2, a] = React6.useState(s);
  deepEqual2(c2, s) || a(s);
  const f = React6.useRef(null), u = React6.useRef(null), m = React6.useRef(d), p = useLatestRef$1(n), g = useLatestRef$1(t), [h, y] = React6.useState(null), [v, x] = React6.useState(null), b6 = React6.useCallback((e2) => {
    f.current !== e2 && (f.current = e2, y(e2));
  }, []), E = React6.useCallback((e2) => {
    u.current !== e2 && (u.current = e2, x(e2));
  }, []), w = React6.useCallback(() => {
    if (f.current && u.current) {
      const e2 = { placement: o2, strategy: i, middleware: c2 };
      g.current && (e2.platform = g.current), computePosition2(f.current, u.current, e2).then((e3) => {
        const t2 = { ...e3, isPositioned: true };
        R.current && !deepEqual2(m.current, t2) && (m.current = t2, ReactDOM2.flushSync(() => {
          l(t2);
        }));
      });
    }
  }, [c2, o2, i, g]);
  index$1(() => {
    false === r2 && m.current.isPositioned && (m.current.isPositioned = false, l((e2) => ({ ...e2, isPositioned: false })));
  }, [r2]);
  const R = React6.useRef(false);
  index$1(() => (R.current = true, () => {
    R.current = false;
  }), []), index$1(() => {
    if (h && v) {
      if (p.current)
        return p.current(h, v, w);
      w();
    }
  }, [h, v, w, p]);
  const L = React6.useMemo(() => ({ reference: f, floating: u, setReference: b6, setFloating: E }), [b6, E]), k = React6.useMemo(() => ({ reference: h, floating: v }), [h, v]);
  return React6.useMemo(() => ({ ...d, update: w, refs: L, elements: k, reference: b6, floating: E }), [d, w, L, k, b6, E]);
}
var index2 = "undefined" == typeof document ? import_react88.useEffect : import_react88.useLayoutEffect;
function createPubSub() {
  const e = /* @__PURE__ */ new Map();
  return { emit(t, n) {
    var r2;
    null == (r2 = e.get(t)) ? void 0 : r2.forEach((e2) => e2(n));
  }, on(t, n) {
    e.set(t, [...e.get(t) || [], n]);
  }, off(t, n) {
    e.set(t, (e.get(t) || []).filter((e2) => e2 !== n));
  } };
}
var serverHandoffComplete = false;
var count2 = 0;
var genId = () => "floating-ui-" + count2++;
function useFloatingId() {
  const [e, t] = React6.useState(() => serverHandoffComplete ? genId() : void 0);
  return index2(() => {
    null == e && t(genId());
  }, []), React6.useEffect(() => {
    serverHandoffComplete || (serverHandoffComplete = true);
  }, []), e;
}
var useReactId = React6["useId".toString()];
var useId = null == useReactId ? useFloatingId : useReactId;
var FloatingNodeContext = React6.createContext(null);
var FloatingTreeContext = React6.createContext(null);
var useFloatingParentNodeId = () => {
  var e, t;
  return null == (e = null == (t = React6.useContext(FloatingNodeContext)) ? void 0 : t.id) ? null : e;
};
var useFloatingTree = () => React6.useContext(FloatingTreeContext);
function getDocument(e) {
  var t;
  return null == (t = null == e ? void 0 : e.ownerDocument) ? document : t;
}
function getWindow2(e) {
  var t;
  return null == (t = getDocument(e).defaultView) ? window : t;
}
function isElement2(e) {
  return !!e && e instanceof getWindow2(e).Element;
}
function isHTMLElement2(e) {
  return !!e && e instanceof getWindow2(e).HTMLElement;
}
var useInsertionEffect2 = React6["useInsertionEffect".toString()];
function useEvent(e) {
  const t = React6.useRef(() => {
    if (true)
      throw new Error("Cannot call an event handler while rendering.");
  });
  return useInsertionEffect2 ? useInsertionEffect2(() => {
    t.current = e;
  }) : t.current = e, React6.useCallback(function() {
    for (var e2 = arguments.length, n = Array(e2), r2 = 0; r2 < e2; r2++)
      n[r2] = arguments[r2];
    return null == t.current ? void 0 : t.current(...n);
  }, []);
}
function useFloating2(e) {
  let { open: d = false, onOpenChange: t, whileElementsMounted: n, placement: r2, middleware: o2, strategy: i, nodeId: s } = void 0 === e ? {} : e;
  const [l, c2] = React6.useState(null), a = useFloatingTree(), f = React6.useRef(null), u = React6.useRef({}), m = React6.useState(() => createPubSub())[0], p = useFloating$1({ placement: r2, middleware: o2, strategy: i, whileElementsMounted: n }), g = useEvent(t), h = React6.useMemo(() => ({ ...p.refs, domReference: f }), [p.refs]), y = React6.useMemo(() => ({ ...p, refs: h, dataRef: u, nodeId: s, events: m, open: d, onOpenChange: g, _: { domReference: l } }), [p, s, m, d, g, h, l]);
  index2(() => {
    const e2 = null == a ? void 0 : a.nodesRef.current.find((e3) => e3.id === s);
    e2 && (e2.context = y);
  });
  const { reference: v } = p, x = React6.useCallback((e2) => {
    (isElement2(e2) || null === e2) && (y.refs.domReference.current = e2, c2(e2)), v(e2);
  }, [v, y.refs]);
  return React6.useMemo(() => ({ ...p, context: y, refs: h, reference: x }), [p, h, y, x]);
}
function mergeProps(e, t, n) {
  const r2 = /* @__PURE__ */ new Map();
  return { ..."floating" === n && { tabIndex: -1 }, ...e, ...t.map((e2) => e2 ? e2[n] : null).concat(e).reduce((e2, t2) => t2 ? (Object.entries(t2).forEach((t3) => {
    let [n2, o2] = t3;
    if (0 !== n2.indexOf("on"))
      e2[n2] = o2;
    else if (r2.has(n2) || r2.set(n2, []), "function" == typeof o2) {
      var i;
      null == (i = r2.get(n2)) ? void 0 : i.push(o2), e2[n2] = function() {
        for (var e3, t4 = arguments.length, o3 = Array(t4), i2 = 0; i2 < t4; i2++)
          o3[i2] = arguments[i2];
        null == (e3 = r2.get(n2)) ? void 0 : e3.forEach((e4) => e4(...o3));
      };
    }
  }), e2) : e2, {}) };
}
var useInteractions = function(e) {
  void 0 === e && (e = []);
  const t = e, n = React6.useCallback((t2) => mergeProps(t2, e, "reference"), t), r2 = React6.useCallback((t2) => mergeProps(t2, e, "floating"), t), o2 = React6.useCallback((t2) => mergeProps(t2, e, "item"), t);
  return React6.useMemo(() => ({ getReferenceProps: n, getFloatingProps: r2, getItemProps: o2 }), [n, r2, o2]);
};
function getChildren(e, t) {
  var n;
  let r2 = null == (n = e.filter((e2) => {
    var n2;
    return e2.parentId === t && (null == (n2 = e2.context) ? void 0 : n2.open);
  })) ? [] : n, o2 = r2;
  for (; o2.length; ) {
    var i;
    o2 = null == (i = e.filter((e2) => {
      var t2;
      return null == (t2 = o2) ? void 0 : t2.some((t3) => {
        var n2;
        return e2.parentId === t3.id && (null == (n2 = e2.context) ? void 0 : n2.open);
      });
    })) ? [] : i, r2 = r2.concat(o2);
  }
  return r2;
}
function getTarget(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
var TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function isTypeableElement(e) {
  return isHTMLElement2(e) && e.matches(TYPEABLE_SELECTOR);
}
function useLatestRef2(e) {
  const t = (0, import_react88.useRef)(e);
  return index2(() => {
    t.current = e;
  }), t;
}
function usePrevious(e) {
  const t = (0, import_react88.useRef)();
  return index2(() => {
    t.current = e;
  }, [e]), t.current;
}
function getDelay(e, t, n) {
  return n && "mouse" !== n ? 0 : "number" == typeof e ? e : null == e ? void 0 : e[t];
}
var useHover = function(e, t) {
  let { enabled: n = true, delay: r2 = 0, handleClose: o2 = null, mouseOnly: i = false, restMs: s = 0, move: d = true } = void 0 === t ? {} : t;
  const { open: l, onOpenChange: c2, dataRef: a, events: f, refs: u, _: m } = e, p = useFloatingTree(), g = useFloatingParentNodeId(), h = useLatestRef2(o2), y = useLatestRef2(r2), v = usePrevious(l), x = React6.useRef(), b6 = React6.useRef(), E = React6.useRef(), w = React6.useRef(), R = React6.useRef(true), L = React6.useRef(false), k = React6.useCallback(() => {
    var e2;
    const t2 = null == (e2 = a.current.openEvent) ? void 0 : e2.type;
    return (null == t2 ? void 0 : t2.includes("mouse")) && "mousedown" !== t2;
  }, [a]);
  React6.useEffect(() => {
    function e2() {
      clearTimeout(b6.current), clearTimeout(w.current), R.current = true;
    }
    if (n)
      return f.on("dismiss", e2), () => {
        f.off("dismiss", e2);
      };
  }, [n, f, u]), React6.useEffect(() => {
    function e2() {
      k() && c2(false);
    }
    if (!n || !h.current)
      return;
    const t2 = getDocument(u.floating.current).documentElement;
    return t2.addEventListener("mouseleave", e2), () => {
      t2.removeEventListener("mouseleave", e2);
    };
  }, [u, c2, n, h, a, k]);
  const C = React6.useCallback(function(e2) {
    void 0 === e2 && (e2 = true);
    const t2 = getDelay(y.current, "close", x.current);
    t2 && !E.current ? (clearTimeout(b6.current), b6.current = setTimeout(() => c2(false), t2)) : e2 && (clearTimeout(b6.current), c2(false));
  }, [y, c2]), P = React6.useCallback(() => {
    E.current && (getDocument(u.floating.current).removeEventListener("pointermove", E.current), E.current = void 0);
  }, [u]), T = React6.useCallback(() => {
    getDocument(u.floating.current).body.style.pointerEvents = "", L.current = false;
  }, [u]);
  return React6.useEffect(() => {
    function t2() {
      return !!a.current.openEvent && ["click", "mousedown"].includes(a.current.openEvent.type);
    }
    function r3(e2) {
      if (clearTimeout(b6.current), R.current = false, !(i && "mouse" !== x.current || 0 < s && 0 === getDelay(y.current, "open"))) {
        a.current.openEvent = e2;
        const t3 = getDelay(y.current, "open", x.current);
        t3 ? b6.current = setTimeout(() => {
          c2(true);
        }, t3) : c2(true);
      }
    }
    function o3(n2) {
      if (!t2()) {
        const t3 = getDocument(u.floating.current);
        return clearTimeout(w.current), h.current ? (clearTimeout(b6.current), E.current && t3.removeEventListener("pointermove", E.current), E.current = h.current({ ...e, tree: p, x: n2.clientX, y: n2.clientY, onClose() {
          T(), P(), C();
        } }), void t3.addEventListener("pointermove", E.current)) : void C();
      }
    }
    function f2(n2) {
      t2() || (null == h.current ? void 0 : h.current({ ...e, tree: p, x: n2.clientX, y: n2.clientY, leave: true, onClose() {
        T(), P(), C();
      } })(n2));
    }
    if (!n)
      return;
    const m2 = u.floating.current, g2 = u.domReference.current;
    if (isElement2(g2))
      return l && g2.addEventListener("mouseleave", f2), null == m2 ? void 0 : m2.addEventListener("mouseleave", f2), d && g2.addEventListener("mousemove", r3, { once: true }), g2.addEventListener("mouseenter", r3), g2.addEventListener("mouseleave", o3), () => {
        l && g2.removeEventListener("mouseleave", f2), null == m2 ? void 0 : m2.removeEventListener("mouseleave", f2), d && g2.removeEventListener("mousemove", r3), g2.removeEventListener("mouseenter", r3), g2.removeEventListener("mouseleave", o3);
      };
  }, [m.domReference, n, e, i, s, d, C, P, T, c2, l, p, u, y, h, a]), index2(() => {
    if (n && l && h.current && h.current.__options.blockPointerEvents && k()) {
      getDocument(u.floating.current).body.style.pointerEvents = "none", L.current = true;
      const n2 = u.domReference.current, r3 = u.floating.current;
      if (isElement2(n2) && r3) {
        var e2, t2;
        const o3 = null == p || null == (e2 = p.nodesRef.current.find((e3) => e3.id === g)) || null == (t2 = e2.context) ? void 0 : t2.refs.floating.current;
        return o3 && (o3.style.pointerEvents = ""), n2.style.pointerEvents = "auto", r3.style.pointerEvents = "auto", () => {
          n2.style.pointerEvents = "", r3.style.pointerEvents = "";
        };
      }
    }
  }, [n, l, g, u, p, h, a, k]), index2(() => {
    v && !l && (x.current = void 0, P(), T());
  }), React6.useEffect(() => () => {
    P(), clearTimeout(b6.current), clearTimeout(w.current), L.current && T();
  }, [n, P, T]), React6.useMemo(() => {
    function e2(e3) {
      x.current = e3.pointerType;
    }
    return n ? { reference: { onPointerDown: e2, onPointerEnter: e2, onMouseMove() {
      l || 0 === s || (clearTimeout(w.current), w.current = setTimeout(() => {
        R.current || c2(true);
      }, s));
    } }, floating: { onMouseEnter() {
      clearTimeout(b6.current);
    }, onMouseLeave() {
      C(false);
    } } } : {};
  }, [n, s, l, c2, C]);
};
var useRole = function(e, t) {
  let { open: n } = e, { enabled: r2 = true, role: o2 = "dialog" } = void 0 === t ? {} : t;
  const i = useId(), s = useId();
  return React6.useMemo(() => {
    const e2 = { id: i, role: o2 };
    return r2 ? "tooltip" === o2 ? { reference: { "aria-describedby": n ? i : void 0 }, floating: e2 } : { reference: { "aria-expanded": n ? "true" : "false", "aria-haspopup": "alertdialog" === o2 ? "dialog" : o2, "aria-controls": n ? i : void 0, ..."listbox" === o2 && { role: "combobox" }, ..."menu" === o2 && { id: s } }, floating: { ...e2, ..."menu" === o2 && { "aria-labelledby": s } } } : {};
  }, [r2, o2, n, i, s]);
};
function isButtonTarget(e) {
  return isHTMLElement2(e.target) && "BUTTON" === e.target.tagName;
}
function isSpaceIgnored(e) {
  return isTypeableElement(e);
}
var useClick = function(e, t) {
  let { open: n, onOpenChange: r2, dataRef: o2, refs: i } = e, { enabled: s = true, event: d = "click", toggle: l = true, ignoreMouse: c2 = false, keyboardHandlers: a = true } = void 0 === t ? {} : t;
  const f = React6.useRef();
  return React6.useMemo(() => s ? { reference: { onPointerDown(e2) {
    f.current = e2.pointerType;
  }, onMouseDown(e2) {
    0 !== e2.button || "mouse" === f.current && c2 || "click" === d || (n ? l && (!o2.current.openEvent || "mousedown" === o2.current.openEvent.type) && r2(false) : r2(true), o2.current.openEvent = e2.nativeEvent);
  }, onClick(e2) {
    return "mousedown" === d && f.current ? void (f.current = void 0) : void ("mouse" === f.current && c2 || (n ? l && (!o2.current.openEvent || "click" === o2.current.openEvent.type) && r2(false) : r2(true), o2.current.openEvent = e2.nativeEvent));
  }, onKeyDown(e2) {
    f.current = void 0, !a || isButtonTarget(e2) || (" " === e2.key && !isSpaceIgnored(i.domReference.current) && e2.preventDefault(), "Enter" === e2.key && (n ? l && r2(false) : r2(true)));
  }, onKeyUp(e2) {
    !a || isButtonTarget(e2) || isSpaceIgnored(i.domReference.current) || " " === e2.key && (n ? l && r2(false) : r2(true));
  } } } : {}, [s, o2, d, c2, a, i, l, n, r2]);
};
function isEventTargetWithin(t, n) {
  if (null == n)
    return false;
  if ("composedPath" in t)
    return t.composedPath().includes(n);
  const r2 = t;
  return null != r2.target && n.contains(r2.target);
}
var bubbleHandlerKeys = { pointerdown: "onPointerDown", mousedown: "onMouseDown", click: "onClick" };
var captureHandlerKeys = { pointerdown: "onPointerDownCapture", mousedown: "onMouseDownCapture", click: "onClickCapture" };
var useDismiss = function(e, t) {
  let { open: n, onOpenChange: r2, refs: o2, events: i, nodeId: s } = e, { enabled: d = true, escapeKey: l = true, outsidePress: c2 = true, outsidePressEvent: a = "pointerdown", referencePress: f = false, referencePressEvent: u = "pointerdown", ancestorScroll: m = false, bubbles: p = true } = void 0 === t ? {} : t;
  const g = useFloatingTree(), h = null != useFloatingParentNodeId(), y = React6.useRef(false);
  return React6.useEffect(() => {
    function e2(e3) {
      if ("Escape" === e3.key) {
        if (!p && g && 0 < getChildren(g.nodesRef.current, s).length)
          return;
        i.emit("dismiss", { preventScroll: false }), r2(false);
      }
    }
    function t2(e3) {
      const t3 = y.current;
      if (y.current = false, !t3) {
        const t4 = getTarget(e3);
        if (isElement2(t4) && o2.floating.current) {
          var n2;
          const r3 = null == (n2 = o2.floating.current.ownerDocument.defaultView) ? window : n2, i2 = t4.scrollWidth > t4.clientWidth, s2 = t4.scrollHeight > t4.clientHeight;
          let d3 = s2 && e3.offsetX > t4.clientWidth;
          if (s2) {
            const n3 = "rtl" === r3.getComputedStyle(t4).direction;
            n3 && (d3 = e3.offsetX <= t4.offsetWidth - t4.clientWidth);
          }
          if (d3 || i2 && e3.offsetY > t4.clientHeight)
            return;
        }
        const d2 = g && getChildren(g.nodesRef.current, s).some((t5) => {
          var n3;
          return isEventTargetWithin(e3, null == (n3 = t5.context) ? void 0 : n3.refs.floating.current);
        });
        isEventTargetWithin(e3, o2.floating.current) || isEventTargetWithin(e3, o2.domReference.current) || d2 || !p && g && 0 < getChildren(g.nodesRef.current, s).length || (i.emit("dismiss", !!h && { preventScroll: true }), r2(false));
      }
    }
    function f2() {
      r2(false);
    }
    if (!n || !d)
      return;
    const u2 = getDocument(o2.floating.current);
    l && u2.addEventListener("keydown", e2), c2 && u2.addEventListener(a, t2);
    let v = [];
    return m && (isElement2(o2.domReference.current) && (v = getOverflowAncestors2(o2.domReference.current)), isElement2(o2.floating.current) && (v = v.concat(getOverflowAncestors2(o2.floating.current))), !isElement2(o2.reference.current) && o2.reference.current && o2.reference.current.contextElement && (v = v.concat(getOverflowAncestors2(o2.reference.current.contextElement)))), v = v.filter((e3) => {
      var t3;
      return e3 !== (null == (t3 = u2.defaultView) ? void 0 : t3.visualViewport);
    }), v.forEach((e3) => {
      e3.addEventListener("scroll", f2, { passive: true });
    }), () => {
      l && u2.removeEventListener("keydown", e2), c2 && u2.removeEventListener(a, t2), v.forEach((e3) => {
        e3.removeEventListener("scroll", f2);
      });
    };
  }, [l, c2, a, i, g, s, n, r2, m, d, p, o2, h]), React6.useEffect(() => {
    y.current = false;
  }, [c2, a]), React6.useMemo(() => d ? { reference: { [bubbleHandlerKeys[u]]: () => {
    f && (i.emit("dismiss"), r2(false));
  } }, floating: { [captureHandlerKeys[a]]: () => {
    y.current = true;
  } } } : {}, [d, i, f, a, u, r2]);
};
var useFocus = function(e, t) {
  let { open: n, onOpenChange: r2, dataRef: o2, refs: i, events: s } = e, { enabled: d = true, keyboardOnly: l = true } = void 0 === t ? {} : t;
  const c2 = React6.useRef(""), a = React6.useRef(false), f = React6.useRef();
  return React6.useEffect(() => {
    function e2() {
      !n && isHTMLElement2(i.domReference.current) && i.domReference.current.blur();
    }
    var t2;
    if (!d)
      return;
    const r3 = getDocument(i.floating.current), o3 = null == (t2 = r3.defaultView) ? window : t2;
    return o3.addEventListener("blur", e2), () => {
      o3.removeEventListener("blur", e2);
    };
  }, [i, n, d]), React6.useEffect(() => {
    function e2() {
      a.current = true;
    }
    if (d)
      return s.on("dismiss", e2), () => {
        s.off("dismiss", e2);
      };
  }, [s, d]), React6.useEffect(() => () => {
    clearTimeout(f.current);
  }, []), React6.useMemo(() => d ? { reference: { onPointerDown(e2) {
    let { pointerType: t2 } = e2;
    c2.current = t2, a.current = !!(t2 && l);
  }, onPointerLeave() {
    a.current = false;
  }, onFocus(e2) {
    var t2, n2, s2;
    a.current || "focus" === e2.type && "mousedown" === (null == (t2 = o2.current.openEvent) ? void 0 : t2.type) && null != (n2 = i.domReference.current) && n2.contains(null == (s2 = o2.current.openEvent) ? void 0 : s2.target) || (o2.current.openEvent = e2.nativeEvent, r2(true));
  }, onBlur(e2) {
    const t2 = e2.relatedTarget;
    f.current = setTimeout(() => {
      var e3, n2;
      null != (e3 = i.floating.current) && e3.contains(t2) || null != (n2 = i.domReference.current) && n2.contains(t2) || (a.current = false, r2(false));
    });
  } } } : {}, [d, l, i, o2, r2]);
};
var useTooltip = ({ initialOpen: r2 = false, variant: e, placement: o2 = "top", triggerEvent: i = "click", open: t, onOpenChange: n, disabled: s = false } = {}) => {
  const [d, l] = (0, import_react88.useState)(r2), c2 = t ?? d, a = n ?? l, f = useFloating2({ placement: o2, open: c2, onOpenChange: a, whileElementsMounted: autoUpdate2, middleware: [offset2(5), flip2(), shift2()] }), u = f.context, m = useClick(u, { enabled: null == t && false === s && "click" === i }), p = useHover(u, { move: false, enabled: null == t && false === s && "hover" === i }), g = useFocus(u, { enabled: null == t }), h = useDismiss(u), y = useRole(u, { role: "tooltip" }), v = useInteractions([m, p, g, h, y]);
  return import_react88.default.useMemo(() => ({ open: c2, setOpen: a, variant: e, disabled: s, ...v, ...f }), [c2, a, e, s, v, f]);
};
var tooltipPlacementOptions = ["top", "top-start", "top-end", "right", "right-start", "right-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end"];
var tooltipVariants = ["info", "warning", "danger", "error", "success"];
var TooltipContext = import_react88.default.createContext(null);
var useTooltipState = () => {
  const e = import_react88.default.useContext(TooltipContext);
  if (null == e)
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  return e;
};
function Tooltip({ initialOpen: e, placement: t, variant: n, open: r2, triggerEvent: o2, disabled: i, children: s, ...d }) {
  const l = useTooltip({ initialOpen: e, placement: t, variant: n, open: r2, triggerEvent: o2, disabled: i, props: d });
  return import_react88.default.createElement(TooltipContext.Provider, { value: l }, s);
}
Tooltip.propTypes = { variant: import_prop_types87.default.oneOf(tooltipVariants), triggerEvent: import_prop_types87.default.oneOf(["click", "hover"]), placement: import_prop_types87.default.oneOf(tooltipPlacementOptions), disabled: import_prop_types87.default.bool, initialOpen: import_prop_types87.default.bool, open: import_prop_types87.default.bool, children: import_prop_types87.default.node }, Tooltip.defaultProps = { variant: void 0, triggerEvent: "click", placement: "top", disabled: false, initialOpen: false, open: void 0, children: null };

// node_modules/juno-ui-components/build/TooltipContent.component-27be0d28.js
var import_react89 = __toESM(require_react());

// node_modules/juno-ui-components/build/index-d0eb0e05.js
function o(a) {
  return (b6) => {
    a.forEach((a2) => {
      "function" == typeof a2 ? a2(b6) : null != a2 && (a2.current = b6);
    });
  };
}

// node_modules/juno-ui-components/build/TooltipContent.component-27be0d28.js
var import_prop_types88 = __toESM(require_prop_types());
var popoverStyles = `
	jn-bg-theme-background-lvl-1
	jn-text-theme-high 
	jn-inline-flex	
  jn-items-center
	jn-p-2
	jn-rounded
	jn-drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]
`;
var popoverTextStyles = `
	jn-mx-4
	jn-max-w-full
`;
var popoverIconStyles = `
	jn-shrink-0
`;
var getIcon = (a) => "error" === a ? "dangerous" : a;
var TooltipContent = import_react89.default.forwardRef(function({ className: a, children: b6, ...c2 }, d) {
  const e = useTooltipState(), f = import_react89.default.useMemo(() => o([e.floating, d]), [e.floating, d]), g = e.variant;
  return import_react89.default.createElement(import_react89.default.Fragment, null, e.open && import_react89.default.createElement("div", _extends({ className: `juno-tooltip juno-tooltip-${g} ${popoverStyles} ${a}`, ref: f, style: { position: e.strategy, top: e.y ?? 0, left: e.x ?? 0, visibility: null == e.x ? "hidden" : "visible" } }, e.getFloatingProps(c2)), g && import_react89.default.createElement(Icon, { icon: getIcon(g), color: `jn-text-theme-${g}`, className: `juno-tooltip-popover-icon ${popoverIconStyles}` }), import_react89.default.createElement("p", { className: `${popoverTextStyles}` }, b6)));
});
TooltipContent.propTypes = { children: import_prop_types88.default.node, className: import_prop_types88.default.string }, TooltipContent.defaultProps = { children: null, className: "" };

// node_modules/juno-ui-components/build/TooltipTrigger.component-aa53b4ef.js
var import_react90 = __toESM(require_react());
var import_prop_types89 = __toESM(require_prop_types());
var TooltipTrigger = import_react90.default.forwardRef(function({ children: a, asChild: b6, className: c2, ...d }, e) {
  const f = useTooltipState(), g = a.ref, h = import_react90.default.useMemo(() => o([f.reference, e, g]), [f.reference, e, g]);
  return b6 && import_react90.default.isValidElement(a) ? import_react90.default.cloneElement(a, f.getReferenceProps({ ref: h, ...d, ...a.props, "data-state": f.open ? "open" : "closed", className: a.props.className + `${f.disabled && " jn-cursor-default"}` })) : import_react90.default.createElement("button", _extends({ ref: h, "data-state": f.open ? "open" : "closed" }, f.getReferenceProps(d), { className: `${c2} ${f.disabled && " jn-cursor-default"}` }), a);
});
TooltipTrigger.propTypes = { asChild: import_prop_types89.default.bool, children: import_prop_types89.default.node, className: import_prop_types89.default.string }, TooltipTrigger.defaultProps = { asChild: false, children: null, className: "" };

// node_modules/juno-ui-components/build/TopNavigation.component-431af142.js
var import_react91 = __toESM(require_react());
var import_prop_types90 = __toESM(require_prop_types());
var topNavigationStyles = `
  jn-gap-6
  jn-px-6
  jn-py-1.5
`;
var TopNavigation = ({ children: a, className: b6, ...c2 }) => import_react91.default.createElement(Stack, _extends({ className: `juno-topnavigation ${topNavigationStyles} ${b6}`, role: "navigation" }, c2), a);
TopNavigation.propTypes = { children: import_prop_types90.default.node, className: import_prop_types90.default.string }, TopNavigation.defaultProps = { children: null, className: "" };

// node_modules/juno-ui-components/build/TopNavigationItem.component-959bdab1.js
var import_react92 = __toESM(require_react());
var import_prop_types91 = __toESM(require_prop_types());
var TopNavigationItem = ({ icon: a, label: b6, ariaLabel: c2, href: d, active: e, onClick: f, children: g, className: h, ...i }) => {
  const j = a ? import_react92.default.createElement(Icon, { icon: a, size: "18", color: "jn-text-theme-default", className: b6 && b6.length ? "jn-mr-1" : "" }) : null, k = b6 || g, l = import_react92.default.createElement("a", _extends({ className: `juno-topnavigation-item ${e ? "juno-topnavigation-item-active" : ""} ${h}`, href: d, "aria-label": c2 }, i), j, k), m = import_react92.default.createElement("button", _extends({ className: `juno-topnavigation-item ${e ? "juno-topnavigation-item-active" : ""} ${h}`, onClick: (a2) => {
    f && f(a2);
  }, "aria-label": c2 }, i), j, k), n = import_react92.default.createElement("div", _extends({ className: `juno-topnavigation-item ${e ? "juno-topnavigation-item-active" : ""} ${h}`, "aria-label": c2 }, i), j, b6 || g);
  return d ? l : f ? m : n;
};
TopNavigationItem.propTypes = { icon: import_prop_types91.default.oneOf(knownIcons), label: import_prop_types91.default.string, children: import_prop_types91.default.node, className: import_prop_types91.default.string, ariaLabel: import_prop_types91.default.string, href: import_prop_types91.default.string, active: import_prop_types91.default.bool, onClick: import_prop_types91.default.func }, TopNavigationItem.defaultProps = { icon: null, label: "", children: null, className: "", ariaLabel: "", href: "", active: false, onClick: void 0 };

// node_modules/juno-ui-components/build/AppShellProvider.component-4104aef6.js
var AppShellProvider = ({ shadowRoot: a, shadowRootMode: b6, stylesWrapper: c2, theme: d, children: e }) => {
  const f = import_react93.default.useCallback(({ children: c3 }) => a ? import_react93.default.createElement(ShadowRoot2, { mode: b6 }, c3) : c3, [a, b6]);
  return import_react93.default.createElement(f, null, import_react93.default.createElement(StyleProvider, { theme: d, stylesWrapper: a ? "inline" : c2 }, import_react93.default.createElement(PortalProvider, null, e)));
};
AppShellProvider.propTypes = { shadowRoot: import_prop_types92.default.bool, shadowRootMode: import_prop_types92.default.oneOf(["open", "closed"]), stylesWrapper: import_prop_types92.default.oneOf(["head", "inline"]), theme: import_prop_types92.default.string }, AppShellProvider.defaultProps = { shadowRoot: true, shadowRootMode: "open", stylesWrapper: "inline", theme: null };

// node_modules/juno-ui-components/build/index.js
var import_react94 = __toESM(require_react());
var import_react_dom4 = __toESM(require_react_dom());

// src/components/StoreProvider.js
var import_react96 = __toESM(require_react());

// node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((import.meta.env && import.meta.env.MODE) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
};
var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

// node_modules/zustand/esm/index.mjs
var import_react95 = __toESM(require_react(), 1);
var import_with_selector = __toESM(require_with_selector(), 1);
var { useSyncExternalStoreWithSelector } = import_with_selector.default;
function useStore(api, selector = api.getState, equalityFn) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  );
  (0, import_react95.useDebugValue)(slice);
  return slice;
}

// node_modules/zustand/esm/middleware.mjs
var trackedConnections = /* @__PURE__ */ new Map();
var getTrackedConnectionState = (name) => {
  const api = trackedConnections.get(name);
  if (!api)
    return {};
  return Object.fromEntries(
    Object.entries(api.stores).map(([key, api2]) => [key, api2.getState()])
  );
};
var extractConnectionInformation = (store, extensionConnector, options) => {
  if (store === void 0) {
    return {
      type: "untracked",
      connection: extensionConnector.connect(options)
    };
  }
  const existingConnection = trackedConnections.get(options.name);
  if (existingConnection) {
    return { type: "tracked", store, ...existingConnection };
  }
  const newConnection = {
    connection: extensionConnector.connect(options),
    stores: {}
  };
  trackedConnections.set(options.name, newConnection);
  return { type: "tracked", store, ...newConnection };
};
var devtoolsImpl = (fn, devtoolsOptions = {}) => (set, get, api) => {
  const { enabled, anonymousActionType, store, ...options } = devtoolsOptions;
  let extensionConnector;
  try {
    extensionConnector = (enabled != null ? enabled : (import.meta.env && import.meta.env.MODE) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch (e) {
  }
  if (!extensionConnector) {
    if ((import.meta.env && import.meta.env.MODE) !== "production" && enabled) {
      console.warn(
        "[zustand devtools middleware] Please install/enable Redux devtools extension"
      );
    }
    return fn(set, get, api);
  }
  const { connection, ...connectionInformation } = extractConnectionInformation(store, extensionConnector, options);
  let isRecording = true;
  api.setState = (state, replace, nameOrAction) => {
    const r2 = set(state, replace);
    if (!isRecording)
      return r2;
    const action = nameOrAction === void 0 ? { type: anonymousActionType || "anonymous" } : typeof nameOrAction === "string" ? { type: nameOrAction } : nameOrAction;
    if (store === void 0) {
      connection == null ? void 0 : connection.send(action, get());
      return r2;
    }
    connection == null ? void 0 : connection.send(
      {
        ...action,
        type: `${store}/${action.type}`
      },
      {
        ...getTrackedConnectionState(options.name),
        [store]: api.getState()
      }
    );
    return r2;
  };
  const setStateFromDevtools = (...a) => {
    const originalIsRecording = isRecording;
    isRecording = false;
    set(...a);
    isRecording = originalIsRecording;
  };
  const initialState = fn(api.setState, get, api);
  if (connectionInformation.type === "untracked") {
    connection == null ? void 0 : connection.init(initialState);
  } else {
    connectionInformation.stores[connectionInformation.store] = api;
    connection == null ? void 0 : connection.init(
      Object.fromEntries(
        Object.entries(connectionInformation.stores).map(([key, store2]) => [
          key,
          key === connectionInformation.store ? initialState : store2.getState()
        ])
      )
    );
  }
  if (api.dispatchFromDevtools && typeof api.dispatch === "function") {
    let didWarnAboutReservedActionType = false;
    const originalDispatch = api.dispatch;
    api.dispatch = (...a) => {
      if ((import.meta.env && import.meta.env.MODE) !== "production" && a[0].type === "__setState" && !didWarnAboutReservedActionType) {
        console.warn(
          '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
        );
        didWarnAboutReservedActionType = true;
      }
      originalDispatch(...a);
    };
  }
  connection.subscribe((message2) => {
    var _a;
    switch (message2.type) {
      case "ACTION":
        if (typeof message2.payload !== "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return parseJsonThen(
          message2.payload,
          (action) => {
            if (action.type === "__setState") {
              if (store === void 0) {
                setStateFromDevtools(action.state);
                return;
              }
              if (Object.keys(action.state).length !== 1) {
                console.error(
                  `
                    [zustand devtools middleware] Unsupported __setState action format. 
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
                );
              }
              const stateFromDevtools = action.state[store];
              if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                setStateFromDevtools(stateFromDevtools);
              }
              return;
            }
            if (!api.dispatchFromDevtools)
              return;
            if (typeof api.dispatch !== "function")
              return;
            api.dispatch(action);
          }
        );
      case "DISPATCH":
        switch (message2.payload.type) {
          case "RESET":
            setStateFromDevtools(initialState);
            if (store === void 0) {
              return connection == null ? void 0 : connection.init(api.getState());
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "COMMIT":
            if (store === void 0) {
              connection == null ? void 0 : connection.init(api.getState());
              return;
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "ROLLBACK":
            return parseJsonThen(message2.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                connection == null ? void 0 : connection.init(api.getState());
                return;
              }
              setStateFromDevtools(state[store]);
              connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return parseJsonThen(message2.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                setStateFromDevtools(state[store]);
              }
            });
          case "IMPORT_STATE": {
            const { nextLiftedState } = message2.payload;
            const lastComputedState = (_a = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a.state;
            if (!lastComputedState)
              return;
            if (store === void 0) {
              setStateFromDevtools(lastComputedState);
            } else {
              setStateFromDevtools(lastComputedState[store]);
            }
            connection == null ? void 0 : connection.send(
              null,
              // FIXME no-any
              nextLiftedState
            );
            return;
          }
          case "PAUSE_RECORDING":
            return isRecording = !isRecording;
        }
        return;
    }
  });
  return initialState;
};
var devtools = devtoolsImpl;
var parseJsonThen = (stringified, f) => {
  let parsed;
  try {
    parsed = JSON.parse(stringified);
  } catch (e) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      e
    );
  }
  if (parsed !== void 0)
    f(parsed);
};

// src/lib/store/createGlobalsSlice.js
var createGlobalsSlice = (set, get) => ({
  globals: {
    urlStateKey: "",
    actions: {
      setUrlStateKey: (newUrlStateKey) => set((state) => ({
        globals: { ...state.globals, urlStateKey: newUrlStateKey }
      }))
    }
  }
});
var createGlobalsSlice_default = createGlobalsSlice;

// src/lib/store/index.js
var store_default = () => createStore(
  devtools((set, get) => ({
    ...createGlobalsSlice_default(set, get)
  }))
);

// src/components/StoreProvider.js
var StoreContext = (0, import_react96.createContext)();
var StoreProvider = ({ children }) => /* @__PURE__ */ import_react96.default.createElement(StoreContext.Provider, { value: store_default() }, children);
var useAppStore = (selector) => useStore((0, import_react96.useContext)(StoreContext), selector);
var useGlobalsActions = () => useAppStore((state) => state.globals.actions);
var StoreProvider_default = StoreProvider;

// node_modules/@tanstack/query-core/build/lib/subscribable.mjs
var Subscribable = class {
  constructor() {
    this.listeners = [];
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.push(listener);
    this.onSubscribe();
    return () => {
      this.listeners = this.listeners.filter((x) => x !== listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.length > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

// node_modules/@tanstack/query-core/build/lib/utils.mjs
var isServer = typeof window === "undefined" || "Deno" in window;
function noop() {
  return void 0;
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }
  if (typeof arg2 === "function") {
    return {
      ...arg3,
      queryKey: arg1,
      queryFn: arg2
    };
  }
  return {
    ...arg2,
    queryKey: arg1
  };
}
function parseFilterArgs(arg1, arg2, arg3) {
  return isQueryKey(arg1) ? [{
    ...arg2,
    queryKey: arg1
  }, arg3] : [arg1 || {}, arg2];
}
function matchQuery(filters, query) {
  const {
    type: type2 = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (isQueryKey(queryKey)) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type2 !== "all") {
    const isActive = query.isActive();
    if (type2 === "active" && !isActive) {
      return false;
    }
    if (type2 === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (typeof fetchStatus !== "undefined" && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const {
    exact,
    fetching,
    predicate,
    mutationKey
  } = filters;
  if (isQueryKey(mutationKey)) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (typeof fetching === "boolean" && mutation.state.status === "loading" !== fetching) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashQueryKey;
  return hashFn(queryKey);
}
function hashQueryKey(queryKey) {
  return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
    result[key] = val[key];
    return result;
  }, {}) : val);
}
function partialMatchKey(a, b6) {
  return partialDeepEqual(a, b6);
}
function partialDeepEqual(a, b6) {
  if (a === b6) {
    return true;
  }
  if (typeof a !== typeof b6) {
    return false;
  }
  if (a && b6 && typeof a === "object" && typeof b6 === "object") {
    return !Object.keys(b6).some((key) => !partialDeepEqual(a[key], b6[key]));
  }
  return false;
}
function replaceEqualDeep(a, b6) {
  if (a === b6) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b6);
  if (array || isPlainObject(a) && isPlainObject(b6)) {
    const aSize = array ? a.length : Object.keys(a).length;
    const bItems = array ? b6 : Object.keys(b6);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      copy[key] = replaceEqualDeep(a[key], b6[key]);
      if (copy[key] === a[key]) {
        equalItems++;
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b6;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o2) {
  if (!hasObjectPrototype(o2)) {
    return false;
  }
  const ctor = o2.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o2) {
  return Object.prototype.toString.call(o2) === "[object Object]";
}
function isQueryKey(value) {
  return Array.isArray(value);
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function scheduleMicrotask(callback) {
  sleep(0).then(callback);
}
function getAbortController() {
  if (typeof AbortController === "function") {
    return new AbortController();
  }
  return;
}
function replaceData(prevData, data, options) {
  if (options.isDataEqual != null && options.isDataEqual(prevData, data)) {
    return prevData;
  } else if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    return replaceEqualDeep(prevData, data);
  }
  return data;
}

// node_modules/@tanstack/query-core/build/lib/focusManager.mjs
var FocusManager = class extends Subscribable {
  constructor() {
    super();
    this.setup = (onFocus) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        window.addEventListener("focus", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
          window.removeEventListener("focus", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;
      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _this$cleanup2;
    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    this.focused = focused;
    if (focused) {
      this.onFocus();
    }
  }
  onFocus() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
  isFocused() {
    if (typeof this.focused === "boolean") {
      return this.focused;
    }
    if (typeof document === "undefined") {
      return true;
    }
    return [void 0, "visible", "prerender"].includes(document.visibilityState);
  }
};
var focusManager = new FocusManager();

// node_modules/@tanstack/query-core/build/lib/onlineManager.mjs
var OnlineManager = class extends Subscribable {
  constructor() {
    super();
    this.setup = (onOnline) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onOnline();
        window.addEventListener("online", listener, false);
        window.addEventListener("offline", listener, false);
        return () => {
          window.removeEventListener("online", listener);
          window.removeEventListener("offline", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;
      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _this$cleanup2;
    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup((online) => {
      if (typeof online === "boolean") {
        this.setOnline(online);
      } else {
        this.onOnline();
      }
    });
  }
  setOnline(online) {
    this.online = online;
    if (online) {
      this.onOnline();
    }
  }
  onOnline() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
  isOnline() {
    if (typeof this.online === "boolean") {
      return this.online;
    }
    if (typeof navigator === "undefined" || typeof navigator.onLine === "undefined") {
      return true;
    }
    return navigator.onLine;
  }
};
var onlineManager = new OnlineManager();

// node_modules/@tanstack/query-core/build/lib/retryer.mjs
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode != null ? networkMode : "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class {
  constructor(options) {
    this.revert = options == null ? void 0 : options.revert;
    this.silent = options == null ? void 0 : options.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  let promiseResolve;
  let promiseReject;
  const promise = new Promise((outerResolve, outerReject) => {
    promiseResolve = outerResolve;
    promiseReject = outerReject;
  });
  const cancel = (cancelOptions) => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort == null ? void 0 : config.abort();
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const shouldPause = () => !focusManager.isFocused() || config.networkMode !== "always" && !onlineManager.isOnline();
  const resolve = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess == null ? void 0 : config.onSuccess(value);
      continueFn == null ? void 0 : continueFn();
      promiseResolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onError == null ? void 0 : config.onError(value);
      continueFn == null ? void 0 : continueFn();
      promiseReject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        const canContinue = isResolved || !shouldPause();
        if (canContinue) {
          continueResolve(value);
        }
        return canContinue;
      };
      config.onPause == null ? void 0 : config.onPause();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved) {
        config.onContinue == null ? void 0 : config.onContinue();
      }
    });
  };
  const run = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    try {
      promiseOrValue = config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      var _config$retry, _config$retryDelay;
      if (isResolved) {
        return;
      }
      const retry = (_config$retry = config.retry) != null ? _config$retry : 3;
      const retryDelay = (_config$retryDelay = config.retryDelay) != null ? _config$retryDelay : defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail == null ? void 0 : config.onFail(failureCount, error);
      sleep(delay).then(() => {
        if (shouldPause()) {
          return pause();
        }
        return;
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  if (canFetch(config.networkMode)) {
    run();
  } else {
    pause().then(run);
  }
  return {
    promise,
    cancel,
    continue: () => {
      const didContinue = continueFn == null ? void 0 : continueFn();
      return didContinue ? promise : Promise.resolve();
    },
    cancelRetry,
    continueRetry
  };
}

// node_modules/@tanstack/query-core/build/lib/logger.mjs
var defaultLogger = console;

// node_modules/@tanstack/query-core/build/lib/notifyManager.mjs
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  const batch = (callback) => {
    let result;
    transactions++;
    try {
      result = callback();
    } finally {
      transactions--;
      if (!transactions) {
        flush();
      }
    }
    return result;
  };
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleMicrotask(() => {
        notifyFn(callback);
      });
    }
  };
  const batchCalls = (callback) => {
    return (...args) => {
      schedule(() => {
        callback(...args);
      });
    };
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleMicrotask(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  const setNotifyFunction = (fn) => {
    notifyFn = fn;
  };
  const setBatchNotifyFunction = (fn) => {
    batchNotifyFn = fn;
  };
  return {
    batch,
    batchCalls,
    schedule,
    setNotifyFunction,
    setBatchNotifyFunction
  };
}
var notifyManager = createNotifyManager();

// node_modules/@tanstack/query-core/build/lib/removable.mjs
var Removable = class {
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.cacheTime)) {
      this.gcTimeout = setTimeout(() => {
        this.optionalRemove();
      }, this.cacheTime);
    }
  }
  updateCacheTime(newCacheTime) {
    this.cacheTime = Math.max(this.cacheTime || 0, newCacheTime != null ? newCacheTime : isServer ? Infinity : 5 * 60 * 1e3);
  }
  clearGcTimeout() {
    if (this.gcTimeout) {
      clearTimeout(this.gcTimeout);
      this.gcTimeout = void 0;
    }
  }
};

// node_modules/@tanstack/query-core/build/lib/query.mjs
var Query = class extends Removable {
  constructor(config) {
    super();
    this.abortSignalConsumed = false;
    this.defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.cache = config.cache;
    this.logger = config.logger || defaultLogger;
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.initialState = config.state || getDefaultState(this.options);
    this.state = this.initialState;
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  setOptions(options) {
    this.options = {
      ...this.defaultOptions,
      ...options
    };
    this.updateCacheTime(this.options.cacheTime);
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      this.cache.remove(this);
    }
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    this.dispatch({
      data,
      type: "success",
      dataUpdatedAt: options == null ? void 0 : options.updatedAt,
      manual: options == null ? void 0 : options.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    this.dispatch({
      type: "setState",
      state,
      setStateOptions
    });
  }
  cancel(options) {
    var _this$retryer;
    const promise = this.promise;
    (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({
      silent: true
    });
  }
  reset() {
    this.destroy();
    this.setState(this.initialState);
  }
  isActive() {
    return this.observers.some((observer) => observer.options.enabled !== false);
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }
  isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some((observer) => observer.getCurrentResult().isStale);
  }
  isStaleByTime(staleTime = 0) {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    var _this$retryer2;
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    if (observer) {
      observer.refetch({
        cancelRefetch: false
      });
    }
    (_this$retryer2 = this.retryer) == null ? void 0 : _this$retryer2.continue();
  }
  onOnline() {
    var _this$retryer3;
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    if (observer) {
      observer.refetch({
        cancelRefetch: false
      });
    }
    (_this$retryer3 = this.retryer) == null ? void 0 : _this$retryer3.continue();
  }
  addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.cache.notify({
        type: "observerAdded",
        query: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    if (this.observers.indexOf(observer) !== -1) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (this.retryer) {
          if (this.abortSignalConsumed) {
            this.retryer.cancel({
              revert: true
            });
          } else {
            this.retryer.cancelRetry();
          }
        }
        this.scheduleGc();
      }
      this.cache.notify({
        type: "observerRemoved",
        query: this,
        observer
      });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.dispatch({
        type: "invalidate"
      });
    }
  }
  fetch(options, fetchOptions) {
    var _this$options$behavio, _context$fetchOptions;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.dataUpdatedAt && fetchOptions != null && fetchOptions.cancelRefetch) {
        this.cancel({
          silent: true
        });
      } else if (this.promise) {
        var _this$retryer4;
        (_this$retryer4 = this.retryer) == null ? void 0 : _this$retryer4.continueRetry();
        return this.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    if (!Array.isArray(this.options.queryKey)) {
      if (true) {
        this.logger.error("As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']");
      }
    }
    const abortController = getAbortController();
    const queryFnContext = {
      queryKey: this.queryKey,
      pageParam: void 0,
      meta: this.meta
    };
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          if (abortController) {
            this.abortSignalConsumed = true;
            return abortController.signal;
          }
          return void 0;
        }
      });
    };
    addSignalProperty(queryFnContext);
    const fetchFn = () => {
      if (!this.options.queryFn) {
        return Promise.reject("Missing queryFn");
      }
      this.abortSignalConsumed = false;
      return this.options.queryFn(queryFnContext);
    };
    const context = {
      fetchOptions,
      options: this.options,
      queryKey: this.queryKey,
      state: this.state,
      fetchFn
    };
    addSignalProperty(context);
    (_this$options$behavio = this.options.behavior) == null ? void 0 : _this$options$behavio.onFetch(context);
    this.revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((_context$fetchOptions = context.fetchOptions) == null ? void 0 : _context$fetchOptions.meta)) {
      var _context$fetchOptions2;
      this.dispatch({
        type: "fetch",
        meta: (_context$fetchOptions2 = context.fetchOptions) == null ? void 0 : _context$fetchOptions2.meta
      });
    }
    const onError = (error) => {
      if (!(isCancelledError(error) && error.silent)) {
        this.dispatch({
          type: "error",
          error
        });
      }
      if (!isCancelledError(error)) {
        var _this$cache$config$on, _this$cache$config, _this$cache$config$on2, _this$cache$config2;
        (_this$cache$config$on = (_this$cache$config = this.cache.config).onError) == null ? void 0 : _this$cache$config$on.call(_this$cache$config, error, this);
        (_this$cache$config$on2 = (_this$cache$config2 = this.cache.config).onSettled) == null ? void 0 : _this$cache$config$on2.call(_this$cache$config2, this.state.data, error, this);
        if (true) {
          this.logger.error(error);
        }
      }
      if (!this.isFetchingOptimistic) {
        this.scheduleGc();
      }
      this.isFetchingOptimistic = false;
    };
    this.retryer = createRetryer({
      fn: context.fetchFn,
      abort: abortController == null ? void 0 : abortController.abort.bind(abortController),
      onSuccess: (data) => {
        var _this$cache$config$on3, _this$cache$config3, _this$cache$config$on4, _this$cache$config4;
        if (typeof data === "undefined") {
          if (true) {
            this.logger.error("Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: " + this.queryHash);
          }
          onError(new Error("undefined"));
          return;
        }
        this.setData(data);
        (_this$cache$config$on3 = (_this$cache$config3 = this.cache.config).onSuccess) == null ? void 0 : _this$cache$config$on3.call(_this$cache$config3, data, this);
        (_this$cache$config$on4 = (_this$cache$config4 = this.cache.config).onSettled) == null ? void 0 : _this$cache$config$on4.call(_this$cache$config4, data, this.state.error, this);
        if (!this.isFetchingOptimistic) {
          this.scheduleGc();
        }
        this.isFetchingOptimistic = false;
      },
      onError,
      onFail: (failureCount, error) => {
        this.dispatch({
          type: "failed",
          failureCount,
          error
        });
      },
      onPause: () => {
        this.dispatch({
          type: "pause"
        });
      },
      onContinue: () => {
        this.dispatch({
          type: "continue"
        });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode
    });
    this.promise = this.retryer.promise;
    return this.promise;
  }
  dispatch(action) {
    const reducer = (state) => {
      var _action$meta, _action$dataUpdatedAt;
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchMeta: (_action$meta = action.meta) != null ? _action$meta : null,
            fetchStatus: canFetch(this.options.networkMode) ? "fetching" : "paused",
            ...!state.dataUpdatedAt && {
              error: null,
              status: "loading"
            }
          };
        case "success":
          return {
            ...state,
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: (_action$dataUpdatedAt = action.dataUpdatedAt) != null ? _action$dataUpdatedAt : Date.now(),
            error: null,
            isInvalidated: false,
            status: "success",
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
        case "error":
          const error = action.error;
          if (isCancelledError(error) && error.revert && this.revertState) {
            return {
              ...this.revertState
            };
          }
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error"
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate(action);
      });
      this.cache.notify({
        query: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = typeof data !== "undefined";
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "loading",
    fetchStatus: "idle"
  };
}

// node_modules/@tanstack/query-core/build/lib/queryCache.mjs
var QueryCache = class extends Subscribable {
  constructor(config) {
    super();
    this.config = config || {};
    this.queries = [];
    this.queriesMap = {};
  }
  build(client, options, state) {
    var _options$queryHash;
    const queryKey = options.queryKey;
    const queryHash = (_options$queryHash = options.queryHash) != null ? _options$queryHash : hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        cache: this,
        logger: client.getLogger(),
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.queriesMap[query.queryHash]) {
      this.queriesMap[query.queryHash] = query;
      this.queries.push(query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.queriesMap[query.queryHash];
    if (queryInMap) {
      query.destroy();
      this.queries = this.queries.filter((x) => x !== query);
      if (queryInMap === query) {
        delete this.queriesMap[query.queryHash];
      }
      this.notify({
        type: "removed",
        query
      });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.queriesMap[queryHash];
  }
  getAll() {
    return this.queries;
  }
  find(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.queries.find((query) => matchQuery(filters, query));
  }
  findAll(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    return Object.keys(filters).length > 0 ? this.queries.filter((query) => matchQuery(filters, query)) : this.queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        query.onOnline();
      });
    });
  }
};

// node_modules/@tanstack/query-core/build/lib/mutation.mjs
var Mutation = class extends Removable {
  constructor(config) {
    super();
    this.defaultOptions = config.defaultOptions;
    this.mutationId = config.mutationId;
    this.mutationCache = config.mutationCache;
    this.logger = config.logger || defaultLogger;
    this.observers = [];
    this.state = config.state || getDefaultState2();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = {
      ...this.defaultOptions,
      ...options
    };
    this.updateCacheTime(this.options.cacheTime);
  }
  get meta() {
    return this.options.meta;
  }
  setState(state) {
    this.dispatch({
      type: "setState",
      state
    });
  }
  addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    this.observers = this.observers.filter((x) => x !== observer);
    this.scheduleGc();
    this.mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.observers.length) {
      if (this.state.status === "loading") {
        this.scheduleGc();
      } else {
        this.mutationCache.remove(this);
      }
    }
  }
  continue() {
    var _this$retryer$continu, _this$retryer;
    return (_this$retryer$continu = (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.continue()) != null ? _this$retryer$continu : this.execute();
  }
  async execute() {
    const executeMutation = () => {
      var _this$options$retry;
      this.retryer = createRetryer({
        fn: () => {
          if (!this.options.mutationFn) {
            return Promise.reject("No mutationFn found");
          }
          return this.options.mutationFn(this.state.variables);
        },
        onFail: (failureCount, error) => {
          this.dispatch({
            type: "failed",
            failureCount,
            error
          });
        },
        onPause: () => {
          this.dispatch({
            type: "pause"
          });
        },
        onContinue: () => {
          this.dispatch({
            type: "continue"
          });
        },
        retry: (_this$options$retry = this.options.retry) != null ? _this$options$retry : 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode
      });
      return this.retryer.promise;
    };
    const restored = this.state.status === "loading";
    try {
      var _this$mutationCache$c3, _this$mutationCache$c4, _this$options$onSucce, _this$options2, _this$mutationCache$c5, _this$mutationCache$c6, _this$options$onSettl, _this$options3;
      if (!restored) {
        var _this$mutationCache$c, _this$mutationCache$c2, _this$options$onMutat, _this$options;
        this.dispatch({
          type: "loading",
          variables: this.options.variables
        });
        await ((_this$mutationCache$c = (_this$mutationCache$c2 = this.mutationCache.config).onMutate) == null ? void 0 : _this$mutationCache$c.call(_this$mutationCache$c2, this.state.variables, this));
        const context = await ((_this$options$onMutat = (_this$options = this.options).onMutate) == null ? void 0 : _this$options$onMutat.call(_this$options, this.state.variables));
        if (context !== this.state.context) {
          this.dispatch({
            type: "loading",
            context,
            variables: this.state.variables
          });
        }
      }
      const data = await executeMutation();
      await ((_this$mutationCache$c3 = (_this$mutationCache$c4 = this.mutationCache.config).onSuccess) == null ? void 0 : _this$mutationCache$c3.call(_this$mutationCache$c4, data, this.state.variables, this.state.context, this));
      await ((_this$options$onSucce = (_this$options2 = this.options).onSuccess) == null ? void 0 : _this$options$onSucce.call(_this$options2, data, this.state.variables, this.state.context));
      await ((_this$mutationCache$c5 = (_this$mutationCache$c6 = this.mutationCache.config).onSettled) == null ? void 0 : _this$mutationCache$c5.call(_this$mutationCache$c6, data, null, this.state.variables, this.state.context, this));
      await ((_this$options$onSettl = (_this$options3 = this.options).onSettled) == null ? void 0 : _this$options$onSettl.call(_this$options3, data, null, this.state.variables, this.state.context));
      this.dispatch({
        type: "success",
        data
      });
      return data;
    } catch (error) {
      try {
        var _this$mutationCache$c7, _this$mutationCache$c8, _this$options$onError, _this$options4, _this$mutationCache$c9, _this$mutationCache$c10, _this$options$onSettl2, _this$options5;
        await ((_this$mutationCache$c7 = (_this$mutationCache$c8 = this.mutationCache.config).onError) == null ? void 0 : _this$mutationCache$c7.call(_this$mutationCache$c8, error, this.state.variables, this.state.context, this));
        if (true) {
          this.logger.error(error);
        }
        await ((_this$options$onError = (_this$options4 = this.options).onError) == null ? void 0 : _this$options$onError.call(_this$options4, error, this.state.variables, this.state.context));
        await ((_this$mutationCache$c9 = (_this$mutationCache$c10 = this.mutationCache.config).onSettled) == null ? void 0 : _this$mutationCache$c9.call(_this$mutationCache$c10, void 0, error, this.state.variables, this.state.context, this));
        await ((_this$options$onSettl2 = (_this$options5 = this.options).onSettled) == null ? void 0 : _this$options$onSettl2.call(_this$options5, void 0, error, this.state.variables, this.state.context));
        throw error;
      } finally {
        this.dispatch({
          type: "error",
          error
        });
      }
    }
  }
  dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "loading":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: !canFetch(this.options.networkMode),
            status: "loading",
            variables: action.variables
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState2() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0
  };
}

// node_modules/@tanstack/query-core/build/lib/mutationCache.mjs
var MutationCache = class extends Subscribable {
  constructor(config) {
    super();
    this.config = config || {};
    this.mutations = [];
    this.mutationId = 0;
  }
  build(client, options, state) {
    const mutation = new Mutation({
      mutationCache: this,
      logger: client.getLogger(),
      mutationId: ++this.mutationId,
      options: client.defaultMutationOptions(options),
      state,
      defaultOptions: options.mutationKey ? client.getMutationDefaults(options.mutationKey) : void 0
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    this.mutations.push(mutation);
    this.notify({
      type: "added",
      mutation
    });
  }
  remove(mutation) {
    this.mutations = this.mutations.filter((x) => x !== mutation);
    this.notify({
      type: "removed",
      mutation
    });
  }
  clear() {
    notifyManager.batch(() => {
      this.mutations.forEach((mutation) => {
        this.remove(mutation);
      });
    });
  }
  getAll() {
    return this.mutations;
  }
  find(filters) {
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.mutations.find((mutation) => matchMutation(filters, mutation));
  }
  findAll(filters) {
    return this.mutations.filter((mutation) => matchMutation(filters, mutation));
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    var _this$resuming;
    this.resuming = ((_this$resuming = this.resuming) != null ? _this$resuming : Promise.resolve()).then(() => {
      const pausedMutations = this.mutations.filter((x) => x.state.isPaused);
      return notifyManager.batch(() => pausedMutations.reduce((promise, mutation) => promise.then(() => mutation.continue().catch(noop)), Promise.resolve()));
    }).then(() => {
      this.resuming = void 0;
    });
    return this.resuming;
  }
};

// node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.mjs
function infiniteQueryBehavior() {
  return {
    onFetch: (context) => {
      context.fetchFn = () => {
        var _context$fetchOptions, _context$fetchOptions2, _context$fetchOptions3, _context$fetchOptions4, _context$state$data, _context$state$data2;
        const refetchPage = (_context$fetchOptions = context.fetchOptions) == null ? void 0 : (_context$fetchOptions2 = _context$fetchOptions.meta) == null ? void 0 : _context$fetchOptions2.refetchPage;
        const fetchMore = (_context$fetchOptions3 = context.fetchOptions) == null ? void 0 : (_context$fetchOptions4 = _context$fetchOptions3.meta) == null ? void 0 : _context$fetchOptions4.fetchMore;
        const pageParam = fetchMore == null ? void 0 : fetchMore.pageParam;
        const isFetchingNextPage = (fetchMore == null ? void 0 : fetchMore.direction) === "forward";
        const isFetchingPreviousPage = (fetchMore == null ? void 0 : fetchMore.direction) === "backward";
        const oldPages = ((_context$state$data = context.state.data) == null ? void 0 : _context$state$data.pages) || [];
        const oldPageParams = ((_context$state$data2 = context.state.data) == null ? void 0 : _context$state$data2.pageParams) || [];
        let newPageParams = oldPageParams;
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              var _context$signal;
              if ((_context$signal = context.signal) != null && _context$signal.aborted) {
                cancelled = true;
              } else {
                var _context$signal2;
                (_context$signal2 = context.signal) == null ? void 0 : _context$signal2.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = context.options.queryFn || (() => Promise.reject("Missing queryFn"));
        const buildNewPages = (pages, param, page, previous) => {
          newPageParams = previous ? [param, ...newPageParams] : [...newPageParams, param];
          return previous ? [page, ...pages] : [...pages, page];
        };
        const fetchPage = (pages, manual, param, previous) => {
          if (cancelled) {
            return Promise.reject("Cancelled");
          }
          if (typeof param === "undefined" && !manual && pages.length) {
            return Promise.resolve(pages);
          }
          const queryFnContext = {
            queryKey: context.queryKey,
            pageParam: param,
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext);
          const queryFnResult = queryFn(queryFnContext);
          const promise2 = Promise.resolve(queryFnResult).then((page) => buildNewPages(pages, param, page, previous));
          return promise2;
        };
        let promise;
        if (!oldPages.length) {
          promise = fetchPage([]);
        } else if (isFetchingNextPage) {
          const manual = typeof pageParam !== "undefined";
          const param = manual ? pageParam : getNextPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param);
        } else if (isFetchingPreviousPage) {
          const manual = typeof pageParam !== "undefined";
          const param = manual ? pageParam : getPreviousPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param, true);
        } else {
          newPageParams = [];
          const manual = typeof context.options.getNextPageParam === "undefined";
          const shouldFetchFirstPage = refetchPage && oldPages[0] ? refetchPage(oldPages[0], 0, oldPages) : true;
          promise = shouldFetchFirstPage ? fetchPage([], manual, oldPageParams[0]) : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0]));
          for (let i = 1; i < oldPages.length; i++) {
            promise = promise.then((pages) => {
              const shouldFetchNextPage = refetchPage && oldPages[i] ? refetchPage(oldPages[i], i, oldPages) : true;
              if (shouldFetchNextPage) {
                const param = manual ? oldPageParams[i] : getNextPageParam(context.options, pages);
                return fetchPage(pages, manual, param);
              }
              return Promise.resolve(buildNewPages(pages, oldPageParams[i], oldPages[i]));
            });
          }
        }
        const finalPromise = promise.then((pages) => ({
          pages,
          pageParams: newPageParams
        }));
        return finalPromise;
      };
    }
  };
}
function getNextPageParam(options, pages) {
  return options.getNextPageParam == null ? void 0 : options.getNextPageParam(pages[pages.length - 1], pages);
}
function getPreviousPageParam(options, pages) {
  return options.getPreviousPageParam == null ? void 0 : options.getPreviousPageParam(pages[0], pages);
}

// node_modules/@tanstack/query-core/build/lib/queryClient.mjs
var QueryClient = class {
  constructor(config = {}) {
    this.queryCache = config.queryCache || new QueryCache();
    this.mutationCache = config.mutationCache || new MutationCache();
    this.logger = config.logger || defaultLogger;
    this.defaultOptions = config.defaultOptions || {};
    this.queryDefaults = [];
    this.mutationDefaults = [];
    this.mountCount = 0;
    if (config.logger) {
      this.logger.error("Passing a custom logger has been deprecated and will be removed in the next major version.");
    }
  }
  mount() {
    this.mountCount++;
    if (this.mountCount !== 1)
      return;
    this.unsubscribeFocus = focusManager.subscribe(() => {
      if (focusManager.isFocused()) {
        this.resumePausedMutations();
        this.queryCache.onFocus();
      }
    });
    this.unsubscribeOnline = onlineManager.subscribe(() => {
      if (onlineManager.isOnline()) {
        this.resumePausedMutations();
        this.queryCache.onOnline();
      }
    });
  }
  unmount() {
    var _this$unsubscribeFocu, _this$unsubscribeOnli;
    this.mountCount--;
    if (this.mountCount !== 0)
      return;
    (_this$unsubscribeFocu = this.unsubscribeFocus) == null ? void 0 : _this$unsubscribeFocu.call(this);
    this.unsubscribeFocus = void 0;
    (_this$unsubscribeOnli = this.unsubscribeOnline) == null ? void 0 : _this$unsubscribeOnli.call(this);
    this.unsubscribeOnline = void 0;
  }
  isFetching(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    filters.fetchStatus = "fetching";
    return this.queryCache.findAll(filters).length;
  }
  isMutating(filters) {
    return this.mutationCache.findAll({
      ...filters,
      fetching: true
    }).length;
  }
  getQueryData(queryKey, filters) {
    var _this$queryCache$find;
    return (_this$queryCache$find = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find.state.data;
  }
  ensureQueryData(arg1, arg2, arg3) {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    const cachedData = this.getQueryData(parsedOptions.queryKey);
    return cachedData ? Promise.resolve(cachedData) : this.fetchQuery(parsedOptions);
  }
  getQueriesData(queryKeyOrFilters) {
    return this.getQueryCache().findAll(queryKeyOrFilters).map(({
      queryKey,
      state
    }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const query = this.queryCache.find(queryKey);
    const prevData = query == null ? void 0 : query.state.data;
    const data = functionalUpdate(updater, prevData);
    if (typeof data === "undefined") {
      return void 0;
    }
    const parsedOptions = parseQueryArgs(queryKey);
    const defaultedOptions = this.defaultQueryOptions(parsedOptions);
    return this.queryCache.build(this, defaultedOptions).setData(data, {
      ...options,
      manual: true
    });
  }
  setQueriesData(queryKeyOrFilters, updater, options) {
    return notifyManager.batch(() => this.getQueryCache().findAll(queryKeyOrFilters).map(({
      queryKey
    }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
  }
  getQueryState(queryKey, filters) {
    var _this$queryCache$find2;
    return (_this$queryCache$find2 = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find2.state;
  }
  removeQueries(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    const queryCache = this.queryCache;
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(arg1, arg2, arg3) {
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    const queryCache = this.queryCache;
    const refetchFilters = {
      type: "active",
      ...filters
    };
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }
  cancelQueries(arg1, arg2, arg3) {
    const [filters, cancelOptions = {}] = parseFilterArgs(arg1, arg2, arg3);
    if (typeof cancelOptions.revert === "undefined") {
      cancelOptions.revert = true;
    }
    const promises = notifyManager.batch(() => this.queryCache.findAll(filters).map((query) => query.cancel(cancelOptions)));
    return Promise.all(promises).then(noop).catch(noop);
  }
  invalidateQueries(arg1, arg2, arg3) {
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    return notifyManager.batch(() => {
      var _ref, _filters$refetchType;
      this.queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters.refetchType === "none") {
        return Promise.resolve();
      }
      const refetchFilters = {
        ...filters,
        type: (_ref = (_filters$refetchType = filters.refetchType) != null ? _filters$refetchType : filters.type) != null ? _ref : "active"
      };
      return this.refetchQueries(refetchFilters, options);
    });
  }
  refetchQueries(arg1, arg2, arg3) {
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    const promises = notifyManager.batch(() => this.queryCache.findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
      var _options$cancelRefetc;
      return query.fetch(void 0, {
        ...options,
        cancelRefetch: (_options$cancelRefetc = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc : true,
        meta: {
          refetchPage: filters.refetchPage
        }
      });
    }));
    let promise = Promise.all(promises).then(noop);
    if (!(options != null && options.throwOnError)) {
      promise = promise.catch(noop);
    }
    return promise;
  }
  fetchQuery(arg1, arg2, arg3) {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    const defaultedOptions = this.defaultQueryOptions(parsedOptions);
    if (typeof defaultedOptions.retry === "undefined") {
      defaultedOptions.retry = false;
    }
    const query = this.queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(arg1, arg2, arg3) {
    return this.fetchQuery(arg1, arg2, arg3).then(noop).catch(noop);
  }
  fetchInfiniteQuery(arg1, arg2, arg3) {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    parsedOptions.behavior = infiniteQueryBehavior();
    return this.fetchQuery(parsedOptions);
  }
  prefetchInfiniteQuery(arg1, arg2, arg3) {
    return this.fetchInfiniteQuery(arg1, arg2, arg3).then(noop).catch(noop);
  }
  resumePausedMutations() {
    return this.mutationCache.resumePausedMutations();
  }
  getQueryCache() {
    return this.queryCache;
  }
  getMutationCache() {
    return this.mutationCache;
  }
  getLogger() {
    return this.logger;
  }
  getDefaultOptions() {
    return this.defaultOptions;
  }
  setDefaultOptions(options) {
    this.defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    const result = this.queryDefaults.find((x) => hashQueryKey(queryKey) === hashQueryKey(x.queryKey));
    if (result) {
      result.defaultOptions = options;
    } else {
      this.queryDefaults.push({
        queryKey,
        defaultOptions: options
      });
    }
  }
  getQueryDefaults(queryKey) {
    if (!queryKey) {
      return void 0;
    }
    const firstMatchingDefaults = this.queryDefaults.find((x) => partialMatchKey(queryKey, x.queryKey));
    if (true) {
      const matchingDefaults = this.queryDefaults.filter((x) => partialMatchKey(queryKey, x.queryKey));
      if (matchingDefaults.length > 1) {
        this.logger.error("[QueryClient] Several query defaults match with key '" + JSON.stringify(queryKey) + "'. The first matching query defaults are used. Please check how query defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydefaults.");
      }
    }
    return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
  }
  setMutationDefaults(mutationKey, options) {
    const result = this.mutationDefaults.find((x) => hashQueryKey(mutationKey) === hashQueryKey(x.mutationKey));
    if (result) {
      result.defaultOptions = options;
    } else {
      this.mutationDefaults.push({
        mutationKey,
        defaultOptions: options
      });
    }
  }
  getMutationDefaults(mutationKey) {
    if (!mutationKey) {
      return void 0;
    }
    const firstMatchingDefaults = this.mutationDefaults.find((x) => partialMatchKey(mutationKey, x.mutationKey));
    if (true) {
      const matchingDefaults = this.mutationDefaults.filter((x) => partialMatchKey(mutationKey, x.mutationKey));
      if (matchingDefaults.length > 1) {
        this.logger.error("[QueryClient] Several mutation defaults match with key '" + JSON.stringify(mutationKey) + "'. The first matching mutation defaults are used. Please check how mutation defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetmutationdefaults.");
      }
    }
    return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
  }
  defaultQueryOptions(options) {
    if (options != null && options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...this.defaultOptions.queries,
      ...this.getQueryDefaults(options == null ? void 0 : options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
    }
    if (typeof defaultedOptions.refetchOnReconnect === "undefined") {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (typeof defaultedOptions.useErrorBoundary === "undefined") {
      defaultedOptions.useErrorBoundary = !!defaultedOptions.suspense;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options != null && options._defaulted) {
      return options;
    }
    return {
      ...this.defaultOptions.mutations,
      ...this.getMutationDefaults(options == null ? void 0 : options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    this.queryCache.clear();
    this.mutationCache.clear();
  }
};

// node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs
var React8 = __toESM(require_react(), 1);
var defaultContext = /* @__PURE__ */ React8.createContext(void 0);
var QueryClientSharingContext = /* @__PURE__ */ React8.createContext(false);
function getQueryClientContext(context, contextSharing) {
  if (context) {
    return context;
  }
  if (contextSharing && typeof window !== "undefined") {
    if (!window.ReactQueryClientContext) {
      window.ReactQueryClientContext = defaultContext;
    }
    return window.ReactQueryClientContext;
  }
  return defaultContext;
}
var QueryClientProvider = ({
  client,
  children,
  context,
  contextSharing = false
}) => {
  React8.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  if (contextSharing) {
    client.getLogger().error("The contextSharing option has been deprecated and will be removed in the next major version");
  }
  const Context = getQueryClientContext(context, contextSharing);
  return /* @__PURE__ */ React8.createElement(QueryClientSharingContext.Provider, {
    value: !context && contextSharing
  }, /* @__PURE__ */ React8.createElement(Context.Provider, {
    value: client
  }, children));
};

// src/AppContent.js
var import_react97 = __toESM(require_react());

// src/assets/juno-danger.svg
var React9 = __toESM(require_react());
var SvgComponent = (props) => /* @__PURE__ */ React9.createElement("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", ...props }, /* @__PURE__ */ React9.createElement("path", { d: "M22,17.9999996 L22,19.9999996 L2,19.9999996 L2,17.9999996 L22,17.9999996 Z M12,6.428571 C14.7642857,6.428571 17.0146825,8.23991359 17.1375716,10.5179164 L17.1428571,10.7142853 L17.1428571,16.7142853 L6.85714286,16.7142853 L6.85714286,10.7142853 L6.86242835,10.5179164 C6.98531746,8.23991359 9.23571429,6.428571 12,6.428571 Z M12,7.71428529 L12,15.428571 L15.8571429,15.428571 L15.8571429,11.1428567 L15.851803,10.960591 C15.745448,9.15003461 14.0636603,7.71428529 12,7.71428529 Z M19.075912,3.96838198 L20.490712,5.38218198 L18.370012,7.50438202 L16.955212,6.09058202 L19.075912,3.96838198 Z M4.956739,3.939208 L7.078039,6.060508 L5.663839,7.474708 L3.542539,5.353408 L4.956739,3.939208 Z M13,1.428571 L13,4.428571 L11,4.428571 L11,1.428571 L13,1.428571 Z" }));
var juno_danger_default = SvgComponent;

// src/assets/juno-danger.svg?url
var juno_danger_default2 = 'data:image/svg+xml,<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">%0A    <path d="M22,17.9999996 L22,19.9999996 L2,19.9999996 L2,17.9999996 L22,17.9999996 Z M12,6.428571 C14.7642857,6.428571 17.0146825,8.23991359 17.1375716,10.5179164 L17.1428571,10.7142853 L17.1428571,16.7142853 L6.85714286,16.7142853 L6.85714286,10.7142853 L6.86242835,10.5179164 C6.98531746,8.23991359 9.23571429,6.428571 12,6.428571 Z M12,7.71428529 L12,15.428571 L15.8571429,15.428571 L15.8571429,11.1428567 L15.851803,10.960591 C15.745448,9.15003461 14.0636603,7.71428529 12,7.71428529 Z M19.075912,3.96838198 L20.490712,5.38218198 L18.370012,7.50438202 L16.955212,6.09058202 L19.075912,3.96838198 Z M4.956739,3.939208 L7.078039,6.060508 L5.663839,7.474708 L3.542539,5.353408 L4.956739,3.939208 Z M13,1.428571 L13,4.428571 L11,4.428571 L11,1.428571 L13,1.428571 Z"></path>%0A</svg>';

// src/assets/map.svg?url
var map_default = "./map-HCRMJ37Q.svg?url";

// src/assets/rocket.gif
var rocket_default = "./rocket-IXI6AQNY.gif";

// src/AppContent.js
var AppContent = (props) => {
  const [counter, setCounter] = (0, import_react97.useState)(0);
  (0, import_react97.useEffect)(() => {
    alert("Hello World" + counter);
  }, [counter]);
  function incrementCounter() {
    setCounter(counter + 1);
  }
  return /* @__PURE__ */ import_react97.default.createElement(Container, null, /* @__PURE__ */ import_react97.default.createElement("button", { onClick: incrementCounter }, counter), /* @__PURE__ */ import_react97.default.createElement("div", null, "Hello World!!!"), /* @__PURE__ */ import_react97.default.createElement("h3", { className: "text-xl pt-8" }, "SVG Example 1: SVG as component"), /* @__PURE__ */ import_react97.default.createElement("p", null, "The SVG will be included as text, this way it can be colored with CSS.", " ", /* @__PURE__ */ import_react97.default.createElement("br", null), "Uses svgr lib"), /* @__PURE__ */ import_react97.default.createElement(juno_danger_default, { className: "text-theme-accent fill-current w-28 h-auto" }), /* @__PURE__ */ import_react97.default.createElement("h3", { className: "text-xl pt-8" }, "SVG Example 2: SVG as background image in JSX"), /* @__PURE__ */ import_react97.default.createElement(
    "div",
    {
      style: {
        background: `url('${new URL(juno_danger_default2, import.meta.url).href}')`
      }
    },
    "This time the image should be a background image",
    /* @__PURE__ */ import_react97.default.createElement("code", null, "background: url('new URL(svgAsBackgroundImage, import.meta.url).href')"),
    " ",
    "to the className of the div, so that tailwind applies the bg image.",
    /* @__PURE__ */ import_react97.default.createElement("br", null),
    "It should also decide automatically between embedding the image as a dataUrl or referencing it via link, depending on file size (see CSS examples below)"
  ), /* @__PURE__ */ import_react97.default.createElement("h3", { className: "text-xl pt-8" }, "SVG Example 3: SVG as background image in CSS"), /* @__PURE__ */ import_react97.default.createElement("div", { className: "svg-bg-test" }, "This has a background image applied in CSS.", /* @__PURE__ */ import_react97.default.createElement("br", null), "Because the image is very small it will be embedded inline in the CSS as a dataURL."), /* @__PURE__ */ import_react97.default.createElement("h3", { className: "text-xl pt-8" }, "SVG Example 4: SVG as background image in CSS (big file)"), /* @__PURE__ */ import_react97.default.createElement(
    "div",
    {
      className: "svg-bg-test-big-file h-[400px]",
      style: {
        backgroundImage: `url('${new URL(map_default, import.meta.url).href}')`
      }
    },
    "This has a background image applied as style.",
    /* @__PURE__ */ import_react97.default.createElement("br", null),
    "Because the image has a large filesize it is not embedded as a dataURL but instead is referenced as a link.",
    /* @__PURE__ */ import_react97.default.createElement("br", null),
    "This happens automatically (the loader decides when the image is too large to embed inline)"
  ), /* @__PURE__ */ import_react97.default.createElement("h3", { className: "text-xl pt-8" }, "Image Example"), /* @__PURE__ */ import_react97.default.createElement("img", { src: new URL(rocket_default, import.meta.url).href }));
};
var AppContent_default = AppContent;

// src/styles.scss
var styles_default = `/* Do not remove these tailwind directives. Without them styles won't work as expected */
*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}
::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}
.container {
  width: 100%;
}
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
.inline {
  display: inline;
}
.flex {
  display: flex;
}
.h-\\[400px\\] {
  height: 400px;
}
.h-auto {
  height: auto;
}
.w-28 {
  width: 7rem;
}
.flex-grow {
  flex-grow: 1;
}
.fill-current {
  fill: currentColor;
}
.pt-8 {
  padding-top: 2rem;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.text-theme-accent {
  --tw-text-opacity: 1;
  color: rgba(var(--color-accent-raw), var(--tw-text-opacity));
}
.shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
/* If necessary, app styles can be added below */
.svg-bg-test {
  background: url("data:image/svg+xml,%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e    %3cpath d='M22,17.9999996 L22,19.9999996 L2,19.9999996 L2,17.9999996 L22,17.9999996 Z M12,6.428571 C14.7642857,6.428571 17.0146825,8.23991359 17.1375716,10.5179164 L17.1428571,10.7142853 L17.1428571,16.7142853 L6.85714286,16.7142853 L6.85714286,10.7142853 L6.86242835,10.5179164 C6.98531746,8.23991359 9.23571429,6.428571 12,6.428571 Z M12,7.71428529 L12,15.428571 L15.8571429,15.428571 L15.8571429,11.1428567 L15.851803,10.960591 C15.745448,9.15003461 14.0636603,7.71428529 12,7.71428529 Z M19.075912,3.96838198 L20.490712,5.38218198 L18.370012,7.50438202 L16.955212,6.09058202 L19.075912,3.96838198 Z M4.956739,3.939208 L7.078039,6.060508 L5.663839,7.474708 L3.542539,5.353408 L4.956739,3.939208 Z M13,1.428571 L13,4.428571 L11,4.428571 L11,1.428571 L13,1.428571 Z'%3e%3c/path%3e%3c/svg%3e");
}`;

// src/App.js
var URL_STATE_KEY = "limesUI";
var App = (props = {}) => {
  const { setUrlStateKey } = useGlobalsActions();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        meta: {
          endpoint: props.endpoint || props.currentHost || ""
        }
      }
    }
  });
  import_react98.default.useEffect(() => {
    setUrlStateKey(URL_STATE_KEY);
  }, []);
  return /* @__PURE__ */ import_react98.default.createElement(QueryClientProvider, { client: queryClient }, /* @__PURE__ */ import_react98.default.createElement(
    AppShell,
    {
      pageHeader: "Converged Cloud | App limesUI",
      contentHeading: "App limesUI page title",
      embedded: props.embedded === "true" || props.embedded === true
    },
    /* @__PURE__ */ import_react98.default.createElement(AppContent_default, { props })
  ));
};
var StyledApp = (props) => {
  return /* @__PURE__ */ import_react98.default.createElement(AppShellProvider, { theme: `${props.theme ? props.theme : "theme-dark"}` }, /* @__PURE__ */ import_react98.default.createElement("style", null, styles_default.toString()), /* @__PURE__ */ import_react98.default.createElement(StoreProvider_default, null, /* @__PURE__ */ import_react98.default.createElement(App, { ...props })));
};
var App_default = StyledApp;
export {
  App_default as default
};
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=App-TP7WGUZM.js.map
