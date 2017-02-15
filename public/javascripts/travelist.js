$(window).load(function(){
	window.google = {};
    var TraveList = (function() {
		var addListeners = function() {
			console.log("um");
    		$("#travelistList").on("click", "a.deleteList", function(e) {
    			e.preventDefault();
    			var element = $(this).closest("div.panel");
    			$.ajax({
			        type: "DELETE",
			        url: $(this).attr('href'),
			    });
    		})
    		.on("click", ".editTravelist", function(e){
    			var panel = $(this).closest('div.panel');
    			var newText = $(this).text() == "Edit" ? "Save" : "Edit";
    			var title = $(this).siblings('.travelistTitle');
    			var body = panel.children('.panel-body');

    			var id = (title.attr('href')).split('/').pop();
    			if (newText == "Edit") {
    				console.log("sending edits");
    				title.attr("contenteditable", "false");
    				body.attr("contenteditable", "false");
    				$.ajax({
				        type: "PATCH",
				        url: title.attr('href'),
				        data: {"id": id, "travelist": {"title": title.text(), "description": body.text()}},
				        success: function (data) {
				          if (data == "NOTOK") {
				            console.log("it didnt work!!");
				          } else {
				            console.log("it worked!!!"+data);
				          }
				        }
			    	});
    			} else {
    				title.attr("contenteditable", "true");
    				body.attr("contenteditable", "true");
    			}
    			$(this).text(newText);
    			panel.toggleClass('editable');
    		})
    		.on("click", ".editable a.travelistTitle", function(e){
    			e.preventDefault();
    		})
    		.on("click", ".cancelEdits", function() {
    			console.log("canceled!");
    			var panel = $(this).closest('div.panel');
    			panel.toggleClass('editable');
    			$(this).siblings('.travelistTitle').attr("contenteditable", "false");
    			panel.children('.panel-body').attr("contenteditable", "false");
    			$('.editTravelist').text("Edit");
    		});
		}

		var init = function() {
			addListeners();
		}

		init();
	})();
});
