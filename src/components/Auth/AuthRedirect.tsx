import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRedirect = () => {
    const token = localStorage.getItem("accessToken") ?? sessionStorage.getItem("accessToken");
    const location = useLocation();

    if (!token) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default AuthRedirect