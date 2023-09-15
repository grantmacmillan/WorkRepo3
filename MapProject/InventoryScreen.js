import React, { useState, useEffect, useLayoutEffect } from 'react';
import './InventoryScreen.css'; // INVENTORY SCREEN CSS

const InventoryScreen = () => {

    const [colWidths, setColWidths] = useState([150, 150, 150, 150, 80, 80]);


    const getItemRows = () => {
        return [...Array(10)].map((_, i) => (
            <tr key={i}>
                <td>Item No. {i}</td>
                <td>{i * 5}</td>
                <td>$ {i * 7}</td>
                <td>A paragraph...</td>
                <td style={{ textAlign: 'center' }}><input type='checkbox' /></td>
                <td style={{ textAlign: 'center' }}><button>Delete</button></td>
            </tr>
        ));
    };

    const handleMouseDown = (index) => (e) => {
        e.preventDefault();
        const startX = e.pageX;
        const startWidth = colWidths[index];

        const handleMouseMove = (e) => {
            const moveX = e.pageX - startX;
            const newWidths = [...colWidths];
            newWidths[index] = Math.max(startWidth + moveX, 50);
            setColWidths(newWidths);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'left' }}>Inventory Screen</h1>
            <div style={{ width: '80vw', overflowX: 'scroll' }}>
                <table style={{ tableLayout: 'fixed', width: 'max-content' }}>
                    <thead>
                        <tr>
                            {['Item Name', 'Item Quantity', 'Item Price', 'Item Description', '', ''].map((header, index) => (
                                <th key={index} style={{ width: colWidths[index] + 'px', position: 'relative' }}>
                                    {header}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            width: '5px',
                                            height: '100%',
                                            cursor: 'col-resize',
                                            right: 0,
                                            top: 0,
                                        }}
                                        onMouseDown={handleMouseDown(index)}
                                    ></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {getItemRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryScreen;