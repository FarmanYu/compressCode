(function(win){
	var TextClass = function(opt){
		$.extend(this, opt);
	};
	TextClass.prototype = {
		init:function(){

		},
		render:function(){
			this._textIntance = this.container.text(this.x, this.y, this.text);
			this._textIntance.attr("font-size", 5);
		},
		remove:function(){
			this._textIntance && this._textIntance.remove();
		}
	};
	
	var RectClass = function(opt){
		$.extend(this, opt);
	}
	RectClass.prototype = {
		init:function(){
			
		},
		render:function(){
			this._rect = this.container.add([{
				type:this.type,
				x:this.x,
				y:this.y,
				width:this.width,
				height:this.height,
				fill:this.fill
			}]);
		},
		remove:function(){
			this._rect && this._rect.remove();
		}
	};
	
	/**
	 * @name 舱房类
	 **/
	
	var CabinClass = function(opt){
		$.extend(this, opt);
	}
	CabinClass.prototype = {
		init:function(){
			var opt = {};
			opt.container = this.container;
			opt.type = this.data.shape.type;
			var pos = this.data.shape.pos.split(",");
			opt.x = pos[0];
			opt.y = pos[1];
			opt.width = pos[2];
			opt.height = pos[3];
			opt.fill = this.data.category.color;
			opt.text = this.data.roomNo;
			
			this.backGround = new RectClass(opt);
			this.textIntance = new TextClass(opt);

			this.bindEvent();
		},
		render:function(){
			this.backGround && this.backGround.render();
			this.textIntance && this.textIntance.render();
		},
		bindEvent:function(){
			
		},
		remove:function(){
			this.textIntance.remove();
			this.backGround.remove();
		}
	}
	
	/**
	 * @name 总控制器，控制所有子类
	 * 
	 * */
	var MainController = {
		_cabins:[],
		init : function(){
			var container = this.container = Raphael("SVGcontainer", 100, 460);
			this.createBackground();
			for(var i=0;i<deck_plan.cabin.length;i++){
				var itemData = {};
				itemData.data = deck_plan.cabin[i];
				itemData.container = container;
				var cabinIntance = new CabinClass(itemData);
				cabinIntance.init();
				this._cabins.push(cabinIntance);
			}
		},
		createCabin:function(){
			
		},
		createBackground:function(){
			this.container.image("MA_Deck3.svg",0,0,88,459);
		},
		ZoomPos:function(x, y ,width, height){
			var ret = {};
			ret.x = x;
			ret.y = y;
			ret.width = width;
			ret.height = height;
			return ret;
		},
		render:function(){
			for(var i =0;i<this._cabins.length;i++){
				var canbinIntance = this._cabins[i];
				canbinIntance.render();
			}
		}
	}
	
	win.MainController = MainController;
}(this));
