class Placelist < ApplicationRecord
	has_many :places, dependent: :destroy
end
