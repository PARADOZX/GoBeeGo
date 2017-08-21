import dispatcher from "../dispatcher";
import * as BAL from "../bal/BAL";

export function searchBusinessByKeyword(searchArr, coords, manualLocData)
{
    let promises = [];

    for (let i = 0; i < searchArr.length; i++) {
        
        let params_option = {
                search : searchArr[i]
        }
        
        if(coords)
        {
            params_option.lat = coords.latitude;
            params_option.long = coords.longitude;
        }
        
        if(manualLocData)
        {
            params_option.location = manualLocData
        }
            
        promises.push(
            axios({
                url: '/yelpRoutes/searchByKeyword',
                method: 'get',
                params: params_option
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

    axios.all([BAL.getBusinessDetails(business_id), BAL.getBusinessReviews(business_id)])
        .then(axios.spread(function (details, reviews) {
            data.details = details;
            data.reviews = reviews;
            
            dispatcher.dispatch({
                type: "YELP_BUSINESS_DETAILS_REVIEWS",
                response : data
            }) 
        }));
}
