var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjGenerator = (function () {
    function ObjGenerator(val) {
        this._dis = null;
        this._dis = val;
    }
    ObjGenerator.prototype.getObj = function (type) {
        var obj = this._dis.get(type);
        if (obj == null) {
            obj = this.createObj(type);
            this._dis.add(obj);
            obj.reset();
        }
        return obj;
    };
    ObjGenerator.prototype.createObj = function (type) {
        switch (type) {
            case ObjectType.MOVIECLIP:
                return new MovieClip();
        }
    };
    return ObjGenerator;
}());
__reflect(ObjGenerator.prototype, "ObjGenerator");
//# sourceMappingURL=ObjGenerator.js.map