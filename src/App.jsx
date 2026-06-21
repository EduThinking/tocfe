import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cloud from './pages/Cloud';
import Branch from './pages/Branch';
import TargetTree from './pages/TargetTree';
import Cases from './pages/Cases';
import Books from './pages/Books';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cloud" element={<Cloud />} />
          <Route path="branch" element={<Branch />} />
          <Route path="target-tree" element={<TargetTree />} />
          <Route path="cases" element={<Cases />} />
          <Route path="books" element={<Books />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
