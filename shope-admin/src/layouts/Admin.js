
import { useEffect, useRef } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

// core components
import AdminNavbar from "~/components/Navbars/AdminNavbar.js";
import Sidebar from "~/components/Sidebar/Sidebar.js";
import Header from "~/components/Headers/Header";

import routes from "~/routes";

const Admin = (props) => {
  const mainContent = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (path.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "..."
        }}
      />
      <div className="main-content pb-5" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Header />
        <Switch>
          {props.isLogged ? <>{getRoutes(routes)}</> : <Redirect from="*" to="/auth/login" />}
        </Switch>
      </div>
    </>
  );
};

export default Admin;
