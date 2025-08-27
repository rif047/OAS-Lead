import { NavLink } from "react-router-dom";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';

export default function SideMenuItem() {
    function Menu_Item(url, icon, name) {
        return (
            <NavLink to={url} className="flex items-center my-2 px-2 py-2 hover:bg-[#A0A5B9] hover:rounded-md">
                {icon}
                <p className="ml-2">{name}</p>
            </NavLink>
        )
    }
    return (
        <div className="mx-3 my-4">
            <div className="flex items-center mb-10">
                {/* <img src={'/Assets/Img/bc.png'} alt="" className="w-[50px] mr-2 rounded-md" /> */}
                <div className="text-sm ml-3">
                    <p className="font-extrabold">Cube In Estate</p>
                    <p>Innovate. Invest. Inspire.</p>
                </div>
            </div>
            <nav>
                {Menu_Item('/', <DashboardOutlinedIcon />, 'Dashboard')}
                {Menu_Item('/properties', <MapsHomeWorkOutlinedIcon />, 'Property')}
                {Menu_Item('/offering', <WorkHistoryOutlinedIcon />, 'Under Offer')}
                {Menu_Item('/solds', <PublishedWithChangesOutlinedIcon />, 'Sold')}
                {Menu_Item('/lets', <PriceCheckOutlinedIcon />, 'Let')}
                {Menu_Item('/customers', <PeopleOutlineIcon />, 'Customer')}
                {Menu_Item('/clients', <HandshakeOutlinedIcon />, 'Client')}
                {Menu_Item('/expenses', <LocalAtmIcon />, 'Expense')}
                {Menu_Item('/users', <PersonOutlineIcon />, 'User')}
            </nav>

        </div>
    )
}
