import { 
  BrowserRouter as Router,
  Route,
  Routes,
  

 } from 'react-router-dom'
import '../src/styles/App.css'
import Layout from './layouts/Layout';
import Register from './pages/Register';
import Hero from './components/Hero';
import SignIn from './pages/SignIn';

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
          path="/sign-in"
          element={
            <Layout>
              <SignIn/>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <Hero />
              <h1>Hello Any</h1>
            </Layout>
          }
        />
        <Route path='/logout' 
        element = {
          <Layout>
            <h1>Logout</h1>
          </Layout>
          }/>

      </Routes>
    </Router>
  );
}

export default App
