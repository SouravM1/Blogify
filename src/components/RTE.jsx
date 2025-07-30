
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full mb-6">
      {label && (
        <label
          className="block mb-2 text-sm sm:text-base font-medium text-gray-700 tracking-wide"
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
                height: 400,
                menubar: false, // Hide menubar on mobile for better UX
                skin: "oxide-dark",
                content_css: "dark",
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap",
                  "preview", "anchor", "searchreplace", "visualblocks", "code",
                  "fullscreen", "insertdatetime", "media", "table", "wordcount",
                ],
                toolbar: [
                  "undo redo | bold italic underline | forecolor backcolor",
                  "alignleft aligncenter alignright | bullist numlist",
                  "link image media | code fullscreen preview"
                ].join(" | "),
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; padding:10px; background-color:#fff; }",
                // Mobile-friendly settings
                mobile: {
                  theme: 'silver',
                  plugins: ['lists', 'autolink', 'link', 'image'],
                  toolbar: 'bold italic | bullist numlist | link image'
                },
                // Responsive settings
                width: '100%',
                min_height: 300,
                max_height: 600,
                resize: true,
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
