import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";


interface Props
{
children: React.ReactNode;
}
const Layout = ({children}:Props) => {
    return (
    <div className="flex flex-col min-h-screen">
        <Header/>
        <div className="container mx-auto">
            <SearchBar/>
        </div>
        <div className="container mx-auto flex-grow">
            {children}
        </div>
        <Footer/>
    </div>
    )
}
export default Layout;
