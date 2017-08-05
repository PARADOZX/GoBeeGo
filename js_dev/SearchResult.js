import React from 'react';
import YelpCtrl from "./stores/YelpCtrl";
import * as YelpActions from "./actions/YelpActions";
import * as AppActions from "./actions/AppActions";
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";

class SearchResult extends React.Component {
    constructor(props)
    {
        super(props);
        
        this.state = {};
    }
    componentWillMount()
    {
        var that = this;
        
        window.onresize = function(){
            that.dynamicSetImgHeightResize();
            // that.dynamicSetResultsCtrlsMarginResize();
        };
        
        // YelpCtrl.on("sort", function(){
        //     that.dynamicSetImgHeightInit();
        //     // that.dynamicSetResultsCtrlsMarginInit();
        // });
    }
    componentDidMount()
    {
        const images = document.getElementsByClassName('result-icon');
        this.dynamicSetImgHeightInit();
        // this.dynamicSetResultsCtrlsMarginInit();
    }
    onHandleChange(event)
    {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        this.setState({
          [name]: value
        });
    }
    dynamicSetImgHeightInit()
    {
        const img = this.refs.resultIcon;
        if(img !== undefined)
        {
            const width = img.offsetWidth;
            img.style.maxHeight = width + 'px';
        }
    }
    dynamicSetImgHeightResize()
    {
        const images = document.getElementsByClassName('result-icon');
        Array.prototype.forEach.call(images, function(img) {
            const width = img.offsetWidth;
            img.style.maxHeight = width + 'px';
        });
    }
    //initial rendering references the DOM for each iteration so make individual changes without iterating through a collection
    dynamicSetResultsCtrlsMarginInit()
    {
        const card = this.refs.cardblock;
        const title = this.refs.titleblock;
        const stars = this.refs.starsblock;
        const resultsCtrl = this.refs.resultsCtrlblock;
        
        // resultsCtrl.style.marginTop = "0px";
    
        const card_padding = 20;
        const card_height = card.offsetHeight;
        const title_height = title.offsetHeight;
        const stars_height = stars.offsetHeight;
        const resultCtrls_height = 37;
        
        const diff = card_height - (card_padding*2) - title_height - stars_height - resultCtrls_height;
      
        // var obj = {
        //      card_padding :20,
        //      card_height : card.offsetHeight,
        //      title_height : title.offsetHeight,
        //      stars_height : stars.offsetHeight,
        //      resultCtrls_height : 37,
        //      diff : diff
        // };
        // console.log(obj);
        
        resultsCtrl.style.marginTop = diff + "px";
    }
    //resizing window references the rendered DOM just once so only way to get a reference to each card element is to 
    //iterate through collection
    dynamicSetResultsCtrlsMarginResize()
    {
        const cards = document.getElementsByClassName('card-block');
        
        Array.prototype.forEach.call(cards, function(card) {
            card.querySelector('#resultsCtrlblock').style.marginTop = "0px";
            
            const card_padding = 20;
            const card_height = card.offsetHeight;
            const title_height = card.querySelector('#titleblock').offsetHeight;
            const stars_height = card.querySelector('#starsblock').offsetHeight;
            const resultCtrls_height = 37;
            
            const diff = card_height - (card_padding*2) - title_height - stars_height - resultCtrls_height;
         
            card.querySelector('#resultsCtrlblock').style.marginTop = diff + "px";
        });
    }
    getResultDetails()
    {
        YelpActions.getBusinessDetailsAndReviews(this.props.id);
    }
    addDestination() {
        //add to user
        // AppActions.addDestination(this.props.id);
        //add to trip
        
        AppActions.addDestination(this.props.id, this.props.tripID);
    }
    render(){
        
        const stars_img_path = "/img/small_" + this.props.rating + ".png";
        
        const bottom_margin = '20px';
        
        const cntr_style = {
            borderColor : 'rgb(214, 214, 214)'    
        };
        
        const card_block_style = {
            // position : 'relative'  
        };
        
        const starsblock_style = {
            width: '135px',
            height: '23px'
        };
        
        const stars_style = {
            height: '100%'
        }
        
        const icon_style = {
            width: '100%',
            height: 'auto'
        };
        
        const result_ctrls_style = {
            // position: 'relative',
            // bottom: '0px'
        };
        
        return (
            <div style={cntr_style} className="col-lg-4 col-sm-6 card">
                <div ref="cardblock" data-id={this.props.name} style={card_block_style} className="card-block">
                    <div ref="titleblock" id="titleblock" className="row">
                        <div className="col-8">
                            <h5 className="card-title">{this.props.name}</h5>
                            <p className="card-text">{this.props.city}, {this.props.state}</p>
                        </div>
                        <div className="col-4"><img ref="resultIcon" className="result-icon" style={icon_style} src={this.props.imgurl} /></div>
                    </div>
                    <div ref="starsblock" id="starsblock" className="mb-3" style={starsblock_style}>
                        <img style={stars_style} src={stars_img_path} />
                    </div>
                    <div ref="resultsCtrlblock" id="resultsCtrlblock" style={result_ctrls_style}>
                        {/*<button onClick={this.getResultDetails.bind(this)} className="btn btn-md btn-primary">Details</button>*/}
                        <Link className="btn" to={"/businessDetails/"+this.props.id}>Details</Link>
                        <button onClick={this.addDestination.bind(this)}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchResult);