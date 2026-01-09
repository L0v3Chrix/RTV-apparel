import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

import {requireCustomerAccount} from '~/lib/type';

// fallback wild card for all unauthenticated routes in account section
export async function loader({context, params}: LoaderFunctionArgs) {
  requireCustomerAccount(context.customerAccount);
  await context.customerAccount.handleAuthStatus();

  const locale = params.locale;
  return redirect(locale ? `/${locale}/account` : '/account');
}
