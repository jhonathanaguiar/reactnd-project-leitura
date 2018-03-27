import React, { Component } from 'react';
import getCategoriesApi from '../utils/api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from "../actions";
import { capitalize } from "../utils/helper";

class CategoryPanel extends Component {

    componentDidMount() {
        getCategoriesApi().then(
            categories => this.props.dispatch(getCategories(categories)))
    }

    render() {
        const { categories = {}} = this.props;

        return (
            <div className="box">
                <div className="category-header">
                    <h2>Categories</h2>
                </div>
                <div>
                    {Object.keys(categories).length && Object.keys(categories).map((index) => (
                        <div className="post-list no-subtitle border-bottom" key={categories[index].path}>
                            <Link to={`/${categories[index].path}`} className="material-icons md-24 no-link-style">label_outline</Link>
                            <div className="list-content">
                                <Link to={`/${categories[index].path}`} className="post-title">{capitalize(categories[index].name)}</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

function mapStateToProps({ categories }){
    return {categories}
}

export default connect(mapStateToProps, null)(CategoryPanel);