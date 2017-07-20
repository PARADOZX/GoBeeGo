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

export function sortBusinessResults()
{
    dispatcher.dispatch({
        type: "YELP_BUSINESS_RESULTS_SORT",
    })       
}

export function getBusinessDetailsAndReviews(id)
{
    const business_id = id;
    let data = {};
    
    axios.all([getBusinessDetails(business_id), getBusinessReviews(business_id)])
        .then(axios.spread(function (details, reviews) {
            data.details = details;
            data.reviews = reviews;
            
            dispatcher.dispatch({
                type: "YELP_BUSINESS_DETAILS_REVIEWS",
                response : data
            }) 
        }));
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