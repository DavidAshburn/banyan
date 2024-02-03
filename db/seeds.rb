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
Job.destroy_all

TestUser = User.create(
	email:"test@user.com",
	password: "password",
	password_confirmation: "password",
  id: 1,
	)

Profile.create(
  name:"Boss",
  user_id:1,
)

Client.create(
  name:'Ralph Baccio',
  contact_name:'none',
  phone: '123-123-1234',
  email: 'ralph@bacchio.com',
  mail_address: '1754 Ala Noe Way, Honolulu, 96819',
  notes: 'none',
  user_id: 1,
  id:1,
)

Ralphs = Property.create(
  name:'Home',
  contact_name:'Ralph Bacchio',
  phone: '123-123-1234',
  email: 'ralph@bacchio.com',
  address: '1754 Ala Noe Way, Honolulu, 96819',
  property_type: 'Home',
  parking: 'large',
  tree_access: 'poor',
  client_id: 1,
)

Ralphs.trees.create(
  latitude: 21.37203996437736,
  longitude: -157.88392309999995,
  dbh: 6,
  crown: 'small',
  species: 'Sweetgum',
  notes: "Out of place here",
)

Job.create(
  start: DateTime.new(2024,3,2,8),
  end: DateTime.new(2024,3,2,4),
  estimator: "Johnny",
  foreman: "Reed",
  equipment: ["Bucket Truck","F450","BC1000"],
  crew_size: 4,
  est_hours: 8,
  property_id: Ralphs.id,
  work: {trees:[]},
)

Client.create(
  name:'Norma Flaskerud',
  contact_name:'none',
  phone: '143-143-1434',
  email: 'norma@sbcglobal.net',
  mail_address: '28 Rolling Green Circle, Pleasant Hill, CA 94523',
  notes: 'none',
  user_id: 1,
  id: 2,
)

Normas = Property.create(
  name:'Home',
  contact_name:'none',
  phone: '143-143-1434',
  email: 'norma@sbcglobal.net',
  address: '28 Rolling Green Circle, Pleasant Hill, CA 94523',
  property_type: 'Home',
  parking: 'street',
  tree_access: 'good',
  client_id: 2,
)

Normas.trees.create(
  latitude: 37.946569047725674,
  longitude: -122.0761460021809,
  dbh: 3,
  crown: 'small',
  species: 'Crepe Myrtle',
  notes: "Out of place here",
)


Normas.trees.create(
  latitude: 37.946560000000000,
  longitude: -122.0761460021000,
  dbh: 3,
  crown: 'small',
  species: 'Crepe Myrtle',
  notes: "Out of place here",
)

Normas.trees.create(
  latitude: 37.946600000000000,
  longitude: -122.0761460021000,
  dbh: 3,
  crown: 'small',
  species: 'Crepe Myrtle',
  notes: "Out of place here",
)

Normas.trees.create(
  latitude: 37.942600000000000,
  longitude: -122.0751460021000,
  dbh: 3,
  crown: 'small',
  species: 'Crepe Myrtle',
  notes: "Out of place here",
)

NormaApts = Property.create(
  name:'Willow Glen',
  contact_name:'Norma Flaskerud',
  phone: '143-143-1434',
  email: 'norma@sbcglobal.net',
  address: '400 Longbrook Way, Pleasant Hill, CA 94523',
  property_type: 'Complex',
  parking: 'large',
  tree_access: 'good',
  client_id: 2,
)