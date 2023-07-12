import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Washerman from "./pages/Washerman";
import Start from "./pages/Start";
import Cdashbord from "./pages/Cdashbord";
import Wdashbord from "./pages/Wdashbord";
import Uaorder from "./pages/Uaorder";
import OrderDetail from "./pages/OrderDetail";
import Waorder from "./pages/Waorder";
import Wdorder from "./pages/Wdorder";
import Udorder from "./pages/Udorder";
import Pagenot from "./pages/Pagenot";
import EditOrder from "./pages/editOrder"
import UserProfile from "./pages/UserProfile";
import Usereditprofile from "./pages/Usereditprofile"
import Washprofile from "./pages/Washprofile";
import Washeditprofile from "./pages/Washeditprofile"
import Delivery from "./pages/Deliveryboy";
import DelBoy from "./pages/DelBoy";
import Delboydash from "./pages/Delboydash";
import UserState from "./Context/UserState";
import Header from "./Components/Header";
import Wheader from "./Components/Wheader";
import { useLocation } from 'react-router-dom';
function App() {


  return (
    <>
      <UserState>
        <Router>
          <div>
            {/* <Header/>  */}

            <Routes>
              {/* START PAGE */}
              <Route path="/" element={<Start />} />
              {/* USER  */}
              <Route path="/user" element={<User />} />
              <Route path="/user/dashboard" element={<HeaderWrapper><Cdashbord /></HeaderWrapper>} />
              <Route path="/user/order" element={<HeaderWrapper><Uaorder /></HeaderWrapper>} />
              <Route path="/user/order/done" element={<HeaderWrapper><Udorder /></HeaderWrapper>} />
              <Route path="/user/order/book" element={<OrderDetail />} />
              <Route path="/user/order/edit" element={<EditOrder />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/editprofile" element={<Usereditprofile />} />

              {/* WASHERMAN */}
              <Route path="/washerman" element={<Washerman />} />
              <Route path="/washerman/dashboard" element={<HeaderWrapper><Wdashbord /></HeaderWrapper>} />
              <Route path="/washerman/order" element={<HeaderWrapper><Waorder /></HeaderWrapper>} />
              <Route path="/washerman/order/done" element={<HeaderWrapper><Wdorder /></HeaderWrapper>} />
              <Route path="/washerman/profile" element={<Washprofile />} />
              <Route path="/washerman/editprofile" element={<Washeditprofile />} />
              <Route path="/washerman/deliveryboy" element={<HeaderWrapper><Delivery /></HeaderWrapper>} />

              {/* DELIVERY BOY */}
              <Route path="/deliveryboy" element={<DelBoy />} />
              <Route path="/deliveryboy/dash" element={<Delboydash />} />


              <Route path="/*" element={<Pagenot />} />

            </Routes>

          </div>
        </Router>
      </UserState>
    </>
  );
}

export default App;

function HeaderWrapper(props) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      {['/user/dashboard', '/user/order', '/user/order/done'].includes(currentPath) && (
        <Header />
      )}{['/washerman/dashboard', '/washerman/order', '/washerman/order/done','/washerman/deliveryboy'].includes(currentPath) && (
        <Wheader />
      )}
      {props.children}
    </div>
  );
}