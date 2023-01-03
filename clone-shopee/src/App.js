
// import { Fragment } from 'react'; //là thẻ chỉ để chưa thôi
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Routes, Route, Redirect } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';

import ButtonToTop from '~/components/ButtonToTop';
import classnames from 'classnames/bind';
import styles from '~/components/ButtonToTop/ButtonToTop.module.scss';
import ModalPopup from './components/ModalPopup';
import { FormRegister } from './components/Form';
import routes from './config/routes';
import { ConfirmEmail } from './pages';

const cx = classnames.bind(styles);
function App() {
    const { isLogged } = useSelector((state) => state.auth);

    const ProtectedRoute = ({ isLogged, redirectPath = '/', children }) => {
        if (!isLogged) {
            return <Navigate to={redirectPath} replace />
        }
        return children;
    };

    return (
        <>
            <Router>
                <div className="App">
                    <Routes>
                        {
                            publicRoutes.map((route, index) => {
                                let Layout = DefaultLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                }
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        location={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })
                        }
                        {
                            privateRoutes.map((route, index) => {
                                let Layout = DefaultLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                }
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <ProtectedRoute isLogged={isLogged}>
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            </ProtectedRoute>
                                        }
                                    />
                                );
                            })
                        }
                        {/* <Route path="*" element={<Navigate to="/" />} /> */}
                        <Route path={routes.confirm_email} element={<ConfirmEmail />} />
                    </Routes>
                </div>

            </Router>

            <div id="toast"></div>
            <ButtonToTop className={cx('btn-to-top')} />
            <ModalPopup />
            <ModalPopup FormComponent={FormRegister} formType='register' />
        </>
    );
}

export default App;
