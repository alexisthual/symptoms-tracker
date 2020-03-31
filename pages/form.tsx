import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import {
  ageCategories,
  covidTestStates,
  covidResultStates,
  healthStates,
  feverStates,
  coughStates,
  tasteAndSmellStates,
  headacheStates,
  throatStates,
  diarrheaStates,
  feedingStates,
  breathingStates
} from "../lib/types";
import FormIcon from "../components/FormIcon";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Share from "../components/Share";

import MedicalHistoryCheckbox from "../components/MedicalHistoryCheckbox";
import NumberInput from "../components/NumberInput";
import SymptomInput from "../components/SymptomInput";
import ZipInput from "../components/ZipInput";

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
    recoveredSince: { id: "recoveredSince.placeholder" },
    height: { id: "height.placeholder" },
    weight: { id: "weight.placeholder" },
    confinedWith: { id: "confinedWith.placeholder" },
    captcha: { id: "captcha.placeholder" }
  },
  optional: { id: "optional" },
  share: {
    url: { id: "share.url" },
    quote: { id: "share.quote" }
  },
  verification: { id: "verification" }
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

interface IFormPageProps {
  captcha: {
    id: string;
    data: any;
  };
}

const FormPage = ({ captcha }: IFormPageProps) => {
  const intl = useIntl();

  const addSymptomOkEffect = (value, valueSince, updateValueOk, states) => {
    useEffect(() => {
      let status = false;

      switch (health) {
        case healthStates.RECOVERED:
          status = value !== undefined && value !== null;
          break;
        case healthStates.ILL:
          status =
            (valueSince !== undefined &&
              valueSince !== "" &&
              valueSince !== null) ||
            value === states.NO;
          break;
        case healthStates.WELL:
          status = true;
          break;
        default:
          break;
      }

      updateValueOk(status);
    }, [value, valueSince, health]);
  };

  const [age, updateAge] = useState();
  const [zipcode, updateZipcode] = useState();
  const [confinedWith, updateConfinedWith] = useState();
  const [covidTest, updateCovidTest] = useState();
  const [covidResult, updateCovidResult] = useState();
  const [health, updateHealth] = useState();
  const [recoveredSince, updateRecoveredSince] = useState();

  const [fever, updateFever] = useState();
  const [feverSince, updateFeverSince] = useState();
  const [feverOk, updateFeverOk] = useState(false);
  addSymptomOkEffect(fever, feverSince, updateFeverOk, feverStates);

  const [tasteAndSmell, updateTasteAndSmell] = useState();
  const [tasteAndSmellSince, updateTasteAndSmellSince] = useState();
  const [tasteAndSmellOk, updateTasteAndSmellOk] = useState(false);
  addSymptomOkEffect(
    tasteAndSmell,
    tasteAndSmellSince,
    updateTasteAndSmellOk,
    tasteAndSmellStates
  );

  const [headache, updateHeadache] = useState();
  const [headacheSince, updateHeadacheSince] = useState();
  const [headacheOk, updateHeadacheOk] = useState(false);
  addSymptomOkEffect(headache, headacheSince, updateHeadacheOk, headacheStates);

  const [throat, updateThroat] = useState();
  const [throatSince, updateThroatSince] = useState();
  const [throatOk, updateThroatOk] = useState(false);
  addSymptomOkEffect(throat, throatSince, updateThroatOk, throatStates);

  const [diarrhea, updateDiarrhea] = useState();
  const [diarrheaSince, updateDiarrheaSince] = useState();
  const [diarrheaOk, updateDiarrheaOk] = useState(false);
  addSymptomOkEffect(diarrhea, diarrheaSince, updateDiarrheaOk, diarrheaStates);

  const [feeding, updateFeeding] = useState();
  const [feedingSince, updateFeedingSince] = useState();
  const [feedingOk, updateFeedingOk] = useState(false);
  addSymptomOkEffect(feeding, feedingSince, updateFeedingOk, feedingStates);

  const [cough, updateCough] = useState();
  const [coughSince, updateCoughSince] = useState();
  const [coughOk, updateCoughOk] = useState(false);
  addSymptomOkEffect(cough, coughSince, updateCoughOk, coughStates);

  const [breathing, updateBreathing] = useState();
  const [breathingSince, updateBreathingSince] = useState();
  const [breathingOk, updateBreathingOk] = useState(false);
  addSymptomOkEffect(
    breathing,
    breathingSince,
    updateBreathingOk,
    breathingStates
  );

  const [height, updateHeight] = useState();
  const [weight, updateWeight] = useState();
  const [hypertension, updateHypertension] = useState();
  const [diabetes, updateDiabetes] = useState();
  const [cancer, updateCancer] = useState();
  const [pneumo, updatePneumo] = useState();
  const [dialyse, updateDialyse] = useState();
  const [liver, updateLiver] = useState();
  const [pregnant, updatePregnant] = useState();
  const [immuno, updateImmuno] = useState();
  const [immunoSuppressor, updateImmunoSuppressor] = useState();

  const [captchaAnswer, updateCaptchaAnswer] = useState("");

  const [modalActive, updateModalActive] = useState(false);
  const [alreadySent, updateAlreadySent] = useState(false);
  const [submissionStatus, updateSubmissionStatus] = useState(null);
  const [canSubmit, updateCanSubmit] = useState(false);

  useEffect(() => {
    let status =
      age !== undefined &&
      age !== null &&
      zipcode !== "" &&
      zipcode !== undefined &&
      zipcode !== null &&
      confinedWith !== "" &&
      confinedWith !== undefined &&
      confinedWith !== null &&
      health &&
      captchaAnswer.length === 4;

    switch (health) {
      case healthStates.ILL:
        status =
          status &&
          feverOk &&
          coughOk &&
          tasteAndSmellOk &&
          headacheOk &&
          throatOk &&
          diarrheaOk &&
          feedingOk &&
          breathingOk;
        break;

      case healthStates.RECOVERED:
        status =
          status &&
          recoveredSince &&
          feverOk &&
          coughOk &&
          tasteAndSmellOk &&
          headacheOk &&
          throatOk &&
          diarrheaOk &&
          feedingOk &&
          breathingOk;
        break;

      case healthStates.WELL:
        break;
      default:
        break;
    }

    updateCanSubmit(status);
  }, [
    age,
    zipcode,
    confinedWith,
    recoveredSince,
    feverOk,
    coughOk,
    tasteAndSmellOk,
    headacheOk,
    throatOk,
    diarrheaOk,
    feedingOk,
    breathingOk,
    captchaAnswer
  ]);

  const sendSubmission = async (event: any) => {
    event.preventDefault();

    const getBMI = (weight: number, height: number) => {
      return weight && weight > 0 && height && height > 0
        ? Math.floor(weight / (height / 100) ** 2)
        : null;
    };

    if (canSubmit) {
      updateModalActive(true);
      updateAlreadySent(true);
      updateSubmissionStatus("pending");

      // Returns current datetime +- m minutes.
      // The "randomness" range is thus 2 * m.
      const blurredNow = (m: number) => {
        const randomMinutes = 2 * (Math.random() - 0.5) * m * 60 * 1000;
        const submissionDatetime = new Date(Date.now() + randomMinutes);
        submissionDatetime.setSeconds(0);
        submissionDatetime.setMilliseconds(0);
        return new Date(submissionDatetime);
      };

      fetch("/api/submission", {
        method: "POST",
        body: JSON.stringify({
          captcha: {
            id: captcha.id,
            answer: captchaAnswer
          },
          submission: {
            submittedAt: blurredNow(15),
            age,
            zipcode,
            confinedWith,
            health,
            recoveredSince,
            // Symptoms
            fever,
            feverSince,
            cough,
            coughSince,
            tasteAndSmell,
            tasteAndSmellSince,
            headache,
            headacheSince,
            throat,
            throatSince,
            diarrhea,
            diarrheaSince,
            feeding,
            feedingSince,
            breathing,
            breathingSince,
            // Optional questions
            covidTest,
            covidResult,
            bmi: getBMI(weight, height),
            hypertension,
            diabetes,
            cancer,
            pneumo,
            dialyse,
            liver,
            pregnant,
            immuno,
            immunoSuppressor
          }
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response: any) => {
          return response.json();
        })
        .then((result: any) => {
          switch (result.status) {
            case "success":
              updateSubmissionStatus("success");
              break;
            case "error":
              updateSubmissionStatus("error");
              break;
            default:
              updateSubmissionStatus("error");
              break;
          }
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
        <title>Corona Status</title>
      </Head>

      <Header />

      <div className="container grid-xs">
        <form onSubmit={sendSubmission}>
          <div className="timeline">
            <div className="timeline-item">
              <FormIcon condition={age !== undefined} optional={false} />
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage id={`age.question`} />
                  </label>
                  {Object.keys(ageCategories).map(
                    (state: string, index: number) => (
                      <label key={index} className="form-radio">
                        <input
                          type="radio"
                          value={state}
                          checked={age === state}
                          onChange={(event: any) => {
                            updateAge(event.target.value);
                          }}
                        />
                        <i className="form-icon"></i>{" "}
                        <FormattedMessage id={`age.${state}`} />
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
            <ZipInput
              value={zipcode}
              updateValue={updateZipcode}
              name={"zipcode"}
              messages={messages}
              optional={false}
              pattern={"^[0-9]{5,5}$"} // todo: load from /lang
            />

            <NumberInput
              value={confinedWith}
              updateValue={updateConfinedWith}
              name={"confinedWith"}
              optional={false}
              messages={messages}
            />

            <div className="timeline-item">
              <FormIcon condition={health !== undefined} optional={false} />
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage id={`health.question`} />
                  </label>
                  {Object.keys(healthStates).map(
                    (state: string, index: number) => (
                      <label key={index} className="form-radio">
                        <input
                          type="radio"
                          value={state}
                          checked={health === state}
                          onChange={(event: any) => {
                            updateHealth(event.target.value);
                          }}
                        />
                        <i className="form-icon"></i>{" "}
                        <FormattedMessage id={`health.${state}`} />
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>

            {health === healthStates.RECOVERED ? (
              <NumberInput
                value={recoveredSince}
                updateValue={updateRecoveredSince}
                name={"recoveredSince"}
                optional={false}
                messages={messages}
              />
            ) : null}

            {health !== undefined && health !== healthStates.WELL ? (
              <>
                <SymptomInput
                  states={feverStates}
                  value={fever}
                  updateValue={updateFever}
                  valueSince={feverSince}
                  updateValueSince={updateFeverSince}
                  inputOk={feverOk}
                  name={"fever"}
                  health={health}
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
                  health={health}
                  optional={false}
                  messages={messages}
                />

                <SymptomInput
                  states={tasteAndSmellStates}
                  value={tasteAndSmell}
                  updateValue={updateTasteAndSmell}
                  valueSince={tasteAndSmellSince}
                  updateValueSince={updateTasteAndSmellSince}
                  inputOk={tasteAndSmellOk}
                  name={"tasteAndSmell"}
                  health={health}
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
                  health={health}
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
                  health={health}
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
                  health={health}
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
                  health={health}
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
                  health={health}
                  optional={false}
                  messages={messages}
                />
              </>
            ) : null}

            <div
              className="divider text-center"
              data-content={intl.formatMessage(messages.optional)}
            ></div>

            <div className="timeline-item">
              <FormIcon condition={covidTest !== undefined} optional={true} />
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage id={`covid.test.question`} />
                  </label>
                  {Object.keys(covidTestStates).map(
                    (state: string, index: number) => (
                      <label key={index} className="form-radio">
                        <input
                          type="radio"
                          value={state}
                          checked={covidTest === state}
                          onChange={(event: any) => {
                            updateCovidTest(event.target.value);
                          }}
                        />
                        <i className="form-icon"></i>{" "}
                        <FormattedMessage id={`covid.test.${state}`} />
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>

            {covidTest === covidTestStates.YES ? (
              <div className="timeline-item">
                <FormIcon
                  condition={covidResult !== undefined}
                  optional={true}
                />
                <div className="timeline-content">
                  <div className="form-group">
                    <label className="form-label">
                      <FormattedMessage id={`covid.result.question`} />
                    </label>
                    {Object.keys(covidResultStates).map(
                      (state: string, index: number) => (
                        <label key={index} className="form-radio">
                          <input
                            type="radio"
                            value={state}
                            checked={covidResult === state}
                            onChange={(event: any) => {
                              updateCovidResult(event.target.value);
                            }}
                          />
                          <i className="form-icon"></i>{" "}
                          <FormattedMessage id={`covid.result.${state}`} />
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            {health !== undefined && health !== healthStates.WELL ? (
              <>
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

                <div className="timeline-item">
                  <FormIcon condition={false} optional={true} />
                  <div className="timeline-content">
                    <div className="form-group">
                      <label className="form-label">
                        Cochez vos antécédents médicaux :
                      </label>

                      <MedicalHistoryCheckbox
                        value={hypertension}
                        updateValue={updateHypertension}
                        name="hypertension"
                      />

                      <MedicalHistoryCheckbox
                        value={diabetes}
                        updateValue={updateDiabetes}
                        name="diabetes"
                      />

                      <MedicalHistoryCheckbox
                        value={cancer}
                        updateValue={updateCancer}
                        name="cancer"
                      />

                      <MedicalHistoryCheckbox
                        value={pneumo}
                        updateValue={updatePneumo}
                        name="pneumo"
                      />

                      <MedicalHistoryCheckbox
                        value={dialyse}
                        updateValue={updateDialyse}
                        name="dialyse"
                      />

                      <MedicalHistoryCheckbox
                        value={liver}
                        updateValue={updateLiver}
                        name="liver"
                      />

                      <MedicalHistoryCheckbox
                        value={pregnant}
                        updateValue={updatePregnant}
                        name="pregnant"
                      />

                      <MedicalHistoryCheckbox
                        value={immuno}
                        updateValue={updateImmuno}
                        name="immuno"
                      />

                      <MedicalHistoryCheckbox
                        value={immunoSuppressor}
                        updateValue={updateImmunoSuppressor}
                        name="immunoSuppressor"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            <div
              className="divider text-center"
              data-content={intl.formatMessage(messages.verification)}
            ></div>

            <div className="timeline-item">
              <FormIcon
                condition={captchaAnswer.length === 4}
                optional={false}
              />
              <div className="timeline-content">
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage id="captcha.question" />
                  </label>
                  <div dangerouslySetInnerHTML={{ __html: captcha.data }}></div>
                  <input
                    className="form-input"
                    type="text"
                    placeholder={intl.formatMessage(
                      messages.placeholders.captcha
                    )}
                    value={captchaAnswer}
                    onChange={(event: any) => {
                      updateCaptchaAnswer(event.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right" style={{ marginTop: 40 }}>
            <SubmitButton alreadySent={alreadySent} disabled={!canSubmit} />
          </div>
        </form>

        <Footer />
      </div>

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
                <li>
                  <FormattedMessage id="modal.content.list.2" />
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

            <div className="p-centered p-2">
              <Share messages={messages} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

FormPage.getInitialProps = async (context: NextPageContext) => {
  console.log(context);

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? `https://${context.req.headers.host}`
      : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/captcha`);
  const captcha = await res.json();

  return {
    captcha
  };
};

export default FormPage;
