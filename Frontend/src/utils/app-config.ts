class AppConfig {
	public readonly audienceUrl = "http://localhost:4000/api/audience";
	public readonly giftsByAudienceUrl = "http://localhost:4000/api/gifts-by-audience";
	public readonly giftsUrl = "http://localhost:4000/api/gifts";

    public readonly recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
}

export const appConfig = new AppConfig();
