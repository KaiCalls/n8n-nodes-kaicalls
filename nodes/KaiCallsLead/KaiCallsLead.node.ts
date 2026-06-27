import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class KaiCallsLead implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'KaiCalls: Lead',
		name: 'kaiCallsLead',
		icon: { light: 'file:kaicalls.svg', dark: 'file:kaicalls.dark.svg' },
		group: ['output'],
		version: 1,
		description: 'Create and manage leads in KaiCalls.',
		subtitle: '={{$parameter["operation"]}}',
		defaults: { name: 'KaiCalls: Lead' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'kaiCallsApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new lead',
						action: 'Create a lead',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Business ID',
				name: 'businessId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: { show: { operation: ['create'] } },
				description: 'The KaiCalls business ID to create the lead under',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['create'] } },
				description: 'Full name of the lead',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['create'] } },
				description: 'Phone number of the lead',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				displayOptions: { show: { operation: ['create'] } },
				description: 'Email address of the lead',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				displayOptions: { show: { operation: ['create'] } },
				description: 'Optional notes about the lead',
			},
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const operation = this.getNodeParameter('operation', itemIndex) as string;

				if (operation !== 'create') {
					continue;
				}

				const businessId = this.getNodeParameter('businessId', itemIndex) as string;
				const name = this.getNodeParameter('name', itemIndex, '') as string;
				const phone = this.getNodeParameter('phone', itemIndex, '') as string;
				const email = this.getNodeParameter('email', itemIndex, '') as string;
				const notes = this.getNodeParameter('notes', itemIndex, '') as string;

				if (!name && !phone && !email) {
					throw new NodeOperationError(
						this.getNode(),
						'At least one of Name, Phone, or Email is required to create a lead.',
						{ itemIndex },
					);
				}

				const body: IDataObject = {
					business_id: businessId,
					source: 'n8n',
				};

				if (name) {
					body.name = name;
				}

				if (phone) {
					body.phone = phone;
				}

				if (email) {
					body.email = email;
				}

				if (notes) {
					body.notes = notes;
				}

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: 'https://www.kaicalls.com/api/v1/leads',
					body,
					json: true,
				};

				const response = (await this.helpers.httpRequestWithAuthentication.call(
					this,
					'kaiCallsApi',
					options,
				)) as IDataObject;

				returnData.push({ json: response, pairedItem: { item: itemIndex } });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: itemIndex },
					});
					continue;
				}

				if (error instanceof NodeOperationError) {
					throw new NodeOperationError(this.getNode(), error.message, { itemIndex });
				}

				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex });
			}
		}

		return [returnData];
	}
}
