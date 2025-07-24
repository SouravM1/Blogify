
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full mb-6">
      {label && (
        <label
          className="block mb-2 text-sm font-medium text-gray-700 tracking-wide"
        >
          {label}
        </label>
      )}

      <div className="rounded-lg border border-gray-300 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-200">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey="73znz2sxqmnt1h7yyh5esec106s0ihrpyckw2fpddmjrtyex"
              initialValue={defaultValue}
              init={{
                height: 500,
                menubar: true,
                skin: "oxide-dark", // ✨ sleek dark toolbar (you can remove if you prefer default)
                content_css: "dark", // ✨ makes the editor content dark-themed
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline | forecolor backcolor | " +
                  "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
                  "link image media | code fullscreen preview",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; padding:10px; background-color:#fff; }",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
