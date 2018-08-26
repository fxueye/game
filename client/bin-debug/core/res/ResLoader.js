var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var ResLoader = (function () {
    function ResLoader() {
        this._groupIndex = 0;
        this._configs = new Array();
        this._groups = {};
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    }
    ResLoader.prototype.addConfig = function (jsonPath, filePath) {
        this._configs.push([jsonPath, filePath]);
    };
    ResLoader.prototype.setComplete = function (onConfigComplete, onConfigCompleteTarget) {
        this._onConfigComplete = onConfigComplete;
        this._onConfigCompleteTarget = onConfigCompleteTarget;
    };
    ResLoader.prototype.loadConfig = function (onConfigComplete, onConfigCompleteTarget) {
        this._onConfigComplete = onConfigComplete;
        this._onConfigCompleteTarget = onConfigCompleteTarget;
        this.loadNextConfig();
    };
    ResLoader.prototype.asyncLoadConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._configs.length != 0)) return [3 /*break*/, 2];
                        arr = this._configs.shift();
                        return [4 /*yield*/, RES.loadConfig(arr[0], arr[1])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ResLoader.prototype.loadNextConfig = function () {
        if (this._configs.length == 0) {
            this._onConfigComplete.call(this._onConfigCompleteTarget);
            this._onConfigComplete = null;
            this._onConfigCompleteTarget = null;
            return;
        }
        var arr = this._configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    };
    ResLoader.prototype.onConfigCompleteHandle = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    };
    ResLoader.prototype.asyncLoadGroup = function (groupName, reporter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, RES.loadGroup(groupName, 0, reporter)];
            });
        });
    };
    ResLoader.prototype.loadGroup = function (groupName, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadCompleteTarget) {
        this._groups[groupName] = [onResourceLoadComplete, onResourceLoadProgress, onResourceLoadCompleteTarget];
        RES.loadGroup(groupName);
    };
    ResLoader.prototype.loadGroups = function (groupName, subGroups, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget) {
        RES.createGroup(groupName, subGroups, true);
        this.loadGroup(groupName, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget);
    };
    ResLoader.prototype.onResourceLoadComplete = function (event) {
        var groupName = event.groupName;
        if (this._groups[groupName]) {
            var loadComplete = this._groups[groupName][0];
            var loadCompleteTarget = this._groups[groupName][2];
            if (loadComplete != null) {
                loadComplete.call(loadCompleteTarget, groupName);
            }
            this._groups[groupName] = null;
            delete this._groups[groupName];
        }
    };
    ResLoader.prototype.onResourceLoadProgress = function (event) {
        var groupName = event.groupName;
        if (this._groups[groupName]) {
            var loadProgress = this._groups[groupName][1];
            var loadProgressTarget = this._groups[groupName[2]];
            if (loadProgress != null) {
                loadProgress.call(loadProgressTarget, event.itemsLoaded, event.itemsTotal);
            }
        }
    };
    ResLoader.prototype.onResourceLoadError = function (event) {
        Logger.log(event.groupName + " load failed!");
        this.onResourceLoadComplete(event);
    };
    ResLoader.prototype.createGroup = function (groupName, resKeys) {
        RES.createGroup(groupName, resKeys, true);
    };
    ResLoader.prototype.loadResource = function (resource, groups, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadCompleteTarget) {
        if (resource === void 0) { resource = []; }
        if (groups === void 0) { groups = []; }
        if (onResourceLoadComplete === void 0) { onResourceLoadComplete = null; }
        if (onResourceLoadProgress === void 0) { onResourceLoadProgress = null; }
        if (onResourceLoadCompleteTarget === void 0) { onResourceLoadCompleteTarget = null; }
        var needLoadArr = resource.concat(groups);
        var tempName = "loadGroup_" + this._groupIndex++;
        RES.createGroup(tempName, needLoadArr, true);
        this._groups[tempName] = [onResourceLoadComplete, onResourceLoadProgress, onResourceLoadCompleteTarget];
        RES.loadGroup(tempName);
    };
    return ResLoader;
}());
__reflect(ResLoader.prototype, "ResLoader");
//# sourceMappingURL=ResLoader.js.map