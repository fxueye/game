interface ISocketHander {
        OnConnect();
        OnReconnect();
        OnDisconnect();
		OnNoConnect();
        OnRecv();
        OnSend();
        OnError();
        OnNetError();
}