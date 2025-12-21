import ErrorElement from "../../../../../components/ErrorElement";
import { ContainerComponent } from "../../../../../components/wrappers/ContainerComponent";
import PhoneService from "../../../../../services/PhoneService";
import BreadcrumbsComponent from "../../../../../components/BreadcrumbsComponent";
import { Phones } from "./Phones";

export const dynamic = "force-dynamic";

const phone = new PhoneService();

export default async function Page() {
    try {
        const { data } = await phone.getPhones();
        return <Phones dataApi={data} />;
    } catch (error) {
        console.log(error);
        return (
            <ContainerComponent>
                <BreadcrumbsComponent
                    options={[{ name: "контакты" }]}
                    sx={{
                        ol: {
                            borderRadius: 2,
                            display: "inline-flex",
                            // backgroundColor: "#00427c",
                            padding: "5px 15px",
                        },
                    }}
                />
                <ErrorElement />
            </ContainerComponent>
        );
    }
}
