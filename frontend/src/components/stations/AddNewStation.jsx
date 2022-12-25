import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";

/**
 * A component that displays a form for adding a new station, and handles the submission of the form.
 * @param {Function} postNewStation - A function that sends a request to add a new station with the data from the form.
 * @return {JSX.Element} The `Form` element with the form fields and submit button.
 */
const AddNewStation = ({postNewStation}) => {

    const defaultObject = {
        ID : '',
        Nimi : "",
        Namn : "",
        Name : "",
        Osoite: "",
        Address: "",
        Kaupunki : "",
        Stad: "",
        Operaattor : "",
        Kapasiteet : 1,
        x : 1.1,
        y : 1.1
    }

    const [objectToPost,setObjectToPost] = useState(defaultObject);


    const handleSubmit = (event) => {
        event.preventDefault();
        postNewStation(objectToPost);
        setObjectToPost(defaultObject);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <br/>
            <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>ID</Form.Label>
                <Form.Control type="number" placeholder="Enter ID"
                              value={objectToPost.ID}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      ID: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                    ID is required,  please put it in an integer format
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNimi">
                <Form.Label>Nimi</Form.Label>
                <Form.Control type="text" placeholder="Enter Nimi"
                              value={objectToPost.Nimi}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      Nimi: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                    Nimi,Namn,Name : at least one of them is required
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Namn">
                <Form.Label>Namn</Form.Label>
                <Form.Control type="text" placeholder="Enter Namn"
                              value={objectToPost.Namn}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      Namn: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                    Nimi,Namn,Name : at least one of them is required
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name"
                              value={objectToPost.Name}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      Name: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                    Nimi,Namn,Name : at least one of them is required
                </Form.Text>
            </Form.Group>


            <Form.Group className="mb-3" controlId="Osoite">
                <Form.Label>Osoite</Form.Label>
                <Form.Control type="text" placeholder="Enter Osoite"
                              value={objectToPost.Osoite}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      Osoite: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Address"
                              value={objectToPost.Address}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      Address: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Kaupunki">
                <Form.Label>Kaupunki</Form.Label>
                <Form.Control type="text" placeholder="Enter Kaupunki"
                              value={objectToPost.Kaupunki}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      Kaupunki: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>


            <Form.Group className="mb-3" controlId="Stad">
                <Form.Label>Stad</Form.Label>
                <Form.Control type="text" placeholder="Enter Stad"
                              value={objectToPost.Stad}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      Stad: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Operaattor">
                <Form.Label>Operaattor</Form.Label>
                <Form.Control type="text" placeholder="Enter Operaattor"
                              value={objectToPost.Operaattor}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      Operaattor: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>


            <Form.Group className="mb-3" controlId="Kapasiteet">
                <Form.Label>Kapasiteet</Form.Label>
                <Form.Control type="number" placeholder="Enter Kapasiteet"
                              value={objectToPost.Kapasiteet}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      Kapasiteet: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                    Please put it in an integer format
                </Form.Text>
            </Form.Group>


            <Form.Group className="mb-3" controlId="x">
                <Form.Label>x</Form.Label>
                <Form.Control type="number" placeholder="Enter x"
                              value={objectToPost.x}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      x: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                    Please put x in a float format
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="y">
                <Form.Label>y</Form.Label>
                <Form.Control type="number" placeholder="Enter x"
                              value={objectToPost.y}
                              onChange={(e)=> setObjectToPost((prevState => ({
                                      ...prevState,
                                      y: e.target.value
                                  })
                              ))}
                />
                <Form.Text className="text-muted">
                    Please put y in a float format
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default AddNewStation;
