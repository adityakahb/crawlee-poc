import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [site, setSite] = useState(0);

  const scanSite = (sitename) => {};

  const changeSite = (event) => {
    setSite(event.target.value);
    if (event.target.value) {
      scanSite(event.target.value);
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="siteselector">Select a Site</Form.Label>
          <Form.Select id="siteselector" onChange={(e) => changeSite(e)}>
            <option value="">Select One</option>
            <option value="breedon">Breedon</option>
            <option value="imperial">Imperial</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default App;
