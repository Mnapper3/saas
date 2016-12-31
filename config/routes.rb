Rails.application.routes.draw do
  root to: "pages#home"
  devise_for :users, controllers: {registrations: 'users/registrations' }
  get '/about' => 'pages#about'
  resources :contacts, only: [:create]
  get 'contact-us' => 'contacts#new'
end
