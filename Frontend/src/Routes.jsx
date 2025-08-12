import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import GroundFloor from './Pages/GroundFloor';
import Loft from './Pages/Loft';
import FirstFloor from './Pages/FirstFloor';
import Others from './Pages/Others';


export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/GroundFloor' element={<GroundFloor />} />
            <Route path='/Loft' element={<Loft />} />
            <Route path='/FirstFloor' element={<FirstFloor />} />
            <Route path='/Others' element={<Others />} />
        </Routes>
    )
}