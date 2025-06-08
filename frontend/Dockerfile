# ---- Base Node image for installing dependencies and building ----  
FROM node:22.15.0-alpine AS base
# Set working directory  
WORKDIR /app  

# ---- Dependencies Stage ----  
# Install dependencies first to leverage Docker cache  
FROM base AS deps  
# Copy package.json and lockfile (package-lock.json for npm)  
COPY package.json package-lock.json* ./  
# Install dependencies using npm ci for reproducible builds  
RUN npm ci  

# ---- Builder Stage ----  
# Build the Next.js application  
FROM base AS builder  
# Copy dependencies from the 'deps' stage  
COPY --from=deps /app/node_modules ./node_modules  
# Copy the rest of the application code  
COPY . .  

# Set build-time environment variables if needed (e.g., NEXT_PUBLIC_ ones)  
ARG NEXT_PUBLIC_BACKEND_URL  
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

# Build the application  
RUN npm run build  

# ---- Runner Stage ----  
# Create a smaller production image  
FROM base AS runner  
WORKDIR /app  

# Set environment to production  
ENV NODE_ENV=production  
# Optionally, set a default port (Next.js default is 3000)  
ENV PORT=3005 

# Create a non-root user and group for security  
RUN addgroup --system --gid 1001 nodejs  
RUN adduser --system --uid 1001 nextjs  

# Copy the standalone output from the builder stage  
# These files are optimized for production by Next.js  
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./  
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static  
COPY --from=builder --chown=nextjs:nodejs /app/public ./public  

# Switch to the non-root user  
USER nextjs  

EXPOSE ${PORT}  

# The standalone output includes a server.js file to run the app  
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
