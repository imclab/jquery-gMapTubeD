/**
 * jQuery Google Maps MapTubeD Loader
 *
 * @url		http://www.stevenjamesgray.com
 * @author	Steven James Gray <steven.james.gray@gmail.com>
 * @version	1.1.0
 */
var tileServerObject;var map_array=new Array();(function(a){a.fn.gMapTubeD=function(b){var c=a.extend({},a.fn.gMapTubeD.defaults,b);return this.each(function(){switch(c.maptype.toLowerCase()){case"road":case"roadmap":type=google.maps.MapTypeId.ROADMAP;break;case"hybrid":type=google.maps.MapTypeId.HYBRID;break;case"sat":case"satellite":type=google.maps.MapTypeId.SATELLITE;break;case"terrain":type=google.maps.MapTypeId.TERRAIN;break;default:type=google.maps.MapTypeId.ROADMAP;break}var e={zoom:c.zoom,center:new google.maps.LatLng(c.latitude,c.longitude),mapTypeId:type};var g=new google.maps.Map(this,e);map_array.push(g);var h=new google.maps.Geocoder();if(c.address!=""){h.geocode({address:c.address},function(j,i){if(i==google.maps.GeocoderStatus.OK){g.setCenter(j[0].geometry.location)}else{alert("Ooops, Geocode was not successful for the following reason: "+i)}})}if(c.descriptor_reverse){if(a.isArray(c.descriptor)&&c.descriptor.length>0){c.descriptor.revese()}}if(c.tileServer!=""){tileServerObject=c.tileServer}if(c.descriptor!=""){addLayerArray(g,c.descriptor)}if(c.setStyle!=""){if(a.isPlainObject(c.setStyle)){var f={map:g,name:c.setStyle.id};var d=new google.maps.StyledMapType(c.setStyle.style,f);g.mapTypes.set(c.setStyle.id,d);g.setOptions({mapTypeControlOptions:{mapTypeIds:[c.setStyle.id,google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.TERRAIN,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID]}});g.setMapTypeId(c.setStyle.id)}}})};a.fn.gMapTubeD.defaults={address:"",latitude:40,longitude:0,zoom:2,maptype:"roadmap",descriptor:"",descriptor_reverse:false,tileServer:{maptube:"http://128.40.111.243/TileRequestHandler.ashx",xyz:"",qt:""},setStyle:[]}})(jQuery);function setLayerOpacity(e,a,d){try{if(d>1.1){d=d/100}var b=e.overlayMapTypes.getAt(a);b.setOpacity(d);return true}catch(c){return false}}function removeLayer(c,a){try{c.overlayMapTypes.removeAt(a);return true}catch(b){return false}}function removeAllLayers(b){try{b.overlayMapTypes.clear();return true}catch(a){return false}}function addNewLayer(d,a,b){try{d.overlayMapTypes.insertAt(b,layer);return true}catch(c){return false}}function addLayerArray(d,c){try{if(jQuery.isArray(c)&&c.length>0){jQuery.each(c,function(f,g){var e;if(jQuery.isArray(g)&&g.length>0){if(g[1]=="mtd"||g[1]=="smr"){e=new MapTubeDMapType(g[0],tileServerObject.maptube)}else{if(g[1]=="xyz"||g[1]=="pc"){e=new XYZMapType(g[0],tileServerObject.xyz)}else{if(g[1]=="mo"||g[1]=="qt"){e=new QTMapType(g[0],tileServerObject.qt)}else{alert("This layer style is not recognised: "+g[1])}}}if(g[2]!=""){e.setOpacity(g[2])}else{e.setOpacity(1)}}else{if(typeof(g)=="object"){if(g.type=="mtd"||g.type=="smr"){e=new MapTubeDMapType(g.layer,tileServerObject.maptube)}else{if(g.type=="xyz"||g.type=="pc"){e=new XYZMapType(g.layer,tileServerObject.xyz)}else{if(g.type=="mo"||g.type=="qt"){e=new QTMapType(g.layer,tileServerObject.qt)}else{alert("This layer style is not recognised: "+g.layer)}}}if(g.opacity!=null){e.setOpacity(g.opacity)}else{e.setOpacity(1)}}else{e=new MapTubeDMapType(g,tileServerObject.maptube)}}d.overlayMapTypes.insertAt(f,e)})}else{var a=new MapTubeDMapType(c,tileServerObject.maptube);d.overlayMapTypes.insertAt(0,a)}return true}catch(b){return false}}function MapTubeDMapType(a){this.Cache=Array();this.opacity=100;this.descriptor=a;this.tileServer=tileServerObject.maptube}function MapTubeDMapType(a,b){this.Cache=Array();this.opacity=100;this.descriptor=a;this.tileServer=b}MapTubeDMapType.prototype.tileSize=new google.maps.Size(256,256);MapTubeDMapType.prototype.maxZoom=19;MapTubeDMapType.prototype.getTile=function(j,n,o){if(this.descriptor==""&&this.tileServer==""){var a=o.createElement("DIV");a.innerHTML="NO DATA LOADED";a.style.width=this.tileSize.width+"px";a.style.height=this.tileSize.height+"px";a.style.fontSize="20";a.style.borderStyle="solid";a.style.borderWidth="1px";a.style.borderColor="#AAAAAA";return a}else{var b=o.createElement("IMG");var m=Math.pow(2,n);var l=j.x;var k=j.y;var i="t";for(var h=0;h<n;h++){m/=2;if(k<m){if(l<m){i+="q"}else{i+="r";l-=m}}else{if(l<m){i+="t";k-=m}else{i+="s";l-=m;k-=m}}}b.id="t_"+i;b.style.width=this.tileSize.width+"px";b.style.height=this.tileSize.height+"px";b.src=this.tileServer+"?u="+this.descriptor+"&t="+i;b.style.opacity=this.opacity;b.style.filter="alpha(opacity="+this.opacity*100+")";this.Cache.push(b);return b}};MapTubeDMapType.prototype.releaseTile=function(a){a=null};MapTubeDMapType.prototype.setOpacity=function(b){this.opacity=b;for(var a=0;a<this.Cache.length;a++){this.Cache[a].style.opacity=b;this.Cache[a].style.filter="alpha(opacity="+b*100+")"}};function XYZMapType(a){this.Cache=Array();this.opacity=100;this.descriptor=a;this.tileServer=tileServerObject.xyz}XYZMapType.prototype.tileSize=new google.maps.Size(256,256);XYZMapType.prototype.maxZoom=19;XYZMapType.prototype.getTile=function(i,d,b){if(this.descriptor==""&&this.tileServer==""){var h=b.createElement("DIV");h.innerHTML="NO DATA LOADED";h.style.width=this.tileSize.width+"px";h.style.height=this.tileSize.height+"px";h.style.fontSize="20";h.style.borderStyle="solid";h.style.borderWidth="1px";h.style.borderColor="#AAAAAA";return h}else{var a=b.createElement("IMG");var g=Math.pow(2,d);var e=d+"/"+i.x+"/"+i.y+".png";a.id="t_"+e;a.style.width=this.tileSize.width+"px";a.style.height=this.tileSize.height+"px";a.src=this.tileServer+this.descriptor+"/"+e;a.style.opacity=this.opacity;a.style.filter="alpha(opacity="+this.opacity*100+")";this.Cache.push(a);return a}};XYZMapType.prototype.releaseTile=function(a){a=null};XYZMapType.prototype.setOpacity=function(b){this.opacity=b;for(var a=0;a<this.Cache.length;a++){this.Cache[a].style.opacity=b;this.Cache[a].style.filter="alpha(opacity="+b*100+")"}};function QTMapType(a){this.Cache=Array();this.opacity=100;this.descriptor=a;this.tileServer=tileServerObject.qt}QTMapType.prototype.tileSize=new google.maps.Size(256,256);QTMapType.prototype.maxZoom=19;QTMapType.prototype.getTile=function(j,n,o){if(this.descriptor==""&&this.tileServer==""){var a=o.createElement("DIV");a.innerHTML="NO DATA LOADED";a.style.width=this.tileSize.width+"px";a.style.height=this.tileSize.height+"px";a.style.fontSize="20";a.style.borderStyle="solid";a.style.borderWidth="1px";a.style.borderColor="#AAAAAA";return a}else{var b=o.createElement("IMG");var m=Math.pow(2,n);var l=j.x;var k=j.y;var i="t";for(var h=0;h<n;h++){m/=2;if(k<m){if(l<m){i+="q"}else{i+="r";l-=m}}else{if(l<m){i+="t";k-=m}else{i+="s";l-=m;k-=m}}}b.id="t_"+i;b.style.width=this.tileSize.width+"px";b.style.height=this.tileSize.height+"px";b.src=this.descriptor.replace("{0}",i);b.style.opacity=this.opacity;b.style.filter="alpha(opacity="+this.opacity*100+")";this.Cache.push(b);return b}};QTMapType.prototype.releaseTile=function(a){a=null};QTMapType.prototype.setOpacity=function(b){this.opacity=b;for(var a=0;a<this.Cache.length;a++){this.Cache[a].style.opacity=b;this.Cache[a].style.filter="alpha(opacity="+b*100+")"}};