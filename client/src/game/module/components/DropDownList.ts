class DropDwonList extends eui.Component {
        public Btn: eui.Button;
        public ddlList:eui.List;
        public scroller:eui.Scroller;
        public gpList:eui.Group;
        private _spMask: egret.Shape;
        private _isShow: boolean = false;
        private _itemOnClick:Function;
        private _selectIndex:number = 0;
        private _data:eui.ArrayCollection;
        private _obj:any;

        constructor() {
            super();
        }

        protected createChildren() {
            super.createChildren();
            //列表上面的遮罩
            var spMask = new egret.Shape();
            spMask.graphics.beginFill(0x000000);
            spMask.graphics.drawRect(0, 0, this.gpList.width, this.gpList.height);
            spMask.graphics.endFill();
            this.addChild(spMask);
            this._spMask = spMask;
            this.gpList.mask = spMask;
            this._spMask.y = this.Btn.height;
            this.gpList.y = -this.gpList.height;
            this.Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeListType, this);
            this._data = new eui.ArrayCollection();
            this.ddlList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onClick,this);
            this.ddlList.dataProvider = this._data;
        }
        
        public set dataProvider(data:any[]){
            this._data.source = data;
            this._data.refresh();
            if(this._data.length < 3){
                this.gpList.height = this.gpList.height * (this._data.length/3);
            }

            this.Btn.label = data[0].Name;
        }
        public AddListener(onClick:Function,obj:any){
            this._itemOnClick = onClick;
            this._obj = obj;
        }
        public get SelectIndex():number{
            return this._selectIndex;
        }
        public set SelectIndex(val:number){
            this._selectIndex = val;
            this.ddlList.selectedIndex = val;
            this.Btn.label = this._data.source[val].Name;
            // this._data.refresh();
        }
        private onClick(evt:eui.ItemTapEvent){
            this.Btn.label = evt.item.Name;
            this.changeListType();
            this._selectIndex = evt.itemIndex;
            if(this._itemOnClick != null && this._obj){
                this._itemOnClick.call(this._obj,evt);
                // this._itemOnClick(evt);
            }
        }
        private changeListType(): void {
            if (!this._isShow) {
                egret.Tween.get(this.gpList).to({y:this.Btn.height}, 300);
                this._isShow = true;
            } else {
                egret.Tween.get(this.gpList).to({y:-this.gpList.height}, 300);
                this._isShow = false;
            }
        }
    }