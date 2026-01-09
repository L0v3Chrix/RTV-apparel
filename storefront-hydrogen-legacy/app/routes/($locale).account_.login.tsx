import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

import {requireCustomerAccount} from '~/lib/type';

export async function loader({params, request, context}: LoaderFunctionArgs) {
  requireCustomerAccount(context.customerAccount);
  return context.customerAccount.login();
}
