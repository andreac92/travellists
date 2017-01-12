class AddDefaultValueToIsAdminInUsers < ActiveRecord::Migration[5.0]
  def change
  	change_column_default :users, :isAdmin, false
  end
end
