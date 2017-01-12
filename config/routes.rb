Rails.application.routes.draw do
  get 'users/new'

  get 'list/index'

  get 'welcome/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :places
  resources :placelists do
  	resources :places
  end
  resources :users

  post '/places/:id/visit', to: 'places#toggle_visited'


  root 'welcome#index'
end
