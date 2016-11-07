class AddCoordsToPlaces < ActiveRecord::Migration[5.0]
  def change
    add_column :places, :coords, :string
  end
end
