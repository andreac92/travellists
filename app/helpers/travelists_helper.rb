module TravelistsHelper
	def visited_status status
		tag = '<span class="label '
		if status 
			tag += 'visitedStatus seen"><span>Visited</span></span>'
			tag.html_safe
		else
		    tag += 'visitedStatus"><span>Unvisited</span></span>'
			tag.html_safe
		end
	end
end
