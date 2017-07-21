import dispatcher from "../dispatcher";

export function addDestination(business_id)
{
    dispatcher.dispatch({
        type: "ADD_DESTINATION",
        response : business_id
    }) 
}