import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/home/Home';
import Layout from '../components/layout/Layout';
import NotFound_Page from '../pages/notFound_page/NotFound_Page';
import Statistics from '@/pages/الاحصائيات/Statistics';
import Panars from '@/pages/البرندات الرئيسية/Panars';
import Sections from '@/pages/التخصصات/Sections';
import Doctors from '@/pages/ألاطباء/Doctors';
import Services from '@/pages/الخدمات/Services';
import Offers from '@/pages/العروض/Offers';


let routers= createBrowserRouter([
    {path :'/' ,element : <Layout /> , children :[
    {index : true , element: <Home /> },
    {path : 'home' , element: <Home /> },
    {path : 'statistics' , element: <Statistics /> },
    {path : 'panars' , element: <Panars /> },
    {path : 'doctors' , element: <Doctors/> },
    {path : 'sections' , element: <Sections /> },
    {path : 'services' , element: <Services /> },
    {path : 'offers' , element: <Offers /> },
    {path : '*' , element: <NotFound_Page/>},
    ] },
  ]);

  export default routers;

  