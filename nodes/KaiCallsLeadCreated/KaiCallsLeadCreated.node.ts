import type {
	IDataObject,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IPollFunctions,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class KaiCallsLeadCreated implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'KaiCalls: New Lead Created',
		name: 'kaiCallsLeadCreated',
		icon: { light: 'file:kaicalls.svg', dark: 'file:kaicalls.dark.svg' },
		group: ['trigger'],
		version: 1,
		description: 'Polls KaiCalls for new leads and triggers when one is created.',
		subtitle: '={{$parameter["businessId"] || "All businesses"}}',
		defaults: { name: 'KaiCalls: New Lead Created' },
		polling: true,
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'kaiCallsApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Business ID',
				name: 'businessId',
				type: 'string',
				default: '',
				description: 'Optionally filter leads by a specific KaiCalls business ID',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
		],
		usableAsTool: true,
	};

	async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		const staticData = this.getWorkflowStaticData('node');
		const now = new Date().toISOString();
		const lastRun = (staticData.lastRun as string | undefined) ?? now;

		const businessId = this.getNodeParameter('businessId', '') as string;
		const limit = this.getNodeParameter('limit', 50) as number;

		const qs: IDataObject = {
			after: lastRun,
			limit,
		};

		if (businessId) {
			qs.business_id = businessId;
		}

		const options: IHttpRequestOptions = {
			method: 'GET',
			url: 'https://www.kaicalls.com/api/v1/zapier/triggers/lead-created',
			qs,
			json: true,
		};

		const response = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'kaiCallsApi',
			options,
		)) as { items?: IDataObject[] };

		staticData.lastRun = now;

		const items = Array.isArray(response.items) ? response.items : [];

		if (!items.length) {
			return null;
		}

		return [items.map((item) => ({ json: item }))];
	}
}
