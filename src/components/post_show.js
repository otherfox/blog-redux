import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  handleDelete() {
    const { id } = this.props.match.params;
    deletePost(id, () => this.props.history.push('/'));
  }

  render() {
    if(!this.props.post) {
      return <div>... Loading</div>
    }

    const { title, categories, content } = this.props.post;

    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/">
            Back to posts
          </Link>
        </div>
        <h2>{ title }</h2>
        <p>{ content }</p>
        <p>{ categories }</p>
        <div>
            <a className="btn btn-danger" onClick={() => this.handleDelete() }>Delete Post</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps){
  return { post: posts[ownProps.match.params.id] }
}
export default connect(mapStateToProps, { fetchPost })(PostShow);
