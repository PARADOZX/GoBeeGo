import dispatcher from "../dispatcher";
import * as BAL from "../bal/BAL";

export function addDestination(id, tripID)
{
    const business_id = id;
    let data = {};
    
    axios.all([BAL.getBusinessDetails(business_id), BAL.getBusinessReviews(business_id)])
        .then(axios.spread(function (details, reviews) {
            data.details = details;
            data.reviews = reviews;
            data.tripID = tripID;
            
            dispatcher.dispatch({
                type: "ADD_DESTINATION",
                response : data
            }) 
        }));
}

export function createNewTrip(tripName)
{
    const trip_name = tripName.trim();
    
    axios({
            url: '/accountRoutes/createTrip', 
            data: {
                name : trip_name
            },
            method: 'post'
        })
        .then(function(response){
            if(response.data) {
                dispatcher.dispatch({
                    type: "TRIP_CREATED",
                    tripName: trip_name
                })
            } 
            else 
            {
                //trip exists
                dispatcher.dispatch({
                    type: "TRIP_ALREADY_EXISTS",
                    tripName: trip_name
                })
            }
        });
}

export function reorderDestination(tripID, fromIndex, toIndex)
{
     axios({
            url: '/accountRoutes/reorderDestinations', 
            data: {
                id : tripID,
                from : fromIndex,
                to : toIndex
            },
            method: 'post'
        })
        .then(function(response){
            if(response.data) {
                dispatcher.dispatch({
                    type: "DESTINATIONS_REORDERED"
                })
            } 
            // else 
            // {
            //     //trip exists
            //     dispatcher.dispatch({
            //         type: "TRIP_ALREADY_EXISTS",
            //         tripName: trip_name
            //     })
            // }
        });
}