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
			var _thisRun=this,
			temp;
			this.currentDrection=this.nextDrection;
			this.snakeHeadLeft=$('#snakeHead').css('left');
			this.snakeHeadTop=$('#snakeHead').css('top');
			this.snakeBodyLeft=null;
			this.snakeBodyTop=null;
			
			if(this.nextDrection=='left'){
				temp = (parseInt($('#snakeHead').css('left')) - 20 + 600) % 600 + 'px';
				$('#snakeHead').css({'left':temp});
			}else if(this.nextDrection=='right'){
				temp = (parseInt($('#snakeHead').css('left')) +20 ) % 600 + 'px';
				$('#snakeHead').css({'left':temp});
			}else if(this.nextDrection=='up'){
				temp = (parseInt($('#snakeHead').css('top')) - 20 + 400) % 400 + 'px';
				$('#snakeHead').css({'top':temp});
			}else if(this.nextDrection=='down'){
				temp = (parseInt($('#snakeHead').css('top')) + 20 ) % 400 + 'px';
				$('#snakeHead').css({'top':temp});
			}
			
			$('#canvas div:not(#snakeHead,#food)').each(function(index, element) {
                _thisRun.snakeBodyLeft=$(this).css('left');
				_thisRun.snakeBodyTop=$(this).css('top');
				$(this).css({'left':_thisRun.snakeHeadLeft,'top':_thisRun.snakeHeadTop});
				_thisRun.snakeHeadLeft=_thisRun.snakeBodyLeft;
				_thisRun.snakeHeadTop=_thisRun.snakeBodyTop;
            });
            if(checkDead()){
            	_thisRun.checkFood();//检查是否吃到食物
				var time = window.setTimeout(function(){ _thisRun.run();},200);
            }
			function checkDead(){
				var 
				that = _thisRun,
				_time = time,
				result = true;
				headLeft = parseInt($('#snakeHead').css('left'));
				headTop = parseInt($('#snakeHead').css('top'));
				
				$('#canvas div:not(#snakeHead,#food)').each(function() {
				  	if(headLeft == parseInt($(this).css('left')) && headTop == parseInt($(this).css('top'))){
				  		//死了
				  		that.currentDrection='right';
						that.nextDrection='right';
				  		alert('死了');
				  		$('#canvas div:not(#food)').each(function(index, element) {//初始化蛇身
			                $(this).css({'top':'100px','left':(100-index*20)+'px'});
			            });
						//初始化食物
						$('#food').css({'left':'200px','top':'100px'});
						
						$('#canvas div:not(#snakeHead,#food):gt(3)').remove()
				  		result = false
				  	}
				});
				
				if(headLeft == 0 || headLeft == 580 || headTop == 0 || headTop == 380){
					that.currentDrection='right';
					that.nextDrection='right';
					alert('撞墙了');
					$('#canvas div:not(#food)').each(function(index, element) {//初始化蛇身
		                $(this).css({'top':'100px','left':(100-index*20)+'px'});
		            });
					//初始化食物
					$('#food').css({'left':'200px','top':'100px'});
					
					$('#canvas div:not(#snakeHead,#food):gt(3)').remove()
					result = false;
				}
				
				return result;
			}
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
				//增加舍身
				var left = parseInt(($('.snakeTail').eq(0).css('left'))) - 20 + 'px';
				var top = $('.snakeTail').eq(0).css('top');
				$('.snakeTail').removeClass('snakeTail');
				$('<div>').css({'left':left, 'top':top}).addClass('snakeTail').appendTo('#canvas');
			}
		},
		checkDead:function(){
			
		}
	}