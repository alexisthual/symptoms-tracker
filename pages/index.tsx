import { useState, useEffect } from "react";

import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-exp.min.css";
import "spectre.css/dist/spectre-icons.min.css";
import "../style.scss";

const MainPage = ({ language }: any) => {
  const [age, updateAge] = useState("");
  const [zipcode, updateZipcode] = useState();
  const [headache, updateHeadache] = useState();
  const [headacheSince, updateHeadacheSince] = useState();
  const [headacheOk, updateHeadacheOk] = useState(false);
  const [fever, updateFever] = useState();
  const [feverSince, updateFeverSince] = useState();
  const [feverOk, updateFeverOk] = useState(false);
  const [breathing, updateBreathing] = useState();
  const [breathingSince, updateBreathingSince] = useState();
  const [breathingOk, updateBreathingOk] = useState(false);

  useEffect(() => {
    updateHeadacheOk(
      headacheSince !== undefined ||
        headache === headacheStates[headacheStates.length - 1]
    );
  }, [headache, headacheSince]);

  useEffect(() => {
    updateFeverOk(
      feverSince !== undefined || fever === feverStates[feverStates.length - 1]
    );
  }, [fever, feverSince]);

  useEffect(() => {
    updateBreathingOk(
      breathingSince !== undefined ||
        breathing === breathingStates[breathingStates.length - 1]
    );
  }, [breathing, breathingSince]);

  const headacheStates = ["Oui", "Non"];

  const feverStates = ["Oui, beaucoup", "Oui, un peu", "Non"];

  const breathingStates = ["Oui, beaucoup", "Oui, un peu", "Non"];

  const formIcon = (condition: any) => (
    <div className="timeline-left">
      {condition ? (
        <div className="timeline-icon icon-lg">
          <i className="icon icon-check"></i>
        </div>
      ) : (
        <div className="timeline-icon icon-lg bg-secondary">
          <i className="icon icon-arrow-right"></i>
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className="navbar">
        <section className="navbar-section"></section>
        <section className="navbar-center">
          <h3 className="navbar-brand">Symptoms Tracker</h3>
        </section>
        <section className="navbar-section px-2">
          <a href="#" className="btn btn-link">
            <i className="icon icon-location"></i> {language}
          </a>
        </section>
      </header>

      <div className="container grid-xs">
        <p className="text-center">
          Questionnaire visant le suivi du développent du COVID-19 au sein des
          populations confinées. Aucune donnée personnelle ou identifiante n’est
          collectée.
        </p>

        <form>
          <div className="timeline">
            <div className="timeline-item">
              {formIcon(age !== "")}
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">Âge</label>
                  <div className="form-group">
                    <select
                      className="form-select"
                      value={age}
                      onChange={(event: any) => {
                        updateAge(event.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Choisir
                      </option>
                      <option value="0">0-20 ans</option>
                      <option value="1">20-40 ans</option>
                      <option value="2">40-60 ans</option>
                      <option value="3">60+ ans</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              {formIcon(zipcode !== undefined)}
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">Code Postal</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Choisir"
                    value={zipcode}
                    onChange={(event: any) => {
                      updateZipcode(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="timeline-item">
              {formIcon(headacheOk)}
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">
                    Ressentez-vous des maux de tête, des douleurs musculaires ou
                    de la fatigue ?
                  </label>
                  {headacheStates.map((state: string, index: number) => (
                    <label key={index} className="form-radio">
                      <input
                        type="radio"
                        value={state}
                        checked={headache === state}
                        onChange={(event: any) => {
                          updateHeadache(event.target.value);
                        }}
                      />
                      <i className="form-icon"></i> {state}
                    </label>
                  ))}
                </div>

                {headache &&
                headache !== headacheStates[headacheStates.length - 1] ? (
                  <div className="form-group">
                    <label className="form-label">
                      Depuis combien de jours ?
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Choisir"
                      value={headacheSince}
                      onChange={(event: any) => {
                        updateHeadacheSince(event.target.value);
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="timeline-item">
              {formIcon(feverOk)}
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">Avez-vous de la fièvre ?</label>
                  {feverStates.map((state: string, index: number) => (
                    <label key={index} className="form-radio">
                      <input
                        type="radio"
                        value={state}
                        checked={fever === state}
                        onChange={(event: any) => {
                          updateFever(event.target.value);
                        }}
                      />
                      <i className="form-icon"></i> {state}
                    </label>
                  ))}
                </div>

                {fever && fever !== feverStates[feverStates.length - 1] ? (
                  <div className="form-group">
                    <label className="form-label">
                      Depuis combien de jours ?
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Choisir"
                      value={feverSince}
                      onChange={(event: any) => {
                        updateFeverSince(event.target.value);
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="timeline-item">
              {formIcon(breathingOk)}
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">
                    Avez-vous des difficultés à respirer ?
                  </label>
                  {breathingStates.map((state: string, index: number) => (
                    <label key={index} className="form-radio">
                      <input
                        type="radio"
                        value={state}
                        checked={breathing === state}
                        onChange={(event: any) => {
                          updateBreathing(event.target.value);
                        }}
                      />
                      <i className="form-icon"></i> {state}
                    </label>
                  ))}
                </div>

                {breathing &&
                breathing !== breathingStates[breathingStates.length - 1] ? (
                  <div className="form-group">
                    <label className="form-label">
                      Depuis combien de jours ?
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Choisir"
                      value={breathingSince}
                      onChange={(event: any) => {
                        updateBreathingSince(event.target.value);
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <button
              className="btn btn-primary"
              disabled={
                !age || !zipcode || !headacheOk || !feverOk || !breathingOk
              }
            >
              Envoyer
            </button>
          </div>
        </form>

        <div className="footer">
          <button className="btn btn-link">À Propos</button>
          <button className="btn btn-link">Github</button>
        </div>
      </div>
    </>
  );
};

MainPage.getInitialProps = async () => {
  return {
    language: "fr"
  };
};

export default MainPage;
