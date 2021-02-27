import React, { Component } from 'react';
import ImageListInput from './imageListInput';
import axios from 'axios'


class SubmitForm extends Component {
    state = {
        title: "",
        description: "",
        files: [],
        agree: false
    }

    handleAdd = uri => {
        console.log("uri: ", uri)
        const files = [...this.state.files, uri]
        console.log("new file: ", files)
        this.setState({ files })
        console.log("new state: ", this.state.files)
    }

    changeTitle = event => {
        this.setState({ title: event.target.value })
    }
    changeDescription = event => {
        this.setState({ description: event.target.value })
    }
    checkboxHandler = () => {
        this.setState({ agree: !this.state.agree })
    }
    onSubmit = event => {
        //event.preventDefault()
        const submit = {
            title: this.state.title,
            description: this.state.description,
            imageFiles: this.state.files,
            email: this.props.email
        }
        console.log("Submit: ", submit)
        axios.post('http://localhost:4000/app/submit', submit).then(response => console.log(response.data));
        this.props.history.push('/mySubmit')
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                    placeholder='Title'
                    onChange={this.changeTitle}
                    value={this.state.title}
                    className="form-control form-group" />
                <input type="text"
                    placeholder='Description'
                    onChange={this.changeDescription}
                    value={this.state.description}
                    className="form-control form-group" />
                <ImageListInput
                    files={this.state.files}
                    onAddImage={uri => this.handleAdd(uri)}
                />
                <div>
                    <input type="checkbox" id="agree" onChange={this.checkboxHandler} />
                    <label>  I agree to <b>terms and conditions</b></label>
                </div>
                <input disabled={!this.state.agree} type="submit" className="btn btn-danger btn-block" value='Submit' />
            </form>
        );
    }
}

export default SubmitForm;