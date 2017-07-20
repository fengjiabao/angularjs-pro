app.controller("homeCtrl",function($scope,$location,$http,$interval){
	//设置缓存
	var svg = document.querySelectorAll('.svgDom')
	if(svg && svg.length>0){
		for(var i=0;i<svg.length;i++){
			svg[i].classList.add('hide');
		}
	}
	
	var mySwiper = new Swiper('.swiper-container', {
		effect : 'cube',
		cube: {
		  slideShadows: true,
		  shadow: true,
		  shadowOffset: 100,
		  shadowScale: 0.6
		},
		loop: true,
		oopAdditionalSlides : 0,
		autoplay: 2500,//可选选项，自动滑动
		allowSwipeToPrev : true,
	    autoplayDisableOnInteraction: false,
	    observer: true,//修改swiper自己或子元素时自动初始化swiper
	    observeParents: true,//修改swiper父元素时自动修改swiper
	    // 如果需要分页器
	    pagination: '.swiper-pagination',
	    
	    // 如果需要前进后退按钮
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	    
	    // 如果需要滚动条
	    scrollbar: '.swiper-scrollbar'
	    
	})
	var hotdata=sessionStorage.getItem("goodsData");
	var hotdata = null
	$scope.isloading=true;
	
	if(hotdata){
		hotdata=JSON.parse(hotdata);
//		console.log(hotdata)
		$scope.prolist = hotdata;
		$scope.isloading = false;
	}else{
		$http.jsonp("http://datainfo.duapp.com/shopdata/getGoods.php?callback=JSON_CALLBACK").success(function(data){
			
			$scope.prolist = data;
//			console.log(data)
			$scope.isloading = false;
			sessionStorage.setItem("goodsData",JSON.stringify($scope.prolist));
		})
	}
	
	$scope.showBackBtn = true
	$scope.backTop = function(){
		var scrollTop = document.querySelector('.list').scrollTop || document.querySelector('.list').scrollTop;
		console.log(scrollTop)
		if(scrollTop > 500){
			document.querySelector('.list').scrollTop = 0 
		}
	}

	//分页处理
	$scope.pageIndex = function($event){
		var index = null;
		var target = $event.target.getAttribute('name');
		console.log(target);
		switch(target){
			case 'last':
				index = 0;
				break;
			case 'next':
				index = 1;
				break;
			
		}
		$http.jsonp("http://datainfo.duapp.com/shopdata/getGoods.php?callback=JSON_CALLBACK&&classID=1&&pageCode="+index+'"').success(function(data){
			$scope.prolist = data;
		})
	}
	
	//详情
	$scope.goodsDetail = function($event){
		var target = $event.target.getAttribute('goodsDetail');
		var id = $event.target.getAttribute('goodId');
		console.log(target);
		console.log(id);
		$http.jsonp("http://datainfo.duapp.com/shopdata/getGoods.php?callback=JSON_CALLBACK&&goodsID="+id).success(function(data){
			console.log(data);
			var goodsdata = JSON.stringify(data);
			sessionStorage.setItem('goodsdata',goodsdata);
			$location.path("/detail");
//			app.factory('factory_getValue', function () {
//		        var myData = {};
//		
//		        function _getter() {
//		            console.log(myData);
//		            return myData;
//		        }
//		
//		        function _setter( a ) {
//		            myData = a;
//		        }
//		
//		        return {
//		            getter: _getter,
//		            setter: _setter
//		        };
//		   	})
//			
//			factory_getValue.setter($scope.value)
//		});
		
//		app.controller("detailCtrl",["$scope","$http",function($scope,$http){
//				console.log('0800')
//				}]);
	})
	};
	 $scope.countTime = ''
	//$scope.countTime = function(){
//		var interval = 1000; 
//		function ShowCountDown(year,month,day,divname) 
//		{ 
//		var now = new Date(); 
//		var endDate = new Date(year, month-1, day); 
//		var leftTime=endDate.getTime()-now.getTime(); 
//		var leftsecond = parseInt(leftTime/1000); 
//		//var day1=parseInt(leftsecond/(24*60*60*6)); 
//		var day1=Math.floor(leftsecond/(60*60*24)); 
//		var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
//		var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
//		var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
//		var cc = document.getElementById(divname); 
//		$scope.countTime = "脚本之家提示距离"+year+"年"+month+"月"+day+"日还有："+day1+"天"+hour+"小时"+minute+"分"+second+"秒"; 
//		} 
//		window.setInterval(function(){ShowCountDown(2018,4,20,'divdown1');}, interval); 
	//}
	
	var time =$interval(function(){
		var now = new Date(); 
		var endDate = new Date(2017, 8-1, 5); 
		var leftTime=endDate.getTime()-now.getTime(); 
		var leftsecond = parseInt(leftTime/1000); 
		//var day1=parseInt(leftsecond/(24*60*60*6)); 
		var day1=Math.floor(leftsecond/(60*60*24)); 
		var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
		var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
		var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
		$scope.countTime = "距离本次结束："+day1+"天"+hour+"小时"+minute+"分"+second+"秒"; 
	},1000)
	
	
	document.querySelector('.info').style.display = 'none'
});