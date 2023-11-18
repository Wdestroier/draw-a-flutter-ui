"use client";

import { use, useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-cshtml";

import "prismjs/themes/prism-tomorrow.css";

export function PreviewModal({
  html,
  setHtml,
}: {
  html: string | null;
  setHtml: (html: string | null) => void;
}) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, [html, activeTab]); // <--- run when post updates

  if (!html) {
    return null;
  }

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white rounded-lg shadow-xl flex flex-col"
        style={{
          width: "calc(100% - 64px)",
          height: "calc(100% - 64px)",
        }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex space-x-1">
            <TabButton
              active={activeTab === "preview"}
              onClick={() => {
                setActiveTab("preview");
              }}
            >
              Preview
            </TabButton>
          </div>

          <button
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring"
            onClick={() => {
              setHtml(null);
            }}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <iframe className="w-full h-full" srcdoc={`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dartpad</title>
            <script type="text/javascript" src="https://dartpad.dev/inject_embed.dart.js" defer></script>
        </head>

        <body>
            <div class="code-excerpt__code">
                <pre>
                    <code class="language-run-dartpad:theme-light:mode-flutter:run-true:split-40:width-99%:height-95vh">
                      ${html}
                    </code>
                </pre>
            </div>
        </body>

        </html>
        `}></iframe>
      </div>
    </>
  );
}

interface TabButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

function TabButton({ active, ...buttonProps }: TabButtonProps) {
  const className = active
    ? "px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-t-md focus:outline-none focus:ring"
    : "px-4 py-2 text-sm font-medium text-blue-500 bg-transparent hover:bg-blue-100 focus:bg-blue-100 rounded-t-md focus:outline-none focus:ring";
  return <button className={className} {...buttonProps}></button>;
}
