import Link from "@tiptap/extension-link";

export const CustomLink = Link.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            style: {
                default:
                    "color: #1d4ed8 !important; text-decoration: underline !important; font-weight: 500;",
            },
        };
    },

    renderHTML({ HTMLAttributes }) {
        return ["a", HTMLAttributes, 0]; // TipTap создаст <a class="custom-link" href="...">...</a>
    },
});
