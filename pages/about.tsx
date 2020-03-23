import Head from "next/head";
import Link from "next/link";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import Header from "../components/header";

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
        <h5>Qu'est-ce que ce site collecte ?</h5>

        <p>
          Ne sont collectées que les données que vous entrez dans le formulaire.
          Rien d'autre.
        </p>

        <h5>Pourquoi est-ce utile ?</h5>

        <p>
          Le nombre de personnes diagnostiquées du COVID-19 représente mal la
          réalité du terrain : le nombre de personnes infectées est
          systématiquement beaucoup plus important. Une approximation plus fine
          du nombre de cas réels peut être déduite du nombre de décès liés au
          virus, mais la collecte de données auprès des personnes confinées
          reste le moyen le plus direct d'évaluer l'évolution de la pandémie.
        </p>

        <h5>À quoi peuvent servir les données collectées ?</h5>

        <p>
          Les données collectées sont ouvertes. Elles peuvent notamment être
          utilisées pour :
        </p>

        <ul>
          <li>suivre l'évolution de la pandémie</li>
          <li>
            anticiper plus en amont et avec plus de précision les arrivées dans
            les services de soins
          </li>
          <li>
            détecter plus vite la naissance de nouveaux foyers d'infection
          </li>
        </ul>

        <h5>Comment contribuer à ce projet ?</h5>

        <p>Pour participer activement à ce projet, vous pouvez :</p>

        <ul>
          <li>faire participer le plus de personnes possibles</li>
          <li>
            traduire le site dans de{" "}
            <a href="https://github.com/alexisthual/symptoms-tracker/tree/master/lang">
              nouvelles langues
            </a>
          </li>
          <li>
            créer des analyses de données à partir des informations collectées
          </li>
        </ul>

        <h5>Contact</h5>

        <p>
          Pour toute question, demande ou offre d'aide, prendre contact avec{" "}
          <em>alexis.thual [at] gmail [dot] com</em>.
        </p>

        <div className="footer inline-flex">
          <Link href="/">
            <button className="btn btn-link">
              <FormattedMessage id="home" />
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

AboutPage.getInitialProps = async () => {
  return {
    language: "fr"
  };
};

export default AboutPage;
