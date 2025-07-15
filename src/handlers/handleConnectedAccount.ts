import stripe from '../config/stripe';
import Stripe from 'stripe';
import ApiError from '../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../app/modules/user/user.model';

export const handleAccountConnectEvent = async (data: Stripe.Account) => {

    // Find the user by Stripe account ID
    const existingUser = await User.findOne({
        'stripeAccountInfo.accountId': data.id,
    });

    if (!existingUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');	
    }

    // Check if the onboarding is complete
    if (data.charges_enabled) {
        const loginLink = await stripe.accounts.createLoginLink(data.id);

        // Save Stripe account information to the user record
        await User.findByIdAndUpdate(existingUser?._id, {
            stripeAccountInfo: {
                accountId: data.id,
                status: true,
                externalAccountId: data.external_accounts?.data[0]?.id,
                loginUrl: loginLink.url,
            }
        });
    }
};
