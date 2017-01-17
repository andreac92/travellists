class PlacelistsController < ApplicationController
	before_action :logged_in_user
    before_action :correct_user, only: [:show, :update, :destroy]
    before_action :admin_user, only: [:all]
	
	def index
		@placelists = current_user.placelists
		@placelist = Placelist.new
	end

	def all
		@placelists = Placelist.all
	end

	def show
		@places = @placelist.places.all
	end

	def new
		@placelist = Placelist.new
	end

	def create
		@placelist = current_user.placelists.new(placelist_params)
		if @placelist.save
			redirect_to @placelist
		else
			render plain: "NOTOK"
		end
	end

	def edit
		@placelist = Placelist.find(params[:id])
	end

	def update
		if @placelist.update(placelist_params)
			render plain: "OK"
		else 
			render plain: "NOTOK"
		end
	end

	def destroy
		@placelist.destroy

		render plain: "OK"
	end

	private
		def placelist_params
			params.require(:placelist).permit(:title, :description)
		end

	    def correct_user
	      @placelist = Placelist.find(params[:id])
	      user = @placelist.user
	      redirect_to(root_url) unless current_user?(user)
	    end
end
