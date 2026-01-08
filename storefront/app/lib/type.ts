import type {
  Storefront as HydrogenStorefront,
  CustomerAccount as HydrogenCustomerAccount,
} from '@shopify/hydrogen';
import type {
  CountryCode,
  CurrencyCode,
  LanguageCode,
} from '@shopify/hydrogen/storefront-api-types';

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type Locale = {
  language: LanguageCode;
  country: CountryCode;
  label: string;
  currency: CurrencyCode;
};

export type Localizations = Record<string, Locale>;

export type I18nLocale = Locale & {
  pathPrefix: string;
};

export type Storefront = HydrogenStorefront<I18nLocale>;

// CustomerAccount type - can be undefined when customer account API credentials are not configured
export type CustomerAccount = HydrogenCustomerAccount | undefined;

/**
 * Helper to assert that customerAccount is available.
 * Throws a 501 response if Customer Account API is not configured.
 */
export function requireCustomerAccount(
  customerAccount: CustomerAccount,
): asserts customerAccount is HydrogenCustomerAccount {
  if (!customerAccount) {
    throw new Response(
      'Customer Account API is not configured. Please set PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID and SHOP_ID environment variables.',
      {status: 501, statusText: 'Not Implemented'},
    );
  }
}
