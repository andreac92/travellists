class PlacelistsController < ApplicationController
	def index
		@placelists = Placelist.all
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
			redirect_to @placelist
		else
			render 'new'
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

		redirect_to placelists_path
	end

	private
		def placelist_params
			params.require(:placelist).permit(:title, :description)
		end
end
