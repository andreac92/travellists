class AddVisitedToPlaces < ActiveRecord::Migration[5.0]
  def change
    add_column :places, :visited, :boolean, default: false
  end
end
