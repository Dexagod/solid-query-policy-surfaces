"use strict";
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
var solid_client_authn_core_1 = require("@inrupt/solid-client-authn-core");
var fs_1 = require("fs");
var node_fetch_1 = require("node-fetch");
function generateFetch(tokenLocation) {
    return __awaiter(this, void 0, void 0, function () {
        var token, id, secret, idp, dpopKey, authString, tokenUrl, response, _a, _b, _c, _d, accessToken, authenticatedFetch;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    token = JSON.parse(fs_1.readFileSync(tokenLocation, { encoding: "utf8" }));
                    id = token.id, secret = token.secret, idp = token.idp;
                    return [4 /*yield*/, solid_client_authn_core_1.generateDpopKeyPair()];
                case 1:
                    dpopKey = _e.sent();
                    authString = encodeURIComponent(id) + ":" + encodeURIComponent(secret);
                    tokenUrl = idp + ".oidc/token";
                    _a = node_fetch_1["default"];
                    _b = [tokenUrl];
                    _c = {
                        method: 'POST'
                    };
                    _d = {
                        // The header needs to be in base64 encoding.
                        authorization: "Basic " + Buffer.from(authString).toString('base64'),
                        'content-type': 'application/x-www-form-urlencoded'
                    };
                    return [4 /*yield*/, solid_client_authn_core_1.createDpopHeader(tokenUrl, 'POST', dpopKey)];
                case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_c.headers = (_d.dpop = _e.sent(),
                            _d),
                            _c.body = 'grant_type=client_credentials&scope=webid',
                            _c)]))];
                case 3:
                    response = _e.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    accessToken = (_e.sent()).access_token;
                    return [4 /*yield*/, solid_client_authn_core_1.buildAuthenticatedFetch(node_fetch_1["default"], accessToken, { dpopKey: dpopKey })];
                case 5:
                    authenticatedFetch = _e.sent();
                    return [2 /*return*/, authenticatedFetch];
            }
        });
    });
}
exports["default"] = generateFetch;
