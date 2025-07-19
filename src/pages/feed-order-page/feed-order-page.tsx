import { useParams } from 'react-router-dom';
import { OrderFeedDetailsCard } from '@/components/order-feed/order-feed-details-card/order-feed-details-card';

export const FeedOrderPage = (): React.JSX.Element => {
	const { id } = useParams();

	return (
		<div className='mt-20'>
			<div className='text text_type_digits-default mb-10'>#{id}</div>
			<OrderFeedDetailsCard />
		</div>
	);
};
