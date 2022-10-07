import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        console.log("hello");
        axios.get(`http://localhost:8080/api/v1/loanpass`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data);
            })


        // // giving in example data
        // const mockupData = [{
        //     "id": '1',
        //     "firstName": "John",
        //     "lastName": "Doe",
        //     "checkbox": true,
        // }];
    
        // console.log(mockupData);
        // setAPIData(mockupData);
    }, []);

    
    

    const setData = (data) => {
        let { passId, attractionId, passNumber, previousLoanBy, description } = data;
        localStorage.setItem('passId', passId);
        localStorage.setItem('attractionId', attractionId);
        localStorage.setItem('passNumber', passNumber);
        localStorage.setItem('previousLoanBy', previousLoanBy);
        localStorage.setItem('description', description);
    }

    const getData = () => {
        axios.get(`http://localhost:8080/api/v1/loanpass`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8080/api/v1/loanpass/${id}`)
        .then(() => {
            getData();
        })
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>passId</Table.HeaderCell>
                        <Table.HeaderCell>attractionId</Table.HeaderCell>
                        <Table.HeaderCell>passNumber</Table.HeaderCell>
                        <Table.HeaderCell>previousLoanBy</Table.HeaderCell>
                        <Table.HeaderCell>description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.passId}</Table.Cell>
                                <Table.Cell>{data.attractionId}</Table.Cell>
                                <Table.Cell>{data.passNumber}</Table.Cell>
                                <Table.Cell>{data.previousLoanBy}</Table.Cell>
                                <Table.Cell>{data.description}</Table.Cell>
                                <Link to='/update'>
                                    <Table.Cell> 
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.passId)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}