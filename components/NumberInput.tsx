import { useIntl, FormattedMessage } from "react-intl";

import FormIcon from "./FormIcon";

interface INumberValueProps {
  value: string | number;
  updateValue: any;
  name: string;
  optional: boolean;
  messages: any;
}

const NumberInput = ({
  value,
  updateValue,
  name,
  optional,
  messages
}: INumberValueProps) => {
  const intl = useIntl();

  return (
    <div className="timeline-item">
      <FormIcon
        condition={
          value !== undefined &&
          value !== null &&
          value !== "" &&
          Number(value) >= 0
        }
        optional={optional}
      />
      <div className="timeline-content">
        <div className="form-group">
          <label className="form-label">
            <FormattedMessage id={`${name}.question`} />
          </label>
          <input
            type="number"
            className="form-input"
            placeholder={intl.formatMessage(messages.placeholders[name])}
            value={value}
            onChange={(event: any) => {
              updateValue(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
