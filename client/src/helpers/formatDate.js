export default function formatDate(iso) {
    const [year, month, day] = iso.split("-").map(Number);
    const nowYear = new Date().getFullYear();

    const dd = String(day).padStart(2, "0");
    const mm = String(month).padStart(2, "0");

    if (year === nowYear) {
        return `${dd}/${mm}`; // этот год → 19/12
    }

    return `${dd}/${mm}/${year}`; // другой год → 19/12/2019
}
