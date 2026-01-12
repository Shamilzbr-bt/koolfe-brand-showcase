# Docker Configuration for Koolfe Website

This project includes Docker configuration following Docker best practices for both development and production environments.

## 📁 Files Overview

- **Dockerfile** - Multi-stage production build (Node.js build → Nginx serve)
- **Dockerfile.dev** - Development environment with hot reload
- **docker-compose.yml** - Orchestration for both dev and prod services
- **nginx.conf** - Optimized Nginx configuration with security headers
- **.dockerignore** - Excludes unnecessary files from Docker build context
- **.env.example** - Template for environment variables

## 🚀 Quick Start

### Development Mode (with hot reload)

```bash
# Start development server
docker-compose up app-dev

# Or run in detached mode
docker-compose up -d app-dev

# View logs
docker-compose logs -f app-dev
```

Access the application at: `http://localhost:8080`

### Production Mode

```bash
# Build and start production container
docker-compose up --build app-prod

# Or run in detached mode
docker-compose up -d app-prod
```

Access the application at: `http://localhost`

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `VITE_SUPABASE_PROJECT_ID` - Your Supabase project ID
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Your Supabase publishable key
- `VITE_SUPABASE_URL` - Your Supabase project URL

## 📦 Docker Best Practices Implemented

### 1. Multi-Stage Builds
- Separate build and runtime stages
- Minimal production image size
- Only production artifacts in final image

### 2. Layer Caching Optimization
- Dependencies installed before copying source code
- Maximizes cache hit rate during rebuilds

### 3. Security
- Non-root user (nginx runs as nginx user)
- Alpine-based images for smaller attack surface
- Security headers in nginx configuration
- No sensitive data in images

### 4. Health Checks
- Built-in health check endpoint (`/health`)
- Docker health check configured
- Monitors container health automatically

### 5. Performance
- Gzip compression enabled
- Static asset caching (1 year)
- Optimized nginx configuration

### 6. Development Experience
- Hot reload in development mode
- Volume mounts for live code updates
- Separate dev and prod configurations

## 🛠️ Advanced Usage

### Build Production Image Only

```bash
docker build -t koolfe-website:latest .
```

### Run Production Container Standalone

```bash
docker run -d \
  --name koolfe-prod \
  -p 80:80 \
  koolfe-website:latest
```

### Build Development Image

```bash
docker build -f Dockerfile.dev -t koolfe-website:dev .
```

### Run Development Container with Custom Port

```bash
docker run -d \
  --name koolfe-dev \
  -p 3000:8080 \
  -v $(pwd):/app \
  -v /app/node_modules \
  --env-file .env \
  koolfe-website:dev
```

### View Container Logs

```bash
# Development
docker-compose logs -f app-dev

# Production
docker-compose logs -f app-prod
```

### Stop and Remove Containers

```bash
# Stop specific service
docker-compose stop app-dev

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Rebuild Images

```bash
# Rebuild specific service
docker-compose build app-prod

# Rebuild all services
docker-compose build

# Rebuild without cache
docker-compose build --no-cache
```

## 🔍 Health Check

The production container includes a health check endpoint:

```bash
# Check health status
curl http://localhost/health

# Check Docker health status
docker inspect --format='{{.State.Health.Status}}' koolfe-prod
```

## 📊 Image Sizes

Expected image sizes:
- **Production**: ~50-60 MB (nginx:alpine + static assets)
- **Development**: ~400-500 MB (node:20-alpine + dependencies)

## 🐛 Troubleshooting

### Container won't start

```bash
# Check container logs
docker-compose logs app-dev

# Check if port is already in use
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows
```

### Changes not reflecting in development

```bash
# Rebuild without cache
docker-compose build --no-cache app-dev
docker-compose up app-dev
```

### Permission issues

```bash
# Fix permissions on host
chmod -R 755 src/
```

## 📝 Notes

- The `.env` file is excluded from Docker builds for security
- Environment variables are injected at runtime
- Node modules are excluded from volume mounts in development
- Production images are built with `npm ci` for reproducible builds

## 🔐 Security Considerations

1. Never commit `.env` file to version control
2. Use `.env.example` as a template
3. Rotate Supabase keys regularly
4. Keep base images updated (`docker-compose pull`)
5. Scan images for vulnerabilities (`docker scan koolfe-website:latest`)

## 📚 Additional Resources

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)
