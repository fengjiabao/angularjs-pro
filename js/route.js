var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
	$routeProvider.when("/home", {
		templateUrl: "html/home.html",
		controller: "homeCtrl"
	}).when("/kind", {
		templateUrl: "html/kind.html",
		controller: "kindCtrl"
	}).when("/person", {
		templateUrl: "html/person.html",
		controller: "personCtrl"
	}).when("/login",{
		templateUrl:"html/login.html",
		controller:"loginCtrl"
	}).when("/register",{
		templateUrl:"html/register.html",
		controller:"registerCtrl"
	}).when("/detail",{
		templateUrl:"html/goodsDetail.html",
		controller:"detailCtrl"
	}).when("/personRecords",{
		templateUrl:"html/personRecords.html",
		controller:"personRecordsCtrl"
	}).otherwise({
		redirectTo: "home"
	})
})

//myCtrl页面控制器；
app.controller("myCtrl", function($scope,$http,$timeout,$location) {
	var userID = localStorage.getItem("userID");
	if(userID){
		$scope.nav_show = true;
		$scope.userID = userID;
	}else{
		$scope.nav_show = false;
	}
	//返回首页；
	$scope.back = function() {
		$location.path("/home");
	}
	//左导航显示和隐藏
	$scope.indexshow= true;
	$scope.indexlist=function(){
		$scope.indexshow=!$scope.indexshow;
	}
	$scope.index_hot=false;
	$scope.index_hotsale=function(){
		$scope.index_hot=!$scope.index_hot;
	}
	$scope.isloading=true;
	//加载左导航分类
		$timeout(function(){
			$http.get("http://datainfo.duapp.com/shopdata/getclass.php").then(function(data){
				var data2=data.data
				$scope.prolist2=data2;
				$scope.isloading=false;
				//默认先加载热推商品，然后可以点击
				var hotdata2=sessionStorage.getItem("goodsData");
				hotdata2=JSON.parse(hotdata2);
				$scope.prolist=hotdata2;
				
			})
		},1)
		
	//点击进入对应商品列表
	$scope.index_click=function(obj){
		var hotdata2=sessionStorage.getItem("goodsData"+obj);
		if(hotdata2){
			hotdata2=JSON.parse(hotdata2);
			$scope.prolist=hotdata2;
			$scope.isloading=false;
		}else{
			$scope.isloading=true;
			$http.jsonp("http://datainfo.duapp.com/shopdata/getGoods.php?callback=JSON_CALLBACK&classID="+obj).success(function(data){
				if(data){
					$scope.isloading=false;
					$scope.prolist=data;
					sessionStorage.setItem("goodsData"+obj,JSON.stringify($scope.prolist));
				}else{
					$scope.isloading=false;
					alert("对不起！没有该商品")
					
				}
				
			})
		}
		
	}
	
	//nav退出按钮是否隐藏；
	$scope.index_show=false;
//	$scope.nav_login=function(){
//		
//	}
	$scope.personCenter = true;
	$scope.personShow=function(){
		$scope.personCenter = !$scope.personCenter;
	}

});

//路由配置头文件；
app.config(function($httpProvider) {
	$httpProvider.defaults.transformRequest = function(obj) {
		var str = [];
		for(var p in obj) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
		return str.join("&");
	}
	$httpProvider.defaults.headers.post = {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});