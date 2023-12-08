export type User = {
	username: string;
	participantId: string;
	email: string;
	name: string;
	disabled: boolean;
};

export type Session = {
	user: User;
	token: string;
};

export type AuthResponse = {
	access_token: string;
	token_type: string;
};

type Common = {
	_id: string;
	consultationID: number;
	participantID: number;
};

export type Payment = Common & {
	paymentID: number;
	amount: number;
	status: string;
};

export type Scheduling = Common & {
	advisorID: number;
	consultationDate: string;
	consultationTime: string;
};

export type Conference = Scheduling & {
	hostID: number;
	meetingPlatform: string;
	meetingLink: string;
};

export type InteractiveChat = {
	_id: string;
	interactionLog_id: number;
	user_id: number;
	staff_id: number;
	interaction_type: string;
	message: string;
	interaction_time: string;
};

export type Location = {
	_id: string;
	location_id: number; 
	area_name: string;
	description: string;
	cardinal_direction: string;
	floor: string;
};

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
