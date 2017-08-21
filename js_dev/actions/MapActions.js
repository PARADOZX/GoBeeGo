import dispatcher from "../dispatcher";
import * as BAL from "../bal/BAL";

export function distanceMatrixCalc(originArr, destArr)
{
    // var origin1 = new google.maps.LatLng(55.930385, -3.118425);
        const origin1 = 'Rockville, MD';
        const destinationA = 'Baltimore, MD';
        const destinationB = 'Richmond, VA';
        // var destinationB = new google.maps.LatLng(50.087692, 14.421150);
        
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin1],
            destinations: [destinationA],
            travelMode: 'DRIVING',
            // transitOptions: 'DRIVING',
            // drivingOptions: DrivingOptions,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            // avoidHighways: true,
            // avoidTolls: true,
          }, function(response, status){
              console.log(response);
          });
}