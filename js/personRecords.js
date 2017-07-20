app.controller("personRecordsCtrl",function($scope,$location,$timeout ,$http){
	var svg = document.querySelectorAll('.svgDom')
	if(svg && svg.length>0){
		for(var i=0;i<svg.length;i++){
			svg[i].classList.add('hide');
		}
	}
	var width=400;  
	var height=400;  
	var svg=d3.select(".list")  
	            .append("svg")  
	            .attr("width",width)  
	            .attr('class','svgDom')
	            .attr("height",height);
	            
	  
	var dataset=[ ["衬衫",60.8] , ["礼服",58.4] , ["棉服",47.3] , ["短外套",46.6] ,  
	                        ["卫衣",41.3] , ["牛仔裤",40.1] , ["其他",111.5] ];  
	  
	//转换数据  
	var pie=d3.layout.pie() //创建饼状图  
	            .value(function(d){  
	                return d[1];  
	            });//值访问器  
	//dataset为转换前的数据 piedata为转换后的数据  
	var piedata=pie(dataset);  
	  
	//绘制  
	var outerRadius=width/3;  
	var innerRadius=0;//内半径和外半径  
	  
	//创建弧生成器  
	var arc=d3.svg.arc()  
	            .innerRadius(innerRadius)  
	            .outerRadius(outerRadius);  
	var color=d3.scale.category20();  
	//添加对应数目的弧组  
	var arcs=svg.selectAll("g")  
	            .data(piedata)  
	            .enter()  
	            .append("g")  
	            .attr("transform","translate("+(width/2)+","+(height/2)+")");  
	//添加弧的路径元素  
	arcs.append("path")  
	    .attr("fill",function(d,i){  
	        return color(i);  
	    })  
	    .attr("d",function(d){  
	        return arc(d);//使用弧生成器获取路径  
	    });  
	//添加弧内的文字  
	arcs.append("text")  
	    .attr("transform",function(d){  
	        var x=arc.centroid(d)[0]*1.4;//文字的x坐标  
	        var y=arc.centroid(d)[1]*1.4;  
	        return "translate("+x+","+y+")";  
	    })  
	    .attr("text-anchor","middle")  
	    .text(function(d){  
	        //计算市场份额的百分比  
	        var percent=Number(d.value)/d3.sum(dataset,function(d){  
	            return d[1];  
	        })*100;  
	        //保留一位小数点 末尾加一个百分号返回  
	        return percent.toFixed(1)+"%";  
	    });  
	//添加连接弧外文字的直线元素  
	arcs.append("line")  
	    .attr("stroke","black")  
	    .attr("x1",function(d){  
	        return arc.centroid(d)[0]*2;  
	    })  
	    .attr("y1",function(d){  
	        return arc.centroid(d)[1]*2;  
	    })  
	    .attr("x2",function(d){  
	        return arc.centroid(d)[0]*2.2;  
	    })  
	    .attr("y2",function(d){  
	        return arc.centroid(d)[1]*2.2;  
	    });  
	//添加弧外的文字元素  
	arcs.append("text")  
	    .attr("transform",function(d){  
	        var x=arc.centroid(d)[0]*2.5;  
	        var y=arc.centroid(d)[1]*2.5;  
	        return "translate("+x+","+y+")";  
	    })  
	    .attr("text-anchor","middle")  
	    .text(function(d){  
	        return d.data[0];  
	    }); 
	    
	    
	    
	//画布大小
	var wid = 400;
	var heig = 400;
	
	//在 body 里添加一个 SVG 画布   
	var svg = d3.select(".list")
	    .append("svg")
	    .attr('class','svgDom')
	    .attr("width", wid)
	    .attr("height", heig);
	
	//画布周边的空白
	 var padding = {left:50, right:30, top:20, bottom:20};
	 //定义一个数组
	var data = [100, 200, 300, 400, 330, 240, 120, 50];
	        
	//x轴的比例尺
	var xScale = d3.scale.ordinal()
	    .domain(d3.range(data.length))
	    //.domain(['一月','二月','一月','二月','一月','二月','一月','二月'])
	    .rangeRoundBands([0, width - padding.left - padding.right]);
	
	//y轴的比例尺
	var yScale = d3.scale.linear()
	    .domain([0,d3.max(data)])
	    .range([height - padding.top - padding.bottom, 0]);
	    
	//定义x轴
	var xAxis = d3.svg.axis()
	    .scale(xScale)
	    .orient("bottom");
	        
	//定义y轴
	var yAxis = d3.svg.axis()
	    .scale(yScale)
	    .orient("left");
	    
	//矩形之间的空白
var rectPadding = 4;

//添加矩形元素
var rects = svg.selectAll(".MyRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","MyRect")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function(d,i){
            return xScale(i) + rectPadding/2 +10;
        } )
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("width", xScale.rangeBand() - rectPadding )
        .attr("height", function(d){
            return height - padding.top - padding.bottom - yScale(d);
        });

	//添加文字元素
	var texts = svg.selectAll(".MyText")
	        .data(data)
	        .enter()
	        .append("text")
	        .attr("class","MyText")
	        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
	        .attr("x", function(d,i){
	            return xScale(i) + rectPadding/2;
	        } )
	        .attr("y",function(d){
	            return yScale(d);
	        })
	        .attr("dx",function(){
	            return (xScale.rangeBand() - rectPadding)/2;
	        })
	        .attr("dy",function(d){
	            return 20;
	        })
	        .text(function(d){
	            return d;
	        });
			        
			 //添加x轴
		svg.append("g")
		  .attr("class","axis")
		  .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
		  .call(xAxis); 
		        
		//添加y轴
		svg.append("g")
		  .attr("class","axis")
		  .attr("transform","translate(" + padding.left + "," + padding.top + ")")
		  .call(yAxis);
})
