import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class KaiCallsApi implements ICredentialType {
	name = 'kaiCallsApi';

	displayName = 'KaiCalls API';

	icon: Icon = { light: 'file:../icons/kaicalls.svg', dark: 'file:../icons/kaicalls.dark.svg' };

	documentationUrl = 'https://www.kaicalls.com/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			placeholder: 'kc_live_...',
			description: 'Paste a KaiCalls API key that starts with kc_live_.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://www.kaicalls.com',
			url: '/api/v1/agents',
			method: 'GET',
		},
	};
}
