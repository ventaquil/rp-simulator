/*
 * Random value from min to max
 */
function getRandomInt(min,max){
	return Math.floor(Math.random()*(max-min+1))+min;
}

/*
 * Special global varriables
 */
var HOWMUCH=10;
var FLAG=0;

/*
 * Clear elements array
 */
var elements=new Array();
for(var i=0;i<19;i++){
	elements[i]=0;
}

$(document).ready(function(){
	$('input').removeAttr('disabled');

	/* 
	 * Main stage area size
	 */
	var area_size={
		x:600,
		y:400
	};

	/*
	 * Create main stage and base layer
	 */
	var stage=new Kinetic.Stage({
		container:'area',
		height:area_size.y,
		width:area_size.x
	});
	var baselayer=new Kinetic.Layer();

	/*
	 * Add main point and his area
	 */
	var mainpoint=new Kinetic.Circle({
		fill:'#000',
		x:(area_size.x/2),
		y:(area_size.y/2),
		radius:2
	});
	var mainpoint_area=new Kinetic.Circle({
		fill:'#0000FF',
		x:(area_size.x/2),
		y:(area_size.y/2),
		opacity:.4,
		radius:40
	});
	baselayer.add(mainpoint,mainpoint_area); /* Add this objects to base layer */

	stage.add(baselayer).draw(); /* Add base layer to stage and draw */

	/*
	 * Create graph stage and base layer
	 */
	var graph=new Kinetic.Stage({
		container:'graph',
		height:128,
		width:294
	});
	var graphlayer=new Kinetic.Layer();
	graph.add(graphlayer).draw(); /* Add graph layer to stage and draw it */

	/*
	 * Create new work layer and add it to main stage
	 */
	var layer=new Kinetic.Layer();
	stage.add(layer);

	var point,point_area,line,text,p,t,x,y,rad,inter,a,b; /* Declare variables */

	/*
	 * When rand one point
	 */
	$('input.one').on('click',function(){
		FLAG=0; /* Set flag to 0 */
		$('input').attr('disabled','disabled'); /* Display inputs */

		/*
		 * Serialization
		 */
		y=x=0;
		for(var a=0;a<$('input#series').val();a++){
			x+=getRandomInt(0,area_size.x/$('input#series').val());
			y+=getRandomInt(0,area_size.y/$('input#series').val());
		}

		/*
		 * Create point and add it to work layer and draw
		 */
		point=new Kinetic.Circle({
			fill:'#F00',
			x:x,
			y:y,
			radius:2
		});
		layer.add(point);
		stage.draw();

		/*
		 * Increase drawn points
		 */
		p=$('div#text > span').text();
		$('div#text > span').html(++p);

		/*
		 * If point hit increase hit poitns
		 */
		rad=Math.sqrt(Math.pow((x-(area_size.x/2)),2)+Math.pow((y-(area_size.y/2)),2));
		t=$('div#float > span').text();
		if(rad<=40){
			$('div#float > span').text(++t);
		}

		/*
		 * Increase number of elements in array
		 */
		elements[Math.floor(rad/20)]++;

		/*
		 * Correct hit rate
		 */
		$('div#float_area > span').text(Math.round(t/p*1000)/1000);

		/*
		 * Create point area, distance line and distance text, add they to work layer and draw
		 */
		point_area=new Kinetic.Circle({
			fill:'#0F0',
			x:x,
			y:y,
			opacity:0,
			radius:0
		});
		line=new Kinetic.Line({
			opacity:.4,
			points:[x,y,x,y],
			stroke:'#F00'
		});
		text=new Kinetic.Text({
			fill:'#000',
			fontFamily:'Calibri',
			fontSize:12,
			text:Math.round(rad*100)/100,
			x:(x+(area_size.x/2))/2,
			y:(y+(area_size.y/2))/2,
			rotation:Math.atan((y-(area_size.y/2))/(x-(area_size.x/2)))*(180/Math.PI)
		});
		layer.add(point_area,line,text);
		stage.draw();

		/*
		 * Area animations
		 */
		a=b=0;
		inter=setInterval(function(){
			a+=0.05;
			if(b<rad){
				b+=rad/8;
				if(b>rad){
					b=rad;
				}
			}
			line.points([x,y,((rad-b)/rad)*x+(b/rad)*(area_size.x/2),((rad-b)/rad)*y+(b/rad)*(area_size.y/2)]);
			point_area.opacity(a).radius(b);
			stage.draw();
			if(a>=0.4){
				clearInterval(inter);
				setTimeout(function(){
					inter=setInterval(function(){
						a-=0.05;
						if(a<0){
							a=0;
						}
						point_area.opacity(a);
						line.opacity(a);
						text.opacity(a);
						stage.draw();
						if(a==0){
							point_area.remove();
							line.remove();
							text.remove();
							$('input').removeAttr('disabled');
							clearInterval(inter);
						}
					},50);
				},3000);
			}
		},50);
	});

	/*
	 * When rand more points
	 */
	$('input.more').on('click',function(){
		FLAG=0; /* Set flag to 0 */

		/*
		 * Loop create HOWMUCH points
		 */
		for(var a=0;a<HOWMUCH;a++){
			/*
			 * setTimeout() give us delay
			 */
			setTimeout(function(){
				$('input').attr('disabled','disabled'); /* Display inputs */

				/*
				 * Serialization
				 */
				y=x=0;
				for(var a=0;a<$('input#series').val();a++){
					x+=getRandomInt(0,area_size.x/$('input#series').val());
					y+=getRandomInt(0,area_size.y/$('input#series').val());
				}

				/*
				 * Create point and add it to work layer and draw
				 */
				point=new Kinetic.Circle({
					fill:'#F00',
					x:x,
					y:y,
					radius:2
				});
				baselayer.add(point);
				stage.draw();

				/*
				 * Increase drawn points
				 */
				p=$('div#text > span').text();
				$('div#text > span').html(++p);

				/*
				 * If point hit increase hit poitns
				 */
				rad=Math.sqrt(Math.pow((x-(area_size.x/2)),2)+Math.pow((y-(area_size.y/2)),2));
				t=$('div#float > span').text();
				if(rad<=40){
					$('div#float > span').text(++t);
				}

				/*
				 * Increase number of elements in array
				 */
				elements[Math.floor(rad/20)]++;

				/*
				 * Correct hit rate
				 */
				$('div#float_area > span').text(Math.round(t/p*1000)/1000);
			},a*100);
		}

		/*
		 * After loop inputs will be activated
		 */
		setTimeout(function(){
			$('input').removeAttr('disabled');
		},(HOWMUCH*100)+100);
	});

	/*
	 * When change multipler
	 */
	$('input.change[type="button"]').on('click',function(){
		var val=$('input.change[type="text"]').val();
		if(val>=5){
			$('input.more').val('Random '+val); /* Change input value */
			HOWMUCH=val; /* Set HOWMUCH */
		}
	});

	/*
	 * When draw graph
	 */
	$('input#draw').on('click',function(){
		FLAG=1; /* Set flag to 1 */

		var square,max=0,fill; /* Declare variables */

		/*
		 * Get max value from elements array
		 */
		for(var i=0;i<19;i++){
			if(elements[i]>max){
				max=elements[i];
			}
		}

		/*
		 * Clear layer
		 */
		graphlayer.removeChildren();

		/*
		 * Print graph
		 */
		for(var i=18;i>=0;i--){
			/*
			 * Set color
			 */
			if((i%6)==0){
				fill='#0F0';
			}
			else if((i%5)==0){
				fill='#00F';
			}
			else if((i%4)==0){
				fill='#F00';
			}
			else if((i%3)==0){
				fill='#FF0';
			}
			else if((i%2)==0){
				fill='#F0F';
			}
			else{
				fill='#0FF';
			}

			/*
			 * Create square
			 */
			square=new Kinetic.Line({
				closed:true,
				fill:fill,
				name:i,
				points:[0,128,16,128,16,128-Math.ceil((120/max)*elements[i]),0,128-Math.ceil((120/max)*elements[i])],
				x:3+(i*16),
				y:0
			});

			/*
			 * Add events to square
			 */
			square.on('mousemove',function(){
				if(FLAG==1){
					$('div#counter').text(elements[this.name()]);
				}
			})
			.on('mouseleave',function(){
				$('div#counter').text('-');
			});

			/*
			 * Add square to graph layer and print it
			 */
			graphlayer.add(square);
			graph.draw();
		}

		/*
		 * Show graphs div
		 */
		$('div#graph').removeAttr('style');
	});
});