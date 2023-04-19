type MODE = 'uat' | 'prod' | 'development';
export class Env {
    public static backendBaseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL as string;
    public static mode = import.meta.env.MODE as MODE;
    public static isProd = this.mode === 'prod';
}

if (!Env.isProd) {
    Env.backendBaseUrl = localStorage.getItem('backend-base') || Env.backendBaseUrl;
}
