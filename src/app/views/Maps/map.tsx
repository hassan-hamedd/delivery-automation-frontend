/*
 * Copyright 2021 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */

import * as React from 'react'
import DraggableList from 'react-draggable-lists'
import * as ReactDom from 'react-dom'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { createCustomEqual } from 'fast-equals'
import { isLatLngLiteral } from '@googlemaps/typescript-guards'
import TransferList from './TransferList'
import locationData from './locationData.js'; 
import driverData from './driverData.js'; 
import items from './DB/items.json';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Navigate, useNavigate } from 'react-router-dom'
import RenderMap from './RenderMap'
import axiosInstance from "axios";

const render = (status: Status) => {
    return <h1>{status}</h1>
}

const Asssignment: React.VFC = () => {
    const navigate = useNavigate()
    // Popover State
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [popover, setPopover] = React.useState(null)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
        setPopover(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    // End of Popover State
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([])
    const [zoom, setZoom] = React.useState(7) // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 23.4241,
        lng: 53.8478,
    })

    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng!])
    }

    const onIdle = (m: google.maps.Map) => {
        console.log('onIdle')
        setZoom(m.getZoom()!)
        setCenter(m.getCenter()!.toJSON())
    }

    //Date Picker state
    const [selectedDate, setSelectedDate] = React.useState(null)
    function handleDateChange(date) {
        setSelectedDate(date)
        console.log("Date is: ", new Date(Date.parse(date)));
    }

    //Select Driver State
    const handleChangeDeliveryStatus = (event) => {
        // setDriver(event.target.value)
    }
    const [driverName, setDriverName] = React.useState('');
    const [driverID, setDriverID] = React.useState('');
    const [vehicleNumber, setVehiculeNumber] = React.useState('');
    const [vehicleID, setVehiculeID] = React.useState('');

    const [driversData, setDriversData] = React.useState<any>([]);
    const [vehiclesData, setVehiclesData] = React.useState<any>([]);

    React.useEffect(() => {
        const getDeliveryData = async () => {
            try {
                const res = await fetch('https://delivery-automation-backend.vercel.app/api/v1/deliveries/get-data-for-delivery');

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await res.json();

                console.log("Delivery Info response: ", result);

                setDriversData(result.drivers);
                setVehiclesData(result.cars);
            } catch (err) {
                console.error("Couldn't fetch the data for delivery", err);
            }
        };

        getDeliveryData();
    }, []);


    //Select cars State
    const handleChangeCar = (event) => {
        setCar(event.target.value)
    }
    const [car, setCar] = React.useState('ford')
    var carArray = [
        {
            name: '311',
        },
        {
            name: '58',
        },
        {
            name: '20416',
        },
    ]
    const subscribarList = [
        {
            name: 'Ilyas Ahmad',
            status: 'available',
            vehicles: [
                {
                    name: 'ford',
                },
                {
                    name: 'mitsubishi',
                },
                {
                    name: 'HINO',
                },
            ],
        },
        {
            name: 'Waqas Ali',
            status: 'unavailable',
            vehicles: [
                {
                    name: 'ford',
                },
                {
                    name: 'mitsubishi',
                },
                {
                    name: 'HINO',
                },
            ],
        },
        {
            name: 'Waqas Ali',
            status: 'sick',
            vehicles: [
                {
                    name: 'ford',
                },
                {
                    name: 'mitsubishi',
                },
                {
                    name: 'HINO',
                },
            ],
        },
        {
            name: 'Guldad Khan',
            status: 'unavailable',
            vehicles: [
                {
                    name: 'ford',
                },
                {
                    name: 'mitsubishi',
                },
                {
                    name: 'HINO',
                },
            ],
        },
        {
            name: 'Rajab Ali',
            status: 'available',
            vehicles: [
                {
                    name: 'ford',
                },
                {
                    name: 'mitsubishi',
                },
                {
                    name: 'HINO',
                },
            ],
        },
        {
            name: 'Rajab Ali',
            status: 'unavailable',
            vehicles: [
                {
                    name: 'ford',
                },
                {
                    name: 'mitsubishi',
                },
                {
                    name: 'HINO',
                },
            ],
        },
    ]

    const [routes, setRoutes] = React.useState<any[]>([]);
    const [confirmedInvoices, setConfirmedInvoices] = React.useState<any[]>([]);
    const [matchedDrivers, setMatchedDrivers] = React.useState<any[]>([]);
    const [matchedVehicles, setMatchedVehicles] = React.useState<any[]>([]);
    const [invoices, setInvoices] = React.useState<any[]>([]);
    const [productsWeight, setProductsWeight] = React.useState(0);
    const [productsVolume, setProductsVolume] = React.useState(0);
    const [locationRoutes, setLocationRoutes] = React.useState<any[]>([]);
    const [clickedOnMap, setClickedOnMap] = React.useState<boolean>(false);

    async function createDelivery(vehicleID, driverID, confirmedInvoices) {
        try {
          const response = await axiosInstance.post('https://delivery-automation-backend.vercel.app/api/v1/deliveries/create', {
            car: `${vehicleID}`,
            driver: `${driverID}`,
            invoices: confirmedInvoices.map((invoice) => `${invoice._id}`),
            locations: locationRoutes
          });
      
          // Check if the request was successful (status code 200)
          if (response.status === 200) {
            console.log(response.data);
            if(response.data.msg === "delivery created") {
                alert("Delivery was successfully created");
            }
          } else {
            console.error(`Request failed with status: ${response.status}`);
            // You can handle other error cases as needed
          }
        } catch (error) {
          console.error('An error occurred:', error);
          // Handle the error gracefully, e.g., display an error message to the user
        }
      }
    

    function checkStringPart(str1, str2) {
        return str1.includes(str2) || str2.includes(str1);
    }
    
    function checkStringPart2(str1, str2, str3) {
        return str1.includes(str2) || str2.includes(str1) || str1.includes(str3) || str3.includes(str1) || str2.includes(str3) || str3.includes(str2);
    }

    function removeFirstTwoDigits(number) {
        if(number === undefined) return;
        return parseInt(number.toString().substring(2));
    }
    
      
    const maxWeight = 10000;

    function getBestVehicles(invoice) {
        if(invoice === undefined) return;
        let bestVehicles = [];
        let vehiclesInCity = [];
    
        const address = invoice.deliveryAddress;
        // console.log(address);
    
        const fliteredLocations = locationData.filter(location => {
            if(checkStringPart2(location.city.toLowerCase(), address.toLowerCase(), invoice.customerName.toLowerCase())) {
                for (const value of Object.values(location)) {
                    console.log("VALUE IS:", value)
                    if (typeof(value) === "string" && checkStringPart(value.toLowerCase(), address.toLowerCase()) === true) {
                        return location;
                    }
                }
            }
        })

        if(fliteredLocations.length === 0) {
            return locationData.map(location => {
                return {plate_no: `${location.plate_no}`, vehicle_code: `${location.vehicle_code}`}
            });
        }

        console.log("FILTERED VEHICLES", fliteredLocations.map(location => {
            return {plate_no: `${location.plate_no}`, vehicle_code: `${location.vehicle_code}`}
        }))
    
        return fliteredLocations.map(location => {
            return {plate_no: `${location.plate_no}`, vehicle_code: `${location.vehicle_code}`}
        })
    
    }

    function getMatchedDrivers(bestVehicles) {
        let loggedDrivers: any[] = [];
        if (bestVehicles === undefined) return;
        bestVehicles.forEach(vehicle => {
          driverData.forEach(driver => {
            // console.log(`Vehicle plate no: ${vehicle.plate_no}\nDriver plate no: ${driver.plate_no}`);
            if (`${vehicle.plate_no}` === `${driver.plate_no}`) {
              loggedDrivers.push({
                plate_no: driver.plate_no,
                vehicle_code: removeFirstTwoDigits(driver.vehicle_code),
                firstDriver: driver.driver_1_name,
                secondDriver: driver.driver_2_name,
                thirdDriver: driver.driver_3_name,
                model: driver.model,
              });
            }
          });
        });
        console.log("Matched drivers are:", loggedDrivers);
        const matchedDrivers : any[] = [];
        const matchedVehicles : any[] = [];
        loggedDrivers.forEach(match => {
            matchedDrivers.push(match.firstDriver);
            matchedDrivers.push(match.secondDriver);
            matchedDrivers.push(match.thirdDriver);
            matchedVehicles.push(match.plate_no);
        })

        return {
            matchedDrivers: removeDuplicates(matchedDrivers).slice(0, 4),
            matchedVehicles: removeDuplicates(matchedVehicles).slice(0, 3)
        }
      }

      function removeDuplicates(arr) {
        return Array.from(new Set(arr));
      }




    function calculateProductsWeightAndVolume(delivery, invoices, items) {
        let totalProductsWeight = 0;
        let totalProductsVolume = 0;
        
        for (let i = 0; i < delivery.length; i++) {
            const invoiceNumber = delivery[i].invoiceNumber;
            const invoice = invoices.find(inv => inv.invoiceNumber === invoiceNumber);
        
            if (invoice) {
            const products = invoice.products;
        
            for (let j = 0; j < products.length; j++) {
                const productCode = products[j].productCode;
                const productQuantity = parseInt(products[j].productQuantity);
        
                const item = items.find(itm => itm.prodCode === productCode);
        
                if (item) {
                const unitWeight = parseFloat(item.unitWeight);
                totalProductsWeight += unitWeight * productQuantity;
        
                const uomDesc = item.UOM_DESC;
                const uomParts = uomDesc.split(" ");
                const uomQuantity = parseFloat(uomParts[0]);
                const uomUnit = uomParts[1].toUpperCase();
        
                if (uomUnit === "LTR") {
                    totalProductsVolume += uomQuantity * productQuantity;
                } else if (uomUnit !== "LTR") {
                    totalProductsVolume += (uomQuantity / 1000) * productQuantity;
                }
                }
            }
            }
        }
        
        return { totalProductsWeight, totalProductsVolume };
    }
      



    React.useEffect(() => {
        const res = axiosInstance.post("https://delivery-automation-backend.vercel.app/api/v1/cars/findByPlateNumber", {
            plateNumber: vehicleNumber
        })
        .then((res) => {
            console.log("Vehicle ID Found", res);
            setVehiculeID(res.data.car._id);
        })
    }, [vehicleNumber])      
    
    React.useEffect(() => {
        const res = axiosInstance.post("https://delivery-automation-backend.vercel.app/api/v1/driver/findByName", {
            driverName: driverName
        })
        .then((res) => {
            console.log("RES:", res.data.driver);
            setDriverID(res.data.driver._id);
        })
    }, [driverName])      


    React.useEffect(() => {
        const bestVehicles = getBestVehicles(confirmedInvoices[0]);
        const matches : any = getMatchedDrivers(bestVehicles);
        if(matches === undefined) return;
        setMatchedDrivers(matches?.matchedDrivers);
        setMatchedVehicles(matches?.matchedVehicles);
        
        setRoutes(confirmedInvoices.filter((invoice) => {
            return invoice.deliveryAddress.length > 0
        }).map((invoice, index) => ({
            id: index + 1,
            customer: invoice.customerName,
            address: invoice.deliveryAddress,
            invoiceNumber: invoice.invoiceNumber,
        }))) 
        console.log("ROUTES:", confirmedInvoices.filter((invoice) => {
            return invoice.deliveryAddress.length > 0
        }).map((invoice, index) => ({
            id: index + 1,
            customer: invoice.customerName,
            address: invoice.deliveryAddress,
            invoiceNumber: invoice.invoiceNumber,
        })))
        console.log("CONFIRMED INVOICES:", confirmedInvoices);

        const { totalProductsWeight, totalProductsVolume } = calculateProductsWeightAndVolume(confirmedInvoices, invoices, items);
        console.log("TotalProductsWeight:", totalProductsWeight);
        setProductsWeight(totalProductsWeight);
        console.log("TotalProductsVolume:", totalProductsVolume);
        setProductsVolume(totalProductsVolume);
    }, [confirmedInvoices]);

    const filteredDriversData = driversData.filter((driver: any) => driver.driverName);
    const filteredVehiclesData = vehiclesData.filter((vehicle: any) => vehicle.vehiculeCode);


    const form = (
        <div
            style={{
                padding: '1rem',
                display: 'grid',
                placeItems: 'center',
                height: 'auto',
                overflow: 'auto',
                width: '100vw',
            }}
        >
            <div style={{ position: 'relative' }}>
                <h1 style={{ textAlign: 'center', paddingBottom: '4vh' }}>
                    Delivery Confirmation
                </h1>
                <h3 style={{ fontWeight: 'normal', marginBottom: 0 }}>
                    Confirm the invoices to be included in this
                    delivery:
                </h3>

                <div style={{ width: '100%' }}>
                    <TransferList setConfirmedInvoices={setConfirmedInvoices} setInvoices={setInvoices} />
                </div>
                {confirmedInvoices.length !== 0 && (
                    <>
                        {filteredDriversData.length === 0 || filteredVehiclesData.length === 0 ? (
                            <Typography
                                width="100%"
                                fontSize={25}
                                fontWeight={300}
                                color="#11142D"
                                textAlign="center"
                                mt={4}
                                mb={4}
                                fontFamily="Poppins, sans-serif"
                            >
                                There are no drivers or vehicles in the database. 
                                <span style={{ fontSize: 15, display: 'block' }}>
                                    Please make sure that there is at least 1 complete dataset for a driver and a vehicle in order to create a delivery.
                                </span>
                            </Typography>
                        ) :(
                            <Grid
                                container
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Grid item width="100%">
                                    <div
                                        style={{
                                            width: '100%',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <h3 style={{ fontWeight: 400, textAlign: 'left', width: '100%' }}>
                                            Confirm the Driver and Vehicle to be assigned to this
                                            delivery:
                                        </h3>
                                    </div>
                                    <div
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '50%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
        
                                            <h3>Confirm Driver</h3>
                                            <FormControl sx={{ marginTop: 1, width: '90%' }}>
                                                <Select
                                                    native
                                                    defaultValue="Ilyas Ahmad"
                                                    id="grouped-native-select"
                                                    onChange={(e) => {
                                                        console.log("Selected driver is: ", e.target.value);
                                                        setDriverName(e.target.value);
                                                    }}
                                                >
                    
                                                    {matchedDrivers.map((driver, index) => {
                                                        return (
                                                            <option key={index} value={driver}>
                                                                {driver}
                                                            </option>
                                                        );
                                                    })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </div>
        
                                        <div
                                            style={{
                                                width: '50%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <h3>Confirm Vehicle</h3>
                                            <FormControl sx={{ marginTop: 1, width: '90%' }}>
                                                <Select
                                                    native
                                                    defaultValue="Ford"
                                                    id="grouped-native-select"
                                                    onChange={(e) => {
                                                        console.log("Selected vehicle is: ", e.target.value);
                                                        setVehiculeNumber(e.target.value);
                                                    }}
                                                >
                                                    {matchedVehicles.map((vehicle, index) => {
                                                        return (
                                                            <option key={index} value={vehicle}>
                                                                {vehicle}
                                                            </option>
                                                        );
                                                    })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </Grid>
                                <div
                                    style={{
                                        position: 'relative',
                                        display: 'flex',
                                        width: '100%',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <h3 style={{ fontWeight: 'normal',width: '100%', textAlign: 'left', marginTop: '40px' }}>
                                        Confirm the Date and Time of this delivery:
                                    </h3>
        
                                    <div
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div
                                                style={{
                                                    width: '50%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <h3 style={{ fontSize: 16, fontWeight: 500, textAlign: 'center', marginTop: 0 }}>
                                                    Delivery Date
                                                </h3>
                                                <DatePicker
                                                    sx={{ width: '90%' }}
                                                    label="Confirm delivery date"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                />
                                            </div>
                                        </LocalizationProvider>
        
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div
                                                style={{
                                                    width: '50%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <h3 style={{ fontSize: 16, fontWeight: 500, textAlign: 'center', marginTop: 0 }}>
                                                    Delivery Time
                                                </h3>
                                                <TimePicker
                                                    sx={{ width: '90%' }}
                                                    label="Confirm delivery time"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                />
                                            </div>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                
                                <br />
                                <br />
                                <br />
                                <br />
                                <Grid item style={{ marginTop: '30px', width: '100%' }}>
                                    
                                    <h3 style={{ fontWeight: 'normal' }}>
                                        {confirmedInvoices.length > 0 ? "Confirm the order of this delivery:" : "Please confirm selected invoices to view delivery's invoice order and routes" }
                                    </h3>
                                    {confirmedInvoices.length > 0 && (
                                        <h3>View Route</h3>
                                    )}
                                    {confirmedInvoices.length > 0 && (
                                        <DraggableList width={500} height={50} rowSize={1}>
                                            {confirmedInvoices.map((invoice, index) => ({
                                                id: index + 1,
                                                customer: invoice.customerName,
                                                address: invoice.deliveryAddress,
                                                invoiceNumber: invoice.invoiceNumber,
                                            })).map((item, index) => (
                                                <li style={{ cursor: 'pointer' }} key={index}>
                                            
                                                
                                                    {item.address}
        
                                                    <span style={{marginRight:"10px"}}></span>
                                                    
        
                                                    {item.invoiceNumber}
                                                    <span style={{marginRight:"10px"}}></span>
                                                    
                                                    {item.customer}
                                                </li>
                                            ))}
                                        </DraggableList>
                                    )}
                                </Grid>
                                <Grid item xs={12} style={{ padding: '0vh 0 0vh 0vh', marginTop: '25px', marginBottom: '30px' }}>
                                {locationRoutes.length > 0 && clickedOnMap ? (
                                    locationRoutes.map((location): any => (
                                        <p><b>From {location.start_address}, to {location.end_address}:</b> Estimated distance: {location.distance}/ Estimated time: {location.duration}</p>
                                    ))
                                ) : null}
                                </Grid>
                                <Button
                                    disabled={confirmedInvoices.length === 0}
                                    size="small"
                                    variant="contained"
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bolder',
                                        border: 'none',
                                    }}
                                    onClick={(e) => {
                                        console.log(`car: ${vehicleID},\ndriver: ${driverID} invoices: [${confirmedInvoices.map((invoice) => `${invoice._id},\n`)}]`);
                                        if(confirmedInvoices.length === 0) {
                                            return alert("You need to select the invoices for the delivery prior to viewing routes")
                                        }
                                        setClickedOnMap(true);
                                        let element: HTMLElement =
                                            document.getElementsByClassName(
                                                'button button-primary'
                                            )[0] as HTMLElement
                                        element.click()
                                        console.log('clicked')
                                        window.scrollBy(0, -2000)
                                    }}
                                >
                                    View Map Routes
                                </Button>
                                
                                <Button
                                    disabled={!clickedOnMap}
                                    size="small"
                                    variant="contained"
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bolder',
                                        border: 'none',
                                        marginLeft: '15px'
                                    }}
                                    onClick={() => {
                                        if(vehicleNumber.length === 0) {
                                            return alert("You need to select a vehicle prior to creating a delivery")
                                        }
                                        if(driverName.length === 0) {
                                            return alert("You need to select a driver prior to creating a delivery")
                                        }
                                        if(confirmedInvoices.length === 0) {
                                            return alert("You need to select the invoices for the delivery prior to creating one")
                                        }
                                        setClickedOnMap(false);
                                        createDelivery(91979, 82492, confirmedInvoices);
                                    }}
                                >
                                    Confirm Delivery
                                </Button>
                            </Grid>
                        )}
                    </>
                )}
            </div>
        </div>
    )

    return (
        <>
            <div style={{ display: 'flex' }}>
                {/* <Wrapper
                apiKey="AIzaSyCGA-M9K1SQ0-rzaXVHzxmHOGIlrVmTwkg"
                render={render}
                libraries={['places']}
            >
                <Map
                    center={center}
                    onClick={onClick}
                    onIdle={onIdle}
                    zoom={zoom}
                    style={{ flexGrow: '.8', height: '100%' }}
                >
                    {clicks.map((latLng, i) => (
                        <Marker key={i} position={latLng} />
                    ))}
                </Map>
            </Wrapper> */}

                {/* Basic form for controlling center and zoom of map. */}
                {form}
            </div>
            {confirmedInvoices.length !== 0 && (
                <div>
                    <RenderMap setLocationRoutes={setLocationRoutes} invoices={confirmedInvoices} />
                </div>
            )}
        </>
    )
}
interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: React.ReactElement<google.maps.MarkerOptions>;
}

const Map: React.FC<MapProps> = ({
    onClick,
    onIdle,
    children,
    style,
    ...options
}) => {
    const ref = React.useRef<HTMLDivElement>(null)
    const [map, setMap] = React.useState<google.maps.Map>()

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}))
        }
    }, [ref, map])

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options)
        }
    }, [map, options])

    React.useEffect(() => {
        if (map) {
            ;['click', 'idle'].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            )

            if (onClick) {
                map.addListener('click', onClick)
            }

            if (onIdle) {
                map.addListener('idle', () => onIdle(map))
            }
        }
    }, [map, onClick, onIdle])

    return (
        <>
            <div ref={ref} style={style} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, { map })
                }
            })}
        </>
    )
}

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>()

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker())
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null)
            }
        }
    }, [marker])

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options)
        }
    }, [marker, options])

    return null
}

const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a: any, b: any) => {
        if (
            isLatLngLiteral(a) ||
            a instanceof google.maps.LatLng ||
            isLatLngLiteral(b) ||
            b instanceof google.maps.LatLng
        ) {
            return new google.maps.LatLng(a).equals(new google.maps.LatLng(b))
        }

        // TODO extend to other types

        // use fast-equals for other objects
        return deepEqual(a, b)
    }
)

function useDeepCompareMemoize(value: any) {
    const ref = React.useRef()

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value
    }

    return ref.current
}

function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
) {
    React.useEffect(callback, [useDeepCompareMemoize, callback])
}

export default Asssignment
