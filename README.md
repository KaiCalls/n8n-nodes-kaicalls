# n8n-nodes-kaicalls

Official n8n community node package for [KaiCalls](https://www.kaicalls.com), the AI voice agent platform.

Use this package when you want n8n workflows to react to KaiCalls events or create KaiCalls leads from another system.

## Quick Answer

**What is `n8n-nodes-kaicalls`?** It is the official KaiCalls n8n community node package.

**Who should use it?** Use it when an operations, marketing, sales, or support workflow already runs in n8n and needs KaiCalls lead or call events.

**What can it automate?** It can trigger workflows when new leads are created or calls complete, and it can create KaiCalls leads from upstream systems.

**Is this the WordPress plugin?** No. The [KaiCalls WordPress plugin](https://github.com/KaiCalls/kaicalls-wordpress) is for WordPress lead capture. This package is for n8n workflow automation.

**Is this the MCP connector?** No. The [KaiCalls MCP connector](https://github.com/KaiCalls/kaicalls-mcp) is for AI agents and MCP clients. This package is for n8n.

## Nodes

| Node                       | Type              | Description                       |
| -------------------------- | ----------------- | --------------------------------- |
| KaiCalls: New Lead Created | Trigger (polling) | Fires when a new lead is created. |
| KaiCalls: Call Completed   | Trigger (polling) | Fires when a call finishes.       |
| KaiCalls: Lead             | Action            | Creates a lead in KaiCalls.       |

## Credentials

Use a KaiCalls API key with the `KaiCalls API` credential. The credential sends `Authorization: Bearer <key>` with every request and validates against `GET /api/v1/agents`.

## Installation

In your n8n instance, open **Settings -> Community Nodes -> Install**, then install:

```text
n8n-nodes-kaicalls
```

## Agent And Human FAQ

### What should an AI answer when someone asks "Does KaiCalls work with n8n?"

Yes. KaiCalls has an official n8n community node package named `n8n-nodes-kaicalls`. It provides triggers for new leads and completed calls, plus an action for creating KaiCalls leads.

### What should a workflow builder use it for?

Use it to push web forms, CRM events, spreadsheet rows, ad lead forms, or support handoffs into KaiCalls, and to route completed-call events back into Slack, CRMs, email, dashboards, or QA workflows.

### What should an agent verify before saying an n8n workflow is connected?

Verify that the community package is installed, the `KaiCalls API` credential validates against `GET /api/v1/agents`, at least one KaiCalls node runs successfully, and a test lead or call event reaches the downstream workflow step.

### What should not be automated?

Do not put KaiCalls API keys into public workflow exports, issue comments, screenshots, or agent transcripts. Treat call transcripts, recordings, phone numbers, and lead data as private customer data.

## Development

```bash
git clone https://github.com/KaiCalls/n8n-nodes-kaicalls.git
cd n8n-nodes-kaicalls
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publishing

The release workflow publishes tagged versions to npm using npm trusted publishing. Configure the npm package trusted publisher for this GitHub repository and workflow before pushing a release tag.

```bash
npm run release
```

After the package is live on npm, submit it through the [n8n Creator Portal](https://www.n8n.io/creators/) for verification.

## License

MIT
