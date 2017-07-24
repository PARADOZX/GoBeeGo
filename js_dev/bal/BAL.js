//returns array with the frequency of city names in the results
export function cityFrequencyCount(bigArr)
{
    let cityCount = {};
    
    if(Array.isArray(bigArr))
    {
        const arr = bigArr[0];
        
        console.log(arr);
        
        for(let dataset in arr)
        {
            
            for(let result in arr[dataset].data)
            {
                const city = arr[dataset].data[result].location.city;
                
                if(city != "")
                {
                    //if city doesn't exist in assoc array then count is 1
                    if(!(arr[dataset].data[result].location.city in cityCount))
                    {
                        cityCount[city] = 1;
                    }
                    //if city already exists then increase count by 1
                    else
                    {
                        cityCount[city]++;
                    }
                }
                
            }
        }
    }
    else 
    {
        return false;
    }
    
    return cityCount;
}

export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export function getBusinessDetails(business_id)
{
    return axios({
        url: '/yelpRoutes/businessDetails',
        method: 'get',
        params: {
            id : business_id
        }
    })
}

export function getBusinessReviews(business_id)
{
    return axios({
        url: '/yelpRoutes/businessReviews',
        method: 'get',
        params: {
            id : business_id
        }
    })
}