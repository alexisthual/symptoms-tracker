import { FormattedMessage, useIntl } from "react-intl";
import FormIcon from "./FormIcon";

import { sinceStates, healthStates } from "../lib/types";

interface ISymptomInputProps {
  states: any;
  value: string;
  updateValue: any;
  valueSince: string;
  updateValueSince: any;
  inputOk: boolean;
  name: string;
  health: healthStates;
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
  health,
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
            <FormattedMessage
              id={`${name}.question.${
                health === healthStates.RECOVERED ? "past" : "present"
              }`}
            />
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

        {health === healthStates.ILL && value && value !== states.NO ? (
          <div className="form-group">
            <label className="form-label">
              <FormattedMessage id="howmanydays" />
            </label>

            {Object.keys(sinceStates).map((state: string, index: number) => (
              <label key={index} className="form-radio">
                <input
                  type="radio"
                  value={state}
                  checked={valueSince === state}
                  onChange={(event: any) => {
                    updateValueSince(event.target.value);
                  }}
                />
                <i className="form-icon"></i>{" "}
                <FormattedMessage id={`sinceDays.${state}`} />
              </label>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SymptomInput;
