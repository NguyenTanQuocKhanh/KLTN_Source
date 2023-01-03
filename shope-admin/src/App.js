import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { AuthLayout, AdminLayout } from './layouts';

function App() {
    const { isLogged } = useSelector((state) => state.auth);
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout isLogged={isLogged} {...props} />} />
                <Route path="/auth" render={(props) => <AuthLayout isLogged={isLogged} {...props} />} />
                <Redirect from="/" to="/admin/index" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
