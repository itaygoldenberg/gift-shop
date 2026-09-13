class AppConfig {

    // Configurable, because the browser and the API are the same machine only on a
    // developer's laptop. Falls back to a local run when the variable is not set.
    public readonly serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

    public readonly audienceUrl = this.serverUrl + "/api/audience";
    public readonly giftsByAudienceUrl = this.serverUrl + "/api/gifts-by-audience";
    public readonly giftsUrl = this.serverUrl + "/api/gifts";

    public readonly recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
}

export const appConfig = new AppConfig();
