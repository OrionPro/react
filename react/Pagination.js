import React, {Component} from 'react';
//import json from '../app/json/items.json';
import axios from 'axios';


class ItemsTmp extends Component {
    render() {
        return (
            <li className="li">
                <a href={ this.props.url } className="tab_item">
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
        )
    }
}
class MoreElem extends Component {
    render() {
        return <a href="#">{this.props.num} </a>

    }
}


export default class Pagination extends Component {
    constructor(props) {
        super(props);

        this.qualElem = 4; //кол-во выводимых элементов
        this.muchAdd = 4; // кол-во добавляемых элементов


        this.state = {
            count: [],
            more: [],
            pages: []
        };


        this.more = {elem: []};

        this.categoryState = false;
    }


    componentWillMount() {
        let limit = 0;
        axios.get('../json/items.json')
            .then(res => {
                let data = [];
                let more = [];
                let pages = [];

                res.data.map(el=> {
                    if (limit < this.qualElem) {
                        limit++;
                        data.push(el)
                    } else {
                        more.push(el)
                    }
                });

                for(var i = 0; i < res.data.length; i++){
                    if((  this.qualElem % i) == 0){

                        pages.push(i);
                    }
                }


                this.setState({
                    count: data,
                    more: more,
                    pages: pages
                });
            });

    }


    componentDidMount() {

    }


    render() {
        var limit = 0;
        this.state.pages.map(el=> {
            console.log(el)

        })
        return (
            <div>
                <div className="title_h2">Hello</div>
                <div className="all_items text_center">
                    {
                        this.state.count.map(el=> {
                            return (
                                <ItemsTmp
                                    key={el.id}
                                    src={el.img}
                                    url={el.url}
                                    discount_pct={el.discount_pct}
                                    final_price={el.final_price}
                                    tab_item_name={el.tab_item_name}
                                    top_tag={el.top_tag}
                                />
                            )
                        })
                    }
                </div>
                <div className="pagination-wrap">
                    {
                        this.state.pages.map(el=> {
                            for(var i = 0; i < el; i++){
                                return (
                                    <MoreElem
                                        num={el}
                                        key={el}
                                    />
                                )
                            }
                        })





                    }
                </div>

            </div>
        )
    }
}
