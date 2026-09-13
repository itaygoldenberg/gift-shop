import { NavLink } from "react-router-dom";
import "./menu.css";

export function Menu() {

    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>

            <NavLink to="/gifts">Gifts</NavLink>
            
            <NavLink to="/new">New</NavLink>

        </div>
    );
}
