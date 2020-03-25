import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import {
  ageCategories,
  headacheStates,
  throatStates,
  diarrheaStates,
  feedingStates,
  feverStates,
  coughStates,
  breathingStates,
  hypertensionStates,
  diabetesStates,
  cancerStates,
  pneumoStates,
  dialyseStates,
  liverStates,
  immunoStates
} from "../lib/types";
import FormIcon from "../components/FormIcon";
import Header from "../components/Header";
import MedicalHistoryInput from "../components/MedicalHistoryInput";
import NumberInput from "../components/NumberInput";
import SymptomInput from "../components/SymptomInput";

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
  },
  placeholders: {
    zipcode: { id: "zipcode.placeholder" },
    height: { id: "height.placeholder" },
    weight: { id: "weight.placeholder" },
    confined: { id: "confined.placeholder" }
  },
  optional: { id: "optional" }
});

interface ISubmitButtonProps {
  alreadySent: boolean;
  disabled: boolean;
}

const SubmitButton = ({ alreadySent, disabled }: ISubmitButtonProps) =>
  alreadySent ? (
    <button className="btn btn-primary btn-lg" disabled>
      <i className="icon icon-check"></i> <FormattedMessage id="sent" />
    </button>
  ) : (
    <button
      type="submit"
      className="btn btn-primary btn-lg"
      disabled={disabled}
    >
      <FormattedMessage id="send" />
    </button>
  );

const MainPage = ({ language }: any) => {
  const intl = useIntl();

  const [age, updateAge] = useState("");
  const [zipcode, updateZipcode] = useState();
  const [headache, updateHeadache] = useState();
  const [headacheSince, updateHeadacheSince] = useState();
  const [headacheOk, updateHeadacheOk] = useState(false);
  const [throat, updateThroat] = useState();
  const [throatSince, updateThroatSince] = useState();
  const [throatOk, updateThroatOk] = useState(false);
  const [diarrhea, updateDiarrhea] = useState();
  const [diarrheaSince, updateDiarrheaSince] = useState();
  const [diarrheaOk, updateDiarrheaOk] = useState(false);
  const [feeding, updateFeeding] = useState();
  const [feedingSince, updateFeedingSince] = useState();
  const [feedingOk, updateFeedingOk] = useState(false);
  const [fever, updateFever] = useState();
  const [feverSince, updateFeverSince] = useState();
  const [feverOk, updateFeverOk] = useState(false);
  const [cough, updateCough] = useState();
  const [coughSince, updateCoughSince] = useState();
  const [coughOk, updateCoughOk] = useState(false);
  const [breathing, updateBreathing] = useState();
  const [breathingSince, updateBreathingSince] = useState();
  const [breathingOk, updateBreathingOk] = useState(false);
  const [height, updateHeight] = useState();
  const [weight, updateWeight] = useState();
  const [hypertension, updateHypertension] = useState();
  const [diabetes, updateDiabetes] = useState();
  const [cancer, updateCancer] = useState();
  const [pneumo, updatePneumo] = useState();
  const [dialyse, updateDialyse] = useState();
  const [liver, updateLiver] = useState();
  const [immuno, updateImmuno] = useState();
  const [confined, updateConfined] = useState();
  const [modalActive, updateModalActive] = useState(false);
  const [alreadySent, updateAlreadySent] = useState(false);
  const [submissionStatus, updateSubmissionStatus] = useState(null);
  const [canSubmit, updateCanSubmit] = useState(false);

  useEffect(() => {
    updateHeadacheOk(
      headacheSince !== undefined || headache === headacheStates.NO
    );
  }, [headache, headacheSince]);

  useEffect(() => {
    updateThroatOk(throatSince !== undefined || throat === throatStates.NO);
  }, [throat, throatSince]);

  useEffect(() => {
    updateDiarrheaOk(
      diarrheaSince !== undefined || diarrhea === diarrheaStates.NO
    );
  }, [diarrhea, diarrheaSince]);

  useEffect(() => {
    updateFeedingOk(feedingSince !== undefined || feeding === feedingStates.NO);
  }, [feeding, feedingSince]);

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

  useEffect(() => {
    updateCanSubmit(
      age !== null &&
        zipcode !== null &&
        headacheOk &&
        throatOk &&
        diarrheaOk &&
        feedingOk &&
        feverOk &&
        breathingOk
    );
  }, [
    age,
    zipcode,
    headacheOk,
    throatOk,
    diarrheaOk,
    feedingOk,
    feverOk,
    coughOk,
    breathingOk
  ]);

  const sendSubmission = async (event: any) => {
    event.preventDefault();

    if (canSubmit) {
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
          throat,
          throatSince,
          diarrhea,
          diarrheaSince,
          feeding,
          feedingSince,
          fever,
          feverSince,
          cough,
          coughSince,
          breathing,
          breathingSince,
          height,
          weight,
          hypertension,
          diabetes,
          cancer,
          pneumo,
          dialyse,
          liver,
          immuno,
          confined
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
              <FormIcon condition={age !== ""} optional={false} />
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

            <NumberInput
              value={zipcode}
              updateValue={updateZipcode}
              name={"zipcode"}
              optional={false}
              messages={messages}
            />

            <SymptomInput
              states={headacheStates}
              value={headache}
              updateValue={updateHeadache}
              valueSince={headacheSince}
              updateValueSince={updateHeadacheSince}
              inputOk={headacheOk}
              name={"headache"}
              optional={false}
              messages={messages}
            />

            <SymptomInput
              states={throatStates}
              value={throat}
              updateValue={updateThroat}
              valueSince={throatSince}
              updateValueSince={updateThroatSince}
              inputOk={throatOk}
              name={"throat"}
              optional={false}
              messages={messages}
            />

            <SymptomInput
              states={diarrheaStates}
              value={diarrhea}
              updateValue={updateDiarrhea}
              valueSince={diarrheaSince}
              updateValueSince={updateDiarrheaSince}
              inputOk={diarrheaOk}
              name={"diarrhea"}
              optional={false}
              messages={messages}
            />

            <SymptomInput
              states={feedingStates}
              value={feeding}
              updateValue={updateFeeding}
              valueSince={feedingSince}
              updateValueSince={updateFeedingSince}
              inputOk={feedingOk}
              name={"feeding"}
              optional={false}
              messages={messages}
            />

            <SymptomInput
              states={feverStates}
              value={fever}
              updateValue={updateFever}
              valueSince={feverSince}
              updateValueSince={updateFeverSince}
              inputOk={feverOk}
              name={"fever"}
              optional={false}
              messages={messages}
            />

            <SymptomInput
              states={coughStates}
              value={cough}
              updateValue={updateCough}
              valueSince={coughSince}
              updateValueSince={updateCoughSince}
              inputOk={coughOk}
              name={"cough"}
              optional={false}
              messages={messages}
            />

            <SymptomInput
              states={breathingStates}
              value={breathing}
              updateValue={updateBreathing}
              valueSince={breathingSince}
              updateValueSince={updateBreathingSince}
              inputOk={breathingOk}
              name={"breathing"}
              optional={false}
              messages={messages}
            />

            <div
              className="divider text-center"
              data-content={intl.formatMessage(messages.optional)}
            ></div>

            <NumberInput
              value={height}
              updateValue={updateHeight}
              name={"height"}
              optional={true}
              messages={messages}
            />

            <NumberInput
              value={weight}
              updateValue={updateWeight}
              name={"weight"}
              optional={true}
              messages={messages}
            />

            <MedicalHistoryInput
              states={hypertensionStates}
              value={hypertension}
              updateValue={updateHypertension}
              name={"hypertension"}
              optional={true}
            />

            <MedicalHistoryInput
              states={diabetesStates}
              value={diabetes}
              updateValue={updateDiabetes}
              name={"diabetes"}
              optional={true}
            />

            <MedicalHistoryInput
              states={cancerStates}
              value={cancer}
              updateValue={updateCancer}
              name={"cancer"}
              optional={true}
            />

            <MedicalHistoryInput
              states={pneumoStates}
              value={pneumo}
              updateValue={updatePneumo}
              name={"pneumo"}
              optional={true}
            />

            <MedicalHistoryInput
              states={dialyseStates}
              value={dialyse}
              updateValue={updateDialyse}
              name={"dialyse"}
              optional={true}
            />

            <MedicalHistoryInput
              states={liverStates}
              value={liver}
              updateValue={updateLiver}
              name={"liver"}
              optional={true}
            />

            <MedicalHistoryInput
              states={immunoStates}
              value={immuno}
              updateValue={updateImmuno}
              name={"immuno"}
              optional={true}
            />

            <NumberInput
              value={confined}
              updateValue={updateConfined}
              name={"confined"}
              optional={true}
              messages={messages}
            />
          </div>

          <div className="text-right" style={{ marginTop: 40 }}>
            <SubmitButton alreadySent={alreadySent} disabled={!canSubmit} />
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
