def makeTrees(trees, pid)
  trees.each do |tree|
    Tree.create(
      species: tree[0],
      dbh: tree[1],
      crown: tree[2],
      latitude: tree[3],
      longitude: tree[4],
      property_id: pid,
    )
  end
end

User.destroy_all
Profile.destroy_all
Client.destroy_all
Property.destroy_all
Tree.destroy_all
Proptype.destroy_all

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

TestUser = User.create(
	email:"test@user.com",
	password: "password",
	password_confirmation: "password",
  id: 999,
	)

Ralph = Client.create(
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
  address: "94-490 Holaniku St Mililani HI 96789",
  client_id: Ralph.id,
  email: 'ralph@bacchio.com',
  latitude: 21.447744,
  longitude: -158.015466,
  name: "Home",
  parking: "street",
  phone: '123-123-1234',
  property_type: "House",
  tree_access: "good",
)

trees1 = [
  [
    "Monkeypod",
    10,
    "medium",
    21.447708438664378,
    -158.01528886996567
  ],
  [
    "Mango",
    10,
    "small",
    21.447837997076746,
    -158.01532881376323
  ],
  [
    "Orange",
    3,
    "small",
    21.44766112142544,
    -158.01540628044114
  ],
  [
    "hedge",
    12,
    "medium",
    21.447760261770213,
    -158.01555153014965
  ],
  [
    "avocado",
    2,
    "small",
    21.447655488314012,
    -158.01553216355205
  ]
]

makeTrees(trees1, Ralphs.id)
