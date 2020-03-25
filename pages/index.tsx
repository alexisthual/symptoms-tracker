import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import {
  ageCategories,
  headacheStates,
  feverStates,
  coughStates,
  breathingStates
} from "../lib/types";
import Header from "../components/Header";

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
  const [cough, updateCough] = useState();
  const [coughSince, updateCoughSince] = useState();
  const [coughOk, updateCoughOk] = useState(false);
  const [breathing, updateBreathing] = useState();
  const [breathingSince, updateBreathingSince] = useState();
  const [breathingOk, updateBreathingOk] = useState(false);
  const [modalActive, updateModalActive] = useState(false);
  const [alreadySent, updateAlreadySent] = useState(false);
  const [submissionStatus, updateSubmissionStatus] = useState(null);

  useEffect(() => {
    updateHeadacheOk(
      headacheSince !== undefined || headache === headacheStates.NO
    );
  }, [headache, headacheSince]);

  useEffect(() => {
    updateFeverOk(feverSince !== undefined || fever === feverStates.NO);
  }, [fever, feverSince]);

  useEffect(() => {
    updateCoughOk(coughSince !== undefined || cough === coughStates.NO);
  }, [cough, coughSince]);

  useEffect(() => {
    updateBreathingOk(
      breathingSince !== undefined || breathing === breathingStates.NO
    );
  }, [breathing, breathingSince]);

  const sendSubmission = async (event: any) => {
    event.preventDefault();

    if (!(!age || !zipcode || !headacheOk || !feverOk || !breathingOk)) {
      updateModalActive(true);
      updateAlreadySent(true);
      updateSubmissionStatus("pending");

      fetch("/api/submission", {
        method: "POST",
        body: JSON.stringify({
          age,
          zipcode,
          submittedAt: new Date(Date.now()),
          headache,
          headacheSince,
          fever,
          feverSince,
          cough,
          coughSince,
          breathing,
          breathingSince
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response: any) => {
          return response.json();
        })
        .then(() => {
          updateSubmissionStatus("success");
        })
        .catch((error: any) => {
          console.log(error);
          updateSubmissionStatus("error");
          updateAlreadySent(false);
        });
    }
  };

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

  const submitButton = () =>
    alreadySent ? (
      <button className="btn btn-primary bg-success" disabled>
        <i className="icon icon-check"></i> <FormattedMessage id="sent" />
      </button>
    ) : (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!age || !zipcode || !headacheOk || !feverOk || !breathingOk}
      >
        <FormattedMessage id="send" />
      </button>
    );

  return (
    <>
      <Head>
        <title>Symptoms Tracker</title>
      </Head>

      <div className="toaster container grid-xs">
        <div className="columns col-gapless">
          <div className="column col-8 col-ml-auto">
            {submissionStatus === "pending" ? (
              <div className="toast">
                <i className="icon icon-upload"></i>{" "}
                <FormattedMessage id="submission.pending" />
              </div>
            ) : null}

            {submissionStatus === "success" ? (
              <div className="toast toast-success">
                <i className="icon icon-check"></i>{" "}
                <FormattedMessage id="submission.success" />
              </div>
            ) : null}

            {submissionStatus === "error" ? (
              <div className="toast toast-error">
                <i className="icon icon-cross"></i>{" "}
                <FormattedMessage id="submission.error" />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className={`modal ${modalActive ? "active" : ""}`} id="modal-id">
        <a className="modal-overlay" aria-label="Close"></a>
        <div className="modal-container">
          <div className="modal-header">
            <a
              className="btn btn-clear float-right"
              aria-label="Close"
              onClick={() => {
                updateModalActive(false);
              }}
            ></a>
            <div className="modal-title h5">
              <FormattedMessage id="modal.title" />
            </div>
          </div>
          <div className="modal-body">
            <div className="content text-justify">
              <FormattedMessage id="modal.content" />
              <ul>
                <li>
                  <FormattedMessage id="modal.content.list.0" />
                </li>
                <li>
                  <FormattedMessage id="modal.content.list.1" />
                </li>
              </ul>
            </div>
          </div>
          <div className="modal-footer inline-flex">
            <button
              className="btn btn-primary"
              onClick={() => {
                location.reload();
              }}
            >
              <i className="icon icon-refresh"></i>{" "}
              <FormattedMessage id="modal.retake" />
            </button>
            <button className="btn disabled">
              <i className="icon icon-search"></i>{" "}
              <FormattedMessage id="modal.visualise" />
            </button>
          </div>
        </div>
      </div>

      <Header language={language} />

      <div className="container grid-xs">
        <form onSubmit={sendSubmission}>
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
                      placeholder={intl.formatMessage(messages.pick)}
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
                      placeholder={intl.formatMessage(messages.pick)}
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
              {formIcon(coughOk)}
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage id="cough.question" />
                  </label>
                  {Object.keys(coughStates).map(
                    (state: string, index: number) => (
                      <label key={index} className="form-radio">
                        <input
                          type="radio"
                          value={state}
                          checked={cough === state}
                          onChange={(event: any) => {
                            updateCough(event.target.value);
                          }}
                        />
                        <i className="form-icon"></i>{" "}
                        <FormattedMessage id={`cough.${state}`} />
                      </label>
                    )
                  )}
                </div>

                {cough && cough !== coughStates.NO ? (
                  <div className="form-group">
                    <label className="form-label">
                      <FormattedMessage id="howmanydays" />
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder={intl.formatMessage(messages.pick)}
                      value={coughSince}
                      onChange={(event: any) => {
                        updateCoughSince(event.target.value);
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
                      placeholder={intl.formatMessage(messages.pick)}
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

          <div className="text-right" style={{ marginTop: 40 }}>
            {submitButton()}
          </div>
        </form>

        <div className="footer inline-flex">
          <Link href="/about">
            <button className="btn btn-link">
              <FormattedMessage id="about" />
            </button>
          </Link>
          <a href="https://github.com/alexisthual/symptoms-tracker">
            <button className="btn btn-link">Github</button>
          </a>
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
