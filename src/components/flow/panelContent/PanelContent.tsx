import { BackgroundVariant } from "reactflow";

const { Cross, Dots, Lines } = BackgroundVariant;

interface Props {
  setVariant: (value: BackgroundVariant) => void;
}

const PanelContent = ({ setVariant }: Props) => {
  return (
    <>
      <div className="text">variant:</div>
      <button className="btn-small ms-0" onClick={() => setVariant(Dots)}>
        dots
      </button>
      <button className="btn-small" onClick={() => setVariant(Lines)}>
        lines
      </button>
      <button className="btn-small" onClick={() => setVariant(Cross)}>
        cross
      </button>
      <br />
    </>
  );
};

export default PanelContent;
