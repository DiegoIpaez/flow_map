import styles from "./textUpdaterNode.module.css";
import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Handle, Position } from "reactflow";
import useFlowStore from "@/store/flowStore";

interface Props {
  id: string;
  data: { label?: string };
  isConnectable: boolean;
}

function TextUpdaterNode({ id, data, isConnectable }: Props) {
  const { setNodeById } = useFlowStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(data.label);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const handleOnFocus = () => {
      const inputElement = inputRef.current;
      if (!inputElement) return;
      inputElement.focus();
    };
    if (isEdit) handleOnFocus();
  }, [isEdit]);

  const handleIsEdit = () => setIsEdit(true);

  const handleOnChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  }, []);

  const handleOnBlur = () => {
    setNodeById(id, value ?? "");
    setIsEdit(false);
  };

  const handeOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOnBlur();
  };

  return (
    <div className={styles.textUpdaterNode}>
      <Handle
        id="a"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <button onClick={handleIsEdit}>✏</button>
      <span hidden={isEdit}>{value}</span>
      <form onSubmit={handeOnSubmit}>
        <input
          hidden={!isEdit}
          id="text"
          name="text"
          ref={inputRef}
          onChange={handleOnChange}
          className="nodrag"
          value={value}
          onBlur={handleOnBlur}
        />
      </form>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
