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

def makeClients(list)
  list.each do |client|
    Client.create(
      name: client[0],
      contact_name: client[1],
      phone: client[2],
      email: client[3],
      mail_address: client[4],
      notes: client[5],
      user_id: TestUser.id,
    )
  end
end

User.destroy_all
Profile.destroy_all
Client.destroy_all
Property.destroy_all
Tree.destroy_all
Job.destroy_all
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


Ralphs2 = Property.create(
  address: "94-116 Akaku Place Mililani HI 96789",
  client_id: Ralph.id,
  contact_name: "Ralph Baccio",
  email: 'ralph@bacchio.com',
  latitude: 21.436185,
  longitude: -158.010949,
  name: "Rental",
  parking: "street",
  phone: "123-123-1234",
  property_type: "House",
  tree_access: "good",
)

trees2 = [
  [
    "hedge",
    3,
    "medium",
    21.43616818604177,
    -158.01093332749193
  ],
  [
    "hedge",
    10,
    "large",
    21.436283579327082,
    -158.01093754415083
  ],
  [
    "mango",
    12,
    "large",
    21.436336173611807,
    -158.011057296706
  ],
  [
    "Plumeria",
    6,
    "small",
    21.43607712648712,
    -158.01103705682672
  ]
]

makeTrees(trees2, Ralphs2.id)

Ralphs3 = Property.create(
  address: "98-1750 Hapaki St Aiea HI 96701",
  client_id: Ralph.id,
  contact_name: "Ralph Baccio",
  email: 'ralph@bacchio.com',
  latitude: 21.403971,
  longitude: -157.941297,
  name: "Rental2",
  parking: "street",
  phone: "123-123-1234",
  property_type: "House",
  tree_access: "good",
)

trees3 = [
    [
      "Mango",
      12,
      "large",
      21.403977718361247,
      -157.94134688809658
    ],
    [
      "Halekoa",
      6,
      "small",
      21.4040279503254,
      -157.94134778731188
    ],
    [
      "Plumeria",
      12,
      "large",
      21.403945067451133,
      -157.9413423919725
    ],
    [
      "Bottlebrush",
      6,
      "medium",
      21.403868044875907,
      -157.94133250053855
    ],
    [
      "Hibiscus",
      10,
      "medium",
      21.403893160799186,
      -157.94118412926923
    ]
  ]

makeTrees(trees3, Ralphs3.id)


Norma = Client.create(
  name:'Norma Flaskerud',
  contact_name:'none',
  phone: '808-456-7894',
  email: 'norma@sbcglobal.net',
  mail_address: '41 Hoomaha St Wahiawa HI 96786',
  notes: 'none',
  user_id: TestUser.id,
)


Normas = Property.create(
  address: "41 Hoomaha St Wahiawa HI 96786",
  client_id: Norma.id,
  contact_name: "Norma Flaskerud",
  email: 'norma@sbcglobal.net',
  latitude: 21.501463,
  longitude: -158.007684,
  name: "Home",
  parking: "street",
  phone: '808-456-7894',
  property_type: "House",
  tree_access: "good",
)

trees4 = [
  [
    "Mango",
    24,
    "large",
    21.501427774962664,
    -158.0077016052568
  ],
  [
    "Hibiscus",
    10,
    "medium",
    21.50150714765398,
    -158.0075335713318
  ],
  [
    "Coconut",
    12,
    "large",
    21.50150835027003,
    -158.00757105582392
  ],
  [
    "Acerola",
    10,
    "medium",
    21.501513160722425,
    -158.0075038422552
  ],
  [
    "Sheffelera",
    10,
    "medium",
    21.501409735673107,
    -158.00774296710833
  ],
  [
    "Coconut",
    12,
    "large",
    21.501365238871884,
    -158.00770031238986
  ],
  [
    "Topiary",
    3,
    "small",
    21.501305107962807,
    -158.00763309889197
  ],
  [
    "topiary",
    3,
    "small",
    21.501315931561322,
    -158.00758527387353
  ]
]
makeTrees(trees4, Normas.id)

Normas2 = Property.create(
  address: "45-546 Alokahi Place Kaneohe HI 96744",
  client_id: Norma.id,
  contact_name: "Norma Flaskerudt",
  email: 'norma@sbcglobal.net',
  latitude: 21.396818,
  longitude: -157.802024,
  name: "Rental",
  parking: "street",
  phone: '808-456-7894',
  property_type: "House",
  tree_access: "good",
)

trees5 = [
  [
    "Mango",
    23,
    "large",
    21.39677679053932,
    -157.80222310915318
  ],
  [
    "Avocado",
    10,
    "medium",
    21.39689895986136,
    -157.80219299467913
  ],
  [
    "Areka Palm",
    12,
    "large",
    21.396898959868494,
    -157.8021747108587
  ],
  [
    "Monkeypod",
    12,
    "large",
    21.396713702907576,
    -157.802001552167
  ]
]
makeTrees(trees5, Normas2.id)

Wes = Client.create(
  name:'Wes Bentley',
  contact_name:'none',
  phone: '808-345-6545',
  email: 'wes@bentley.com ',
  mail_address: '2937 Papali St Honolulu HI 96819',
  notes: 'none',
  user_id: TestUser.id,
)

Weshome = Property.create(
  address: "2937 Papali St Honolulu HI 96819",
  client_id: Wes.id,
  contact_name: "Wes Bentley",
  email: "wes@bentley.com",
  latitude: 21.353305,
  longitude: -157.855797,
  name: "Home",
  parking: "large",
  phone: "808-345-6545",
  property_type: "House",
  tree_access: "good",
)

trees6 = [
  [
    "Mango",
    12,
    "large",
    21.353128271838045,
    -157.85604521211565
  ],
  [
    "Topiary",
    3,
    "small",
    21.3531581132101,
    -157.85598875918606
  ],
  [
    "Orange",
    4,
    "small",
    21.35318937544824,
    -157.85596587287463
  ],
  [
    "Orange",
    3,
    "small",
    21.35321211162575,
    -157.85593993505822
  ],
  [
    "Coconut",
    12,
    "large",
    21.353267531167532,
    -157.85607420138206
  ],
  [
    "Hedge",
    10,
    "medium",
    21.35345084197563,
    -157.85591704861687
  ]
]
makeTrees(trees6, Weshome.id)

Wes2 = Property.create(
  address: "326 Hanakapiai St Honolulu HI 96825",
  client_id: Wes.id,
  contact_name: "Wes Bentley",
  email: "wes@bentley.com",
  latitude: 21.27696,
  longitude: -157.69979,
  name: "Rental",
  parking: "street ",
  phone: "808-345-6545",
  property_type: "House",
  tree_access: "good",
)

trees7 = [
  [
    "Hedge",
    10,
    "small",
    21.276813168075762,
    -157.6999046495405
  ],
  [
    "Hedge",
    10,
    "small",
    21.27684625386385,
    -157.69987801999662
  ],
  [
    "Topiary",
    3,
    "small",
    21.276927464599098,
    -157.6998667226407
  ],
  [
    "Topiary",
    3,
    "small",
    21.276953030941428,
    -157.6999038426832
  ],
  [
    "Orange",
    6,
    "medium",
    21.27699814802041,
    -157.699945804474
  ],
  [
    "Areka Palm",
    10,
    "medium",
    21.276979349319916,
    -157.69994580441704
  ],
  [
    "Hibiscus",
    7,
    "medium",
    21.27677857775346,
    -157.70003941151182
  ]
]
makeTrees(trees7, Wes2.id)

Wes3 = Property.create(
  address: "56 Moloaa St Honolulu HI 96825",
  client_id: Wes.id,
  contact_name: "Wes Bentley",
  email: "wes@bentley.com",
  latitude: 21.263461,
  longitude: -157.709241,
  name: "Large Rental",
  parking: "large",
  phone: "808-345-6545",
  property_type: "House",
  tree_access: "good",
)

trees8 = [
  [
    "Mango",
    10,
    "large",
    21.263434669227195,
    -157.70911245209382
  ],
  [
    "Monkeypod",
    8,
    "medium",
    21.26344074277037,
    -157.7091434089504
  ],
  [
    "Coconut",
    10,
    "large",
    21.263437706011786,
    -157.70915481410074
  ],
  [
    "Coconut",
    10,
    "large",
    21.263434669279476,
    -157.7091727364817
  ],
  [
    "Opuma",
    6,
    "small",
    21.26340581989733,
    -157.7092102105823
  ],
  [
    "Areka Hedge",
    12,
    "large",
    21.26339519119817,
    -157.7092590898591
  ],
  [
    "Queen Palm",
    10,
    "large",
    21.263433150887693,
    -157.70940898626571
  ],
  [
    "Hibiscus hedge",
    10,
    "large",
    21.26351969900101,
    -157.70944971900218
  ],
  [
    "Areka Hedge",
    24,
    "extra large",
    21.263632059599487,
    -157.70945786556348
  ],
  [
    "Coconut",
    12,
    "large",
    21.263663945743417,
    -157.7093796587129
  ],
  [
    "Coconut",
    8,
    "large",
    21.26365939059862,
    -157.7093552190749
  ],
  [
    "Avocado",
    6,
    "small",
    21.263598655191657,
    -157.70932263286412
  ],
  [
    "Hedge",
    8,
    "medium",
    21.263584989742824,
    -157.70929819322555
  ],
  [
    "Podocarpus hedge",
    18,
    "extra large",
    21.263507552104116,
    -157.7093389258979
  ],
  [
    "Opuma",
    10,
    "large",
    21.263580434631123,
    -157.70902609863458
  ],
  [
    "Opuma ",
    10,
    "large",
    21.263624467711523,
    -157.70904402107368
  ],
  [
    "Orange",
    6,
    "medium",
    21.263733791529972,
    -157.7090798658752
  ],
  [
    "Areka hedge",
    10,
    "large",
    21.263454408002517,
    -157.70902121076256
  ]
]
makeTrees(trees8, Wes3.id)
