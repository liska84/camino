"use strict";

/* ============================================================
   Seed data: the known "Camino Português da Costa" route.
   Editors can add more stops (to this route or new ones) later
   through the page itself — this is just the starting point.
   ============================================================ */
var SEED = { towns: [ {id:"porto", name:"Porto", lat:41.1579, lng:-8.6291, order:1} ], legs: [] };

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
  if(typeof refreshEditRow === "function") refreshEditRow();
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

function ensureSeedData(){
  if(!isEditor) return;
  var routeRef = db.collection("routes").doc(ROUTE_ID_DEFAULT);
  var portoRef = routeRef.collection("stops").doc("porto");
  // Idempotent: makes sure the route exists and Porto is stop #1,
  // without disturbing anything else already there.
  routeRef.set({
    name: "Camino Português da Costa",
    description: "Built up stop by stop from Porto."
  }, {merge:true}).then(function(){
    return portoRef.get();
  }).then(function(doc){
    if(doc.exists) return null;
    var p = SEED.towns[0];
    return portoRef.set({
      name: p.name, lat: p.lat, lng: p.lng, order: p.order,
      km: null, kind: "start", pathIn: null, pathFromId: null,
      addedBy: "start", addedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }).then(function(res){
    if(res !== null) showToast("Porto is on the map. Add your next stop.");
  }).catch(function(err){
    console.warn("Start setup failed:", err.message);
    showDiag("Could not set up Porto: "+err.message);
  });
}

function listenRoutes(){
  // Single fixed route for now — nothing to list or switch between.
  db.collection("routes").doc(ROUTE_ID_DEFAULT).onSnapshot(function(doc){
    routes = {}; if(doc.exists) routes[doc.id] = doc.data();
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
        showDiag(isEditor ? "Setting up Porto…" : "No stops yet.");
      } else if(towns.length === 1){
        showDiag("");
      } else {
        showDiag("");
      }
    }, function(err){
      console.error(err);
      showDiag("Could not read stops: "+err.message);
    });
}

// Firestore has no nested arrays, so polylines live as [{lat,lng},...].
// Accept either shape on read so old and new documents both work.
function decodePath(v){
  if(!Array.isArray(v) || v.length===0) return null;
  if(Array.isArray(v[0])) return v;
  if(typeof v[0]==="object" && v[0] && "lat" in v[0]){
    return v.map(function(p){ return [p.lat, p.lng]; });
  }
  return null;
}
function encodePath(pairs){
  if(!Array.isArray(pairs)) return null;
  return pairs.map(function(p){ return {lat:p[0], lng:p[1]}; });
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
    var stored = decodePath(b.pathIn);
    var curated = stored && stored.length>1 && b.pathFromId === a.id;
    var path = curated ? stored : [[a.lat,a.lng],[b.lat,b.lng]];
    legs.push({ from:a.id, to:b.id, kind: b.kind || "coastal", km: curated ? b.km : null, path: path });
  }
}

/* ============================================================
   Google Maps
   ============================================================ */
var map;

window.__gmapsReady = function(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat:41.1579, lng:-8.6291},
    zoom: 13,
    styles: MAP_STYLE,
    disableDefaultUI: true,
    gestureHandling: "none",
    backgroundColor: "#efeae0"
  });

  google.maps.event.addListener(map, "idle", requestRender);
  google.maps.event.addListener(map, "bounds_changed", requestRender);

  var eb = document.getElementById("exploreBtn");
  if(eb) eb.addEventListener("click", function(){ setExploreMode(!exploreMode); });

  initAutocomplete();

  ensureSeedData();
  listenRoutes();
  switchRoute(currentRouteId);
  requestRender();
};

/* Web-Mercator projection done by hand from the map's own centre and zoom.
   The SVG covers exactly the map's visible box, so screen position is
   world-pixel offset from centre. No OverlayView, no waiting for a draw
   callback that may never fire. */

/* ============================================================
   Overlay SVG: route lines + stop markers, redrawn every frame
   from the current map projection.
   ============================================================ */
/* Everything drawn on the map is now a real Google Maps object — Markers and
   Polylines anchored to latitude/longitude. Google keeps them glued to the
   ground through every pan, zoom and animation, so nothing can drift. */

var stopMarkers = {};   // stopId -> {dot, halo}
var legLines = [];      // {leg, line, style}
var pulseTimer = null, pulsePhase = 0, pulsingId = null;

var COL_ROUTE = "#C8932F", COL_FERRY = "#33484E",
    COL_PULSE = "#D3562A", COL_DONE = "#33484E", COL_CARD = "#F6F3EA";

function circleIcon(scale, fill, stroke, weight, opacity){
  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: scale,
    fillColor: fill,
    fillOpacity: opacity == null ? 1 : opacity,
    strokeColor: stroke || COL_CARD,
    strokeWeight: weight == null ? 1.6 : weight,
    strokeOpacity: opacity == null ? 1 : opacity
  };
}

function clearDrawing(){
  Object.keys(stopMarkers).forEach(function(id){
    stopMarkers[id].dot.setMap(null);
    stopMarkers[id].halo.setMap(null);
  });
  stopMarkers = {};
  legLines.forEach(function(l){ l.line.setMap(null); });
  legLines = [];
}

function rebuildOverlayDom(){
  if(!map) return;
  clearDrawing();

  legs.forEach(function(leg){
    legLines.push({
      leg: leg,
      style: null,
      line: new google.maps.Polyline({
        map: map, path: [], clickable: false, zIndex: 2,
        strokeColor: leg.kind === "ferry" ? COL_FERRY : COL_ROUTE,
        strokeOpacity: 0, strokeWeight: 3.4
      })
    });
  });

  towns.forEach(function(t){
    var pos = {lat: t.lat, lng: t.lng};
    var halo = new google.maps.Marker({
      map: map, position: pos, clickable: false, zIndex: 3,
      icon: circleIcon(5.4, COL_PULSE, COL_PULSE, 0, 0)
    });
    var dot = new google.maps.Marker({
      map: map, position: pos, zIndex: 4, title: t.name,
      icon: circleIcon(5.4, COL_PULSE),
      label: {text: t.name, className: "stop-label",
              color: "#26312F", fontFamily: "Work Sans, sans-serif",
              fontSize: "12px", fontWeight: "600"}
    });
    dot.addListener("click", function(){ openLightbox(t.id); });
    stopMarkers[t.id] = {dot: dot, halo: halo};
  });

  startPulse();
  refreshPhotoRings();
}

// The halo of the stop you have just reached breathes outward.
function startPulse(){
  if(pulseTimer) return;
  pulseTimer = setInterval(function(){
    pulsePhase = (pulsePhase + 0.03) % 1;
    var m = pulsingId && stopMarkers[pulsingId];
    if(!m) return;
    m.halo.setIcon(circleIcon(5.4 + pulsePhase * 15, COL_PULSE, COL_PULSE, 0,
                              0.6 * (1 - pulsePhase)));
  }, 50);
}

function setPulsing(id){
  if(pulsingId === id) return;
  if(pulsingId && stopMarkers[pulsingId]){
    stopMarkers[pulsingId].halo.setIcon(circleIcon(5.4, COL_PULSE, COL_PULSE, 0, 0));
  }
  pulsingId = id;
  pulsePhase = 0;
}

function refreshPhotoRings(){
  towns.forEach(function(t){
    var m = stopMarkers[t.id]; if(!m) return;
    m.dot.setOptions({title: t.name + (photoCount(t.id) ? " — photos" : "")});
  });
}

/* ---------- real walking routes, fetched once and stored ---------- */

var dirService = null, routingBusy = false;

function fillMissingWalkingPaths(){
  if(!isEditor || routingBusy || !map || !window.google) return;
  for(var i = 0; i < towns.length - 1; i++){
    var a = towns[i], b = towns[i+1];
    if(decodePath(b.pathIn) && b.pathFromId === a.id) continue;   // already have it
    routingBusy = true;
    if(!dirService) dirService = new google.maps.DirectionsService();
    (function(a, b){
      dirService.route({
        origin: {lat: a.lat, lng: a.lng},
        destination: {lat: b.lat, lng: b.lng},
        travelMode: google.maps.TravelMode.WALKING
      }, function(res, status){
        routingBusy = false;
        if(status !== "OK" || !res || !res.routes || !res.routes[0]){
          console.warn("Walking route " + a.name + " to " + b.name + ": " + status);
          showDiag("No walking route from " + a.name + " to " + b.name + " (" + status + ").");
          return;
        }
        var pts = res.routes[0].overview_path.map(function(pt){ return [pt.lat(), pt.lng()]; });
        var metres = res.routes[0].legs.reduce(function(sum, l){ return sum + l.distance.value; }, 0);
        stopRef(b.id).update({
          pathIn: encodePath(pts),
          pathFromId: a.id,
          km: Math.round(metres / 100) / 10
        }).catch(function(e){ console.warn("Could not store walking route:", e.message); });
      });
    })(a, b);
    return;   // one at a time; saving re-triggers this for the next gap
  }
}

/* Reveal a fraction of a leg by real ground distance. */
function haversine(a, b){
  var R = 6371000, toRad = Math.PI / 180;
  var dLat = (b[0]-a[0]) * toRad, dLng = (b[1]-a[1]) * toRad;
  var s = Math.sin(dLat/2)*Math.sin(dLat/2) +
          Math.cos(a[0]*toRad)*Math.cos(b[0]*toRad)*Math.sin(dLng/2)*Math.sin(dLng/2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

function slicePath(path, frac){
  if(!path || path.length < 2) return [];
  if(frac >= 1) return path.map(function(p){ return {lat:p[0], lng:p[1]}; });
  var segs = [], total = 0;
  for(var i = 0; i < path.length - 1; i++){
    var d = haversine(path[i], path[i+1]);
    segs.push(d); total += d;
  }
  if(total <= 0) return [];
  var want = total * frac, run = 0;
  var out = [{lat: path[0][0], lng: path[0][1]}];
  for(var k = 0; k < segs.length; k++){
    if(run + segs[k] >= want){
      var f = segs[k] > 0 ? (want - run) / segs[k] : 0;
      out.push({
        lat: path[k][0] + (path[k+1][0] - path[k][0]) * f,
        lng: path[k][1] + (path[k+1][1] - path[k][1]) * f
      });
      break;
    }
    run += segs[k];
    out.push({lat: path[k+1][0], lng: path[k+1][1]});
  }
  return out;
}

var DASH = [{icon:{path:"M 0,-1 0,1", strokeOpacity:1, strokeWeight:3.4, scale:2.4},
             offset:"0", repeat:"13px"}];

function showDiag(msg){
  var d = document.getElementById("diag");
  if(!d) return;
  if(!msg){ d.hidden = true; d.textContent=""; return; }
  d.hidden = false; d.textContent = msg;
}

function onRouteDataChanged(){
  fillMissingWalkingPaths();
  populateAddAfterSelect();
  if(currentStop && lbBackdrop.classList.contains("open")) refreshEditRow();
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
    var travel = {lat:mid.lat, lng:mid.lng, bounds:[a,b], pad:0.25};
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
  var padDeg = 0.018;
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


var exploreMode = false;
function setExploreMode(on){
  exploreMode = !!on;
  map.setOptions({gestureHandling: exploreMode ? "greedy" : "none"});
  document.body.classList.toggle("exploring", exploreMode);
  var b = document.getElementById("exploreBtn");
  if(b) b.textContent = exploreMode ? "Back to the walk" : "Explore map";
  requestRender();
}

function render(){
  if(!map || towns.length===0) return;
  var rect = wrap.getBoundingClientRect();
  var total = rect.height - window.innerHeight;
  var scrolled = -rect.top;
  var overall = total>0 ? Math.max(0,Math.min(1, scrolled/total)) : 0;
  var t = overall*totalT;

  // In explore mode the person drives the camera; we only keep the drawing
  // glued to whatever they pan or zoom to.
  if(!exploreMode){
    var state = boxAt(t);
    map.setCenter({lat:state.lat, lng:state.lng});
    map.setZoom(state.zoom);
  }

  var legIdx = Math.min(legs.length-1, Math.floor(Math.max(0,t)));
  var legProgress = Math.max(0, Math.min(1, t-legIdx));
  if(t<=0){ legIdx=0; legProgress=0; }

  legLines.forEach(function(ll, i){
    var p = i<legIdx ? 1 : (i===legIdx ? legProgress : 0);
    if(p<=0){ ll.line.setPath([]); return; }
    ll.line.setPath(slicePath(ll.leg.path, p));
    var want = p>=0.999 ? "solid" : "dash";
    if(ll.style !== want){
      ll.style = want;
      ll.line.setOptions(want === "solid"
        ? {strokeOpacity:1, icons:null}
        : {strokeOpacity:0, icons:DASH});
    }
  });

  var reachedIdx = t<=0 ? 0 : (legProgress>=0.999 ? legIdx+1 : legIdx);
  towns.forEach(function(town,i){
    var m = stopMarkers[town.id]; if(!m) return;
    var isPulsing = i===reachedIdx;
    var isReached = i<=reachedIdx;
    if(isPulsing) setPulsing(town.id);
    m.dot.setIcon(circleIcon(isPulsing ? 6.2 : 5.0,
                             isPulsing ? COL_PULSE : (isReached ? COL_DONE : "#A9AEA6")));
    var toNext = legIdx<towns.length-1 && town.id===legs[legIdx].to && legProgress>0.05;
    var showLabel = isReached || isPulsing || toNext;
    var lab = m.dot.getLabel() || {};
    if(!!lab.text !== showLabel){
      m.dot.setLabel(showLabel
        ? {text: town.name, className:"stop-label", color:"#26312F",
           fontFamily:"Work Sans, sans-serif", fontSize:"12px", fontWeight:"600"}
        : null);
    }
  });

  var showCaption = t>0.02;
  caption.classList.toggle("show", showCaption);
  if(showCaption){
    var li = Math.min(legs.length-1, legIdx);
    var leg = legs[li];
    var fromT = towns.find(function(x){return x.id===leg.from;});
    var toT = towns.find(function(x){return x.id===leg.to;});
    if(fromT && toT){
      capDay.textContent = "Stop "+(li+2)+" of "+towns.length;
      capRoute.innerHTML = escapeHtml(fromT.name)+'<span class="arrow">'+(leg.kind==="ferry"?"⛴":"→")+'</span>'+escapeHtml(toT.name);
      capKm.textContent = leg.kind==="ferry" ? "Ferry crossing" : (leg.km? leg.km+" km" : "");
      var n = photoCount(toT.id);
      capHint.innerHTML = n ? "<b>"+n+"</b> photo"+(n>1?"s":"")+" at this stop" : "Click the point to see photos";
    }
  } else {
    capDay.textContent = "Start";
    capRoute.textContent = towns[0].name;
    capKm.textContent = "The way begins";
    capHint.textContent = towns.length > 1 ? "Scroll to set off" : "Add a stop to begin the way";
  }
  topProgress.textContent = String(Math.min(towns.length,(t<=0?1:legIdx+2))).padStart(2,"0")+" / "+String(towns.length).padStart(2,"0");
  progFill.style.width = (overall*100).toFixed(1)+"%";
}

var renderHandle = 0;
function requestRender(){
  if(renderHandle) return;
  renderHandle = requestAnimationFrame(function(){
    renderHandle = 0;              // cleared FIRST, so a throw can never jam the loop
    try { render(); }
    catch(err){ console.error("render failed:", err); }
  });
}

// requestAnimationFrame is paused while a tab is in the background, so a
// frame asked for there never arrives. Clear the pending handle on return,
// otherwise the page stays frozen for the rest of its life.
document.addEventListener("visibilitychange", function(){
  if(!document.hidden){ renderHandle = 0; requestRender(); }
});
window.addEventListener("scroll", requestRender, {passive:true});
window.addEventListener("resize", function(){ rebuildScrollFrames(); requestRender(); });

/* ============================================================
   Photos (Firestore metadata + Storage bytes)
   ============================================================ */
var photoCache = {}; // stopId -> [{id, url, addedBy}]
var photoListeners = {};

function photoCount(stopId){ return (photoCache[stopId]||[]).length; }

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
var lbDeleteStopBtn = document.getElementById("lbDeleteStopBtn");
var lbEditRow = document.getElementById("lbEditRow");
var lbNameInput = document.getElementById("lbNameInput");
var lbRenameBtn = document.getElementById("lbRenameBtn");
var lbPosNow = document.getElementById("lbPosNow");
var lbUpBtn = document.getElementById("lbUpBtn");
var lbDownBtn = document.getElementById("lbDownBtn");

function stopRef(id){
  return db.collection("routes").doc(currentRouteId).collection("stops").doc(id);
}

function refreshEditRow(){
  lbEditRow.hidden = !isEditor || !currentStop;
  if(lbEditRow.hidden) return;
  var i = towns.findIndex(function(x){ return x.id === currentStop; });
  if(i < 0) return;
  lbNameInput.value = towns[i].name || "";
  lbPosNow.textContent = (i+1) + " of " + towns.length;
  lbUpBtn.disabled = (i === 0);
  lbDownBtn.disabled = (i === towns.length - 1);
}

// Rewrite every stop's order as 1..n in the given sequence, so positions
// can never drift apart or collide however many moves happen.
function commitOrder(list){
  var batch = db.batch();
  list.forEach(function(x, i){ batch.update(stopRef(x.id), {order: i+1}); });
  return batch.commit();
}

function moveStop(delta){
  if(!isEditor || !currentStop) return;
  var i = towns.findIndex(function(x){ return x.id === currentStop; });
  var j = i + delta;
  if(i < 0 || j < 0 || j >= towns.length) return;
  var list = towns.slice();
  var moved = list.splice(i, 1)[0];
  list.splice(j, 0, moved);
  commitOrder(list)
    .then(function(){ showToast("Moved to position " + (j+1) + "."); })
    .catch(function(err){ showToast("Error: " + err.message); });
}

lbUpBtn.addEventListener("click", function(){ moveStop(-1); });
lbDownBtn.addEventListener("click", function(){ moveStop(1); });

lbRenameBtn.addEventListener("click", function(){
  if(!isEditor || !currentStop) return;
  var name = lbNameInput.value.trim();
  if(!name){ showToast("A stop needs a name."); return; }
  stopRef(currentStop).update({name: name})
    .then(function(){ lbTitle.textContent = name; showToast("Renamed."); })
    .catch(function(err){ showToast("Error: " + err.message); });
});
lbNameInput.addEventListener("keydown", function(e){
  if(e.key === "Enter"){ e.preventDefault(); lbRenameBtn.click(); }
});
var lbNote = document.getElementById("lbNote");
var lbStatus = document.getElementById("lbStatus");
var lbFile = document.getElementById("lbFile");
var lbClose = document.getElementById("lbClose");
var currentStop = null;

function openLightbox(id){
  currentStop = id;
  var t = towns.find(function(x){return x.id===id;});
  if(!t) return;
  lbDay.textContent = t.order===1 ? "Start" : (t.order===towns.length ? "Latest" : "Stop "+t.order);
  lbTitle.textContent = t.name;
  lbMeta.textContent = t.lat.toFixed(4)+"°N, "+Math.abs(t.lng).toFixed(4)+"°W";
  refreshEditRow();
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
  var gone = currentStop;
  stopRef(gone).delete()
    .then(function(){
      closeLightbox();
      showToast("Stop deleted.");
      // close the gap so positions stay 1..n
      return commitOrder(towns.filter(function(x){ return x.id !== gone; }));
    })
    .catch(function(err){ showToast("Error: "+err.message); });
});


/* ============================================================
   Add-stop panel (Places Autocomplete)
   ============================================================ */
var addBackdrop = document.getElementById("addBackdrop");
var addClose = document.getElementById("addClose");
var addAfterName = document.getElementById("addAfterName");
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

function populateAddRouteSelect(){ /* single fixed route — nothing to choose */ }
function populateAddAfterSelect(){
  // A new stop always continues the way from the last one. If that turns out
  // to be the wrong place, the stop's own Earlier/Later buttons move it.
  if(!addAfterName) return;
  addAfterName.textContent = towns.length ? towns[towns.length-1].name : "the start";
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
  var routeId = currentRouteId;
  addStatus.textContent = "Saving…";
  var stopsRef = db.collection("routes").doc(routeId).collection("stops");
  stopsRef.orderBy("order").get().then(function(snap){
    var list = []; snap.forEach(function(d){ list.push(Object.assign({id:d.id}, d.data())); });
    var order = list.length ? list[list.length-1].order + 1 : 1;
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
    pendingPlace = null;
    addConfirmBtn.disabled = true;
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
