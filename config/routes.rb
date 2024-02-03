Rails.application.routes.draw do
  resources :jobs
  resources :properties
  resources :clients
  resources :trees
  get 'maps/find'
  get 'user/dashboard'
  get 'user/profile'
  get 'mapping/new'
  root 'home#index'
  devise_for :users

  get 'data/clients', to: 'data#clients'
  get 'maps/find', to: 'maps#find'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
