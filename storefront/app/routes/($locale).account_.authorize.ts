import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

import {requireCustomerAccount} from '~/lib/type';

export async function loader({context, params}: LoaderFunctionArgs) {
  requireCustomerAccount(context.customerAccount);
  return context.customerAccount.authorize();
}
