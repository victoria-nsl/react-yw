import { Middleware } from '@reduxjs/toolkit';
import { TRootState } from './store';
import { refreshTokenApi } from '@/utils/api';

export type TWsActions = {
	connect: string;
	disconnect: string;
	onConnecting?: string;
	onOpen?: string;
	onClose?: string;
	onError: string;
	sendMessage?: string;
	onMessage: string;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
	wsActions: TWsActions,
	withTokenRefresh: boolean
): Middleware<object, TRootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			sendMessage,
			onOpen,
			onClose,
			onError,
			onMessage,
			onConnecting,
			disconnect,
		} = wsActions;
		const { dispatch } = store;
		let isConnected = false;
		let url = '';
		let reconnectId = 0;

		return (next) => (action) => {
			if (action.type === connect) {
				socket = new WebSocket(action.payload);
				url = action.payload;
				isConnected = true;
				onConnecting && dispatch({ type: onConnecting });

				socket.onopen = () => {
					onOpen && dispatch({ type: onOpen });
				};

				socket.onerror = () => {
					dispatch({ type: onError, payload: 'Unknown error' });
				};

				socket.onclose = () => {
					onClose && dispatch({ type: onClose });

					if (isConnected) {
						reconnectId = +setTimeout(() => {
							dispatch({ type: connect, payload: url });
						}, RECONNECT_PERIOD);
					}
				};

				socket.onmessage = (event) => {
					const { data } = event;

					try {
						const parsedData = JSON.parse(data);

						if (
							withTokenRefresh &&
							parsedData.message === 'Invalid or missing token'
						) {
							refreshTokenApi()
								.then((refreshedData) => {
									const wssUrl = new URL(url);
									wssUrl.searchParams.set(
										'token',
										refreshedData.accessToken.replace('Bearer ', '')
									);
									dispatch({
										type: connect,
										payload: wssUrl.toString(),
									});
								})
								.catch((error) => {
									dispatch({
										type: onError,
										payload: (error as Error).message,
									});
								});

							dispatch({
								type: disconnect,
							});
							return;
						}

						dispatch({ type: onMessage, payload: parsedData });
					} catch (error) {
						dispatch({ type: onError, payload: (error as Error).message });
					}
				};

				return;
			}

			if (action.type === sendMessage && socket) {
				try {
					socket.send(JSON.stringify(action.payload));
				} catch (error) {
					dispatch({ type: onError, payload: (error as Error).message });
				}

				return;
			}

			if (action.type === disconnect) {
				clearTimeout(reconnectId);
				reconnectId = 0;
				isConnected = false;
				socket?.close();
				socket = null;

				return;
			}

			next(action);
		};
	};
};
