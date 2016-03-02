import React, { Component } from 'react';
import _ from "lodash";

import Pagination from './Pagination';
// import { Pagination } from 'react-bootstrap';

class Table extends Component {

    renderRow(rowData){
        let row = [], { columns } = this.props;;
        row = columns.map((item, index) =>
            <td key={index} column={index}>{rowData[item.field]}</td>
        );
        return row;
    }

    // 生成列头
    renderHeader(){
        let { columns, checkbox, options } = this.props;
        let columnList = [];

        columnList = columns.map((item, index) => {
            let style = {};
            if(item.width) {
                style["width"] = item.width;
            }

            return (<th key={index} style={style}>{item.text}</th>);
        });

        return (
            <thead>
                <tr>
                    { checkbox ? <th style={{width: "25px"}}><input type="checkbox"/></th> : "" }
                    { columnList }
                    { _.isEmpty(options) ? "" : <th style={{width: "25px"}}>操作</th> }
                </tr>
            </thead>
        );
    }

    renderOptions(id){
        let optionList, buttonList = [], { options } = this.props;
        if(_.isEmpty(options)) {
            optionList = '';
        } else {
            buttonList = options.map((item, index) =>
                <button key={index} className="btn btn-xs" 
                    style={{"marginRight":"5px"}}
                    onClick={item.handle.bind(this, id)} >{item.text}
                </button>
            );

            optionList = (
                <td>
                    { buttonList }
                </td>
            );
        }

        return optionList;
    }

    render(){
        let { data, searchHandle, checkbox, toolbar } = this.props;
        let list = data.data || [];
        return (
            <div>
                { toolbar }
                <table className="table table-hover table-condensed">
                    { this.renderHeader() }
                    <tbody>
                    {
                        list.map((item, index) =>
                            <tr key={index}>
                                { checkbox ? <td><input type="checkbox" value={item.id}/></td> : "" }
                                { this.renderRow(item) }
                                { this.renderOptions(item.id) }
                            </tr>
                        )
                    }
                    </tbody>
                </table>

                <Pagination
                    prev
                    next
                    items={data.totalPages}
                    maxButtons={6}
                    activePage={data.currentPage}
                    onSelect={searchHandle} 
                />
            </div>
        );
    }
}

Table.defaultProps = {
    checkbox: false,
    columns: [],
    options: [],
    toolbar: false,
    data: {}
}

export default Table
