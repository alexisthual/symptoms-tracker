import App from "next/app";
import IntlProvider from "../components/IntlProvider";

import getLocale from "../lib/getLocale";
import getMessages from "../lib/getMessages";

// if (typeof window === 'undefined') {
//   // dom parser for FormatedHTMLMessages
//   global.DOMParser = new (require('jsdom').JSDOM)().window.DOMParser
// }

export default class SymptomsTrackerApp extends App<{
  locale: any;
  messages: any;
}> {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const locale = await getLocale(ctx);
    const messages = await getMessages(locale);

    return { pageProps, locale, messages };
  }

  render() {
    const { Component, pageProps, locale, messages } = this.props;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <Component {...pageProps} />
      </IntlProvider>
    );
  }
}
