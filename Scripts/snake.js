// JavaScript Document
$(document).ready(function(e) {
        var snake=new Snake();
		snake.init();
    });
	var Snake=function(){
		this.currentDrection='right';
		this.nextDrection='right';
		this.snakeHeadLeft=0;
		this.snakeHeadTop=0;
		this.snakeBodyLeft=0;
		this.snakeBodyTop=0;
	}
	Snake.prototype={
		init:function(){
			var _this=this;
			$('#canvas div:not(#food)').each(function(index, element) {//初始化蛇身
                $(this).css({'top':'100px','left':(100-index*20)+'px'});
            });
			//初始化食物
			$('#food').css({'left':'200px','top':'100px'});
			$('#start').click(function(e) {
                $('#canvas').focus();
				_this.run();//游戏开始
				_this.ListenDirection();
            });
		},
		run:function(){
			var _thisRun=this;
			this.currentDrection=this.nextDrection;
			this.snakeHeadLeft=$('#snakeHead').css('left');
			this.snakeHeadTop=$('#snakeHead').css('top');
			this.snakeBodyLeft=null;
			this.snakeBodyTop=null;
			
			if(this.nextDrection=='left'){
				$('#snakeHead').css({'left':'-=20'});
			}else if(this.nextDrection=='right'){
				$('#snakeHead').css({'left':'+=20'});
			}else if(this.nextDrection=='up'){
				$('#snakeHead').css({'top':'-=20'});
			}else if(this.nextDrection=='down'){
				$('#snakeHead').css({'top':'+=20'})
			}
			
			$('#canvas div:not(#snakeHead,#food)').each(function(index, element) {
                _thisRun.snakeBodyLeft=$(this).css('left');
				_thisRun.snakeBodyTop=$(this).css('top');
				$(this).css({'left':_thisRun.snakeHeadLeft,'top':_thisRun.snakeHeadTop});
				_thisRun.snakeHeadLeft=_thisRun.snakeBodyLeft;
				_thisRun.snakeHeadTop=_thisRun.snakeBodyTop;
            });
			_thisRun.checkFood();//检查是否吃到食物
			window.setTimeout(function(){ _thisRun.run();},200);
		},
		ListenDirection:function(){
			var _thisDirection=this;
			$('#canvas').keydown(function(e) {
                if(e.keyCode==37&&_thisDirection.currentDrection!='right') _thisDirection.nextDrection = 'left';
				else if(e.keyCode==38&&_thisDirection.currentDrection!='down') _thisDirection.nextDrection = 'up';
				else if(e.keyCode==39&&_thisDirection.currentDrection!='left') _thisDirection.nextDrection = 'right';
				else if(e.keyCode==40&&_thisDirection.currentDrection!='up') _thisDirection.nextDrection = 'down';
            });
		},
		checkFood:function(){
			//var headLeft=;
			//var headTop
			if(($('#snakeHead').css('left')==$('#food').css('left'))&&($('#snakeHead').css('top')==$('#food').css('top'))){//吃到食物
				//alert('chidaole');
				var foodLeft=parseInt(Math.random()*30)*20 + 'px';
				var foodTop=parseInt(Math.random()*20)*20 +'px';
				//修改食物坐标
				$('#food').css({'left':foodLeft,'top':foodTop});
			}
		}
	}