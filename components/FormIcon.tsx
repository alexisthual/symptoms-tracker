interface IFormIconProps {
  condition: boolean;
  optional: boolean;
}

const FormIcon = ({ condition, optional }: IFormIconProps) => (
  <div className="timeline-left">
    {condition ? (
      <div className="timeline-icon icon-lg bg-success">
        <i className="icon icon-check"></i>
      </div>
    ) : optional ? (
      <div className="timeline-icon icon-lg bg-secondary">
        <i className="icon icon-arrow-right"></i>
      </div>
    ) : (
      <div className="timeline-icon icon-lg bg-primary">
        <i className="icon icon-arrow-right"></i>
      </div>
    )}
  </div>
);

export default FormIcon;
