# UbiCity Docker Container
# Provides isolated environment for running UbiCity tools

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY src/ ./src/
COPY schema/ ./schema/
COPY examples/ ./examples/
COPY scripts/ ./scripts/

# Create data directory
RUN mkdir -p ubicity-data/experiences ubicity-data/analyses ubicity-data/maps

# Expose volume for data persistence
VOLUME ["/app/ubicity-data"]

# Set Node.js environment
ENV NODE_ENV=production

# Default command: show help
CMD ["node", "src/cli.js", "help"]

# Example usage:
# docker build -t ubicity .
# docker run -v ./data:/app/ubicity-data ubicity stats
# docker run -v ./data:/app/ubicity-data ubicity report
