import { z } from 'zod';
import type { EbaySellerApi } from '@/api/index.js';
import type { OutputArgs, ToolAnnotations } from '@/tools/definitions/types.js';
import type { ToolEntry } from '@/tools/registry.js';
import type { ToolHandler } from '@/tools/tool-handlers/types.js';

/**
 * Specification for a single MCP tool, co-locating its public definition with a
 * type-safe handler.
 *
 * `Shape` is the Zod raw shape backing the tool's input. It is the single source
 * of truth for two things that used to be declared separately and drift apart:
 * the schema advertised to MCP clients, and the compile-time type of the
 * arguments the handler receives. Because the handler's `args` are inferred from
 * `Shape`, call sites read `args.sku` as a `string` (not `unknown`) and never
 * cast.
 */
export interface ToolSpec<Shape extends z.ZodRawShape> {
  name: string;
  description: string;
  /** Zod raw shape; doubles as the MCP wire schema and the handler arg types. */
  inputSchema: Shape;
  title?: string;
  outputSchema?: OutputArgs;
  annotations?: ToolAnnotations;
  /** Opaque MCP metadata (e.g. connector category/version) passed through verbatim. */
  _meta?: Record<string, unknown>;
  /** Executes the tool against validated, fully-typed arguments; may be async. */
  handler: (api: EbaySellerApi, args: z.infer<z.ZodObject<Shape>>) => unknown;
}

/**
 * Binds a tool's Zod input shape to its handler so the shape is the single
 * source of truth for both the advertised MCP schema and the handler's
 * compile-time argument types.
 *
 * The returned {@link ToolEntry} carries a `ToolHandler` that validates raw
 * arguments against the shape before delegating, which gives the codebase two
 * properties it lacked while definitions and handlers lived in separate trees
 * joined by a string key:
 *
 *  - **Drift is a compile error.** The handler can only read fields the shape
 *    declares, with their declared types — a renamed field or changed type fails
 *    `tsc` instead of surfacing at runtime, and the per-handler `as` casts
 *    disappear.
 *  - **One validation path.** Both the MCP SDK transport and the registry's
 *    `executeTool` (used by tests) run the same parse, so tests exercise the
 *    validation production actually performs.
 *
 * Re-validating on the SDK path (which already parsed the args) is intentional
 * and cheap: the input schemas contain no `.transform()` or async refinements,
 * so the second parse is idempotent.
 */
function toDefinition<Shape extends z.ZodRawShape>(spec: ToolSpec<Shape>): ToolEntry['definition'] {
  return {
    name: spec.name,
    description: spec.description,
    inputSchema: spec.inputSchema,
    title: spec.title,
    outputSchema: spec.outputSchema,
    annotations: spec.annotations,
    _meta: spec._meta,
  };
}

export function defineTool<Shape extends z.ZodRawShape>(spec: ToolSpec<Shape>): ToolEntry {
  const schema = z.object(spec.inputSchema);
  // Non-async: `schema.parse` runs synchronously so invalid input rejects via
  // the caller's `await`, and the handler's returned promise passes straight
  // through without an extra await layer.
  const handler: ToolHandler = (api, args) => spec.handler(api, schema.parse(args));

  return { definition: toDefinition(spec), handler };
}

/**
 * Like {@link defineTool}, but invokes the handler with the raw transport
 * arguments WITHOUT re-validating them against `inputSchema`.
 *
 * Use this for tools whose handler performs its own validation against a
 * dedicated schema, and whose advertised `inputSchema` intentionally differs
 * from that internal schema. The communication tools are the motivating case:
 * each handler re-parses its arguments with a `@/utils/communication` schema
 * (the real call contract), while the advertised input schema describes a
 * different, client-facing shape. Re-parsing against the advertised schema here
 * would strip or reject fields the handler's own schema needs.
 *
 * `args` is typed from the shape for handler ergonomics, but the values are not
 * validated by this factory — the handler is responsible for that.
 */
export function rawTool<Shape extends z.ZodRawShape>(spec: ToolSpec<Shape>): ToolEntry {
  const handler: ToolHandler = (api, args) =>
    spec.handler(api, args as z.infer<z.ZodObject<Shape>>);

  return { definition: toDefinition(spec), handler };
}
