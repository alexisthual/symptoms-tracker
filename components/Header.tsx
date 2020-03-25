import Link from "next/link";
import { FormattedMessage } from "react-intl";

const Header = ({ language }: any) => (
  <>
    <div className="disclaimer bg-primary py-2">
      <div className="container grid-lg">
        <div className="columns col-gapless">
          <div
            className="column col-2 text-center"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <i className="icon icon-flag"></i>
          </div>
          <div className="column col-10 text-justify">
            <FormattedMessage id="disclaimer" />
          </div>
        </div>
      </div>
    </div>

    <div className="navbar">
      <section className="navbar-section"></section>
      <section className="navbar-center">
        <Link href="/">
          <button className="btn btn-link">
            <h4>
              <FormattedMessage id="title" />
            </h4>
          </button>
        </Link>
      </section>
      <section className="navbar-section px-2">
        <a href="#" className="btn btn-link">
          <i className="icon icon-location"></i> {language}
        </a>
      </section>
    </div>
  </>
);

export default Header;
