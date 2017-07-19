import React from 'react';

export default class extends React.Component {
    constructor()
    {
        super();
        
        this.state = {};
    }
    componentWillMount()
    {
        var that = this;
        window.onresize = function(){
            console.log('resized!');
            that.dynamicSetImgHeightResize();
            that.dynamicSetResultsCtrlsMarginResize();
        };
    }
    componentDidMount()
    {
        const images = document.getElementsByClassName('result-icon');
        this.dynamicSetImgHeightInit();
        this.dynamicSetResultsCtrlsMarginInit();
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
        const width = img.offsetWidth;
        img.style.maxHeight = width + 'px';
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
        
        const card_padding = 20;
        const card_height = card.offsetHeight;
        const title_height = title.offsetHeight;
        const stars_height = stars.offsetHeight;
        const resultCtrls_height = 37;
        
        const diff = card_height - (card_padding*2) - title_height - stars_height - resultCtrls_height;
      
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
    render(){
        const stars_img_path = "/img/small_" + this.props.rating + ".png";
        
        const bottom_margin = '20px';
        
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
            <div className="col-lg-4 col-sm-6 card card-outline-primary mb-3">
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
                        <button className="btn btn-md btn-primary">Details</button>
                    </div>
                </div>
            </div>
        )
    }
}