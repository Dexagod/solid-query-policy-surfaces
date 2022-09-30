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
var commander_1 = require("commander");
var _1 = require(".");
var fs_1 = require("fs");
var inquirer = require("inquirer");
commander_1.program
    .option('-e, --email <string>')
    .option('-p, --password <string>')
    .option('-w, --webid <string>')
    .option('-i, --idp <string>')
    .option('-o, --out <string>');
commander_1.program.parse();
var options = commander_1.program.opts();
function handleAction() {
    return __awaiter(this, void 0, void 0, function () {
        var webidLogin, questions, answers, overwriteFile, token, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    webidLogin = true;
                    if (!(!options.webid && !options.idp)) return [3 /*break*/, 2];
                    console.log("Do you want to authenticate with WebID (Y) or with Identity Provider (n)? [Y/n] ");
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            process.stdin.setRawMode(true);
                            process.stdin.resume();
                            process.stdin.on('data', function (chk) {
                                if (chk.toString('utf8') === "n") {
                                    resolve(false);
                                }
                                else {
                                    resolve(true);
                                }
                            });
                        })];
                case 1:
                    webidLogin = _a.sent();
                    _a.label = 2;
                case 2:
                    questions = [];
                    if (webidLogin && !options.webid)
                        questions.push({ type: 'input', name: 'webid', message: 'User WebID' });
                    if (!webidLogin && !options.idp)
                        questions.push({ type: 'input', name: 'idp', message: 'User Identity Provider' });
                    if (!options.email)
                        questions.push({ type: 'input', name: 'email', message: 'User email' });
                    if (!options.password)
                        questions.push({ type: 'password', name: 'password', message: 'User password' });
                    if (!options.out)
                        questions.push({ type: 'input', name: 'out', message: 'Auth token output location' });
                    if (!questions.length) return [3 /*break*/, 4];
                    return [4 /*yield*/, inquirer.prompt(questions)];
                case 3:
                    answers = _a.sent();
                    options = __assign(__assign({}, options), answers);
                    _a.label = 4;
                case 4:
                    options.webId = options.webid;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 13, , 14]);
                    overwriteFile = true;
                    if (!(0, fs_1.existsSync)(options.out)) return [3 /*break*/, 7];
                    console.log("Do you want to overwrite existing file at: ".concat(options.out, "? [Y/n] "));
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            process.stdin.setRawMode(true);
                            process.stdin.resume();
                            process.stdin.on('data', function (chk) {
                                if (chk.toString('utf8') === "n") {
                                    resolve(false);
                                }
                                else {
                                    resolve(true);
                                }
                            });
                        })];
                case 6:
                    overwriteFile = _a.sent();
                    _a.label = 7;
                case 7:
                    if (!overwriteFile)
                        throw new Error('Please provide a valid output location.');
                    if (!options.email)
                        throw new Error('No valid email given.');
                    if (!options.password)
                        throw new Error('No valid password given.');
                    if (!options.out)
                        throw new Error('No valid output file location given.');
                    token = void 0;
                    if (!options.webid) return [3 /*break*/, 9];
                    return [4 /*yield*/, (0, _1.generateTokenWithWebID)(options)];
                case 8:
                    token = _a.sent();
                    return [3 /*break*/, 12];
                case 9:
                    if (!options.idp) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, _1.generateTokenWithIDP)(options)];
                case 10:
                    token = _a.sent();
                    return [3 /*break*/, 12];
                case 11: throw new Error('No valid IDP or WebID values given.');
                case 12:
                    if (!token)
                        throw new Error('');
                    (0, fs_1.writeFileSync)(options.out, JSON.stringify(token, null, 2));
                    console.log("Generated token was written to: ".concat(options.out));
                    return [3 /*break*/, 14];
                case 13:
                    e_1 = _a.sent();
                    console.error("Cannot create token: ".concat(e_1.message));
                    process.exit(1);
                    return [3 /*break*/, 14];
                case 14:
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
handleAction();
