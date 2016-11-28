class PlacelistsController < ApplicationController
	def index
		@placelists = Placelist.all
		@placelist = Placelist.new
	end

	def show
		@placelist = Placelist.find(params[:id])
		@places = @placelist.places.all
	end

	def new
		@placelist = Placelist.new
	end

	def create
		@placelist = Placelist.new(placelist_params)

		if @placelist.save
			# render json: @placelist
			redirect_to @placelist
		else
			render plain: "NOTOK"
		end
	end

	def edit
		@placelist = Placelist.find(params[:id])
	end

	def update
		@placelist = Placelist.find(params[:id])
		if @placelist.update(placelist_params)
			redirect_to @placelist
		else 
			redirect_to placelists_path
		end
	end

	def destroy
		@placelist = Placelist.find(params[:id])
		@placelist.destroy

		render plain: "OK"
	end

	private
		def placelist_params
			params.require(:placelist).permit(:title, :description)
		end
end
