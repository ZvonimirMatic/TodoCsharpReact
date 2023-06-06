import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import './custom.css';
import AuthorizeView from './auth/AuthorizeView';

export default function App(){
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, requireAuth, ...rest } = route;
          return <Route key={index} {...rest} element={requireAuth ? <AuthorizeView shouldRedirect>{element}</AuthorizeView> : element} />;
        })}
      </Routes>
    </Layout>
  );
}
