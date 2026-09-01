"use strict";

/* ============================================================
   Seed data: the known "Camino Português da Costa" route.
   Editors can add more stops (to this route or new ones) later
   through the page itself — this is just the starting point.
   ============================================================ */
var SEED = {"towns": [{"id": "porto", "name": "Porto", "lat": 41.1579, "lng": -8.6291, "order": 1}, {"id": "matosinhos", "name": "Matosinhos", "lat": 41.1795, "lng": -8.6871, "order": 2}, {"id": "povoa", "name": "P\u00f3voa de Varzim", "lat": 41.3806, "lng": -8.7638, "order": 3}, {"id": "esposende", "name": "Esposende", "lat": 41.5361, "lng": -8.7811, "order": 4}, {"id": "viana", "name": "Viana do Castelo", "lat": 41.6947, "lng": -8.8323, "order": 5}, {"id": "ancora", "name": "Vila Praia de \u00c2ncora", "lat": 41.8236, "lng": -8.8683, "order": 6}, {"id": "caminha", "name": "Caminha", "lat": 41.8747, "lng": -8.8352, "order": 7}, {"id": "aguarda", "name": "A Guarda", "lat": 41.9022, "lng": -8.8735, "order": 8}, {"id": "baiona", "name": "Baiona", "lat": 42.1167, "lng": -8.85, "order": 9}, {"id": "vigo", "name": "Vigo", "lat": 42.2406, "lng": -8.7207, "order": 10}, {"id": "arcade", "name": "Arcade", "lat": 42.2842, "lng": -8.6167, "order": 11}, {"id": "pontevedra", "name": "Pontevedra", "lat": 42.431, "lng": -8.6444, "order": 12}, {"id": "caldas", "name": "Caldas de Reis", "lat": 42.6022, "lng": -8.6417, "order": 13}, {"id": "padron", "name": "Padr\u00f3n", "lat": 42.7422, "lng": -8.6564, "order": 14}, {"id": "santiago", "name": "Santiago de Compostela", "lat": 42.8805, "lng": -8.5456, "order": 15}], "legs": [{"from": "porto", "to": "matosinhos", "kind": "coastal", "km": 2, "path": [[41.1579, -8.6291], [41.159491, -8.68578], [41.1795, -8.6871]]}, {"from": "matosinhos", "to": "povoa", "kind": "coastal", "km": 27, "path": [[41.1795, -8.6871], [41.221503, -8.718373], [41.249661, -8.737172], [41.262926, -8.732289], [41.274075, -8.734609], [41.28498, -8.740061], [41.297431, -8.744618], [41.328111, -8.744456], [41.337795, -8.749135], [41.34054, -8.756132], [41.350898, -8.760325], [41.361314, -8.764027], [41.3806, -8.7638]]}, {"from": "povoa", "to": "esposende", "kind": "coastal", "km": 22, "path": [[41.3806, -8.7638], [41.393866, -8.783803], [41.406109, -8.783773], [41.434878, -8.785564], [41.468338, -8.774849], [41.491067, -8.78647], [41.511798, -8.78826], [41.5361, -8.7811]]}, {"from": "esposende", "to": "viana", "kind": "coastal", "km": 24, "path": [[41.5361, -8.7811], [41.542553, -8.79542], [41.572943, -8.808339], [41.595404, -8.812856], [41.611884, -8.819488], [41.630097, -8.820449], [41.648157, -8.828603], [41.671586, -8.830511], [41.682807, -8.827056], [41.689276, -8.804677], [41.696967, -8.743276], [41.703111, -8.725942], [41.711859, -8.710032], [41.721991, -8.696156], [41.696967, -8.806874], [41.6947, -8.8323]]}, {"from": "viana", "to": "ancora", "kind": "coastal", "km": 19, "path": [[41.6947, -8.8323], [41.695787, -8.842885], [41.704368, -8.861113], [41.736862, -8.880306], [41.765533, -8.880317], [41.8236, -8.8683]]}, {"from": "ancora", "to": "caminha", "kind": "coastal", "km": 10, "path": [[41.8236, -8.8683], [41.839016, -8.878896], [41.849555, -8.874745], [41.859117, -8.867502], [41.903306, -8.79662], [41.931952, -8.762766], [41.96898, -8.750803], [41.952582, -8.761952], [41.937161, -8.777089], [41.925686, -8.7954], [41.92121, -8.815989], [41.913967, -8.832834], [41.8747, -8.8352]]}, {"from": "caminha", "to": "aguarda", "kind": "ferry", "km": 1.5, "path": [[41.8747, -8.8352], [41.9022, -8.8735]]}, {"from": "aguarda", "to": "baiona", "kind": "coastal", "km": 30, "path": [[41.9022, -8.8735], [42.101752, -8.89859], [42.119086, -8.895497], [42.126044, -8.884592], [42.1167, -8.85]]}, {"from": "baiona", "to": "vigo", "kind": "coastal", "km": 26, "path": [[42.1167, -8.85], [42.13052, -8.826527], [42.139716, -8.819081], [42.14761, -8.82372], [42.154446, -8.842763], [42.160834, -8.846995], [42.164293, -8.84203], [42.174506, -8.815989], [42.178697, -8.813466], [42.188137, -8.811025], [42.197496, -8.805776], [42.201728, -8.795237], [42.204535, -8.790639], [42.222235, -8.771962], [42.2406, -8.7207]]}, {"from": "vigo", "to": "arcade", "kind": "coastal", "km": 22, "path": [[42.2406, -8.7207], [42.256415, -8.706451], [42.258531, -8.701894], [42.280911, -8.669911], [42.286322, -8.652008], [42.2842, -8.6167]]}, {"from": "arcade", "to": "pontevedra", "kind": "coastal", "km": 11, "path": [[42.2842, -8.6167], [42.301947, -8.625152], [42.310207, -8.621653], [42.340806, -8.621653], [42.34748, -8.622711], [42.348334, -8.626454], [42.346381, -8.634755], [42.335598, -8.649892], [42.316799, -8.660756], [42.299018, -8.674794], [42.291164, -8.699574], [42.287584, -8.719838], [42.268988, -8.773915], [42.260077, -8.784983], [42.258246, -8.795766], [42.260972, -8.848297], [42.256415, -8.867502], [42.268988, -8.863637], [42.291083, -8.853424], [42.304836, -8.853261], [42.304836, -8.846995], [42.28913, -8.832997], [42.296698, -8.827219], [42.329047, -8.826527], [42.337226, -8.828521], [42.34162, -8.830719], [42.344143, -8.82726], [42.346381, -8.812856], [42.340155, -8.776926], [42.342719, -8.771962], [42.355699, -8.764638], [42.388739, -8.726877], [42.400377, -8.709828], [42.416449, -8.676869], [42.426907, -8.662506], [42.431, -8.6444]]}, {"from": "pontevedra", "to": "caldas", "kind": "inland", "km": 24, "path": [[42.431, -8.6444], [42.43382995605468, -8.643343627929687], [42.4373271484375, -8.642033398437498], [42.44140881347656, -8.640501391601562], [42.445992187499996, -8.6387796875], [42.45099450683593, -8.636900366210938], [42.456333007812496, -8.6348955078125], [42.46192492675781, -8.632797192382812], [42.4676875, -8.630637499999999], [42.47353796386719, -8.628448510742189], [42.4793935546875, -8.6262623046875], [42.48517150878906, -8.624110961914063], [42.4907890625, -8.622026562500002], [42.496163452148444, -8.620041186523439], [42.501211914062495, -8.618186914062502], [42.50585168457032, -8.616495825195317], [42.51, -8.615], [42.51374230957031, -8.61356317138672], [42.5172369140625, -8.61204833984375], [42.520510327148436, -8.610486486816406], [42.52358906250001, -8.608908593750002], [42.526499633789065, -8.607345642089845], [42.5292685546875, -8.605828613281252], [42.53192233886718, -8.604388488769532], [42.5344875, -8.60305625], [42.53699055175781, -8.601862878417966], [42.5394580078125, -8.600839355468748], [42.54191638183595, -8.600016662597655], [42.54439218750001, -8.599425781249998], [42.54691193847657, -8.599097692871092], [42.54950214843751, -8.599063378906248], [42.5521893310547, -8.599353820800781], [42.555, -8.6], [42.55797600097656, -8.60112529296875], [42.5611173828125, -8.602784374999999], [42.56438796386718, -8.604905175781251], [42.5677515625, -8.607415625], [42.571171997070316, -8.61024365234375], [42.5746130859375, -8.613317187499998], [42.578038647460936, -8.61656416015625], [42.581412500000006, -8.6199125], [42.58469846191406, -8.623290136718749], [42.5878603515625, -8.626624999999999], [42.59086198730469, -8.629845019531249], [42.5936671875, -8.632878124999998], [42.596239770507815, -8.635652246093748], [42.5985435546875, -8.638095312499997], [42.60054235839844, -8.640135253906248], [42.6022, -8.6417]]}, {"from": "caldas", "to": "padron", "kind": "inland", "km": 18, "path": [[42.6022, -8.6417], [42.60388891601563, -8.641066040039062], [42.605941015625, -8.6402291015625], [42.608315576171876, -8.639220971679688], [42.610971875000004, -8.638073437500001], [42.613869189453126, -8.636818286132813], [42.616966796875005, -8.635487304687501], [42.620223974609374, -8.634112280273436], [42.623599999999996, -8.632724999999999], [42.62705415039062, -8.631357250976563], [42.630545703124994, -8.630040820312498], [42.63403393554687, -8.628807495117188], [42.637478125, -8.6276890625], [42.640837548828124, -8.626717309570312], [42.644071484375, -8.625924023437502], [42.64713920898436, -8.625340991210939], [42.65, -8.625], [42.65269189453125, -8.624870788574219], [42.65528984375, -8.62489443359375], [42.65780849609375, -8.625059729003905], [42.6602625, -8.62535546875], [42.66266650390625, -8.625770446777343], [42.66503515625, -8.626293457031249], [42.667383105468744, -8.626913293457031], [42.669725, -8.62761875], [42.672075488281244, -8.62839862060547], [42.67444921875, -8.629241699218749], [42.67686083984375, -8.630136779785156], [42.67932499999999, -8.63107265625], [42.68185634765624, -8.632038122558592], [42.684469531249995, -8.63302197265625], [42.68717919921875, -8.63401300048828], [42.69, -8.635], [42.69302299804688, -8.63606357421875], [42.696298046875, -8.637275781249999], [42.69977797851562, -8.63861259765625], [42.703415625, -8.64005], [42.707163818359376, -8.64156396484375], [42.710975390625, -8.64313046875], [42.71480317382812, -8.64472548828125], [42.718599999999995, -8.646325], [42.72231870117187, -8.64790498046875], [42.725912109374995, -8.64944140625], [42.72933305664063, -8.65091025390625], [42.732534375, -8.6522875], [42.73546889648437, -8.65354912109375], [42.738089453125, -8.654671093749998], [42.74034887695313, -8.655629394531251], [42.7422, -8.6564]]}, {"from": "padron", "to": "santiago", "kind": "inland", "km": 24, "path": [[42.7422, -8.6564], [42.74386145019531, -8.653868530273437], [42.7458384765625, -8.650779492187498], [42.74810134277343, -8.647197192382812], [42.7506203125, -8.6431859375], [42.75336564941406, -8.63881003417969], [42.7563076171875, -8.6341337890625], [42.75941647949218, -8.629221508789062], [42.76266249999999, -8.6241375], [42.76601594238281, -8.618946069335939], [42.769447070312495, -8.613711523437502], [42.772926147460936, -8.608498168945314], [42.7764234375, -8.603370312500003], [42.77990920410156, -8.59839226074219], [42.7833537109375, -8.593628320312503], [42.78672722167969, -8.589142797851565], [42.79, -8.585], [42.79327545166015, -8.580982788085938], [42.79666376953125, -8.576857617187502], [42.80014539794922, -8.572664184570312], [42.803700781249994, -8.5684421875], [42.807310363769524, -8.564231323242186], [42.810954589843746, -8.5600712890625], [42.8146139038086, -8.556001782226563], [42.81826875, -8.5520625], [42.82189957275391, -8.548293139648438], [42.82548681640625, -8.5447333984375], [42.82901092529298, -8.541422973632812], [42.832452343750006, -8.5384015625], [42.83579151611328, -8.53570886230469], [42.83900888671875, -8.5333845703125], [42.84208489990235, -8.531468383789063], [42.845, -8.53], [42.8478193359375, -8.52906447753906], [42.85061328125, -8.5286783203125], [42.8533701171875, -8.528778393554688], [42.856078125, -8.5293015625], [42.8587255859375, -8.530184692382813], [42.861300781249994, -8.5313646484375], [42.863791992187494, -8.532778295898437], [42.8661875, -8.5343625], [42.8684755859375, -8.536054125976563], [42.87064453125, -8.537790039062498], [42.8726826171875, -8.539507104492186], [42.874578125000006, -8.5411421875], [42.8763193359375, -8.542632153320312], [42.87789453125, -8.543913867187499], [42.879291992187504, -8.544924194335936], [42.8805, -8.5456]]}]};

var MAP_STYLE = [
  {elementType:"geometry", stylers:[{color:"#efeae0"}]},
  {elementType:"labels.icon", stylers:[{visibility:"off"}]},
  {elementType:"labels.text.fill", stylers:[{color:"#5b675f"}]},
  {elementType:"labels.text.stroke", stylers:[{color:"#efeae0"}, {weight:3}]},
  {featureType:"administrative", elementType:"geometry", stylers:[{visibility:"off"}]},
  {featureType:"administrative.country", elementType:"geometry.stroke", stylers:[{visibility:"on"}, {color:"#c9c2ac"}]},
  {featureType:"administrative.land_parcel", stylers:[{visibility:"off"}]},
  {featureType:"landscape", elementType:"geometry", stylers:[{color:"#e6e0d2"}]},
  {featureType:"landscape.natural", elementType:"geometry", stylers:[{color:"#dad9bd"}]},
  {featureType:"poi", stylers:[{visibility:"off"}]},
  {featureType:"road", elementType:"geometry", stylers:[{color:"#e3dcc8"}]},
  {featureType:"road", elementType:"labels", stylers:[{visibility:"off"}]},
  {featureType:"road.highway", elementType:"geometry", stylers:[{color:"#d8cfb3"}]},
  {featureType:"road.arterial", elementType:"geometry", stylers:[{visibility:"simplified"}]},
  {featureType:"road.local", stylers:[{visibility:"off"}]},
  {featureType:"transit", stylers:[{visibility:"off"}]},
  {featureType:"water", elementType:"geometry", stylers:[{color:"#a9c0c4"}]},
  {featureType:"water", elementType:"labels", stylers:[{visibility:"off"}]}
];

/* ============================================================
   Firebase
   ============================================================ */
firebase.initializeApp(window.FIREBASE_CONFIG);
var auth = firebase.auth();
var db = firebase.firestore();
var storage = firebase.storage();

var currentUser = null;
var isEditor = false;
var editorsCache = null;

function refreshEditorStatus(){
  if(!currentUser){ isEditor = false; return applyEditorUI(); }
  db.collection("config").doc("editors").get().then(function(doc){
    var emails = (doc.exists && doc.data().emails) || [];
    editorsCache = emails;
    var mine = (currentUser.email||"").toLowerCase();
    isEditor = emails.some(function(e){ return String(e||"").toLowerCase() === mine; });
    if(!isEditor) console.warn("Not an editor. Signed in as:", currentUser.email, "| allowlist:", emails);
    applyEditorUI();
    // The 15 starting stops are only written once — and Firestore's rules
    // require an editor to do it. If nobody has ever signed in yet, this
    // is what actually plants that first data (harmless once it exists:
    // ensureSeedData() checks first and does nothing if the route is already there).
    if(isEditor) ensureSeedData();
  }).catch(function(){
    isEditor = false;
    applyEditorUI();
  });
}

var authBtn = document.getElementById("authBtn");
authBtn.addEventListener("click", function(){
  if(currentUser){
    auth.signOut();
  } else {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(function(err){
      showToast("Sign-in failed: " + (err && err.message || err));
    });
  }
});
auth.onAuthStateChanged(function(user){
  currentUser = user;
  if(user){
    authBtn.textContent = (user.displayName || (user.email||"").split("@")[0] || "Signed in");
    authBtn.title = "Signed in as " + (user.email||"") + " — click to sign out";
    authBtn.classList.add("signed-in");
  } else {
    authBtn.textContent = "Sign in";
    authBtn.title = "Sign in with Google";
    authBtn.classList.remove("signed-in");
  }
  refreshEditorStatus();
});

var addStopFab = document.getElementById("addStopFab");
function applyEditorUI(){
  addStopFab.hidden = !isEditor;
  document.getElementById("lbAddRow").hidden = !isEditor;
  renderLightboxGate();
}

/* ============================================================
   Toast
   ============================================================ */
var toastEl = document.getElementById("toast");
var toastTimer = null;
function showToast(msg, ms){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ toastEl.classList.remove("show"); }, ms || 3200);
}

/* ============================================================
   Routes / stops data (Firestore-backed, seeded on first run)
   ============================================================ */
var ROUTE_ID_DEFAULT = "camino-portugues-costa";
var routes = {};          // routeId -> {name, description}
var currentRouteId = ROUTE_ID_DEFAULT;
var towns = [];           // ordered stop docs of the current route
var legs = [];            // computed from towns (+ seed path geometry when available)
var stopUnsub = null;

var routeSwitch = document.getElementById("routeSwitch");
routeSwitch.addEventListener("change", function(){
  switchRoute(routeSwitch.value);
});

function ensureSeedData(){
  var routeRef = db.collection("routes").doc(ROUTE_ID_DEFAULT);
  routeRef.get().then(function(doc){
    if(doc.exists) return; // already seeded
    var batch = db.batch();
    batch.set(routeRef, {
      name: "Camino Português da Costa",
      description: "Porto → Santiago de Compostela, along the Atlantic coastal way.",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    SEED.towns.forEach(function(t){
      var stopRef = routeRef.collection("stops").doc(t.id);
      var legOut = SEED.legs.find(function(l){ return l.to === t.id; });
      batch.set(stopRef, {
        name: t.name,
        lat: t.lat,
        lng: t.lng,
        order: t.order,
        km: legOut ? legOut.km : null,
        kind: legOut ? legOut.kind : null,
        pathIn: legOut ? legOut.path : null,
        pathFromId: legOut ? legOut.from : null,
        addedBy: "seed",
        addedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
    batch.commit().then(function(){
      showToast("Camino route loaded — "+SEED.towns.length+" stops.");
    }).catch(function(err){
      console.warn("Seed failed:", err.message);
      if(currentUser) showDiag("Could not load the route: "+err.message+" (signed in as "+currentUser.email+")");
    });
  });
}

function listenRoutes(){
  db.collection("routes").onSnapshot(function(snap){
    routes = {};
    snap.forEach(function(doc){ routes[doc.id] = doc.data(); });
    var ids = Object.keys(routes);
    routeSwitch.hidden = ids.length < 2;   // nothing to switch between yet
    if(ids.length === 0) return; // seed hasn't landed yet
    routeSwitch.innerHTML = ids.map(function(id){
      return '<option value="'+id+'">'+escapeHtml(routes[id].name)+'</option>';
    }).join("");
    if(!routes[currentRouteId]) switchRoute(ids[0]);
    routeSwitch.value = currentRouteId;
    populateAddRouteSelect();
  }, function(err){ console.error(err); });
}

function switchRoute(routeId){
  currentRouteId = routeId;
  if(stopUnsub) stopUnsub();
  stopUnsub = db.collection("routes").doc(routeId).collection("stops")
    .orderBy("order")
    .onSnapshot(function(snap){
      towns = [];
      snap.forEach(function(doc){ towns.push(Object.assign({id:doc.id}, doc.data())); });
      rebuildLegsFromTowns();
      onRouteDataChanged();
      if(towns.length === 0){
        showDiag('No stops found in route "'+routeId+'". Sign in as an editor to load the Camino, or add a stop.');
      } else if(towns.length === 1){
        showDiag('Only 1 stop ("'+towns[0].name+'"). A route needs at least two stops before a line can be drawn.');
      } else {
        showDiag("");
      }
    }, function(err){
      console.error(err);
      showDiag("Could not read stops: "+err.message);
    });
}

function rebuildLegsFromTowns(){
  // A stop's curated `pathIn` (the real coastline-hugging polyline) is only
  // valid when its immediate predecessor is still the same town it was
  // curated from — otherwise (a new stop inserted between them, or a
  // reorder) fall back to a straight line between the two real points
  // rather than draw a path that starts from the wrong place.
  legs = [];
  for(var i=0;i<towns.length-1;i++){
    var a = towns[i], b = towns[i+1];
    var curated = b.pathIn && b.pathIn.length>1 && b.pathFromId === a.id;
    var path = curated ? b.pathIn : [[a.lat,a.lng],[b.lat,b.lng]];
    legs.push({ from:a.id, to:b.id, kind: b.kind || "coastal", km: curated ? b.km : null, path: path });
  }
}

/* ============================================================
   Google Maps
   ============================================================ */
var map, overlaySvg = document.getElementById("overlay");
var overlayProjection = null;

window.__gmapsReady = function(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat:41.1579, lng:-8.6291},
    zoom: 14,
    styles: MAP_STYLE,
    disableDefaultUI: true,
    gestureHandling: "none",
    backgroundColor: "#efeae0"
  });

  var overlayHelper = new google.maps.OverlayView();
  overlayHelper.onAdd = function(){};
  overlayHelper.onRemove = function(){};
  overlayHelper.draw = function(){
    overlayProjection = overlayHelper.getProjection();
    requestRender();
  };
  overlayHelper.setMap(map);

  // Belt and braces: if the projection is slow to arrive, keep nudging a redraw
  // until it exists, so the route can never be stuck invisible.
  google.maps.event.addListener(map, "idle", function(){
    if(!overlayProjection && overlayHelper.getProjection) overlayProjection = overlayHelper.getProjection();
    requestRender();
  });

  var eb = document.getElementById("exploreBtn");
  if(eb) eb.addEventListener("click", function(){ setExploreMode(!exploreMode); });

  initAutocomplete();

  ensureSeedData();
  listenRoutes();
  switchRoute(currentRouteId);
  requestRender();
};

function project(lat,lng){
  if(!overlayProjection) return {x:0,y:0};
  var p = overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(lat,lng));
  return {x:p.x, y:p.y};
}

/* ============================================================
   Overlay SVG: route lines + stop markers, redrawn every frame
   from the current map projection.
   ============================================================ */
var legEls = [];   // {refPath (DOM, invisible), visPath, ferryIcon, kind, from, to}
var stopEls = {};  // id -> group el

function rebuildOverlayDom(){
  overlaySvg.innerHTML = "";
  legEls = [];
  stopEls = {};

  legs.forEach(function(leg){
    var ref = document.createElementNS("http://www.w3.org/2000/svg","path");
    ref.style.display = "none";
    overlaySvg.appendChild(ref);

    var vis = document.createElementNS("http://www.w3.org/2000/svg","path");
    vis.setAttribute("class","leg-path"+(leg.kind==="ferry"?" ferry":""));
    overlaySvg.appendChild(vis);

    var ferryIcon = null;
    if(leg.kind === "ferry"){
      ferryIcon = document.createElementNS("http://www.w3.org/2000/svg","text");
      ferryIcon.setAttribute("class","ferry-icon");
      ferryIcon.textContent = "⛴";
      overlaySvg.appendChild(ferryIcon);
    }
    legEls.push({leg:leg, ref:ref, vis:vis, ferryIcon:ferryIcon});
  });

  towns.forEach(function(t){
    var g = document.createElementNS("http://www.w3.org/2000/svg","g");
    g.setAttribute("class","stop");

    var ringPhoto = document.createElementNS("http://www.w3.org/2000/svg","circle");
    ringPhoto.setAttribute("class","ring-photo"); ringPhoto.setAttribute("r","9.4");
    g.appendChild(ringPhoto);

    var halo = document.createElementNS("http://www.w3.org/2000/svg","circle");
    halo.setAttribute("class","halo"); halo.setAttribute("r","5.4");
    g.appendChild(halo);

    var dot = document.createElementNS("http://www.w3.org/2000/svg","circle");
    dot.setAttribute("class","dot"); dot.setAttribute("r","5.4");
    g.appendChild(dot);

    var label = document.createElementNS("http://www.w3.org/2000/svg","text");
    label.setAttribute("class","label");
    label.textContent = t.name;
    g.appendChild(label);

    g.addEventListener("click", function(){ openLightbox(t.id); });
    overlaySvg.appendChild(g);
    stopEls[t.id] = {g:g, ringPhoto:ringPhoto, halo:halo, dot:dot, label:label};
  });

  refreshPhotoRings();
}

function showDiag(msg){
  var d = document.getElementById("diag");
  if(!d) return;
  if(!msg){ d.hidden = true; d.textContent=""; return; }
  d.hidden = false; d.textContent = msg;
}

function updateIntroStats(){
  var box = document.getElementById("introStats");
  if(!box) return;
  var known = legs.filter(function(l){ return typeof l.km === "number" && l.km > 0; });
  var km = known.reduce(function(a,l){ return a + l.km; }, 0);
  var kmLabel = km ? (known.length < legs.length ? "~" : "") + Math.round(km) : "—";
  box.innerHTML =
    '<div class="stat"><b>' + kmLabel + '</b><span>Kilometres</span></div>' +
    '<div class="stat"><b>' + legs.length + '</b><span>Stages</span></div>' +
    '<div class="stat"><b>' + towns.length + '</b><span>Stops</span></div>';
}

function onRouteDataChanged(){
  updateIntroStats();
  rebuildOverlayDom();
  rebuildScrollFrames();
  requestRender();
}

/* ============================================================
   Scroll-driven camera + line-draw animation
   ============================================================ */
var wrap = document.getElementById("stageWrap");
var VH_PER_LEG = 1.35;
function layoutHeight(){ return Math.round(window.innerHeight * (VH_PER_LEG * Math.max(1,legs.length) + 1)); }
function applyLayoutHeight(){ wrap.style.height = layoutHeight()+"px"; }
window.addEventListener("resize", function(){ applyLayoutHeight(); rebuildScrollFrames(); });

var frames = [];
var totalT = 1;

function restFrame(t){ return {lat:t.lat, lng:t.lng, zoomPad:170}; }

function rebuildScrollFrames(){
  applyLayoutHeight();
  frames = [];
  if(towns.length === 0) return;
  frames.push({t:0, box: restFrame(towns[0])});
  legs.forEach(function(leg,i){
    var a = towns.find(function(x){return x.id===leg.from;});
    var b = towns.find(function(x){return x.id===leg.to;});
    if(!a || !b) return;
    var mid = {lat:(a.lat+b.lat)/2, lng:(a.lng+b.lng)/2};
    var travel = {lat:mid.lat, lng:mid.lng, bounds:[a,b], pad:0.6};
    frames.push({t:i+0.12, box: travel});
    frames.push({t:i+0.85, box: travel});
    frames.push({t:i+1.0, box: restFrame(b)});
  });
  totalT = legs.length || 1;
}

function lerp(a,b,f){ return a+(b-a)*f; }
function easeInOut(f){ return f<0.5 ? 2*f*f : 1-Math.pow(-2*f+2,2)/2; }

// Standard bounds->zoom formula for the Web Mercator projection Google Maps uses.
function latRad(lat){ var s = Math.sin(lat*Math.PI/180); return Math.log((1+s)/(1-s))/2; }
function zoomForBounds(south,west,north,east,mapPxW,mapPxH){
  var ZOOM_MAX = 18;
  var latFraction = (latRad(north)-latRad(south))/Math.PI;
  var lngDiff = east-west;
  var lngFraction = ((lngDiff<0? lngDiff+360:lngDiff))/360;
  function zoom(mapPx, worldPx, fraction){
    return Math.floor(Math.log(mapPx/worldPx/fraction)/Math.LN2);
  }
  var latZoom = zoom(mapPxH, 256, latFraction);
  var lngZoom = zoom(mapPxW, 256, lngFraction);
  return Math.max(2, Math.min(latZoom, lngZoom, ZOOM_MAX));
}

function stateAt(box){
  if(box.bounds){
    var pts = box.bounds;
    var lats = pts.map(function(p){return p.lat;});
    var lngs = pts.map(function(p){return p.lng;});
    var south=Math.min.apply(null,lats), north=Math.max.apply(null,lats);
    var west=Math.min.apply(null,lngs), east=Math.max.apply(null,lngs);
    var latPad=(north-south)*(box.pad||0.5)+0.02, lngPad=(east-west)*(box.pad||0.5)+0.02;
    var z = zoomForBounds(south-latPad, west-lngPad, north+latPad, east+lngPad, window.innerWidth, window.innerHeight);
    return {lat:box.lat, lng:box.lng, zoom:z};
  }
  // rest frame: fit a fixed pad (meters-ish, approximated in degrees) around a point
  var padDeg = 0.028;
  var z = zoomForBounds(box.lat-padDeg, box.lng-padDeg, box.lat+padDeg, box.lng+padDeg, window.innerWidth, window.innerHeight);
  return {lat:box.lat, lng:box.lng, zoom:z};
}

function boxAt(t){
  t = Math.max(0, Math.min(totalT, t));
  for(var i=0;i<frames.length-1;i++){
    var a=frames[i], b=frames[i+1];
    if(t>=a.t && t<=b.t){
      var span=(b.t-a.t)||1e-6;
      var f = easeInOut((t-a.t)/span);
      var sa = stateAt(a.box), sb = stateAt(b.box);
      return { lat: lerp(sa.lat,sb.lat,f), lng: lerp(sa.lng,sb.lng,f), zoom: lerp(sa.zoom,sb.zoom,f) };
    }
  }
  return stateAt(frames[frames.length-1].box);
}

var caption = document.getElementById("caption");
var capDay = document.getElementById("capDay");
var capRoute = document.getElementById("capRoute");
var capKm = document.getElementById("capKm");
var capHint = document.getElementById("capHint");
var topProgress = document.getElementById("topProgress");
var progFill = document.getElementById("progFill");

function samplePath(pathLatLng, fraction){
  // pathLatLng: array of [lat,lng]; returns a truncated array up to `fraction` of
  // total on-screen pixel length, using the live projection.
  var px = pathLatLng.map(function(p){ return project(p[0],p[1]); });
  var lens=[0];
  for(var i=1;i<px.length;i++){
    lens.push(lens[i-1] + Math.hypot(px[i].x-px[i-1].x, px[i].y-px[i-1].y));
  }
  var total = lens[lens.length-1];
  var target = total*fraction;
  if(target<=0) return [];
  var out=[px[0]];
  for(var i=1;i<px.length;i++){
    if(lens[i] <= target){ out.push(px[i]); }
    else {
      var segLen = lens[i]-lens[i-1];
      var f = segLen>0 ? (target-lens[i-1])/segLen : 0;
      out.push({x: lerp(px[i-1].x,px[i].x,f), y: lerp(px[i-1].y,px[i].y,f)});
      break;
    }
  }
  return out;
}

var exploreMode = false;
function setExploreMode(on){
  exploreMode = !!on;
  map.setOptions({gestureHandling: exploreMode ? "greedy" : "none"});
  document.body.classList.toggle("exploring", exploreMode);
  var b = document.getElementById("exploreBtn");
  if(b) b.textContent = exploreMode ? "Back to the walk" : "Explore map";
  if(!exploreMode) requestRender();
}

function render(){
  if(!map || towns.length===0) return;
  if(!overlayProjection){ overlaySvg.style.visibility = "hidden"; return; }
  overlaySvg.style.visibility = "";
  if(exploreMode) return;
  var rect = wrap.getBoundingClientRect();
  var total = rect.height - window.innerHeight;
  var scrolled = -rect.top;
  var overall = total>0 ? Math.max(0,Math.min(1, scrolled/total)) : 0;
  var t = overall*totalT;

  var state = boxAt(t);
  map.setCenter({lat:state.lat, lng:state.lng});
  map.setZoom(state.zoom);

  var legIdx = Math.min(legs.length-1, Math.floor(Math.max(0,t)));
  var legProgress = Math.max(0, Math.min(1, t-legIdx));
  if(t<=0){ legIdx=0; legProgress=0; }

  legEls.forEach(function(le, i){
    var p = i<legIdx ? 1 : (i===legIdx ? legProgress : 0);
    if(p<=0){
      le.vis.setAttribute("d","");
      le.vis.classList.remove("dashing","solid");
      if(le.ferryIcon) le.ferryIcon.classList.remove("show");
      return;
    }
    var pts = samplePath(le.leg.path, p);
    if(pts.length<2){ le.vis.setAttribute("d",""); return; }
    var d = "M "+pts.map(function(pt){return pt.x.toFixed(1)+","+pt.y.toFixed(1);}).join(" L ");
    le.vis.setAttribute("d", d);
    if(p>=0.999){ le.vis.classList.add("solid"); le.vis.classList.remove("dashing"); }
    else { le.vis.classList.add("dashing"); le.vis.classList.remove("solid"); }
    if(le.ferryIcon){
      le.ferryIcon.classList.toggle("show", p>0.15);
      var mid = pts[Math.floor(pts.length/2)];
      le.ferryIcon.setAttribute("x", mid.x); le.ferryIcon.setAttribute("y", mid.y-10);
    }
  });

  var reachedIdx = t<=0 ? 0 : (legProgress>=0.999 ? legIdx+1 : legIdx);
  towns.forEach(function(town,i){
    var el = stopEls[town.id]; if(!el) return;
    var p = project(town.lat, town.lng);
    el.g.setAttribute("transform","translate("+p.x.toFixed(1)+","+p.y.toFixed(1)+")");
    el.label.setAttribute("x", 11); el.label.setAttribute("y", 4.5);
    var isPulsing = i===reachedIdx;
    var isReached = i<=reachedIdx;
    el.g.classList.toggle("pulsing", isPulsing);
    el.g.classList.toggle("reached", isReached && !isPulsing);
    var toNext = legIdx<towns.length-1 && town.id===legs[legIdx].to && legProgress>0.05;
    el.g.classList.toggle("labeled", isReached || isPulsing || toNext);
  });

  var showCaption = t>0.02;
  caption.classList.toggle("show", showCaption);
  if(showCaption){
    var li = Math.min(legs.length-1, legIdx);
    var leg = legs[li];
    var fromT = towns.find(function(x){return x.id===leg.from;});
    var toT = towns.find(function(x){return x.id===leg.to;});
    if(fromT && toT){
      capDay.textContent = "Stage "+(li+2)+" / "+(towns.length+1);
      capRoute.innerHTML = escapeHtml(fromT.name)+'<span class="arrow">'+(leg.kind==="ferry"?"⛴":"→")+'</span>'+escapeHtml(toT.name);
      capKm.textContent = leg.kind==="ferry" ? "Ferry crossing" : (leg.km? leg.km+" km" : "");
      var n = photoCount(toT.id);
      capHint.innerHTML = n ? "<b>"+n+"</b> photo"+(n>1?"s":"")+" at this stop" : "Click the point to see photos";
    }
  } else {
    capDay.textContent = "Day 1";
    capRoute.textContent = towns[0].name;
    capKm.textContent = "The way begins";
    capHint.textContent = "Scroll to set off";
  }
  topProgress.textContent = String(Math.min(towns.length,(t<=0?1:legIdx+2))).padStart(2,"0")+" / "+String(towns.length).padStart(2,"0");
  progFill.style.width = (overall*100).toFixed(1)+"%";
}

var renderTicking = false;
function requestRender(){
  if(renderTicking) return;
  renderTicking = true;
  requestAnimationFrame(function(){ render(); renderTicking=false; });
}
window.addEventListener("scroll", requestRender, {passive:true});
window.addEventListener("resize", function(){ rebuildScrollFrames(); requestRender(); });

/* ============================================================
   Photos (Firestore metadata + Storage bytes)
   ============================================================ */
var photoCache = {}; // stopId -> [{id, url, addedBy}]
var photoListeners = {};

function photoCount(stopId){ return (photoCache[stopId]||[]).length; }
function refreshPhotoRings(){
  towns.forEach(function(t){
    var el = stopEls[t.id]; if(!el) return;
    el.g.classList.toggle("has-photos", photoCount(t.id)>0);
  });
}

function listenPhotos(stopId){
  if(photoListeners[stopId]) return;
  photoListeners[stopId] = db.collection("routes").doc(currentRouteId)
    .collection("stops").doc(stopId).collection("photos")
    .orderBy("addedAt")
    .onSnapshot(function(snap){
      var list=[];
      snap.forEach(function(doc){ list.push(Object.assign({id:doc.id}, doc.data())); });
      photoCache[stopId]=list;
      refreshPhotoRings();
      if(currentStop===stopId) renderGrid();
    });
}

/* ============================================================
   Lightbox
   ============================================================ */
var lbBackdrop = document.getElementById("lbBackdrop");
var lbTitle = document.getElementById("lbTitle");
var lbDay = document.getElementById("lbDay");
var lbMeta = document.getElementById("lbMeta");
var lbGrid = document.getElementById("lbGrid");
var lbEmpty = document.getElementById("lbEmpty");
var lbAddBtn = document.getElementById("lbAddBtn");
var lbMoveBtn = document.getElementById("lbMoveBtn");
var lbDeleteStopBtn = document.getElementById("lbDeleteStopBtn");
var lbNote = document.getElementById("lbNote");
var lbStatus = document.getElementById("lbStatus");
var lbFile = document.getElementById("lbFile");
var lbClose = document.getElementById("lbClose");
var currentStop = null;

function openLightbox(id){
  currentStop = id;
  var t = towns.find(function(x){return x.id===id;});
  if(!t) return;
  lbDay.textContent = t.order===1 ? "Start" : (t.order===towns.length ? "Finish" : "Stage "+t.order);
  lbTitle.textContent = t.name;
  lbMeta.textContent = t.lat.toFixed(4)+"°N, "+Math.abs(t.lng).toFixed(4)+"°W";
  listenPhotos(id);
  renderGrid();
  lbStatus.textContent = "";
  lbBackdrop.classList.add("open");
}
function closeLightbox(){ lbBackdrop.classList.remove("open"); currentStop=null; }
lbClose.addEventListener("click", closeLightbox);
lbBackdrop.addEventListener("click", function(e){ if(e.target===lbBackdrop) closeLightbox(); });

function renderLightboxGate(){
  lbNote.textContent = isEditor ? "" : "Sign in to add photos — only invited people can edit.";
}

function renderGrid(){
  var list = photoCache[currentStop]||[];
  lbGrid.innerHTML="";
  lbEmpty.hidden = list.length>0;
  list.forEach(function(p){
    var img = document.createElement("img");
    img.src = p.url; img.alt = "";
    img.addEventListener("click", function(){ openFull(p.url); });
    lbGrid.appendChild(img);
  });
  renderLightboxGate();
}

var fullBackdrop = document.getElementById("fullBackdrop");
var fullImg = document.getElementById("fullImg");
function openFull(src){ fullImg.src=src; fullBackdrop.classList.add("open"); }
fullBackdrop.addEventListener("click", function(){ fullBackdrop.classList.remove("open"); fullImg.src=""; });

lbAddBtn.addEventListener("click", function(){
  if(!isEditor){ showToast("Please sign in first."); return; }
  lbFile.click();
});

lbFile.addEventListener("change", function(e){
  var files = Array.prototype.slice.call(e.target.files||[]);
  if(!files.length) return;
  lbStatus.textContent = "Uploading…"; lbStatus.classList.remove("err");
  Promise.all(files.map(function(f){ return compressImage(f).then(function(blob){ return uploadPhoto(blob); }); }))
    .then(function(){ lbStatus.textContent = "Saved."; })
    .catch(function(err){
      console.error(err);
      lbStatus.textContent = "Could not save."; lbStatus.classList.add("err");
    })
    .finally(function(){ lbFile.value=""; });
});

function compressImage(file){
  return new Promise(function(resolve,reject){
    var img = new Image();
    var reader = new FileReader();
    reader.onload = function(){
      img.onload = function(){
        var MAXD = 1400;
        var w=img.width,h=img.height;
        var scale = Math.min(1, MAXD/Math.max(w,h));
        var cw=Math.round(w*scale), ch=Math.round(h*scale);
        var canvas=document.createElement("canvas");
        canvas.width=cw; canvas.height=ch;
        canvas.getContext("2d").drawImage(img,0,0,cw,ch);
        canvas.toBlob(function(blob){ resolve(blob); }, "image/jpeg", 0.75);
      };
      img.onerror=reject;
      img.src = reader.result;
    };
    reader.onerror=reject;
    reader.readAsDataURL(file);
  });
}

function uploadPhoto(blob){
  var id = db.collection("routes").doc().id; // client-generated id
  var path = "photos/"+currentRouteId+"/"+currentStop+"/"+id+".jpg";
  var ref = storage.ref().child(path);
  return ref.put(blob, {contentType:"image/jpeg"}).then(function(){
    return ref.getDownloadURL();
  }).then(function(url){
    return db.collection("routes").doc(currentRouteId).collection("stops").doc(currentStop)
      .collection("photos").doc(id).set({
        url: url,
        storagePath: path,
        addedBy: currentUser ? currentUser.email : "unknown",
        addedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
  });
}

lbDeleteStopBtn.addEventListener("click", function(){
  if(!isEditor || !currentStop) return;
  if(!confirm("Delete this stop? Photos stay stored but will no longer be linked to it.")) return;
  db.collection("routes").doc(currentRouteId).collection("stops").doc(currentStop).delete()
    .then(function(){ closeLightbox(); showToast("Stop deleted."); })
    .catch(function(err){ showToast("Error: "+err.message); });
});

lbMoveBtn.addEventListener("click", function(){
  if(!isEditor || !currentStop) return;
  var t = towns.find(function(x){return x.id===currentStop;});
  var input = prompt("New position (1 = start … "+towns.length+" = finish):", t.order);
  if(input===null) return;
  var pos = Math.max(1, Math.min(towns.length, parseInt(input,10)||t.order));
  var others = towns.filter(function(x){return x.id!==currentStop;});
  others.splice(pos-1, 0, t);
  var batch = db.batch();
  others.forEach(function(x, i){
    batch.update(db.collection("routes").doc(currentRouteId).collection("stops").doc(x.id), {order:i+1});
  });
  batch.commit().then(function(){ showToast("Order updated."); }).catch(function(err){ showToast("Error: "+err.message); });
});

/* ============================================================
   Add-stop panel (Places Autocomplete)
   ============================================================ */
var addBackdrop = document.getElementById("addBackdrop");
var addClose = document.getElementById("addClose");
var addRouteSelect = document.getElementById("addRouteSelect");
var addAfterSelect = document.getElementById("addAfterSelect");
var addConfirmBtn = document.getElementById("addConfirmBtn");
var addStatus = document.getElementById("addStatus");
var pendingPlace = null;

addStopFab.addEventListener("click", function(){
  if(!isEditor){ showToast("Please sign in first."); return; }
  pendingPlace = null;
  addConfirmBtn.disabled = true;
  addStatus.textContent = "";
  populateAddRouteSelect();
  populateAddAfterSelect();
  addBackdrop.classList.add("open");
});
addClose.addEventListener("click", function(){ addBackdrop.classList.remove("open"); });
addBackdrop.addEventListener("click", function(e){ if(e.target===addBackdrop) addBackdrop.classList.remove("open"); });
addRouteSelect.addEventListener("change", populateAddAfterSelect);

function populateAddRouteSelect(){
  var ids = Object.keys(routes);
  addRouteSelect.innerHTML = ids.map(function(id){
    return '<option value="'+id+'">'+escapeHtml(routes[id].name)+'</option>';
  }).join("");
  addRouteSelect.value = currentRouteId;
}
function populateAddAfterSelect(){
  var routeId = addRouteSelect.value || currentRouteId;
  var list = routeId===currentRouteId ? towns : [];
  addAfterSelect.innerHTML = ['<option value="__end">(at the end)</option>']
    .concat(list.map(function(t){ return '<option value="'+t.id+'">nach '+escapeHtml(t.name)+'</option>'; }))
    .join("");
  addAfterSelect.value = "__end";
}

function initAutocomplete(){
  // Uses the current PlaceAutocompleteElement (web component), not the
  // older google.maps.places.Autocomplete widget — new Google Cloud
  // projects are not reliably granted access to the legacy widget.
  var container = document.getElementById("addSearchContainer");
  var el = new google.maps.places.PlaceAutocompleteElement({});
  el.id = "addSearchInput";
  container.appendChild(el);

  el.addEventListener("gmp-select", function(evt){
    var prediction = evt.placePrediction;
    var place = prediction.toPlace();
    place.fetchFields({fields:["displayName","location","formattedAddress"]}).then(function(){
      pendingPlace = {
        name: place.displayName || place.formattedAddress,
        lat: place.location.lat(),
        lng: place.location.lng()
      };
      addConfirmBtn.disabled = false;
    }).catch(function(err){
      console.error(err);
      pendingPlace = null; addConfirmBtn.disabled = true;
    });
  });
}

addConfirmBtn.addEventListener("click", function(){
  if(!pendingPlace || !isEditor) return;
  var routeId = addRouteSelect.value || currentRouteId;
  var afterId = addAfterSelect.value;
  addStatus.textContent = "Saving…";
  var stopsRef = db.collection("routes").doc(routeId).collection("stops");
  stopsRef.orderBy("order").get().then(function(snap){
    var list = []; snap.forEach(function(d){ list.push(Object.assign({id:d.id}, d.data())); });
    var order;
    if(afterId==="__end" || list.length===0){
      order = list.length ? list[list.length-1].order+1 : 1;
    } else {
      var idx = list.findIndex(function(x){return x.id===afterId;});
      var prev = list[idx], next = list[idx+1];
      order = next ? (prev.order+next.order)/2 : prev.order+1;
    }
    return stopsRef.add({
      name: pendingPlace.name,
      lat: pendingPlace.lat,
      lng: pendingPlace.lng,
      order: order,
      km: null, kind: "coastal", pathIn: null,
      addedBy: currentUser ? currentUser.email : "unknown",
      addedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }).then(function(){
    addStatus.textContent = "Stop added.";
    setTimeout(function(){ addBackdrop.classList.remove("open"); }, 700);
  }).catch(function(err){
    addStatus.textContent = "Error: "+err.message;
  });
});

/* ============================================================
   utils
   ============================================================ */
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
}
