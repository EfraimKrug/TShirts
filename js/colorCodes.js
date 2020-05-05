var COLOR_CODES = [{"COLOR":"Black", "HEX":"27262b","RGB":"rgb(39, 38, 43)"},
{"COLOR":"Oxblood Black", "HEX":"190406","RGB":"rgb(25, 4, 6)"},
{"COLOR":"Black Heather", "HEX":"2A282B","RGB":"rgb(42, 40, 43)"},
{"COLOR":"Red", "HEX":"a02331","RGB":"rgb(160, 35, 49)"},
{"COLOR":"Heather Forest", "HEX":"4F5549","RGB":"rgb(79, 85, 73)"},
{"COLOR":"True Royal", "HEX":"255FA3","RGB":"rgb(37, 95, 163)"},
{"COLOR":"Athletic Heather(B)", "HEX":"AAA1A2","RGB":"rgb(170, 161, 162)"},
{"COLOR":"Oatmeal Triblend", "HEX":"CBC5B9","RGB":"rgb(203, 197, 185)"},
{"COLOR":"Oatmeal Triblend(B)", "HEX":"FFF9ED","RGB":"rgb(203, 197, 185)"},
{"COLOR":"Asphalt", "HEX":"353146","RGB":"rgb(53, 49, 70)"},
{"COLOR":"Autumn", "HEX":"c85313","RGB":"rgb(200, 83, 19)"},
{"COLOR":"Heather Deep Teal", "HEX":"487485","RGB":"rgb(72, 116, 133)"},
{"COLOR":"Kelly", "HEX":"1a9462","RGB":"rgb(26, 148, 98)"},
{"COLOR":"Leaf", "HEX":"548655","RGB":"rgb(84, 134, 85)"},
{"COLOR":"Burnt Orange", "HEX":"d76735","RGB":"rgb(215, 103, 53)"},
{"COLOR":"Mauve", "HEX":"bf6e6e","RGB":"rgb(191, 110, 110)"},
{"COLOR":"Heather Orange", "HEX":"D96E51","RGB":"rgb(217, 110, 81)"},
{"COLOR":"Aqua", "HEX":"5191bd","RGB":"rgb(81, 145, 189)"},
{"COLOR":"Steel Blue", "HEX":"668ea7","RGB":"rgb(102, 142, 167)"},
{"COLOR":"Navy", "HEX":"232735","RGB":"rgb(35, 39, 53)"},
{"COLOR":"Light Steel", "HEX":"c2c2c0","RGB":"rgb(194, 194, 192)"},
{"COLOR":"Heather Raspberry", "HEX":"FC667D","RGB":"rgb(252, 102, 125)"},
{"COLOR":"Heather Orchid", "HEX":"b17e85","RGB":"rgb(177, 126, 133)"},
{"COLOR":"Heather True Royal", "HEX":"5F98E6","RGB":"rgb(95, 152, 230)"},
{"COLOR":"Ocean Blue", "HEX":"619dc1","RGB":"rgb(97, 157, 193)"},
{"COLOR":"Heather Blue", "HEX":"86A9C9","RGB":"rgb(134, 169, 201)"},
{"COLOR":"Mustard", "HEX":"eda027","RGB":"rgb(237, 160, 39)"},
{"COLOR":"Athletic Heather", "HEX":"a8abb2","RGB":"rgb(168, 171, 178)"},
{"COLOR":"Light Blue", "HEX":"94afca","RGB":"rgb(148, 175, 202)"},
{"COLOR":"Gold", "HEX":"f8a933","RGB":"rgb(248, 169, 51)"},
{"COLOR":"Heather Prism Lilac", "HEX":"d9b0cb","RGB":"rgb(217, 176, 203)"},
{"COLOR":"Heather Prism Dusty Blue", "HEX":"a1c3b8","RGB":"rgb(161, 195, 184)"},
{"COLOR":"Heather Mint", "HEX":"72D3B4","RGB":"rgb(114, 211, 180)"},
{"COLOR":"Lilac", "HEX":"f4b0c8","RGB":"rgb(244, 176, 200)"},
{"COLOR":"Soft Cream", "HEX":"d3c4ad","RGB":"rgb(211, 196, 173)"},
{"COLOR":"Heather Prism Mint", "HEX":"aad4b7","RGB":"rgb(170, 212, 183)"},
{"COLOR":"Heather Prism Peach", "HEX":"eec1b3","RGB":"rgb(238, 193, 179)"},
{"COLOR":"Heather Dust", "HEX":"e0cbb7","RGB":"rgb(224, 203, 183)"},
{"COLOR":"Light Pink","HEX":"f1c5d4","RGB":"rgb(241, 197, 212)"},
{"COLOR":"Pink", "HEX":"fcd1db","RGB":"rgb(252, 209, 219)"},
{"COLOR":"Heather Prism Ice Blue", "HEX":"c0e3e4","RGB":"rgb(192, 227, 228)"},
{"COLOR":"Silver", "HEX":"e3e3dd","RGB":"rgb(227, 227, 221)"},
{"COLOR":"Yellow", "HEX":"fbf271","RGB":"rgb(251, 242, 113)"},
{"COLOR":"Irish Green","HEX":"1e8043","RGB":"rgb(30, 128, 67)"},
{"COLOR":"Indigo Blue","HEX":"4d718f","RGB":"rgb(77, 113, 143)"},
{"COLOR":"Sport Grey","HEX":"9b969c","RGB":"rgb(155, 150, 156)"},
{"COLOR":"Charcoal Heather", "HEX":"3A3A38","RGB":"rgb(58, 58, 56)"},
{"COLOR":"Carbon Grey", "HEX":"B2AFAA","RGB":"rgb(178, 175, 170)"},
{"COLOR":"Ash", "HEX":"EEF0F2","RGB":"rgb(238, 240, 242)"},
{"COLOR":"Sand", "HEX":"d4cab4","RGB":"rgb(212, 202, 180)"},
{"COLOR":"White", "HEX":"e2e3de","RGB":"rgb(226, 227, 222)"}];

function getHex(color){
  for(var i=0; i<COLOR_CODES.length; i++){
    if(COLOR_CODES[i].COLOR.toLowerCase().trim() == color.toLowerCase().trim()) return COLOR_CODES[i].HEX;
  }
}

function getColor(hex){
  for(var i=0; i<COLOR_CODES.length; i++){
    if(COLOR_CODES[i].HEX.toLowerCase().trim() == hex.toLowerCase().trim()) return COLOR_CODES[i].COLOR;
  }
}

function getRGB(color){
  for(var i=0; i<COLOR_CODES.length; i++){
    if(COLOR_CODES[i].COLOR.toLowerCase().trim() == color.toLowerCase().trim()) return COLOR_CODES[i].RGB;
  }
}
