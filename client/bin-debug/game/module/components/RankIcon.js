var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var RankIcon = (function (_super) {
    __extends(RankIcon, _super);
    function RankIcon() {
        return _super.call(this) || this;
    }
    RankIcon.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.imgRank.visible = true;
        // this.lbRank.visible = true;
    };
    RankIcon.prototype.dataChanged = function () {
        if (this.data.Rank == 0) {
            this.imgRank.visible = false;
        }
        else {
            this.imgRank.visible = true;
        }
        if (this.data.Rank < 4) {
            this.lbRank.visible = false;
        }
        else {
            this.lbRank.visible = true;
        }
        this.lbRank.text = StringUtils.pad(this.data.Rank, 2);
    };
    return RankIcon;
}(Icon));
__reflect(RankIcon.prototype, "RankIcon");
//# sourceMappingURL=RankIcon.js.map