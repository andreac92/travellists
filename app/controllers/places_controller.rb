class PlacesController < ApplicationController
	before_action :logged_in_user
	before_action :correct_user, only: [:destroy, :toggle_visited]
    before_action :admin_user, only: [:index]

	def index
		@places = Place.all
	end

	def create
		@travelist = Travelist.find(params[:travelist_id])
    	@place = @travelist.places.new(place_params)
    	if current_user?(@travelist.user) && @place.save
    		render json: @place
    	else
			render plain: "NOTOK"
		end
	end

	def destroy
		@place.destroy

		render json: @place
	end

	def toggle_visited
		@place.visited = !@place.visited;
		if @place.save
			render plain: "OK"
		else
			render plain: "NOTOK"
		end
	end

	private
		def place_params
			params.require(:place).permit(:name, :description, :coords)
		end

	    def correct_user
	      @place = Place.find(params[:id])
	      user = @place.travelist.user
	      redirect_to(root_url) unless current_user?(user)
	    end
end
