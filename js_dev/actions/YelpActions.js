import dispatcher from "../dispatcher";
import * as BAL from "../bal/BAL";

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
console.log(id);
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
