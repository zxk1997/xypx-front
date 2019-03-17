$(function(){
	tip_switch();
	$("#px_banner").on("mouseover",function(){
		$(this).find('a').each(function(){
			this.style.display = "block";
		})
	})
	$("#px_banner").on("mouseout",function(){
		$(this).find('a').each(function(){
			this.style.display = "none";
		})
	})
			
})
function tip_switch(){
	var $tip_nav_a = $(".event-tip-nav li");
	var $event_list = $(".event-tip-lists");
	var $i = 0;
	for (var i = 0; i < $tip_nav_a.length; i++) {
		$tip_nav_a[i].onclick = function(){
			if($i == $(this).index())
				return;
			$i = $(this).index();
			$event_list.each(function(){
				$(this).hide();
			});
			$tip_nav_a.each(function(){
				$(this).children().removeClass("tip-active");
			});
			$(this).children().addClass("tip-active");
			$event_list.eq($i).show()
		}
	}
}