import { useRef } from "react";

type RichTextEditorProps = {
  initialValue: string;
  onChange: (content: string) => void;
};

const RichTextEditor = ({ initialValue, onChange }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const initialHtmlRef = useRef(initialValue);

  const applyCommand = (command: string, value?: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();
    document.execCommand(command, false, value);
    onChange(editor.innerHTML);
  };

  return (
    <div className="rounded-md border border-gray-300">
      <div className="flex flex-wrap gap-1 border-b border-gray-300 p-2" role="toolbar" aria-label="Blog formatting">
        <button type="button" className="rounded border px-2 py-1 text-sm hover:bg-gray-100" aria-label="Bold" title="Bold" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("bold")}>
          <strong>B</strong>
        </button>
        <button type="button" className="rounded border px-2 py-1 text-sm italic hover:bg-gray-100" aria-label="Italic" title="Italic" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("italic")}>
          I
        </button>
        <button type="button" className="rounded border px-2 py-1 text-sm underline hover:bg-gray-100" aria-label="Underline" title="Underline" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("underline")}>
          U
        </button>
        <span className="mx-1 border-l border-gray-300" aria-hidden="true" />
        <button type="button" className="rounded border px-2 py-1 text-sm hover:bg-gray-100" aria-label="Paragraph" title="Paragraph" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("formatBlock", "<p>")}>
          Paragraph
        </button>
        <button type="button" className="rounded border px-2 py-1 text-sm hover:bg-gray-100" aria-label="Heading 2" title="Heading 2" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("formatBlock", "<h2>")}>
          H2
        </button>
        <button type="button" className="rounded border px-2 py-1 text-sm hover:bg-gray-100" aria-label="Heading 3" title="Heading 3" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("formatBlock", "<h3>")}>
          H3
        </button>
        <span className="mx-1 border-l border-gray-300" aria-hidden="true" />
        <button type="button" className="rounded border px-2 py-1 text-sm hover:bg-gray-100" aria-label="Align left" title="Align left" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("justifyLeft")}>
          Left
        </button>
        <button type="button" className="rounded border px-2 py-1 text-sm hover:bg-gray-100" aria-label="Align center" title="Align center" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("justifyCenter")}>
          Center
        </button>
        <button type="button" className="rounded border px-2 py-1 text-sm hover:bg-gray-100" aria-label="Align right" title="Align right" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("justifyRight")}>
          Right
        </button>
        <button type="button" className="rounded border px-2 py-1 text-sm hover:bg-gray-100" aria-label="Justify text" title="Justify text" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("justifyFull")}>
          Justify
        </button>
        <span className="mx-1 border-l border-gray-300" aria-hidden="true" />
        <button type="button" className="rounded border px-2 py-1 text-sm hover:bg-gray-100" aria-label="Bulleted list" title="Bulleted list" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("insertUnorderedList")}>
          Bullets
        </button>
        <button type="button" className="rounded border px-2 py-1 text-sm hover:bg-gray-100" aria-label="Numbered list" title="Numbered list" onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("insertOrderedList")}>
          Numbering
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label="Blog content"
        aria-multiline="true"
        className="min-h-64 max-h-[32rem] overflow-y-auto p-3 focus:outline-none [&_h2]:my-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:my-3 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: initialHtmlRef.current }}
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
    </div>
  );
};

export default RichTextEditor;
