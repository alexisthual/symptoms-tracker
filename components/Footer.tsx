import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

const Footer = () => {
  const router = useRouter();

  const switchButton = (router: any) => {
    switch (router.pathname) {
      case "/about":
        return (
          <Link href="/">
            <button className="btn btn-link">
              <FormattedMessage id="home" />
            </button>
          </Link>
        );
      default:
        return;
    }
  };

  return (
    <div className="footer inline-flex">
      {switchButton(router)}
      <a href="https://github.com/alexisthual/symptoms-tracker">
        <button className="btn btn-link">
          <FormattedMessage id="sourcecode" />
        </button>
      </a>
    </div>
  );
};

export default Footer;
