# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy all source files
COPY . .

# --ignore-scripts skips the `prepare` script (husky needs a git repo).
# NB: do NOT sed-delete the "prepare" line — it is the last script entry and
# removing it leaves a trailing comma, breaking package.json.
RUN pnpm install --frozen-lockfile --ignore-scripts || pnpm install --ignore-scripts

# Build the application
RUN pnpm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and lockfile
COPY package.json pnpm-lock.yaml* ./

# Install only production dependencies (--ignore-scripts: skip husky prepare)
RUN pnpm install --prod --frozen-lockfile --ignore-scripts || pnpm install --prod --ignore-scripts

# Copy built application from builder
COPY --from=builder /app/build ./build

# Copy docs directory (needed for scopes)
COPY --from=builder /app/docs ./docs

# Copy public assets (icons served at /icons by the HTTP app)
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Run the HTTP server (streamable-http MCP at `/`, health at `/health`).
# Binds 0.0.0.0 and picks up Railway's PORT automatically (httpTransport.ts).
CMD ["node", "build/serverHttp.js"]
