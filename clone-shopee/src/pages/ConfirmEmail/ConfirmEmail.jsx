import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as authService from '~/services/authService';

function ConfirmEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const handleConfirmEmail = async () => {
            const hash = location.hash.slice(1);
            const res = await authService.confirmEmail({ hash });
            console.log(res);
            if (res.status === 200) {
                return await navigate('/', { state: { isSuccess: true, message: 'Confirm Email Successfully!' } });
            }
            return await navigate('/', { state: { isSuccess: false, message: 'Error!!!' } });
        };
        handleConfirmEmail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default ConfirmEmail;
