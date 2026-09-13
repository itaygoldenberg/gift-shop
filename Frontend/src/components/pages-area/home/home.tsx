import "./home.css";
import imageSource from "../../../assets/home.jpg";

export function Home() {
    return (
        <div className="Home">

            <p>Welcome to our gift shop, where thoughtful gifts and meaningful moments come together. Whether you're celebrating a special occasion, searching for the perfect surprise, or simply treating yourself, you'll find a carefully curated collection of unique, high-quality items for every style and budget. We believe every gift tells a story, and we're here to help you find one that makes every occasion unforgettable.</p>

            <img src={imageSource} />

        </div>
    );
}
