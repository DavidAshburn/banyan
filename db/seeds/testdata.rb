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
Proptype.destroy_all

TestUser = User.create(
	email:"test@user.com",
	password: "password",
	password_confirmation: "password",
  id: 999,
	)

Profile.create(
  name:"Boss",
  user_id: TestUser.id,
)

RalphBaccio = Client.create(
  name:'Ralph Baccio',
  contact_name:'none',
  phone: '123-123-1234',
  email: 'ralph@bacchio.com',
  mail_address: '1754 Ala Noe Way, Honolulu, 96819',
  notes: 'none',
  user_id: TestUser.id,
  id:990,
)

Ralphs = Property.create(
  name:'Home',
  contact_name:'Ralph Bacchio',
  phone: '123-123-1234',
  email: 'ralph@bacchio.com',
  address: '1754 Ala Noe Way, Honolulu, 96819',
  longitude: -157.88392,
  latitude: 21.37221,
  property_type: 'Home',
  parking: 'large',
  tree_access: 'poor',
  client_id: RalphBaccio.id,
  id:980,
)

tone = Ralphs.trees.create(
  latitude: 21.37353996437736,
  longitude: -157.88422309999995,
  dbh: 6,
  crown: 'small',
  species: 'Sheffelera',
  notes: "Leaning",
  id:981,
)

ttwo = Ralphs.trees.create(
  latitude: 21.37303996437736,
  longitude: -157.88492309999995,
  dbh: 6,
  crown: 'small',
  species: 'Plumeria',
  id:982,
)

tthree = Ralphs.trees.create(
  latitude: 21.37253996437736,
  longitude: -157.88452309999995,
  dbh: 6,
  crown: 'small',
  species: 'Avocado',
  id:983,
)

Job.create(
  start: DateTime.new(2024,3,2,8),
  end: DateTime.new(2024,3,2,16),
  estimator: "Johnny",
  foreman: "Reed",
  equipment: ["Bucket Truck","F450","BC1000"],
  crew_size: 4,
  est_hours: 8,
  property_id: Ralphs.id,
  user_id: TestUser.id,
  trees:[tone.id, ttwo.id, tthree.id],
  price:1200,
  id:979,
)

NormaF = Client.create(
  name:'Norma Flaskerud',
  contact_name:'none',
  phone: '143-143-1434',
  email: 'norma@sbcglobal.net',
  mail_address: '28 Rolling Green Circle, Pleasant Hill, CA 94523',
  notes: 'none',
  user_id: TestUser.id,
  id: 960,
)

Normas = Property.create(
  name:'Home',
  contact_name:'none',
  phone: '143-143-1434',
  email: 'norma@sbcglobal.net',
  address: '28 Rolling Green Circle, Pleasant Hill, CA 94523',
  latitude: 37.94650,
  longitude: -122.07617,
  property_type: 'Home',
  parking: 'street',
  tree_access: 'good',
  client_id: NormaF.id,
)

Normas.trees.create(
  latitude: 37.946569047725674,
  longitude: -122.0761460021809,
  dbh: 3,
  crown: 'small',
  species: 'Crepe Myrtle',
  id:961,
)


ntone = Normas.trees.create(
  latitude: 37.946560000000000,
  longitude: -122.0761460021000,
  dbh: 3,
  crown: 'small',
  species: 'Crepe Myrtle',
  notes: "Out of place here",
  id:962,
)

nttwo = Normas.trees.create(
  latitude: 37.946600000000000,
  longitude: -122.0761460021000,
  dbh: 3,
  crown: 'small',
  species: 'Crepe Myrtle',
  id:963,
)

ntthree = Normas.trees.create(
  latitude: 37.942600000000000,
  longitude: -122.0751460021000,
  dbh: 3,
  crown: 'small',
  species: 'Crepe Myrtle',
  id:964,
)

Job.create(
  start: DateTime.new(2024,3,3,8),
  end: DateTime.new(2024,3,3,16),
  estimator: "Johnny",
  foreman: "Reed",
  equipment: ["F650","BC1000"],
  crew_size: 4,
  est_hours: 8,
  property_id: Normas.id,
  user_id: TestUser.id,
  trees: [ntone.id, nttwo.id, ntthree.id],
  price:1200,
  id:965,
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
  client_id: NormaF.id,
  id:966,
)

Proptype.create(
  label: 'House',
)
Proptype.create(
  label: 'Attached',
)
Proptype.create(
  label: 'Apartments'
)
Proptype.create(
  label: 'Park',
)
Proptype.create(
  label: 'Complex',
)
Proptype.create(
  label: 'Industrial',
)
