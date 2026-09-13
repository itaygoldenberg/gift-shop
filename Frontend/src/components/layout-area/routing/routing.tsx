import { Navigate, Route, Routes } from "react-router-dom";
import { AddGift } from "../../pages-area/add-gift/add-gift";
import { Gifts } from "../../pages-area/gifts/gifts";
import { Home } from "../../pages-area/home/home";
import { Page404 } from "../../pages-area/page404/page404";

export function Routing() {

    return (
        <Routes>

            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/gifts" element={<Gifts />} />
            <Route path="/new" element={<AddGift />} />
            <Route path="*" element={<Page404 />} />

        </Routes>
    );
}
