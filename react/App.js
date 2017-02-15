import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import { Link } from 'react-router';
import json from '../app/json/items.json';
// import axios from 'axios';


import Scroll from './Scroll';
import Pagination from './Pagination';



class Layout extends Component{
	constructor(props) {
		super(props);
    
		const quantity = 4; //кол-во выводимых элементов
		const muchAdd = 4; // кол-во добавляемых элементов
    
		this.qualElem = quantity; // запись в переменную, которая будет доступна во всем классе
		this.muchAdd = muchAdd; // запись в переменную, которая будет доступна во всем классе

	}
	render(){
		return(
				<div>
					<Link to="Scroll"><button>Scroll</button></Link>
					<Link to="Pagination"><button>Pagination</button></Link>
					{this.props.children}
				</div>
		);
	}
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Scroll}/>
			<Route path='Scroll' component={Scroll}></Route>
			<Route path='Pagination' component={Pagination}></Route>
		</Route>
	</Router>,
	document.getElementById('container'));