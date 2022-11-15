import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Read() {
// popup loading please wait

    const backendDomain = process.env.REACT_APP_backendDomain;
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        console.log("hello");

        // popup loading information from database
        Swal.fire({
            title: 'Loading information from database...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        axios.get(`${backendDomain}/api/v1/attractions`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data);
                Swal.close();
            })


        // // giving in example data
        // const mockupData = [{
        //     "attractionID": 1,
        //         "name": "Zoo",
        //         "description": "Zoo is a really fun place. You get to see the white tiger",
        //         "passType": "Physical",
        //         "replacementFee": 50,
        //         "emailTemplate": "This is a great eamil template. You are warned",
        //         "totalPasses": 100,
        //         "status": "Active"
        // }];
    
        // console.log(mockupData);
        // setAPIData(mockupData);
    }, []);

    
    

    const setData = (data) => {
        let { attractionId, name, description, passType, replacementFee, emailTemplate, totalPasses, status } = data;

        localStorage.setItem('attractionId', attractionId);
        localStorage.setItem('name', name);
        localStorage.setItem('description', description);
        localStorage.setItem('passType', passType);
        localStorage.setItem('replacementFee', replacementFee);
        localStorage.setItem('emailTemplate', emailTemplate);
        localStorage.setItem('totalPasses', totalPasses);
        localStorage.setItem('status', status);
    }

    const getData = () => {
        Swal.fire({
            title: 'Loading information from database...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        axios.get(`${backendDomain}/api/v1/attractions`)
            .then((getData) => {
                setAPIData(getData.data);
                Swal.close();
            })
    }

    const onDelete = (id) => {
        Swal.fire({
            title: 'Loading information from database...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        axios.delete(`${backendDomain}/api/v1/attractions/${id}`)
        .then(() => {
            getData();
            Swal.close();
        })
    }

    return (
        <div style={{"height": "50%"}}>
            {/* button to create loanpass */}
            <Link to="/react/createloanpass">
                <Button primary>Create Loan Pass</Button>
            </Link>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>pass<br/>Id</Table.HeaderCell>
                        <Table.HeaderCell width={1}>att<br/>rac<br/>tion<br/>Id</Table.HeaderCell>
                        <Table.HeaderCell width={1}>pass<br/>Num<br/>ber</Table.HeaderCell>
                        <Table.HeaderCell width={1}>previous<br/>Loan<br/>By</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Status</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Type</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Replace<br/>ment Fee</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Email Template</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Attachment Link</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Update</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        const descriptionSplitted = data.description.split(",./");
                        const status = descriptionSplitted[0];
                        const type = descriptionSplitted[1];
                        const replacementFee = descriptionSplitted[2];
                        let emailTemplate = descriptionSplitted[3];
                        let attachmentLink = descriptionSplitted[4];

                        try {
                            emailTemplate = emailTemplate.slice(0, 10) + "...";
                            attachmentLink = attachmentLink.slice(0, 10) + "...";
                        } catch (error) {
                            console.log(error);
                        }

                        return (
                            <Table.Row>

                                <Table.Cell>{data.attractionId}</Table.Cell>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>{data.description}</Table.Cell>
                                <Table.Cell>{type}</Table.Cell>             {/*to check */}
                                <Table.Cell>{replacementFee}</Table.Cell>
                                <Table.Cell>{emailTemplate}</Table.Cell>
                                <Table.Cell>{attachmentLink}</Table.Cell>
                                <Table.Cell>{status}</Table.Cell>

                                <Link to='/react/update'>
                                    <Table.Cell> 
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.attractionId)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}