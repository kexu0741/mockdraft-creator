import React, {Fragment} from 'react';
import './App.css';

// import components
import RegisterUser from "./components/RegisterUser";

function App() {
  return (<Fragment>
    <div className="container">
    	<RegisterUser/>
    </div>
  </Fragment>
  );
}

export default App;
