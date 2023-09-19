import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './InventoryScreen.css'; // INVENTORY SCREEN CSS

const InventoryScreen = () => {

    const containerRef = useRef(null);
    const [colWidths, setColWidths] = useState([]);

    //This whole use effect statement is for getting the initial width of the table columns to be the same as the width of the container.
    //The calculations did not account for the margins in the text. So I added them manually.
    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const paddingAndBorderWidth = 18; // 16px for padding and 2px for borders
            const initialColWidth = (containerWidth / 6) - paddingAndBorderWidth;
            setColWidths(Array(6).fill(initialColWidth)); // 6 is the number of columns
            console.log(containerWidth);
            console.log(initialColWidth);
        }
    }, []);


    const getItemRows = () => {
        return [...Array(10)].map((_, i) => (
            <tr key={i}>
                <td>Item No. {i}</td>
                <td>{i * 5}</td>
                <td>$ {i * 7}</td>
                <td>A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs.</td>
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
            <div
                ref={containerRef}
                style={{ width: '80vw', overflowX: 'scroll', border: '5px solid #FFA500' }}
            >
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