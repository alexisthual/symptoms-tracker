import Head from "next/head";
import Link from "next/link";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import Footer from "../components/Footer";
import Share from "../components/Share";
import Header from "../components/Header";
import Map from "../components/Map";

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

      <div className="empty">
        <p className="empty-title h5">
          <FormattedMessage id="home.support.title" />{" "}
        </p>
        <p className="empty-subtitle">
          <FormattedMessage
            id="support"
            values={{
              b: (...chunks: any) => <b>{chunks}</b>
            }}
          />
        </p>
        <div className="empty-action">
          <Link href="/form">
            <button className="btn btn-primary btn-lg p-centered">
              <i className="icon icon-arrow-right"></i>{" "}
              <FormattedMessage id="takesurvey" />
            </button>
          </Link>
        </div>
      </div>

      <Map />

      <div className="container grid-xs text-justify">
        <Footer />
        <Share messages={messages}></Share>
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
