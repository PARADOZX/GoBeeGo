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

//calculates the distance between two points in latitude longitude
//unit is "M" (for miles by default)
//"K" is kilometers "N" is nautical miles
export function distTwoPoints(lat1, lon1, lat2, lon2, unit) 
{
	const radlat1 = Math.PI * lat1/180;
    const radlat2 = Math.PI * lat2/180;
	const theta = lon1-lon2;
	const radtheta = Math.PI * theta/180;
	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit=="K") { dist = dist * 1.609344; }
	if (unit=="N") { dist = dist * 0.8684; }
	
	return dist;
}