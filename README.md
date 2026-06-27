# n8n-nodes-kaicalls

An n8n community node package for [KaiCalls](https://www.kaicalls.com), the AI voice agent platform.

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

## Development

```bash
git clone https://github.com/cgallic/n8n-nodes-kaicalls.git
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
