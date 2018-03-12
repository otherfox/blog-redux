import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class PostsNew extends Component {
  renderField(field) {
    let { meta: {touched, error} } = field;
    let className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={ className }>
        <label>{field.label}</label>
        <input
          type="text"
          className="form-control"
          { ...field.input }
        />
        <div className="text-help">{ field.meta.touched ? field.meta.error : '' }</div>
      </div>
    )
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form id="postsNewForm" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <Field
          label="Title"
          name="title"
          component={ this.renderField }
        />
        <Field
          label="Categories"
          name="categories"
          component={ this.renderField }
        />
        <Field
          label="Post Content"
          name="content"
          component={ this.renderField }
        />
        <button type="submit" className="btn btn-primary" >Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = "Please enter a title";
  }

  if(!values.content) {
    errors.content = "Please enter content";
  }

  if(!values.categories) {
    errors.categories = "Please enter a category";
  }


  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostsNew);
