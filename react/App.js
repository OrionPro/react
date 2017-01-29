import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import json from '../app/json/items.json';
// import axios from 'axios';


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

        const quantity = 10; //кол-во выводимых элементов
		const muchAdd = 2; // кол-во добавляемых элементов

        this.qualElem = quantity; // запись в переменную, которая будет доступна во всем классе
        this.muchAdd = muchAdd; // запись в переменную, которая будет доступна во всем классе






        this.state = {count: json};
		this.more = {elem: []};
		
        this.filter = this.filter.bind(this);
        this.showMore = this.showMore.bind(this);
       
      

    }



	readyAddItems(){

        var more = this.more.elem;
        if(json.length > this.qualElem){
            this.filterElem = json.slice(0, this.qualElem);

            for(var i = 0; i < json.length; i++){
                if(i > (this.qualElem - 1)){
                    more.push(json[i])
                }
            }
		} else this.filterElem = json;


        this.setState({
            count: this.filterElem
        })
	}




	componentDidMount() {
        this.readyAddItems();
    }



    showMore() {// добавляет по 2 эелементы

		var sort = this.more.elem.splice(0, this.muchAdd);
        this.setState({
			count: this.state.count.concat(sort)
		});

	}


	filter(event) {


        this.more.elem = [];
		var btn = event.target,
			limit = 0,
			value = btn.value,
			more = this.more.elem;

        var filterElem = json.filter(el =>{

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

    inpecBnt(){
        if(this.more.elem.length !== 0){
            return <button onClick={this.showMore}>more</button>
        } else  return "конец"
    }


    //df
	render() {
		return (
			<div>
				<button className="button" onClick={this.filter} value="1">1</button>
				<button className="button" onClick={this.filter} value="2">2</button>
				<button className="button" onClick={this.filter} value="3">3</button>
				<button className="button" onClick={this.filter} value="all">all</button>
				{
                    this.inpecBnt()
				}
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

