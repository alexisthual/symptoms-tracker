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
  const shareUrl = intl.formatMessage(messages.share.url);

  return (
    <div className="share container grid-xs text-justify">
      <div className="flex-centered">
        <h6>
          <FormattedMessage id="share.title" />
        </h6>
      </div>
      <div className="inline-flex flex-centered">
        <FacebookShareButton
          url={shareUrl}
          quote={messages.share["share.quote"]}
          className="facebook-button"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl} className="twitter-button">
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <LinkedinShareButton url={shareUrl} className="linkedin-button">
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <WhatsappShareButton url={shareUrl} className="whatsapp-button">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default Share;
