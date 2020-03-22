import { useState, useEffect } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import {
  ageCategories,
  headacheStates,
  feverStates,
  breathingStates
} from "../lib/types";

import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-exp.min.css";
import "spectre.css/dist/spectre-icons.min.css";
import "../style.scss";

const messages = defineMessages({
  pick: { id: "pick" },
  age: {
    ...Object.keys(ageCategories)
      .map((category: string) => {
        return {
          [category]: { id: `age.${category}` }
        };
      })
      .reduce((acc: any, current: any) => {
        return { ...acc, ...current };
      }, {})
  }
});

const MainPage = ({ language }: any) => {
  const intl = useIntl();

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
      headacheSince !== undefined || headache === headacheStates.NO
    );
  }, [headache, headacheSince]);

  useEffect(() => {
    updateFeverOk(feverSince !== undefined || fever === feverStates.NO);
  }, [fever, feverSince]);

  useEffect(() => {
    updateBreathingOk(
      breathingSince !== undefined || breathing === breathingStates.NO
    );
  }, [breathing, breathingSince]);

  const formIcon = (condition: any) => (
    <div className="timeline-left">
      {condition ? (
        <div className="timeline-icon icon-lg bg-success">
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
          <h3 className="navbar-brand">
            <FormattedMessage id="title" />
          </h3>
        </section>
        <section className="navbar-section px-2">
          <a href="#" className="btn btn-link">
            <i className="icon icon-location"></i> {language}
          </a>
        </section>
      </header>

      <div className="container grid-xs">
        <p className="text-center">
          <FormattedMessage id="description" />
        </p>

        <form>
          <div className="timeline">
            <div className="timeline-item">
              {formIcon(age !== "")}
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage id="age" />
                  </label>
                  <div className="form-group">
                    <select
                      className="form-select"
                      value={age}
                      onChange={(event: any) => {
                        updateAge(event.target.value);
                      }}
                    >
                      <option value="" disabled>
                        {intl.formatMessage(messages.pick)}
                      </option>
                      {Object.keys(ageCategories).map(
                        (category: string, index: number) => {
                          return (
                            <option
                              key={index}
                              value={(ageCategories as any)[category]}
                            >
                              {intl.formatMessage(messages.age[category])}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              {formIcon(zipcode !== undefined)}
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage id="zipcode" />
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder={intl.formatMessage(messages.pick)}
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
                    <FormattedMessage id="headache.question" />
                  </label>
                  {Object.keys(headacheStates).map(
                    (state: string, index: number) => (
                      <label key={index} className="form-radio">
                        <input
                          type="radio"
                          value={state}
                          checked={headache === state}
                          onChange={(event: any) => {
                            updateHeadache(event.target.value);
                          }}
                        />
                        <i className="form-icon"></i>{" "}
                        <FormattedMessage id={`headache.${state}`} />
                      </label>
                    )
                  )}
                </div>

                {headache && headache !== headacheStates.NO ? (
                  <div className="form-group">
                    <label className="form-label">
                      <FormattedMessage id="howmanydays" />
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
                  <label className="form-label">
                    <FormattedMessage id="fever.question" />
                  </label>
                  {Object.keys(feverStates).map(
                    (state: string, index: number) => (
                      <label key={index} className="form-radio">
                        <input
                          type="radio"
                          value={state}
                          checked={fever === state}
                          onChange={(event: any) => {
                            updateFever(event.target.value);
                          }}
                        />
                        <i className="form-icon"></i>{" "}
                        <FormattedMessage id={`fever.${state}`} />
                      </label>
                    )
                  )}
                </div>

                {fever && fever !== feverStates.NO ? (
                  <div className="form-group">
                    <label className="form-label">
                      <FormattedMessage id="howmanydays" />
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
                    <FormattedMessage id="breathing.question" />
                  </label>
                  {Object.keys(breathingStates).map(
                    (state: string, index: number) => (
                      <label key={index} className="form-radio">
                        <input
                          type="radio"
                          value={state}
                          checked={breathing === state}
                          onChange={(event: any) => {
                            updateBreathing(event.target.value);
                          }}
                        />
                        <i className="form-icon"></i>{" "}
                        <FormattedMessage id={`breathing.${state}`} />
                      </label>
                    )
                  )}
                </div>

                {breathing && breathing !== breathingStates.NO ? (
                  <div className="form-group">
                    <label className="form-label">
                      <FormattedMessage id="howmanydays" />
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
              <FormattedMessage id="send" />
            </button>
          </div>
        </form>

        <div className="footer">
          <button className="btn btn-link">
            <FormattedMessage id="about" />
          </button>
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
