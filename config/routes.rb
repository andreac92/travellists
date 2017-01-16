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

  # get    '/login',   to: 'sessions#new' delete view
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
 
  root 'welcome#index'
end
