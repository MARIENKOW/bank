import HeaderUser from "../../../../../components/HeaderUser";

export default function Layout({ children }) {
    return (
        <>
            <HeaderUser />
            {children}
        </>
    );
}
