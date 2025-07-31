
import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to load TinyMCE and set a timeout for fallback
    const loadTinyMCE = () => {
      try {
        // Check if TinyMCE is available
        if (typeof window !== 'undefined' && window.tinymce) {
          setIsEditorLoaded(true);
          setIsLoading(false);
          return;
        }
        
        // If not immediately available, wait a bit and try again
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.tinymce) {
            setIsEditorLoaded(true);
          } else {
            // TinyMCE failed to load, use fallback
            console.log('TinyMCE not available, using fallback editor');
            setIsEditorLoaded(false);
          }
          setIsLoading(false);
        }, 2000); // Wait 2 seconds for TinyMCE to load
        
      } catch (error) {
        console.error('Error loading TinyMCE:', error);
        setIsEditorLoaded(false);
        setIsLoading(false);
      }
    };

    loadTinyMCE();
  }, []);

  return (
    <div className="w-full mb-6">
      {label && (
        <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700 tracking-wide">
          {label}
        </label>
      )}

      <div className="rounded-lg border border-gray-300 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-200">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading editor...</p>
          </div>
        ) : (
          <Controller
            name={name || "content"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                {isEditorLoaded ? (
                  <Editor
                    apiKey="your-api-key-here"
                    initialValue={defaultValue}
                    onInit={(evt, editor) => {
                      console.log('TinyMCE initialized successfully');
                    }}
                    onLoadContent={(content) => {
                      console.log('Content loaded:', content);
                    }}
                    onError={(error) => {
                      console.error('TinyMCE Error:', error);
                    }}
                    init={{
                      height: 400,
                      menubar: false,
                      skin: "oxide",
                      content_css: "default",
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
                      // Better error handling
                      setup: (editor) => {
                        editor.on('init', () => {
                          console.log('Editor initialized successfully');
                        });
                        editor.on('load', () => {
                          console.log('Editor content loaded');
                        });
                      }
                    }}
                    onEditorChange={onChange}
                  />
                ) : (
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {/* Simple Toolbar */}
                    <div className="bg-gray-50 border-b border-gray-300 p-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          try {
                            const textarea = document.getElementById('fallback-textarea');
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const selected = text.substring(start, end);
                            const after = text.substring(end);
                            
                            const newText = before + '**' + selected + '**' + after;
                            onChange(newText);
                            
                            // Set cursor position
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 2, end + 2);
                            }, 0);
                          } catch (error) {
                            console.error('Error applying bold formatting:', error);
                          }
                        }}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        title="Bold (Ctrl+B)"
                      >
                        <strong>B</strong>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          try {
                            const textarea = document.getElementById('fallback-textarea');
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const selected = text.substring(start, end);
                            const after = text.substring(end);
                            
                            const newText = before + '*' + selected + '*' + after;
                            onChange(newText);
                            
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 1, end + 1);
                            }, 0);
                          } catch (error) {
                            console.error('Error applying italic formatting:', error);
                          }
                        }}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        title="Italic (Ctrl+I)"
                      >
                        <em>I</em>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          try {
                            const textarea = document.getElementById('fallback-textarea');
                            const start = textarea.selectionStart;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const after = text.substring(start);
                            
                            const newText = before + '\n- ' + after;
                            onChange(newText);
                            
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 3, start + 3);
                            }, 0);
                          } catch (error) {
                            console.error('Error adding bullet list:', error);
                          }
                        }}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        title="Bullet List"
                      >
                        •
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          try {
                            const textarea = document.getElementById('fallback-textarea');
                            const start = textarea.selectionStart;
                            const text = textarea.value;
                            const before = text.substring(0, start);
                            const after = text.substring(start);
                            
                            const newText = before + '\n1. ' + after;
                            onChange(newText);
                            
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + 4, start + 4);
                            }, 0);
                          } catch (error) {
                            console.error('Error adding numbered list:', error);
                          }
                        }}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        title="Numbered List"
                      >
                        1.
                      </button>
                      <div className="text-xs text-gray-500 ml-2 flex items-center">
                        Using enhanced textarea editor
                      </div>
                    </div>
                    
                    {/* Enhanced Textarea */}
                    <textarea
                      id="fallback-textarea"
                      className="w-full h-96 p-4 border-0 resize-none focus:ring-0 focus:outline-none text-gray-900"
                      placeholder="Start writing your content here...

You can use:
• **Bold text** for emphasis
• *Italic text* for subtle emphasis  
• Bullet points for lists
• Numbered lists for steps
• Headers with # symbols

The content will be properly formatted when published!"
                      value={value || defaultValue}
                      onChange={(e) => {
                        try {
                          onChange(e.target.value);
                        } catch (error) {
                          console.error('Error updating textarea:', error);
                        }
                      }}
                      onKeyDown={(e) => {
                        try {
                          // Keyboard shortcuts
                          if (e.ctrlKey || e.metaKey) {
                            if (e.key === 'b') {
                              e.preventDefault();
                              // Bold shortcut
                              const textarea = e.target;
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);
                              
                              const newText = before + '**' + selected + '**' + after;
                              onChange(newText);
                              
                              setTimeout(() => {
                                textarea.focus();
                                textarea.setSelectionRange(start + 2, end + 2);
                              }, 0);
                            } else if (e.key === 'i') {
                              e.preventDefault();
                              // Italic shortcut
                              const textarea = e.target;
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const before = text.substring(0, start);
                              const selected = text.substring(start, end);
                              const after = text.substring(end);
                              
                              const newText = before + '*' + selected + '*' + after;
                              onChange(newText);
                              
                              setTimeout(() => {
                                textarea.focus();
                                textarea.setSelectionRange(start + 1, end + 1);
                              }, 0);
                            }
                          }
                        } catch (error) {
                          console.error('Error handling keyboard shortcut:', error);
                        }
                      }}
                    />
                    
                    {/* Help Text */}
                    <div className="bg-blue-50 border-t border-blue-200 p-3">
                      <p className="text-sm text-blue-700">
                        💡 <strong>Tip:</strong> You can use Markdown formatting. 
                        <strong>**Bold**</strong>, <em>*italic*</em>, bullet points, and more will be properly rendered when published.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
