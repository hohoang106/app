import React from 'react'
import axios from 'axios'


class ListTitle  extends React.Component {
    state = {
        items : []
    }
    
    componentDidMount() {
        axios.get('http://localhost:4000/app/getAllSubmitNotCheck').then(res => {
            this.setState({
                items: res.data
            })
        })
    }
    handleApproved (itemId) {
        const {items} = this.state
        axios.patch(`http://localhost:4000/app/getAllSubmitNotCheck/${itemId}`).then(res => {
            this.setState({
                items: items.filter(item => item._id !== res.data.data._id)
            })
        })
    }

    render() {
        const {items} = this.state
        return (
           <>
            {items.length == 0 && <h1>No Item</h1>}
            {items.length > 0 &&  <table className="table">
                <thead>
                    <tr>
                        <th >Full Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(item => (
                        <tr key={item._id}>
                            <td>
                                <p>Tite: {item.title}</p>
                                <p>Description: {item.description}</p>
                                <p>Status: {item.isChecked === true ? "Approved" : "Not Approved"}</p>
                                < button className = "btn btn-primary"
                                onClick = {
                                    () => this.handleApproved(item._id)
                                } >
                                    Approved 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
            
           </>

        )
    }
}


export default ListTitle;