import { useRef, useEffect } from "react";

export default function MarkText(props) {
  var ref = useRef();

  function format(command) {
    document.execCommand(command, false, null);
    props.setValue(ref.current.innerHTML);
  }

  useEffect(
    function () {
      if (ref.current && ref.current.innerHTML !== props.value) {
        ref.current.innerHTML = props.value;
      }
    },
    [props.value]
  );

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={function () {
            format("bold");
          }}
        >
          B
        </button>
        <button
          type="button"
          onClick={function () {
            format("italic");
          }}
        >
          I
        </button>
        <button
          type="button"
          onClick={function () {
            format("underline");
          }}
        >
          U
        </button>
        <button
          type="button"
          onClick={function () {
            props.setValue("");
          }}
        >
          Tozalash
        </button>
      </div>

      <div
        ref={ref}
        contentEditable
        onInput={function (e) {
          props.setValue(e.currentTarget.innerHTML);
        }}
        suppressContentEditableWarning={true}
      />
    </div>
  );
}
