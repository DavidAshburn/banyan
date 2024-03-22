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

def makeClient(address)
  cname = Faker::Name.name
  phone = Faker::PhoneNumber.cell_phone

  thisguy = Client.create(
    name: cname,
    contact_name: cname,
    phone: phone,
    email: "#{Faker::JapaneseMedia::StudioGhibli.character}@gmail.com".gsub(/\s+/,""),
    mail_address: address[0],
    notes: Faker::Quotes::Shakespeare,
    user_id: TestUser.id,
  )
  Property.create(
  address: address[0],
  client_id: thisguy.id,
  email: thisguy.email,
  latitude: address[2],
  longitude: address[1],
  name: "Home",
  parking: "street",
  phone: phone,
  property_type: "House",
  tree_access: "good",
  )
end

def makeClientwTrees(address, trees)
  cname = Faker::Name.name
  phone = Faker::PhoneNumber.cell_phone

  thisguy = Client.create(
    name: cname,
    contact_name: cname,
    phone: phone,
    email: "#{Faker::JapaneseMedia::StudioGhibli.character}@gmail.com".gsub(/\s+/,""),
    mail_address: address[0],
    notes: Faker::Quotes::Shakespeare,
    user_id: TestUser.id,
  )
  thisprop = Property.create(
  address: address[0],
  client_id: thisguy.id,
  email: thisguy.email,
  latitude: address[2],
  longitude: address[1],
  name: "Home",
  parking: "street",
  phone: phone,
  property_type: "House",
  tree_access: "good",
  )
  makeTrees(trees, thisprop.id)
end

User.destroy_all
Profile.destroy_all
Client.destroy_all
Property.destroy_all
Tree.destroy_all
Job.destroy_all
Proptype.destroy_all
Fleet.destroy_all

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
	password: "alanoeway",
	password_confirmation: "alanoeway",
  id: 999,
  time_zone: 'Hawaii',
	)

hanapuleTrees =  [
  [
    "Monkeypod",
    12,
    "Large",
    21.57149066399235,
    -158.1266415843822
  ],
  [
    "Monkeypod",
    8,
    "Medium",
    21.571512455043703,
    -158.12669068061265
  ],
  [
    "Monkeypod",
    8,
    "Medium",
    21.571556037110113,
    -158.12668956476267
  ],
  [
    "Monkeypod",
    24,
    "Large",
    21.571564338486453,
    -158.12663600522876
  ],
  [
    "Halekoa",
    6,
    "Medium",
    21.57161414654712,
    -158.12668398560925
  ],
  [
    "Halekoa",
    6,
    "Medium",
    21.571624141927302,
    -158.12666250142146
  ],
  [
    "Halekoa",
    6,
    "Medium",
    21.571621024009275,
    -158.12670608731878
  ]
]
kupahuTrees = [
  [
    "Hibiscus",
    4,
    "Small",
    21.57170323369958,
    -158.12206883458
  ],
  [
    "Mango",
    14,
    "Medium",
    21.57177746635037,
    -158.1220051096719
  ],
  [
    "Orange",
    8,
    "Small",
    21.57181863746696,
    -158.12201651309329
  ],
  [
    "Orange",
    3,
    "Small",
    21.571881017921356,
    -158.12202657492756
  ],
  [
    "Orange",
    3,
    "Small",
    21.57187415606336,
    -158.12207755486207
  ],
  [
    "Orange",
    6,
    "Small",
    21.571878522647154,
    -158.12212853477507
  ],
  [
    "Mango",
    10,
    "Medium",
    21.57180179465381,
    -158.1222291530579
  ]
]
kileaTrees = [
  [
    "Monkeypod",
    26,
    "Large",
    21.508725655491958,
    -158.00153437084313
  ],
  [
    "Monkeypod",
    26,
    "Large",
    21.508548823765395,
    -158.0014472563596
  ],
  [
    "Mango",
    16,
    "Medium",
    21.508570927922378,
    -158.00181947244573
  ],
  [
    "Plumeria",
    6,
    "Small",
    21.508425877662518,
    -158.00176446726505
  ],
  [
    "Plumeria",
    6,
    "Small",
    21.508447692877056,
    -158.00172290012762
  ]
]
californiaTrees = [
  [
    "Plumeria",
    9,
    "Small",
    21.507603855357118,
    -157.9969050342629
  ],
  [
    "Hibiscus",
    4,
    "Small",
    21.507813374712356,
    -157.99712142816077
  ]
]
karstenTrees = [
  [
    "Avocado",
    4,
    "Small",
    21.50774175386644,
    -157.9926443272953
  ],
  [
    "Avocado",
    4,
    "Small",
    21.507740180538363,
    -157.99259105809497
  ],
  [
    "Coconut",
    16,
    "Medium",
    21.507635553919883,
    -157.99275424785267
  ],
  [
    "Coconut",
    16,
    "Medium",
    21.507615887277623,
    -157.99275340230986
  ],
  [
    "Coconut",
    16,
    "Medium",
    21.507603300643567,
    -157.9927466379724
  ],
  [
    "Coconut",
    16,
    "Medium",
    21.507586780671005,
    -157.99274748352786
  ]
]
kumuoneTrees = [
  [
    "Hibiscus",
    2,
    "Small",
    21.326970076959483,
    -157.80263696288108
  ],
  [
    "Hibiscus",
    2,
    "Small",
    21.326981990948767,
    -157.8026689375702
  ],
  [
    "Plumeria",
    8,
    "Medium",
    21.32708425278328,
    -157.80258473794802
  ],
  [
    "Plumeria",
    3,
    "Small",
    21.327036596710386,
    -157.8028277458851
  ],
  [
    "Plumeria",
    3,
    "Small",
    21.32704751789332,
    -157.80285652313452
  ],
  [
    "Coconut",
    8,
    "Small",
    21.327129922942703,
    -157.80288743208393
  ]
]
kalaauaTrees = [
  [
    "Fan Palm",
    14,
    "Large",
    21.302721243273126,
    -157.7241151281243
  ],
  [
    "Hao",
    12,
    "Medium",
    21.302671246803143,
    -157.7241124449771
  ],
  [
    "Orange",
    6,
    "Medium",
    21.302537506032337,
    -157.72399371534445
  ],
  [
    "Orange",
    6,
    "Medium",
    21.30254000586028,
    -157.72396151748805
  ],
  [
    "Avocado",
    8,
    "Medium",
    21.302580003068442,
    -157.72391657464163
  ],
  [
    "Hibiscus",
    5,
    "Small",
    21.302671246562824,
    -157.7239098667787
  ],
  [
    "Hibiscus",
    5,
    "Small",
    21.302649998064354,
    -157.72391053756587
  ]
]
kalaaubTrees = [
  [
    "Plumeria",
    6,
    "Small",
    21.300920628438448,
    -157.7242855425008
  ],
  [
    "Orange",
    4,
    "Small",
    21.30102062255662,
    -157.72430499542068
  ]
]
nanahonuaTrees = [
  [
    "Hao",
    18,
    "Large",
    21.30762687333909,
    -157.70936376805446
  ],
  [
    "Hibiscus",
    3,
    "Medium",
    21.307525633748938,
    -157.70938456251244
  ],
  [
    "Orange",
    6,
    "Medium",
    21.307683741977712,
    -157.70948115606004
  ],
  [
    "Monkeypod",
    15,
    "Medium",
    21.30762687287465,
    -157.7095804328102
  ],
  [
    "Monkeypod",
    23,
    "Large",
    21.307591251583048,
    -157.7096133014652
  ],
  [
    "Mango",
    26,
    "Large",
    21.307457515338513,
    -157.70965757349927
  ],
  [
    "Halekoa",
    6,
    "Medium",
    21.307429393272585,
    -157.70956299228382
  ],
  [
    "Halekoa",
    7,
    "Medium",
    21.307391897105617,
    -157.70952274494945
  ],
  [
    "Halekoa",
    8,
    "Medium",
    21.307416894526597,
    -157.70949926734318
  ],
  [
    "Avocado",
    5,
    "Small",
    21.307448766282533,
    -157.70946438633564
  ]
]
kalapakiTrees = [
  [
    "Orange",
    6,
    "Medium",
    21.305232494444496,
    -157.68341609888606
  ],
  [
    "Monkeypod",
    24,
    "Large",
    21.305243743480958,
    -157.6832893198208
  ],
  [
    "Mango",
    16,
    "Large",
    21.3051293783692,
    -157.68330273557356
  ],
  [
    "Mango",
    12,
    "Large",
    21.30505126009585,
    -157.68335841106483
  ],
  [
    "Mango",
    8,
    "Medium",
    21.305074383076374,
    -157.6833161513826
  ],
  [
    "Sheffelera",
    6,
    "Medium",
    21.30503313661646,
    -157.68345902937924
  ],
  [
    "Sheffelera",
    6,
    "Medium",
    21.305026262229703,
    -157.68342683152912
  ],
  [
    "Sheffelera",
    6,
    "Medium",
    21.30509438068141,
    -157.6835817830429
  ],
  [
    "Opuma",
    10,
    "Medium",
    21.305238118048038,
    -157.68354958506933
  ]
]
kalapakibTrees = [
  [
    "Plumeria",
    10,
    "Small",
    21.305420915426723,
    -157.68449197594023
  ]
]
kealahouTrees = [
  [
    "Coconut",
    14,
    "Medium",
    21.301845351268,
    -157.6728154833844
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.30185165341868,
    -157.67273515683937
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.301842987915194,
    -157.67270556283756
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.301838261300887,
    -157.67266244015534
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.301818567020305,
    -157.67260071554307
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.301787056056767,
    -157.67255167405025
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.301770512818493,
    -157.67252799885708
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.30177130058246,
    -157.67255421068305
  ],
  [
    "Mango",
    10,
    "Medium",
    21.30175475748422,
    -157.67283154884902
  ],
  [
    "Sheffelera",
    6,
    "Medium",
    21.30179257061043,
    -157.67282901222873
  ]
]
kalanianaoleTrees = [
  [
    "Monkeypod",
    16,
    "Large",
    21.325577185071637,
    -157.68381364303045
  ],
  [
    "Sheffelera",
    8,
    "Small",
    21.325456473112013,
    -157.68389793605732
  ],
  [
    "Sheffelera",
    12,
    "Medium",
    21.325366232047287,
    -157.68398600336457
  ],
  [
    "Sheffelera",
    12,
    "Medium",
    21.325444753314827,
    -157.68414829871065
  ],
  [
    "Sheffelera",
    12,
    "Medium",
    21.32548577190539,
    -157.68413445955667
  ],
  [
    "Opuma",
    6,
    "Small",
    21.325723679785156,
    -157.68403003686194
  ],
  [
    "Opuma",
    6,
    "Small",
    21.325687349071913,
    -157.68405016654197
  ],
  [
    "Orange",
    4,
    "Small",
    21.325752979056986,
    -157.68379854574385
  ]
]
nakiniTrees = [
  [
    "Monkeypod",
    10,
    "Medium",
    21.325303242792714,
    -157.69598042262894
  ],
  [
    "Monkeypod",
    10,
    "Medium",
    21.32528446875763,
    -157.69592560373314
  ],
  [
    "Monkeypod",
    10,
    "Medium",
    21.325237909149877,
    -157.6958941634609
  ],
  [
    "Hibiscus",
    8,
    "Medium",
    21.325416637592397,
    -157.69601669964737
  ],
  [
    "Orange",
    10,
    "Medium",
    21.32547070670452,
    -157.69598122855456
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.325275456480284,
    -157.69572003267916
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.32526118820647,
    -157.6957087464297
  ],
  [
    "Areka Palm",
    6,
    "Medium",
    21.325204115068487,
    -157.6957974240124
  ],
  [
    "Areka Palm",
    6,
    "Medium",
    21.325219885226574,
    -157.6958361196678
  ],
  [
    "Areka Palm",
    6,
    "Medium",
    21.32526118802022,
    -157.69581596563327
  ],
  [
    "Areka Palm",
    6,
    "Medium",
    21.325244666968814,
    -157.69577162686815
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.325463946663945,
    -157.6957280943494
  ]
]
manawaiolaTrees = [
  [
    "Plumeria",
    8,
    "Medium",
    21.32570752099987,
    -157.6988809706643
  ]
]
lupeTrees = [
  [
    "Coconut",
    14,
    "Medium",
    21.330625613077743,
    -157.70003635544597
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.330663728070007,
    -157.7000075115828
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.33064998164602,
    -157.70010343436203
  ],
  [
    "Coconut",
    14,
    "Medium",
    21.33067372540461,
    -157.70008129832618
  ],
  [
    "Lime",
    4,
    "Small",
    21.330630611818293,
    -157.69982371527212
  ]
]
kupauTrees = [
  [
    "Hau",
    6,
    "Medium",
    21.373064964298692,
    -157.72083396289645
  ],
  [
    "Jabong",
    10,
    "Medium",
    21.373104317550442,
    -157.72072864913324
  ],
  [
    "Banyan",
    13,
    "Medium",
    21.373171155760886,
    -157.7206293724105
  ],
  [
    "Areka Palm",
    24,
    "Large",
    21.37306309021116,
    -157.72057503846037
  ],
  [
    "Areka Palm",
    24,
    "Large",
    21.373046849155955,
    -157.72055424400594
  ],
  [
    "Monkeypod",
    18,
    "Large",
    21.372996876652863,
    -157.7206515084017
  ],
  [
    "Plumeria",
    8,
    "Small",
    21.372898180831925,
    -157.72099092726165
  ]
]
aupupuTrees = [
  [
    "Hibiscus",
    4,
    "Small",
    21.37001447855478,
    -157.7288290912138
  ],
  [
    "Hibiscus",
    4,
    "Small",
    21.370010105862207,
    -157.72873518080274
  ],
  [
    "Plumeria",
    6,
    "Small",
    21.370008856513607,
    -157.72878280679546
  ],
  [
    "Juniper",
    3,
    "Small",
    21.37035367306875,
    -157.72879756417905
  ],
  [
    "Juniper",
    3,
    "Small",
    21.370334933030833,
    -157.72883445755988
  ]
]
ponoponoTrees = [
  [
    "Fan Palm",
    6,
    "Small",
    21.369791265298105,
    -157.73332303556094
  ],
  [
    "Fan Palm",
    6,
    "Small",
    21.369758782441863,
    -157.73334047607912
  ],
  [
    "Fan Palm",
    6,
    "Small",
    21.369726924257478,
    -157.73335389187048
  ],
  [
    "Fan Palm",
    6,
    "Small",
    21.36969943876808,
    -157.73336730764544
  ],
  [
    "Fan Palm",
    6,
    "Small",
    21.369862477521963,
    -157.73355110356877
  ],
  [
    "Fan Palm",
    6,
    "Small",
    21.36983624140042,
    -157.7335329922759
  ],
  [
    "Plumeria",
    8,
    "Small",
    21.36987184757946,
    -157.73345249763548
  ]
]
akaakoaTrees = [
  [
    "Opuma",
    10,
    "Medium",
    21.367114316230186,
    -157.7376680582979
  ],
  [
    "Opuma",
    10,
    "Medium",
    21.36710432132915,
    -157.73764793463596
  ],
  [
    "Orange",
    6,
    "Small",
    21.366986881116688,
    -157.7376593381268
  ],
  [
    "Hao",
    3,
    "Small",
    21.36690942053434,
    -157.73761842008747
  ],
  [
    "Hao",
    3,
    "Small",
    21.36690254906202,
    -157.7375714648866
  ]
]
manumeleTrees = [
  [
    "Fan Palm",
    6,
    "Small",
    21.384754403873004,
    -157.75544851603496
  ],
  [
    "Fan Palm",
    6,
    "Small",
    21.384735041067458,
    -157.7554672981225
  ],
  [
    "Sheffelera",
    6,
    "Medium",
    21.38480624578115,
    -157.75584495143784
  ],
  [
    "Plumeria",
    7,
    "Small",
    21.3849180506393,
    -157.75566719260252
  ],
  [
    "Opuma",
    6,
    "Medium",
    21.384680075734394,
    -157.75575909075488
  ]
]
lopakaTrees = [
  [
    "Juniper",
    4,
    "Small",
    21.359206949251302,
    -157.77089152711648
  ],
  [
    "Juniper",
    4,
    "Small",
    21.3592231918617,
    -157.77087274503313
  ],
  [
    "Coconut",
    12,
    "Medium",
    21.359188832426483,
    -157.77098141234745
  ],
  [
    "Coconut",
    12,
    "Medium",
    21.35921694462988,
    -157.77101226861748
  ],
  [
    "Coconut",
    12,
    "Medium",
    21.35952305418293,
    -157.77105184517993
  ],
  [
    "Coconut",
    12,
    "Medium",
    21.35954554385401,
    -157.7710176349569
  ],
  [
    "Monkeypod",
    24,
    "Large",
    21.359288161387383,
    -157.77107934768514
  ],
  [
    "Monkeypod",
    18,
    "Large",
    21.35925130318843,
    -157.77106391952915
  ],
  [
    "Fan Palm",
    6,
    "Small",
    21.359295033272062,
    -157.77101428116643
  ]
]
hinalaniTrees = [
  [
    "Plumeria",
    6,
    "Small",
    21.425127493251097,
    -157.81034958589873
  ],
  [
    "Hibiscus",
    4,
    "Small",
    21.424996362000655,
    -157.81028519021731
  ],
  [
    "Hibiscus",
    4,
    "Small",
    21.425008850702312,
    -157.81024762605307
  ],
  [
    "Hibiscus",
    4,
    "Small",
    21.42501197288756,
    -157.81021676977628
  ],
  [
    "Jabong",
    8,
    "Medium",
    21.425006977490355,
    -157.8103361701517
  ]
]
proplist = [
  [["64 Hanapule St Waialua, HI 96791", -158.12663, 21.57150],hanapuleTrees],
  [["259 Kupahu St Waialua, HI 96791",-158.12215,21.57176],kupahuTrees],
  [["89A Kilea Pl Wahiawa, HI 96786",-158.00140,21.50870],kileaTrees],
  [["2143 California Ave Wahiawa, HI 96786",-157.99714,21.50774],californiaTrees],
  [["248 Karsten Dr Wahiawa, HI 96786",-157.99272,21.50764],karstenTrees],
  [["3634 Kumuone St Honolulu, HI 96822",-157.80274,21.32714],kumuoneTrees],
  [["751 Kalaau Pl Honolulu, HI 96821",-157.72404,21.30263],kalaauaTrees],
  [["696 Kalaau Pl Honolulu, HI 96821",-157.72436,21.30098],kalaaubTrees],
  [["886 Nana Honua St Honolulu, HI 96825",-157.70951,21.30761],nanahonuaTrees],
[["105 Kalapaki Pl Honolulu, HI 96825",-157.68340,21.30517],kalapakiTrees],
  [["1099 Kalapaki St Honolulu, HI 96825",-157.68441,21.30550],kalapakibTrees],
  [["614 Kealahou St Honolulu, HI 96825",-157.67268,21.30174],kealahouTrees],
  [["41-578 Kalaniana'ole Hwy Waimanalo, HI 96795",-157.68399,21.32557],kalanianaoleTrees],
  [["41-242 Nakini St Waimanalo, HI 96795",-157.69588,21.32539],nakiniTrees],
  [["314 Manawaiola St Waimanalo, HI 96795",-157.69894,21.32580],manawaiolaTrees],
  [["41201 Lupe St Waimanalo, HI 96795",-157.69987,21.33058],lupeTrees],
  [["1436 Kupau S t Kailua, HI 96734",-157.72084,21.37300],kupauTrees],
  [["1496 Aupupu St Kaulua, HI 96734",-157.72876,21.37021],aupupuTrees],
  [["1535 Ponopono Pl Kailua, HI 96734",-157.73348,21.36982],ponoponoTrees],
  [["1740 Akaakoa St Kailua, HI 96734",-157.73755,21.36700],akaakoaTrees],
  [["1250 Manu Mele St Kailua, HI 96734",-157.75569,21.38480],manumeleTrees],
  [["1362 Lopaka Pl Kailua, HI 96734",-157.77086,21.35937],lopakaTrees],
  [["46-178 Hinalani St Kaneohe, HI 96744",-157.81020,21.42512],hinalaniTrees]
]

proplist.each {|prop|
  makeClientwTrees(prop[0],prop[1])
}

Ralph = Client.create(
  name:'Ralph Baccio',
  contact_name:'none',
  phone: '123-123-1234',
  email: 'ralph@bacchio.com',
  mail_address: '1754 Ala Noe Way, Honolulu, 96819',
  notes: 'none',
  user_id: TestUser.id,
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
  name:'Tuck Buckner',
  contact_name:'none',
  phone: '808-456-7894',
  email: 'tuck@sbcglobal.net',
  mail_address: '41 Hoomaha St Wahiawa HI 96786',
  notes: 'none',
  user_id: TestUser.id,
)


Normas = Property.create(
  address: "41 Hoomaha St Wahiawa HI 96786",
  client_id: Norma.id,
  contact_name: "Tuck Buckner",
  email: 'tuck@sbcglobal.net',
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
  contact_name: "Tuck Buckner",
  email: 'tuck@sbcglobal.net',
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
