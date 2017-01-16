class UsersController < ApplicationController
  def create
  	@user = User.new(user_params)
  	if @user.save
  		log_in @user
		redirect_to user_url(@user)
	end
  end

  def show
  	@user = User.find(params[:id])
  end

  private
	def user_params
		params.require(:user).permit(:name, :email, :password, :password_confirmation)
	end
end
