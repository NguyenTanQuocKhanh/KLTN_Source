// reactstrap components
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from 'reactstrap';
import ModalPopup from '~/components/ModalPopup';

import * as authService from '~/services/authService';
import { login } from '~/slices/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const loginApi = async () => {
            setLoading(true);
            const res = await authService.login({ email: e.target.email.value, password: e.target.password.value });
            console.log(res);
            setLoading(false);
            if (res.status === 200) {
                const action = login(res.data);
                dispatch(action);
            } else {
                toast.error(res.errors.message);
            }
        };
        loginApi();
    };
    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-3">
                            <small>Sign in with</small>
                        </div>
                        <div className="btn-wrapper text-center">
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <span className="btn-inner--icon">
                                    <img
                                        alt="..."
                                        src={require('../../assets/img/icons/common/facebook.svg').default}
                                    />
                                </span>
                                <span className="btn-inner--text">Facebook</span>
                            </Button>
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <span className="btn-inner--icon">
                                    <img alt="..." src={require('../../assets/img/icons/common/google.svg').default} />
                                </span>
                                <span className="btn-inner--text">Google</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div>
                        <Form role="form" onSubmit={handleLogin}>
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        autoComplete="new-email"
                                        name="email"
                                        className="is-invalid"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="new-password"
                                        name="password"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="submit">
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col xs="6">
                        <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                    <Col className="text-right" xs="6">
                        <Link className="text-light" to="/auth/register">
                            <small>Create new account</small>
                        </Link>
                    </Col>
                </Row>
            </Col>
            <ToastContainer />
            <ModalPopup hidden={!loading} />
        </>
    );
};

export default Login;
