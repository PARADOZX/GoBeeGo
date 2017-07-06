import dispatcher from "../dispatcher";

export function searchYelp(searchParam)
{
    console.log("in yelp actions searching for : " + searchParam);
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
        // .then(function(response){
        //     if (response.data) {
        //         dispatcher.dispatch({
        //             type: "YELP_AUTOCOMPLETE_GEN",
        //             data : response.data.terms,
        //             element : elem
        //         })
        //     } 
            
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
}