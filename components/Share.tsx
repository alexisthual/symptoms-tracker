import { FormattedMessage, useIntl } from "react-intl";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share";

interface IShareProps {
  messages: any;
}

const Share = ({ messages }: IShareProps) => {
  const intl = useIntl();
  const ShareUrl = intl.formatMessage(messages.share.url);

  const ShareButton = (shareMedia: string, shareUrl: string = ShareUrl) => {
    shareUrl ? null : (shareMedia = null);
    switch (shareMedia) {
      case "facebook":
        return (
          <div className="social-media">
            <FacebookShareButton
              url={shareUrl}
              quote={messages.share["share.quote"]}
              className="facebook-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
        );
      case "twitter":
        return (
          <div className="social-media">
            <TwitterShareButton url={shareUrl} className="twitter-button">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        );
      case "linkedin":
        return (
          <div className="social-media">
            <LinkedinShareButton url={shareUrl} className="linkedin-button">
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
        );
      case "whatsapp":
        return (
          <div className="social-media">
            <WhatsappShareButton url={shareUrl} className="whatsapp-button">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        );
      default:
        return;
    }
  };
  return (
    <div className="share container grid-xs text-justify">
      <div className="flex-centered">
        <h6>
          <FormattedMessage id="share.title" />
        </h6>
      </div>
      <div className="inline-flex flex-centered">
        {ShareButton("facebook")}
        {ShareButton("twitter")}
        {ShareButton("whatsapp")}
        {ShareButton("linkedin")}
      </div>
    </div>
  );
};

export default Share;
