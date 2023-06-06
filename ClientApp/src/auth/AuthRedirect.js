import { useMount } from "ahooks";
import { AuthUrls, ReturnUrlQueryParam } from "./AuthConstants";

export default function AuthRedirect() {
    useMount(() => {
        window.location.replace(`${AuthUrls.Login}?${ReturnUrlQueryParam}=${encodeURIComponent(window.location.pathname + window.location.search + window.location.hash)}`);
    });

    return null;
}