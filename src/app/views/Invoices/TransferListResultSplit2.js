import * as React from 'react'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import itemsData from '../Maps/DB/items.json'

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1)
}

function union(a, b) {
    return [...a, ...not(b, a)]
}

function findProductName(productCode, products) {
    // loop through the products array
    for (let i = 0; i < products.length; i++) {
    // check if the productCode of the current object matches the given productCode
    if (products[i].prodCode === productCode) {
        // return the productName if there is a match
        console.log("Match found for productCode: " + productCode + " productName: " + products[i].prodDesc)
        return products[i].prodDesc;
    }
    }
    // if no match is found, return null or a suitable default value
    console.log("No match found for productCode: " + productCode)
    return productCode;
}

export default function TransferListResultSplit2({ invoice: invoiceProducts, invoiceNumber, indexKey }) {
    function getAlphabetLetter(index) {
        // Convert index to corresponding ASCII code for lowercase letters
        let letterCode = 97 + index;
        
        // Convert ASCII code to actual letter
        let letter = String.fromCharCode(letterCode);
        
        return letter;
    }

    const customList = (title, items) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1, bgcolor: "#F5F5F5" }}
                title={<h1 style={{ fontSize: 15, fontWeight: 800, textAlign: 'center' }}>{title}{getAlphabetLetter(indexKey)}</h1>}
            />
            <List
                sx={{
                    width: 200,
                    height: 230,
                    bgcolor: '#F5F5F5',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value, index) => {
                    const labelId = `transfer-list-all-item-${value.sNumber}-label`

                    return (
                        <ListItem
                            key={index}
                            role="listitem"
                            button
                        >
                            <ListItemText
                                id={labelId}
                                primary={<h2 style={{ fontSize: 13, fontWeight: 700 }}>{findProductName(value.productCode, itemsData)}</h2>}
                                secondary={<p style={{ fontSize: 11, fontWeight: 400 }}>{value.productQuantity}</p>}
                            />
                        </ListItem>
                    )
                })}
                <ListItem />
            </List>
        </Card>
    )

    return (
        <div
            style={{
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                rowGap: '30px',
                columnGap: '20px'
            }}
        >
            <div style={{ marginRight: '30px', marginBottom: '20px' }}>{customList(invoiceNumber, invoiceProducts)}</div>
           
        </div>
    )
}
