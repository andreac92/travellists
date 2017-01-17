module SessionsHelper
  # Logs in the given user.
	def log_in(user)
	session[:user_id] = user.id
	end

	def current_user
	@current_user ||= User.find_by(id: session[:user_id])
	end

	def logged_in?
	!current_user.nil?
	end

	def log_out
	session.delete(:user_id)
	@current_user = nil
	end

	def current_user?(user)
	user == current_user
	end

    def logged_in_user
	  unless logged_in?
	    redirect_to root_url
	  end
	end

	def admin_user
	  redirect_to(root_url) unless logged_in? && current_user.isAdmin?
	end
end
