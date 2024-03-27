import router from '../router/index';
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

function logout() {
    localStorage.clear()
    sessionStorage.clear();
    notify({ group: 'auth', type: 'error', title: `${'Your Session Has Been Invalidated. Kindly Re-Login'}` })
    router.push('/').catch(() => { })
}

function handleError(error) {
    let status = error?.response?.status
    if (status == 401) {
        logout()
    } else {
        notify({ group: 'auth', type: 'error', title: `${error}` })
    }
}

export default { handleError }