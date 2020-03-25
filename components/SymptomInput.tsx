import { FormattedMessage, useIntl } from "react-intl";
import FormIcon from "./FormIcon";

interface ISymptomInputProps {
  states: any;
  value: string;
  updateValue: any;
  valueSince: number;
  updateValueSince: any;
  inputOk: boolean;
  name: string;
  optional: boolean;
  messages: any;
}

const SymptomInput = ({
  states,
  value,
  updateValue,
  valueSince,
  updateValueSince,
  inputOk,
  name,
  optional,
  messages
}: ISymptomInputProps) => {
  const intl = useIntl();

  return (
    <div className="timeline-item">
      <FormIcon condition={inputOk} optional={optional} />
      <div className="timeline-content">
        <div className="form-group">
          <label className="form-label">
            <FormattedMessage id={`${name}.question`} />
          </label>
          {Object.keys(states).map((state: string, index: number) => (
            <label key={index} className="form-radio">
              <input
                type="radio"
                value={state}
                checked={value === state}
                onChange={(event: any) => {
                  updateValue(event.target.value);
                }}
              />
              <i className="form-icon"></i>{" "}
              <FormattedMessage id={`${name}.${state}`} />
            </label>
          ))}
        </div>

        {value && value !== states.NO ? (
          <div className="form-group">
            <label className="form-label">
              <FormattedMessage id="howmanydays" />
            </label>
            <input
              type="number"
              className="form-input"
              placeholder={intl.formatMessage(messages.pick)}
              value={valueSince}
              onChange={(event: any) => {
                updateValueSince(event.target.value);
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SymptomInput;
