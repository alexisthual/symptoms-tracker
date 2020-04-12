import { useState, useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";

import { createChart } from "./chart";
// Fow now, import FR data directly.
import csv from "../../public/map-data/fr/data.csv";
import map from "../../public/map-data/fr/map.json";

const FranceMap = () => {
  const mapID = "map";
  if (process.browser) {
    const [ready, setReady] = useState(false);
    useEffect(() => {
      if (!ready) {
        createChart({
          id: mapID,
          geojson: map,
          csv
        }).then(() => {
          setReady(true);
        });
      }
    }, [ready]);
  }

  const total = useMemo(() => {
    return Object.values(csv).reduce(
      (acc, { TOTAL }) => acc + Number(TOTAL),
      0
    );
  }, [csv]);

  return (
    <>
      <div>
        <p className="h5 p-centered">
          {" "}
          <FormattedMessage id="home.map.title" />{" "}
        </p>
        <div
          id={mapID}
          style={{ maxWidth: "100%", margin: "0 auto", width: "600px" }}
        />
        <p className="empty-subtitle">
          <FormattedMessage id="home.total.submission" /> {total}
        </p>
      </div>
    </>
  );
};

export default FranceMap;
