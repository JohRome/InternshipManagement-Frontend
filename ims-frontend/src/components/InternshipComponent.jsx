import React, { useEffect, useState } from 'react';
import { createInternship, getInternship, updateInternship } from '../services/InternshipService';
import { useNavigate, useParams } from 'react-router-dom';

const InternshipComponent = () => {

    const [companyName, setCompanyName] = useState('');
    const [description, setDescription] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [hasApplied, setHasApplied] = useState(false);

    const { id } = useParams();
    const [errors, setErrors] = useState({
        companyName: '',
        description: '',
        /* contactPerson: '' */
    })

    const navigator = useNavigate();

    useEffect(() => {

        if (id) {
            getInternship(id).then((response) => {
                setCompanyName(response.data.companyName);
                setDescription(response.data.description);
                setContactPerson(response.data.contactPerson);
                setHasApplied(response.data.hasApplied);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    function saveOrUpdateInternship(e) {
        e.preventDefault();

        const internship = { companyName, description, contactPerson, hasApplied };
        console.log(internship);

        if (validateForm()) {

            if (id) {
                updateInternship(id, internship).then((response => {
                    console.log(response.data);
                    navigator('/internships');
                })).catch(error => {
                    console.error(error);
                })
            } else {

                createInternship(internship).then((response) => {
                    console.log(response.data);
                    navigator('/internships')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors }

        if (companyName.trim()) {
            errorsCopy.companyName = '';
        } else {
            errorsCopy.companyName = 'Company name is required';
            valid = false;
        }

        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = 'Description is required';
            valid = false;
        }

        /* if (contactPerson.trim()) {
            errorsCopy.contactPerson = '';
        } else {
            errorsCopy.contactPerson = 'Company name is required';
            valid = false;
        } */

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Internship</h2>
        } else {
            return <h2 className='text-center'>Add Internship</h2>
        }

    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label>Company Name:</label>
                                <input
                                    type="text"
                                    placeholder='Enter Company Name'
                                    value={companyName}
                                    className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                                {errors.companyName && <div className='invalid-feedback'>{errors.companyName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label>Description:</label>
                                <input
                                    type="text"
                                    placeholder='Enter Description'
                                    value={description}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label>Contacted Person:</label>
                                <input
                                    type="text"
                                    placeholder='Enter Contacted Person'
                                    value={contactPerson}
                                    className={`form-control ${errors.contactPerson ? 'is-invalid' : ''}`}
                                    onChange={(e) => setContactPerson(e.target.value)}
                                />
                                {errors.contactPerson && <div className='invalid-feedback'>{errors.contactPerson}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label>Has Applied:</label><br />
                                <div className='form-check form-check-inline'>
                                    <input
                                        type="radio"
                                        id='true'
                                        value='true'
                                        checked={hasApplied === true}
                                        onChange={(e) => setHasApplied(e.target.value === 'true')}
                                        className='form-check-input'
                                    />
                                    <label className='form-check-label' htmlFor='true'>Yes</label>
                                </div>

                                <div className='form-check form-check-inline'>
                                    <input
                                        type="radio"
                                        id='false'
                                        value='false'
                                        checked={hasApplied === false}
                                        onChange={(e) => setHasApplied(e.target.value === 'true')}
                                        className='form-check-input'
                                    />
                                    <label className='form-check-label' htmlFor='false'>No</label>
                                </div>
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateInternship}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InternshipComponent;
