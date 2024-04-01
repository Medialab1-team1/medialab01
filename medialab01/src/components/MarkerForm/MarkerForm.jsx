import { useContext, useEffect, useState } from "react";
import clsx from "clsx";

import { PatientContext } from "../../contexts/PatientContext";
import { DataContext } from "../../contexts/DataContext";

import styles from "./MarkerForm.module.css";

export default function MarkerForm() {
  const { data, setData } = useContext(DataContext);
  const { patient, setPatient } = useContext(PatientContext);

  const [markers, setMarkers] = useState(patient.markers);
  const [newMarker, setNewMarker] = useState(emptyMarker());

  function handleChange(event) {
    if (event.target.name === "marker-name") {
      newMarker.name = event.target.value;
      setNewMarker({ ...newMarker });
    }
    if (event.target.name === "marker-type") {
      newMarker.type = event.target.value;
      setNewMarker({ ...newMarker });
    }
    if (event.target.name === "marker-time") {
      newMarker.time = event.target.value;
      setNewMarker({ ...newMarker });
    }
  }

  function emptyMarker() {
    return {
      id: "", // index + type
      name: "", // optional
      type: "", // type of marker medicine | meal | point of interest
      time: data.meta.start, // date time object
    };
  }

  function addMarker(event) {
    markers.push(newMarker);
    setMarkers(markers);
    setNewMarker(emptyMarker());
  }

  useEffect(() => {
    newMarker.time = data.meta.start;
    setNewMarker({ ...newMarker });
  }, [data]);

  useEffect(() => {
    setMarkers(patient.markers);
  }, [patient]);

  return (
    <>
      <label htmlFor="marker-name">Naam</label>
      <input
        type="text"
        id="marker-name"
        name="marker-name"
        placeholder="optioneel"
        value={newMarker.name}
        onChange={(event) => handleChange(event)}
      />
      <label htmlFor="marker-time">tijd</label>
      <input
        type="time"
        name="marker-time"
        id="marker-time"
        value={newMarker.time}
        min={newMarker.time}
        onChange={(event) => handleChange(event)}
      />
      <label htmlFor="marker-type">categorie</label>
      <select
        name="marker-type"
        id="marker-type"
        value={newMarker.type}
        onChange={(event) => handleChange(event)}
      >
        <option value={"meal"}>Eten</option>
        <option value={"poi"}>Bookmark</option>
        <option value={"medicine"}>Medicijn</option>
      </select>
      <button type="button" onClick={(e) => addMarker(e)}>
        Marker toevoegen
      </button>
      <div className={clsx([styles.markerListContainer])}>
        {patient.markers.length > 0 &&
          patient.markers.map((marker, i) => {
            <MarkerItem marker={marker} key={i} />;
          })}
      </div>
    </>
  );
}

function MarkerItem({ marker }) {
  return (
    <div>
      {marker.name}
      {marker.time}
      {marker.type}
    </div>
  );
}
