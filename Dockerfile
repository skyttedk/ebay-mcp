# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy all source files first (before removing prepare script)
COPY . .

# Now remove prepare script to avoid issues during prod install
RUN sed -i '/"prepare":/d' package.json

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Build the application
RUN pnpm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and remove prepare script
COPY package.json ./
RUN sed -i '/"prepare":/d' package.json

# Copy lockfile
COPY pnpm-lock.yaml* ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

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
