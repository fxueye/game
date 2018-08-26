var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ParticleUtils = (function () {
    function ParticleUtils() {
    }
    ParticleUtils.addParticle = function (obj, id) {
        var conf = ParticleConfig.Dic.get(id);
        var ps = ParticleUtils.paricleDic.get(id);
        if (conf == null) {
            console.error("ParticleConfig not find id:" + id);
            return;
        }
        if (ps == null) {
            var texture = RES.getRes(conf.Texture);
            var config = RES.getRes(conf.Config);
            ps = new particle.GravityParticleSystem(texture, config);
            ParticleUtils.paricleDic.add(id, ps);
        }
        obj.addChild(ps);
        ps.start();
        if (conf.Location.length >= 2) {
            ps.x = conf.Location[0];
            ps.y = conf.Location[1];
        }
        if (conf.Scale.length >= 2) {
            ps.scaleX = conf.Scale[0];
            ps.scaleY = conf.Scale[1];
        }
    };
    ParticleUtils.delParticle = function (obj, id) {
        var ps = ParticleUtils.paricleDic.get(id);
        if (ps) {
            if (obj.getChildIndex(ps) != -1) {
                obj.removeChild(ps);
                ps.stop();
            }
        }
    };
    ParticleUtils.paricleDic = new Dictionary();
    return ParticleUtils;
}());
__reflect(ParticleUtils.prototype, "ParticleUtils");
//# sourceMappingURL=ParticleUtils.js.map