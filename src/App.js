import React, { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [jsonString, setJsonString] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleConvertToJson = async() => {
    // console.log("here");
    try {
      var temp = inputText.replace(/\n+/g, '');
      temp = temp.replace(/\s+/g, '');
      
      console.log(`${JSON.stringify(temp)}`)

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin","*");
      myHeaders.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      
      var raw = JSON.stringify({
        "sequence": `${temp}`
      });
      
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw
      };
       
      fetch("http://Last-env.eba-2zttxjs2.us-west-2.elasticbeanstalk.com/sequence/", requestOptions) 
      // fetch("http://localhost:3002/sequence/", requestOptions) 
        .then(response => response.text())
        .then(result => {
          setJsonString((result))
          console.log ((result))
        })
        .catch(error => console.log('error', error));
      
    } catch (error) {
      console.error('Error converting to JSON:', error);
      setJsonString('error');
    }
  };

  return (
    
    <div>
      <br></br>
      <br></br>
      <center>
      <p>Inpur your sequence in the text box </p>
      <input type="textarea" value={inputText} onChange={handleInputChange} />
      <button onClick={handleConvertToJson}>Check</button>
      
      <br></br>
      <br></br>
      <br></br>
      <div>
        <h3>Result:    </h3><pre>{jsonString}</pre>
      </div>
      </center>
    </div>
  );
}

export default App;
