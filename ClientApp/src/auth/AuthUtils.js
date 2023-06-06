export function authorize(policy, roles) {
    let url = 'api/Auth/Authorize';
    const qs = {}
    if (policy) {
        qs.policy = policy;
    }
    if (roles) {
        qs.roles = roles;
    }
    Object.entries(qs).forEach(([key, value], i) => {
        url += i === 0 ? '?' : '&';
        url += `${key}=${value}`
    })
    return fetch(url).then((response) => response.json())
}

export function getUserClaims() {
    return fetch('api/Auth/GetUserClaims').then((response) => response.json())
}