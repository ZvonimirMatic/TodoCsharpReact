import { useRequest } from "ahooks";
import { authorize } from "./AuthUtils";
import AuthRedirect from "./AuthRedirect";

export default function AuthorizeView({ policy, roles, children, authorizingComponent, unauthorizedComponent, shouldRedirect }) {
    const { loading, data } = useRequest(() => authorize(policy, roles), { refreshDeps: [policy, roles] });

    if (loading || data === undefined) {
        return authorizingComponent !== undefined ? authorizingComponent : <div>Authorizing...</div>;
    }

    return data 
        ? children
        : (shouldRedirect ?? false)
        ? <AuthRedirect />
        : unauthorizedComponent !== undefined 
        ?  unauthorizedComponent : 
        <div>Unauthorized.</div>;
}