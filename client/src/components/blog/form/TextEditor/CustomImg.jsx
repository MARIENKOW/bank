import { Image } from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/react";

export default Image.extend({
   defaultOptions: {
      ...Image.options,
      sizes: ["inline", "block", "left", "right"],
   },
   renderHTML({ HTMLAttributes }) {
      const { style } = HTMLAttributes;
      return [
         "figure",
         { style, maxWidth: "100%" },
         [
            "img",
            mergeAttributes(this.options.HTMLAttributes, {
               ...HTMLAttributes,
               style: "max-width:100%",
            }),
         ],
      ];
   },
});
