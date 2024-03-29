Rails.application.routes.draw do
  get 'edit/locupdate'
  resources :jobs
  resources :properties
  resources :clients
  resources :trees
  resources :fleets
  get 'user/dashboard'
  get 'user/profile'
  get 'user/debug'
  get 'user/calendar'
  get 'user/fleet'

  get 'maps/edit', to: 'maps#edit'

  root 'home#index'
  devise_for :users

  get 'data/clients', to: 'data#clients'
  get 'data/searchclients', to: 'data#searchclients'
  get 'data/jobtrees', to: 'data#jobtrees'
  get 'data/jobs', to: 'data#jobs'
  get 'data/dashboard', to: 'data#dashboard'
  get 'data/user', to: 'data#user'
  get 'data/proptrees', to: 'data#proptrees'
  get 'data/client', to: 'data#client'
  get 'data/profile', to: 'data#profile'
  get 'data/userprofile', to: 'data#userprofile'
  get 'data/propjobs', to: 'data#propjobs'
  get 'data/newjob', to: 'data#newjob'
  get 'data/geojson', to: 'data#geojson'
  get 'data/getcalendar', to: 'data#getcalendar'
  get 'data/fleet', to: 'data#fleet'
  post 'edit/locupdate', to: 'edit#locupdate'
  post 'edit/profilespecies', to: 'edit#profilespecies'
  post 'edit/profilevehicles', to: 'edit#profilevehicles'
  post 'edit/profileequipment', to: 'edit#profileequipment'
  post 'edit/profileworktypes', to: 'edit#profileworktypes'
  post 'edit/profileremovespecies', to: 'edit#profileremovespecies'
  post 'edit/profileremovevehicles', to: 'edit#profileremovevehicles'
  post 'edit/profileremoveequipment', to: 'edit#profileremoveequipment'
  post 'edit/profileremoveworktypes', to: 'edit#profileremoveworktypes'
  post 'edit/completejob', to: 'edit#completejob'
  post 'edit/invoicejob', to: 'edit#invoicejob'
  post 'edit/paidjob', to: 'edit#paidjob'
  post 'edit/addzone', to: 'edit#addzone'
  post 'edit/removezone', to: 'edit#removezone'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
