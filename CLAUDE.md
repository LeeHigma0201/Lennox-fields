# Lennox Fields - Clinical Mental Health Services Website

## Cortex Integration
This project is tracked in Jason's knowledge graph. Before major changes:
- `cortex_context("your task")` — returns cross-project context and patterns
- `cortex_log("product-lennox-fields", "what you did")` — log findings for the next agent
- Patterns from previous agents are in `~/cortex/notes/product-lennox-fields.md`

## Project Overview
Marketing/informational website for **Lennox Fields Clinical Mental Health Services** (Tamara Walls, LPCA), built with Next.js 14, deployed on Vercel.

## Tech Stack
- **Framework:** Next.js 14.2.5 (App Router)
- **Styling:** Tailwind CSS 3.4.14 with custom theme
- **Fonts:** Playfair Display (headings), Inter (body), loaded via Google Fonts
- **Icons:** Lucide React
- **Database:** Prisma + PostgreSQL (schema only, not connected)
- **Auth:** NextAuth (installed, not configured)
- **Payments:** Stripe (scaffolded in lib/stripe.ts, not functional)
- **Deploy:** Vercel

## Content Architecture
All page content is driven by config files in `/content/`:
- `site-config.ts` - Business details, owner credentials, contact info
- `navigation.ts` - Menu structure and footer links
- `home-page.ts` - Hero, trust indicators, resources, CTA
- `services.ts` - 5 services with pricing
- `about.ts` - Bio, credentials, training, clinical approach
- `books.ts` - 3 children's mental health books
- `faq.ts` - FAQ content
- `icons.ts` - Lucide icon mappings

## Key Routes
| Route | Status |
|-------|--------|
| `/` | Live |
| `/about` | Live |
| `/services` | Live |
| `/services/individual-therapy` | Live |
| `/services/career-counseling` | Live |
| `/services/substance-use` | Live |
| `/books` | Live |
| `/contact` | Live (form non-functional) |
| `/faq` | Live |
| `/resources/journaling-prompts` | Live |
| `/tools/screening-tools` | Live |
| `/tools/screening-tools/phq-9` | Live |
| `/tools/screening-tools/gad-7` | Live |
| `/tools/screening-tools/pcl-5` | Live |
| `/tools/breathing-exercises` | Live |
| `/tools/cbt-thought-record` | Live |
| `/tools/safety-planning` | Live |

## Known Issues (see audit-dashboard.html)
- 17+ broken internal links (routes in nav/footer that don't have pages)
- `bg-cream` Tailwind class not defined (used in 19+ files)
- Contact form doesn't send data anywhere
- Legal pages (privacy, terms, HIPAA) don't exist
- All images use `<img>` instead of `next/image`
- No loading/error/404 pages
- No analytics, sitemap, or robots.txt

## Owner Info
- **Tamara Walls, LPCA** (Licensed Professional Clinical Counselor Associate)
- Specializations: ADHD, Autism, CPTSD, Trauma
- Focus: Neurodiversity-affirming care, primarily women
- Location: Kentucky
- Contact: tamara@lennoxfields.com, (502) 627-0781
- Books: 3 children's mental health books on Amazon

## Commands
```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # Run linter
```

## Recent Work (March 2026)

- **Logo fix:** `rounded-full` + `object-cover` to fix edge bleeding on circular logo image
- **Sticky hamburger menu:** DoorDash-style — hamburger appears on scroll, slides in from top, full-screen overlay nav

## Future Vision

Tamara is working on a **daily planner revamp** and has a vision for a **couples therapy tool**. These may eventually connect to or branch off the Lennox Fields brand/platform.


---

# Claude Docs — Tools & Tips Training Reference
> Auto-appended from ~/claude-docs-training-reference.md

## General Prompting Principles

### Be Clear and Direct
Claude responds well to clear, explicit instructions. Being specific about your desired output enhances results. If you want "above and beyond" behavior, explicitly request it rather than relying on the model to infer this from vague prompts.

**Golden rule:** Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too.

- Be specific about the desired output format and constraints.
- Provide instructions as sequential steps using numbered lists or bullet points when the order matters.

**Less effective:**
```text
Create an analytics dashboard
```

**More effective:**
```text
Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to create a fully-featured implementation.
```

### Add Context to Improve Performance
Providing context or motivation behind your instructions helps Claude better understand your goals.

**Less effective:**
```text
NEVER use ellipses
```

**More effective:**
```text
Your response will be read aloud by a text-to-speech engine, so never use ellipses since the text-to-speech engine will not know how to pronounce them.
```

### Use Examples Effectively (Few-Shot Prompting)
Examples are one of the most reliable ways to steer output format, tone, and structure. 3–5 examples work best.

When adding examples, make them:
- **Relevant:** Mirror your actual use case closely.
- **Diverse:** Cover edge cases and vary enough that Claude doesn't pick up unintended patterns.
- **Structured:** Wrap examples in `<example>` tags (multiple in `<examples>` tags) so Claude can distinguish them from instructions.

### Structure Prompts with XML Tags
XML tags help Claude parse complex prompts unambiguously. Wrapping each type of content in its own tag (e.g. `<instructions>`, `<context>`, `<input>`) reduces misinterpretation.

Best practices:
- Use consistent, descriptive tag names across your prompts.
- Nest tags when content has a natural hierarchy.

### Give Claude a Role
Setting a role in the system prompt focuses Claude's behavior and tone:

```python
message = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1024,
    system="You are a helpful coding assistant specializing in Python.",
    messages=[
        {"role": "user", "content": "How do I sort a list of dictionaries by key?"}
    ],
)
```

### Long Context Prompting (20k+ tokens)
- **Put longform data at the top**: Place long documents above your query/instructions. Queries at the end improve response quality by up to 30%.
- **Structure with XML tags**: Wrap each document in `<document>` tags with `<document_content>` and `<source>` subtags.
- **Ground responses in quotes**: Ask Claude to quote relevant parts of documents first before answering.

```xml
<documents>
  <document index="1">
    <source>annual_report_2023.pdf</source>
    <document_content>
      {{ANNUAL_REPORT}}
    </document_content>
  </document>
</documents>

Analyze the annual report. Identify strategic advantages and recommend Q3 focus areas.
```

### Model Self-Knowledge
```text
The assistant is Claude, created by Anthropic. The current model is Claude Opus 4.6.
When an LLM is needed, please default to Claude Opus 4.6 unless the user requests otherwise. The exact model string is claude-opus-4-6.
```

---

## Output & Formatting Control

### Communication Style
Claude's latest models are more concise and natural:
- More direct and grounded
- More conversational
- Less verbose — may skip summaries after tool calls

If you want summaries after tool use:
```text
After completing a task that involves tool use, provide a quick summary of the work you've done.
```

### Controlling Format
1. **Tell Claude what to do instead of what not to do** — Instead of "Do not use markdown", try "Your response should be composed of smoothly flowing prose paragraphs."
2. **Use XML format indicators** — "Write prose sections in \<smoothly_flowing_prose_paragraphs\> tags."
3. **Match prompt style to desired output** — Removing markdown from your prompt reduces markdown in output.

### Minimize Markdown Prompt (copy-paste ready):
```text
<avoid_excessive_markdown_and_bullet_points>
When writing reports, documents, technical explanations, analyses, or any long-form content, write in clear, flowing prose using complete paragraphs and sentences. Use standard paragraph breaks for organization and reserve markdown primarily for `inline code`, code blocks, and simple headings. Avoid using **bold** and *italics*.

DO NOT use ordered lists or unordered lists unless: a) you're presenting truly discrete items where a list format is the best option, or b) the user explicitly requests a list or ranking.

Instead of listing items with bullets or numbers, incorporate them naturally into sentences. NEVER output a series of overly short bullet points.
</avoid_excessive_markdown_and_bullet_points>
```

### LaTeX Output
Claude Opus 4.6 defaults to LaTeX for math. To override:
```text
Format your response in plain text only. Do not use LaTeX, MathJax, or any markup notation such as \( \), $, or \frac{}{}. Write all math expressions using standard text characters.
```

### Migrating Away from Prefilled Responses
Starting with Claude 4.6, prefilled responses on the last assistant turn are no longer supported. Alternatives:
- **Output formatting**: Use Structured Outputs or ask the model to conform to your schema.
- **Eliminating preambles**: "Respond directly without preamble. Do not start with phrases like 'Here is...', 'Based on...'."
- **Continuations**: Move continuation text to user message with "Your previous response was interrupted and ended with `[text]`. Continue from where you left off."

---

## Tool Use

### How Tool Use Works

Claude supports two types of tools:

1. **Client tools**: Execute on your systems (user-defined custom tools + Anthropic-defined tools like computer use, text editor)
2. **Server tools**: Execute on Anthropic's servers (web search, web fetch) — no implementation needed on your part

**Client tool flow:**
1. Provide Claude with tools + user prompt
2. Claude decides to use a tool → returns `stop_reason: "tool_use"`
3. You execute the tool, return results in a `tool_result` block
4. Claude uses results to formulate response

**Server tool flow:**
1. Provide tools + prompt
2. Claude executes server tool automatically (sampling loop, up to 10 iterations)
3. Claude returns response with results incorporated

### Strict Tool Use (Guaranteed Schema Conformance)
Add `strict: true` to tool definitions for guaranteed schema validation:
```json
{
  "name": "get_weather",
  "description": "Get current weather",
  "strict": true,
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {"type": "string"}
    },
    "required": ["location"]
  }
}
```

### MCP Tools Integration
Convert MCP tools to Claude format by renaming `inputSchema` to `input_schema`:
```python
async def get_claude_tools(mcp_session):
    mcp_tools = await mcp_session.list_tools()
    return [
        {
            "name": tool.name,
            "description": tool.description or "",
            "input_schema": tool.inputSchema,
        }
        for tool in mcp_tools.tools
    ]
```

### Making Claude Take Action (Not Just Suggest)

**Less effective (Claude will only suggest):**
```text
Can you suggest some changes to improve this function?
```

**More effective (Claude will make the changes):**
```text
Change this function to improve its performance.
```

### System Prompt: Proactive Action
```text
<default_to_action>
By default, implement changes rather than only suggesting them. If the user's intent is unclear, infer the most useful likely action and proceed, using tools to discover any missing details instead of guessing. Try to infer the user's intent about whether a tool call is intended or not, and act accordingly.
</default_to_action>
```

### System Prompt: Conservative Action
```text
<do_not_act_before_instructions>
Do not jump into implementation or change files unless clearly instructed. When the user's intent is ambiguous, default to providing information, doing research, and providing recommendations rather than taking action.
</do_not_act_before_instructions>
```

### Parallel Tool Calling
Claude excels at parallel tool execution. Boost to ~100% success:
```text
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies between the tool calls, make all of the independent tool calls in parallel. Prioritize calling tools simultaneously whenever the actions can be done in parallel rather than sequentially. For example, when reading 3 files, run 3 tool calls in parallel to read all 3 files into context at the same time. Maximize use of parallel tool calls where possible to increase speed and efficiency. However, if some tool calls depend on previous calls, do NOT call these tools in parallel. Never use placeholders or guess missing parameters.
</use_parallel_tool_calls>
```

To reduce parallel execution:
```text
Execute operations sequentially with brief pauses between each step to ensure stability.
```

---

## Thinking & Reasoning

### Adaptive Thinking (Recommended for Opus 4.6)
```python
client.messages.create(
    model="claude-opus-4-6",
    max_tokens=64000,
    thinking={"type": "adaptive"},
    output_config={"effort": "high"},
    messages=[{"role": "user", "content": "..."}],
)
```

### Controlling Overthinking
Replace blanket defaults with targeted instructions. Instead of "Default to using [tool]," use "Use [tool] when it would enhance your understanding."

```text
When you're deciding how to approach a problem, choose an approach and commit to it. Avoid revisiting decisions unless you encounter new information that directly contradicts your reasoning. If you're weighing two approaches, pick one and see it through.
```

### Reducing Unnecessary Thinking
```text
Extended thinking adds latency and should only be used when it will meaningfully improve answer quality - typically for problems that require multi-step reasoning. When in doubt, respond directly.
```

### Guiding Thinking After Tool Use
```text
After receiving tool results, carefully reflect on their quality and determine optimal next steps before proceeding. Use your thinking to plan and iterate based on this new information, and then take the best next action.
```

### Key Tips:
- Prefer general instructions over prescriptive steps — "think thoroughly" often beats hand-written step-by-step plans
- Multishot examples work with thinking — use `<thinking>` tags in few-shot examples
- Ask Claude to self-check: "Before you finish, verify your answer against [test criteria]."

---

## Agentic Systems

### Long-Horizon Reasoning & State Tracking

**Context awareness prompt:**
```text
Your context window will be automatically compacted as it approaches its limit, allowing you to continue working indefinitely from where you left off. Therefore, do not stop tasks early due to token budget concerns. As you approach your token budget limit, save your current progress and state to memory before the context window refreshes. Always be as persistent and autonomous as possible and complete tasks fully.
```

### Multi-Context Window Workflows
1. **First context window**: Set up framework (write tests, create setup scripts)
2. **Future windows**: Iterate on a todo-list
3. **Write tests in structured format** (e.g., `tests.json`) — "It is unacceptable to remove or edit tests."
4. **Create setup scripts** (e.g., `init.sh`) to prevent repeated work
5. **Starting fresh vs compacting**: Claude's latest models discover state from filesystem. Be prescriptive:
   - "Call pwd; you can only read and write files in this directory."
   - "Review progress.txt, tests.json, and the git logs."

### State Management Best Practices
- **Structured formats** (JSON) for test results, task status
- **Unstructured text** for progress notes
- **Git for state tracking** — checkpoints that can be restored
- **Emphasize incremental progress**

```json
// tests.json
{
  "tests": [
    {"id": 1, "name": "authentication_flow", "status": "passing"},
    {"id": 2, "name": "user_management", "status": "failing"},
    {"id": 3, "name": "api_endpoints", "status": "not_started"}
  ],
  "total": 200, "passing": 150, "failing": 25, "not_started": 25
}
```

### Balancing Autonomy and Safety
```text
Consider the reversibility and potential impact of your actions. You are encouraged to take local, reversible actions like editing files or running tests, but for actions that are hard to reverse, affect shared systems, or could be destructive, ask the user before proceeding.

Examples of actions that warrant confirmation:
- Destructive operations: deleting files, dropping database tables, rm -rf
- Hard to reverse: git push --force, git reset --hard
- Visible to others: pushing code, commenting on PRs, sending messages
```

### Research & Information Gathering
```text
Search for this information in a structured way. As you gather data, develop several competing hypotheses. Track your confidence levels in your progress notes. Regularly self-critique your approach and plan. Update a hypothesis tree or research notes file. Break down this complex research task systematically.
```

### Subagent Orchestration
Claude 4.6 proactively delegates to subagents. To prevent overuse:
```text
Use subagents when tasks can run in parallel, require isolated context, or involve independent workstreams. For simple tasks, sequential operations, single-file edits, or tasks where you need to maintain context across steps, work directly rather than delegating.
```

### Reduce Unnecessary File Creation
```text
If you create any temporary new files, scripts, or helper files for iteration, clean up these files by removing them at the end of the task.
```

### Prevent Overengineering
```text
Avoid over-engineering. Only make changes that are directly requested or clearly necessary. Keep solutions simple and focused:

- Scope: Don't add features, refactor code, or make "improvements" beyond what was asked.
- Documentation: Don't add docstrings, comments, or type annotations to code you didn't change.
- Defensive coding: Don't add error handling for scenarios that can't happen. Only validate at system boundaries.
- Abstractions: Don't create helpers for one-time operations. Don't design for hypothetical future requirements.
```

### Prevent Hard-Coding / Test-Focused Solutions
```text
Write a high-quality, general-purpose solution using the standard tools available. Do not create helper scripts or workarounds. Implement a solution that works correctly for all valid inputs, not just the test cases. Do not hard-code values. Focus on understanding the problem requirements and implementing the correct algorithm. Tests verify correctness, not define the solution.

If the task is unreasonable or if any tests are incorrect, please inform me rather than working around them.
```

### Minimize Hallucinations
```text
<investigate_before_answering>
Never speculate about code you have not opened. If the user references a specific file, you MUST read the file before answering. Make sure to investigate and read relevant files BEFORE answering questions about the codebase. Never make any claims about code before investigating unless you are certain of the correct answer.
</investigate_before_answering>
```

---

## Features Overview

### Model Capabilities
| Feature | Description |
|---------|-------------|
| **Context windows** | Up to 1M tokens |
| **Adaptive thinking** | Dynamic reasoning depth (recommended for Opus 4.6) |
| **Batch processing** | 50% cost savings for async bulk requests |
| **Citations** | Ground responses in source documents with exact references |
| **Data residency** | Control where inference runs (`"global"` or `"us"`) |
| **Effort parameter** | Control token usage vs thoroughness tradeoff |
| **Extended thinking** | Step-by-step reasoning transparency |
| **PDF support** | Process text and visuals from PDFs |
| **Search results** | Natural citations for RAG applications |
| **Structured outputs** | Guaranteed schema conformance (JSON outputs + strict tool use) |

### Server-Side Tools (Run by Anthropic)
| Tool | Description |
|------|-------------|
| **Code execution** | Sandboxed code runner for data analysis & calculations |
| **Web fetch** | Retrieve full content from web pages and PDFs |
| **Web search** | Augment knowledge with real-time web data |

### Client-Side Tools (Run by You)
| Tool | Description |
|------|-------------|
| **Bash** | Execute shell commands and scripts |
| **Computer use** | Control interfaces via screenshots + mouse/keyboard |
| **Memory** | Store/retrieve info across conversations |
| **Text editor** | Create and edit text files |

### Tool Infrastructure
| Feature | Description |
|---------|-------------|
| **Agent Skills** | Pre-built (PowerPoint, Excel, Word, PDF) or custom skills |
| **Fine-grained tool streaming** | Stream tool params without buffering |
| **MCP connector** | Connect to remote MCP servers from Messages API |
| **Programmatic tool calling** | Call tools from within code execution containers |
| **Tool search** | Scale to thousands of tools with dynamic discovery |

### Context Management
| Feature | Description |
|---------|-------------|
| **Compaction** | Server-side context summarization for long conversations |
| **Context editing** | Auto-manage context with configurable strategies |
| **Prompt caching (5m)** | Reduce costs and latency for repeated context |
| **Prompt caching (1hr)** | Extended cache for less frequent but important context |
| **Token counting** | Count tokens before sending |

### Files & Assets
| Feature | Description |
|---------|-------------|
| **Files API** | Upload and manage files without re-uploading each request |

---

## Copy-Paste System Prompt Snippets

### All-In-One Agent System Prompt
```text
<agent_behavior>
<!-- Action vs. Suggestion -->
<default_to_action>
By default, implement changes rather than only suggesting them. If the user's intent is unclear, infer the most useful likely action and proceed, using tools to discover any missing details instead of guessing.
</default_to_action>

<!-- Parallel Tool Use -->
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies between the tool calls, make all independent calls in parallel. Never use placeholders or guess missing parameters.
</use_parallel_tool_calls>

<!-- Investigate Before Answering -->
<investigate_before_answering>
Never speculate about code you have not opened. If the user references a specific file, you MUST read the file before answering. Give grounded and hallucination-free answers.
</investigate_before_answering>

<!-- Autonomy & Safety -->
<autonomy_and_safety>
Take local, reversible actions freely (editing files, running tests). For destructive or shared-system actions (git push --force, deleting files, sending messages), ask the user before proceeding.
</autonomy_and_safety>

<!-- Thinking Guidance -->
<thinking_guidance>
After receiving tool results, carefully reflect on their quality and determine optimal next steps before proceeding. When deciding how to approach a problem, choose an approach and commit to it. Avoid revisiting decisions unless new information contradicts your reasoning.
</thinking_guidance>

<!-- Keep It Simple -->
<minimal_engineering>
Only make changes that are directly requested or clearly necessary. Don't add features, refactor code, or make "improvements" beyond what was asked. Don't create helpers for one-time operations.
</minimal_engineering>

<!-- State Management -->
<state_management>
Use structured formats (JSON) for test results and task status. Use unstructured text for progress notes. Use git for state tracking. Emphasize incremental progress.
</state_management>

<!-- Context Window -->
<context_awareness>
Your context window will be automatically compacted as it approaches its limit. Do not stop tasks early due to token budget concerns. Save progress to files before the context refreshes. Always be as persistent and autonomous as possible.
</context_awareness>
</agent_behavior>
```

### Frontend Design Quality Prompt
```text
<frontend_aesthetics>
Avoid generic "AI slop" aesthetics. Make creative, distinctive frontends.

Focus on:
- Typography: Choose beautiful, unique fonts. Avoid Inter, Arial, Roboto.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables. Dominant colors with sharp accents.
- Motion: Use animations for effects and micro-interactions. CSS-only preferred for HTML.
- Backgrounds: Create atmosphere and depth, not solid colors.

Avoid: overused fonts, clichéd purple gradients, predictable layouts, cookie-cutter design.
</frontend_aesthetics>
```

### Effort Settings Quick Reference
| Setting | Use Case |
|---------|----------|
| **Low** | High-volume, latency-sensitive, simple tasks |
| **Medium** | Most applications (default for Sonnet 4.6) |
| **High** | Complex reasoning, agentic coding |
| **Max** | Hardest problems, large-scale code migrations |

### Model Quick Reference
| Model | String | Best For |
|-------|--------|----------|
| Claude Opus 4.6 | `claude-opus-4-6` | Coding, enterprise agents, professional work |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` | Coding, agents, enterprise workflows (fast + cost-efficient) |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` | Fastest, near-frontier intelligence |

---

*Source: platform.claude.com/docs — scraped 2026-03-22*