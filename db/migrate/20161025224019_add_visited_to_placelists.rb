class AddVisitedToPlacelists < ActiveRecord::Migration[5.0]
  def change
    add_column :placelists, :visited, :boolean
  end
end
