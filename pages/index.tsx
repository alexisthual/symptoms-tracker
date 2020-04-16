import Head from "next/head";
import Link from "next/link";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import Footer from "../components/Footer";
import Share from "../components/Share";
import Header from "../components/Header";

import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-exp.min.css";
import "spectre.css/dist/spectre-icons.min.css";
import "../style.scss";

const messages = defineMessages({
  about: { id: "about" },
  share: {
    url: { id: "share.url" },
    quote: { id: "share.quote" }
  }
});

const IndexPage = ({ language }: any) => {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>Corona Status | {intl.formatMessage(messages.about)}</title>
      </Head>

      <Header language={language} />

      <div className="container grid-xs text-justify">
        <p>
          <FormattedMessage
            id="support"
            values={{
              b: (...chunks: any) => <b>{chunks}</b>
            }}
          />
        </p>

        <p>
          <Link href="/form">
            <button className="btn btn-primary btn-lg p-centered">
              <i className="icon icon-arrow-right"></i>{" "}
              <FormattedMessage id="takesurvey" />
            </button>
          </Link>
        </p>

        <p>
          10000 réponses sont nécessaires par jour pour pouvoir publier le jeu
          de données. Il nous faut encore X réponses pour atteindre l'objectif
          d'aujourd'hui.
        </p>

        <div
          className="columns py-2"
          style={{ alignItems: "center", marginBottom: "20px" }}
        >
          <div className="column col-3">Progression :</div>
          <div className="column col-9">
            <div className="bar bg-secondary">
              <div
                className="bar-item tooltip"
                data-tooltip="25%"
                style={{ width: "25%" }}
              >
                25%
              </div>
              <div
                className="bar-item bg-secondary tooltip"
                data-tooltip="75%"
                style={{ width: "75%" }}
              >
                75%
              </div>
            </div>
          </div>
        </div>

        <p>
          <FormattedMessage id="usage" />
        </p>

        <p>
          <Link href="/about">
            <button className="btn p-centered">
              <i className="icon icon-arrow-right"></i>{" "}
              <FormattedMessage id="knowmore" />
            </button>
          </Link>
        </p>
        <Share messages={messages}></Share>
        <Footer />
      </div>
    </>
  );
};

IndexPage.getInitialProps = async () => {
  return {
    language: "fr"
  };
};

export default IndexPage;
