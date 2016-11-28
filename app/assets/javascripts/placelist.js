$(window).load(function(){
    var PlaceList = (function() {
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
    		$("a.deleteList").click(function(e) {
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
