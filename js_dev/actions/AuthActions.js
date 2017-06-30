import dispatcher from "../dispatcher";

export function login(user)
{
    axios({
            url: '/auth/login', 
            data: user,
            method: 'post'
        })
        .then(function(response){
            //successful login
            if (response.data) {
                dispatcher.dispatch({
                    type: "LOGGED_IN"
                })
            } else {
                dispatcher.dispatch({
                    type: "LOG_IN_FAIL"
                })       
            }
        });
}

export function isLoggedIn() {
    
    return axios.get('/auth/isLoggedIn');

}

export function registerUser(user) {
        axios({
            url: '/auth/register', 
            data: user,
            method: 'post'
        })
        .then(function(response){
            
            if(response.data){
                dispatcher.dispatch({
                    type: "REGISTERED"
                })
            } else {
                dispatcher.dispatch({
                    type: "REGIS_USER_EXISTS"
                })       
            }
        })
        .catch(function(response){
            alert("Problem occurred when logging out.  Try again.");
        })
}


export function addArticle(newArticle) {
    dispatcher.dispatch({
        type: "CREATE_ARTICLE",
        newArticle
    })
}

export function reloadArticles() {
    dispatcher.dispatch({
        type: "FETCH_ARTICLES"
    })
    setTimeout(()=>{
        dispatcher.dispatch({
            type: "RECEIVE_ARTICLES", 
            articles: [
                {
                    id : 1494681246405,
                    name : "Article Four",
                    content : "This is some content."
                },
                {
                     id : 1494681246412,
                    name : "Article Five",
                    content : "This is some more content."
                },
                {
                     id : 1494681246331,
                    name : "Article Six",
                    content : "This is some kick ass content."
                }
        ]})
    }, 1000)
}

export function logOut() {
    
    axios.post('/auth/logout')
        .then(function(response){
            dispatcher.dispatch({
                type: "LOG_OUT"
            })
        })
        .catch(function(response){
            alert("Problem occurred when logging out.  Try again.");
        })
    
}