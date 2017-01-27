import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import json from '../app/json/items.json';


class Template extends Component {
	render() {
		return (
			<li className="job">
				<a href={ this.props.url }><img className="image" src={ this.props.src }/></a>
			</li>
		);
	}
}

// class MoreElem extends Component{
// 	render(){
// 		return()
// 	}
// }

class App extends Component {


	constructor(props) {
		super(props);
		//this.state = {count: this.props.json}
		this.state = {count: json};
		this.more = {elem: []};
		this.filter = this.filter.bind(this);
		this.showMore = this.showMore.bind(this);
	}

	componentDidMount() {
		var limit = 0;
		var filterElem = json.filter(function (el) {
			if (limit < 4) {
				limit++;
				return el
			}
		})
		this.setState({
			count: filterElem
		})
	}

	showMore() {
		var res = [];

		// res.push(this.state.count);
		// res.push(this.more.elem);
		// res.map(el=>{
		// 	console.log(el);
		//
		// })
		this.more.elem.map(el =>{
			res.push(el)
		});
		this.setState({
			count: this.state.count.concat(res)
		});

	}
	

	filter(event) {
		var btn = event.target,
			limit = 0,
			value = btn.value,
			more = this.more.elem;
			
		var filterElem = json.filter(function (el) {
			var filterElem = el.category;
			if (value == filterElem) {
				if (limit < 4) {
					limit++;
					return el
				}
				more.push(el);
			}
			if (value == "all") {
				if (limit < 4) {
					limit++;
					return json
				}
				more.push(json);
			}

		})
		this.setState({
			count: filterElem
		})
	}

	//df
	render() {
		return (
			<div>
				<button className="button" onClick={this.filter} value="1">1</button>
				<button className="button" onClick={this.filter} value="2">2</button>
				<button className="button" onClick={this.filter} value="3">3</button>
				<button className="button" onClick={this.filter} value="all">all</button>
				<button className="button" onClick={this.showMore}>more</button>
				<ul>
					{
						this.state.count.map(function (el) {
							return <Template
								key={el.id}
								src={el.img}
								url={el.url}
							/>
						})

					}
				</ul>

			</div>

		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('container'));

