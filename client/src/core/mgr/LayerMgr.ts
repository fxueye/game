class LayerMgr{
    
    private _gameBg:BaseSprite;
    private _gameMain:BaseSprite; 
    private _uiMain:BaseLayer; 
    private _uiPopup:BaseLayer; 
    private _uiMessage:BaseLayer; 
    private _uiTips:BaseLayer; 
    
    public constructor(){
        this._gameBg = new BaseSprite();
        this._gameMain = new BaseSprite();
        this._uiMain = new BaseLayer();
        this._uiPopup = new BaseLayer();
        this._uiMessage = new BaseLayer();
        this._uiTips = new BaseLayer();
    }

    public get GameBg():BaseSprite{
        return this._gameBg;
    }
    public get GameMain():BaseSprite{
        return this._gameMain;
    }
    public get UIMain():BaseLayer{
        return this._uiMain;
    }
    public get UIPopup():BaseLayer{
        return this._uiPopup;
    }
    public get UIMessage():BaseLayer{
        return this._uiMessage;
    }
    public get UITips():BaseLayer{
        return this._uiTips;
    }
}