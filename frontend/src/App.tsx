import { 
  BrowserRouter as Router,
  Route,
  Routes,
  

 } from 'react-router-dom'
import '../src/styles/App.css'
import Layout from './layouts/Layout';

function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <h1>Hello Root</h1>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <h1>Hello Search </h1>
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <h1>Hello Any</h1>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App
