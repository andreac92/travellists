class UsersController < ApplicationController
  before_action :admin_user, only: [:index]
  before_action :logged_in_user, only: [:update, :show]
  before_action :correct_user,   only: [:update]

  def index
    @users = User.all
  end

  def create
  	@user = User.new(user_params)
  	if @user.save
  		log_in @user
		  redirect_to account_path
	   end
  end

  def show
  end

  def update
    if @user.update_attributes(user_params)
      redirect_to account_path
    else
      redirect_to account_path
    end
  end

  private
	def user_params
		params.require(:user).permit(:name, :email, :password, :password_confirmation)
	end

	def correct_user
	  @user = User.find(params[:id])
	  redirect_to(root_url) unless current_user?(@user)
	end
end
