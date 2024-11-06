import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>MAP</h1>
      <div>position</div>
      <p>{lat}</p>
      <p>{lng}</p>

      <button
        onClick={() => {
          setSearchParams({ lat: 1, lng: 2 });
        }}
      >
        change pos
      </button>
    </div>
  );
}

export default Map;
