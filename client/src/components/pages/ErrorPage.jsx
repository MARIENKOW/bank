import ErrorElement from "../../components/ErrorElement";

export default function ErrorPage() {
    return (
        <html>
            <body
                style={{
                    padding: 40,
                    fontFamily: "sans-serif",
                    textAlign: "center",
                }}
            >
                <ErrorElement />
            </body>
        </html>
    );
}
