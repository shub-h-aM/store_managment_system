import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import Form from 'react-bootstrap/Form';

class InvoiceItem extends React.Component {
    render() {
        const { onItemizedItemEdit, currency, onRowDel, items = [], availableItems = [], onRowAdd } = this.props;

        const itemTable = items.map((item, index) => (
            <ItemRow
                key={item.id}
                onItemizedItemEdit={onItemizedItemEdit}
                item={item}
                index={index}
                currency={currency}
                onDelEvent={onRowDel}
                availableItems={availableItems}
                onRowAdd={onRowAdd}
            />
        ));

        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>S.No.</th>
                        <th> &nbsp; &nbsp; &nbsp;ITEM DESCRIPTION</th>
                        <th>QUANTITY</th>
                        <th>PRICE/RATE</th>
                        <th>TOTAL</th>
                        <th className="text-center">ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                    {itemTable}
                    </tbody>
                </Table>
                <Button className="fw-bold btn-secondary" onClick={this.props.onRowAdd}>
                    <IoIosAddCircle style={{ paddingBottom: "-4px", marginBottom: "3px" }} /> Item
                </Button>
            </div>
        );
    }
}

class ItemRow extends React.Component {
    onDelEvent = () => {
        this.props.onDelEvent(this.props.item);
    }

    render() {
        const { item, index, currency, availableItems = [], onItemizedItemEdit, onRowAdd } = this.props;
        console.log(availableItems)
        // console.log(item_name)

        return (
            <tr>
                <td>{index + 1}</td>
                <td style={{ width: '100%' }}>
                    <Form.Select
                        value={item.name}
                        onChange={(e) => {
                            const selectedItem = availableItems.find(i => i.item_name === e.target.value);
                            if (selectedItem) {
                                onRowAdd(selectedItem);
                            }
                        }}
                    >
                        <option>Select Item</option>
                        {availableItems.map(availableItem => (
                            <option key={availableItem.id} value={availableItem.item_name}>
                                {availableItem.item_name}
                            </option>
                        ))}
                    </Form.Select>
                </td>
                <td style={{ minWidth: '70px' }}>
                    <Form.Control
                        type="number"
                        name="quantity"
                        id={item.id}
                        value={item.quantity}
                        onChange={onItemizedItemEdit}
                    />
                </td>
                <td style={{ minWidth: '130px' }}>
                    <Form.Control
                        type="number"
                        name="price"
                        id={item.id}
                        value={item.price}
                        onChange={onItemizedItemEdit}
                    />
                </td>
                <td style={{ minWidth: '130px',paddingTop: '15px',paddingLeft: '25px'}}>
                    {currency}{(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="text-center" style={{ minWidth: '50px' }}>
                    <BiTrash
                        onClick={this.onDelEvent.bind(this)}
                        style={{ height: '33px', width: '33px', padding: '7.5px' }}
                        className="text-white mt-1 btn btn-danger"
                    />
                </td>
            </tr>
        );
    }
}

export default InvoiceItem;
