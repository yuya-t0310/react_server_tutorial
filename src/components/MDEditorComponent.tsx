"use client";

import { useState, useEffect } from "react";
import type MDEditorType from "@uiw/react-md-editor";

interface MDEditorProps {
  value: string;
  onChange: (value?: string) => void;
}

export function MDEditorComponent({ value, onChange }: MDEditorProps) {
  const [MDEditor, setMDEditor] = useState<typeof MDEditorType | null>(null);

  useEffect(() => {
    import("@uiw/react-md-editor").then((mod) => {
      setMDEditor(() => mod.default);
    });
  }, []);

  if (!MDEditor) {
    return (
      <div className="w-full h-[400px] border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
        Loading Editor
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        data-color-mode="light"
        style={
          {
            "--color-fg-default": "#000000",
            "--color-canvas-default": "#ffffff",
          } as React.CSSProperties
        }
        className="prose max-w-none"
      >
        <MDEditor
          value={value}
          onChange={onChange}
          preview="live"
          height={400}
          className="w-full !text-black"
          textareaProps={{
            placeholder: "Write your article content here...",
            style: {
              color: "#000000",
              backgroundColor: "#ffffff",
              fontSize: "16px",
            },
          }}
        />
      </div>
    </div>
  );
}
