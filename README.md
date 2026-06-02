# eBay API MCP Server

<div align="center">

[![npm version](https://img.shields.io/npm/v/ebay-mcp)](https://www.npmjs.com/package/ebay-mcp)
[![npm downloads](https://img.shields.io/npm/dm/ebay-mcp)](https://www.npmjs.com/package/ebay-mcp)
[![Tests](https://img.shields.io/badge/tests-1005%20passing-brightgreen)](tests/)
[![API Coverage](https://img.shields.io/badge/API%20coverage-100%25-success)](src/tools/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Contributors Welcome](https://img.shields.io/badge/contributors-welcome-brightgreen.svg)](CONTRIBUTING.md)

[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/yosefhayim-ebay-api-mcp-server-badge.png)](https://mseep.ai/app/yosefhayim-ebay-api-mcp-server)
<a href="https://www.buymeacoffee.com/yosefhayim" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that gives AI assistants comprehensive access to eBay's Sell APIs — **332 tools** for inventory, order fulfillment, marketing, analytics, developer tools, and more.

**API Coverage:** 100% (270 unique eBay API endpoints) · **Runs locally** — no cloud relay.

</div>

---

## One-Click AI Setup

> **Let your AI assistant set this up for you.** Copy the prompt below and paste it into Claude, ChatGPT, or any AI assistant with MCP support.

<details>
<summary><strong>Click to copy the AI setup prompt</strong></summary>

```
I want to set up the eBay MCP Server for my AI assistant. Please help me:

1. Install the eBay MCP server:
   npm install -g ebay-mcp

2. I need to configure it for [Claude Desktop / Cursor / Cline / Zed / Continue.dev / Windsurf / Claude Code CLI / Amazon Q] (choose one)

3. My eBay credentials are:
   - Client ID: [YOUR_CLIENT_ID]
   - Client Secret: [YOUR_CLIENT_SECRET]
   - Environment: [sandbox / production]
   - Redirect URI (RuName): [YOUR_REDIRECT_URI]

Please:
- Create the appropriate config file for my MCP client
- Set up the environment variables
- Help me complete the OAuth flow to get a refresh token for higher rate limits
- Test that the connection works

If I don't have eBay credentials yet, guide me through creating a developer account at https://developer.ebay.com/
```

</details>

> **Disclaimer:** Unofficial, third-party project — **not affiliated with or endorsed by eBay Inc.** Provided "as is" without warranty; you are responsible for complying with [eBay's API Terms](https://developer.ebay.com/join/api-license-agreement) and [data-handling requirements](https://developer.ebay.com/api-docs/static/data-handling-update.html), keeping your credentials secure, and staying within rate limits. Test in sandbox before production. See [LICENSE](LICENSE), [SECURITY.md](SECURITY.md), and [EBAY_COMPLIANCE.md](EBAY_COMPLIANCE.md).

---

## Features

- **332 eBay API Tools** — 100% coverage of eBay Sell APIs across inventory, orders, marketing, analytics, developer tools, and more
- **9 AI Clients Supported** — auto-configuration for Claude Desktop, Cursor, Zed, Cline, Continue.dev, Windsurf, Roo Code, Claude Code CLI, and Amazon Q
- **OAuth 2.0** — full user-token management with automatic refresh
- **Type Safety** — TypeScript, Zod validation, and OpenAPI-generated types
- **Smart Authentication** — automatic fallback from user tokens (10k–50k req/day) to client credentials (1k req/day)
- **Well Tested** — 1005+ tests
- **Interactive Setup Wizard** — `npm run setup` for guided config with auto browser-open for OAuth

## Quick Start

### 1. Get eBay credentials

1. Create a free [eBay Developer Account](https://developer.ebay.com/).
2. Generate application keys in the [Developer Portal](https://developer.ebay.com/my/keys).
3. Save your **Client ID** and **Client Secret**.

### 2. Install

```bash
npm install -g ebay-mcp            # from npm (recommended)
```

Or from source:

```bash
git clone https://github.com/YosefHayim/ebay-mcp.git
cd ebay-mcp && npm install && npm run build
```

### 3. Run the setup wizard

```bash
npm run setup
```

The wizard configures your eBay credentials, sets up OAuth (for higher rate limits), auto-detects and configures your MCP client, and saves everything automatically.

### 4. Use

Restart your MCP client (Claude Desktop, etc.) and start using eBay tools through your AI assistant.

---

## Demo

See the eBay MCP Server in action with Claude Desktop:

https://github.com/user-attachments/assets/0173c8df-221c-4943-a4ce-cd20bce79f4b

---

## Visual Setup Guide

The setup wizard (`npm run setup`) handles OAuth automatically. Here's where to find your credentials in the eBay Developer Portal:

**Step 1** — In the [Developer Portal](https://developer.ebay.com/my/keys), copy your **App ID (Client ID)** and **Cert ID (Client Secret)**:

![Step 1 - Copy credentials from eBay Developer Portal](public/screenshot-guides/STEP%20-%201%20-%20COPY%20CLIENT%20ID%20AND%20CLIENT%20SECRET%20TO%20ENV%20FILE.png)

**Step 2** — In your app's **User Tokens** settings, copy the **RuName** (eBay Redirect URL):

![Step 2 - Copy RuName from eBay Sign-in Settings](public/screenshot-guides/STEP%20-%202%20-%20COPY%20REDIRECT%20URL.png)

**Step 3** — Run `npm run setup`. It opens your browser for OAuth login and guides you through eBay sign-in:

![Step 3 - Sign in to eBay during OAuth flow](public/screenshot-guides/STEP%203%20-%20RUN%20COMMAND%20NPM%20RUN%20SETUP%20AND%20PREFORM%20OAUTH%20LOGIN.png)

**Step 4** — Paste the authorization code from the callback URL when prompted:

![Step 4 - Paste authorization code into setup wizard](public/screenshot-guides/STEP%20-%204%20-%20PASTE%20INTO%20THE%20SETUP%20WIZARD.png)

The wizard exchanges the code for tokens, saves them, and configures your MCP client. You now have user-token authentication (10k–50k requests/day instead of the default 1k/day).

---

## Configuration

> 📖 Full reference — every environment variable, OAuth step, and scope — is in the [Configuration Guide](docs/auth/CONFIGURATION.md). `npm run setup` writes the `.env` for you; the variables below are for reference.

```bash
EBAY_CLIENT_ID=your_client_id
EBAY_CLIENT_SECRET=your_client_secret
EBAY_ENVIRONMENT=sandbox            # or "production"
EBAY_REDIRECT_URI=your_runame
EBAY_MARKETPLACE_ID=EBAY_US         # default marketplace (overridable per tool)
EBAY_CONTENT_LANGUAGE=en-US         # default request content language
EBAY_USER_REFRESH_TOKEN=your_token  # for higher rate limits
```

### Authentication & rate limits

| Mode                            | Daily limit       | Best for                  | Setup                              |
| ------------------------------- | ----------------- | ------------------------- | ---------------------------------- |
| **Client credentials** (default) | 1,000 req/day     | Development, testing      | Automatic with Client ID + Secret  |
| **User token** (recommended)    | 10k–50k req/day   | Production, high volume   | OAuth via `npm run setup`          |

User-token limits vary by account tier (Individual 10k · Commercial 25k · Enterprise 50k+). On a 429, the server retries with exponential backoff and surfaces the error. See the [Configuration Guide](docs/auth/CONFIGURATION.md) and [OAuth Quick Reference](docs/auth/OAUTH_QUICK_REFERENCE.md) for details, and monitor usage in the [Developer Portal](https://developer.ebay.com/my/api_usage).

### MCP client compatibility

Auto-configured by `npm run setup`. Requires Node.js ≥ 18 and MCP protocol 1.0+ over STDIO (default) or HTTP.

| Client                 | Platform              | Config Path                                                                  |
| ---------------------- | --------------------- | ---------------------------------------------------------------------------- |
| **Claude Desktop**     | macOS, Windows, Linux | `~/Library/Application Support/Claude/claude_desktop_config.json`            |
| **Cursor IDE**         | macOS, Windows, Linux | `~/.cursor/mcp.json`                                                         |
| **Zed Editor**         | macOS, Windows, Linux | `~/.config/zed/settings.json`                                                |
| **Cline**              | VSCode Extension      | `~/...globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json` |
| **Continue.dev**       | VSCode, JetBrains     | `~/.continue/config.json`                                                    |
| **Windsurf (Codeium)** | macOS, Windows, Linux | `~/.codeium/windsurf/mcp_config.json`                                        |
| **Roo Code**           | VSCode Extension      | `~/...globalStorage/rooveterinaryinc.roo-cline/settings/mcp_settings.json`   |
| **Claude Code CLI**    | Terminal              | `~/.claude.json`                                                             |
| **Amazon Q Developer** | AWS                   | `~/.aws/amazonq/mcp.json`                                                    |

## Available Tools

**332 tools**, 100% API coverage, organized by category:

- **Account** — policies, programs, subscriptions, sales tax
- **Inventory** — items, offers, locations, bulk operations, SKU location mapping
- **Order Fulfillment** — orders, shipping, refunds, disputes, payment dispute evidence
- **Marketing & Promotions** — campaigns, ads, promotions, bidding, bulk operations
- **Analytics** — traffic reports, seller standards, metrics
- **Communication** — buyer-seller messaging, negotiations, notifications, feedback
- **Metadata & Taxonomy** — categories, item aspects, policies
- **Trading (legacy XML)** — fixed-price listing create, revise, relist, end
- **Developer Tools** — rate limits, signing keys, client registration
- **Token Management** — OAuth URL generation and token management

**Example tools:** `ebay_get_inventory_items`, `ebay_get_orders`, `ebay_create_offer`, `ebay_get_campaigns`, `ebay_get_oauth_url`.

For the complete list, see [`src/tools/definitions/`](src/tools/definitions/) or the [llms.txt index](llms.txt).

## Usage Examples

Common tasks, phrased as you'd ask your AI assistant:

- **Set up OAuth** — *"Help me set up OAuth for my eBay account."* → generates an authorization URL via `ebay_get_oauth_url`, then configures the refresh token. Unlocks 10k–50k req/day.
- **Manage inventory** — *"Show me all my active listings."* → `ebay_get_inventory_items` returns SKUs, quantities, and status.
- **Process orders** — *"Get all unfulfilled orders from the last 7 days."* → `ebay_get_orders` with date and fulfillment-status filters.
- **Create campaigns** — *"Create a promoted-listing campaign for electronics."* → `ebay_create_campaign` and related marketing tools.
- **Bulk operations** — *"Apply a 10% discount to all 'Vintage Watches' items."* → `ebay_get_inventory_items` + `ebay_update_offer` across matches.

## Logging & Troubleshooting

- **Logging** — Winston-based, written to stderr (MCP-safe) with optional file output. See [docs/logging.md](docs/logging.md).
- **Troubleshooting** — server not appearing, auth errors, rate limits, empty results. Start with `npm run diagnose`, then see [docs/troubleshooting.md](docs/troubleshooting.md).

## Contributing

Contributions welcome. Fork → branch → add tests → `npm run check && npm test` → commit with [Conventional Commits](https://www.conventionalcommits.org/) → open a PR.

- Working on the codebase or with a coding agent? Start with **[AGENTS.md](AGENTS.md)** — build/test commands, module map, and the add-an-endpoint workflow.
- Full guidelines: **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## Resources

- [eBay Developer Portal](https://developer.ebay.com/) — API docs and credentials
- [eBay API License Agreement](https://developer.ebay.com/join/api-license-agreement) — terms and compliance
- [eBay Data Handling Requirements](https://developer.ebay.com/api-docs/static/data-handling-update.html) — data protection and privacy
- [MCP Documentation](https://modelcontextprotocol.io/) — Model Context Protocol spec
- [OAuth Quick Reference](docs/auth/OAUTH_QUICK_REFERENCE.md) — scopes, troubleshooting, examples
- [eBay API Status](https://developer.ebay.com/support/api-status) — official status page (also via the `ebay_get_api_status` tool and the [in-repo snapshot](docs/API_STATUS.md))
- [CHANGELOG.md](CHANGELOG.md) · [SECURITY.md](SECURITY.md) · [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [Issue Tracker](https://github.com/YosefHayim/ebay-mcp/issues) — bug reports and feature requests

## License

MIT — see [LICENSE](LICENSE).

## Contributors

Thanks to everyone who has helped make this project better! 🎉

<a href="https://github.com/YosefHayim/ebay-mcp/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=YosefHayim/ebay-mcp" alt="Contributors" />
</a>

---

<div align="center">

**[Support this project](https://www.buymeacoffee.com/yosefhayim)** | Created by [Yosef Hayim Sabag](https://github.com/YosefHayim)

</div>
