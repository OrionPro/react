import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import json from '../app/json/items.json';
// import axios from 'axios';


class ItemsTmp extends Component {
	render() {
		return (
			<li>
				<a href={ this.props.url } className={this.props.animID + " tab_item"}>
					<div className=" tab_item_cap">
						<img className="tab_item_cap_img" src={ this.props.src }/>
					</div>
					<div className="discount_block tab_item_discount">
						<div className="discount_pct">{this.props.discount_pct}</div>
						<div className="discount_prices">
							<div className="discount_final_price">{this.props.final_price}</div>
						</div>
					</div>
					<div className="tab_item_content">
						<div className="tab_item_name">{this.props.tab_item_name}</div>
						<div className="tab_item_details">
							<span className="platform_img win"></span>
							<div className="tab_item_top_tags">
								<span	className="top_tag">{this.props.top_tag}</span>
							</div>
						</div>
					</div>
					<div style={{clear: 'both'}}></div>
				</a>
			</li>
		);
	}
}


class App extends Component {


	constructor(props) {
		super(props);

		const quantity = 4; //кол-во выводимых элементов
		const muchAdd = 4; // кол-во добавляемых элементов

		this.qualElem = quantity; // запись в переменную, которая будет доступна во всем классе
		this.muchAdd = muchAdd; // запись в переменную, которая будет доступна во всем классе


		this.state = {
			count: json,
            animID: ['readyElem','moreElem']
		};
		this.more = {elem: []};

		this.didElem;
		this.willElem;

		this.filter = this.filter.bind(this);
		this.showMore = this.showMore.bind(this);
		this._handleClick = this._handleClick.bind(this);


	}

	readyAddItems() {


		var more = this.more.elem;
		if (json.length > this.qualElem) {
			this.filterElem = json.slice(0, this.qualElem);

			for (var i = 0; i < json.length; i++) {
				if (i > (this.qualElem - 1)) {
					more.push(json[i])
				}
			}
		} else this.filterElem = json;


        this.setState({
			count: this.filterElem
		})

        
    }

	jQueryEvents(){ // для навешивания событий jQuery на любые элементы в компоненте

		$('.button').click(function () {
			$('.button').removeClass("active");
			$(this).addClass("active");
		})
	}

	componentDidMount() {

		this.readyAddItems();
		this.jQueryEvents();
        var tl = new TimelineMax();
        tl.add("anim1", "+=0.8").staggerFrom('.readyElem', 0.3, {opacity: 0, y: 100}, 0.1, "anim1");
    }


	showMore(event) {// добавляет по 2 эелементы

		event.preventDefault();

        var sort = this.more.elem.splice(0, this.muchAdd);
        this.setState({
			count: this.state.count.concat(sort)
		});



    }

	filter(el) {

		this.more.elem = [];
		var btn = el,
			limit = 0,
			value = btn.value,
			more = this.more.elem;

		var filterElem = json.filter(el => {

			var filterElem = el.category;
			if (value == filterElem) {
				if (limit < this.qualElem) {
					limit++;
					return el
				}
				more.push(el);
			}
			if (value == "all") {
				if (limit < this.qualElem) {
					limit++;
					return json
				}
				more.push(el);
			}

		});

		this.setState({
			count: filterElem
		})

	}

	_handleClick(event) {
		event.preventDefault();
		var el = event.target;

		this.filter(el);

	}

	inspectBnt() {
		if (this.more.elem.length !== 0) {
			return <button className="center-block button" onClick={this.showMore}>more</button>
		} else  return <button className="center-block button">no items</button>
	}


	resetAnimClass(){

		var muchAdd = this.muchAdd;

        if($('.moreElem').length > muchAdd){
            let limit = 0;
            $('.moreElem').each(function () {

                if(limit <  muchAdd){
                    limit++;
                    console.log($(this))
                    $(this).addClass('readyElem');
                    $(this).removeClass('moreElem')
            	}
            })
        }
	}

	componentDidUpdate(){

		this.resetAnimClass();

        var tl = new TimelineMax();
        tl.add("anim2", "+=0.1").staggerFrom('.moreElem', 0.3, {opacity: 0, y: 100}, 0.1, "anim2");
	}

	//Основной render  в компоненте
	render() {
        var animID = this.state.animID[0],
			animID2 = this.state.animID[1],
        	qualElem = this.qualElem,
            limit = 0;

        return (
			<div className="all_items text_center">
				<div className="items_wrap">
					<button className="button" onClick={this._handleClick} value="1">Category 1</button>
					<button className="button" onClick={this._handleClick} value="2">Category 2</button>
					<button className="button" onClick={this._handleClick} value="3">Category 3</button>
					<button className="button active" onClick={this._handleClick} value="all">all</button>
				</div>

				<ul>
					{

						this.state.count.map(function (el) {
                            if(qualElem  > limit){
                            	limit++;

                            }else{
                                animID = animID2

                            }
							return <ItemsTmp
								animID={animID}
								key={el.id}
								src={el.img}
								url={el.url}
								discount_pct={el.discount_pct}
								final_price={el.final_price}
								tab_item_name={el.tab_item_name}
								top_tag={el.top_tag}
							/>
						})

					}
				</ul>
				{
					this.inspectBnt()
				}
			</div>

		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('container'));

