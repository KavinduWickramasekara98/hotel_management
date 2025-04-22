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
import AddHotel from './pages/AddHotels';
import { useAppContext } from './contexts/AppContexts';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';

function App() {
  const {isLoggedIn} = useAppContext();
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
              <Search />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
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
        <Route
          path="/logout"
          element={
            <Layout>
              <h1>Logout</h1>
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel/>
                </Layout>
              }
            />

            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />

          </>
        )}
      </Routes>
    </Router>
  );
}

export default App
