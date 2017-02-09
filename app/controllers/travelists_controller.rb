class TravelistsController < ApplicationController
	before_action :logged_in_user
    before_action :correct_user, only: [:show, :update, :destroy]
    before_action :admin_user, only: [:all]
	
	def index
		@travelists = current_user.travelists
		all_places = current_user.places
		@all = all_places.length
		visited_places = all_places.select do |place|
			place.visited
		end
		@num_visited = visited_places.length
		# TODO find unique number of places & countries
		# TODO find number of continents visited from countries
		@travelist = Travelist.new
	end

	def all
		@travelists = Travelist.all
	end

	def create
		@travelist = current_user.travelists.new(travelist_params)
		if @travelist.save
			redirect_to @travelist
		else
			render plain: "NOTOK"
		end
	end

	def show
		@places = @travelist.places
	end

	def update
		if @travelist.update(travelist_params)
			render plain: "OK"
		else 
			render plain: "NOTOK"
		end
	end

	def destroy
		@travelist.destroy
		render plain: "OK"
	end

	private
		def travelist_params
			params.require(:travelist).permit(:title, :description)
		end

	    def correct_user
	      @travelist = Travelist.find(params[:id])
	      user = @travelist.user
	      redirect_to(root_url) unless current_user?(user)
	    end

	    def get_all_visited(lists)
	    	count = 0
	    	lists.each do |list|
	    		count += list.places.length
	    	end
	    	count
	    end
end
