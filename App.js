import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import ChatbotPage from './ChatbotPage';
import ChatScreen from './Components/ChatScreen';
// import PlacesLoader from './PlacesLoader';

const App = () => {
  // const apiKey = 'AIzaSyDh59858flyNna9iK7sb9izp-RT1yTZgHM';

  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<ChatScreen />} />
        {/* <Route path="/nearby-places" element={<PlacesLoader apiKey={apiKey} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
