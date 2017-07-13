import dispatcher from "../dispatcher";

export function searchBusinessByKeyword(searchArr, coords)
{
    let promises = [];
   
    for (let i = 0; i < searchArr.length; i++) {
        promises.push(
            axios({
                url: '/yelpRoutes/searchByKeyword',
                method: 'get',
                params: {
                    search : searchArr[i],
                    lat : coords.latitude,
                    long : coords.longitude
                }
            })
        );
    }

    axios.all(promises)
        .then(function(response){
            // console.log(response); 
            dispatcher.dispatch({
                // type: "YELP_BUSINESS_BY_KEYWORD_RESULTS",
                // data : response
                type: "YELP_BUSINESS_RESULTS",
                data : response
            })       
        });
   
}

export function autocompleteGen(text)
{
    return axios({
            url: '/yelpRoutes/autocomplete',
            method: 'get',
            params: {
                search : text
            }
        })
}