import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Protected({element}) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
  
    return user ? element : <Navigate to="/login" replace />
}