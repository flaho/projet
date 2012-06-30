 function AfficherCarte(alt,lng,who){
    var latlng = new google.maps.LatLng(alt, lng);
        
        // Ansi que des options pour la carte, centrée sur latlng
        var optionsGmaps = {
            center:latlng,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 15
        };
        if (who==1)var map = new google.maps.Map(document.getElementById("MyMapPosition"), optionsGmaps);
        else if (who==2)var map = new google.maps.Map(document.getElementById("HisPosition"), optionsGmaps);

        // Ajout d'un marqueur à la position trouvée
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title:"Vous êtes ici"
        });
        map.panTo(latlng);    
}

function cord(lngbis, altbis){	
		userlng= lngbis;
		useralt= altbis;
}