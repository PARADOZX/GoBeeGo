import React from 'react';
import * as YelpActions from "./actions/YelpActions";
import YelpCtrl from "./stores/YelpCtrl";

let receiveDetailAndReviewsCallBackRef = null;

export default class extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            business : null  
        };
        
        receiveDetailAndReviewsCallBackRef = this.receiveDetailAndReviewsCallBack.bind(this);
    }
    componentWillMount()
    {
        var that = this;
        
        YelpCtrl.on("detailsAndReviews", receiveDetailAndReviewsCallBackRef);

        const id = this.props.match.params.id;
        if(id !== undefined)
            this.getResultDetails(id);
    }
    componentDidMount()
    {
        
    }
    componentWillUnmount() {
        YelpCtrl.removeListener("detailsAndReviews", receiveDetailAndReviewsCallBackRef);
    }
    receiveDetailAndReviewsCallBack()
    {
        const response = YelpCtrl.getBusinessDetailsAndReviews();
        let temp = [];
            
        temp.details = response.details.data;
        temp.reviews = response.reviews.data.reviews;
    
        new google.maps.Map(this.refs.map, {
           center: {
               lat: response.details.data.coordinates.latitude,
               lng: response.details.data.coordinates.longitude
           },
           zoom: 15
        });
            
        this.setState({
            business : temp
        });
    }
    getResultDetails(id)
    {
        YelpActions.getBusinessDetailsAndReviews(id);
    }
    render(){
        return (
            <div>
                {
                    this.state.business !== null ?
                        <h2>{this.state.business.details.name}</h2>
                    : null
                }
                <div ref="map" style={{width: '400px', height: '500px'}}>
                </div>
            </div>
        )
    }
}