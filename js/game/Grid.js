var courtGrid = [
    {"id":0, "x" : 30, y: 30, "angle1":320, "guarded":[1], "angle2":75, "range1":[.8,.99], "range2":.25, "val":3, "showMake":true,    "xAdj":10, tail:0},
    {"id":1, "x" : 60, y: 30, "angle1":320, "guarded":[2], "angle2":75, "range1":[.8,.99], "range2":.2, "val":3, "showMake":true,     "xAdj":10, tail:0},
    {"id":2, "x" : 90, y: 30, "angle1":320, "guarded":[3], "angle2":75, "range1":[.8,.99], "range2":.2, "val":2, "showMake":true,     "xAdj":10, tail:0},
    {"id":3, "x" : 120, y: 30, "angle1":320,"guarded":[4],  "angle2":75, "range1":[.8,.99], "range2":.2, "val":2, "showMake":true,    "xAdj":10, tail:0},
    {"id":4, "x" : 150, y: 30, "angle1":320,"guarded":[5],  "angle2":75, "range1":[.9, 1.1], "range2":.2, "val":2, "showMake":true,   "xAdj":10, tail:0},
    {"id":5, "x" : 180, y: 30, "angle1":300,"guarded":[6],  "angle2":75, "range1":[.9, 1.1], "range2":.2, "val":2, "showMake":true,   "xAdj":10, tail:0},
    {"id":6, "x" : 210, y: 30, "angle1":300,"guarded":[7],  "angle2":75, "range1":[1.1, 1.2], "range2":.2, "val":2, "showMake":true,  "xAdj":10, tail:0},
    {"id":7, "x" : 240, y: 30, "angle1":300,"guarded":[8],  "angle2":75, "range1":[1.1, 1.2], "range2":.2, "val":2, "showMake":true,  "xAdj":10, tail:0},
    {"id":8, "x" : 270, y: 30, "angle1":280,"guarded":[9],  "angle2":75, "range1":[1.3, 1.5], "range2":.2, "val":2, "showMake":true,  "xAdj":10, tail:0},
    {"id":9, "x" : 300, y: 30, "angle1":280,"guarded":[10],  "angle2":75, "range1":[1.5, 1.7], "range2":.2, "val":2, "showMake":true,  "xAdj":10, tail:0},
    {"id":10, "x" : 330, y: 30, "angle1":270, "guarded":[11], "angle2":75, "range1":[1.8, 2], "range2":.2, "val":2, "showMake":true,   "xAdj":10, tail:0},
    {"id":11, "x" : 360, y: 30, "angle1":244, "guarded":[12], "angle2":75, "range1":[3.8, 5], "range2":.2, "val":2, "showMake":false,  "xAdj":10, tail:0},
    {"id":12, "x" : 390, y: 30, "angle1":70, "guarded":[11,13], "angle2":280, "range1":[1.2,1.4], "range2":.2, "val":2, "showMake":false, "xAdj":-48, tail:0},
    {"id":13, "x" : 420, y: 30, "angle1":70, "guarded":[12], "angle2":280, "range1":[1.7,1.7], "range2":.2, "val":2, "showMake":true,  "xAdj":-30, tail:0},
    {"id":14, "x" : 450, y: 30, "angle1":60, "guarded":[13], "angle2":300, "range1":[1.1,1.15], "range2":.2, "val":2, "showMake":true, "xAdj":-50, tail:0},
    {"id":15, "x" : 480, y: 30, "angle1":60, "guarded":[14], "angle2":300, "range1":[1.1,1.15], "range2":.2, "val":2, "showMake":true, "xAdj":-50, tail:0},
    {"id":16, "x" : 510, y: 30, "angle1":50, "guarded":[15], "angle2":320, "range1":[1.1,1.15], "range2":.2, "val":2, "showMake":true, "xAdj":-50, tail:0},
    {"id":17, "x" : 540, y: 30, "angle1":50, "guarded":[16], "angle2":320, "range1":[1.1,1.15], "range2":.2, "val":2, "showMake":true, "xAdj":-50, tail:0},
    {"id":18, "x" : 570, y: 30, "angle1":50, "guarded":[17], "angle2":320, "range1":[1.02,1.02], "range2":.2, "val":2, "showMake":true,"xAdj":-60, tail:0},
    {"id":19, "x" : 600, y: 30, "angle1":50, "guarded":[18], "angle2":320, "range1":[1.05,1.05], "range2":.2, "val":2, "showMake":true,"xAdj":-60, tail:0},
    {"id":20, "x" : 630, y: 30, "angle1":50, "guarded":[19], "angle2":320, "range1":[1.05,1.05], "range2":.2, "val":2, "showMake":true,"xAdj":-60, tail:0},
    {"id":21, "x" : 660, y: 30, "angle1":50, "guarded":[20], "angle2":320, "range1":[1.1,1.1], "range2":.2, "val":2, "showMake":true,  "xAdj":-63, tail:0},
    {"id":22, "x" : 690, y: 30, "angle1":50, "guarded":[21], "angle2":320, "range1":[1.1,1.1], "range2":.2, "val":2, "showMake":true,  "xAdj":-63, tail:0},
    {"id":23, "x" : 720, y: 30, "angle1":50, "guarded":[22], "angle2":320, "range1":[1.1,1.1], "range2":.2, "val":2, "showMake":true,  "xAdj":-63, tail:0},
    {"id":24, "x" : 30, y: 60, "angle1":320, "guarded":[25], "angle2":75, "range1":[.8,.99], "range2":.25, "val":3, "showMake":true,   "xAdj":10, tail:0},
    {"id":25, "x" : 60, y: 60, "angle1":320, "guarded":[26], "angle2":75, "range1":[.8,.99], "range2":.2, "val":3, "showMake":true,    "xAdj":10, tail:0},
    {"id":26, "x" : 90, y: 60, "angle1":320, "guarded":[27], "angle2":75, "range1":[.8,.99], "range2":.2, "val":2, "showMake":true,    "xAdj":13, tail:0},
    {"id":27, "x" : 120, y: 60, "angle1":320, "guarded":[28], "angle2":75, "range1":[.8,.99], "range2":.2, "val":2, "showMake":true,   "xAdj":13, tail:0},
    {"id":28, "x" : 150, y: 60, "angle1":320, "guarded":[29], "angle2":75, "range1":[1.1, 1.1], "range2":.2, "val":2, "showMake":true, "xAdj":14, tail:0},
    {"id":29, "x" : 180, y: 60, "angle1":320, "guarded":[30], "angle2":75, "range1":[1.2, 1.2], "range2":.2, "val":2, "showMake":true, "xAdj":10, tail:0},
    {"id":30, "x" : 210, y: 60, "angle1":320, "guarded":[31,7], "angle2":75, "range1":[1.2, 1.2], "range2":.2, "val":2, "showMake":true, "xAdj":10, tail:0},
    {"id":31, "x" : 240, y: 60, "angle1":290, "guarded":[32,8], "angle2":75, "range1":[1.5, 1.5], "range2":.2, "val":2, "showMake":true, "xAdj":20, tail:0},
    {"id":32, "x" : 270, y: 60, "angle1":290, "guarded":[33,9], "angle2":75, "range1":[1.5, 1.5], "range2":.2, "val":2, "showMake":true, "xAdj":22, tail:0},
    {"id":33, "x" : 300, y: 60, "angle1":290, "guarded":[34,10], "angle2":75, "range1":[1.7, 1.7], "range2":.2, "val":2, "showMake":true, "xAdj":22, tail:0},
    {"id":34, "x" : 330, y: 60, "angle1":290, "guarded":[35,11], "angle2":75, "range1":[2.6, 2.6], "range2":.2, "val":2, "showMake":true, "xAdj":16, tail:0},
    {"id":35, "x" : 360, y: 60, "angle1":336, "guarded":[36,12], "angle2":75, "range1":[8, 8], "range2":.2, "val":2, "showMake":false,    "xAdj":-5, tail:0},
    {"id":36, "x" : 400, y: 60, "angle1":70, "guarded":[11,12,13], "angle2":290, "range1":[4, 4], "range2":.2, "val":2, "showMake":true,     "xAdj":-26, tail:0},
    {"id":37, "x" : 420, y: 60, "angle1":70, "guarded":[12,13], "angle2":290, "range1":[3.3,3.3], "range2":.2, "val":2, "showMake":true,  "xAdj":-25, tail:0},
    {"id":38, "x" : 450, y: 60, "angle1":60, "guarded":[13,14], "angle2":300, "range1":[2.0,2.1], "range2":.2, "val":2, "showMake":true,  "xAdj":-26, tail:0},
    {"id":39, "x" : 480, y: 60, "angle1":60, "guarded":[14,15], "angle2":300, "range1":[2,2], "range2":.2, "val":2, "showMake":true,      "xAdj":-26, tail:0},
    {"id":40, "x" : 510, y: 60, "angle1":50, "guarded":[15,16], "angle2":320, "range1":[1.9,1.9], "range2":.2, "val":2, "showMake":true,  "xAdj":-18, tail:0},
    {"id":41, "x" : 540, y: 60, "angle1":50, "guarded":[16,17], "angle2":320, "range1":[1.7, 1.7], "range2":.2, "val":2, "showMake":true, "xAdj":-20, tail:0},
    {"id":42, "x" : 570, y: 60, "angle1":50, "guarded":[17,18], "angle2":320, "range1":[1.6,1.6], "range2":.2, "val":2, "showMake":true,  "xAdj":-24, tail:0},
    {"id":43, "x" : 600, y: 60, "angle1":50, "guarded":[18,19], "angle2":320, "range1":[1.5,1.5], "range2":.2, "val":2, "showMake":true,  "xAdj":-28, tail:0},
    {"id":44, "x" : 630, y: 60, "angle1":50, "guarded":[19,20], "angle2":320, "range1":[1.4,1.4], "range2":.2, "val":2, "showMake":true,  "xAdj":-32, tail:0},
    {"id":45, "x" : 660, y: 60, "angle1":50, "guarded":[20,21], "angle2":320, "range1":[1.4,1.4], "range2":.2, "val":2, "showMake":true,  "xAdj":-38, tail:0},
    {"id":46, "x" : 690, y: 60, "angle1":50, "guarded":[21,22], "angle2":320, "range1":[1.3,1.3], "range2":.2, "val":2, "showMake":true,  "xAdj":-44, tail:0},
    {"id":47, "x" : 720, y: 60, "angle1":50, "guarded":[22,23], "angle2":320, "range1":[1.25,1.25], "range2":.2, "val":2, "showMake":true,"xAdj":-50, tail:0},
    {"id":48, "x" : 30, y: 90, "angle1":320, "guarded":[49,25], "angle2":75, "range1":[1.3,1.3], "range2":0, "val":3, "showMake":true,    "xAdj":6, tail:0},
    {"id":49, "x" : 60, y: 90, "angle1":320, "guarded":[50,26], "angle2":75, "range1":[1.2,1.2], "range2":0, "val":3, "showMake":true,    "xAdj":10, tail:0},
    {"id":50, "x" : 90, y: 90, "angle1":320, "guarded":[51,27], "angle2":75, "range1":[1.15,1.15], "range2":.2, "val":2, "showMake":true, "xAdj":13, tail:0},
    {"id":51, "x" : 120, y: 90, "angle1":320, "guarded":[52,28], "angle2":75, "range1":[1.3,1.3], "range2":0, "val":2, "showMake":true,   "xAdj":11, tail:0},
    {"id":52, "x" : 150, y: 90, "angle1":320, "guarded":[53,29], "angle2":75, "range1":[1.3, 1.3], "range2":0, "val":2, "showMake":true,  "xAdj":12, tail:0},
    {"id":53, "x" : 180, y: 90, "angle1":320, "guarded":[54,30], "angle2":75, "range1":[1.5, 1.5], "range2":0, "val":2, "showMake":true,  "xAdj":4, tail:0},
    {"id":54, "x" : 210, y: 90, "angle1":320, "guarded":[55,31], "angle2":75, "range1":[1.6, 1.6], "range2":0, "val":2, "showMake":true,  "xAdj":4, tail:0},
    {"id":55, "x" : 240, y: 90, "angle1":310, "guarded":[56,32], "angle2":75, "range1":[1.7, 1.7], "range2":0, "val":2, "showMake":true,  "xAdj":10, tail:0},
    {"id":56, "x" : 270, y: 90, "angle1":310, "guarded":[57,33], "angle2":75, "range1":[1.82, 1.85], "range2":0, "val":2, "showMake":true,"xAdj":12, tail:0},
    {"id":57, "x" : 300, y: 90, "angle1":315, "guarded":[58,34], "angle2":75, "range1":[2.5, 2.6], "range2":0, "val":2, "showMake":true,  "xAdj":4, tail:0},
    {"id":58, "x" : 330, y: 90, "angle1":320, "guarded":[59,35], "angle2":75, "range1":[3.5, 3.5], "range2":0, "val":2, "showMake":true,  "xAdj":2, tail:0},
    {"id":59, "x" : 360, y: 90, "angle1":350, "guarded":[60,35], "angle2":75, "range1":[5, 5], "range2":0, "val":2, "showMake":false,     "xAdj":-5, tail:0},

    {"id":60, "x" : 400, y: 90, "angle1":40, "guarded":[36], "angle2":290, "range1":[4, 4], "range2":.2, "val":2, "showMake":true,     "xAdj":-18, tail:0},
    {"id":61, "x" : 420, y: 90, "angle1":50, "guarded":[36,37], "angle2":290, "range1":[3.3,3.3], "range2":.2, "val":2, "showMake":true,  "xAdj":-22, tail:0},
    {"id":62, "x" : 450, y: 90, "angle1":55, "guarded":[37,38], "angle2":300, "range1":[2.7,2.7], "range2":.2, "val":2, "showMake":true,  "xAdj":-24, tail:0},
    {"id":63, "x" : 480, y: 90, "angle1":60, "guarded":[38,39], "angle2":300, "range1":[2.5,2.5], "range2":.2, "val":2, "showMake":true,  "xAdj":-26, tail:0},
    {"id":64, "x" : 510, y: 90, "angle1":50, "guarded":[39,40], "angle2":320, "range1":[2.3,2.3], "range2":0, "val":2, "showMake":true,   "xAdj":-13, tail:0},
    {"id":65, "x" : 540, y: 90, "angle1":50, "guarded":[40,41], "angle2":320, "range1":[2,2], "range2":0, "val":2, "showMake":true,       "xAdj":-15, tail:0},
    {"id":66, "x" : 570, y: 90, "angle1":50, "guarded":[41,42], "angle2":320, "range1":[1.9,1.9], "range2":0, "val":2, "showMake":true,   "xAdj":-16, tail:0},
    {"id":67, "x" : 600, y: 90, "angle1":50, "guarded":[42,43], "angle2":320, "range1":[1.55,1.55], "range2":0, "val":2, "showMake":true, "xAdj":-24, tail:0},
    {"id":68, "x" : 630, y: 90, "angle1":50, "guarded":[43,44], "angle2":320, "range1":[1.45,1.45], "range2":0, "val":2, "showMake":true, "xAdj":-26, tail:0},
    {"id":69, "x" : 660, y: 90, "angle1":50, "guarded":[44,45], "angle2":320, "range1":[1.42,1.42], "range2":0, "val":2, "showMake":true, "xAdj":-26, tail:0},
    {"id":70, "x" : 690, y: 90, "angle1":50, "guarded":[45,46], "angle2":320, "range1":[1.33,1.33], "range2":.2, "val":3, "showMake":true,"xAdj":-48, tail:0},
    {"id":71, "x" : 720, y: 90, "angle1":50, "guarded":[46,47], "angle2":320, "range1":[1.3,1.3], "range2":.2, "val":3, "showMake":true,  "xAdj":-48, tail:0},

    {"id":72, "x" : 30, y: 120, "angle1":320, "guarded":[48,49,73], "angle2":75, "range1":[1.3,1.3], "range2":0, "val":3, "showMake":true,   "xAdj":6, tail:0},
    {"id":73, "x" : 60, y: 120, "angle1":320, "guarded":[49,50,74], "angle2":75, "range1":[1.3,1.3], "range2":0, "val":3, "showMake":true,   "xAdj":13.5, tail:0},
    {"id":74, "x" : 90, y: 120, "angle1":320, "guarded":[50,51,75], "angle2":75, "range1":[1.15,1.15], "range2":.2, "val":2,"showMake":true, "xAdj":16, tail:0},
    {"id":75, "x" : 120, y: 120, "angle1":320,"guarded":[51,52,76],  "angle2":75, "range1":[1.35,1.35], "range2":0, "val":2,"showMake":true, "xAdj":14, tail:0},
    {"id":76, "x" : 150, y: 120, "angle1":320,"guarded":[52,53,77],  "angle2":75, "range1":[1.5, 1.5], "range2":0, "val":2,"showMake":true,  "xAdj":8, tail:0},
    {"id":77, "x" : 180, y: 120, "angle1":320,"guarded":[53,54,78],  "angle2":75, "range1":[1.65, 1.65],"range2":0, "val":2,"showMake":true, "xAdj":4, tail:0},
    {"id":78, "x" : 210, y: 120, "angle1":320,"guarded":[54,55,79],  "angle2":75, "range1":[1.8, 1.8], "range2":0, "val":2,"showMake":true,  "xAdj":4, tail:0},
    {"id":79, "x" : 240, y: 120, "angle1":310,"guarded":[55,56,80],  "angle2":75, "range1":[1.95, 1.95],"range2":0, "val":2,"showMake":true, "xAdj":12, tail:0},
    {"id":80, "x" : 270, y: 120, "angle1":310,"guarded":[56,57,81],  "angle2":75, "range1":[2.1, 2.1], "range2":0, "val":2,"showMake":true,  "xAdj":16, tail:0},
    {"id":81, "x" : 300, y: 120, "angle1":325,"guarded":[57,58,82],  "angle2":75, "range1":[2.5, 2.6], "range2":0, "val":2,"showMake":true,  "xAdj":4, tail:0},
    {"id":82, "x" : 330, y: 120, "angle1":335,"guarded":[58,59,83],  "angle2":75, "range1":[3.5, 3.5], "range2":0, "val":2,"showMake":true,  "xAdj":-2, tail:0},
    {"id":83, "x" : 360, y: 120, "angle1":350,"guarded":[59,60,84],  "angle2":75, "range1":[4, 4], "range2":0, "val":2,"showMake":false,     "xAdj":-5, tail:0},

    {"id":84, "x" : 400, y: 120, "angle1":27, "guarded":[60], "angle2":290, "range1":[4, 4], "range2":.2, "val":2, "showMake":true,    "xAdj":-10, tail:0},
    {"id":85, "x" : 420, y: 120, "angle1":33, "guarded":[60,61], "angle2":290, "range1":[3.3,3.3], "range2":.2, "val":2, "showMake":true, "xAdj":-14, tail:0},
    {"id":86, "x" : 450, y: 120, "angle1":39, "guarded":[61,62], "angle2":300, "range1":[2.7,2.7], "range2":.2, "val":2, "showMake":true, "xAdj":-16, tail:0},
    {"id":87, "x" : 480, y: 120, "angle1":45, "guarded":[62,63], "angle2":300, "range1":[2.5,2.5], "range2":.2, "val":2, "showMake":true, "xAdj":-18, tail:0},
    {"id":88, "x" : 510, y: 120, "angle1":51, "guarded":[63,64], "angle2":320, "range1":[2.3,2.3], "range2":0, "val":2, "showMake":true,  "xAdj":-22, tail:0},
    {"id":89, "x" : 540, y: 120, "angle1":54, "guarded":[64,65], "angle2":320, "range1":[2,2], "range2":0, "val":2, "showMake":true,      "xAdj":-27, tail:0},
    {"id":90, "x" : 570, y: 120, "angle1":57, "guarded":[89,65,66], "angle2":320, "range1":[1.8,1.8], "range2":0, "val":2, "showMake":true,  "xAdj":-27, tail:0},
    {"id":91, "x" : 600, y: 120, "angle1":50, "guarded":[90,66,67], "angle2":340, "range1":[1.55,1.55], "range2":0, "val":2, "showMake":true,"xAdj":-28, tail:0},
    {"id":92, "x" : 630, y: 120, "angle1":50, "guarded":[91,67,68], "angle2":340, "range1":[1.45,1.45], "range2":0, "val":2, "showMake":true,"xAdj":-28, tail:0},
    {"id":93, "x" : 660, y: 120, "angle1":50, "guarded":[92,68,69], "angle2":340, "range1":[1.42,1.42], "range2":0, "val":2, "showMake":true,"xAdj":-29, tail:0},
    {"id":94, "x" : 690, y: 120, "angle1":50, "guarded":[69,70,93], "angle2":340, "range1":[1.33,1.33], "range2":0, "val":3, "showMake":true,"xAdj":-33, tail:0},
    {"id":95, "x" : 720, y: 120, "angle1":50, "guarded":[70,71,94], "angle2":340, "range1":[1.3,1.3], "range2":0, "val":3, "showMake":true,  "xAdj":-33, tail:0},

    {"id":96, "x" : 30, y: 150, "angle1":320, "guarded":[73,97], "angle2":75, "range1":[1.3,1.3],   "range2":0, "val":3, "showMake":true,"xAdj":12, tail:0},
    {"id":97, "x" : 60, y: 150, "angle1":320, "guarded":[74,98], "angle2":75, "range1":[1.35,1.35],"range2":0, "val":3, "showMake":true, "xAdj":13, tail:0},
    {"id":98, "x" : 90, y: 150, "angle1":320, "guarded":[75,99], "angle2":75, "range1":[1.35,1.35],"range2":0, "val":2, "showMake":true, "xAdj":16, tail:0},
    {"id":99, "x" : 120, y:150, "angle1":320, "guarded":[75,76,100], "angle2":75, "range1":[1.38,1.38],"range2":0, "val":2, "showMake":true, "xAdj":14, tail:0},
    {"id":100, "x" : 150, y:150, "angle1":320,"guarded":[76,77,101],  "angle2":75, "range1":[1.55, 1.55],"range2":0,"val":2, "showMake":true, "xAdj":10, tail:0},
    {"id":101, "x" : 180, y:150, "angle1":320,"guarded":[77,78,102],  "angle2":75, "range1":[1.7, 1.7],  "range2":0,"val":2, "showMake":true, "xAdj":6, tail:0},
    {"id":102, "x" : 210, y:150, "angle1":320,"guarded":[78,79,103],  "angle2":75, "range1":[1.85, 1.85],"range2":0,"val":2, "showMake":true, "xAdj":6, tail:0},
    {"id":103, "x" : 240, y:150, "angle1":320,"guarded":[79,80,104],  "angle2":75, "range1":[2.00, 2.00],"range2":0,"val":2, "showMake":true, "xAdj":12, tail:0},
    {"id":104, "x" : 270, y:150, "angle1":320,"guarded":[80,81,105],  "angle2":75, "range1":[2.1, 2.1],  "range2":0,"val":2, "showMake":true, "xAdj":13, tail:0},
    {"id":105, "x" : 300, y:150, "angle1":325,"guarded":[81,82,106],  "angle2":75, "range1":[2.5, 2.6],  "range2":0,"val":2, "showMake":true, "xAdj":8, tail:0},
    {"id":106, "x" : 330, y:150, "angle1":340,"guarded":[82,83,107],  "angle2":75, "range1":[3.5, 3.5], "range2":0,"val":2, "showMake":false, "xAdj":-2, tail:0},
    {"id":107, "x" : 360, y:150, "angle1":355,"guarded":[83],  "angle2":75, "range1":[2.8,2.8], "range2":0,"val":2, "showMake":false,  "xAdj":-5, tail:0},

    {"id":108, "x" : 400, y: 150, "angle1":15, "guarded":[84,85], "angle2":290, "range1":[3.5, 3.5], "range2":.2, "val":2, "showMake":true, "xAdj":-5, tail:0},
    {"id":109, "x" : 420, y: 150, "angle1":23, "guarded":[85,86], "angle2":290, "range1":[3.3,3.3], "range2":.2, "val":2, "showMake":true, "xAdj":-8, tail:0},
    {"id":110, "x" : 450, y: 150, "angle1":31, "guarded":[85,86], "angle2":300, "range1":[2.7,2.7], "range2":.2, "val":2, "showMake":true, "xAdj":-11, tail:0},
    {"id":111, "x" : 480, y: 150, "angle1":39, "guarded":[86,87], "angle2":300, "range1":[2.5,2.5], "range2":.2, "val":2, "showMake":true, "xAdj":-17, tail:0},
    {"id":112, "x" : 510, y: 150, "angle1":45, "guarded":[87,88], "angle2":320, "range1":[2.3,2.3], "range2":0, "val":2, "showMake":true, "xAdj":-22, tail:0},
    {"id":113, "x" : 540, y: 150, "angle1":51, "guarded":[88,89,112], "angle2":320, "range1":[2.1,2.1], "range2":0, "val":2, "showMake":true, "xAdj":-27, tail:0},
    {"id":114, "x" : 570, y: 150, "angle1":49, "guarded":[89,90,113], "angle2":320, "range1":[1.8,1.8], "range2":0, "val":2, "showMake":true, "xAdj":-27, tail:-15},
    {"id":115, "x" : 600, y: 150, "angle1":50, "guarded":[90,91,114], "angle2":320, "range1":[1.63,1.63], "range2":0, "val":2, "showMake":true, "xAdj":-30, tail:-15},
    {"id":116, "x" : 630, y: 150, "angle1":50, "guarded":[91,92,115], "angle2":320, "range1":[1.55,1.55], "range2":0, "val":2, "showMake":true, "xAdj":-30, tail:-16},
    {"id":117, "x" : 660, y: 150, "angle1":50, "guarded":[92,93,116], "angle2":340, "range1":[1.5,1.5], "range2":0, "val":3, "showMake":true, "xAdj":-28, tail:-20},
    {"id":118, "x" : 690, y: 150, "angle1":50, "guarded":[93,94,117], "angle2":340, "range1":[1.45,1.45], "range2":0, "val":3, "showMake":true, "xAdj":-29, tail:-20},
    {"id":119, "x" : 720, y: 150, "angle1":50, "guarded":[94,95,118], "angle2":340, "range1":[1.43,1.43], "range2":0, "val":3, "showMake":true, "xAdj":-30, tail:-20},

    {"id":120, "x" : 30, y:180, "angle1":320, "guarded":[96,97,121], "angle2":75, "range1":[1.5,1.5],   "range2":0, "val":3, "showMake":true,"xAdj":7, tail:20},
    {"id":121, "x" : 60, y:180, "angle1":320, "guarded":[97,98,122], "angle2":75, "range1":[1.45,1.45],"range2":0, "val":3, "showMake":true, "xAdj":10, tail:20},
    {"id":122, "x" : 90, y:180, "angle1":320, "guarded":[98,99,123], "angle2":75, "range1":[1.42,1.42],"range2":0, "val":3, "showMake":true, "xAdj":13, tail:20},
    {"id":123, "x" : 120,y:180, "angle1":320, "guarded":[99,100,124], "angle2":75, "range1":[1.5,1.5],"range2":0, "val":3, "showMake":true, "xAdj":15, tail:20},
    {"id":124, "x" : 150, y:180, "angle1":320, "guarded":[100,101,125], "angle2":75, "range1":[1.6, 1.6],"range2":0,"val":3, "showMake":true, "xAdj":12, tail:15},
    {"id":125, "x" : 180, y:180, "angle1":320, "guarded":[101,102,126], "angle2":75, "range1":[1.7, 1.7],  "range2":0,"val":3, "showMake":true, "xAdj":12, tail:15},
    {"id":126, "x" : 210, y:180, "angle1":320, "guarded":[102,103,127], "angle2":75, "range1":[1.88, 1.88],"range2":0,"val":2, "showMake":true, "xAdj":12, tail:15},
    {"id":127, "x" : 240, y:180, "angle1":320, "guarded":[103,104,128], "angle2":75, "range1":[2.2, 2.2],"range2":0,"val":2, "showMake":true, "xAdj":10, tail:12},
    {"id":128, "x" : 270, y:180, "angle1":325, "guarded":[104,105,129], "angle2":75, "range1":[2.3, 2.3],  "range2":0,"val":2, "showMake":true, "xAdj":10, tail:15},
    {"id":129, "x" : 300, y:180, "angle1":330, "guarded":[105,106,130], "angle2":75, "range1":[2.5, 2.5],  "range2":0,"val":2, "showMake":true, "xAdj":8, tail:11},
    {"id":130, "x" : 330, y:180, "angle1":346, "guarded":[106,107,131], "angle2":75, "range1":[3.0, 3.0], "range2":0,"val":2, "showMake":false, "xAdj":-4, tail:7},
    {"id":131, "x" : 360, y:180, "angle1":358, "guarded":[107,108], "angle2":75, "range1":[2.5,2.5], "range2":0,"val":2, "showMake":false,  "xAdj":-7, tail:0},

    {"id":132, "x" : 400, y: 180, "angle1":10, "guarded":[108,123], "angle2":290, "range1":[3.1, 3.1], "range2":.2, "val":2, "showMake":true, "xAdj":-1, tail:0},
    {"id":133, "x" : 420, y: 180, "angle1":16, "guarded":[108,109], "angle2":290, "range1":[2.8,2.8], "range2":.2, "val":2, "showMake":true, "xAdj":-4, tail:-6},
    {"id":134, "x" : 450, y: 180, "angle1":22, "guarded":[109,110], "angle2":300, "range1":[2.6,2.6], "range2":.2, "val":2, "showMake":true, "xAdj":-5, tail:-5},
    {"id":135, "x" : 480, y: 180, "angle1":28, "guarded":[110,111], "angle2":300, "range1":[2.5,2.5], "range2":.2, "val":2, "showMake":true, "xAdj":-6, tail:-7},
    {"id":136, "x" : 510, y: 180, "angle1":34, "guarded":[111,112], "angle2":320, "range1":[2.3,2.3], "range2":0, "val":2, "showMake":true, "xAdj":-16, tail:-12},
    {"id":137, "x" : 540, y: 180, "angle1":40, "guarded":[112,113], "angle2":320, "range1":[2.2,2.2], "range2":0, "val":3, "showMake":true, "xAdj":-20, tail:-8},
    {"id":138, "x" : 570, y: 180, "angle1":46, "guarded":[113,114], "angle2":320, "range1":[2.0,2.0], "range2":0, "val":3, "showMake":true, "xAdj":-24, tail:-14},
    {"id":139, "x" : 600, y: 180, "angle1":50, "guarded":[114,115], "angle2":320, "range1":[1.8,1.8], "range2":0, "val":3, "showMake":true, "xAdj":-30, tail:-18},
    {"id":140, "x" : 630, y: 180, "angle1":45, "guarded":[115,116], "angle2":320, "range1":[1.6,1.6], "range2":0, "val":3, "showMake":true, "xAdj":-30, tail:-20},
    {"id":141, "x" : 660, y: 180, "angle1":45, "guarded":[116,117], "angle2":340, "range1":[1.5,1.5], "range2":0, "val":3, "showMake":true, "xAdj":-30, tail:-20},
    {"id":142, "x" : 690, y: 180, "angle1":45, "guarded":[117,118], "angle2":340, "range1":[1.5,1.5], "range2":0, "val":3, "showMake":true, "xAdj":-29, tail:-20},
    {"id":143, "x" : 720, y: 180, "angle1":45, "guarded":[118,119], "angle2":340, "range1":[1.48,1.48], "range2":0, "val":3, "showMake":true, "xAdj":-30, tail:-20},

    {"id":144, "x" : 30, y:210, "angle1":320, "guarded":[121], "angle2":75, "range1":[1.5,1.5],   "range2":0, "val":3, "showMake":true,"xAdj":10, tail:20},
    {"id":145, "x" : 60, y:210, "angle1":320, "guarded":[122,146], "angle2":75, "range1":[1.45,1.45],"range2":0, "val":3, "showMake":true, "xAdj":13, tail:20},
    {"id":146, "x" : 90, y:210, "angle1":320, "guarded":[123,147], "angle2":75, "range1":[1.5,1.5],"range2":0, "val":3, "showMake":true, "xAdj":16, tail:20},
    {"id":147, "x" : 120,y:210, "angle1":320, "guarded":[123,124,148], "angle2":75, "range1":[1.6, 1.6],"range2":0, "val":3, "showMake":true, "xAdj":15, tail:15},
    {"id":148, "x" : 150, y:210, "angle1":320, "guarded":[124,125,149], "angle2":75, "range1":[1.7, 1.7],"range2":0,"val":3, "showMake":true, "xAdj":16, tail:18},
    {"id":149, "x" : 180, y:210, "angle1":320, "guarded":[125,126,150], "angle2":75, "range1":[1.8, 1.8],  "range2":0,"val":3, "showMake":true, "xAdj":14, tail:12},
    {"id":150, "x" : 210, y:210, "angle1":320, "guarded":[126,127,151], "angle2":75, "range1":[2.0, 2.0],"range2":0,"val":3, "showMake":true, "xAdj":13, tail:12},
    {"id":151, "x" : 240, y:210, "angle1":325, "guarded":[127,128,152], "angle2":75, "range1":[2.2, 2.2],"range2":0,"val":3, "showMake":true, "xAdj":9, tail:12},
    {"id":152, "x" : 270, y:210, "angle1":330, "guarded":[128,129, 153], "angle2":75, "range1":[2.3, 2.3],  "range2":0,"val":3, "showMake":true, "xAdj":7, tail:12},
    {"id":153, "x" : 300, y:210, "angle1":340, "guarded":[129,130,154], "angle2":75, "range1":[2.5, 2.5],  "range2":0,"val":3, "showMake":true, "xAdj":0, tail:5},
    {"id":154, "x" : 330, y:210, "angle1":350, "guarded":[130,131,155], "angle2":75, "range1":[3.0, 3.0], "range2":0,"val":3, "showMake":false, "xAdj":-7, tail:7},
    {"id":155, "x" : 360, y:210, "angle1":360, "guarded":[131,132,156], "angle2":75, "range1":[2.5,2.5], "range2":0,"val":3, "showMake":false,  "xAdj":-9, tail:0},

    {"id":156, "x" : 400, y: 210, "angle1":10, "guarded":[132], "angle2":290, "range1":[3.1, 3.1], "range2":.2, "val":2, "showMake":true, "xAdj":-1, tail:0},
    {"id":157, "x" : 420, y: 210, "angle1":16, "guarded":[132,133], "angle2":290, "range1":[2.8,2.8], "range2":.2, "val":2, "showMake":true, "xAdj":-4, tail:-6},
    {"id":158, "x" : 450, y: 210, "angle1":22, "guarded":[133,134], "angle2":300, "range1":[2.6,2.6], "range2":.2, "val":2, "showMake":true, "xAdj":-7, tail:-5},
    {"id":159, "x" : 480, y: 210, "angle1":28, "guarded":[134,135], "angle2":300, "range1":[2.5,2.5], "range2":.2, "val":2, "showMake":true, "xAdj":-10, tail:-7},
    {"id":160, "x" : 510, y: 210, "angle1":34, "guarded":[135,136], "angle2":320, "range1":[2.3,2.3], "range2":0, "val":2, "showMake":true, "xAdj":-20, tail:-15},
    {"id":161, "x" : 540, y: 210, "angle1":38, "guarded":[136,137], "angle2":320, "range1":[2.2,2.2], "range2":0, "val":3, "showMake":true, "xAdj":-22, tail:-10},
    {"id":162, "x" : 570, y: 210, "angle1":40, "guarded":[138,139], "angle2":320, "range1":[2.0,2.0], "range2":0, "val":3, "showMake":true, "xAdj":-24, tail:-14},
    {"id":163, "x" : 600, y: 210, "angle1":50, "guarded":[139,140,162], "angle2":320, "range1":[1.8,1.8], "range2":0, "val":3, "showMake":true, "xAdj":-30, tail:-18},
    {"id":164, "x" : 630, y: 210, "angle1":45, "guarded":[140,141,163], "angle2":320, "range1":[1.7,1.7], "range2":0, "val":3, "showMake":true, "xAdj":-30, tail:-20},
    {"id":165, "x" : 660, y: 210, "angle1":45, "guarded":[141,142,164], "angle2":340, "range1":[1.65,1.65], "range2":0, "val":3, "showMake":true, "xAdj":-30, tail:-20},
    {"id":166, "x" : 690, y: 210, "angle1":45, "guarded":[142,143,165], "angle2":340, "range1":[1.5,1.5], "range2":0, "val":3, "showMake":true, "xAdj":-31, tail:-20},
    {"id":167, "x" : 720, y: 210, "angle1":45, "guarded":[143,144,166], "angle2":340, "range1":[1.5,1.5], "range2":0, "val":3, "showMake":true, "xAdj":-30, tail:-20},
]

var position_zones = [

    { "name": "left corner", "squares":[{"min":1, "max":3},{"min":25,"max":27}]},
    { "name": "left baseline", "squares":[{"min":4, "max":9},{"min":4, "max":9}]},
    { "name": "low post", "squares":[{"min":10, "max":15},{"min":34, "max":38}]},
    { "name": "left middle", "squares":[{"min":49, "max":55},{"min":73, "max":79}]},
    { "name": "left key", "squares":[{"min":56, "max":59},{"min":80, "max":83}]},
    { "name": "left perimeter","squares":[{"min":55, "max":56},{"min":79, "max":80},{"min":102,"max":104},{"min":127,"max":129}]},
    { "name": "deep left", "squares":[{"min":96, "max":100},{"min":120, "max":124},{"min":144, "max":150}]},
    { "name": "top of the key", "squares":[{"min":106, "max":110},{"min":130,"max":134},{"min":151, "max":161}]},
    { "name": "right corner","squares":[{"min":21, "max":23},{"min":45, "max":47}]},
    { "name": "right middle","squares":[{"min":65, "max":69},{"min":89, "max":93},{"min":113,"max":116}]},
     { "name": "right perimeter","squares":[{"min":63, "max":65},{"min":87, "max":89},{"min":110,"max":112}]},
     { "name": "deep right","squares":[{"min":70, "max":71},{"min":94, "max":95},{"min":117,"max":119},{"min":139,"max":143},{"min":163,"max":167}]},
     { "name": "three point range","squares":[{"min":0, "max":1},{"min":24, "max":25},{"min":48,"max":49},{"min":72,"max":73},{"min":72,"max":73},
        {"min":96,"max":99},{"min":120,"max":126},{"min":144,"max":167},{"min":138,"max":143},{"min":116,"max":119},
        {"min":94,"max":95},{"min":70,"max":71},{"min":46,"max":47},{"min":22,"max":23}]},
    { "name": "foul line","squares":[{"min":107, "max":109}]}

]

var position = [
    { "name" : "small forward", "abbr" : "sf", zones:[0,3,5,6,7,8,9,7,8,9,10,11,12]},
    { "name" : "point guard", "abbr" : "pg", zones:[6,7,8,9,3,11,12]},
    { "name" : "shooting guard", "abbr" : "sg", zones:[0,3,5,6,7,8,9,7,8,9,10,11,12]},
    { "name" : "power forward", "abbr" : "pf", zones:[1,2,3,4,5,9,10]},
    { "name" : "center", "abbr" : "c", zones:[1,2,4,10]}
]

var plays = {
    0: { "name" : "none"}
}

var Grid = function(){};

Grid.prototype = {

    occupied : [],

    getZoneByPosition: function(p){
        try{
            var n = this.getPositionNumber(p);            
            var objPosition = position[n];             
            var len = objPosition.zones.length - 1; 
            var q;
            if(len == 1){ q = 0;}
            else{ q = random(0, len);}               
            var randomZone = position_zones[q];
            var square_len = randomZone.squares.length-1;
            if(square_len == 0){ square_len = 1;}            
            var objSquare = random(0, square_len);
            var min = randomZone.squares[objSquare].min;
            var max = randomZone.squares[objSquare].max;
            var gridnum = random(min, max);
            if(inArray(gridnum, this.occupied)){ this.getZoneByPosition(p);}
            else this.occupied.push(gridnum);
        }
        catch(e){
            console.log("ERROR "+e);           
            console.dir("object position: "+objPosition.name);
            console.log("object position zones length: "+len);
            console.log("random 0, len: "+q);
            console.dir(randomZone);
            gridnum = 100;
        }
        //var grid = random(min, max); 
        //console.log(grid);       
        //console.dir(randomZone.zones);
        return courtGrid[gridnum];
    },

    getPositionNumber: function(p){
        var n = p;
        if(!Number.isInteger(p)){
            for(var i=0; i<position.length;i++){                
                if(position[i].name == p){
                    n = i;
                    break;
                }
            }
        }
        if(!Number.isInteger(n)){ n = 3;}
        return n;
    },

    
    getGuardSquare: function(gridSquare, player){        
        differential = 0;
        var n = random(0, 100); 
        if(n > player.guard_defense){
            differential = random(1,3);
        }        
        var guarded_array = gridSquare.guarded; 
        seed = 0;      
        if(guarded_array.length>0){
            seed = Math.floor(random(0, guarded_array.length-1));                                   
        }
        square = guarded_array[seed]; 
        if(square > 167){ square = 167};
        if(square < 0){ square = 0;}      
        return courtGrid[square+differential];
    },

    getSquareUnderBasket: function(){
        var near = [
            {cells:[11,12,13]},
            {cells:[35,36,37]}
        ];
        var row = random(0,2);
        cell = random(0, near[row].cells.length-1);        
        var grid = near[row].cells[cell];               
        return courtGrid[grid];
    },

    getSquareNearBasket: function(){
        var near = [
            {cells:[9,10,11,12,13,14,15]},
            {cells:[32,33,34,35,36,39,40,41]},
            {cells:[57,58,59,60,61,62,63]}
        ];
        var row = random(0,2);
        cell = random(0, near[row].cells.length-1);        
        var grid = near[row].cells[cell];               
        return courtGrid[grid];
    },

    endClass: function(){}
}

Grid = new Grid;


