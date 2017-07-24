import dispatcher from "../dispatcher";
import * as BAL from "../bal/BAL";

export function addDestination(id)
{
    const business_id = id;
    let data = {};
    
    axios.all([BAL.getBusinessDetails(business_id), BAL.getBusinessReviews(business_id)])
        .then(axios.spread(function (details, reviews) {
            data.details = details;
            data.reviews = reviews;
    
            dispatcher.dispatch({
                type: "ADD_DESTINATION",
                response : data
            }) 
        }));
}

