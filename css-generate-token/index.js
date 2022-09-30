"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.findWebIDIssuers = exports.generateTokenWithIDP = exports.generateTokenWithWebID = void 0;
var node_fetch_1 = require("node-fetch");
var n3_1 = require("n3");
function generateTokenWithWebID(options) {
    return __awaiter(this, void 0, void 0, function () {
        var name, issuers, issuer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "Solid-cli-token-generation-script";
                    return [4 /*yield*/, findWebIDIssuers(options.webId)];
                case 1:
                    issuers = _a.sent();
                    if (!issuers || (issuers === null || issuers === void 0 ? void 0 : issuers.length) === 0) {
                        throw new Error("No OIDC issuers found on the profile document. Please make sure you have a solid:oidcIssuer triple present on your profile document!");
                    }
                    issuer = issuers[0];
                    return [4 /*yield*/, handleTokenGeneration(__assign({ name: name, idp: issuer }, options))];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.generateTokenWithWebID = generateTokenWithWebID;
function generateTokenWithIDP(options) {
    return __awaiter(this, void 0, void 0, function () {
        var name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "Solid-cli-token-generation-script";
                    return [4 /*yield*/, handleTokenGeneration(__assign({ name: name }, options))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.generateTokenWithIDP = generateTokenWithIDP;
function handleTokenGeneration(options) {
    return __awaiter(this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateCSSToken(options)];
                case 1:
                    token = _a.sent();
                    if (!token)
                        throw new Error('Token could not be generated.');
                    return [2 /*return*/, token];
            }
        });
    });
}
function findWebIDIssuers(webId) {
    return __awaiter(this, void 0, void 0, function () {
        var res, text, parser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1["default"])(webId, {
                        headers: { 'Accept': 'text/turtle' }
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.text()];
                case 2:
                    text = _a.sent();
                    if (!res.ok) {
                        throw new Error("Error retrieving WebID document: ".concat(text));
                    }
                    parser = new n3_1.Parser({ format: 'text/turtle' });
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var issuers = [];
                            parser.parse(text, function (error, quad, prefixes) {
                                if (error)
                                    reject(error);
                                if (quad) {
                                    if (quad.predicate.value === "http://www.w3.org/ns/solid/terms#oidcIssuer") {
                                        issuers.push(quad.object.value);
                                    }
                                }
                                else
                                    resolve(issuers);
                            });
                        })];
            }
        });
    });
}
exports.findWebIDIssuers = findWebIDIssuers;
function generateCSSToken(options) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!options.idp.endsWith('/'))
                        options.idp += '/';
                    url = "".concat(options.idp, "idp/credentials/");
                    return [4 /*yield*/, (0, node_fetch_1["default"])(url, {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            // The email/password fields are those of your account.
                            // The name field will be used when generating the ID of your token.
                            body: JSON.stringify({ email: options.email, password: options.password, name: options.name })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        writeTokenError(url, response.status, response.statusText);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    token = _a.sent();
                    if (token.errorCode) {
                        writeTokenError(url, response.status, response.statusText);
                        return [2 /*return*/];
                    }
                    token.name = options.name;
                    token.email = options.email;
                    token.idp = options.idp;
                    return [2 /*return*/, token];
            }
        });
    });
}
function writeTokenError(url, status, statusText) {
    throw new Error("\nFailed to create token.\nError posting to credentials endpoint at ".concat(url, ": ").concat(status, " ").concat(statusText, ".\nPlease check your provided credentials!\n"));
}
