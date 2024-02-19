import React, { useEffect, useState } from 'react';
import { deleteInternship, listInternships } from '../services/InternshipService';
import { useNavigate } from 'react-router-dom';

const ListInternshipComponent = () => {
    const [internships, setInternships] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllInternships();
    }, []);

    function getAllInternships() {
        listInternships()
            .then((response) => {
                setInternships(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function addNewInternship() {
        navigator('/add-internship');
    }

    function updateInternship(id) {
        navigator(`/edit-internship/${id}`);
    }

    function removeInternship(id) {
        console.log(id);

        deleteInternship(id)
            .then((response) => {
                getAllInternships();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Internships</h2>
            <button className="btn btn-primary mb-2" onClick={addNewInternship}>
                Add Internship
            </button>
            <table className="table table-light table-bordered">
                <thead>
                    <tr>
                        <th>Company Id</th>
                        <th>Company Name</th>
                        <th>Description</th>
                        <th>Contacted Person</th>
                        <th>Has Applied</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {internships.map((internship) => (
                        <tr key={internship.id}>
                            <td>{internship.id}</td>
                            <td>{internship.companyName}</td>
                            <td style={{ maxWidth: '300px', overflow: 'auto' }}>{internship.description}</td>
                            <td>{internship.contactPerson}</td>
                            <td>{internship.hasApplied ? 'Yes' : 'No'}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => updateInternship(internship.id)}>
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => removeInternship(internship.id)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListInternshipComponent;