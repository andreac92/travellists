class TravelistsController < ApplicationController
	before_action :logged_in_user
    before_action :correct_user, only: [:show, :update, :destroy]
    before_action :admin_user, only: [:all]
	
	def index
		@travelists = current_user.travelists
		all_places = current_user.places
		@all = all_places.length

		@num_visited = 0
		countries = Set.new
		continents = Set.new
		all_places.each do |place|
			if place.visited
				@num_visited+=1
				coords = JSON.parse(place.coords)
				countries.add(coords['short_name'])
				continents.add(get_continent(coords['short_name'])) 
			end
		end
		@countries_visited = countries.length
		@continents_visited = continents.length
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
		redirect_to travelists_path
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
