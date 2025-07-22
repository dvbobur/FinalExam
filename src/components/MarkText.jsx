import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";

export default function MarkText({ value, setValue }) {
  const ref = useRef();

  function format(command) {
    document.execCommand(command, false, null);
    setValue(ref.current.innerHTML);
  }
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="space-y-2 border rounded p-3 backdrop-blur-2xl border-[#ffffff1e]">
      <div
        ref={ref}
        contentEditable
        onInput={(e) => setValue(e.currentTarget.innerHTML)}
        suppressContentEditableWarning
        className="min-h-[283px] w-full overflow-auto outline-none text-lg"
      />

      <div className="flex gap-3">
        <Button onClick={() => format("bold")} variant="secondary" size="icon" className="size-7 rounded font-bold" title="Bold">
          B
        </Button>
        <Button onClick={() => format("italic")} variant="secondary" size="icon" className="size-7 rounded italic" title="Italic">
          i
        </Button>
        <Button onClick={() => format("underline")} variant="secondary" size="icon" className="size-7 rounded underline" title="Underline">
          U
        </Button>
        <Button onClick={() => setValue("")} variant="link" className="size-7 rounded text-white" title="Clear input">
          Clear
        </Button>
      </div>
    </div>
  );
}
