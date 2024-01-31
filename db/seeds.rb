# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all
Client.destroy_all
Property.destroy_all
Tree.destroy_all

TestUser = User.create(
	email:"test@user.com",
	password: "password",
	password_confirmation: "password",
  id: 1,
	)

Client.create(
  name:'Ralph Baccio',
  contact_name:'none',
  phone: '123-123-1234',
  email: 'ralph@bacchio.com',
  mail_address: '123 Main St, Honolulu, 96819',
  notes: 'none',
  user_id: 1,
  id:1,
)

Ralphs = Property.create(
  name:'Home',
  contact_name:'Ralph Bacchio',
  phone: '123-123-1234',
  email: 'ralph@bacchio.com',
  address: '123 Main St, Honolulu, 96819',
  property_type: 'Home',
  parking: 'large',
  tree_access: 'poor',
  client_id: 1,
)

Ralphs.trees.create(
  lat: 21.37203996437736, 
  lon: -157.88392309999995,
  dbh: 6,
  crown: 'small',
  species: 'Sweetgum',
  notes: "Out of place here",
)

Client.create(
  name:'Norma Flaskerud',
  contact_name:'none',
  phone: '143-143-1434',
  email: 'norma@sbcglobal.net',
  mail_address: '142 Main St, Honolulu, 96819',
  notes: 'none',
  user_id: 1,
  id: 2,
)

Normas = Property.create(
  name:'Home',
  contact_name:'none',
  phone: '143-143-1434',
  email: 'norma@sbcglobal.net',
  address: '142 Main St, Honolulu, 96819',
  property_type: 'Home',
  parking: 'street',
  tree_access: 'good',
  client_id: 2,
)

Normas.trees.create(
  lat: 21.37327826530759, 
  lon: -157.88285038247952,
  dbh: 3,
  crown: 'small',
  species: 'Crepe Myrtle',
  notes: "Out of place here",
)

Normas.trees.create(
  lat: 21.37327826530800, 
  lon: -157.88285038249000,
  dbh: 3,
  crown: 'small',
  species: 'Crepe Myrtle',
  notes: "Out of place here",
)