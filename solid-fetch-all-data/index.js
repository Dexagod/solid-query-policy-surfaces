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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
exports.__esModule = true;
var css_generate_fetch_token_1 = require("../css-generate-fetch-token");
var solid_client_1 = require("@inrupt/solid-client");
var fs_1 = require("fs");
var web_streams_node_1 = require("web-streams-node");
var TinyQueue = require('tinyqueue');
var path = require('path');
function downloadSolidRDFResources(podRoot, tokenLocation, storageLocation, includeMetadata) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var authenticatedFetch, r1, resourceURIs, resourceURIs_1, resourceURIs_1_1, uri, ri, links, meta, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    includeMetadata = includeMetadata || false;
                    if (!storageLocation.endsWith('/'))
                        throw new Error('Storage location value should end in "/".');
                    return [4 /*yield*/, css_generate_fetch_token_1["default"](tokenLocation)];
                case 1:
                    authenticatedFetch = _b.sent();
                    return [4 /*yield*/, authenticatedFetch('https://publicpod.rubendedecker.be/ruben/')];
                case 2:
                    r1 = _b.sent();
                    resourceURIs = findAllDocumentURIs(podRoot, authenticatedFetch);
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 9, 10, 15]);
                    resourceURIs_1 = __asyncValues(resourceURIs);
                    _b.label = 4;
                case 4: return [4 /*yield*/, resourceURIs_1.next()];
                case 5:
                    if (!(resourceURIs_1_1 = _b.sent(), !resourceURIs_1_1.done)) return [3 /*break*/, 8];
                    uri = resourceURIs_1_1.value;
                    retrieveDocument(uri, authenticatedFetch, storageLocation, podRoot);
                    if (!includeMetadata) return [3 /*break*/, 7];
                    return [4 /*yield*/, solid_client_1.getResourceInfo(uri, { fetch: authenticatedFetch })];
                case 6:
                    ri = _b.sent();
                    links = ri.internal_resourceInfo.linkedResources;
                    meta = links.describedby && links.describedby.length && links.describedby[0];
                    if (meta)
                        retrieveDocument(meta, authenticatedFetch, storageLocation, podRoot);
                    _b.label = 7;
                case 7: return [3 /*break*/, 4];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _b.trys.push([10, , 13, 14]);
                    if (!(resourceURIs_1_1 && !resourceURIs_1_1.done && (_a = resourceURIs_1["return"]))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _a.call(resourceURIs_1)];
                case 11:
                    _b.sent();
                    _b.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15: return [2 /*return*/];
            }
        });
    });
}
exports.downloadSolidRDFResources = downloadSolidRDFResources;
function findAllDocumentURIs(containerUrl, authenticatedFetch) {
    return __asyncGenerator(this, arguments, function findAllDocumentURIs_1() {
        var queue, container, resourceDS, resourceURIs, _i, resourceURIs_2, uri;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!containerUrl.endsWith('/')) {
                        throw new Error('Container URLs should end in a "/".');
                    }
                    queue = new TinyQueue();
                    queue.push(containerUrl);
                    container = queue.pop();
                    _a.label = 1;
                case 1:
                    if (!container) return [3 /*break*/, 9];
                    return [4 /*yield*/, __await(solid_client_1.getSolidDataset(container, { fetch: authenticatedFetch }))];
                case 2:
                    resourceDS = _a.sent();
                    resourceURIs = solid_client_1.getContainedResourceUrlAll(resourceDS);
                    _i = 0, resourceURIs_2 = resourceURIs;
                    _a.label = 3;
                case 3:
                    if (!(_i < resourceURIs_2.length)) return [3 /*break*/, 8];
                    uri = resourceURIs_2[_i];
                    if (!uri.endsWith('/')) return [3 /*break*/, 4];
                    queue.push(uri);
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, __await((uri))];
                case 5: return [4 /*yield*/, _a.sent()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8:
                    container = queue.pop();
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function retrieveDocument(url, f, storageLocation, podRoot) {
    return __awaiter(this, void 0, void 0, function () {
        var res, filepath, fileStream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, f(url, {
                        headers: { "Accept": "text/n3" }
                    })];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        console.error("Could not retrieve resource at location " + url);
                        return [2 /*return*/];
                    }
                    filepath = "" + storageLocation + url.replace(podRoot, '') + ".n3";
                    fs_1.mkdirSync(path.dirname(filepath), { recursive: true });
                    console.log('Writing to: ', filepath);
                    fileStream = fs_1.createWriteStream(filepath);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var body = toReadableStream(res.body);
                            body.pipe(fileStream);
                            body.on("error", reject);
                            fileStream.on("finish", resolve);
                            fileStream.on("end", resolve);
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Converts a WhatWG streams to Node streams if required.
 * Returns the input in case the stream already is a Node stream.
 * @param {ReadableStream} body
 * @returns {NodeJS.ReadableStream}
 */
function toReadableStream(body) {
    return require("is-stream")(body) ? body : web_streams_node_1.toNodeReadable(body);
}
