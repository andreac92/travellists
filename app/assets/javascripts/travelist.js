$(window).load(function(){
    var TraveList = (function() {
		var addListeners = function() {
			console.log("um");
			// $("input#submitPlacelist").click(function(e) {
			//   e.preventDefault();
		 //      console.log("clicked!!");
		 //      var form = $("#new_placelist");
		 //      $.ajax({
		 //        type: "POST",
		 //        url: form.attr("action"),
		 //        data: form.serialize(),
		 //        success: function (data) {
		 //          if (data == "NOTOK") {
		 //            console.log("it didnt work!!");
		 //          } else {
		 //            console.log("it worked!!!"+data);
		 //            addPlace(data);
		 //          }
		 //        }
		 //      });
			// });
    		$("#travelistList").on("click", "a.deleteList", function(e) {
    			e.preventDefault();
    			var element = $(this).closest("div.panel");
    			$.ajax({
			        type: "DELETE",
			        url: $(this).attr('href'),
			        success: function (data) {
			          if (data == "NOTOK") {
			            console.log("it didnt work!!");
			          } else {
			            console.log("it worked!!!"+data);
			            element.remove();
			          }
			        }
			    });
    		})
    		.on("click", ".editTravelist", function(e){
    			var panel = $(this).closest('div.panel');
    			var newText = $(this).text() == "Edit" ? "Save" : "Edit";
    			var title = $(this).siblings('.travelistTitle');
    			var body = panel.children('.panel-body');

    			var id = (title.attr('href')).split('/').splice(-1);
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
    		});
		}

		var init = function() {
			addListeners();
		}

		var addPlace = function(placelist) {

		}

		init();
	})();
});
