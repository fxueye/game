var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerCSCmdsPacketGenerate = (function () {
    function ServerCSCmdsPacketGenerate() {
    }
    ServerCSCmdsPacketGenerate.GW2CS_PingPacket = function (seqID) {
        var pack = new Net.Simple.Packet();
        pack.PutShort(seqID);
        pack.PutShort(22001);
        return pack;
    };
    ServerCSCmdsPacketGenerate.GW2CS_LoginGuestPacket = function (seqID, deviceID, deviceType, partnerID, ip) {
        var pack = new Net.Simple.Packet();
        pack.PutShort(seqID);
        pack.PutShort(22004);
        pack.PutString(deviceID);
        pack.PutString(deviceType);
        pack.PutString(partnerID);
        pack.PutString(ip);
        return pack;
    };
    return ServerCSCmdsPacketGenerate;
}());
__reflect(ServerCSCmdsPacketGenerate.prototype, "ServerCSCmdsPacketGenerate");
//# sourceMappingURL=ServerCSCmdsPacketGenerate.js.map