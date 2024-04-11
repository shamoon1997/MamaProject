import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookDetailsPage from './BookDetailsPage'; // Import the BookDetailsPage component
import { Home } from './Home';

function App() {
  return (
    <div className="container">
      <h1>Books</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route exact path="/book/:id" element={<BookDetailsPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
