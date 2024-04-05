import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';
import {IoIosAddCircle} from "react-icons/io";

class InvoiceItem extends React.Component {
    render() {
        const onItemizedItemEdit = this.props.onItemizedItemEdit;
        const currency = this.props.currency;
        const rowDel = this.props.onRowDel;
        const itemTable = this.props.items.map(function (item, index) {
            return (
                <ItemRow
                    onItemizedItemEdit={onItemizedItemEdit}
                    item={item}
                    onDelEvent={rowDel.bind(this)}
                    key={item.id}
                    currency={currency}
                    serialNumber={index + 1}
                />
            )
        });
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>ITEM</th>
                        <th>QTY</th>
                        <th>PRICE/RATE</th>
                        <th className="text-center">ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                    {itemTable}
                    </tbody>
                </Table>
                <Button className="fw-bold btn-secondary" onClick={this.props.onRowAdd}><IoIosAddCircle style={{paddingBottom :"-4px",marginBottom : "3px"}}/> Item</Button>
            </div>
        );

    }
}

class ItemRow extends React.Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.item);
    }
    render() {
        return (
            <tr>
                <td>{this.props.serialNumber}</td>
                <td style={{width: '100%'}}>
                    <EditableField
                        onItemizedItemEdit={this.props.onItemizedItemEdit}
                        cellData={{
                            type: "text",
                            name: "name",
                            placeholder: "Item name",
                            value: this.props.item.name,
                            id: this.props.item.id,
                        }}/>
                </td>
                <td style={{minWidth: '70px'}}>
                    <EditableField
                        onItemizedItemEdit={this.props.onItemizedItemEdit}
                        cellData={{
                            type: "number",
                            name: "quantity",
                            min: 1,
                            step: "1",
                            value: this.props.item.quantity,
                            id: this.props.item.id,
                        }}/>
                </td>
                <td style={{minWidth: '130px'}}>
                    <EditableField
                        onItemizedItemEdit={this.props.onItemizedItemEdit}
                        cellData={{
                            leading: this.props.currency,
                            type: "number",
                            name: "price",
                            min: 1,
                            step: "0.01",
                            precision: 2,
                            textAlign: "text-end",
                            value: this.props.item.price,
                            id: this.props.item.id,
                        }}/>
                </td>
                <td className="text-center" style={{minWidth: '50px'}}>
                    <BiTrash onClick={this.onDelEvent.bind(this)} style={{height: '33px', width: '33px', padding: '7.5px'}} className="text-white mt-1 btn btn-danger"/>
                </td>
            </tr>
        );

    }

}

export default InvoiceItem;
