class User < ApplicationRecord
	has_many :placelists, dependent: :destroy
	before_save { self.email = email.downcase }
	validates(:name, presence: true, length: {maximum: 50})
	validates(:email, presence: true, length: {maximum: 255}, format: {with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i}, uniqueness: {case_sensitive: false})

	has_secure_password
	validates(:password, presence: true, length: { minimum: 5 }, allow_nil: true)
end
