import Head from "next/head";
import Link from "next/link";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import Footer from "../components/Footer";
import Header from "../components/Header";

import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-exp.min.css";
import "spectre.css/dist/spectre-icons.min.css";
import "../style.scss";

const messages = defineMessages({
  about: { id: "about" }
});

const AboutPage = ({ language }: any) => {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>Symptoms Tracker | {intl.formatMessage(messages.about)}</title>
      </Head>
      <Header language={language} />

      <div className="container grid-xs text-justify">
        <h5>
          <FormattedMessage id="about.collection.title" />
        </h5>
        <p>
          <FormattedMessage id="about.collection.content" />
        </p>

        <h5>
          <FormattedMessage id="about.utility.title" />
        </h5>
        <p>
          <FormattedMessage
            id="about.utility.content"
            values={{ b: (...chunks: any) => <b>{chunks}</b> }}
          />
        </p>

        <h5>
          <FormattedMessage id="about.usage.title" />
        </h5>
        <p>
          <FormattedMessage id="about.usage.content" />
        </p>
        <ul>
          <li>
            <FormattedMessage id="about.usage.list.2" />
          </li>
          <li>
            <FormattedMessage id="about.usage.list.1" />
          </li>
          <li>
            <FormattedMessage id="about.usage.list.0" />
          </li>
        </ul>

        <h5>
          <FormattedMessage id="about.contribute.title" />
        </h5>
        <p>
          <FormattedMessage id="about.contribute.content" />
        </p>

        <ul>
          <li>
            <FormattedMessage id="about.contribute.list.0" />
          </li>
          <li>
            <FormattedMessage
              id="about.contribute.list.1"
              values={{
                a: (...chunks: any) => (
                  <a href="https://github.com/alexisthual/symptoms-tracker/tree/master/lang">
                    {chunks}
                  </a>
                )
              }}
            />
          </li>
          <li>
            <FormattedMessage id="about.contribute.list.2" />
          </li>
        </ul>

        <h5>
          <FormattedMessage id="about.contact.title" />
        </h5>
        <p>
          <FormattedMessage
            id="about.contact.content"
            values={{ b: (...chunks: any) => <b>{chunks}</b> }}
          />
        </p>

        <h5>
          <FormattedMessage id="about.credits.title" />
        </h5>

        <p>
          <FormattedMessage
            id="about.credits.content"
            values={{
              ascalingo: (...chunks: any) => (
                <a href="https://scalingo.com">{chunks}</a>
              ),
              azeit: (...chunks: any) => <a href="https://zeit.co">{chunks}</a>,
              aspectre: (...chunks: any) => (
                <a href="https://picturepan2.github.io/spectre">{chunks}</a>
              ),
              afreepik: (...chunks: any) => (
                <a href="https://www.flaticon.com/authors/freepik">{chunks}</a>
              ),
              aflaticon: (...chunks: any) => (
                <a href="https://www.flaticon.com">{chunks}</a>
              )
            }}
          />
        </p>

        <h5>
          <FormattedMessage id="about.contributors.title" />
        </h5>

        <ul>
          <li>
            <a href="https://twitter.com/AlexisThual">@AlexisThual</a>
          </li>
          <li>
            <a href="https://twitter.com/matti_sg">@matti_sg</a>
          </li>
          <li>
            <a href="https://twitter.com/revolunet">@revolunet</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/raphaëlle-bertrand-lalo-185679b9/">
              Raphaëlle Bertrand-Lalo
            </a>
          </li>
        </ul>

        <p>
          <FormattedMessage id="about.coronastatus.community" />{" "}
          <a href="https://github.com/BustByte/coronastatus">
            <FormattedMessage id="about.coronastatus.link" />
          </a>
        </p>

        <Footer />
      </div>
    </>
  );
};

AboutPage.getInitialProps = async () => {
  return {
    language: "fr"
  };
};

export default AboutPage;
