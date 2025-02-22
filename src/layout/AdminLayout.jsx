import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../assets/img/Strawberry cake icons created by Mihimihi - Flaticon.png";
import LoadingScreen from "../components/LoadingScreen";
import { useContext, useEffect, useState } from "react";
import { LoadingScreenContext } from "../contexts/loadingScreenContext";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminLayout() {
  const { isLoadingScreen, setIsLoadingScreen } = useContext(LoadingScreenContext);
  const [isAuth, setIsAuth] = useState(false);

  const routes = [
    {
      path: '/admin/products',
      name: 'Product list',
      icon: 'bi-list-stars'
    },
    {
      path: '/admin/orders',
      name: 'Order list',
      icon: 'bi-clipboard-check'
    },
    {
      path: '/admin/coupons',
      name: 'Coupon list',
      icon: 'bi-ticket-perforated'
    },
  ]

  const navigate = useNavigate();

  const signout = () => {
    // 清除 cookie
    document.cookie = `hexToken=;`
    navigate('/admin-login')
  }

  // 取出 Token
  const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    axios.defaults.headers.common["Authorization"] = token;

  // const checkAdminLogin = async () => {
  //   setIsLoadingScreen(true)
  //   try {
  //     const response = await axios.post(`${BASE_URL}/api/user/check`);
  //     console.log(response);
  //     setIsAuth(true)
  //   } catch (error) {
  //     console.dir(error);
  //     setIsAuth(false)
  //     alert(error.response.data.message);
  //     navigate('/admin-login')
  //   } finally {
  //     setIsLoadingScreen(false)
  //   }
  // };

  useEffect(() => {
    console.log('AdminLayout useEffect');
    
    if (!token) {
      return navigate('/admin-login')
    };
    // // 驗證登入
    // (async () => {
    //   setIsLoadingScreen(true)
    //   try {
    //     const response = await axios.post(`${BASE_URL}/api/user/check`);
    //     console.log('AdminLayout 驗證', response);
    //     setIsAuth(true)
    //   } catch (error) {
    //     console.dir(error);
    //     setIsAuth(false)
    //     alert(error.response.data.message);
    //     navigate('/admin-login')
    //   } finally {
    //     setIsLoadingScreen(false)
    //   }
    // })();
  }, [navigate, token])

  return (
    <>
        <LoadingScreen isLoadingScreen={isLoadingScreen} />
        {
          token && (
            <>
              <nav
                className="navbar navbar-expand-lg bg-body-tertiary"
                data-bs-theme="dark"
              >
                <div className="container-fluid">
                  {/* <a className="navbar-brand d-flex align-items-center" href="#"> */}
                  <div className="text-white d-flex align-items-center gap-2">
                    <img
                      src={logo}
                      alt="strawberry cake icons"
                      className="img-fluid me-1"
                      width="30px"
                    />
                    <p className="mb-0">Regis's Cakes - Admin Dashboard</p>
                  </div>
                  {/* </a> */}
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNavDropdown"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <button
                          type="button"
                          className="btn btn-light d-flex align-items-center gap-2"
                          onClick={signout}
                        >
                          <i className="bi bi-box-arrow-right"></i>
                          <p className="mb-0">Sign out</p>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="d-flex" style={{minHeight: 'calc(100vh - 55px)'}}>
                <div className="bg-light" style={{ width: "200px" }}>
                  <div className="list-group list-group-flush">
                    {
                      routes.map((route) => (
                        <NavLink
                          key={route.path}
                          to={route.path}
                          className="list-group-item list-group-item-action"
                        >
                          <i className={`bi ${route.icon}`}></i>{route.name}
                        </NavLink>
                      ))
                    }
                  </div>
                </div>
                <Outlet />
              </div>
            
            </>
          )
        }
    </>
  );
}

export default AdminLayout;
