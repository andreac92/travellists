class PlacesController < ApplicationController
	def index
		puts "does this work: " + params[:id].to_s
		@places = Place.all
	end

	def show
		@place = Place.find(params[:id])
	end

	def new
		@place = Place.new
	end

	def edit
		@place = Place.find(params[:id])
	end

	def update
		@place = Place.find(params[:id])
		if @place.update(place_params)
			redirect_to @place
		else 
			redirect_to placelists_path
		end
	end

	def create
		# @place = Place.new(place_params)

		# if @place.save
		# 	redirect_to @place
		# else
		# 	render 'new'
		# end
		@placelist = Placelist.find(params[:placelist_id])
    	@place = @placelist.places.new(place_params)
    	#redirect_to @placelist
    	if @place.save
    		render json: @place
    	else
			render plain: "NOTOK"
		end
	end

	def destroy
		@place = Place.find(params[:id])
		@rtn = {:id => @place.id, :name => @place.name}
		@place.destroy

		render json: @rtn
	end

	def toggle_visited
		@place = Place.find(params[:id])
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
end
