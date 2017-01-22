class Travelist < ApplicationRecord
	has_many :places, dependent: :destroy
	belongs_to :user
end
