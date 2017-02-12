import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import json from '../app/json/items.json';
// import axios from 'axios';


class ItemsTmp extends Component {
	render() {
		return (
			<li className="li">
				<a href={ this.props.url } className={this.props.animID + " " + "tab_item"}>
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
								<span className="top_tag">{this.props.top_tag}</span>
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
			animID: ['readyElem', 'moreElem', 'categoryElem']
		};
		this.more = {elem: []};

		this.categoryState = false;

		this.filter = this.filter.bind(this);
		this.showMore = this.showMore.bind(this);
		this._handleClick = this._handleClick.bind(this);
		this.search = this.search.bind(this);
		this.scrollElem = this.scrollElem.bind(this);
		this.scrollAddElem = this.scrollAddElem.bind(this);

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

	jQueryEvents() { // для навешивания событий jQuery на любые элементы в компоненте

		$('.button').click(function () {
			$('.button').removeClass("active");
			$(this).addClass("active");
		})
		
	}


	scrollElem(arr){

		var positionDoc = $('.all_items ul').offset().top, //Начало выводимых элементов
			heightElem = $('.all_items ul .li').outerHeight(), // высота каждого элемента
			heightDocument = $(window).height(), // высота всего документа
			start = heightDocument - positionDoc, // до какого момента выводить элемента
			step = parseInt(start / heightElem);


		var more = this.more.elem;
		if (arr.length > step) {
			this.filterElem = arr.slice(0, step);

			for (var i = 0; i < json.length; i++) {
				if (i > (step - 1)) {
					more.push(arr[i])
				}
			}
		} else this.filterElem = arr;


		this.setState({
			count: this.filterElem
		})

	}

	scrollAddElem(pos){



		if(pos > ($('#moreBtn').offset().top - $(window).height())){
			var sort = this.more.elem.splice(0, this.muchAdd);

			this.setState({
				count: this.state.count.concat(sort)
			});

		}


	}

	componentDidMount() {

		//this.readyAddItems();
		this.scrollElem(json);
		this.jQueryEvents();
		var tl = new TimelineMax();
		tl.add("anim", "+=0.1").set('.readyElem', {
			opacity: 0,
			y: 100
		}, "anim").staggerTo('.readyElem', 0.3, {opacity: 1, y: 0}, 0.1, "anim");


		// вывод элементов при скролее


		$(window).scroll(() => {
			this.scrollAddElem($(window).scrollTop())
		});
		
	}


	showMore(event) {// добавляет по 2 эелементы
		event.preventDefault();
		this.categoryState = false;
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



	search(event) {



		this.more.elem = [];
		var value = event.target.value.toLowerCase(),
			limit = 0,
			searchArr = [];

		var name = json.filter(el => {
			var searchValue = el.tab_item_name.toLowerCase();

			return searchValue.indexOf(value) !== -1;

		});

		name.map(el => {
			if (limit < this.qualElem) {
				limit++;
				searchArr.push(el)
			}else{
				this.more.elem.push(el)
			}
		});

		this.setState({
			count:  searchArr
		});

	}


	_handleClick(event) {
		event.preventDefault();
		var el = event.target;

		this.filter(el);
		this.categoryState = true;
	}

	inspectBnt() {
		if (this.more.elem.length !== 0) {
			return <button id="moreBtn" className="center-block button" onClick={this.showMore}>more</button>
		} else  return <button id="moreBtn" className="center-block button">no items</button>


	}


	resetAnimClass() {

		var muchAdd = this.muchAdd;

		if ($('.moreElem').length > muchAdd) {
			let limit = 0;
			$('.moreElem').each(function () {

				if (limit < muchAdd) {
					limit++;
					$(this).addClass('readyElem');
					$(this).removeClass('moreElem');

				}
			})
		}

		if ($('.categoryElem').length > muchAdd) {
			let limit = 0;
			$('.categoryElem').each(function () {
				if (limit < muchAdd) {
					limit++;
					$(this).addClass('readyElem');
					$(this).removeClass('categoryElem');
				}

			})
		}
	}

	componentDidUpdate() {

		this.resetAnimClass();


		var tl1 = new TimelineMax();
		var tl2 = new TimelineMax();
	   // tl1.set('.moreElem', {opacity: 1, y: 0}).staggerFrom('.moreElem', 0.5, {opacity: 0, y: 100}, 0.1, '-=0.3');
		tl2.set('.categoryElem', {opacity: 1, y: 0}).staggerFrom('.categoryElem', 0.5, {opacity: 0, y: 100}, 0.1);
	}


	shouldComponentUpdate(nextProps, nextState){
		// if(this.categoryState !== false){
		   return true
		// } else {
		//     return false
		// }

	}


	//Основной render  в компоненте
	render() {
		var animID = this.state.animID[0],
			animID2 = this.state.animID[1],
			animID3 = this.state.animID[2],
			qualElem = this.qualElem,
			limit = 0,
			categoryState = this.categoryState;


		return (
			<div className="all_items text_center">

				<div className="items_wrap">
					<button className="button category" onClick={this._handleClick} value="1">Category 1</button>
					<button className="button category" onClick={this._handleClick} value="2">Category 2</button>
					<button className="button category" onClick={this._handleClick} value="3">Category 3</button>
					<button className="button category active" onClick={this._handleClick} value="all">all</button>

					<div className="input_search">
						<label className="">Найти элемент</label>
						<input id="search" type="text" placeholder="" onChange={this.search}/>
					</div>
				</div>

				<ul>
					{
						this.state.count.map(function (el) {
							if (qualElem > limit) {
								limit++;

							} else {
								animID = animID2
							}
							if (categoryState == true) {
								animID = animID3
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

