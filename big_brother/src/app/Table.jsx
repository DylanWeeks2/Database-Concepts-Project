import React from 'react'

export class BBTable extends React.Component {
    state = {
        headers: [],
        rows: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers,
            rows: this.props.rows
        }
    }

    
    render() {
        return (
            <>
                <Table headers={this.state.headers} rows={this.state.rows}/>
            </>
          );
    }

}

const Table = props => (
    <table>
        <thead>
            <tr>
                {props.headers.map(h => (
                    <th>{h}</th>
                ))}
            </tr>
        </thead>

        <tbody>
            {props.rows.map(row =>
                <tr>
                    row.map(col =>
                      <td>{col}</td>  
                    );
                </tr>
            )}
        </tbody>
    </table>
);