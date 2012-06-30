// variable globale de l'application
var ImHereApp = (function(){
	
	var urlws = "http://192.168.1.20:8080/ImhereRAFAG-war/WebServices";
	
	var id=null;
    var useralt=null;
    var userlng=null;
    var friendalt=null;
    var friendlng=null;
    var i=0;
	
	var ImHere = {
		stores: {},
		views: {}
	};
	
	ImHere.stores.User = new Store('User');
	
	var ImHereModel = Backbone.Model.extend({
	
		defaults: {
			id: null,
			latitude: null,
			longitude: null,
			tiny: null
		},
		
		localStorage: ImHere.stores.User,
		
		initialize: function() {
		
		}
		
	});
	
	var ImHereCollection = Backbone.Collection.extend({
		
		model: ImHereModel,
		
		localStorage: ImHere.stores.User,
		
		initialize: function(){
			
		}
	});
	
	
	var ImHereLocaliserUserView = Backbone.View.extend({
		
		events:{
			'click #MyPos' : 'LocaliserMoi',
            'click #HisPos' : 'LocaliserLui'
		},
		
		initialize: function() {
			
			var that = this;
			this.ImHereList2 = new ImHereCollection();
			
		},
		
         LocaliserMoi: function(event){
			this.Localiser();
         },
         
                
         Localiser : function (position){
         
         	if(navigator.geolocation) {
            	function affichePosition(position) 
                {
                	userlng=position.coords.longitude;
                    useralt=position.coords.latitude;
                                
                    console.log('user position ',useralt,' ',userlng);
                    var who=1; 
                               
                    AfficherCarte(useralt,userlng,who);
                                

                    
                    var key = "User";
                    console.log(localStorage.getItem(key));
					
                    tinyUrl="http://www.imhere.eden3tse/"+localStorage.getItem(key);
                    
                    document.getElementById("tinyurluser").value=tinyUrl;
                                
                    var that = this;
					var soapRequest = 
					'<?xml version="1.0" encoding="UTF-8"?> \
						<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/"> \
		    				<S:Header/> \
		    					<S:Body> \
		        					<ns2:ecrirePosition xmlns:ns2="http://WebServices/"> \
		        					<id>'+localStorage.getItem(key)+'</id> \
		        					<longitude>'+userlng+'</longitude> \
		        					<latitude>'+useralt+'</latitude> \
		        					<tinyurl>'+tinyUrl+'</tinyurl> \
                					</ns2:ecrirePosition> \
		    					</S:Body> \
						</S:Envelope>';
			
					$.ajax({
				
		    			type: "POST",
						url: urlws,
						contentType: "text/xml",
						dataType: "xml",
						data: soapRequest,
						success: function(data) {
							$(data).find('return').each(function() {
							});
						},
						error: function(data) {
							console.log(data.statusText);
						}
				
					});
                               
                    console.log('Altitude : ',useralt,' Longitude: ',userlng,' Web service est appelé!');
                   
                }


                function erreurPosition(error) { }
                	navigator.geolocation.getCurrentPosition(affichePosition,erreurPosition); 
                }                        
         },
         
         LocaliserLui : function(event){
			this.LocaliserA();
         },
         
         LocaliserA : function (position){
         
         	var that = this;
            var tiny2 = document.forms.newuserform.tinyURL.value;
            

                        
                    var that = this;
					var soapRequest = 
					'<?xml version="1.0" encoding="UTF-8"?> \
						<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/"> \
		    				<S:Header/> \
		    					<S:Body> \
		        					<ns2:lirePosition xmlns:ns2="http://WebServices/"> \
		        					<tinyurl>'+tinyUrl+'</tinyurl> \
                					</ns2:lirePosition> \
		    					</S:Body> \
						</S:Envelope>';
			
					$.ajax({
				
		    	type: "POST",
				url: urlws,
				contentType: "text/xml",
				dataType: "xml",
				data: soapRequest,
				success: function(data) {
					$(data).find('return').each(function() {
						var usermodelconnecter = new ImHereModel({id: $(this).find('id').text(), latitude: $(this).find('latitude').text(), longitude: $(this).find('longitude').text(), tiny: $(this).find('tinyurl').text()});
						that.ImHereList2.add(usermodelconnecter);
					});
				},
        		
				error: function(data) {
					console.log(data.statusText);
				}
				
			});
			
         
         	var j;
            for (j=0; j<that.ImHereList2.length; j++){
            	if(that.ImHereList2.at(j).get("tiny")==tiny2){
                	friendalt=that.ImHereList2.at(j).get("latitude");
                    friendlng=that.ImHereList2.at(j).get("longitude");
                }
             }
             console.log("test" + friendalt);
             console.log("test" + friendlng);
             AfficherCarte(friendalt,friendlng,2);
         }
         
	});

    var ImHereCalculItineraireView = Backbone.View.extend({
		
		events:{
			'click #CalculIt' : 'CalculerIt'
		},
		
	    initialize: function() {
			
			var that = this;
			this.ImHereList = new ImHereCollection();
		},
		
        CalculerIt : function(event){
            this.ItinFriend();
        },
                
        ItinFriend : function(position){             
            var that = this;
            if(navigator.geolocation) {           
            	function affichePosition(position) 
                {
                        	
                	userlng=position.coords.longitude;
                    useralt=position.coords.latitude;
                    console.log('ma position ',useralt,' ',userlng);
                    cord(userlng, useralt);
					itt();
                 }
                        
                 // Fonction de callback en cas d’erreur    
                 function erreurPosition(error) { }
                 navigator.geolocation.getCurrentPosition(affichePosition,erreurPosition);
            }
					
			function itt(){
            	var directionsDisplay;
                var directionsService = new google.maps.DirectionsService();
                var maCarte;
                
                directionsDisplay = new google.maps.DirectionsRenderer();
                    
                var maPosition = new google.maps.LatLng(useralt,userlng);
                var taPosition = new google.maps.LatLng(friendalt,friendlng);
                    
                console.log('itineraire de ',this.useralt,' ',this.userlng,' à ',friendalt,' ',friendlng,' ');
                var optionsCarte = {
                	zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: maPosition
                }
                maCarte = new google.maps.Map(document.getElementById("HisMapPosition"), optionsCarte);
                directionsDisplay.setMap(maCarte);
                    
                var requeteItineraire = {
                	origin: maPosition,
                    destination: taPosition,
                    travelMode: google.maps.DirectionsTravelMode.WALKING

                };

                directionsService.route(requeteItineraire, function(response, status) {
                	if (status == google.maps.DirectionsStatus.OK) {
                		directionsDisplay.setDirections(response);
                	}
                });
               
			}
        }
	});
	
	$(document).ready(function(){
       
        ImHere.views.new_form = new ImHereLocaliserUserView({
			el: $("div#actionMyPos")
            });
            
            ImHere.views.new_form = new ImHereLocaliserUserView({
			el: $("div#FriendPosition")
            });
            
            ImHere.views.new_form = new ImHereLocaliserUserView({
			el: $("div#aa")
            });
            
        ImHere.views.new_form = new ImHereCalculItineraireView({
			el: $("div#actionItinerary")
            });
		
	});
		
	window.ImHereModel = ImHereModel;
	return ImHere;

})();
