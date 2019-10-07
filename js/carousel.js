;(function(){
	var FPS = 1;
	var FRAME_LIMIT=1000/FPS;


	function carousel(slideElem,parentElem){
		this.index=0;
		this.totalWidth=0;
		this.individualWidth=0;
		this.count=0;
		this.isRotating=false;
		var that=this;
		this.parentElem=parentElem;
		this.slideElem = slideElem;
		for(var i=0;i<this.slideElem.length;i++){
			this.totalWidth+=this.slideElem[i].clientWidth;
		}
		console.log("total width is ", this.totalWidth);
		this.parentElem.style.width=this.slideElem.length*100+"%";
		for(var i=0;i<this.slideElem.length;i++){
			var percentageOf=(100/this.slideElem.length);
			this.slideElem[i].style.width=percentageOf+"%";
			that.individualWidth=that.slideElem[i].clientWidth;
		}
	

	
	window.onresize=function(){
			console.log('resized');
			dropDownMenu();
			console.log("resized");
			that.index=0;
			that.individualWidth=0;
			that.count=0;
/*
		that.parentElem=document.getElementById('team-wrapper');
		that.slideElem = document.getElementsByClassName("our-team-wrapper-body");*/
		console.log("this. is the slide element",that.slideElem);
		that.totalWidth=0;
			for(var i=0;i<that.slideElem.length;i++){
			that.totalWidth+=that.slideElem[i].clientWidth;
		}
		console.log("total width is ", that.totalWidth);
		that.parentElem.style.width=that.slideElem.length*100+"%";
		for(var i=0;i<that.slideElem.length;i++){
		var percentageOf=(100/that.slideElem.length);
		that.slideElem[i].style.width=percentageOf+"%";
		that.individualWidth=that.slideElem[i].clientWidth;
		}
	}


		this.init=function(){
			console.log(this);
			
			return this;
		}

		


		this.changeSlide=function(){
			var stopThis=0;
			that.isRotating=true;
			console.log(that.isRotating);

			var x=setInterval(function(){
			if(stopThis>=-(that.individualWidth)){

			that.index-=5;
			stopThis-=5;
			if((that.index)>=-(that.totalWidth-that.individualWidth)){
			that.parentElem.style.marginLeft=that.index+"px";
			}
			else{
				that.index=that.individualWidth;
				clearInterval(x);


			}
		}
		else{
		}
			},10);
			that.count++;
			that.count=that.count%that.slideElem.length;
			setTimeout(function(){
				that.isRotating=false;
				console.log(that.isRotating);
			},1500);
			return that.count;

		}

		this.changeRight=function(){
		that.index=that.totalWidth-that.index;
		that.index-=that.individualWidth;
		console.log(that.index,that.individualWidth);
		that.index=-that.index;
		that.index=that.index%that.totalWidth;
		console.log(that.index);
		that.parentElem.style.marginLeft=that.index+"px";
		if(that.count<=0){
			
			that.count=that.slideElem.length-1;
			console.log("count is smaller than zero",that.count);
			return that.count;
		}
		else{
			that.count=that.count-1;
			console.log(" count is bigger than zero",that.count);
			return that.count;
}
		}

	}



	function teamMainWrapper(greatGrandElem){
		this.greatGrandElem=greatGrandElem;
		this.indicatorArray=[];
		
		var that=this;
		this.flag=true;
		this.count=0;
		this.slideElem = document.querySelectorAll(".our-team-wrapper-body");
		this.parentElem=document.getElementById('team-wrapper');
		this.myCarousel=new carousel(this.slideElem,this.parentElem).init();

		this.init=function(){
			this.leftElement=document.createElement('button');
			this.rightElement=document.createElement('button');
			this.indicator=document.createElement('div');
			for(var i=0;i<this.slideElem.length;i++){
				this.indicatorArray[i]=new indicators(this.indicator).init();
			}

			this.leftElement.style.position="absolute";
			this.leftElement.style.bottom="0%";
			this.leftElement.style.left="0%";
			this.leftElement.innerHTML="<";
			this.leftElement.style.padding="20px";
			this.leftElement.onclick=function(){
				if(!that.myCarousel.isRotating){
				that.count=that.myCarousel.changeSlide();
				that.indicatorArray[that.count].changeColor();
			}
			}

			this.rightElement.style.position="absolute";
			this.rightElement.style.bottom="0%";
			this.rightElement.style.right="0%";
			this.rightElement.innerHTML=">";
			this.rightElement.style.padding="20px";

			this.rightElement.onclick=function(){
				console.log(that.myCarousel.isRotating);
				if(!that.myCarousel.isRotating){
				that.count=that.myCarousel.changeRight();
					that.indicatorArray[that.count].changeColor();

			}
			}

			this.indicator.style.position="absolute";
			this.indicator.style.bottom="0%";
			this.indicator.style.left="50%";
			this.indicator.className+='clearfix';

			this.greatGrandElem.appendChild(this.leftElement);
			this.greatGrandElem.appendChild(this.rightElement);
			this.greatGrandElem.appendChild(this.indicator);


			setInterval(function(){


				that.count=that.myCarousel.changeSlide();
				that.indicatorArray[that.count].changeColor();


			},5000);

			

		}
	}

	function indicators(parentElem){
		this.parentElem=parentElem;
		this.indicator;
		this.allButtons=this.parentElem.getElementsByTagName('button');
		var that=this;
		this.init=function(){
				this.indicator=document.createElement('button');
				this.indicator.style.width="10px";
				this.indicator.style.height="10px";
				this.indicator.style.marginRight="7px";
				this.indicator.style.borderRadius="50%";
				this.indicator.style.float="left";
				this.parentElem.appendChild(this.indicator);
				return this;
		}
		this.changeColor=function(){
			for(var i=0;i<this.allButtons.length;i++){
				this.allButtons[i].style.backgroundColor="#f4f4f4";
			}

			this.indicator.style.backgroundColor="#6106a6";
		}

	}


	function dropDownMenu(){
		this.showMenu=true;
		this.burgerMenu=document.getElementById("header-bottom-burger");
		this.menu=document.getElementById("header-bottom-list-scaling");
		var that=this;
		this.burgerMenu.onclick=function(){
			that.showMenu?that.menu.style.display="block":that.menu.style.display="none";
			that.showMenu=!that.showMenu;
		}
/*		window.onresize=function(){
			if(screen.width>998){
				that.showMenu=true;
				that.showMenu?that.menu.style.display="block":that.menu.style.display="none";
			}
		}*/

	}

	var MainCarousel=document.getElementById("team-main-wrapper");
	new teamMainWrapper(MainCarousel).init();
	new dropDownMenu();


})()