var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerGWCmdsPacketGenerate = (function () {
    function ServerGWCmdsPacketGenerate() {
    }
    ServerGWCmdsPacketGenerate.HeartBeatPacket = function (seqID, player) {
        var pack = new Net.Simple.Packet();
        pack.PutShort(seqID);
        pack.PutShort(0);
        player.Encode(pack);
        return pack;
    };
    ServerGWCmdsPacketGenerate.LoginGuestPacket = function (seqID, devID, deviceType, partnerID, version) {
        var pack = new Net.Simple.Packet();
        pack.PutShort(seqID);
        pack.PutShort(10001);
        pack.PutString(devID);
        pack.PutString(deviceType);
        pack.PutString(partnerID);
        pack.PutString(version);
        return pack;
    };
    ServerGWCmdsPacketGenerate.LoginPlatformPacket = function (seqID, ptID, account, deviceType, partnerID, version, reconnect, token, extension) {
        var pack = new Net.Simple.Packet();
        pack.PutShort(seqID);
        pack.PutShort(10002);
        pack.PutString(ptID);
        pack.PutString(account);
        pack.PutString(deviceType);
        pack.PutString(partnerID);
        pack.PutString(version);
        pack.PutBool(reconnect);
        pack.PutString(token);
        pack.PutString(extension);
        return pack;
    };
    return ServerGWCmdsPacketGenerate;
}());
__reflect(ServerGWCmdsPacketGenerate.prototype, "ServerGWCmdsPacketGenerate");
//# sourceMappingURL=ServerGWCmdsPacketGenerate.js.map