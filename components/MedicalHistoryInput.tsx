import { FormattedMessage } from "react-intl";
import FormIcon from "./FormIcon";

interface IMedicalHistoryInput {
  states: any;
  value: string;
  updateValue: any;
  name: string;
  optional: boolean;
}

const MedicalHistoryInput = ({
  states,
  value,
  updateValue,
  name,
  optional
}: IMedicalHistoryInput) => {
  return (
    <div className="timeline-item">
      <FormIcon condition={value !== undefined} optional={optional} />
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
      </div>
    </div>
  );
};

export default MedicalHistoryInput;
